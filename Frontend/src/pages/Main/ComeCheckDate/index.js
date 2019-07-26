import React, { useState, useEffect } from "react";
import ING_N from "../../../Images/ING_N.bmp";
import ING_Y from "../../../Images/ING_Y.bmp";
import Grid_ComeCheckDate from "./Grid_ComeCheckDate";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import axios from "axios";

const Grid_ComeChecCol = [
  { key: "DDD4", name: "구분", width: 120, editable: true },
  { key: "DDD4", name: "세부사업명", width: 120, editable: true },
  { key: "DDD4", name: "사원명", width: 120, editable: true },
  { key: "DDD4", name: "근무날짜", width: 120, editable: true },
  { key: "DDD4", name: "요일", width: 120, editable: true },
  { key: "DDD4", name: "근무구분", width: 120, editable: true },
  { key: "DDD4", name: "기준시업", width: 120, editable: true },
  { key: "DDD4", name: "기준종업", width: 120, editable: true },
  { key: "DDD4", name: "수습", width: 120, editable: true },
  { key: "DDD4", name: "휴직", width: 120, editable: true },
  { key: "DDD4", name: "시작일", width: 120, editable: true },
  { key: "DDD4", name: "종료일", width: 120, editable: true },
  { key: "DDD4", name: "출근", width: 120, editable: true },
  { key: "DDD4", name: "퇴근", width: 120, editable: true },
  { key: "DDD4", name: "근무처리", width: 120, editable: true },
  { key: "DDD4", name: "기준적용", width: 120, editable: true },
  { key: "DDD4", name: "결근", width: 120, editable: true },
  { key: "DDD4", name: "지각", width: 120, editable: true }
];
const ComeCheckDate = props => {
  const dispatch = useDispatch();

  useEffect(() => {});

  const getCellValue = value => {};
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
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px" }}
                >
                  검색
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  삭제
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  기타기능
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  마감
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  모바일근태 불러오기
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  근태반영
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  일별만근
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  엑셀
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
              <td className="ColGubun">마감여부</td>
              <td>
                <img src={ING_Y} /> 마감완료
              </td>

              <td className="ColGubun">근태수정 기능일(오늘 -Dday)</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td>
                <button className="btn btn-primary">저장</button>
              </td>
              <td>
                <button className="btn btn-primary">근무처리복사</button>
                <button className="btn btn-primary">주휴시간삭제</button>
              </td>
            </tr>
            <tr>
              <td colSpan="12" style={{ verticalAlign: "top" }}>
                <Grid_ComeCheckDate
                  columns={Grid_ComeChecCol}
                  rows={["123", "123"]}
                  getCellValue={getCellValue}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComeCheckDate;
