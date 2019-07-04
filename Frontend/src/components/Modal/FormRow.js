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
    var dObj = document.getElementById(index); // 전 인덱스

    Obj.style.backgroundColor = "#66FF66";
    dObj.style.backgroundColor = "66FF66";
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
          <td onClick={() => getCellIndex(index)}>{value.SANAME}</td>
          <td onClick={() => getCellIndex(index)}>{value.SUJIKCHECK}</td>
          <td onClick={() => getCellIndex(index)}>{value.SUINDAY}</td>
          <td onClick={() => getCellIndex(index)}>
            {value.SUOUTDAY !== "1888-01-01" ? value.SUOUTDAY : ""}
          </td>
          <td onClick={() => getCellIndex(index)}>{value.SUID}</td>
          <td onClick={() => getCellIndex(index)}>{value.N}</td>
        </tr>
      );
    })
  );
};

export default FormRow;
