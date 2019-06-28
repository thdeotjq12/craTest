import React from "react";
import { Form, Row, Col, Table, Button } from "react-bootstrap";
const FormRow = props => {
  const { Value, Count, label, value, readOnly, controlId } = props;

  //   const THead = (Count, ...Value) => {
  //     for (let i = 0; i < Count; i++) {
  //       <th>{Value[i]}</th>;
  //     }
  //   };
  return (
    // 속성: http://bootstrapk.com/css/ , https://unikys.tistory.com/371 참고
    <Table>
      <thead>
        <tr>
          <th>담당자</th>

          <th>사업부서</th>
          <th>직급</th>
          <th>발령일자</th>
          <th>전출일자</th>
          <th>사용자아이디</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default FormRow;
