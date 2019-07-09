import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";

const Grid_SeabuSaup = props => {
  const { columns, rows } = props;
  const [reRows, setrows] = useState(rows);
  var moment = require("moment");

  useEffect(() => {
    console.log("SeabuSaup Grid - useEffect 실행됨");
    // 여기서 dispatch > 리퀘스트 로 물어보고 dispatch > suc or fail(err) 분기
    //reRows[GetRowIdx.rowIdx].N = "N";
    RowFix();
    setrows(rows);
  }, [rows]);

  const RowFix = () => {
    for (let i = 0; i < rows.length; i++) {
      rows[i].CNT = rows[i].CNT + "명";

      rows[i].SDSTRDATE = moment(rows[i].SDSTRDATE).format("YYYY-MM-DD"); // 시작일
      rows[i].SDENDDATE = moment(rows[i].SDENDDATE).format("YYYY-MM-DD"); // 종료일
      rows[i].SDMOZIPENDDATE = moment(rows[i].SDMOZIPENDDATE).format(
        "YYYY-MM-DD"
      ); // 마감일
    }
  };

  const getCellValue_Seabu = GetRowIdx => {
    // 델파이 SelectSaupHeadList 함수 구현
    props.getCellValue_Seabu(GetRowIdx.rowIdx);
  };

  // setrows(rows)
  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => reRows[i]}
      rowsCount={reRows.length}
      onCellSelected={getCellValue_Seabu}
      enableCellSelect={true}
    />
  );
};

export default Grid_SeabuSaup;
