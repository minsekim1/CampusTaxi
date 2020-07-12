// const firebase = require("firebase");
// firebase.database().ref();
//#region 파이어베이스 초기화
export const firebaseConfig = {
  apiKey: "AIzaSyAUiJslfRwp0zPIOpu1I-4Xnls7xW-aKnM",
  authDomain: "campustaxi-b0e6c.firebaseapp.com",
  databaseURL: "https://campustaxi-b0e6c.firebaseio.com",
  projectId: "campustaxi-b0e6c",
  storageBucket: "campustaxi-b0e6c.appspot.com",
  messagingSenderId: "1054249413075",
  appId: "1:1054249413075:web:21f8f04c9933fe4cde2726",
  measurementId: "G-LH1WFX6SNM",
};
//#endregion

//#region 파이어베이스 함수들
/*
export function _firebaseinit(firebase) {
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (error) {
    // console.log(error);
  }
}
*/
//#endregion

/*
 *** .set
ref("data/bbs").set('Lovelace');
ref("data/bbs").child('ada/name/last').set('Lovelace');
ref("data/bbs").set({
   first: 'Ada',
   last: 'Lovelace',
 });
 ref("data/bbs").set('Ada', (error) => {
   if (error) console.error(error);
 });


 *** .push
 ref("data/bbs").push();

 const newKey = ref("data/bbs").push();
await newKey.set({
  first: 'Ada',
  last: 'Lovelace',
});

 *** .update
 await firebase.database().ref('users/ada/name').update({
  first: 'Ada',
  last: 'Lovelace',
})

 *** .remove
  firebase.database().ref('users/ada/name').remove();
  await firebase.database().ref('users/ada/name')
 .remove(() => {
   console.log('Operation Complete');
 });

 *** .once / on
 ref.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    // ...
  });
});

데이터 정렬 및 필터링
https://blog.naver.com/tkarnrwl7862/222028142924
*/
