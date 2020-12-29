import React, { useState } from 'react';

const CustomContext = React.createContext(0);
import _ from "lodash";
const CustomProvider = ({ children }) => {
  //함수 만드는 부분
  const [number, setNumber] = useState(0);
  const [user, u] = useState({
    data: {},
    id: null,
    pw: null,
    token: null,
  });
  const setUser = (val) => u(_.assign(user, { data: val }))
  const setId = (val) => u(_.assign(user, { id: val }))
  const setPw = (val) => u(_.assign(user, { pw: val }))
  const setToken = (val) => u(_.assign(user, { token: val }))
  const setIsLogin = (val) => u(_.assign(user, { isLogin: val }))
  const [bbs, setBbs] = useState([]);
  //전달할 함수 선언 부분
  const store = { number, setNumber, user, setUser, setId, setPw, setIsLogin, setToken, bbs, setBbs, };
  //쓰는 법은 controller 참조
  return (
    <CustomContext.Provider value={store}>
      {children}
    </CustomContext.Provider>
  )
};

// 사용 예제 => controller.js

/*
    import { CustomContext, CustomProvider } from "../store/context";
*/
export {
  CustomProvider, //App.js에서 시작할떄 필요
  CustomContext,  //실제 함수로 값을 변경할 떄 필요
};