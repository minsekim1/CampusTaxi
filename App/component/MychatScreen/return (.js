return (
  <>
    {/* 모달창 */}
    <>
      {/* 방만들기모달창 */}
      <Modal
        backdropColor="rgba(0,0,0,0)"
        isVisible={isCreateRoomVisible}
        style={campusStyle.Modal.modalStyle}
      >
        <View style={campusStyle.Modal.view}>
          <Header
            containerStyle={campusStyle.Modal.container}
            centerComponent={{
              text: "방만들기",
              style: campusStyle.Modal.component,
            }}
          />
          <View style={{ padding: 10 }}>
            <Text>카테고리</Text>
            <Picker
              selectedValue={createRoomCategory}
              onValueChange={(itemValue) => {
                setCreateRoomCategory(itemValue);
              }}
            >
              <Picker.Item color="gray" label={filter} />
              {menuList.map((item) =>
                item != filter ? (
                  <Picker.Item label={item} value={item} />
                ) : null
              )}
            </Picker>
            <Text>출발장소</Text>
            <Picker
              selectedValue={createRoomstartplace}
              onValueChange={(itemValue) => {
                setCreateRoomstartplace(itemValue);
              }}
            >
              <Picker.Item value="" label="출발장소를 선택해주세요." />
              {startplace.map((item) => (
                <Picker.Item label={item} value={item} />
              ))}
            </Picker>
            <Text>도착장소</Text>
            <Picker
              selectedValue={createRoomendplace}
              onValueChange={(itemValue) => {
                setCreateRoomendplace(itemValue);
              }}
            >
              <Picker.Item value="" label="도착장소를 선택해주세요." />
              {endplace.map((item) => (
                <Picker.Item label={item} value={item} />
              ))}
            </Picker>
            <Text>탑승 시간</Text>
            <Text style={campusStyle.Text.center}>
              {_getLocaleStrting(date)}
            </Text>
            <View style={campusStyle.View.row}>
              <View style={campusStyle.View.flex}>
                <Button
                  buttonStyle={campusStyle.Button.marginTopAndBottom5}
                  onPress={showDatepicker}
                  title="날짜 선택"
                />
              </View>
              <View style={campusStyle.View.flex}>
                <Button
                  buttonStyle={campusStyle.Button.marginTopAndBottom5}
                  onPress={showTimepicker}
                  title="시간 선택"
                />
              </View>
            </View>
            {/* 날짜선택 Picker창 */}
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <Text>탑승 인원</Text>
            <ButtonGroup
              selectedButtonStyle={{ backgroundColor: "#F8BD3C" }}
              textStyle={{ fontSize: 20 }}
              selectedIndex={createRoompersonmax - 2}
              onPress={(index) => setCreateRoompersonmax(index + 2)}
              buttons={["2", "3", "4"]}
            ></ButtonGroup>
            <Text>입장 제한 성별</Text>
            <ButtonGroup
              selectedButtonStyle={{ backgroundColor: "#F8BD3C" }}
              textStyle={{ fontSize: 16 }}
              selectedIndex={createRoomGender}
              onPress={(index) => setCreateRoomGender(index)}
              buttons={["동성만", "남녀모두"]}
            ></ButtonGroup>
          </View>
          <View style={campusStyle.View.rowflexBtnGroup}>
            <Button
              name="myButtonName"
              buttonStyle={campusStyle.Button.groupActive}
              title="방 생성"
              onPress={() => {
                //worldTimeAPI사용하여 서버 시간을 가져옵니다.
                //JS의 기본적인 비동기방식을 동기방식으로 구현(async await 뺴고 then이용)
                fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
                  .then((res) => res.json())
                  .then((result) => {
                    const datatime =
                      result.datetime.slice(0, 21) +
                      result.datetime.slice(26, 32);
                    let tempbbskey = "tempbbskey";
                    let newRoom = {
                      a: "출발 대기", //available0
                      b: tempbbskey, //bbskey1
                      c: createRoomCategory, //bbstype2
                      d: {
                        da: "SYSTEM: makeRoom",
                        db: datatime,
                        dc: myname,
                      }, //chat3
                      e: { ea: 0, eb: "" }, //cost4
                      f: datatime, //createdate5
                      g: createRoomendplace, //endplace6
                      h: createRoomGender == 0 ? mygender : "all", //gender7
                      i: myname, //leadername8
                      j: _getLocaleStrting(date), //meetingdate9
                      k: createRoompersonmax, //personmax10
                      l: { ma: myname }, //personmember11
                      m: 1, //personpresent12
                      n: createRoomstartplace, //startplace13
                    };
                    //파이어베이스에 데이터를 올립니다. push
                    let newBbsKey = firebase
                      .database()
                      .ref("bbs/data")
                      .push(newRoom);
                    //파이어베이스 임시 키값을 현재 키값으로 변경
                    tempbbskey = newBbsKey.key;
                    newRoom = {
                      a: "출발 대기", //available0
                      b: tempbbskey, //bbskey1
                      c: createRoomCategory, //bbstype2
                      d: {
                        da: "SYSTEM: makeRoom",
                        db: datatime,
                        dc: myname,
                      }, //chat3
                      e: { ea: 0, eb: "" }, //cost4
                      f: datatime, //createdate5
                      g: createRoomendplace, //endplace6
                      h: createRoomGender == 0 ? mygender : "all", //gender7
                      i: myname, //leadername8
                      j: _getLocaleStrting(date), //meetingdate9
                      k: createRoompersonmax, //personmax10
                      l: { ma: myname }, //personmember11
                      m: 1, //personpresent12
                      n: createRoomstartplace, //startplace13
                    };
                    //바뀐 키값으로 다시 올리기
                    firebase
                      .database()
                      .ref("bbs/data/" + tempbbskey)
                      .set(newRoom);
                    //roomList를 파이어베이스에 올린 버전으로 가져옵니다.
                    firebase
                      .database()
                      .ref("bbs/data")
                      .once("value", function (snapshot) {
                        let resultRoom = [];
                        snapshot.forEach(function (snap) {
                          let item = snap.val();
                          item.key = snap.key;
                          resultRoom.push(item);
                        });
                        setRoomList(resultRoom);
                      });
                    // 유저 데이터에 새로운 방 추가
                    firebase
                      .database()
                      .ref("user/data")
                      .orderByChild("c")
                      .on("child_added", function (snapshot) {
                        const userkey = snapshot.key;
                        firebase
                          .database()
                          .ref("user/data/" + userkey + "/c")
                          .push({ ca: tempbbskey, cb: 1 });
                      });
                    setCreateRoomVisible(!isCreateRoomVisible);
                  });
              }}
            />
            <Button
              name="myButtonName"
              buttonStyle={campusStyle.Button.groupCancel}
              title="취소"
              onPress={() => setCreateRoomVisible(!isCreateRoomVisible)}
            />
          </View>
        </View>
      </Modal>
      {/* 검색모달창 */}
      <Modal
        backdropColor="rgba(0,0,0,0)"
        isVisible={isSearchVisible}
        style={campusStyle.Modal.modalStyle}
      >
        <View style={campusStyle.Modal.view}>
          <Header
            containerStyle={campusStyle.Modal.container}
            centerComponent={{
              text: "검색",
              style: campusStyle.Modal.component,
            }}
          />
          <Button
            title="Hide modal"
            onPress={() => {
              setSearchVisible(!setSearchVisible);
            }}
          />
        </View>
      </Modal>

      {/* 필터모달창 */}
      <Modal
        backdropColor="rgba(0,0,0,0)"
        isVisible={isFilterVisible}
        style={campusStyle.Modal.modalStyle}
      >
        <View style={campusStyle.Modal.view}>
          <Header
            containerStyle={campusStyle.Modal.container}
            centerComponent={{
              text: "필터",
              style: campusStyle.Modal.component,
            }}
          />
          <View style={{ padding: 10 }}>
            <Text>카테고리</Text>
            <Picker
              selectedValue={filterCategory}
              style={{ height: 50 }}
              onValueChange={(itemValue) => {
                setFilterCategory(itemValue);
              }}
            >
              <Picker.Item label="등교" value="등교" />
              <Picker.Item label="하교" value="하교" />
              <Picker.Item label="야작" value="야작" />
              <Picker.Item label="독서실" value="독서실" />
              <Picker.Item label="PC방" value="PC방" />
              <Picker.Item label="놀이동산" value="놀이동산" />
              <Picker.Item label="클럽" value="클럽" />
              <Picker.Item label="스키장" value="스키장" />
              <Picker.Item label="오션월드" value="오션월드" />
            </Picker>
            <Text>출발장소</Text>
            <Picker
              selectedValue={filterStartplace}
              style={{ height: 50 }}
              onValueChange={(itemValue) => {
                setFilterStartplace(itemValue);
              }}
            >
              <Picker.Item label="무관" value="무관" />
              {startplace.map((item) => (
                <Picker.Item label={item} value={item} />
              ))}
            </Picker>
            <Text>도착장소</Text>
            <Picker
              selectedValue={filterEndplace}
              style={{ height: 50 }}
              onValueChange={(itemValue) => {
                setFilterEndplace(itemValue);
              }}
            >
              <Picker.Item label="무관" value="무관" />
              {endplace.map((item) => (
                <Picker.Item label={item} value={item} />
              ))}
            </Picker>
            <Text>탑승시간</Text>
            <View style={campusStyle.View.row}>
              <View style={campusStyle.View.flex}>
                <Picker
                  selectedValue={filterMeetingTimeStart}
                  onValueChange={(itemValue) => {
                    setFilterMeetingTimeStart(itemValue);
                  }}
                >
                  <Picker.Item label="전부" value="전부" />
                  {timeLineStart.map((item) => (
                    <Picker.Item label={item} value={item} />
                  ))}
                </Picker>
              </View>
              <View style={campusStyle.View.flex}>
                <Picker
                  selectedValue={filterMeetingTimeEnd}
                  onValueChange={(itemValue) => {
                    setFilterMeetingTimeEnd(itemValue);
                  }}
                >
                  <Picker.Item label="전부" value="전부" />
                  {timeLineEnd.map((item) => (
                    <Picker.Item label={item} value={item} />
                  ))}
                </Picker>
              </View>
            </View>
            <Text>탑승인원</Text>
            <View style={campusStyle.View.row}>
              <View style={campusStyle.View.flex}>
                <Picker
                  selectedValue={filterPersonMin}
                  onValueChange={(itemValue) => {
                    setFilterPersonMin(itemValue);
                  }}
                >
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4" value="4" />
                </Picker>
              </View>
              <View style={campusStyle.View.flex}>
                <Picker
                  selectedValue={filterPersonMax}
                  onValueChange={(itemValue) => {
                    setFilterPersonMax(itemValue);
                  }}
                >
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4" value="4" />
                </Picker>
              </View>
            </View>
          </View>
          <Button
            title="Hide modal"
            onPress={() => {
              setFilterVisible(!isFilterVisible);
            }}
          />
        </View>
      </Modal>
    </>
    {/* 채팅목록 출력부분 */}
    <View style={{ height: hp(10) }}></View>
    <FlatList
      keyExtractor={(item, index) => index}
      data={roomList}
      renderItem={({ item, index }) => {
        if (item != null && filterCategory == item.c) {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("채팅방", {
                  bbskey: item.b,
                  gender: item.h,
                  leadername: item.i,
                  startplace: item.n,
                  endplace: item.g,
                  mygender: mygender,
                  myname: myname,
                })
              }
            >
              <Card containerStyle={campusStyle.Card.container}>
                <ListItem
                  leftAvatar={
                    <View
                      style={{
                        borderRadius: 100,
                        width: 62,
                        height: 62,
                        backgroundColor:
                          item.h == "woman"
                            ? "#DE22A3"
                            : item.h == "man"
                            ? "#55A1EE"
                            : "#3A3A3A",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={campusStyle.Text.middleBold}>{index}</Text>
                      <Text style={campusStyle.Text.middleBold}>
                        {item.h == "woman"
                          ? "여자"
                          : item.h == "man"
                          ? "남자"
                          : "남 여"}
                      </Text>
                    </View>
                  }
                  title={
                    <View style={campusStyle.View.row}>
                      <View style={{ flex: 6 }}>
                        <View style={campusStyle.View.row}>
                          <Image source={crown} />
                          <Text>{item.i}</Text>
                        </View>
                        <Text>출발지:{item.n}</Text>
                        <Text>도착지:{item.g}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        {(() => {
                          if (item.k === item.m)
                            return (
                              <Text style={campusStyle.Text.red}>
                                {item.m}/{item.k}
                              </Text>
                            );
                          else
                            return (
                              <Text>
                                {item.m}/{item.k}
                              </Text>
                            );
                        })()}
                      </View>
                      <View style={{ flex: 2, alignItems: "flex-end" }}>
                        <Text style={campusStyle.Text.grayDDark}>{item.j}</Text>
                        <Text style={campusStyle.Text.grayDDark}>{item.a}</Text>
                        <Badge
                          textStyle={campusStyle.Badge.textStyle}
                          value={0}
                          status="warning"
                        />
                      </View>
                    </View>
                  }
                />
              </Card>
            </TouchableOpacity>
          );
        }
      }}
    />
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: wp(100),
      }}
    >
      <Header
        containerStyle={{
          height: hp(10),
        }}
        backgroundColor="#0D3664"
        leftComponent={
          <Button
            type="clear"
            title=""
            icon={<Icon name="arrow-back" size={24} color="white" />}
            onPress={() => goBack()}
          ></Button>
        }
        centerComponent={{
          text: "모든 채팅방 목록",
          style: campusStyle.Text.middleBold,
        }}
        rightComponent={
          <View style={campusStyle.View.row}>
            <Button
              type="clear"
              title=""
              icon={<Icon name="filter-list" size={24} color="white" />}
              onPress={() => {
                setFilterVisible(true);
              }}
            />
            <Button
              type="clear"
              title=""
              icon={<Icon name="search" size={24} color="white" />}
              onPress={() => {
                setSearchVisible(true);
              }}
            />
          </View>
        }
      />
    </View>
    {/* 방만들기 버튼부분 */}
    <View style={campusStyle.View.createRoomView}>
      <TouchableOpacity
        style={campusStyle.Button.createRoomBtn}
        onPress={() => {
          setCreateRoomVisible(!isCreateRoomVisible);
        }}
      >
        <Icon name="add" size={32} color="white" />
        <Text style={campusStyle.Text.smallSize}>방만들기</Text>
      </TouchableOpacity>
    </View>
  </>
);
