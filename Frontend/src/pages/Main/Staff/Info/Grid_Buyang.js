import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import "./index.css";
const Grid_Buyang = props => {
  const { columns, rows, btnRowAdd } = props;
  const [reRows, setrows] = useState(rows);
  const [NowRow, setNowRow] = useState(0); // 현재 행
  const [NowCol, setNowCol] = useState(0); // 현재 열
  const [Count, setCount] = useState(0);
  var moment = require("moment");

  useEffect(() => {
    console.log("Grid - useEffect 실행됨");
    // 여기서 dispatch > 리퀘스트 로 물어보고 dispatch > suc or fail(err) 분기
    RowFix();
    setrows(rows);
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
  // 수정된 사업 배열 리턴해주기
  const Saup_Save = () => {
    // console.log("사업 업데이트 실행댐", rows);
    // for (let i = 0; i < rows.length; i++) {
    //   if (rows[i].SHCODE === "") {
    //     rows[i].N = "N";
    //   }
    // }
    // props.getCellValue({
    //   SDSHCODE: rows[NowRow].SDSHCODE,
    //   SHCODE: rows[NowRow].SHCODE
    // });
    // console.log("전달합니다", rows[NowRow]);
    // props.Close(false);
  };
  // sdname  세부사업명 shname 추진 사업명
  const RowFix = () => {
    for (let i = 0; i < rows.length; i++) {
      // rows[i].SDSTRDATE = moment(rows[i].SDSTRDATE).format("YYYY-MM-DD"); // 시작일
      // rows[i].SDENDDATE = moment(rows[i].SDENDDATE).format("YYYY-MM-DD"); // 종료일
    }
  };

  const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const Update_rows = rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      rows[i] = { ...rows[i], ...updated };
    }
    Saup_Save();
    console.log("updated", updated);
    return { Update_rows };
  };

  return (
    <div>
      <ReactDataGrid
        columns={columns}
        rowGetter={i => reRows[i]} //(필수) 일반 키 / 값 쌍 객체를 반환해야하는 각 렌더링 된 행에 대해 호출되는 함수
        rowsCount={reRows.length} // (필수) 렌더링 될 행의 수
        onCellSelected={getCellActions}
        // rowRenderer
        enableCellSelect={true}
        onRowDoubleClick={Saup_Save}
        onGridRowsUpdated={onGridRowsUpdated}
        minWidth={800}
      />
    </div>
  );
};

export default Grid_Buyang;
