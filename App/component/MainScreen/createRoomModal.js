{
  /* 방만들기모달창 */
}
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
          item != filter ? <Picker.Item label={item} value={item} /> : null
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
      <Text style={campusStyle.Text.center}>{_getLocaleStrting(date)}</Text>
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
                result.datetime.slice(0, 21) + result.datetime.slice(26, 32);
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
              let newBbsKey = ref.push(newRoom);
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
              ref.once("value", function (snapshot) {
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
</Modal>;
