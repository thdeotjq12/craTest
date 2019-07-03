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

const [Damdang, setDamdang] = useState("");
const Grid_findUserCol = [
  { key: "SUID", name: "아이디", editable: true },
  // { key: "SUPW", name: "비밀번호", editable: false, hidden: true },
  { key: "SUNAME", name: "사용자명", editable: false },
  { key: "SULEVEL", name: "권한레벨", editable: false },
  { key: "SUINDAY", name: "발령일자", editable: true },
  { key: "SUOUTDAY", name: "전출일자", editable: true },
  { key: "SUBUSEO", name: "부서", editable: true },
  { key: "SUJIKCHECK", name: "직급", editable: true },
  { key: "SUTEL", name: "전화번호", editable: true },
  { key: "SUEMAIL", name: "이메일", editable: true }
  // { key: "SUSACODE", name: "소속참여기관코드", editable: true },
  // { key: "SANAME", name: "소속참여기관명", editable: true }
];
// 모달 열기/닫기
const handleClose = () => {
  setModals(false);
};
// 담당자 추가 버튼클릭 - 그리드 보이기
const DamdangAdd = () => {
  document.getElementById("Grid").style.display = "block";
};
// 담당자 검색 키워드 변수
var findUerKeyword = "";
// 담당자 검색값 할당 이벤트
const FindUserText = e => {
  findUerKeyword = e.target.value;
};
// const [findUserList, setfindUserList] = useState("");
var findUserList = [];
// 담당자 검색 버튼 함수
const getDamdang_find = () => {
  axios
    .post(
      "http://localhost:5000/CompanyInfo/BasicInfo/BasicInfo_getDamdang_findUser",
      findUerKeyword === "" ? { findUerKeyword: "" } : { findUerKeyword }
    )
    .then(res => {
      if (res.data === "NoData") {
        console.log("Damdang 데이터가 없습니다");
      } else {
        console.log("FindUser 가져오기 완료", res.data);
        findUserList = res.data.BaicInfo_findDamdang;
        // setfindUserList(res.data.BaicInfo_findDamdang);
        console.log("findUserList", findUserList);
      }
    })
    .catch(err => {
      console.log("담장자 검색 에러", err);
    });
};

const getDamdang = () => {
  console.log("getDamdang 실행됨");
  console.log("SAList[0].SACODE", SAList[SaupRowNum].SACODE);
  axios
    .post(
      "http://localhost:5000/CompanyInfo/BasicInfo/BasicInfo_getDamdang",
      SAList && [SAList[SaupRowNum].SACODE]
    )
    .then(res => {
      if (res.data === "NoData") {
        console.log("Damdang 데이터가 없습니다");
      } else {
        console.log("Damdang 가져오기 완료", res.data);
        // TestDamdang = res.data.BaicInfo_Damdang;
        console.log(
          "setDamdang(res.data.BaicInfo_Damdang)",
          res.data.BaicInfo_Damdang
        );
        setDamdang(res.data.BaicInfo_Damdang);
        if (res.data) {
          dispatch({
            type: ADD_BASIC_Damdang_SUCCESS,
            payload: res.data
          }); // 로딩 => False
          console.log(
            "#############",
            BasicInfo.BaicInfo_Damdang.BaicInfo_Damdang
          );
          setDamdang(res.data.BaicInfo_Damdang);
        }

        console.log("Damdang  완료", Damdang);
      }
    })
    .catch(err => {
      console.log("담당조회 에러", err);
    });
};

const ModalGrid = props => {
  const { Damdang, Modals, handleClose, DamdangAdd } = props;
  return (
    <Modal
      show={Modals}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="ModalContainer"
      centered
      // modal-dialog modal-lg
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          담당자 보기
          <Button variant="primary" onClick={DamdangAdd}>
            추가
          </Button>
          <Button variant="primary">제거</Button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            <tr>{FormRow(TestDamdang[0])}</tr>
          </tbody>
        </Table>
        <div id="Grid" style={{ display: "none" }}>
          {Grid(columns, SAList)}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setModals(Modals ? false : true)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalGrid;
