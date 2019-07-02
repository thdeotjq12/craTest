import React from "react";
import { Form, Row, Col, Table, Button } from "react-bootstrap";

const FormRow = props => {
  console.log("props", props);
  const { List } = props;
  return (
    // 속성: http://bootstrapk.com/css/ , https://unikys.tistory.com/371 참고
    // console.log("List", List, List[0]),
    List &&
    List.map((value, index) => {
      return (
        <tr>
          <td>{value.SUNAME}</td>
          <td>{value.SANAME}</td>
          <td>{value.SUJIKCHECK}</td>
          <td>{value.SUINDAY}</td>
          <td>{value.SUOutDay}</td>
          <td>{value.SUID2}</td>
        </tr>
      );
    })
  );
};

export default FormRow;
