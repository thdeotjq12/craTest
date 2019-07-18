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
import "./index.css";
import Grid_NomalSudang from "./Grids_Modal_GeunLo/Grid_NomalSudang";
import Grid_TimeSudang from "./Grids_Modal_GeunLo/Grid_TimeSudang";
import Grid_DaySudang from "./Grids_Modal_GeunLo/Grid_DaySudang";
import Grid_BeGwaSudang from "./Grids_Modal_GeunLo/Grid_BeGwaSudang";
import { formatRelative } from "date-fns/esm";

const Grid_NomalSudangCol = [
  { key: "DDD", name: "수당명", width: 150, editable: true },
  { key: "DDD2", name: "수당금액", width: 150, editable: true }
];
const Grid_TimeSudangCol = [
  { key: "DDD", name: "수당명", width: 150, editable: true },
  { key: "DDD2", name: "수당금액", width: 150, editable: true }
];
const Grid_DaySudangCol = [
  { key: "DDD", name: "수당명", width: 150, editable: true },
  { key: "DDD2", name: "수당금액", width: 150, editable: true }
];
const Grid_BeGwaSudangCol = [
  { key: "DDD", name: "수당명", width: 150, editable: true },
  { key: "DDD2", name: "수당금액", width: 150, editable: true }
];

const Modal_GeunLo = props => {
  const { handleClose, Modals } = props;

  const getCellValue = value => {};
  const Close = handleCloser => {
    props.handleClose(handleCloser);
  };
  // 스크롤 포지션 0으로 맞추기 위함 .. 나중에 구현
  const scrollBack = () => {
    window.scrollTo(0, 0);
  };
  // useEffect({
  //   // scrollBack
  // });
  const Save = e => {
    console.log("Save", e);
  };
  return (
    <Modal
      show={Modals}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="ModalContainer"
      // centered
      // modal-dialog
      // modal-lg
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          사업별 근로 운영
          <div
            style={{
              float: "right"
            }}
          >
            <button
              type="button"
              class="btn btn-primary"
              style={{
                float: "right"
              }}
            >
              저장
            </button>
            <button
              type="button"
              class="btn btn-primary"
              style={{
                float: "right"
              }}
            >
              수정
            </button>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="MainDivContainer">
          <div>
            <label className="TableTitle">근로운영 설정</label>
            <input style={{ float: "right" }} />
            <input style={{ width: "20px", float: "right" }} value="~" />
            <input style={{ float: "right" }} />
            <span
              id="basic-addon1"
              className="ColGubun"
              style={{ float: "right" }}
            >
              야간적용
            </span>
          </div>

          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className="ColGubunFront" rowSpan="5">
                  주간
                </td>
                <td className="ColGubunFront">근무일</td>

                <td id="TdInput" colSpan="4">
                  <label class="form-check-label">
                    <input type="checkbox" name="optradio" />일
                  </label>
                  <label class="form-check-label">
                    <input type="checkbox" name="optradio" />월
                  </label>
                  <label class="form-check-label">
                    <input type="checkbox" name="optradio" />화
                  </label>
                  <label class="form-check-label">
                    <input type="checkbox" name="optradio" />수
                  </label>
                  <label class="form-check-label">
                    <input type="checkbox" name="optradio" />목
                  </label>
                  <label class="form-check-label">
                    <input type="checkbox" name="optradio" />금
                  </label>
                  <label class="form-check-label">
                    <input type="checkbox" name="optradio" />토
                  </label>
                </td>

                <td id="TdInput" colSpan="2">
                  <input className="InputContainer" />
                </td>
                <td id="TdInput" colSpan="2">
                  <label class="form-check-label">
                    <input type="checkbox" name="optradio" />
                    주차적용
                  </label>
                </td>
                <td className="ColGubun">주휴일</td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
              </tr>

              <tr>
                <td className="ColGubun">근로시간</td>
                <td className="" style={{ background: "lightblue" }}>
                  시업
                </td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td className="" style={{ background: "lightblue" }}>
                  종업
                </td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td className="ColGubun">근무시간</td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td className="ColGubun">휴게시간</td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td className="ColGubun">(적용)근로시간</td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
              </tr>
              <tr>
                <td className="ColGubun">휴게시간</td>
                <td className="" style={{ background: "lightblue" }}>
                  시업
                </td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td className="" style={{ background: "lightblue" }}>
                  종업
                </td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td id="TdInput" colSpan="2">
                  <label class="form-check-label">
                    <input type="radio" name="optradio" />
                    제외
                  </label>
                  <label class="form-check-label">
                    <input type="radio" name="optradio" />
                    포함
                  </label>
                </td>
                <td className="ColGubun">휴게메모</td>
                <td id="TdInput" colSpan="3">
                  <input className="InputContainer" />
                </td>
              </tr>
              <tr>
                <td className="ColGubun">휴게시간</td>
                <td className="" style={{ background: "lightblue" }}>
                  시업
                </td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td className="" style={{ background: "lightblue" }}>
                  종업
                </td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td id="TdInput" colSpan="2">
                  <label class="form-check-label">
                    <input type="radio" name="optradio" />
                    제외
                  </label>
                  <label class="form-check-label">
                    <input type="radio" name="optradio" />
                    포함
                  </label>
                </td>
                <td className="ColGubun">휴게메모</td>
                <td id="TdInput" colSpan="3">
                  <input className="InputContainer" />
                </td>
              </tr>
              <tr>
                <td className="ColGubun">휴게시간</td>
                <td className="" style={{ background: "lightblue" }}>
                  시업
                </td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td className="" style={{ background: "lightblue" }}>
                  종업
                </td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td id="TdInput" colSpan="2">
                  <label class="form-check-label">
                    <input type="radio" name="optradio" />
                    제외
                  </label>
                  <label class="form-check-label">
                    <input type="radio" name="optradio" />
                    포함
                  </label>
                </td>
                <td className="ColGubun">휴게메모</td>
                <td id="TdInput" colSpan="3">
                  <input className="InputContainer" />
                </td>
              </tr>

              <tr>
                <td className="ColGubunFront" colSpan="3">
                  연장근로 계산방법
                </td>
                <td id="TdInput" colSpan="9">
                  <label class="form-check-label">
                    <input type="checkbox" name="optradio" />
                    일일소정근로시간 기준으로 연장근무 계산
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <label className="TableTitle">월정근로시간</label>
          </div>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className="ColGubun">기본</td>
                <td className="ColGubun">주차</td>
                <td className="ColGubun">연장</td>
                <td className="ColGubun">야간</td>
                <td className="ColGubun">연장야간</td>
                <td className="ColGubun">추가연장</td>
                <td className="ColGubun">직접 입력</td>
              </tr>
              <tr>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td id="TdInput">
                  <label class="form-check-label">
                    <input type="radio" name="optradio" />예
                  </label>
                  <label class="form-check-label">
                    <input type="radio" name="optradio" />
                    아니오
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <label className="TableTitle">가산율 설정</label>
          </div>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className="ColGubunFront">기본값 적용</td>
                <td className="ColGubunFront" colSpan="3">
                  평일
                </td>
                <td className="ColGubunFront" colSpan="5">
                  휴일
                </td>
                <td className="ColGubunFront">특근</td>
              </tr>
              <tr>
                <td rowSpan="2">가산율 적용</td>
                <td className="ColGubun">연장</td>
                <td className="ColGubun">야간</td>
                <td className="ColGubun">연장야간</td>
                <td className="ColGubun">기본</td>
                <td className="ColGubun">연장</td>
                <td className="ColGubun">야간</td>
                <td className="ColGubun">연장야간</td>
                <td id="TdInput" rowSpan="2">
                  <label class="form-check-label">
                    <input type="checkbox" name="optradio" />
                    기본연장
                  </label>
                </td>
                <td id="TdInput" rowSpan="2">
                  <input className="InputContainer" />
                </td>
              </tr>
              <tr>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <label className="TableTitle">급여/수당 설정</label>
          </div>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className="ColGubun">* 시급</td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td className="ColGubun">* 일급</td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td className="ColGubun">* 기본급</td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td className="ColGubun">주차수당</td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
              </tr>
              <tr>
                <td className="ColGubun">연장수당</td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td className="ColGubun">야간수당</td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td className="ColGubun">연장야간</td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td className="ColGubun">기타수당합계</td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
              </tr>
              <tr>
                <td className="ColGubun">지급합계</td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td className="ColGubun">4대보험(근로자)</td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td className="ColGubun">소득세</td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
                <td className="ColGubun">실수령급여</td>
                <td id="TdInput">
                  <input className="InputContainer" />
                </td>
              </tr>
            </tbody>
          </table>

          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>
                  <Grid_NomalSudang
                    columns={Grid_NomalSudangCol}
                    rows={["123", "123"]}
                    getCellValue={getCellValue}
                  />
                </td>
                <td>
                  <Grid_TimeSudang
                    columns={Grid_TimeSudangCol}
                    rows={["123", "123"]}
                    getCellValue={getCellValue}
                  />
                </td>
                <td>
                  <Grid_DaySudang
                    columns={Grid_DaySudangCol}
                    rows={["123", "123"]}
                    getCellValue={getCellValue}
                  />
                </td>
                <td>
                  <Grid_BeGwaSudang
                    columns={Grid_BeGwaSudangCol}
                    rows={["123", "123"]}
                    getCellValue={getCellValue}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">저장</Button>

        <Button onClick={() => Close(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modal_GeunLo;
