import React, { useState } from "react";
import "./index.css";
import Main from "../Main/";
import { strict } from "assert";
const Login = ({ LoginCheck, idInput, pwInput }) => {
  // const onLoginClicked = () => {
  //   if (id.value == 9 && password.value == 9) {
  //     console.log("OK");
  //   } else {
  //     console.log("NO");
  //   }
  // };

  return (
    <div className="loginpage_container">
      <div className="loginpage_top">
        <div>
          <label>더 좋은 옥천 !</label>
          <label>희공이</label>
        </div>
        <div className="loginpage_top_02">
          <label>희망 주는 공공근로 지원 사업</label>
        </div>
        <div>
          <label>인사-급여/사회보험 관리 시스템</label>
        </div>
      </div>

      <div className="loginpage_mid">
        <div>
          <input onChange={idInput} />
        </div>
        <div>
          <input onChange={pwInput} type="password" />
        </div>
        <button
          onClick={LoginCheck}
          className="btn btn-secondary btn-lg btn-block"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
