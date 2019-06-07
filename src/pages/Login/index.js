import React, { useState } from "react";
import "./index.css";
import { useInput } from "../../function/useInput";
const Login = () => {
  const id = useInput("");
  const password = useInput("");

  const onLoginClicked = () => {
    console.log("LOGIN", id.value, password.value);
  };
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
          <input {...id} />
        </div>
        <div>
          <input {...password} type="password" />
        </div>
        <button onClick={onLoginClicked}>로그인</button>
      </div>
    </div>
  );
};

export default Login;
