// #사용법
// 1. import Userstore from "store";
// 2. onPress={() => userStore.addUser(1, 2, 3, 4, 5, 6, 7, 8,9,10)}

export default class UserStore {
  @observable user = null;
  @observable develop = false; //개발전용모드

  getUser(id, passsword) {
    // REST API 0. getUser
    // fetch(url:id/'id'/password/'password')
    this.user = { "id": 1, "name": "minsekim", "univ": "univ 1", "email": "email 1", "phone": "phone 1", "gender": 1, "policy": "policy 1", "address": "address 1", "loginid": "loginid 1", "joindate": "2020-11-15 00:09:46.000000", "nickname": "minsekim", "safePhone": "safePhone 1", "userPoint": 1, "userStatus": 1, "studentCard": "studentCard 1", "loginpassword": "loginpassword 1" };
  }
  async getBbsType(bbstype) {
    // REST API 2. chats을 제외하고 bbstype이 같은 모든 방목록 JSON으로 받기
    // setBbslist(data);
    // {...bbs1번, ...bbs2번}
    return ([{ "cost": 1, "bbsid": 1, "gender": 1, "bbsDate": "2020-11-15 00:09:46.000000", "bbstype": 1, "endplace": "endplace 1", "available": 1, "personmax": 1, "leadername": "minsekim", "startplace": "startplace 1", "meetingdate": "2020-11-15 00:09:46.000000", "personmember": "personmember 1", "personpresent": 0 }
      , { "cost": 2, "bbsid": 2, "gender": 2, "bbsDate": "2020-11-15 00:09:46.000000", "bbstype": 1, "endplace": "endplace 2", "available": 1, "personmax": 2, "leadername": "ohju", "startplace": "startplace 2", "meetingdate": "2020-11-15 00:09:46.000000", "personmember": "personmember 2", "personpresent": 1 }])
  }
  async getBbs(bbsid) {
    // REST API 5. bbsid를 통해 특정 bbs하나만 가져오는 것.(chats포함)
    return ({ "cost": 1, "bbsid": 1, "chats": [{ "say": "님이 입장하셨습니다.", "time": "2020-11-14 22:22:06", "isSys": 2, "nickname": "minsekim" }, { "say": "테스트 공지사항입니다.", "time": "2020-11-14 22:22:06", "isSys": 1, "nickname": "NULL" }, { "say": "안녕하세요?", "time": "2020-11-14 22:22:06", "isSys": 0, "nickname": "minsekim" }, { "say": "테스트 공지사항입니다.", "time": "2020-11-14 22:22:06", "isSys": 1, "nickname": "NULL" }, { "say": "안녕하세요?", "time": "2020-11-14 22:22:06", "isSys": 0, "nickname": "minsekim" }, { "say": "테스트 공지사항입니다.", "time": "2020-11-14 22:22:06", "isSys": 1, "nickname": "NULL" }, { "say": "안녕하세요?", "time": "2020-11-14 22:22:06", "isSys": 0, "nickname": "minsekim" }, { "say": "테스트 공지사항입니다.", "time": "2020-11-14 22:22:06", "isSys": 1, "nickname": "NULL" }, { "say": "안녕하세요?", "time": "2020-11-14 22:22:06", "isSys": 0, "nickname": "minsekim" }, { "say": "테스트 공지사항입니다.", "time": "2020-11-14 22:22:06", "isSys": 1, "nickname": "NULL" }, { "say": "안녕하세요?", "time": "2020-11-14 22:22:06", "isSys": 0, "nickname": "minsekim" }], "gender": 1, "bbsDate": "2020-11-15 00:09:46.000000", "bbstype": 1, "endplace": "endplace 1", "available": 1, "personmax": 4, "leadername": 1, "startplace": "startplace 1", "meetingdate": "2020-11-15 00:09:46.000000", "personmember": "personmember 1", "personpresent": 1 });
  }
  async getIsEnter(bbs) {
    const update = await this.getBbs(bbs.bbsid);
    if (update.gender != 2 && update.gender != this.user.gender) {//성별 제한 있으면서 같은 성별이 아니다
      alert("해당방은 성별 제한이 걸려있습니다.");
      return false;
      // REST API 3. chatScreen.js isEnter 
      // RESTAPI 통해서 fetch return false/true
    } else if (update.personpresent >= update.personmax) {
      alert("방이 가득찼습니다.");
      return false;
    } else if (false) { //유저가 속한 bbstype(etc. 등교)의 수가 0인지 확인
      alert(
        "채팅방은 카테고리별로 1개만 들어갈 수 있습니다. 내 채팅->채팅방->사람아이콘 클릭에서 채팅방 나가기를 해주세요."
      );
      return false;
    } else if (update.available != 1) { //해당 방이 삭제됐는지 if(bbs.available != 0)
      alert("삭제된 방입니다.");
      return false;
    }
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
}

import { observable } from "mobx";