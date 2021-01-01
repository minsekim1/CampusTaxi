// #사용법
// 1. import { userStore } from "../store/store";
// 2. onPress={() => userStore.addUser(1, 2, 3, 4, 5, 6, 7, 8,9,10)}
import { observable, action, reaction, autorun, runInAction } from 'mobx';
import axios from 'axios';
import React, { Component } from 'react';
export default class UserStore {
  state = observable({ user: null });

  // REST API. 기본 CRUD 구성방식
  // 반환: JSON형식, 없으면 null 리턴.

  // User테이블
  // createUser
  // fetch(<EC2:url>/user/create/loginid/.../loginpassword/...) 모든값
  // readUser
  // fetch(<EC2:url>/user/read/userid/userid값)
  // updateUser
  // fetch(<EC2:url>/user/update/userid/userid값/loginid/수정할값)특정값 1개
  // updateUserAll
  // fetch(<EC2:url>/user/updateall/userid/userid값/loginid/수정할값/loginpassword/수정할값2/address/서울특별시/...) 모든 값 대입 수정
  // deleteUser
  // fetch(<EC2:url>/user/delete/userid/userid값)

  // Bbs테이블: createBbs/readBbs/updateBbs/updateBbsAll/deleteBbs
  // user와 마찬가지
  // *단 채팅 내용을 가져올 경우 userid값을 usernickname으로 바꾸어주어야함

  // 채팅: bbs.chats(JSON) appendChat/readChat/deleteChat
  // appendChat
  // fetch(<EC2:url>/bbs/chat/append/bbsid/bbsid값/userid/userid값/say/말한내용/time/시간/isSys/isSys값)
  // fetch(<EC2:url>/bbs/chat/read/bbsid/...)
  // fetch(<EC2:url>/bbs/chat/delete/bbsid/.../chatid/chatid배열인덱스값)

  // 그외: login / readBbsType / readBbs / isEnter / isCreate

  //#region USER
  async createUser(loginid, loginpassword, email, nickname, phone, name, address, studentCard, univ, gender, policy) {
    //const temp = new Parse.File(name + ".png", studentCard, "image/png");
    //temp.save();
    //console.log(temp);

    //같은 아이디/이메일/닉네임이 있는지확인
    const User = Parse.Object.extend('User');
    let result; let query;
    query = new Parse.Query(User);
    query.equalTo('nickname', nickname);
    query.limit(1);
    result = await query.find();
    if (result.length == 1) {
      alert("중복된 닉네임이 있습니다.")
      return false;
    }
    query = new Parse.Query(User);
    query.equalTo('username', loginid);
    query.limit(1);
    result = await query.find();
    if (result.length == 1) {
      alert("중복된 아이디가 있습니다.")
      return false;
    }
    query = new Parse.Query(User);
    query.equalTo('email', email);
    query.limit(1);
    result = await query.find();
    if (result.length == 1) {
      alert("이미 가입된 이메일이 있습니다.")
      return false;
    }

    const obj = new User();
    obj.set('username', loginid);
    obj.set('password', loginpassword);
    obj.set('email', email);
    obj.set('nickname', nickname);
    obj.set('phone', phone);
    obj.set('safePhone', '0100000000');
    obj.set('userPoint', 1);
    obj.set('name', name);
    obj.set('address', address);
    // obj.set('studentCard', file);
    obj.set('univ', univ);
    obj.set('gender', gender);
    obj.set('userStatus', 1);
    obj.set('policy', policy);
    try{
      let rtn = await obj.save();
      if(!!rtn) return true;
    }catch (e){
      alert("가입 에러:"+e)
      return false;
    }
  }
  async readUser_objid(objid) {
    const User = Parse.Object.extend('User');
    const query = new Parse.Query(User);
    return await query.get(objid);
  }
  async readUser_filter(rows, val) {
    const User = Parse.Object.extend('User');
    let query = new Parse.Query(User);
    query.equalTo(rows, val);

    return await query.find();
  }
  updateUser(objKey, row, value) {
    const User = Parse.Object.extend('User');
    const query = new Parse.Query(User);
    query.get(objKey).then((object) => {
      object.set(row, value);
      object.save().then((response) => {
        if (typeof document !== 'undefined') document.write(`Updated User: ${JSON.stringify(response)}`);
        console.log('Updated User', response);
      }, (error) => {
        if (typeof document !== 'undefined') document.write(`Error while updating User: ${JSON.stringify(error)}`);
        console.error('Error while updating User', error);
      });
    });
  }
  deleteUser(objKey) {
    const User = Parse.Object.extend('User');
    const query = new Parse.Query(User);
    query.get(objKey).then((object) => {
      object.destroy().then((response) => {
        if (typeof document !== 'undefined') document.write(`Deleted User: ${JSON.stringify(response)}`);
        console.log('Deleted User', response);
      }, (error) => {
        if (typeof document !== 'undefined') document.write(`Error while deleting User: ${JSON.stringify(error)}`);
        console.error('Error while deleting User', error);
      });
    });
  }
  async login(username, password) {
    await Parse.User.logIn(username, password).then((r) => { this.user = r }).catch(error => {
      this.user = null;
      alert('로그인에 실패했습니다. 아이디, 비밀번호를 확인해주세요.\n' + error);
    }); return this.user;
  }
  logout() { Parse.User.logOut(); }

  verifyingEmail(email) {
    axios({
      method: 'post',
      url: '/user/12345',
      data: {
        firstName: 'Fred',
        lastName: 'Flintstone'
      }
    });
    // const https = require('axios');
    // const params = '{"email": ' + email + '}';
    // const options = {
    //   hostname: 'https://parseapi.back4app.com',
    //   path: '/verificationEmailRequest',
    //   method: 'POST',
    //   headers: {
    //     'X-Parse-Application-Id': 'QIxx0z05s7WTf8IDw3vejf6IBS2Zi6n29e8UOUtE',
    //     'X-Parse-REST-API-Key': 'x9B5zmNSw9n3rBlODMptjBK7sZ4Jna9VL9x9wIqv',
    //     'Content-Type': 'application/json'
    //   }
    // };
    axios.post('https://parseapi.back4app.com', { email: email })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async findUniv(univname) {
    let univs = []
    let query = new Parse.Query("univ");
    query.contains("univ_name", univname);
    query.limit(4);
    let r = await query.find().catch(function (error) { console.log("Error: " + error.code + " " + error.message); })
    if (r) {
      univs = r.map((user) => {
        return {
          id: user.id,
          univ_name: user.attributes.univ_name
        };
      });
      return univs;
    }
  }
  imageUpload(file) {
    // const uri = String(file.uri).replace("file:/", "");
    // const temp = new Parse.File("thumbnail-image.jpg", uri, "image/png");
    // temp.save();
    var RNFS = require("react-native-fs");
    const imagePath = `${RNFS.MainBundlePath}/${new Date().toISOString()}.jpg`.replace(/:/g, '-');
    if (Platform.OS === 'ios') {
      RNFS.copyAssetsFileIOS(file.origURL, imagePath, 0, 0)
        .then(res => { })
        .catch(err => {
          console.log('ERROR: image file write failed!!!');
          console.log(err.message, err.code);
        });
    } else if (Platform.OS === 'android') {
      RNFS.copyFile(file.uri, imagePath)
        .then(res => { })
        .catch(err => {
          console.log('ERROR: image file write failed!!!');
          console.log(err.message, err.code);
        });
    }
  }
  //#endregion
  //#region BBS
  async createBbs(bbstype, meetingdate, max, gender, startplace, endplace, cost) {
    const bbs = Parse.Object.extend('bbs');
    const User = (await this.readUser_filter("nickname", this.user.get('nickname')))[0];
    const newObj = new bbs();
    newObj.set('available', 1);
    newObj.set('bbstype', bbstype);
    newObj.set('leader', User);
    newObj.set('meetingdate', meetingdate);
    newObj.set('gender', gender);
    newObj.set('personmax', max);
    newObj.set('personpresent', 1);
    newObj.set('personmember', [User]);
    newObj.set('startplace', startplace);
    newObj.set('endplace', endplace);
    newObj.set('cost', cost);
    newObj.save().then((r) => {
      if (typeof document !== 'undefined') document.write(`bbs created: ${JSON.stringify(r)}`);
      console.log('bbs created', r);
    }, (e) => {
      if (typeof document !== 'undefined') document.write(`Error while creating bbs: ${JSON.stringify(e)}`);
      console.error('Error while creating bbs: ', e);
    }
    );
  }
  async readBbs_objid(objid) {
    const bbs = Parse.Object.extend('bbs');
    const query = new Parse.Query(bbs);
    return await query.get(objid);
  }
  async readBbs_filter(rows, val) {
    const bbs = Parse.Object.extend('bbs');
    let query = new Parse.Query(bbs);
    query.equalTo(rows, val);
    query.equalTo('available', 1);
    return await query.find();
  }
  async readBbs_member() {
    const bbs = Parse.Object.extend('bbs');
    let query = new Parse.Query(bbs);
    //query.contains('personmember', JSON.stringify({ "__type": "Pointer", "className": "_User", "objectId": "TFjwzSSSkc" }));
    let result = [];
    query.equalTo('available', 1);
    let r = await query.find();
    for (let bbsT = 0; bbsT < r.length; bbsT++) {
      for (let userT = 0; userT < r[bbsT].get('personmember').length; userT++) {
        if (r[bbsT].get('personmember')[userT].get('nickname') == this.user.get('nickname')) {
          result.push(r[bbsT]);
          break;
        }
      }
    }
    return result;
  }
  updateBbs(objKey, row, value) {
    const bbs = Parse.Object.extend('bbs');
    const query = new Parse.Query(bbs);
    query.get(objKey).then((object) => {
      object.set(row, value);
      object.save().then((response) => {
        if (typeof document !== 'undefined') document.write(`Updated bbs: ${JSON.stringify(response)}`);
        console.log('Updated bbs');
      }, (error) => {
        if (typeof document !== 'undefined') document.write(`Error while updating bbs: ${JSON.stringify(error)}`);
        console.error('Error while updating bbs', error);
      });
    });
  }
  deleteBbs(objKey) {
    const bbs = Parse.Object.extend('bbs');
    const query = new Parse.Query(bbs);
    query.get(objKey).then((object) => {
      object.destroy().then((response) => {
        if (typeof document !== 'undefined') document.write(`Deleted bbs: ${JSON.stringify(response)}`);
        console.log('Deleted bbs', response);
      }, (error) => {
        if (typeof document !== 'undefined') document.write(`Error while deleting bbs: ${JSON.stringify(error)}`);
        console.error('Error while deleting bbs', error);
      });
    });
  }
  async isEnter(bbs) {
    // REST API 3-1. chatScreen.js isEnter 유저가 방에 들어갈 수 있는지
    // 유저가 속한 bbstype(etc. 등교)의 수가 0인지 확인
    // true이면 bbs.bbsmember에 userid를 추가하고 bbs.persent를 1증가시킴.
    const objid = JSON.parse(JSON.stringify(bbs)).objectId;
    bbs = await this.readBbs_objid(objid);
    if (bbs.get('gender') != 2 && bbs.get('gender') != this.user.get('gender')) {
      alert("해당방은 성별 제한이 걸려있습니다.");
    } else if (Number(bbs.get('personpresent')) >= Number(bbs.get('personmax'))) {
      alert("방이 가득찼습니다.");
    } else if (bbs.get('available') != 1) {
      alert("삭제된 방입니다.");
    } else {
      const bbsSet = Parse.Object.extend('bbs');
      let query = new Parse.Query(bbsSet);
      query.equalTo("leader", this.user);
      query.equalTo("bbstype", bbs.get('bbstype'));
      query.equalTo("available", 1);
      query.notEqualTo("objectId", objid);
      query.limit(1);
      let result = await query.find();
      if (result.length == 0) {
        const condition1 = await bbs.get('personmember').find(i => i.get('nickname') == this.user.get('nickname'));
        if (!condition1) {
          bbs.get('personmember').push(this.user);
          bbs.set('personmember', bbs.get('personmember'));
          bbs.set('personpresent', bbs.get('personpresent') + 1);
          bbs.save().then((response) => {
            if (typeof document !== 'undefined') document.write(`enter person: ${JSON.stringify(response)}`);
            console.log('enter person');
          }, (error) => {
            if (typeof document !== 'undefined') document.write(`Error while enter person: ${JSON.stringify(error)}`);
            console.error('Error while enter person', error);
          });
        }
        return true;
      } else {
        alert("채팅방은 카테고리별로 1개만 들어갈 수 있습니다. 내 채팅->채팅방->사람아이콘 클릭에서 채팅방 나가기를 해주세요.");
      }
    }
    return false;
  }
  async isCreate(bbstype) {
    const bbs = Parse.Object.extend('bbs');
    let query = new Parse.Query(bbs);
    query.equalTo("leader", this.user);
    query.equalTo("bbstype", bbstype);
    query.equalTo("available", 1);
    query.limit(1);
    let result = await query.find();
    if (result.length == 0)
      return true;
    else
      alert("채팅방은 카테고리별로 1개만 만들 수 있습니다. 내 채팅->채팅방->사람아이콘 클릭에서 채팅방 나가기를 해주세요.");
    return false;
  }
  async leaderPass(bbs, toUser) {
    (await this.readUser_filter("nickname", this.user.get('nickname')))[0];
    const objid = JSON.parse(JSON.stringify(bbs)).objectId;
    return await this.updateBbs(objid, 'leader', toUser);
  }
  async outRoom(bbs) {
    const objid = JSON.parse(JSON.stringify(bbs)).objectId;
    if (bbs.get('leader').get('nickname') == this.user.get('nickname')) {
      if (bbs.get('personmember').length == 1) {
        //방폐쇄
        await this.updateBbs(objid, 'available', 0);
      } else {
        //리더양도 && 방나가기
        let arr = bbs.get('personmember');
        for (let i = 0; i < arr.length; i++)
          if (arr[i].get('nickname') != this.user.get('nickname')) { this.leaderPass(bbs, arr[i]); break; }
        bbs.set('personpresent', bbs.get('personpresent') - 1);
        bbs.set('personmember', arr.filter(i => i != this.user));
        bbs.save();
      }
    } else {
      //방나가기
      let arr = bbs.get('personmember');
      bbs.set('personpresent', bbs.get('personpresent') - 1);
      bbs.set('personmember', arr.filter(i => i.get('nickname') != this.user.get('nickname')));
      bbs.save();
    }
    console.log('outRoom');
  }
  async kickUser(bbs, userNickname) {
    let arr = bbs.get('personmember');
    bbs.set('personpresent', bbs.get('personpresent') - 1);
    bbs.set('personmember', arr.filter(i => i.get('nickname') != userNickname));
    bbs.save();
    console.log('kickUser');
  }
  //#endregion
  //#region chat
  async readChats(bbs) {
    const chat = Parse.Object.extend('chat');
    let query = new Parse.Query(chat);
    query.equalTo('bbs', bbs);
    return await query.find();
  }
  async appendChat(bbs, say) {
    // REST API 7. bbsid, say, user 이용해 채팅 추가후 bbs 1개 json반환
    const chat = Parse.Object.extend('chat');
    const newObj = new chat();
    newObj.set('say', say);
    newObj.set('isSys', 0);
    newObj.set('user', this.user);
    newObj.set('bbs', bbs);
    let a = await newObj.save();
    if (typeof a !== 'undefined') console.log('chat append');
    return a;
  }
  //#endregion
  //////////////////////////////////////////////////
  //#region Util 안건드려도돼는 부분
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
  toRoomDateKR(date) {
    const arr = ["Mon", "월", "Tue", "화", "Wed", "수", "Thu", "목", "Fri", "금", "Sat", "토", "Sun", "일", "Jan", "1", "Feb", "2", "Mar", "3", "Apr", "4", "May", "5", "Jun", "6", "Jul", "7", "Aug", "8", "Sep", "9", "Oct", "10", "Nov", "11", "Dec", "12"]
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
    let now = new Date();
    let condition1 = String(now.getMonth() + 1) == date[1];
    let condition2 = String(now.getDate()) == date[2];
    let condition4 = String(now.getDate() + 1) == date[2];
    let condition5 = String(now.getDate() - 1) == date[2];
    let condition3 = String(now.getFullYear()) == date[3];
    if (condition3 && condition1 && condition5)
      date = "어제 " + date[4].substring(0, 5) + "(" + date[0] + ")";
    else if (condition3 && condition1 && condition4)
      date = "내일 " + date[4].substring(0, 5) + "(" + date[0] + ")";
    else if (condition3 && condition1 && condition2)
      date = "오늘 " + date[4].substring(0, 5) + "(" + date[0] + ")";
    else if (condition3)
      date = date[1] + "월 " + date[2] + "일 " + date[4].substring(0, 5) + "(" + date[0] + ")";
    else
      date = date[3] + "년 " + date[1] + "월 " + date[2] + "일 " + date[4].substring(0, 5) + "(" + date[0] + ")";
    return date;
  }
  toTime(date) {
    date = String(date).split(" ");
    date = date[4];
    return date;
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

const { AsyncStorage } = require('react-native');
const Parse = require('parse/react-native');
Parse.setAsyncStorage(AsyncStorage);
Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'QIxx0z05s7WTf8IDw3vejf6IBS2Zi6n29e8UOUtE', // This is your Application ID
  'tlWTYuPFV70yWFnSGPni91d1zL1etwwCIwYqDh3m' // This is your Javascript key
);
//#endregion