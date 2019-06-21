import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BasicInfo from "./BasicInfo";
import SaupGwanRi from "./SaupGwanRi";
import MainLayout from "../../../components/Layout/MainLayout";
import { ADD_BASIC_SUCCESS } from "../../../modules/Main/CompanyInfo/BasicInfo/BasicInfoReducer";
import axios from "axios";
const CompanyInfo = props => {
  const [selectedMenu, setSeletedMenu] = useState(1);
  const { BaicInfo_Data } = useSelector(state => state.BasicInfo, []);
  const Path = "/Main/CompanyInfo/BasicInfo";
  const onMenuClick = idx => {
    setSeletedMenu(idx);
  };

  useEffect(() => {
    // return {
    //     isLogin:false UnMount 시 마지막으로 실행.?
    // }
  }, [BaicInfo_Data]);
  return (
    <div>
      <div>
        <button onClick={() => onMenuClick(1)}>기본정보</button>
        <button onClick={() => onMenuClick(2)}>사업관리</button>
        <button onClick={() => onMenuClick(3)}>지원자관리</button>
        <button onClick={() => onMenuClick(4)}>공통근로정보</button>
      </div>
      <div>
        {selectedMenu === 1 && <BasicInfo />}
        {selectedMenu === 2 && <SaupGwanRi />}
        {selectedMenu === 3 && <div />}
        {selectedMenu === 4 && <div />}
      </div>
    </div>
  );
};

export default CompanyInfo;
