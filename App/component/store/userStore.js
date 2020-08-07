import { observable } from "mobx";
const firebase = require("firebase");

// import UserStore from "store/userStore";
class UserStore {
  // addressA: "string"
  // emailB: "string"
  // enterroomC
  // genderD: "int"
  // joindateE: "timestamp"
  // loginidF: "string"
  // loginpasswordG: "string"
  // nameH: "string"
  // nicknameI: "string"
  // phoneJ: "string"
  // studentcardK: "string"
  // univL: "string"
  // userkeyM: "-MBRNLe85baaaaaaaaa"
  // userstatusN: "int"

  @observable user = null;

  //#region  Add User 회원가입
  //EXAMPLE: onPress={() => BbsStore.addUser(2, 3, 4, 5, 6, 7, 8)}
  addUser(
    address,
    email,
    gender,
    loginid,
    loginpassword,
    name,
    nickname,
    phone,
    studentcard,
    univ
  ) {
    //시간 가져오기
    fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
      .then((res) => res.json())
      .then((result) => {
        const datatime =
          result.datetime.slice(0, 21) + result.datetime.slice(26, 32); //밀리초제거
        let newkey = firebase.database().ref("user/data").push().key;
        if (newkey != null) {
          let newUser = {
            a: address,
            b: email,
            d: gender,
            e: datatime,
            f: loginid,
            g: loginpassword,
            h: name,
            i: nickname,
            j: phone,
            k: studentcard,
            l: univ,
            m: newkey,
            n: 1,
          };
          firebase.database().ref("user/data").push(newUser);
          this.user.push(newUser);
        }
      });
  }
  //#endregion
  // lockUser : 해당 기간까지 클라이언트 계정 정지
  //onPress={() => BbsStore.hideBbs("-MDrAW9yVgYg8BSehz4e")}
  lockUser(userkey, untilDate) {
    firebase
      .database()
      .ref("bbs/data/" + userkey + "/n")
      .set(untilDate);
  }
  // Remove bbs : 데이터를 완전히 지움
  removeUser(userkey) {
    //onPress={() => BbsStore.removeUser("-MDrAW9yVgYg8BSehz4e")}
    firebase
      .database()
      .ref("user/data/" + userkey)
      .set({});
    // this.bbs.pop();
  }
  changeUserValue(userkey, props, value) {
    //props는 a => available이런식
    firebase
      .database()
      .ref("bbs/data/" + userkey + "/" + props)
      .set(value);
  }
  getUser(userkey) {
    //onPress={() => BbsStore.getBbs("-MDrAW9yVgYg8BSehz4e")}
    let result = {};
    firebase
      .database()
      .ref("user/data/" + userkey)
      .once("value", (s) => {
        result = s.val();
        return JSON.stringify(result);
      });
  }

  // Update User : firebase에서 user를 가져와 store에 저장한다
  async updateUser(userkey) {
    let tempdata = [];
    //bbs에서 데이터를 가져와서 firebase json 형식에서 flatlist하기 좋은 형식으로 키값을 JSON 안으로 넣는다.
    await firebase
      .database()
      .ref("user/data/" + userkey)
      .once("value", (snap) => {
        snap.forEach((item) => {
          // json을 string으로 바꾸었다가 다시 json 형식으로 표준화
          // 그냥하면 안됌
          tempdata.push(JSON.parse(JSON.stringify(item)));
        });
      });
    this.user = tempdata;
  }
  async login(userid, userpassword) {
    //onPress={() => UserStore.login("-s", "tkarnr78^@")}
    let tempdata = {};
    //bbs에서 데이터를 가져와서 firebase json 형식에서 flatlist하기 좋은 형식으로 키값을 JSON 안으로 넣는다.
    if (userid.length < 5 || userpassword.length < 5) {
      alert("아이디와 비밀번호는 5자리 이상이어야합니다.");
    } else {
      await firebase
        .database()
        .ref("user/data/" + userid)
        .once("value", (snap) => {
          // json을 string으로 바꾸었다가 다시 json 형식으로 표준화
          // 그냥하면 안됌
          // alert(JSON.stringify(snap.val()));/
          tempdata = JSON.parse(JSON.stringify(snap));
          if (snap.val() != null && tempdata.g == userpassword) {
            this.user = tempdata;
          } else {
            alert("없는 아이디이거나 비밀번호가 다릅니다.");
          }
        });
    }
    return this.user;
  }
  /*
      function loginFunc() {
      //유저가 없는지 확인
      if (name.length < 5 || password.length < 5)
        alert("아이디와 비밀번호는 5자리 이상이어야합니다.");
      else if (name == "" || password == "") {
        alert("아이디 또는 비밀번호가 빈 칸입니다.");
      } else {
        //유저 정보가 없다면 회원가입
        firebase
          .database()
          .ref("user/data/" + name)
          .once("value", (snapshot) => {
            if (snapshot.val() == null) {
              setName(name);
              setPassword(password);
              navigation.navigate("홈", {
                userkey: name,
              });
              const val = {
                a: "지역",
                b: "이메일",
                d: 0,
                e: new Date(),
                f: name,
                g: password,
                h: name,
                i: name,
                j: "01000000000",
                k: "image:url",
                l: "소속",
                n: 1,
              };
              firebase
                .database()
                .ref("user/data/" + name)
                .set(val);
              alert("회원 가입이 완료되었습니다.");
            } else {
              //유저 정보가 있다면 비밀번호 확인
              if (password == snapshot.val().g) {
                //패스워드랑 아이디가 맞다면 로그인
                setName(name);
                setPassword(password);
                navigation.navigate("홈", {
                  userkey: name,
                });
                alert("정상적으로 로그인되었습니다.");
              } else {
                alert("잘못된 비밀번호입니다.");
              }
            }
          });
      }

      // const [clientPassword, onChangePassword] = React.useState(null);
      // let newBbsKey = firebase.database().ref("user/data").push();
}*/

  printUserStore() {
    alert(this.user);
  }
  //
  //
  //
  //
  //
  //
  //
  //
  // 샘플

  // Increment counterNum
  handleIncrement = ({ index }) => {
    this.user = [
      ...this.user.slice(0, index),
      {
        counterNum: this.user[index].counterNum + 1,
      },
      ...this.user.slice(index + 1, this.user.length),
    ];
  };
  // Decrement counterNum
  handleDecrement = ({ index }) => {
    this.user = [
      ...this.user.slice(0, index),
      {
        counterNum: this.user[index].counterNum - 1,
      },
      ...this.user.slice(index + 1, this.user.length),
    ];
  };
}

export default new UserStore();
