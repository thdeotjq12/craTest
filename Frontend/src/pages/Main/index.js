import React, { useState, Component } from "react";

import CompanyInfo from "./CompanyInfo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const Main = ({ createBasicInfo, BaicInfo_Data }) => {
  // console.log("MainProps", createBasicInfo);
  const [selectedMenu, setSeletedMenu] = useState(1);
  const onMenuClick = idx => {
    setSeletedMenu(idx);
  };

  return (
    <div>
      <div>
        <p>메인 </p>
        <button className="btn btn-primary" onClick={() => onMenuClick(1)}>
          일정
        </button>
        <button className="btn btn-primary" onClick={() => onMenuClick(2)}>
          기관정보
        </button>
        <button className="btn btn-primary" onClick={() => onMenuClick(3)}>
          사원관리
        </button>
        <button className="btn btn-primary" onClick={() => onMenuClick(4)}>
          인사관리
        </button>
        {/* <button
          onClick={() =>
            props.history.replace({
              pathname: "/"
            })
          }
        >
          로그아웃
        </button> */}
      </div>
      <div>
        {selectedMenu === 1}
        {selectedMenu === 2 && (
          <CompanyInfo createBasicInfo={createBasicInfo} />
        )}
        {selectedMenu === 3 && <div />}
        {selectedMenu === 4 && <div />}
      </div>
    </div>
  );
};

export default Main;
