import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";

const Grid = props => {
  const { columns, rows } = props;
  console.log("col", columns);
  console.log("row", rows);
  const Store = [];
  Store.push(columns);
  const [reRows, setrows] = useState(rows);
  console.log("Store Row Length", Store.length);

  const getCellActions = GetRowIdx => {
    // const cellActions = {
    //   firstName: firstNameActions
    // };
    console.log("column:", GetRowIdx);
    return alert(GetRowIdx.rowIdx + 1);
  };

  useEffect(() => {
    console.log("Grid - useEffect 실행됨");
    // 여기서 dispatch > 리퀘스트 로 물어보고 dispatch > suc or fail(err) 분기
    setrows(rows);
  }, [rows]);

  // setrows(rows)
  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => reRows[i]}
      rowsCount={reRows.length}
      onCellSelected={getCellActions}
      enableCellSelect={true}
    />
  );
};

export default Grid;
