import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Container,
  Form,
  ButtonToolbar,
  Table,
  InputGroup,
  FormControl
} from "react-bootstrap";
import { useSelector, useDispatch, connect } from "react-redux";
import { formatRelative } from "date-fns/esm";
import axios from "axios";
import Grid_ZiwonSerch from "./Grid_ZiwonSerch";

const Grid_findSaupCol = [
  { key: "SDNAME", name: "사업명", width: 300, editable: true },
  { key: "SDSTRDATE", name: "시작일", width: 180, editable: false },
  { key: "SDENDDATE", name: "종료일", width: 180, editable: false },
  { key: "SUINDAY", name: "진행구분", width: 80, editable: true },
  {
    key: "SHSUNAME",
    name: "사업대표 담당자명",
    width: 80,
    editable: true
  },
  { key: "SHMEMO", name: "메모", width: 80, editable: true }
];

const Modal_ZiwonSerch = props => {
  const { handleClose, Modals } = props;
  const [SAList, setSAList] = useState("");
  const [SaupSerchNum, setSSN] = useState(0);
  const [KeyWord, setkeyWord] = useState(""); // 사업명
  useEffect(() => {
    console.log("Modal_ZiwonSerch useEffect 실행됨");
  }, [SAList]);

  const Close = Closer => {
    props.handleClose(Closer);
  };

  const Save = e => {
    console.log("Save", e);
  };
  // 그리드 셀 클릭 내용 가져오기
  const getCellValue = value => {
    // setState
    setSSN(value[0]);
  };
  // 검색 키워드
  const ChangeKeyWord = KeyWord => {
    setkeyWord(KeyWord.target.value);
  };

  // 사업 검색
  const Saup_find = () => {
    console.log("getDamdang_find 실행됨");
    var parm = [
      { SULevel: "0", KeyWord: KeyWord, KeyYear: "전체", KeyGubun: "전체" }
    ];

    axios
      .post(
        "http://localhost:5000/CompanyInfo/ZiwonGwanRi/getZiwonGwanRi",
        parm
      )
      .then(res => {
        if (res.data === "NoData") {
          console.log("Damdang 쿼리 에러");
        } else {
          console.log("FindUser 가져오기 완료", res.data);

          setSAList(res.data.SAList);
          console.log("검색된 사업 리스트", SAList);
        }
      })
      .catch(err => {
        console.log("사업 검색 에러", err);
      });
  };

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
        <Modal.Title id="contained-modal-title-vcenter">메모</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-group-append">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Default
          </span>
          <button
            class="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Dropdown
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">
              Action
            </a>
            <a class="dropdown-item" href="#">
              Another action
            </a>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
            <div role="separator" class="dropdown-divider" />
            <a class="dropdown-item" href="#">
              Separated link
            </a>
          </div>
          <span className="input-group-text" id="inputGroup-sizing-default">
            Default
          </span>
          <button
            class="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Dropdown
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">
              Action
            </a>
            <a class="dropdown-item" href="#">
              Another action
            </a>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
            <div role="separator" class="dropdown-divider" />
            <a class="dropdown-item" href="#">
              Separated link
            </a>
          </div>

          <span className="input-group-text" id="inputGroup-sizing-default">
            Default
          </span>
          <input
            type="text"
            className="form-control"
            onChange={ChangeKeyWord}
          />
          <button className="btn btn-primary" onClick={() => Saup_find()}>
            검색123
          </button>
        </div>
        <div>
          <Grid_ZiwonSerch
            columns={Grid_findSaupCol}
            rows={SAList}
            getCellValue={getCellValue}
            Close={Close}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">저장</Button>

        <Button onClick={() => Close(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modal_ZiwonSerch;
