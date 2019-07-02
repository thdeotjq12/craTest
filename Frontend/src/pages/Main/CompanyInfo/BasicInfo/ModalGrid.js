import React from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Container,
  Form,
  ButtonToolbar,
  Table
} from "react-bootstrap";
import FormRow from "../../../../components/Modal/FormRow";
import Grid from "../../../../components/DataGrid/Grid";

const ModalGrid = SAList => {
  //   var TestDamdang = [];
  //   axios
  //     .post(
  //       "http://localhost:5000/CompanyInfo/BasicInfo/BasicInfo_getDamdang",
  //       SAList && SAList[0].SACODE
  //     )
  //     .then(res => {
  //       if (res.data === "NoData") {
  //         console.log("Damdang 데이터가 없습니다");
  //       } else {
  //         console.log("Damdang 가져오기 완료", res.data.BaicInfo_Damdang);
  //         TestDamdang = res.data.BaicInfo_Damdang;
  //         console.log("TestDamdang", TestDamdang);
  //       }
  //     })
  //     .catch(err => {
  //       console.log("담당조회 에러", err);
  //     });
  //   console.log("담당 : ", TestDamdang);
  //   return (
  //     <Modal
  //       show={Modals}
  //       onHide={handleClose}
  //       aria-labelledby="contained-modal-title-vcenter"
  //       dialogClassName="ModalContainer"
  //       centered
  //       // modal-dialog modal-lg
  //     >
  //       <Modal.Header closeButton>
  //         <Modal.Title id="contained-modal-title-vcenter">
  //           담당자 보기
  //           <Button variant="primary" onClick={DamdangAdd}>
  //             추가
  //           </Button>
  //           <Button variant="primary">제거</Button>
  //         </Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <Table>
  //           <thead>
  //             <tr>
  //               <th>담당자</th>
  //               <th>사업부서</th>
  //               <th>직급</th>
  //               <th>발령일자</th>
  //               <th>전출일자</th>
  //               <th>사용자아이디</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             <tr>{FormRow(TestDamdang[0])}</tr>
  //           </tbody>
  //         </Table>
  //         <div id="Grid" style={{ display: "none" }}>
  //           {Grid(columns, SAList)}
  //         </div>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button onClick={() => setModals(Modals ? false : true)}>Close</Button>
  //       </Modal.Footer>
  //     </Modal>
  //   );
};

export default ModalGrid;
