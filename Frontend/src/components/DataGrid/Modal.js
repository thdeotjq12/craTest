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
import {
  ADD_BASIC_Damdang_REQUEST,
  ADD_BASIC_Damdang_SUCCESS
} from "../../modules/Main/CompanyInfo/BasicInfo/BasicInfoReducer";
import {
  ADD_Saup_Damdang_REQUEST,
  ADD_Saup_Damdang_SUCCESS
} from "../../modules/Main/CompanyInfo/SaupGwanRi/SaupGwanRiReducer";
import {
  useSelector,
  useDispatch,
  connect
  // bindActionCreators
} from "react-redux";
import axios from "axios";
import FormRow from "./FormRow";
import Grid from "./Grid";

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

// var findUserList = [];
// 담당자 검색 버튼 함수

const ModalGrid = props => {
  const { SaupRowNum, Modals, handleClose, SAList } = props;
  const { BaicInfo_DamdangLoading } = useSelector(state => state.BasicInfo);
  const { Saup_DamdangLoading } = useSelector(state => state.SaupGwanRi);
  const [Damdang, setDamdang] = useState("");
  const [findUserList, setfindUserList] = useState("");
  const [cellValue, setcellValue] = useState("");
  const [formIdx, setformIdx] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Modal useEffect 실행됨");
    // 여기서 dispatch > 리퀘스트 로 물어보고 dispatch > suc or fail(err) 분기

    getDamdang();
  }, [findUserList, Damdang, BaicInfo_DamdangLoading, Saup_DamdangLoading]);

  // 그리드 셀 클릭 내용 가져오기
  const getCellValue = value => {
    // setState
    setcellValue(value);
  };
  // 담당자 클릭 인덱스 가져오기
  const getFormIdx = Leng => {
    // Damdang[Leng].N = "D";
    // setDamdang(Damdang.splice(0, Leng));
    setformIdx(Leng);
    console.log("formIdx", formIdx);
  };
  // 담당자 삭제
  const DeleteDamdang = () => {
    Damdang[formIdx].N = "D";
  };

  // 담당자 검색
  const getDamdang_find = () => {
    console.log("getDamdang_find 실행됨");

    axios
      .post(
        "http://localhost:5000/CompanyInfo/BasicInfo/BasicInfo_getDamdang_findUser",
        findUerKeyword === "" ? { findUer: "" } : { findUer: findUerKeyword }
      )
      .then(res => {
        if (res.data === "NoData") {
          console.log("Damdang 쿼리 에러");
        } else {
          console.log("FindUser 가져오기 완료", res.data);
          // findUserList = res.data.BaicInfo_findDamdang;
          setfindUserList(res.data.BaicInfo_findDamdang);
          console.log("findUserList", findUserList);
        }
      })
      .catch(err => {
        console.log("담장자 검색 에러", err);
      });
  };
  // 담당자 불러오기 (처음실행)
  const getDamdang = () => {
    console.log("getDamdang 실행됨");
    console.log("SaupRowNum", SaupRowNum);
    var parm = [SAList && [SAList[SaupRowNum].SACODE]];
    if (BaicInfo_DamdangLoading || Saup_DamdangLoading) {
      axios
        .post(
          "http://localhost:5000/CompanyInfo/BasicInfo/BasicInfo_getDamdang",
          parm
        )
        .then(res => {
          if (res.data === "NoData") {
            console.log("Damdang 데이터가 없습니다");
          } else {
            console.log("Damdang 가져오기 완료", res.data);

            console.log(
              "setDamdang(res.data.BaicInfo_Damdang)",
              res.data.BaicInfo_Damdang
            );
            // setDamdang(res.data.BaicInfo_Damdang);
            if (res.data) {
              dispatch({
                type: ADD_BASIC_Damdang_SUCCESS,
                payload: res.data
              }); // 로딩 => False
              dispatch({
                type: ADD_Saup_Damdang_SUCCESS,
                payload: res.data
              }); // 로딩 => False
              setDamdang(res.data.BaicInfo_Damdang);
            }

            console.log("Damdang  완료", Damdang);
          }
        })
        .catch(err => {
          console.log("담당조회 에러", err);
        });
    } else {
      console.log("담당자 불러올 수 없습니다. (로딩상태 = FALSE 입니다)");
    }
  };
  // 담당자 저장
  const getDamdang_save = () => {
    console.log("getDamdang_Save 실행됨");

    axios
      .post(
        "http://localhost:5000/CompanyInfo/BasicInfo/BasicInfo_getDamdang_Save",
        { Damdang: Damdang, SACODE: [SAList[SaupRowNum].SACODE] }
      )
      .then(res => {
        if (res.data === "NoData") {
          console.log("Damdang 저장 쿼리 에러");
        } else {
          console.log("담당자 정보 저장 완료", res.data);
          alert("담당자 정보 저장 완료");

          // findUserList = res.data.BaicInfo_findDamdang;
        }
      })
      .catch(err => {
        console.log("담장자 저장 에러", err);
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
        <Modal.Title id="contained-modal-title-vcenter">
          담당자 보기
          <Button variant="primary" onClick={DamdangAdd}>
            추가
          </Button>
          <Button
            variant="primary" // FormRow에서 셀클릭 시 인덱스 전달받아두기 => Damdang.length - 1 대체
            onClick={() => [DeleteDamdang()]} // 삭제, 삭제 위치
          >
            제거
          </Button>
          <Button variant="primary" onClick={getDamdang_save}>
            저장
          </Button>
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
              <th style={{ display: "none" }}>구분</th>
            </tr>
          </thead>
          <tbody>{<FormRow List={Damdang} getFormIdx={getFormIdx} />}</tbody>
        </Table>
        <div id="Grid" style={{ display: "none" }}>
          <InputGroup className="mb-3">
            <FormControl
              onChange={FindUserText}
              placeholder="아이디/이름/전화번호 4자리"
              aria-label="아이디/이름/전화번호 4자리"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="primary" onClick={getDamdang_find}>
                검색
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  cellValue && setDamdang(Damdang.concat(cellValue))
                }
              >
                추가
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <Grid
            columns={Grid_findUserCol}
            rows={findUserList}
            getCellValue={getCellValue}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => (Modals ? false : true)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalGrid;
