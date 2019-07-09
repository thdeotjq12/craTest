import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";

const Grid_Saup = props => {
  const { columns, rows } = props;

  const [reRows, setrows] = useState(rows);
  const [NowRow, setNowRow] = useState(0); // 현재 행
  const [NowCol, setNowCol] = useState(0); // 현재 열
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
      GetRowIdx.rowIdx,
      moment(rows[GetRowIdx.rowIdx].SHSTRDATE).format("YYYY-MM-DD"),
      moment(rows[GetRowIdx.rowIdx].SHENDDATE).format("YYYY-MM-DD")
    ]);
  };
  const RowFix = () => {
    for (let i = 0; i < rows.length; i++) {
      rows[i].SHSTRDATE = moment(rows[i].SHSTRDATE).format("YYYY-MM-DD"); // 시작일
      rows[i].SHENDDATE = moment(rows[i].SHENDDATE).format("YYYY-MM-DD"); // 종료일
    }
  };

  const DoubleClick = () => {
    props.getRow([NowRow, NowCol]);
  };

  // setrows(rows)
  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => reRows[i]}
      rowsCount={reRows.length}
      onCellSelected={getCellActions}
      // rowRenderer
      enableCellSelect={true}
      onRowDoubleClick={DoubleClick}
      cell
    />
  );
};

export default Grid_Saup;
