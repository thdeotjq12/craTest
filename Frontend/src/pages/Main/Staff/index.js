import React, { useState, Component } from "react";
import ING_N from "../../../Images/ING_N.bmp";
import ING_Y from "../../../Images/ING_Y.bmp";
import Info from "./Info";
import Info_Seabu from "./Info_Seabu";
import Grid_STList from "./Grid_STList";

import "./index.css";

const Grid_STListCol = [
  { key: "DDD1", name: "전체선택", width: 40, editable: true },
  { key: "DDD2", name: "구분", width: 40, editable: true },
  { key: "DDD3", name: "근로자명", width: 80, editable: true },
  { key: "DDD4", name: "세부사업명", width: 120, editable: true }
];

const Staff = props => {
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
                  사원복사
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
                  엑셀
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  신규등록
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  수정
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
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

              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => onMenuClick(1)}
                >
                  기본정보
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => onMenuClick(2)}
                >
                  급여정보
                </button>
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
                {selectedMenu === 1 && <Info />}
                {selectedMenu === 2 && <Info_Seabu />}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Staff;
