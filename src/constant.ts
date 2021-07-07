import { Dimensions } from "react-native";
import fb from "firebase/app";
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAUiJslfRwp0zPIOpu1I-4Xnls7xW-aKnM",
  authDomain: "campustaxi-b0e6c.firebaseapp.com",
  databaseURL: "https://campustaxi-b0e6c.firebaseio.com",
  projectId: "campustaxi-b0e6c",
  storageBucket: "campustaxi-b0e6c.appspot.com",
  messagingSenderId: "1054249413075",
  appId: "1:1054249413075:web:21f8f04c9933fe4cde2726",
  measurementId: "G-LH1WFX6SNM",
};
export const socketURL = {
  minsekimHome: "http://124.5.120.66:3000/",
  minsekimOffice: "http://210.102.225.68:3000",
  AWSnodejsLoadBanlancer: "https://minsekim.campustaxi.net:444/",
}["minsekimOffice"];
export const premiumURL = socketURL;
export const MYfirebase = !fb.apps.length
  ? fb.initializeApp(FIREBASE_CONFIG)
  : fb.app();
export const API_URL = "https://api.campustaxi.net/api";
export const GOOGLE_MAPAPI_URL = "AIzaSyCIZWZIHKTGvqSu_WPF0i6M5GDybT9UO9k";
export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
export const TMAP_API =
  "https://apis.openapi.sk.com/tmap/routes?version=1&appKey=l7xxa01cff937e0c4f39a137901d9e680001&";

export const UNIV_LIST = [
  "가야대학교",
  "가천대학교 글로벌캠퍼스",
  "가천대학교 메디컬캠퍼스",
  "가톨릭 상지대학교",
  "가톨릭관동대학교",
  "감리교신학대학교",
  "강남대학교",
  "강동대학교",
  "강릉영동대학교",
  "강릉원주대학교",
  "강원관광대학교",
  "강원대학교 도계캠퍼스",
  "강원대학교 삼척캠퍼스",
  "강원대학교 춘천캠퍼스",
  "강원도립대학교",
  "거제대학교",
  "건국대학교",
  "건국대학교 글로컬캠퍼스",
  "건양대학교 논산캠퍼스",
  "건양대학교 대전메디컬캠퍼스",
  "건양사이버대학교",
  "겐트대학교",
  "경기과학기술대학교",
  "경기대학교 서울캠퍼스",
  "경기대학교 수원캠퍼스",
  "경남과학기술대학교",
  "경남대학교",
  "경남도립남해대",
  "경남정보대학교",
  "경동대학교 메디컬캠퍼스",
  "경동대학교 설악제2캠퍼스",
  "경동대학교 양주캠퍼스",
  "경민대학교",
  "경복대학교 남양주캠퍼스",
  "경복대학교 포천캠퍼스",
  "경북과학대학교",
  "경북대학교",
  "경북도립대학교",
  "경북보건대학교",
  "경북전문대학교",
  "경상대학교",
  "경성대학교",
  "경운대학교",
  "경인교육대학교 경기캠퍼스",
  "경인교육대학교 인천캠퍼스",
  "경인여자대학교",
  "경일대학교",
  "경주대학교",
  "경찰대학교",
  "경희대학교 국제캠퍼스",
  "경희대학교 서울캠퍼스",
  "경희사이버대학교",
  "계명대학교 대명캠퍼스",
  "계명대학교 성서캠퍼스",
  "계명문화대학교",
  "계원예술대학교",
  "고구려대학교",
  "고려대학교 안암캠퍼스",
  "고려대학교(세종캠퍼스)",
  "고려사이버대학교",
  "고신대학교 송도캠퍼스",
  "고신대학교 영도캠퍼스",
  "공주교육대학교",
  "공주대학교 신관캠퍼스",
  "공주대학교 예산캠퍼스",
  "공주대학교 옥룡캠퍼스",
  "공주대학교 천안캠퍼스",
  "광신대학교",
  "광양보건대학교",
  "광운대학교",
  "광주가톨릭대학교",
  "광주과학기술원",
  "광주교대",
  "광주대학교",
  "광주보건대학교",
  "광주여자대학교",
  "구미대학교",
  "국민대학교",
  "국제대학교",
  "국제사이버대학교",
  "국제예술대학교",
  "군산간호대학교",
  "군산대학교",
  "군장대학교",
  "극동대학교",
  "글로벌사이버대학교",
  "금강대학교",
  "금오공과대학교",
  "기독간호대학교",
  "김천대학교",
  "김포대학교",
  "김해대학교",
  "꽃동네대학교",
  "나사렛대학교",
  "남부대학교",
  "남서울대학교",
  "농협대학교",
  "단국대학교 죽전캠퍼스",
  "단국대학교 천안캠퍼스",
  "대경대학교",
  "대구가톨릭대학교 루가캠퍼스",
  "대구가톨릭대학교 유스티노캠퍼스",
  "대구가톨릭대학교 효성캠퍼스",
  "대구경북과학기술원",
  "대구공업대학교",
  "대구과학대학교",
  "대구교육대학교",
  "대구대학교 경산캠퍼스",
  "대구대학교 대명동캠퍼스",
  "대구보건대학교",
  "대구사이버대학교",
  "대구예술대학교",
  "대구한의대학교 삼성캠퍼스",
  "대구한의대학교 수성캠퍼스",
  "대구한의대학교 오성캠퍼스",
  "대덕대학교",
  "대동대학교",
  "대림대학교",
  "대신대학교",
  "대원대학교",
  "대전가톨릭대학교",
  "대전과기대",
  "대전대학교",
  "대전보건대학교",
  "대전신학대학교",
  "대진대학교",
  "덕성여자대학교",
  "동강대학교",
  "동국대학교 경주캠퍼스",
  "동남보건대학교",
  "동덕여자대학교",
  "동명대학교",
  "동서대학교",
  "동서울대학교",
  "동신대학교",
  "동아대학교",
  "동아방송예술대학교",
  "동아인재대학교",
  "동양대학교",
  "동양미래대학교",
  "동원과학기술대학교",
  "동원대학교",
  "동의과학대학교",
  "동의대학교",
  "동주대학교",
  "두원공학대학교",
  "디지털서울문화예술대학교",
  "루터대학교",
  "마산대학교",
  "명지대학교",
  "명지전문대학",
  "목원대학교",
  "목포가톨릭대학교",
  "목포과학대",
  "목포대학교",
  "목포해양대",
  "문경대학교",
  "배재대학교",
  "배화여자대학교",
  "백석대학교",
  "백석예대",
  "부경대학교",
  "부산가톨릭대학교",
  "부산경상대학교",
  "부산과학기술대학교",
  "부산교육대학교",
  "부산대학교",
  "부산디지털대학교",
  "부산여자대학교",
  "부산예술대학교",
  "부산외국어대학교",
  "부산장신대학교",
  "부천대학교",
  "사이버한국외대",
  "삼육대학교",
  "삼육보건대학교",
  "상명대학교",
  "상지대학교",
  "서강대학교",
  "서경대학교",
  "서라벌대학교",
  "서영대학교",
  "서울과학기술대학교",
  "서울교육대학교",
  "서울기독대학교",
  "서울대학교",
  "서울디지털대학교",
  "서울사이버대학교",
  "서울시립대학교",
  "서울신학대학교",
  "서울여자간호대학교",
  "서울여자대학교",
  "서울예대",
  "서울장신대학교",
  "서울호텔종합전문학교",
  "서원대학교",
  "서일대학교",
  "서정대학교",
  "서해대학교",
  "선린대학교",
  "선문대학교",
  "성결대학교",
  "성공회대학교",
  "성균관대학교",
  "성신여자대학교",
  "성운대학교",
  "세경대학교",
  "세명대학교",
  "세종대학교",
  "세종사이버대학교",
  "세한대학교",
  "송곡대학교",
  "송원대학교",
  "송호대학교",
  "수성대학교",
  "수원가톨릭대학교",
  "수원과학대",
  "수원대학교",
  "수원여자대학교",
  "숙명여자대학교",
  "순천대학교",
  "순천제일대학교",
  "순천향대학교",
  "숭실대학교",
  "숭실사이버대학교",
  "숭의여자대학교",
  "신경대학교",
  "신구대학교",
  "신라대학교",
  "신성대학교",
  "신안산대학교",
  "신한대학교",
  "아세아연합신학대학교",
  "아주대학교",
  "아주자동차대학교",
  "안동과학대학교",
  "안동대학교",
  "안산대학교",
  "안양대학교",
  "여주대학교",
  "연성대학교",
  "연세대학교",
  "연세대학교 미래캠퍼스",
  "연암공업대학교",
  "연암대학교 천안캠퍼스",
  "영남신학대학교",
  "영남외대",
  "영남이공대학교",
  "영동대학교",
  "영산대학교 양산캠퍼스",
  "영산선학대학교",
  "영진사이버대학교",
  "영진전문대학교",
  "예수대학교",
  "예원예술대학교",
  "오산대학교",
  "용인대학교",
  "용인송담대학교",
  "우석대학교",
  "우송대학교",
  "우송정보대학교",
  "울산과학기술대학교",
  "울산과학대학교",
  "울산대학교",
  "웅지세무대학교",
  "원광대학교",
  "위덕대학교",
  "유한대학교",
  "을지대학교",
  "이화여자대학교",
  "인덕대학교",
  "인제대학교",
  "인천가톨릭대학교",
  "인천대학교",
  "인천재능대학교",
  "인하공업전문대학교",
  "인하대학교",
  "장로회신학대학교",
  "장안대학교",
  "전남과학대학교",
  "전남대 용봉캠퍼스",
  "전남대 학동캠퍼스",
  "전남도립대학교 담양캠퍼스",
  "전북과학대학교",
  "전북대",
  "전주교대",
  "전주기전대학교",
  "전주대학교",
  "전주비전대학교",
  "정석대학교",
  "정화예대",
  "제주관광대",
  "제주국제대",
  "제주대학교",
  "제주한라대",
  "조선간호대",
  "조선대학교",
  "중부대학교",
  "중앙대학교",
  "중앙승가대학교",
  "중원대학교",
  "진주교대",
  "진주보건대",
  "차의과학대학교",
  "창신대학교",
  "창원대학교",
  "창원문성대",
  "청강문화산업대",
  "청암대학교",
  "청운대학교",
  "청주교대",
  "청주대학교",
  "초당대학교",
  "총신대학교",
  "추계예술대학교",
  "춘천교대",
  "춘해보건대",
  "충남대학교",
  "충남도립대학교",
  "충북대학교",
  "충북도립대학교",
  "충북보건과학대",
  "충청대학교",
  "치의과학대",
  "침례신학대학교",
  "카이스트(KAIST)",
  "칼빈대학교",
  "평택대학교",
  "포항공대",
  "포항대학교",
  "한경대학교",
  "한국골프대",
  "한국관광대학교",
  "한국교원대학교",
  "한국교통대학교",
  "한국국제대학교",
  "한국기술교대",
  "한국농수산대",
  "한국뉴욕주립대",
  "한국방송통신대학교",
  "한국복지대학교",
  "한국복지사이버대학교",
  "한국산업기술대학교",
  "한국성서대학교",
  "한국승강기대학교",
  "한국열린사이버대학교",
  "한국영상대학교",
  "한국예술종합학교",
  "한국외국어대학교",
  "한국전통문화대",
  "한국조지메이슨대학교",
  "한국체육대학교",
  "한국폴리텍대학교 강릉캠퍼스",
  "한국폴리텍대학교 광주2캠퍼스",
  "한국폴리텍대학교 광주캠퍼스",
  "한국폴리텍대학교 구미캠퍼스",
  "한국폴리텍대학교 남인천캠퍼스",
  "한국폴리텍대학교 달성캠퍼스",
  "한국폴리텍대학교 대구캠퍼스",
  "한국폴리텍대학교 대전캠퍼스",
  "한국폴리텍대학교 동부산캠퍼스",
  "한국폴리텍대학교 목포캠퍼스",
  "한국폴리텍대학교 바이오캠퍼스",
  "한국폴리텍대학교 반도체융합캠퍼스",
  "한국폴리텍대학교 부산캠퍼스",
  "한국폴리텍대학교 서울강서캠퍼스",
  "한국폴리텍대학교 서울정수캠퍼스",
  "한국폴리텍대학교 성남캠퍼스",
  "한국폴리텍대학교 순천캠퍼스",
  "한국폴리텍대학교 아산캠퍼스",
  "한국폴리텍대학교 영남융합기술캠퍼스",
  "한국폴리텍대학교 영주캠퍼스",
  "한국폴리텍대학교 울산캠퍼스",
  "한국폴리텍대학교 원주캠퍼스",
  "한국폴리텍대학교 익산캠퍼스",
  "한국폴리텍대학교 인천캠퍼스",
  "한국폴리텍대학교 전북캠퍼스",
  "한국폴리텍대학교 제주캠퍼스",
  "한국폴리텍대학교 진주캠퍼스",
  "한국폴리텍대학교 창원캠퍼스",
  "한국폴리텍대학교 청주캠퍼스",
  "한국폴리텍대학교 춘천2캠퍼스",
  "한국폴리텍대학교 춘천캠퍼스",
  "한국폴리텍대학교 충주캠퍼스",
  "한국폴리텍대학교 포항캠퍼스",
  "한국폴리텍대학교 항공캠퍼스",
  "한국폴리텍대학교 홍성캠퍼스",
  "한국폴리텍대학교 화성캠퍼스",
  "한국항공대학교",
  "한국해양대학교",
  "한남대학교",
  "한동대학교",
  "한라대학교",
  "한려대학교",
  "한림대학교",
  "한림성심대",
  "한밭대학교",
  "한서대",
  "한성대학교",
  "한세대학교",
  "한신대학교",
  "한양대학교",
  "한양대학교(에리카캠퍼스)",
  "한양사이버대",
  "한일장신대",
  "협성대학교",
  "혜전대학교",
  "호남대학교",
  "호남신학대",
  "호산대학교",
  "호서대학교",
  "호원대학교",
  "홍익대학교",
  "홍익대학교(세종캠퍼스)",
  "화신사이버대",
  "ict폴리텍대학교",
  "KC대학교(케이씨대학교)",
];

export const naverMapZoonLv = {
  17: {
    lon: 0.00119636,
    lat: 0.00128475,
  },
  16: {
    lon: 0.00232626,
    lat: 0.00249812,
  },
  15: {
    lon: 0.00465251,
    lat: 0.00499623,
  },
  14: {
    lon: 0.00930502,
    lat: 0.00999246,
  },
  13: {
    lon: 0.019033,
    lat: 0.02043913,
  },
  12: {
    lon: 0.03738624,
    lat: 0.04014829,
  },
  11: {
    lon: 0.07477249,
    lat: 0.08029657,
  },
  10: {
    lon: 0.15508367,
    lat: 0.16654104,
  },
  9: {
    lon: 0.15508367,
    lat: 0.16654104,
  },
  8: {
    lon: 0.15508367,
    lat: 0.16654104,
  },
  7: {
    lon: 0.15508367,
    lat: 0.16654104,
  },
  6: {
    lon: 0.15508367,
    lat: 0.16654104,
  },
};
