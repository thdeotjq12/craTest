import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import Modal_Damdang from "../../../../components/DataGrid/Modal";
import Modal_GeunLo from "./Modal_GeunLo";
import Modal_Memo from "./Modal_Memo";
import YearPicker from "react-year-picker";
import axios from "axios";
import GridSaup from "./Grid_Saup";
import GridSaebu from "./Grid_SaebuSaup";
// datepick 부분
import locale from "flatpickr/dist/l10n/ko";
import "flatpickr/dist/flatpickr.min.css";
// import InputGroup from "../../../../components/DatePicker/InputGroup";

// DatePicker 관련(세이쿠)
// import Button from "../../../../components/DatePicker/Buttons";
import Multiple from "../../../../components/DatePicker/Mulitple";
import DatetimePicker, {
  setLocale,
  parseDate
} from "../../../../components/DatePicker/DatetimePicker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
// react-datepicker 관련 https://reactdatepicker.com/
import { registerLocale, setDefaultLocale } from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Kr from "../../../../components/DatePicker/lang/kr";
// 출처 : https://www.youtube.com/watch?v=xGZD4L0ne_E     ,
//        https://github.com/syakuis/react-datetimepicker ,
//        https://flatpickr.js.org/plugins/

// 참고 : https://jquense.github.io/react-widgets/api/DateTimePicker/
// redux: https://codesandbox.io/s/date-picker-redux-form-fr5eu
// 언어   https://gracefullight.dev/2018/01/15/react-intl%EB%A1%9C-%EB%B2%88%EC%97%AD-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-react-i18n/
//       https://kyungw00k.github.io/2011/11/17/moment-js-%ED%95%9C%EA%B8%80-%EC%96%B8%EC%96%B4%ED%8C%A9-%EC%B6%94%EA%B0%80/  - install moment

import {
  Loading,
  ADD_Saup_Grid_REQUEST,
  ADD_Saup_Grid_SUCCESS,
  ADD_SeabuSaup_Grid_SUCCESS,
  ADD_SeabuSaup_Grid_REQUEST,
  ADD_Saup_Damdang_REQUEST
} from "../../../../modules/Main/CompanyInfo/SaupGwanRi/SaupGwanRiReducer";
// import format from "../../../../function/DateFormat";
var ko = require("date-fns/locale/ko"); // 참고 https://date-fns.org/docs/I18n
registerLocale("ko", ko);
const Grid_SaupCol = [
  { key: "SHNAME", name: "사업명", editable: true },
  { key: "SHNAMESHORT", name: "사업명요약", editable: false },
  { key: "SHSTRDATE", name: "시작일", editable: false },
  { key: "SHENDDATE", name: "종료일", editable: true },
  { key: "SUNAME", name: "사업담당자", editable: true },
  { key: "SUTEL", name: "전화번호", editable: true },
  { key: "SUEMAIL", name: "이메일", editable: true },
  { key: "SHMEMO", name: "메모", editable: true }
];
const Grid_SeabuSaupCol = [
  { key: "SDNAME", name: "세부사업명", editable: true },
  { key: "SHNAMESHORT", name: "사업명", editable: false },
  { key: "SDMOZIPENDDATE", name: "마감일", editable: false },
  { key: "SDSTRDATE", name: "시작일", editable: true },
  { key: "SDENDDATE", name: "종료일", editable: true },
  { key: "SUNAME", name: "담당자", editable: true },
  { key: "SANAME", name: "사업수행부서", editable: true },
  { key: "SUEMAIL", name: "구분", editable: true },
  { key: "CNT", name: "선발현황", editable: true },
  { key: "WSSHCODE", name: "근로정보", editable: true }
];

const SaupGwanRi = props => {
  const { Grid_Saup } = props;
  const {
    SaupGwanRi_Data,
    SeabuSaupGwanRi_Data,
    Loading,
    SeabuSaup_Loading
  } = useSelector(state => state.SaupGwanRi);
  const dispatch = useDispatch();
  // 날짜 선택 변수
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startDate_Seabu, setStartDate_Seabu] = useState(new Date());
  const [endDate_Seabu, setEndDate_Seabu] = useState(new Date());
  // 그리드 관련 변수
  const [SaupList, setSaupList] = useState("");
  const [SeabuSaupList, setSeabuSaupList] = useState("");
  const [SaupKeyword, setSaupKey] = useState("");
  const [SeabuSaupKeyword, setSeabuKey] = useState("");
  const [SaupHeadCODE, setSaupHeadCODE] = useState("");
  // 담당자 상세보기 관련 변수
  const [SAList, setSAList] = useState("");
  const [Modals, setModals] = useState(false); // 모달 상태
  const [SaupRowNum, setSaupRowNum] = useState(0); // 클릭한 그리드 순번 저장(SACODE 추출용)
  var moment = require("moment");
  // moment.lang("kr"); // 언어팩 변경
  // moment.locale("ko");
  useEffect(() => {
    console.log("Saup  ★★★★★★★★★★★★★★★★useEffect 실행됨");
    getSaup();
    getSeabuSaup();
  }, [Loading, startDate]);

  // 그리드 셀 클릭시 내용 가져오기 (0: 로우넘버, 1:STRDATE, 2:ENDDATE)
  const getCellValue = value => {
    // setState
    console.log("가져온 셀 값", value);
    SaupList && setSaupHeadCODE(SaupList[value[0]].SHCODE);

    setStartDate_Seabu(value[1]); // 그리드 클릭시 세부사업 날짜를 맞춰준다.
    setEndDate_Seabu(value[1]); // 그리드 클릭시 세부사업 날짜를 맞춰준다.
    getSeabuSaup(value);
  };

  const getCellValue_Seabu = value => {
    setSaupRowNum(value); // 셀 로우넘버 저장
  };

  // 사업 검색
  const Saup_Search = e => {
    setSaupKey(e.target.value);
  };

  // 세부사업 검색
  const SeabuSaup_Search = e => {
    setSeabuKey(e.target.value);
  };

  // 모달 열기/닫기
  const handleClose = () => {
    setModals(false);
  };

  // 사업정보 불러오기 (처음실행)
  const getSaup = () => {
    console.log("getSaup 실행됨");
    console.log("Loading", Loading);
    var parm = {
      STRDATE: moment(startDate).format("YYYY-01-01"),
      ENDDATE: moment(endDate).format("YYYY-12-31"),
      SUID: "infra",
      SULevel: "30",
      Key: SaupKeyword
    };
    axios
      .post("http://localhost:5000/CompanyInfo/SaupGwanRi/getSaupGwanRi", parm)
      .then(res => {
        if (res.data === "NoData") {
          console.log("SaupGwanRi 데이터가 없습니다");
        } else {
          setSaupList(res.data.SaupGwanRi_Data);
          dispatch({
            type: ADD_Saup_Grid_SUCCESS,
            payload: res.data
          }); // 로딩 => False

          console.log("SaupGwanRi  완료", SaupList, SaupGwanRi_Data);
          console.log("Getdata Key :", SaupKeyword);
        }
      })
      .catch(err => {
        console.log("SaupGwanRi 에러", err);
      });
  };

  // 세부 사업정보 불러오기 (처음실행)
  const getSeabuSaup = cellValue => {
    console.log("getSeabuSaup 실행됨");
    console.log("들어온 cellValue 값 ", cellValue && cellValue);
    console.log("SaupList", SaupList, cellValue && cellValue[0]);
    console.log("SeabuSaupKeyword", SeabuSaupKeyword);

    var parm = {};

    axios
      .post(
        "http://localhost:5000/CompanyInfo/SaupGwanRi/getSeabuSaupGwanRi",
        cellValue
          ? SaupList && {
              STRDATE: cellValue[1],
              ENDDATE: cellValue[1],
              SaupHeadCode: SaupList[cellValue[0]].SHCODE,
              Key: SeabuSaupKeyword,
              SULevel: "30"
            }
          : //검색,클릭(자동) 파라미터
            SaupList && {
              STRDATE: moment(startDate_Seabu).format("YYYY-01-01"),
              ENDDATE: moment(endDate_Seabu).format("YYYY-12-31"),
              SaupHeadCode: SaupHeadCODE,
              Key: SeabuSaupKeyword,
              SULevel: "30"
            }
        // 기본 조회 파라미터
      )
      .then(res => {
        if (res.data === "NoData") {
          console.log("SeabuSaupGwanRi_Data 데이터가 없습니다");
        } else {
          if (res.data) {
            dispatch({
              type: ADD_SeabuSaup_Grid_SUCCESS,
              payload: res.data
            }); // 로딩 => False

            setSeabuSaupList(res.data.SeabuSaupGwanRi_Data);
          }

          console.log(
            "SeabuSaupGwanRi_Data  완료",
            SaupGwanRi_Data,
            SeabuSaupGwanRi_Data
          );
        }
      })
      .catch(err => {
        console.log("SeabuSaupGwanRi_Data 에러", err);
      });
  };
  return (
    <div>
      <div>
        <label className="TableTitle">사업명 등록</label>
        <div>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className="ColTitle">기준연도(사업시작일기준)</td>
                <td style={{ padding: "0px" }}>
                  {/* <YearPicker onChange={e => setstartDate(e.value)} />
                  
                  <DatePicker
                    selected={startDate}
                    onChange={e => [
                      setstartDate(e),
                      console.log("startDate", startDate)
                    ]}
                    dateFormat="yyyy"
                    locale="ko"
                    minviewMode="years"
                  /> */}
                  <select
                    className="YearPicker"
                    id="strSelect"
                    onChange={e =>
                      setStartDate(
                        [e.target.options[e.target.selectedIndex].value],
                        console.log(startDate)
                      )
                    }
                  >
                    <option value="2015"> 2015년</option>
                    <option value="2016"> 2016년</option>
                    <option value="2017"> 2017년</option>
                    <option value="2018"> 2018년</option>
                    <option value="2019"> 2019년</option>
                    <option value="2020"> 2020년</option>
                    <option value="2021"> 2021년</option>
                  </select>
                  <select
                    className="YearPicker"
                    id="endSelect"
                    onChange={e =>
                      setEndDate(e.target.options[e.target.selectedIndex].value)
                    }
                  >
                    <option value="2015"> 2015년</option>
                    <option value="2016"> 2016년</option>
                    <option value="2017"> 2017년</option>
                    <option value="2018"> 2018년</option>
                    <option value="2019"> 2019년</option>
                    <option value="2020"> 2020년</option>
                    <option value="2021"> 2021년</option>
                  </select>
                </td>
                <td className="ColTitle">사업명</td>
                <td colSpan="5">
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="사업명"
                      aria-label="사업명"
                      aria-describedby="basic-addon2"
                      onChange={Saup_Search}
                    />
                    <InputGroup.Append>
                      <Button variant="primary" onClick={() => [getSaup()]}>
                        검색
                      </Button>
                      <Button variant="secondary">추가</Button>
                      <Button variant="secondary">제거</Button>
                    </InputGroup.Append>
                  </InputGroup>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            {SaupGwanRi_Data && (
              <GridSaup
                columns={Grid_SaupCol}
                rows={SaupList}
                getCellValue={getCellValue}
              />
              // 스토어 값을 넣으면 에러,,
            )}
          </div>
        </div>
        <label className="TableTitle">세부사업 등록</label>
        <div>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className="ColTitle">기준연도(사업시작일기준)</td>
                <td>
                  {/* <DatePicker
                    selected={startDate}
                    onChange={e => [setstartDate(e), console.log(startDate)]}
                    dateFormat="yyyy"
                    locale="ko"
                    showYearDropdown
                  />
                  <DatePicker
                    selected={startDate}
                    onChange={e => [setstartDate(e), console.log(startDate)]}
                    dateFormat="yyyy"
                    locale="ko"
                    showMonthYearPicker
                  /> */}
                  <select
                    className="YearPicker"
                    onChange={e =>
                      setStartDate_Seabu(
                        e.target.options[e.target.selectedIndex].value
                      )
                    }
                  >
                    <option value="2015"> 2015년</option>
                    <option value="2016"> 2016년</option>
                    <option value="2017"> 2017년</option>
                    <option value="2018"> 2018년</option>
                    <option value="2019"> 2019년</option>
                    <option value="2020"> 2020년</option>
                    <option value="2021"> 2021년</option>
                  </select>
                  <select
                    className="YearPicker"
                    onChange={e =>
                      setEndDate_Seabu(
                        e.target.options[e.target.selectedIndex].value
                      )
                    }
                  >
                    <option value="2015"> 2015년</option>
                    <option value="2016"> 2016년</option>
                    <option value="2017"> 2017년</option>
                    <option value="2018"> 2018년</option>
                    <option value="2019"> 2019년</option>
                    <option value="2020"> 2020년</option>
                    <option value="2021"> 2021년</option>
                  </select>
                </td>
                <td className="ColTitle">사업명</td>
                <td colSpan="7">
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="사업명"
                      aria-label="사업명"
                      aria-describedby="basic-addon2"
                      onChange={SeabuSaup_Search}
                    />
                    <InputGroup.Append>
                      <Button variant="primary" onClick={() => getSeabuSaup()}>
                        검색
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => [
                          setModals(true),
                          dispatch({
                            type: ADD_Saup_Damdang_REQUEST
                          })
                        ]}
                      >
                        담당자 상세보기
                      </Button>
                      <Modal_Damdang
                        SaupRowNum={SaupRowNum}
                        Modals={Modals}
                        handleClose={handleClose}
                        SAList={SeabuSaupList} // sa코드 변수 이름 prop 화 하기
                      />
                      <Button variant="secondary">추가</Button>
                      <Button variant="secondary">제거</Button>
                    </InputGroup.Append>
                  </InputGroup>
                  {/* <button
                    type="button"
                    className="btn btn-primary"
                    style={{ float: "Right" }}
                  >
                    제거
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ float: "Right" }}
                  >
                    추가
                  </button> */}
                </td>
              </tr>

              <tr>
                <td rowSpan="2" className="ColTitle">
                  세부사업명
                </td>
                <td rowSpan="2" className="ColTitle">
                  사업명
                </td>
                <td className="ColTitle">모집공고</td>

                <td colSpan="2" className="ColTitle">
                  사업기간
                </td>
                <td rowSpan="2" className="ColTitle">
                  담당자
                </td>
                <td rowSpan="2" className="ColTitle">
                  사업수행부서
                </td>
                <td rowSpan="2" className="ColTitle">
                  구분
                </td>
                <td rowSpan="2" className="ColTitle">
                  선발현황
                </td>
                <td rowSpan="2" className="ColTitle">
                  근로정보
                </td>
              </tr>

              <tr>
                <td className="ColTitle">마감일</td>

                <td className="ColTitle">시작일</td>
                <td className="ColTitle">종료일</td>
              </tr>
            </tbody>
          </table>
          <div>
            {SeabuSaupGwanRi_Data && (
              <GridSaebu
                columns={Grid_SeabuSaupCol}
                rows={SeabuSaupList}
                getCellValue_Seabu={getCellValue_Seabu}
              />
              // 스토어 값을 넣으면 에러,,
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaupGwanRi;
