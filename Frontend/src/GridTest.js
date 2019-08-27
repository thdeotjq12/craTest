import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactDataGrid from "react-data-grid";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const columns = [
  { key: "id", name: "ID", editable: true },
  { key: "title", name: "Title", editable: true },
  { key: "complete", name: "Complete", editable: true },
  { key: "complete2", name: "Complete", editable: true },
  { key: "complete3", name: "Complete", editable: true },
  { key: "complete4", name: "Complete", editable: true },
  { key: "complete5", name: "Complete", editable: true },
  { key: "complete6", name: "Complete", editable: true },
  { key: "complete7", name: "Complete", editable: true },
  { key: "complete8", name: "Complete", editable: true }
];

const rows = [
  { id: 0, title: "Task 1", complete: 20 },
  { id: 1, title: "Task 2", complete2: 40 },
  { id: 3, title: "Task 3", complete3: 60 },
  { id: 4, title: "Task 3", complete4: 60 },
  { id: 5, title: "Task 3", complete5: 60 },
  { id: 6, title: "Task 3", complete6: 60 },
  { id: 7, title: "Task 3", complete7: 60 },
  { id: 8, title: "Task 3", complete8: 60 },
  { id: 9, title: "Task 3", complete9: 60 },
  { id: 10, title: "Task 3", complete10: 60 },
  { id: 11, title: "Task 3", complete11: 60 },
  { id: 12, title: "Task 3", complete12: 60 },
  { id: 13, title: "Task 3", complete13: 60 },
  { id: 14, title: "Task 3", complete14: 60 },
  { id: 15, title: "Task 3", complete15: 60 }
];

const GridTest = () => {
  const today = new Date();
  const [Year, setYear] = useState(today.getFullYear());
  const [Month, setMonth] = useState(
    (today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth() + 1)
  );

  const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const Update_rows = rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      rows[i] = { ...rows[i], ...updated };
    }

    console.log("updated", updated);
    return { Update_rows };
  };
  const openButton = document.getElementById("open");
  const modal = document.querySelector(".modal");
  const openModal = () => {
    modal.classList.remove("hidden");
  };
  if (openButton) {
    openButton.addEventListener("click", openModal);
  }
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
                  id="open"
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                  // onClick={() => setModals(true)}
                  onClick={() => openModal()}
                >
                  상세 설정
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
                  근태 복사
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  만근 처리
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
                  <select class="browser-default custom-select" name="Year">
                    <option selected defaultValue="2019">
                      2019
                    </option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                  </select>
                  <select class="browser-default custom-select" name="Month">
                    <option selected defaultValue="07">
                      07
                    </option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>
              </td>
              <td>
                <div class="input-group-prepend">
                  <select class="browser-default custom-select" id="SaupHead">
                    <option selected>전체</option>
                  </select>
                </div>
              </td>
              <td>
                <div class="input-group-prepend">
                  <select class="browser-default custom-select" id="SaupDetail">
                    <option selected>전체</option>
                  </select>
                </div>
              </td>

              <td />
            </tr>

            <tr>
              <td className="ColGubun">범례</td>
              <td />
              <td className="ColGubun">마감여부</td>
              <td />

              <td className="ColGubun">근태수정 기능일(오늘 -Dday)</td>
              <td id="TdInput">
                <input
                  value={new Date()}
                  className="InputContainer"
                  name="WPCCEditAbleDate"
                />
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
                {/* <Grid_ComeCheck
                  columns={Grid_ComeChecCol}
                  rows={CCList && CCList}
                  getCellValue={getCellValue}
                /> */}
                <ReactDataGrid
                  columns={columns}
                  rowGetter={i => rows[i]}
                  rowsCount={3}
                  onGridRowsUpdated={onGridRowsUpdated}
                  enableCellSelect={true}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal ">
        <div class="modal_overlay" />
        <div class="modal_content">
          <h1>im a modal</h1>
          {/* <Grid_ComeCheck
            columns={Grid_ComeChecCol}
            rows={CCList && CCList}
            getCellValue={getCellValue}
          /> */}
          <ReactDataGrid
            columns={columns}
            rowGetter={i => rows[i]}
            rowsCount={5}
            onGridRowsUpdated={onGridRowsUpdated}
            enableCellSelect={true}
          />
        </div>
      </div>
    </div>
    // <div>
    //   <button id="open" onClick={() => openModal()} style={{ width: "500px" }}>
    //     12345
    //   </button>
    //   <div>
    //     <div className="modal">
    //       <div className="modal_overlay" />
    //       <div className="modal_content">
    //         <h1>im a modal</h1>
    //         <ReactDataGrid
    //           columns={columns}
    //           rowGetter={i => rows[i]}
    //           rowsCount={3}
    //           onGridRowsUpdated={onGridRowsUpdated}
    //           enableCellSelect={true}
    //         />
    //         <button>close</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default GridTest;
