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
  Loading,
  ADD_Saup_Grid_REQUEST,
  ADD_Saup_Grid_SUCCESS
} from "../../../../modules/Main/CompanyInfo/SaupGwanRi/SaupGwanRiReducer";
import axios from "axios";

const Grid_SudangCol = [
  { key: "DDD", name: "수당명", width: 250, editable: true }
];
const Grid_HolidayCol = [
  { key: "DDD1", name: "공휴일", width: 220, editable: true },
  { key: "DDD2", name: "구분", width: 80, editable: true },
  { key: "DDD3", name: "날짜", width: 120, editable: true },
  { key: "DDD4", name: "요일", width: 80, editable: true },
  { key: "DDD5", name: "공무직", width: 80, editable: true },
  { key: "DDD6", name: "기간제", width: 80, editable: true },
  { key: "DDD7", name: "공공근로", width: 80, editable: true },
  { key: "DDD8", name: "비고", width: 300, editable: true }
];
const CommonInfo = props => {
  const [ReadOnly, setReadOnly] = useState(true); // 수정버튼 클릭 시 false
  useEffect(() => {
    console.log("ZiwonGwanRi - useEffect 실행됨");
  });
  const getCellValue = value => {};
  // const getCellValue = value => {};
  // // 지원자 관리 리스트
  // const getZiwonData = (SDSHCODE, SDCODE) => {
  //   console.log("getZiwonData 실행됨", SDSHCODE);
  //   var parm = [
  //     {
  //       SDSHCODE: SDSHCODE,
  //       SDCODE: SDCODE,
  //       KeyWord: "",
  //       Gubun: "전체"
  //     }
  //   ];

  //   axios
  //     .post(
  //       "http://localhost:5000/CompanyInfo/ZiwonGwanRi/getZiwonGwanRi",
  //       parm
  //     )
  //     .then(res => {
  //       if (res.data === "NoData") {
  //         console.log("Damdang 쿼리 에러");
  //       } else {
  //         console.log("FindUser 가져오기 완료", res.data);

  //         setZiwonList(res.data.ZiwonList);
  //         console.log("검색된 사업 리스트", ZiwonList);
  //       }
  //     })
  //     .catch(err => {
  //       console.log("사업 검색 에러", err);
  //     });
  // };
  // // 모달 닫기
  // const handleClose_ZiwonSerch = () => {
  //   setMD_ZiwonSerch(Modals_ZiwonSerch ? false : true);
  // };
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
                rows={["123", "123"]}
                getCellValue={getCellValue}
              />
            </td>
            <td>
              <Grid_TimeSudang
                columns={Grid_SudangCol}
                rows={["123", "123"]}
                getCellValue={getCellValue}
              />
            </td>
            <td>
              <Grid_DaySudang
                columns={Grid_SudangCol}
                rows={["123", "123"]}
                getCellValue={getCellValue}
              />
            </td>
            <td>
              <Grid_BeGwaSudang
                columns={Grid_SudangCol}
                rows={["123", "123"]}
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
                  <input type="radio" name="optradio" checked />
                  이전월
                </label>
                <label class="radio-inline">
                  <input type="radio" name="optradio" />
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
                  <input type="radio" name="optradio" checked />
                  적용
                </label>
                <label class="radio-inline">
                  <input type="radio" name="optradio" />
                  미적용
                </label>
              </td>
            </tr>
            <tr>
              <td className="ColGubun">연차휴가 적용방식</td>
              <td id="TdInput">
                <label class="radio-inline">
                  <input type="radio" name="optradio" checked />
                  입사일
                </label>
                <label class="radio-inline">
                  <input type="radio" name="optradio" />
                  회계연도
                </label>
              </td>
              <td className="ColGubun">수습기간설정</td>
              <td id="TdInput">
                <label class="radio-inline">
                  <input type="radio" name="optradio" checked />
                  입사일
                </label>
                <label class="radio-inline">
                  <input type="radio" name="optradio" />
                  회계연도
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
                  <input type="radio" name="optradio" checked />
                  귀속월액
                </label>
                <label class="radio-inline">
                  <input type="radio" name="optradio" />
                  보수월액
                </label>
                <label class="radio-inline">
                  <input type="radio" name="optradio" checked />
                  납입액입력
                </label>
                <label class="radio-inline">
                  <input type="radio" name="optradio" />
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
                <input type="radio" name="optradio" checked />예
              </label>
              <label class="radio-inline">
                <input type="radio" name="optradio" />
                아니오
              </label>
            </tr>
          </tbody>
        </table>
        <Grid_Holiday
          columns={Grid_HolidayCol}
          rows={["123", "123"]}
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
                  <input type="radio" name="optradio" checked />
                  10인 미만
                </label>
                <label class="radio-inline">
                  <input type="radio" name="optradio" />
                  150인 미만
                </label>
                <label class="radio-inline">
                  <input type="radio" name="optradio" checked />
                  150인 이상(우선지원대상기업)
                </label>
                <label class="radio-inline">
                  <input type="radio" name="optradio" />
                  150인 이상 1,000인 미만
                </label>
                <label class="radio-inline">
                  <input type="radio" name="optradio" checked />
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
