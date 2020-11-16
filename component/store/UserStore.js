// #사용법
// 1. import Userstore from "store";
// 2. onPress={() => userStore.addUser(1, 2, 3, 4, 5, 6, 7, 8,9,10)}
import { observable, reaction, computed, autorun } from 'mobx';

export default class UserStore {
  @observable user = null;

  // REST API. 기본 CRUD 구성방식
  // 반환: JSON형식, 없으면 null 리턴.

  // User테이블
  // createUser
  // fetch(<EC2:url>/user/create/loginid/.../loginpassword/...) 모든값
  // getUser
  // fetch(<EC2:url>/user/get/userid/userid값)
  // updateUser
  // fetch(<EC2:url>/user/update/userid/userid값/loginid/수정할값)특정값 1개
  // updateUserAll
  // fetch(<EC2:url>/user/updateall/userid/userid값/loginid/수정할값/loginpassword/수정할값2/address/서울특별시/...) 모든 값 대입 수정
  // deleteUser
  // fetch(<EC2:url>/user/delete/userid/userid값)

  // Bbs테이블: createBbs/getBbs/updateBbs/updateBbsAll/deleteBbs
  // user와 마찬가지
  // *단 채팅 내용을 가져올 경우 userid값을 usernickname으로 바꾸어주어야함

  // 채팅: bbs.chats(JSON) appendChat/getChat/deleteChat
  // appendChat
  // fetch(<EC2:url>/bbs/chat/append/bbsid/bbsid값/userid/userid값/say/말한내용/time/시간/isSys/isSys값)
  // fetch(<EC2:url>/bbs/chat/get/bbsid/...)
  // fetch(<EC2:url>/bbs/chat/delete/bbsid/.../chatid/chatid배열인덱스값)

  // 그외: login / getBbsType / getBbs / isEnter / isCreate

  async login(id, passsword) {
    // REST API. login
    // fetch(<EC2:url>/user/login/loginid/아이디/password/비밀번호)
    // return null 또는 user 1명의 JSON형식
    this.user = { "id": 1, "name": "minsekim", "univ": "univ 1", "email": "email 1", "phone": "phone 1", "gender": 1, "policy": "policy 1", "address": "address 1", "loginid": "loginid 1", "joindate": "2020-11-15 00:09:46.000000", "nickname": "minsekim", "safePhone": "safePhone 1", "userPoint": 1, "userStatus": 1, "studentCard": "studentCard 1", "loginpassword": "loginpassword 1" };
    return (this.user);
  }
  async getBbsType(bbstype) {
    // REST API 2. chats을 제외하고 bbstype이 같은 모든 방목록 JSON으로 받기
    // fetch(<EC2:url>/bbs/get/bbstype/bbstype값) 1:등교, 2:하교, 3:야작...
    // setBbslist(data);
    // {...bbs1번, ...bbs2번}
    return ([{ "cost": 1, "bbsid": 1, "gender": 1, "bbsDate": "2020-11-15 00:09:46.000000", "bbstype": 1, "endplace": "endplace 1", "available": 1, "personmax": 1, "leadername": "minsekim", "startplace": "startplace 1", "meetingdate": "2020-11-15 00:09:46.000000", "personmember": "personmember 1", "personpresent": 0 }
      , { "cost": 2, "bbsid": 2, "gender": 2, "bbsDate": "2020-11-15 00:09:46.000000", "bbstype": 1, "endplace": "endplace 2", "available": 1, "personmax": 2, "leadername": "ohju", "startplace": "startplace 2", "meetingdate": "2020-11-15 00:09:46.000000", "personmember": "personmember 2", "personpresent": 1 }])
  }
  async getBbs(bbsid) {
    // REST API 5. bbsid를 통해 특정 bbs하나만 가져오는 것.(chats포함)
    // fetch(<EC2:url>/bbs/get/bbsid/bbsid값)
    return ({ "cost": 1, "bbsid": 1, "chats": [{ "say": "님이 입장하셨습니다.", "time": "2020-11-14 22:22:06", "isSys": 2, "nickname": "minsekim" }, { "say": "테스트 공지사항입니다.", "time": "2020-11-14 22:22:06", "isSys": 1, "nickname": "NULL" }, { "say": "안녕하세요?", "time": "2020-11-14 22:22:06", "isSys": 0, "nickname": "minsekim" }, { "say": "테스트 공지사항입니다.", "time": "2020-11-14 22:22:06", "isSys": 1, "nickname": "NULL" }, { "say": "안녕하세요?", "time": "2020-11-14 22:22:06", "isSys": 0, "nickname": "minsekim" }, { "say": "테스트 공지사항입니다.", "time": "2020-11-14 22:22:06", "isSys": 1, "nickname": "NULL" }, { "say": "안녕하세요?", "time": "2020-11-14 22:22:06", "isSys": 0, "nickname": "minsekim" }, { "say": "테스트 공지사항입니다.", "time": "2020-11-14 22:22:06", "isSys": 1, "nickname": "NULL" }, { "say": "안녕하세요?", "time": "2020-11-14 22:22:06", "isSys": 0, "nickname": "minsekim" }, { "say": "테스트 공지사항입니다.", "time": "2020-11-14 22:22:06", "isSys": 1, "nickname": "NULL" }, { "say": "안녕하세요?", "time": "2020-11-14 22:22:06", "isSys": 0, "nickname": "minsekim" }], "gender": 1, "bbsDate": "2020-11-15 00:09:46.000000", "bbstype": 1, "endplace": "endplace 1", "available": 1, "personmax": 4, "leadername": 1, "startplace": "startplace 1", "meetingdate": "2020-11-15 00:09:46.000000", "personmember": "personmember 1", "personpresent": 1 });
  }
  async isEnter(bbs) {
    const update = await this.getBbs(bbs.bbsid);
    if (update.gender != 2 && update.gender != this.user.gender) {
      alert("해당방은 성별 제한이 걸려있습니다.");
      return false;
    } else if (update.personpresent >= update.personmax) {
      alert("방이 가득찼습니다.");
      return false;
    } else if (false) {
      // REST API 3-1. chatScreen.js isEnter 유저가 방에 들어갈 수 있는지
      // 유저가 속한 bbstype(etc. 등교)의 수가 0인지 확인
      // true이면 bbs.bbsmember에 userid를 추가하고 bbs.persent를 1증가시킴.
      // fetch(<EC2:url>/bbs/isenter/userid/userid값/bbstype/bbstype값)
      // 반환: true/false
      alert(
        "채팅방은 카테고리별로 1개만 들어갈 수 있습니다. 내 채팅->채팅방->사람아이콘 클릭에서 채팅방 나가기를 해주세요."
      );
      return false;
    } else if (update.available != 1) {
      alert("삭제된 방입니다.");
      return false;
    }
    return true;
  }

  async isCreate(bbstype) {
    //REST API 3 - 2. createRoom.js isCreate
    //fetch(<EC2:url>/bbs/iscreate/userid/2/bbstype/1
    //반환 true / false
    // * if조건: isEnter과 비슷하게 카테고리(bbsytype)별로 1개씩만 만들 수 있음
    //isEnter과는 다르게 bbs의 값을 올리지 않음.
    return true;
  }
  async appendChat(bbsid, say) {
    // REST API 7. bbsid, say, user 이용해 채팅 추가후 bbs 1개 json반환
    // 올바르게 들어갔으면 bbs를 리턴합니다.
    // return getBbs(bbsid);
    const time = new Date();
    const user = this.user;
    let result = await this.getBbs(bbsid);
    return result;
    // 문제있으면 return false;
  }
  // 안건드려도돼는 부분
  // async getServerTime() {
  //   fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
  //     .then((res) => res.json())
  //     .then((result) => {
  //       return (result.datetime.slice(0, 21) + result.datetime.slice(26, 32));
  //     });
  // }
  tokoreanTime(date) {
    const arr = ["Mon", "월", "Tue", "화", "Wed", "수", "Thu", "목", "Fri", "금", "Sat", "토", "Sun", "일", "Jan", "1월", "Feb", "2월", "Mar", "3월", "Apr", "4월", "May", "5월", "Jun", "6월", "Jul", "7월", "Aug", "8월", "Sep", "9월", "Oct", "10월", "Nov", "11월", "Dec", "12월",
    ]
    // date = String(date);
    date = String(date).split(" ");
    for (let j = 0; date[j] != null; j++) {
      for (let i = 0; arr[i] != null; i += 2) {
        if (date[j] == arr[i]) {
          date[j] = date[j].replace(arr[i], arr[i + 1]);
          j++;
          i = 0;
        }
      }
    }
    date = date[3] + "년 " + date[1] + " " + date[2] + "일 " + date[4] + "(" + date[0] + ")";
    return date;
  }
  logout() {
    this.user = null;
  }
}
// const testFunc = () => {
//   var request = new XMLHttpRequest();

//   request.open("POST", "https://toss.im/transfer-web/linkgen-api/link");

//   request.setRequestHeader("Content-Type", "application/json");

//   request.onreadystatechange = function () {
//     if (this.readyState === 4) {
//       // console.log("Status:", this.status);
//       //console.log("Headers:", this.getAllResponseHeaders());
//       //console.log("Body:", this.responseText);
//       setTest(JSON.parse(this.responseText).success.link);
//     }
//   };

//   var body = {
//     apiKey: "dcf102a946024eafb1c3d61cbdba3c47",
//     bankName: "신한",
//     bankAccountNo: "1100452752310",
//     amount: 15000,
//     message: "토스입금버튼",
//   };

//   request.send(JSON.stringify(body));
// };        {/* sssssssssssssssssss */}
{/* <Button title="테스트버튼" onPress={testFunc} />
        <Button title="토스연동버튼" onPress={() => console.log(test)} /> */}
{/* sssssssssssssssssss */ }