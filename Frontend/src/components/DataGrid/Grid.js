import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import FormRow from "../../components/Modal/FormRow";
import ModalGrid from "../../pages/Main/CompanyInfo/BasicInfo/ModalGrid";
import { ADD_BASIC_DamGrid_SUCCESS } from "../../modules/Main/CompanyInfo/BasicInfo/BasicInfoReducer";
const Grid = props => {
  const { columns, rows } = props;
  console.log("col", columns);
  console.log("row", rows);
  const [reRows, setrows] = useState(rows);

  const getCellActions = GetRowIdx => {
    // const cellActions = {
    //   firstName: firstNameActions
    // };
    reRows[GetRowIdx.rowIdx].N = "N";

    // console.log("행의 내용:", reRows[GetRowIdx.rowIdx]);
    props.getCellValue(rows[GetRowIdx.rowIdx]);
    // return <ModalGrid cellValue={cellValue} />;
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
      // rowRenderer
      enableCellSelect={true}
    />
  );
};

export default Grid;
