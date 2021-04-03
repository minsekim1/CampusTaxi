export type Bank = {
  id: number;
  updated_at: string;
  bank_name: string;
  account_num: string;
  account_holder_name: string;
  created_by: number;
  updated_by: number;
};

// id	integer
// title: ID
// readOnly: true
// created_at	string($date-time)
// title: 생성일
// readOnly: true
// 데이터가 생성된 일자입니다.

// updated_at	string($date-time)
// title: 수정일
// readOnly: true
// 데이터가 수정된 사용자입니다.

// bank_name*	string
// title: 은행명
// maxLength: 25
// minLength: 1
// 은행명입니다..

// account_num*	string
// title: 계좌번호
// maxLength: 25
// minLength: 1
// ['계좌번호입니다.', '"-"를 포함한 계좌번호을 입력하세요.']

// account_holder_name*	string
// title: 예금주
// maxLength: 25
// minLength: 1
// 예금주입니다.

// created_by	integer
// title: 생성자
// readOnly: true
// 데이터를 생성한 사용자입니다.

// updated_by	integer
// title: 생성자
// readOnly: true
// 데이터를 수정한 사용자입니다.
