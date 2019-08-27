import "./index.css";
import React, { useEffect, useState, useCallback, PropTypes } from "react";
import FormRow from "../../../../components/DataGrid/FormRow";
import Grid from "../../../../components/DataGrid/Grid";
import ModalGrid from "../../../../components/DataGrid/Modal";
import Grid_SAList from "./Grid_SAList";
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
  useSelector,
  useDispatch,
  connect
  // bindActionCreators
} from "react-redux";
import axios from "axios";
import {
  ADD_BASIC_SUCCESS,
  ADD_BASIC_REQUEST,
  ADD_BASIC_UPDATE,
  ADD_BASIC_Damdang_REQUEST,
  ADD_BASIC_Damdang_SUCCESS
} from "../../../../modules/Main/CompanyInfo/BasicInfo/BasicInfoReducer";

const Grid_SAListCol = [
  { key: "SANAME", name: "주민센터(참여기관)명", width: 180, editable: true },
  { key: "SABOSSNAME", name: "대표자", width: 80, editable: true },
  { key: "SASAUPNUM", name: "고유(사업자번호)", width: 80, editable: true },
  { key: "SATEL", name: "전화번호", width: 200, editable: true },
  { key: "SAJUSO", name: "주소", width: 80, editable: true },
  { key: "SAGUBUN", name: "구분", width: 80, editable: true },
  { key: "SAMEMO", name: "메모", width: 80, editable: true }
];

const BasicInfo = ({ props }) => {
  const { BaicInfo_Data, Loading } = useSelector(state => state.BasicInfo);
  const [Modals, setModals] = useState(false); // 모달 상태
  const [ReadOnly, setReadOnly] = useState(true); // 수정버튼 클릭 시 false
  const [FirstData, setFisrtData] = useState(true); // 수정버튼 클릭 시 false (수정할때 value 값 입력조건 주기위함)
  // const [Modals, setModals] = useState(false); // 모달 상태
  // const [Comp_Count, setCount] = useState(0); // 동적생성 폼 name + count 로 설정하기 위함
  const dispatch = useDispatch();
  const [MAList, setMAList] = useState("");
  const [SAList, setSAList] = useState(""); // 사업 리스트
  const [SAListDel, setSAListDel] = useState(""); // 행 제거된 리스트
  const [SaveSAList, setSaveSAList] = useState("");
  const [SaupRowNum, setSaupRowNum] = useState(0);
  // 모달 열기/닫기
  const handleClose = () => {
    setModals(false);
  };
  const getCellValue = value => {
    setSaupRowNum(value); // 셀 클릭 시 행 순번저장 (담당자 상세보기 전용)
  };
  const Saup_Save = SaveSAList => {
    console.log("저장할 SALIST", SaveSAList);
    setSaveSAList(SaveSAList);
  };

  const DeleteRow = List => {
    List.splice(SaupRowNum, 1);
    // SaveSAList[SaupRowNum].N = "D";
    console.log("Delete Row", List);
    setSAList(List);
    console.log("Delete SALIST", SAList);
  };

  const getData = () => {
    // if (BaicInfo_Data === null) {
    console.log("getData 실행됨");
    if (Loading) {
      console.log("Loading True 데이터를 가져옵니다");
      axios
        .post("http://localhost:5000/CompanyInfo/BasicInfo/BasicInfo")
        .then(res => {
          console.log(res);
          if (res.data === "NoData") {
            console.log("BasicInfo 데이터가 없습니다");
          } else {
            console.log("BasicInfo (dispatch) 불러옴", res.data);
            setSAList(res.data.BaicInfoSaup_Data); //-- 담당이랑 충돌?? 담당값이 안들어감..,임시 주석
            setMAList(res.data.BaicInfo_Data);

            dispatch({
              type: ADD_BASIC_SUCCESS,
              payload: res.data
            }); // 로딩 => False

            // props.history.replace({
            //   pathname: "/Main/CompanyInfo/BasicInfo"
            // });
          }
        })
        .catch(err => {
          console.log("getData 에러", err);
        });
      console.log("SAList[0].SACODE", SAList && SAList[0].SACODE);
    } else {
      // 로딩이 false 상태일 시
      console.log("Loading False 데이터 이미 존재합니다");
      if (SAList === "" && BaicInfo_Data) {
        setSAList(BaicInfo_Data.BaicInfoSaup_Data);
        setMAList(BaicInfo_Data.BaicInfo_Data);
      }
      // 다른 페이지로 넘어갔다 왔는데 , loading = false 상태라 SAList를 따로 할당함.
    }
  };

  useEffect(() => {
    console.log("useEffect 실행됨");
    // 여기서 dispatch > 리퀘스트 로 물어보고 dispatch > suc or fail(err) 분기
    // getDamdang();
    getData();
  }, [Loading]);

  const Save = () => {
    console.log("Save 버튼클릭됨 Loading True");

    var parm = {
      MADAMDANG: MAList[0].MADAMDANG,
      MATEL: MAList[0].MATEL,
      MAHP: MAList[0].MAHP,
      MAFAX: MAList[0].MAFAX,
      MANAME: MAList[0].MANAME,
      MABOSSNAME: MAList[0].MABOSSNAME,
      MASAUPNUM: MAList[0].MASAUPNUM,
      MAJUSO: MAList[0].MAJUSO,
      MAHOMEPAGE: MAList[0].MAHOMEPAGE,
      MAEMAIL: MAList[0].MAEMAIL,
      MAKOOKMINJISA: MAList[0].MAKOOKMINJISA,
      MAKOOKMINTEL: MAList[0].MAKOOKMINTEL,
      MAKOOKMINFAX: MAList[0].MAKOOKMINFAX,
      MAGUNGANGJISA: MAList[0].MAGUNGANGJISA,
      MAGUNGANGTEL: MAList[0].MAGUNGANGTEL,
      MAGUNGANGFAX: MAList[0].MAGUNGANGFAX,
      MAGOYONGJISA: MAList[0].MAGOYONGJISA,
      MAGOYONGTEL: MAList[0].MAGOYONGTEL,
      MAGOYONGFAX: MAList[0].MAGOYONGFAX,
      MABIGO: MAList[0].MABIGO,
      MAMEMO: MAList[0].MAMEMO,
      MACODE: MAList[0].MACODE,
      SALIST: SaveSAList
    };
    console.log("parm", parm);

    axios
      .post("http://localhost:5000/CompanyInfo/BasicInfo/BasicInfo_Save", parm)
      .then(res => {
        if (res.data === "OK") {
          alert("업데이트 성공!");
          console.log("업데이트 성공");
          console.log("res.data :", res.data);
          dispatch({
            type: ADD_BASIC_REQUEST
            // 로딩 > true
          });
        } else {
          alert("업데이트 실패!");
          console.log("업데이트 실패");
          console.log("res.data :", res.data);
        }
      })
      .catch(err => {
        console.error("?????????????", err);
      });
  };

  //css 속성
  return (
    <div className="MainDivContainer">
      {Loading ? (
        <div>로딩중입니다 Loading : True</div>
      ) : (
        <div>
          {console.log("실제 render")}
          <div>
            <label className="TableTitle">기관정보</label>
            <button
              // type="submit"
              className="btn btn-primary"
              style={{ float: "right" }}
              onClick={Save}
            >
              저장
            </button>
            <button
              type="button"
              className="btn btn-primary"
              style={{
                float: "right",
                background: ReadOnly ? "blue" : "red"
              }}
              onClick={() =>
                ReadOnly ? setReadOnly(false) : setReadOnly(true)
              }
            >
              수정
            </button>
            {/* Button, Modal, ModalHeader, ModalBody, ModalFooter */}

            {/* 버튼 반응이 없음 - reactstrap*/}
            <div className="ModalContainer">
              <ModalGrid
                SaupRowNum={SaupRowNum}
                Modals={Modals}
                handleClose={handleClose}
                SAList={SAList}
              />
            </div>
            <div>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td className="ColGubun">기관명</td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        type="text"
                        // onFocusout={e => (MAList[0].MANAME = e.target.value)}
                        onChange={e =>
                          MAList && (MAList[0].MANAME = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MANAME}
                        name="MANAME"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td className="ColGubun">대표자</td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={e =>
                          MAList && (MAList[0].MABOSSNAME = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MABOSSNAME}
                        name="MABOSSNAME"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td className="ColGubun">고유번호</td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={e =>
                          MAList && (MAList[0].MASAUPNUM = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MASAUPNUM}
                        name="MASAUPNUM"
                        readOnly={ReadOnly}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="ColGubun">기관주소</td>
                    <td colSpan="3" id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={e =>
                          MAList && (MAList[0].MAJUSO = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MAJUSO}
                        name="MAJUSO"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td className="ColGubun">홈페이지</td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={e =>
                          MAList && (MAList[0].MAHOMEPAGE = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MAHOMEPAGE}
                        name="MAHOMEPAGE"
                        readOnly={ReadOnly}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <label className="TableTitle">기관 담당자 정보</label>
            <div>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td className="ColGubun">총괄업무담당</td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={e =>
                          MAList && (MAList[0].MADAMDANG = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MADAMDANG}
                        name="MADAMDANG"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td className="ColGubun">이메일</td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={e =>
                          MAList && (MAList[0].MAEMAIL = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MAEMAIL}
                        name="MAEMAIL"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td className="ColGubun">전화번호</td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={e =>
                          MAList && (MAList[0].MATEL = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MATEL}
                        name="MATEL"
                        readOnly={ReadOnly}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="ColGubun">휴대폰 번호</td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={e =>
                          MAList && (MAList[0].MAHP = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MAHP}
                        name="MAHP"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td className="ColGubun">팩스 번호</td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={e =>
                          MAList && (MAList[0].MAFAX = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MAFAX}
                        name="MAFAX"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td className="ColGubun">비고</td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={e =>
                          MAList && (MAList[0].MABIGO = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MABIGO}
                        name="MABIGO"
                        readOnly={ReadOnly}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="ColGubun">메모</td>
                    <td colSpan="5" id="TdInput">
                      <textarea
                        style={{ width: "100%", border: "0" }}
                        onChange={e =>
                          MAList && (MAList[0].MAMEMO = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MAMEMO}
                        name="MAMEMO"
                        readOnly={ReadOnly}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <label className="TableTitle">4대보험 기관 등록</label>
            <button type="button" className="btn btn-primary">
              기관검색
            </button>
            <div>
              <table className="table table-bordered">
                <tbody>
                  <tr className="ColTitle">
                    <td colSpan="3">국민연금</td>
                    <td colSpan="3">건강보험</td>
                    <td colSpan="3">고용/산재</td>
                  </tr>
                  <tr>
                    <td className="ColGubun">지사</td>
                    <td className="ColGubun">전화</td>
                    <td className="ColGubun">팩스</td>
                    <td className="ColGubun">지사</td>
                    <td className="ColGubun">전화</td>
                    <td className="ColGubun">팩스</td>
                    <td className="ColGubun">지사</td>
                    <td className="ColGubun">전화</td>
                    <td className="ColGubun">팩스</td>
                  </tr>
                  <tr>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={e =>
                          MAList && (MAList[0].MAKOOKMINJISA = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MAKOOKMINJISA}
                        name="MAKOOKMINJISA"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={e =>
                          MAList && (MAList[0].MAKOOKMINTEL = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MAKOOKMINTEL}
                        name="MAKOOKMINTEL"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={e =>
                          MAList && (MAList[0].MAKOOKMINFAX = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MAKOOKMINFAX}
                        name="MAKOOKMINFAX"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={e =>
                          MAList && (MAList[0].MAGUNGANGJISA = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MAGUNGANGJISA}
                        name="MAGUNGANGJISA"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={e =>
                          MAList && (MAList[0].MAGUNGANGTEL = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MAGUNGANGTEL}
                        name="MAGUNGANGTEL"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={e =>
                          MAList && (MAList[0].MAGUNGANGFAX = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MAGUNGANGFAX}
                        name="MAGUNGANGFAX"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={e =>
                          MAList && (MAList[0].MAGOYONGJISA = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MAGOYONGJISA}
                        name="MAGOYONGJISA"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={e =>
                          MAList && (MAList[0].MAGOYONGTEL = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MAGOYONGTEL}
                        name="MAGOYONGTEL"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={e =>
                          MAList && (MAList[0].MAGOYONGFAX = e.target.value)
                        }
                        defaultValue={MAList && MAList[0].MAGOYONGFAX}
                        name="MAGOYONGFAX"
                        readOnly={ReadOnly}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <label className="TableTitle">지자체/사업추진부서 등록</label>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => [
                setModals(true),
                dispatch({
                  type: ADD_BASIC_Damdang_REQUEST
                })
              ]}
            >
              담당자 상세보기
            </button>
            <button
              type="button"
              className="btn btn-primary"
              style={{ float: "Right" }}
              onClick={() => DeleteRow(SAList)}
            >
              제거
            </button>
            <button
              type="button"
              className="btn btn-primary"
              style={{ float: "Right" }}
              onClick={() =>
                setSAList(
                  SAList.concat({
                    N: "N",
                    SANAME: "",
                    SABOSSNAME: "",
                    SACODE: "",
                    SASAUPNUM: "",
                    SADAMDANG: "",
                    SATEL: "",
                    SAEMAIL: "",
                    SAJUSO: "",
                    SAGUBUN: "",
                    SAMEMO: ""
                  }) //저장 시 Insert 하기위해 N: "N"
                )
              }
            >
              추가
            </button>
            <div>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <Grid_SAList
                      columns={Grid_SAListCol}
                      rows={SAList}
                      getCellValue={getCellValue}
                      Saup_Save={Saup_Save}
                    />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicInfo;
