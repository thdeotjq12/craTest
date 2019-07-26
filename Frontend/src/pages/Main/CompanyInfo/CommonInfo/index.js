import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import Grid_NomalSudang from "./Grid_NomalSudang";
import Grid_TimeSudang from "./Grid_TimeSudang";
import Grid_DaySudang from "./Grid_DaySudang";
import Grid_BeGwaSudang from "./Grid_BeGwaSudang";
import Grid_Holiday from "./Grid_Holiday";
import "./index.css";
import {
  Button,
  Modal,
  Row,
  Col,
  Container,
  Form,
  ButtonToolbar,
  Table,
  InputGroup,
  FormControl
} from "react-bootstrap";

import "font-awesome/css/font-awesome.css";
// react-datepicker 관련 https://reactdatepicker.com/

import {
  ADD_COMMINFO_GridData_FAILURE,
  ADD_COMMINFO_GridData_SUCCESS,
  ADD_COMMINFO_Holiday_SUCCESS,
  ADD_COMMINFO_Holiday_FAILURE
} from "../../../../modules/Main/CompanyInfo/CommonInfo/CommonInfoReducer";
import axios from "axios";
import { dayDisable } from "../../../../components/DatePicker/commons";

const Grid_SudangCol = [{ name: "수당명", width: 250, editable: true }];
const Grid_HolidayCol = [
  { key: "CHGUBUN", name: "공휴일", width: 220, editable: true },
  { key: "CHNAME", name: "구분", width: 80, editable: true },
  { key: "CHDATE", name: "날짜", width: 120, editable: true },
  { key: "DAYOFWEEK", name: "요일", width: 80, editable: true },
  { key: "CHCCGUBUN2", name: "공무직", width: 80, editable: true },
  { key: "CHCCGUBUN0", name: "기간제", width: 80, editable: true },
  { key: "CHCCGUBUN1", name: "공공근로", width: 80, editable: true },
  { key: "CHMEMO", name: "비고", width: 300, editable: true }
];
const CommonInfo = props => {
  const [ReadOnly, setReadOnly] = useState(true); // 수정버튼 클릭 시 false
  const dispatch = useDispatch();
  const { Loading, Loading_Holiy } = useSelector(state => state.CommonInfo);
  const [BeGwaList, setBeGwaList] = useState("");
  const [DayList, setDayList] = useState("");
  const [NomalList, setNomalList] = useState("");
  const [TimeList, setTimeList] = useState("");
  const [HoliList, setHoliList] = useState(""); // 휴일설정 리스트
  const [IRRateList, setIRRateList] = useState(""); // 4대보험 요율 리스트
  useEffect(() => {
    console.log("CommInfo - useEffect 실행됨");
    getSudangGrid();
    getHolidays(); // 휴일정보 조회
    getIRRate(); // 4대보험 요율조회
  }, [Loading]);
  const getCellValue = value => {};
  // 휴일정보 조회
  const getHolidays = () => {
    var moment = require("moment");
    moment.locale("ko");
    var parm = { HoliDate: "2018" };
    console.log("Loading True 데이터를 가져옵니다");
    axios
      .post("http://localhost:5000/CompanyInfo/CommonInfo/getHoliday", parm)
      .then(res => {
        console.log(res);
        if (res.data === "NoData") {
          console.log("getHoliday 데이터가 없습니다");
        } else {
          dispatch({
            type: ADD_COMMINFO_Holiday_SUCCESS
          });
          setHoliList(res.data.HoliList);
          console.log("HoliList", res.data.HoliList);
        }
      })
      .catch(err => {
        console.log("HoliList 에러", err);
      });
  };
  // 4대보험 요율 조회
  const getIRRate = () => {
    var moment = require("moment");
    moment.locale("ko");
    var parm = { HoliDate: "2018" };
    console.log("Loading True 데이터를 가져옵니다");
    axios
      .post("http://localhost:5000/CompanyInfo/CommonInfo/getIRRate", parm)
      .then(res => {
        console.log(res);
        if (res.data === "NoData") {
          console.log("IRRateList 데이터가 없습니다");
        } else {
          setIRRateList(res.data.IRRateList);
          console.log("IRRateList", res.data.IRRateList);
        }
      })
      .catch(err => {
        console.log("HoliList 에러", err);
      });
  };
  const getSudangGrid = () => {
    console.log("getSudangGrid 실행됨");
    if (Loading) {
      var parm = {};
      var NList = [];
      var DList = [];
      var BList = [];
      var TList = [];
      axios
        .post("http://localhost:5000/CompanyInfo/CommonInfo/getSudang")
        .then(res => {
          if (res.data === "NoData") {
            console.log("Sudang 데이터가 없습니다");
            dispatch({
              type: ADD_COMMINFO_GridData_FAILURE
            });
          } else {
            console.log("Sudang 데이터가 존재합니다");
            dispatch({
              type: ADD_COMMINFO_GridData_SUCCESS
            });
            console.log(res.data.Sudang[0]["WPSUDANGDATE" + String(1) + "YN"]);
            console.log(res.data.Sudang[0]);

            for (let i = 1; i <= 10; i++) {
              if (
                res.data.Sudang[0]["WPSUDANGTOT" + String(i) + "YN"] === "Y"
              ) {
                NList.push(
                  res.data.Sudang[0]["WPSUDANGTOT" + String(i) + "NAME"]
                );
              }

              if (
                res.data.Sudang[0]["WPSUDANGTIME" + String(i) + "YN"] === "Y"
              ) {
                TList.push(
                  res.data.Sudang[0]["WPSUDANGTIME" + String(i) + "NAME"]
                );
              }

              if (
                res.data.Sudang[0]["WPSUDANGDATE" + String(i) + "YN"] === "Y"
              ) {
                DList.push(
                  res.data.Sudang[0]["WPSUDANGDATE" + String(i) + "NAME"]
                );
              }

              if (
                res.data.Sudang[0]["WPSUDANGNOVAT" + String(i) + "YN"] === "Y"
              ) {
                BList.push(
                  res.data.Sudang[0]["WPSUDANGNOVAT" + String(i) + "NAME"]
                );
              }
            }
            console.log("Nomal", NList);
            console.log("Time", TList);
            console.log("be", BList);
            console.log("day", DList);
            setNomalList(NList);
            setTimeList(TList);
            setDayList(DList);
            setBeGwaList(BList);
            // 라디오버튼 그룹 체크상태 할당 변수
            //근태귀속
            var PayMonth = document.getElementsByName("Group1");
            //근로소득세 적용여부
            var SodcMainYN = document.getElementsByName("Group2");
            //연차휴가 적용방식
            var YenchaBase = document.getElementsByName("Group3");
            //수습기간 설정
            var SusupYN = document.getElementsByName("Group4");
            //4대보험 계산방법
            var InsureAMTGubun = document.getElementsByName("Group5");
            //4대보험 근로자 수
            var InsureStaffCNT = document.getElementsByName("Group6");
            //중복 휴일 유급휴무 처리
            var HolidayDoubleYN = document.getElementsByName("Group7");
            console.log(HolidayDoubleYN[1].name);
            // console.log(PayMonth[0].checked === true ? "체크됨" : "체크안됨");

            // 근태귀속 라디오 버튼
            if (res.data.Sudang[0].WPPAYMONTH === "0") {
              PayMonth[1].checked = true; // 당월
            } else {
              PayMonth[0].checked = true; // 이전월
            }
            //근로소득세 적용여부
            if (res.data.Sudang[0].WPSODCMAINYN === "Y") {
              SodcMainYN[0].checked = true;
            } else {
              SodcMainYN[1].checked = true;
            }
            //연차휴가 적용방식
            if (res.data.Sudang[0].WPYENCHABASE === "0") {
              YenchaBase[0].checked = true;
            } else {
              YenchaBase[1].checked = true;
            }
            //수습기간
            if (res.data.Sudang[0].WPSUSUPYN === "Y") {
              SusupYN[0].checked = true;
            } else {
              SusupYN[1].checked = true;
            }

            //4대보험 계산방법
            if (res.data.Sudang[0].WP4INSUREAMTGUBUN === "0") {
              InsureAMTGubun[0].checked = true;
            } else if (res.data.Sudang[0].WP4INSUREAMTGUBUN === "1") {
              InsureAMTGubun[1].checked = true;
            } else if (res.data.Sudang[0].WP4INSUREAMTGUBUN === "2") {
              InsureAMTGubun[2].checked = true;
            } else if (res.data.Sudang[0].WP4INSUREAMTGUBUN === "3") {
              InsureAMTGubun[3].checked = true;
            }

            //4대보험 근로자 수
            if (res.data.Sudang[0].WP4INSURESTAFFCNT === "0") {
              InsureStaffCNT[0].checked = true;
            } else if (res.data.Sudang[0].WP4INSURESTAFFCNT === "1") {
              InsureStaffCNT[1].checked = true;
            } else if (res.data.Sudang[0].WP4INSURESTAFFCNT === "2") {
              InsureStaffCNT[2].checked = true;
            } else if (res.data.Sudang[0].WP4INSURESTAFFCNT === "3") {
              InsureStaffCNT[3].checked = true;
            } else if (res.data.Sudang[0].WP4INSURESTAFFCNT === "4") {
              InsureStaffCNT[4].checked = true;
            }
            //중복 휴일 유급휴무 처리
            if (res.data.Sudang[0].WPHOLIDAYDOUBLEYN === "Y") {
              HolidayDoubleYN[0].checked = true;
            } else {
              HolidayDoubleYN[1].checked = true;
            }
          }
        })
        .catch(err => {
          console.log("getSudangGrid 쿼리에러!! 필수입력 항목 확인요망", err);
          dispatch({
            type: ADD_COMMINFO_GridData_FAILURE
          });
        });
    }
  };
  return (
    <div className="ModalContainer">
      <div>
        <label className="TableTitle">수당정보</label>
      </div>
      <table>
        <tbody>
          <tr>
            <td>
              <Grid_NomalSudang
                columns={Grid_SudangCol}
                rows={NomalList}
                getCellValue={getCellValue}
              />
            </td>
            <td>
              <Grid_TimeSudang
                columns={Grid_SudangCol}
                rows={TimeList}
                getCellValue={getCellValue}
              />
            </td>
            <td>
              <Grid_DaySudang
                columns={Grid_SudangCol}
                rows={DayList}
                getCellValue={getCellValue}
              />
            </td>
            <td>
              <Grid_BeGwaSudang
                columns={Grid_SudangCol}
                rows={BeGwaList}
                getCellValue={getCellValue}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: "10px" }}>
        <div>
          <label className="TableTitle">급여기본정보</label>
        </div>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td className="ColGubun">근태귀속(월도)</td>
              <td id="TdInput">
                <label class="radio-inline">
                  <input type="radio" name="Group1" />
                  이전월
                </label>
                <label class="radio-inline">
                  <input type="radio" name="Group1" />
                  당월
                </label>
              </td>
              <td className="ColGubun">급여일자</td>
              <td id="TdInput">
                <button
                  class="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </button>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                  <div role="separator" class="dropdown-divider" />
                  <a class="dropdown-item" href="#">
                    Separated link
                  </a>
                </div>
              </td>
              <td className="ColGubun">근로소득세공제</td>
              <td id="TdInput">
                <label class="radio-inline">
                  <input type="radio" name="Group2" />
                  적용
                </label>
                <label class="radio-inline">
                  <input type="radio" name="Group2" />
                  미적용
                </label>
              </td>
            </tr>
            <tr>
              <td className="ColGubun">연차휴가 적용방식</td>
              <td id="TdInput">
                <label class="radio-inline">
                  <input type="radio" name="Group3" />
                  입사일
                </label>
                <label class="radio-inline">
                  <input type="radio" name="Group3" />
                  회계연도
                </label>
              </td>
              <td className="ColGubun">수습기간설정</td>
              <td id="TdInput">
                <label class="radio-inline">
                  <input type="radio" name="Group4" />
                  설정
                </label>
                <label class="radio-inline">
                  <input type="radio" name="Group4" />
                  미설정
                </label>
              </td>
              <td className="ColGubun">수습기간</td>
              <td id="TdInput">
                <button
                  class="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </button>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                  <div role="separator" class="dropdown-divider" />
                  <a class="dropdown-item" href="#">
                    Separated link
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td className="ColGubun">4대보험계산</td>
              <td colSpan="5" id="TdInput">
                <label class="radio-inline">
                  <input type="radio" name="Group5" />
                  귀속월액
                </label>
                <label class="radio-inline">
                  <input type="radio" name="Group5" />
                  보수월액
                </label>
                <label class="radio-inline">
                  <input type="radio" name="Group5" />
                  납입액입력
                </label>
                <label class="radio-inline">
                  <input type="radio" name="Group5" />
                  외부파일등록
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <label className="TableTitle">휴일설정</label>
          <button
            class="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Dropdown
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">
              Action
            </a>
            <a class="dropdown-item" href="#">
              Another action
            </a>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
            <div role="separator" class="dropdown-divider" />
            <a class="dropdown-item" href="#">
              Separated link
            </a>
          </div>
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            style={{ width: "90px" }}
          >
            추가
          </button>
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            style={{ width: "90px" }}
          >
            제거
          </button>
        </div>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td className="ColGubun">유급휴무 처리시</td>

              <label class="radio-inline">
                다른 휴무일과 중복시 첫번째 비공휴일을 유급(공휴)처리 :
                <input type="radio" name="Group6" />예
              </label>
              <label class="radio-inline">
                <input type="radio" name="Group6" />
                아니오
              </label>
            </tr>
          </tbody>
        </table>
        <Grid_Holiday
          columns={Grid_HolidayCol}
          rows={HoliList}
          getCellValue={getCellValue}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <label className="TableTitle">4대보험 요율 설정</label>

        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          style={{ width: "90px" }}
        >
          신규요율
        </button>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td className="ColGubun">근로자 수 선택</td>
              <td id="TdInput" colSpan="5">
                <label class="radio-inline">
                  <input type="radio" name="Group7" />
                  10인 미만
                </label>
                <label class="radio-inline">
                  <input type="radio" name="Group7" />
                  150인 미만
                </label>
                <label class="radio-inline">
                  <input type="radio" name="Group7" />
                  150인 이상(우선지원대상기업)
                </label>
                <label class="radio-inline">
                  <input type="radio" name="Group7" />
                  150인 이상 1,000인 미만
                </label>
                <label class="radio-inline">
                  <input type="radio" name="Group7" />
                  1,000인 이상(국가, 지방단체)
                </label>
              </td>
            </tr>
            <tr>
              <td className="ColGubun">구분</td>
              <td className="ColGubun">세부</td>
              <td className="ColGubun">총액</td>
              <td className="ColGubun">사업자부담금</td>
              <td className="ColGubun">근로자부담금</td>
              <td className="ColGubun">상/하 한도</td>
            </tr>
            <tr>
              <td className="ColGubun">
                국민연금
                <td id="TdInput" />
                <td id="TdInput" />
              </td>

              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td id="TdInput" rowSpan="1">
                <input className="InputContainer" />
              </td>
              <td id="TdInput" rowSpan="1">
                <input className="InputContainer" />
                <input className="InputContainer" />
              </td>
            </tr>

            <tr>
              <td className="ColGubun">
                건강보험
                <td id="TdInput" />
                <td id="TdInput" />
              </td>

              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td id="TdInput" rowSpan="1">
                <input className="InputContainer" />
                <input className="InputContainer" />
              </td>
            </tr>
            <tr>
              <td className="ColGubun">
                장기요양
                <td id="TdInput" />
                <td id="TdInput" />
              </td>

              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
            </tr>
            <tr>
              <td className="ColGubun" rowSpan="5">
                고용보험
              </td>
              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>

              <td>
                <input className="InputContainer" />
              </td>
            </tr>
            <tr>
              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>

              <td>
                <input className="InputContainer" />
              </td>
            </tr>
            <tr>
              <td rowSpan="3">
                <input className="InputContainer" />
              </td>

              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>

              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>
            </tr>
            <tr>
              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>

              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>
            </tr>
            <tr>
              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>

              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>
            </tr>
            <tr>
              <td className="ColGubun" rowSpan="3">
                산재보험
              </td>
              <td>
                <input className="InputContainer" />
              </td>

              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>

              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>
            </tr>
            <tr>
              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>
            </tr>
            <tr>
              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>
              <td>
                <input className="InputContainer" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommonInfo;
