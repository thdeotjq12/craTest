import { useSelector, useDispatch } from "react-redux";
import {
  ADD_BASIC_REQUEST,
  ADD_BASIC_SUCCESS,
  ADD_BASIC_FAILURE
} from "../../../../modules/Main/CompanyInfo/BasicInfo/BasicInfoReducer";
import React, { useEffect, useCallback } from "react";
import Main from "../../../../pages/Main/";
import axios from "axios";

const BasicInfoContainer = props => {
  const { BaicInfo_Data } = useSelector(state => state.BasicInfo, []);
  console.log("BasicInfoContainer", props);
  const dispatch = useDispatch();
  // 로그인체크 , 로그인 성공 시 유저 데이터 로딩
  // const createBasicInfo = () => {
  //   axios
  //     .post("http://localhost:5000/CompanyInfo/BasicInfo/BasicInfo")
  //     .then(res => {
  //       console.log(res);
  //       if (res.data === "NoData") {
  //         console.log("BasicInfo 데이터가 없습니다");
  //       } else {
  //         localStorage.setItem("BasicInfo", JSON.stringify(res.data));
  //         dispatch({
  //           type: ADD_BASIC_SUCCESS,
  //           payload: res.data
  //         });
  //         BaicInfo_Data = res.data;
  //         console.log("BasicInfo pathname", res.data);
  //         props.history.replace({
  //           pathname: "/Main/CompanyInfo/BasicInfo"
  //         });
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    // return {
    //     isLogin:false UnMount 시 마지막으로 실행.?
    // }
  }, []);
  // []안에 변수를 넣으면 그 값이 변할때마다 이 함수 실행

  return <Main />;
};

export default BasicInfoContainer;
