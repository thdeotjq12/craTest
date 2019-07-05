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
  ADD_Saup_Grid_SUCCESS
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
const SaupGwanRi = props => {
  const { Grid_Saup } = props;
  const { SaupGwanRi_Data, SaupGwanRiSeabu_Data, Loading } = useSelector(
    state => state.SaupGwanRi
  );
  const { BaicInfo_Data } = useSelector(state => state.BasicInfo);
  const dispatch = useDispatch();
  const [startDate, setstartDate] = useState(new Date());
  const [SaupList, setSaupList] = useState("");

  // var moment = require("moment");
  // moment.lang("kr"); // 언어팩 변경
  // moment.locale("ko");
  useEffect(() => {
    console.log("Saup useEffect 실행됨");
    getSaup();
  });

  // 사업정보 불러오기 (처음실행)
  const getSaup = () => {
    console.log("getSaup 실행됨");
    console.log("Loading", Loading);
    if (Loading) {
      axios
        .post("http://localhost:5000/CompanyInfo/SaupGwanRi/getSaupGwanRi", {
          STRDATE: "2019-01-01",
          ENDDATE: "2019-12-31",
          SUID: "infra",
          SULevel: "30"
        })
        .then(res => {
          if (res.data === "NoData") {
            console.log("SaupGwanRi 데이터가 없습니다");
          } else {
            console.log("SaupGwanRi 가져오기 완료", res.data.SaupGwanRi_Data);

            if (res.data) {
              dispatch({
                type: ADD_Saup_Grid_SUCCESS,
                payload: res.data
              }); // 로딩 => False

              console.log(
                "디스패치  완료",
                "SaupList :",
                SaupList,
                "SaupGwanRi_Data :",
                SaupGwanRi_Data
              );
              setSaupList(res.data.SaupGwanRi_Data);
            }

            console.log("SaupGwanRi  완료", SaupList, SaupGwanRi_Data);
          }
        })
        .catch(err => {
          console.log("SaupGwanRi 에러", err);
        });
    }
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
                <td>
                  <DatePicker
                    selected={startDate}
                    onChange={e => [
                      setstartDate(e),
                      console.log("startDate", startDate)
                    ]}
                    dateFormat="yyyy"
                    locale="ko"
                    showMonthYearPicker
                  />
                  <DatePicker
                    selected={startDate}
                    onChange={e => [
                      setstartDate(e),
                      console.log("startDate", startDate)
                    ]}
                    dateFormat="yyyy"
                    locale="ko"
                    showMonthYearPicker
                  />
                </td>
                <td className="ColTitle">사업명</td>
                <td colSpan="5">
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="아이디/이름/전화번호 4자리"
                      aria-label="아이디/이름/전화번호 4자리"
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <Button variant="primary" onClick={getSaup}>
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
              <GridSaup columns={Grid_SaupCol} rows={SaupList} />
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
                  <DatePicker
                    selected={startDate}
                    onChange={e => [setstartDate(e), console.log(startDate)]}
                    dateFormat="yyyy"
                    locale="ko"
                    showMonthYearPicker
                  />
                  <DatePicker
                    selected={startDate}
                    onChange={e => [setstartDate(e), console.log(startDate)]}
                    dateFormat="yyyy"
                    locale="ko"
                    showMonthYearPicker
                  />
                </td>
                <td className="ColTitle">사업명</td>
                <td colSpan="5">
                  <input />
                  <button type="button" className="btn btn-primary">
                    검색
                  </button>
                  <button type="button" className="btn btn-secondary">
                    담당자 상세보기
                  </button>
                  <button
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
                  </button>
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

              <tr>
                <td>세부사업명</td>
                <td>사업명</td>
                <td>마감일</td>
                <td>시작일</td>
                <td>종료일</td>
                <td>담당자</td>
                <td>사업수행부서</td>
                <td>구분</td>
                <td>선발현황</td>
                <td>근로정보</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SaupGwanRi;
