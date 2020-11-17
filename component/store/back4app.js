

let Person = Parse.Object.extend('Person');
let query = new Parse.Query(Person);
let person = await query.get("GWpX422ZP");

person.increment('age'); // 1더함
person.increment('age', 2); // 2더함 .save안하면저장안됌
person.save();
person.fetch(); //최근 정보를 가져옴

// ................배열사용법
// *.save()해야됌
person.add('skills', 'DDD');//해당 객체에 skills라는 row(없으면 추가)에 ["DDD"]
person.add('skills', 'AAA');//두번하면 해당객체에 추가 ["DDD","AAA"]
person.add('skills', 'AAA');//당객체에 추가 ["DDD","AAA", "AAA"]
person.addUnique('skills', 'asd');//asd 추가 ["DDD","AAA", "AAA", "asd"]
person.addUnique('skills', 'asd');//addUnique는 두번호출해도 1번만됌 ["DDD","AAA", "AAA", "asd"]
person.remove('skills', 'DDD');//배열에 있는 모든 DDD를 제거 ["AAA", "AAA", "asd"]
person.remove('skills', 'AAA');//배열에 있는 모든 AAA를 제거 ["asd"]
// ................unset && destroy
// unset만 *.save()해야됌, destroy는 없어도됌.
person.unset('age'); //undefined로 만들어줌, 해당 객체의 age row는 undefined임 
person.destroy();
// ................기본 query
query.equalTo('age', 31);//equalTo는 배열도 가능하다, [31,..]을 모두 뺸다.
query.notEqualTo('age', 32);
query.greaterThanOrEqualTo('age', 32);
query.select('age'); //나이만 가져온다. result[i].get('name')은 불가능하다.
// query.lessThan query.lessThanOrEqualTo
let result = await query.find(); //1. 위의 equal notEqual greater를 모두 적용한 결과가 담긴다. 2. 내용없으면 Person 전부 가져온다.
for (let i = 0; i < result.length; i++) {
  console.log(result[i].get('name') + '\t' + result[i].get('age'));
}
// ...............고급 query 1
query.include('size'); //size라는 테이블을 추가합니다. 2. .get('size').get('medium')를 읽기 위해서 size는 테이블 자료형은 size임.
query.ascending('name'); //이름 오름차순 정렬
query.limit(3);
query.skip(3);
let aData = query.first();  //첫번째 데이터 가져와서

let relation = aData.relation('breeders'); //breeders row 값의 relation을 반환

let breedersQuery = relation.query();
let resultArr2 = await breedersQuery.find();//breadders 테이블의 값을 찾아넣음

let resultArr = await query.find();
for (let i = 0; i < result.length; i++) {
  console.log(result[i].get('name') + '\t' + result[i].get('size').get('medium'));
}
// ...............고급 query 2 distinct
let arr = await query.distinct('name'); //query가 가진 테이블에서 name만 뽑아옴
for (let i = 0; i < arr.length; i++) {
  console.log('name' + arr[i]);
}