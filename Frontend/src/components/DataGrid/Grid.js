import React from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";

const Grid = props => {
  const { columns, SAList } = props;
  console.log("col", columns);
  console.log("row", SAList);
  const Store = [];
  Store.push(columns);

  console.log("Store Row Length", Store.length);

  const getCellActions = GetRowIdx => {
    // const cellActions = {
    //   firstName: firstNameActions
    // };
    console.log("column:", GetRowIdx);
    return alert(GetRowIdx.rowIdx + 1);
  };

  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => SAList[i]}
      rowsCount={SAList.length}
      onCellSelected={getCellActions}
      enableCellSelect={true}
    />
  );
};

export default Grid;
