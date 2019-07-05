import React, { useState, useEffect } from "react";
import { Form, Row, Col, Table, Button } from "react-bootstrap";

const FormRow = props => {
  console.log("FormRow_List_props", props);
  const { List } = props;
  const [idxBG, setidxBG] = useState("");
  const getCellIndex = idx => {
    props.getFormIdx(idx);
    setidxBG(idx);
  };
  const BGC = index => {
    var Obj = document.getElementById(index); // 현 인덱스

    for (let i = 0; i < List.length; i++) {
      var dObj = document.getElementById(i); // 모든 인덱스
      dObj.style.backgroundColor = "White";
    }
    Obj.style.backgroundColor = "#66FF66";
  };

  return (
    // 속성: http://bootstrapk.com/css/ , https://unikys.tistory.com/371 참고
    // console.log("List", List, List[0]),

    List &&
    List.map((value, index) => {
      return (
        <tr id={index}>
          <td onClick={() => [getCellIndex(index), BGC(index)]}>
            {value.SUNAME}
          </td>
          <td onClick={() => [getCellIndex(index), BGC(index)]}>
            {value.SANAME}
          </td>
          <td onClick={() => [getCellIndex(index), BGC(index)]}>
            {value.SUJIKCHECK}
          </td>
          <td onClick={() => [getCellIndex(index), BGC(index)]}>
            {value.SUINDAY}
          </td>
          <td onClick={() => [getCellIndex(index), BGC(index)]}>
            {value.SUOUTDAY !== "1888-01-01" ? value.SUOUTDAY : ""}
          </td>
          <td onClick={() => [getCellIndex(index), BGC(index)]}>
            {value.SUID}
          </td>
        </tr>
      );
    })
  );
};

export default FormRow;
