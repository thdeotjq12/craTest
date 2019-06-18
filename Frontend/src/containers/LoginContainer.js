import { useSelector, useDispatch } from "react-redux";
import { LOGIN_CHECK, INPUT_ID, INPUT_PW } from "../modules/Login/Loginpage";
import React, { useEffect, useCallback } from "react";
import Login from "../pages/Login";
import axios from "axios";

const LoginContainer = props => {
  const { ID, PassWord, isLogin } = useSelector(state => state.Loginpage, []);
  const dispatch = useDispatch();

  const LoginCheck = e => {
    e.preventDefault();
    var parm = {
      id: ID,
      pw: PassWord
    };
    axios
      .post("http://localhost:5000/User/login", parm)
      .then(res => {
        console.log(res);
        if (res.data === 0) {
          alert("아이디 또는 비밀번호를 확인해주세요 !");
        } else {
          console.log("LOGIN 성공 !");
          localStorage.setItem("USER_Info", JSON.stringify(res.data));
          console.log("Login pathname", res.data);
          props.history.replace({
            pathname: "/Main"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    dispatch({
      type: LOGIN_CHECK,
      payload: {
        id: ID,
        password: PassWord
      }
    });
  };

  const idInput = id => {
    dispatch({
      type: INPUT_ID,
      payload: id.target.value
    });
  };

  const pwInput = pw => {
    dispatch({
      type: INPUT_PW,
      payload: pw.target.value
    });
  };

  // componentDidMount, ComponentUpdate, ComponentUnMount

  useEffect(() => {
    console.log(isLogin);
    console.log("useEffect 실행됨");

    // return {
    //     isLogin:false UnMount 시 마지막으로 실행.?
    // }
  }, [isLogin]);
  // []안에 변수를 넣으면 그 값이 변할때마다 이 함수 실행

  return (
    <Login
      id={ID}
      pw={PassWord}
      LoginCheck={LoginCheck}
      idInput={idInput}
      pwInput={pwInput}
    />
  );
};

export default LoginContainer;
