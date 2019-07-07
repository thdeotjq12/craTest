import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";

const Grid_SeabuSaup = props => {
  const { columns, rows } = props;
  console.log("col", columns);
  console.log("row", rows);
  const [reRows, setrows] = useState(rows);

  const getCellActions = GetRowIdx => {
    props.getCellValue(rows[GetRowIdx.rowIdx]);
  };

  useEffect(() => {
    console.log("SeabuSaup Grid - useEffect 실행됨");
    // 여기서 dispatch > 리퀘스트 로 물어보고 dispatch > suc or fail(err) 분기
    //reRows[GetRowIdx.rowIdx].N = "N";

    setrows(rows);
  }, [rows]);

  // setrows(rows)
  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => reRows[i]}
      rowsCount={reRows.length}
      onCellSelected={getCellActions}
      // rowRenderer
      enableCellSelect={true}
    />
  );
};

export default Grid_SeabuSaup;
