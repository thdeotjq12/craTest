import React from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";

const Grid = (...col) => {
  // const { ...col , ...Row } = props;
  console.log("col", col[0]);
  console.log("row", col[1]);
  const Store = [];
  Store.push(col);
  console.log("Store0", Store[0][0]);
  console.log("Store1", Store[0][1]);
  // const cols = [];
  // const MakeCol = () => {
  //   for (let i = 0; i < Store.length; i++) {
  //     cols.push(col[i]);
  //     console.log("cols", cols);
  //   }
  // };

  return (
    <ReactDataGrid
      columns={Store[0][0]}
      rowGetter={i => Store[0][1][i]}
      rowsCount={3}
      enableCellSelect={true}
    />
  );
};

export default Grid;
