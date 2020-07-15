import { createStore, combineReducers } from "redux";
export function initStore() {
  const store = createStore(
    combineReducers({
      reduxComponent: CalculatorReducer, //reduxComponent의 이름을 바꾸려면 해당컴포넌트의 result: state.reduxComponent.result, 이 부분을 바꾼다.
    })
  );
  return store;
}
//Reducer : action이 어떻게 (How) 변경시켜야 하는 지는 reducer(들)가 정의합니다.
const defaultState = {
  bbsInfo: {
    a: 0,
  },
  result: 0,
  sumInfo: {
    frist: 0,
    second: 0,
  },
};
const CalculatorReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "example":
      return {
        // result: action.payload + state.sumInfo.second, //action.payload가 입력 값
        result: action.payload,
        sumInfo: {
          frist: action.payload,
          // second: state.sumInfo.second, //값을 쓰지 않으면 defaultState 값으로 들어감.
        },
      };
    case "num2":
      return {
        result: action.payload + state.sumInfo.frist,
        sumInfo: {
          frist: state.sumInfo.frist,
          second: action.payload,
        },
      };
    default:
      if (String(action.type).substring(0, 2) != "@@") {
        alert("type error");
      }
      return state;
  }
};

//Action : store를 변경시키는 것은 action (들) 뿐입니다.
export default Object.assign({
  updateSumValueFirst(num) {
    return {
      type: "example", //변경할 state를 type로 정해줍니다.
      payload: num, //입력 값(payload)은 num 입니다.
    };
  },
  updateSumValueSecond(num) {
    return {
      type: "num2",
      payload: num,
    };
  },
});
