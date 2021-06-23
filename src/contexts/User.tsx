export type User = {
  id: string;
  uuid: string;
  username: string;
  gender: "MALE" | "FEMALE" | "NONE";
  nickname: string;
  phone: string;
  name: string;
  email: string;
  address: string;
  is_cert: boolean;
  cert_dtm: string;
  ban_dtm: string;
  date_joined: string;
  campus_name: string;
  student_card: string;
  is_staff: boolean;
  is_active: boolean;
};
export const UserDummy:User = {
  id: 'string',
  uuid: 'string',
  username: 'string',
  gender: "MALE",
  nickname: 'string',
  phone: 'string',
  name: 'string',
  email: 'string',
  address: 'string',
  is_cert: false,
  cert_dtm: 'string',
  ban_dtm: 'string',
  date_joined: 'string',
  campus_name: 'string',
  student_card: 'string',
  is_staff: false,
  is_active: false,
};

// {
//   "uuid": "9ee212ee-db0e-4112-a602-7745a01f900b",
//   "username": "admin",
//   "gender": 0,
//   "nickname": "관리자",
//   "phone": "관리자",
//   "name": "",
//   "email": "",
//   "address": "",
//   "is_cert": false,
//   "cert_dtm": "2021-02-19T13:49:19+09:00",
//   "ban_dtm": "2021-02-19T13:49:19+09:00",
//   "date_joined": "2021-02-19T13:49:19+09:00",
//   "campus_name": "대학교",
//   "student_card": "http://api.campustaxi.net.s3.ap-northeast-2.amazonaws.com/9ee212ee-db0e-4112-a602-7745a01f900b/student_card/KakaoTalk_20210226_142611211-20210226",
//   "is_staff": true,
//   "is_active": true
// }

// uuid	string($uuid)
// title: 식별자
// readOnly: true
// 사용자 고유 식별 값입니다.

// username*	string
// title: 사용자 아이디
// pattern: ^[\w.@+-]+$
// maxLength: 150
// minLength: 1
// 필수입니다. 150 자 이하. 문자, 숫자 및 @ /. / + /-/ _ 만.

// gender	string
// title: [ NONE, FEMALE, MALE ]
// 사용자 성별입니다.

// Enum:
// Array [ 3 ]
// nickname*	string
// title: 닉네임
// maxLength: 80
// minLength: 1
// 사용자 닉네임입니다.

// phone*	string
// title: 휴대폰
// maxLength: 11
// minLength: 1
// 사용자 휴대폰 번호입니다.

// name	string
// title: 이름
// maxLength: 30
// 사용자 이름(실명)입니다.

// email	string($email)
// title: 이메일
// maxLength: 200
// 사용자 이메일입니다.

// address	string
// title: 주소
// maxLength: 30
// 사용자 주소입니다.

// is_cert	boolean
// title: 인증 여부
// 사용자 인증 여부입니다.

// cert_dtm	string($date-time)
// title: 인증 일시
// 사용자 인증일 입니다.

// ban_dtm	string($date-time)
// title: 차단 일시
// 사용자 차단일 입니다.

// date_joined	string($date-time)
// title: 회원가입 일시
// 회원가입 일입니다.

// campus_name	string
// title: 대학명
// maxLength: 30
// 사용자 대학명입니다.

// student_card	string($uri)
// title: 학생증
// readOnly: true
// 학생증입니다.

// is_staff	boolean
// title: 관리자 여부
// 사용자가이 관리 사이트에 로그인 할 수 있는지 여부를 지정합니다.

// is_active	boolean
// title: 활성 여부
// 이 사용자를 활성으로 처리해야하는지 여부를 지정합니다.계정을 삭제하는 대신 선택 해제하십시오.

// }
