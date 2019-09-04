import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";

import "./index.css";
const Grid_ComeCheckDetail = props => {
  const { columns, rows, btnRowAdd } = props;
  const [reRows, setrows] = useState(rows);
  const [NowRow, setNowRow] = useState(0); // 현재 행
  const [NowCol, setNowCol] = useState(0); // 현재 열
  const [Count, setCount] = useState(0);
  var moment = require("moment");

  useEffect(() => {
    console.log("Grid_ComeCheckDetail - useEffect 실행됨", rows);
    // 여기서 dispatch > 리퀘스트 로 물어보고 dispatch > suc or fail(err) 분기

    setrows(rows);
    RowFix();
  }, [rows]);
  const getCellActions = GetRowIdx => {
    // 델파이 SelectSaupHeadList 함수 구현
    setNowRow(GetRowIdx.rowIdx);
    setNowCol(GetRowIdx.idx);
    props.getCellValue([
      GetRowIdx.rowIdx
      // moment(rows[GetRowIdx.rowIdx].SHSTRDATE).format("YYYY-MM-DD"),
      // moment(rows[GetRowIdx.rowIdx].SHENDDATE).format("YYYY-MM-DD")
    ]);
  };
  const ChangeValue = (Updated_List, Column, Row) => {
    props.ChangeValue(Updated_List, Column, Row);
  };
  // 수정된 사업 배열 리턴해주기
  const Saup_Save = () => {
    // console.log("사업 업데이트 실행댐", rows);
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].SHCODE === "") {
        rows[i].N = "N";
      }
    }
    // props.getCellValue({
    //   SDSHCODE: rows[NowRow].SDSHCODE,
    //   SHCODE: rows[NowRow].SHCODE
    // });
    // console.log("전달합니다", rows[NowRow]);
    // props.Close(false);
  };
  // sdname  세부사업명 shname 추진 사업명
  const RowFix = () => {
    console.log("RowFix 실행됨");

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].CDDayWeek === "1") rows[i].CDDayWeek = "일요일";
      if (rows[i].CDDayWeek === "2") rows[i].CDDayWeek = "월요일";
      if (rows[i].CDDayWeek === "3") rows[i].CDDayWeek = "화요일";
      if (rows[i].CDDayWeek === "4") rows[i].CDDayWeek = "수요일";
      if (rows[i].CDDayWeek === "5") rows[i].CDDayWeek = "목요일";
      if (rows[i].CDDayWeek === "6") rows[i].CDDayWeek = "금요일";
      if (rows[i].CDDayWeek === "7") rows[i].CDDayWeek = "토요일";
      if (rows[i].DateGubun === "0") rows[i].DateGubun = "주간";
      if (rows[i].DateGubun === "1") rows[i].DateGubun = "주휴";
      if (rows[i].DateGubun === 1) rows[i].DateGubun = "주휴";
      if (rows[i].DateGubun === "2") rows[i].DateGubun = "무휴";
      if (rows[i].CDGubun === "6") rows[i].CDGubun = "유급휴일";
      if (rows[i].CDGubun === "5") rows[i].CDGubun = "무급휴일";
      if (rows[i].CDGubun === "0") rows[i].CDGubun = "정상근무";
    }
    setrows(rows);
    console.log("RowFix 종료됨");
  };

  const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const Update_rows = rows.slice();
    var Keys = Object.keys(updated); // 컬럼명 구하기  Keys[0] (객체의 키값 가져오기)
    var values = Object.values(updated);
    var Test = {};
    for (let i = fromRow; i <= toRow; i++) {
      // if (values[0].length > 5) {
      //   Test =   { Keys[0] : values[0].substr(0, 5)} ;
      //   console.log(" Maximum 5", values, updated);
      // }
      rows[i] = { ...rows[i], ...updated };

      ChangeValue(rows, Keys[0], i);
    }

    Saup_Save();
    console.log("updated", updated);
    return { Update_rows };
  };

  return (
    <div>
      <div>
        <span
          className="input-group-text"
          id="basic-addon1"
          // style={{ width: "120px" }}
        >
          일반수당
        </span>
      </div>
      <ReactDataGrid
        columns={columns.length > 0 ? columns : null}
        rowGetter={i => reRows[i]} //(필수) 일반 키 / 값 쌍 객체를 반환해야하는 각 렌더링 된 행에 대해 호출되는 함수
        rowsCount={reRows.length} // (필수) 렌더링 될 행의 수
        onCellSelected={getCellActions}
        // rowRenderer
        enableCellSelect={true}
        onRowDoubleClick={Saup_Save}
        onGridRowsUpdated={onGridRowsUpdated}
        minWidth={1100}
      />
    </div>
  );
};

export default Grid_ComeCheckDetail;
