import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";

const Grid_SeabuSaup = props => {
  const { columns, rows, btnRowAdd } = props;
  const [reRows, setrows] = useState(rows);
  const [NowRow, setNowRow] = useState(0); // 현재 행
  const [NowCol, setNowCol] = useState(0); // 현재 열
  var moment = require("moment");

  useEffect(() => {
    console.log("SeabuSaup Grid - useEffect 실행됨");
    // 여기서 dispatch > 리퀘스트 로 물어보고 dispatch > suc or fail(err) 분기
    //reRows[GetRowIdx.rowIdx].N = "N";
    setrows(rows);
    RowFix();
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
    console.log("Test", rows);
  };
  const SeabuSaup_Save = () => {
    props.SeabuSaup_Save(rows);
  };

  const getCellValue_Seabu = GetRowIdx => {
    // 델파이 SelectSaupHeadList 함수 구현
    setNowCol(GetRowIdx.idx);
    props.getCellValue_Seabu(GetRowIdx.rowIdx);
  };
  const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const Update_rows = rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      rows[i] = { ...rows[i], ...updated };
      rows[i].SaveGubun = "U"; // 저장 구분: 업데이트
    }
    SeabuSaup_Save();
    console.log("updated", updated);
    return { Update_rows };
  };
  // 근로 모달 열기
  const GeunLoShow = () => {
    if (NowCol === 9) {
      props.GeunLoShow("T");
    }
  };

  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => reRows[i]}
      rowsCount={reRows.length}
      onCellSelected={getCellValue_Seabu}
      enableCellSelect={true}
      onRowDoubleClick={GeunLoShow}
      onGridRowsUpdated={onGridRowsUpdated}
    />
  );
};

export default Grid_SeabuSaup;
