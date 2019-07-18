import React, { useState, Component } from "react";
import ING_N from "../../../Images/ING_N.bmp";
import ING_Y from "../../../Images/ING_Y.bmp";
import Grid_STList from "./Grid_STList";
import Grid_Insa from "./Grid_Insa";
import Grid_Huejic from "./Grid_Huejic";
import Grid_Toejic from "./Grid_Toejic";
import Huejic from "./Huejic";
import Toejic from "./Toejic";
import Insa_Info from "./Insa_Info";
import "./index.css";

const Grid_STListCol = [
  { key: "DDD1", name: "전체선택", width: 40, editable: true },
  { key: "DDD2", name: "구분", width: 40, editable: true },
  { key: "DDD3", name: "근로자명", width: 80, editable: true },
  { key: "DDD4", name: "세부사업명", width: 120, editable: true }
];
const Grid_InsaCol = [
  { key: "DDD4", name: "인사기록", width: 120, editable: true },
  { key: "DDD4", name: "발령(시작)일자", width: 120, editable: true },
  { key: "DDD4", name: "해지(종료)일자", width: 120, editable: true },
  { key: "DDD4", name: "인사처리일자", width: 120, editable: true },
  { key: "DDD4", name: "인사담당", width: 120, editable: true },
  { key: "DDD4", name: "상세내용", width: 120, editable: true }
];
const Grid_HuejicCol = [
  { key: "DDD4", name: "휴직사유", width: 120, editable: true },
  { key: "DDD4", name: "시작일자", width: 120, editable: true },
  { key: "DDD4", name: "종료일자", width: 120, editable: true },
  { key: "DDD4", name: "인사처리일자", width: 120, editable: true },
  { key: "DDD4", name: "인사담당", width: 120, editable: true },
  { key: "DDD4", name: "급여", width: 120, editable: true },
  { key: "DDD4", name: "계속근로", width: 120, editable: true }
];
const Insa = props => {
  const getCellValue = value => {};
  const [selectedMenu, setSeletedMenu] = useState(1);
  const onMenuClick = idx => {
    setSeletedMenu(idx);
  };

  return (
    <div className="MainDivContainer">
      <div>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td className="ColTitle" style={{ width: "150px" }}>
                사업시작연도
              </td>
              <td className="ColTitle" style={{ width: "250px" }}>
                참여사업
              </td>
              <td className="ColTitle" style={{ width: "250px" }}>
                참여 세부사업
              </td>
              <td className="ColTitle" style={{ width: "150px" }}>
                검색어
              </td>

              <td
                rowSpan="2"
                style={{ width: "150px", height: "80px", padding: "0" }}
              >
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  수정
                </button>
              </td>
              <td
                rowSpan="2"
                style={{ width: "150px", height: "80px", padding: "0" }}
              >
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  저장
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <div class="input-group-prepend">
                  <button
                    class="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ width: "100%" }}
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
                </div>
              </td>
              <td>
                <div class="input-group-prepend">
                  <button
                    class="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ width: "100%" }}
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
                </div>
              </td>
              <td>
                <div class="input-group-prepend">
                  <button
                    class="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ width: "100%" }}
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
                </div>
              </td>

              <td />
            </tr>

            <tr>
              <td className="ColGubun">범례</td>
              <td>
                <img src={ING_Y} /> 진행중
                <img src={ING_N} />
                사업종료
                <img src={ING_N} />
                선택
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <Grid_STList
                  columns={Grid_STListCol}
                  rows={["123", "123"]}
                  getCellValue={getCellValue}
                />
              </td>
              <td colSpan="9" style={{ verticalAlign: "top" }}>
                <div>
                  <label className="TableTitle">근로자 기본정보</label>
                </div>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td className="ColGubun">이름(한글)</td>
                      <td id="TdInput">
                        <input className="InputContainer" />
                      </td>
                      <td className="ColGubun">이름(영문)</td>
                      <td id="TdInput">
                        <input className="InputContainer" />
                      </td>
                      <td className="ColGubun">연락처</td>
                      <td id="TdInput">
                        <input className="InputContainer" />
                      </td>
                    </tr>
                    <tr>
                      <td className="ColGubun">주민번호</td>
                      <td id="TdInput">
                        <input className="InputContainer" />
                      </td>
                      <td className="ColGubun">근로구분</td>
                      <td id="TdInput">
                        <input className="InputContainer" />
                      </td>
                      <td className="ColGubun">대표자와의 관계</td>
                      <td id="TdInput">
                        <input className="InputContainer" />
                      </td>
                    </tr>
                    <tr>
                      <td className="ColGubun">국적</td>
                      <td id="TdInput">
                        <input className="InputContainer" />
                      </td>
                      <td className="ColGubun">체류자격</td>
                      <td id="TdInput">
                        <input className="InputContainer" />
                      </td>
                      <td className="ColGubun">체류코드</td>
                      <td id="TdInput">
                        <input className="InputContainer" />
                      </td>
                    </tr>
                    <tr>
                      <td className="ColGubun">주소</td>
                      <td id="TdInput" colSpan="5">
                        <input className="InputContainer" />
                      </td>
                    </tr>
                    <tr>
                      <td className="ColGubun">최초근로일</td>
                      <td id="TdInput">
                        <input className="InputContainer" />
                      </td>
                      <td className="ColGubun">최종근로일</td>
                      <td id="TdInput">
                        <input className="InputContainer" />
                      </td>
                      <td className="ColGubun">누적근로일</td>
                      <td id="TdInput">
                        <input className="InputContainer" />
                      </td>
                    </tr>
                    <tr>
                      <td id="TdInput" colSpan="6" style={{ padding: "10px" }}>
                        <div style={{ float: "left" }}>
                          <button
                            className="btn btn-primary"
                            onClick={() => onMenuClick(1)}
                          >
                            인사정보
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => onMenuClick(2)}
                          >
                            휴직관리
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => onMenuClick(3)}
                          >
                            퇴직관리
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="6" style={{ verticalAlign: "top" }}>
                        {selectedMenu === 1 && (
                          <Grid_Insa
                            columns={Grid_InsaCol}
                            rows={["123", "123"]}
                            getCellValue={getCellValue}
                          />
                        )}
                        {selectedMenu === 2 && (
                          <Grid_Huejic
                            columns={Grid_HuejicCol}
                            rows={["123", "123"]}
                            getCellValue={getCellValue}
                          />
                        )}
                        {selectedMenu === 3 && (
                          <Grid_Toejic
                            columns={Grid_HuejicCol}
                            rows={["123", "123"]}
                            getCellValue={getCellValue}
                          />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Insa;
