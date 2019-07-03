import "./index.css";
import React, { useEffect, useState, useCallback, PropTypes } from "react";
import FormRow from "../../../../components/Modal/FormRow";
import Grid from "../../../../components/DataGrid/Grid";
import ModalGrid from "./ModalGrid";
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
import "bootstrap/dist/css/bootstrap.min.css";

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
  ADD_BASIC_Damdang_SUCCESS
} from "../../../../modules/Main/CompanyInfo/BasicInfo/BasicInfoReducer";
const BasicInfo = ({ props }) => {
  const { BaicInfo_Data, BaicInfo_Damdang, Loading } = useSelector(
    state => state.BasicInfo
  );

  const [ReadOnly, setReadOnly] = useState(true); // 수정버튼 클릭 시 false
  const [FirstData, setFisrtData] = useState(true); // 수정버튼 클릭 시 false (수정할때 value 값 입력조건 주기위함)
  const [Modals, setModals] = useState(false); // 모달 상태
  // const [Comp_Count, setCount] = useState(0); // 동적생성 폼 name + count 로 설정하기 위함
  const dispatch = useDispatch();

  const [MACODE, setMACode] = useState(
    BaicInfo_Data && BaicInfo_Data.BaicInfo_Data[0].MACODE
  );
  const [MANAME, setMAName] = useState("");
  const [MABOSSNAME, setMABossName] = useState("");
  const [MASAUPNUM, setMASaupNum] = useState("");
  const [MAJUSO, setMAJuso] = useState("");
  const [MAHOMEPAGE, setMAHomepage] = useState("");
  const [MADAMDANG, setMADamdang] = useState("");
  const [MAEMAIL, setMAEMail] = useState("");
  const [MATEL, setMATel] = useState("");
  const [MAHP, setMAHP] = useState("");
  const [MAFAX, setMAFax] = useState("");
  const [MAKOOKMINJISA, setMAKookminJisa] = useState("");
  const [MAKOOKMINTEL, setMAKookminTel] = useState("");
  const [MAKOOKMINFAX, setMAKookminFax] = useState("");
  const [MAGUNGANGJISA, setMAGungangJisa] = useState("");
  const [MAGUNGANGTEL, setMAGungangTel] = useState("");
  const [MAGUNGANGFAX, setMAGungangFax] = useState("");
  const [MAGOYONGJISA, setMAGoyongJisa] = useState("");
  const [MAGOYONGTEL, setMAGoyongTel] = useState("");
  const [MAGOYONGFAX, setMAGoyongFax] = useState("");
  const [MABIGO, setMABigo] = useState("");
  const [MAMEMO, setMAMemo] = useState("");

  const [SACODE, setSACode] = useState("");
  const [SABOSSNAME, setSABossName] = useState("");
  const [SASAUPNUM, setSASaupNum] = useState("");
  const [SADAMDANG, setSADamdang] = useState("");
  const [SATEL, setSATel] = useState("");
  const [SAEMAIL, setSAEMail] = useState("");
  const [SAJUSO, setSAJuso] = useState("");
  const [SAGUBUN, setSAGubun] = useState("");
  const [SAMEMO, setSAMemo] = useState("");
  const [SAList, setSAList] = useState("");

  // const [Damdang, setDamdang] = useState("");

  // // 모달 열기/닫기
  // const handleClose = () => {
  //   setModals(false);
  // };
  // // 담당자 추가 버튼클릭 - 그리드 보이기
  // const DamdangAdd = () => {
  //   document.getElementById("Grid").style.display = "block";
  // };
  // // 담당자 검색 키워드 변수
  // var findUerKeyword = "";
  // // 담당자 검색값 할당 이벤트
  // const FindUserText = e => {
  //   findUerKeyword = e.target.value;
  // };
  // // const [findUserList, setfindUserList] = useState("");
  // var findUserList = [];
  // // 담당자 검색 버튼 함수
  // const getDamdang_find = () => {
  //   axios
  //     .post(
  //       "http://localhost:5000/CompanyInfo/BasicInfo/BasicInfo_getDamdang_findUser",
  //       findUerKeyword === "" ? { findUerKeyword: "" } : { findUerKeyword }
  //     )
  //     .then(res => {
  //       if (res.data === "NoData") {
  //         console.log("Damdang 데이터가 없습니다");
  //       } else {
  //         console.log("FindUser 가져오기 완료", res.data);
  //         findUserList = res.data.BaicInfo_findDamdang;
  //         // setfindUserList(res.data.BaicInfo_findDamdang);
  //         console.log("findUserList", findUserList);
  //       }
  //     })
  //     .catch(err => {
  //       console.log("담장자 검색 에러", err);
  //     });
  // };

  // const getDamdang = () => {
  //   console.log("getDamdang 실행됨");
  //   console.log("SAList[0].SACODE", SAList[SaupRowNum].SACODE);
  //   axios
  //     .post(
  //       "http://localhost:5000/CompanyInfo/BasicInfo/BasicInfo_getDamdang",
  //       SAList && [SAList[SaupRowNum].SACODE]
  //     )
  //     .then(res => {
  //       if (res.data === "NoData") {
  //         console.log("Damdang 데이터가 없습니다");
  //       } else {
  //         console.log("Damdang 가져오기 완료", res.data);
  //         // TestDamdang = res.data.BaicInfo_Damdang;
  //         console.log(
  //           "setDamdang(res.data.BaicInfo_Damdang)",
  //           res.data.BaicInfo_Damdang
  //         );
  //         setDamdang(res.data.BaicInfo_Damdang);
  //         if (res.data) {
  //           dispatch({
  //             type: ADD_BASIC_Damdang_SUCCESS,
  //             payload: res.data
  //           }); // 로딩 => False
  //           console.log(
  //             "#############",
  //             BasicInfo.BaicInfo_Damdang.BaicInfo_Damdang
  //           );
  //           setDamdang(res.data.BaicInfo_Damdang);
  //         }

  //         console.log("Damdang  완료", Damdang);
  //       }
  //     })
  //     .catch(err => {
  //       console.log("담당조회 에러", err);
  //     });
  // };

  // const MydModalWithGrid = () => {
  //   // console.log("TestDamdang : ", TestDamdang);

  //   console.log("Damdang : ", Damdang);

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
  //           <Button variant="primary">저장</Button>
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
  //           <tbody>{<FormRow List={Damdang} />}</tbody>
  //         </Table>
  //         <div id="Grid" style={{ display: "none" }}>
  //           <InputGroup className="mb-3">
  //             <FormControl
  //               onChange={FindUserText}
  //               placeholder="아이디/이름/전화번호 4자리"
  //               aria-label="아이디/이름/전화번호 4자리"
  //               aria-describedby="basic-addon2"
  //             />
  //             <InputGroup.Append>
  //               <Button variant="primary" onClick={getDamdang_find}>
  //                 검색
  //               </Button>
  //             </InputGroup.Append>
  //           </InputGroup>
  //           <Grid columns={Grid_findUserCol} rows={findUserList} />
  //         </div>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button onClick={() => setModals(Modals ? false : true)}>
  //           Close
  //         </Button>
  //       </Modal.Footer>
  //     </Modal>
  //   );
  // };

  // 처음한번실행,           그다음 [] 내용이 변하면 실행
  // useEffect 는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정 할 수 있는 Hook 입니다.
  // 클래스형 컴포넌트의 componentDidMount 와 componentDidUpdate 를 합친 형태로 보아도 무방
  // useEffect는 해당 컴포넌트의 연산이 끝난 이후 함수를 실행합니다.
  // 거칠게 표현하자면 화면에 그리는 작업이 끝난 이후에 useEffect 함수가 발동한다고 할 수 있습니다.
  // 비동기방식 - 중간에 다른 함수도 실행됨(render 등)
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
            setMACode(res.data.BaicInfo_Data[0].MACODE);

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
      console.log("SaupRowNum", SaupRowNum);
      SAList &&
        axios
          .post(
            "http://localhost:5000/CompanyInfo/BasicInfo/BasicInfo_getDamdang",
            [SAList[SaupRowNum].SACODE]
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
              if (res.data.BaicInfo_Damdang) {
                dispatch({
                  type: ADD_BASIC_Damdang_SUCCESS,
                  payload: res.data
                }); // 로딩 => False
              }

              console.log("Damdang  완료", Damdang);
            }
          })
          .catch(err => {
            console.log("담당조회 에러", err);
          });
    } else {
      // 로딩이 false 상태일 시
      console.log("Loading False 데이터 이미 존재합니다");
      if (SAList === "" && BaicInfo_Data) {
        setSAList(BaicInfo_Data.BaicInfoSaup_Data);
      }
      // 다른 페이지로 넘어갔다 왔는데 , loading = false 상태라 SAList를 따로 할당함.
    }
  };

  // const Grid_findUserCol = [
  //   { key: "SUID", name: "아이디", editable: true },
  //   // { key: "SUPW", name: "비밀번호", editable: false, hidden: true },
  //   { key: "SUNAME", name: "사용자명", editable: false },
  //   { key: "SULEVEL", name: "권한레벨", editable: false },
  //   { key: "SUINDAY", name: "발령일자", editable: true },
  //   { key: "SUOUTDAY", name: "전출일자", editable: true },
  //   { key: "SUBUSEO", name: "부서", editable: true },
  //   { key: "SUJIKCHECK", name: "직급", editable: true },
  //   { key: "SUTEL", name: "전화번호", editable: true },
  //   { key: "SUEMAIL", name: "이메일", editable: true }
  //   // { key: "SUSACODE", name: "소속참여기관코드", editable: true },
  //   // { key: "SANAME", name: "소속참여기관명", editable: true }
  // ];

  useEffect(() => {
    console.log("useEffect 실행됨");
    // 여기서 dispatch > 리퀘스트 로 물어보고 dispatch > suc or fail(err) 분기
    // getDamdang();
    getData();
  }, [Loading]);

  const Save = () => {
    console.log("Save 버튼클릭됨 Loading True");

    var parm = {
      MADAMDANG: BaicInfo_Data.BaicInfo_Data[0].MADAMDANG,
      MATEL: MATEL,
      MAHP: MAHP,
      MAFAX: MAFAX,
      MANAME: MANAME,
      MABOSSNAME: MABOSSNAME,
      MASAUPNUM: MASAUPNUM,
      MAJUSO: MAJUSO,
      MAHOMEPAGE: MAHOMEPAGE,
      MAEMAIL: MAEMAIL,
      MAKOOKMINJISA: MAKOOKMINJISA,
      MAKOOKMINTEL: MAKOOKMINTEL,
      MAKOOKMINFAX: MAKOOKMINFAX,
      MAGUNGANGJISA: MAGUNGANGJISA,
      MAGUNGANGTEL: MAGUNGANGTEL,
      MAGUNGANGFAX: MAGUNGANGFAX,
      MAGOYONGJISA: MAGOYONGJISA,
      MAGOYONGTEL: MAGOYONGTEL,
      MAGOYONGFAX: MAGOYONGFAX,
      MABIGO: MABIGO,
      MAMEMO: MAMEMO,
      MACODE: MACODE,
      SALIST: SAList
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

  // const onSubmitForm = useCallback(e => {
  //   console.log("onsubmit 실행됨  aicInfo_Data : ", BaicInfo_Data);
  //   console.log("e.target.value ", e.target.value);
  //   // BaicInfo_Data !== null && e.preventDefault(); // 현재 이벤트의 기본 동작을 중단,          새로운 페이지로 넘어가는것 방지
  //   BaicInfo_Data !== null && e.preventDefault();
  //   // type="submit" 을 해주면 그 컴포넌트 이벤트 발생 시 onSubmitForm 실행
  //   // 하나도 안해주면 전부 실행 ?
  //   e.target.value !== null &&
  //     dispatch({
  //       type: ADD_BASIC_SUCCESS,
  //       payload: e.target.value
  //     });
  // });

  // 텍스트 변경 > 상태저장 하기 위함
  const onChangeText = useCallback(e => {
    setFisrtData(false);
    if (e.target.name === "MANAME") {
      setMAName(e.target.value);
    } else if (e.target.name === "MABOSSNAME") {
      setMABossName(e.target.value);
    } else if (e.target.name === "MASAUPNUM") {
      setMASaupNum(e.target.value);
    } else if (e.target.name === "MAJUSO") {
      setMAJuso(e.target.value);
    } else if (e.target.name === "MAHOMEPAGE") {
      setMAHomepage(e.target.value);
    } else if (e.target.name === "MADAMDANG") {
      setMADamdang(e.target.value);
    } else if (e.target.name === "MAEMAIL") {
      setMAEMail(e.target.value);
    } else if (e.target.name === "MATEL") {
      setMATel(e.target.value);
    } else if (e.target.name === "MAHP") {
      setMAHP(e.target.value);
    } else if (e.target.name === "MAFAX") {
      setMAFax(e.target.value);
    } else if (e.target.name === "MAKOOKMINJISA") {
      setMAKookminJisa(e.target.value);
    } else if (e.target.name === "MAKOOKMINTEL") {
      setMAKookminTel(e.target.value);
    } else if (e.target.name === "MAKOOKMINFAX") {
      setMAKookminFax(e.target.value);
    } else if (e.target.name === "MAGUNGANGJISA") {
      setMAGungangJisa(e.target.value);
    } else if (e.target.name === "MAGUNGANGTEL") {
      setMAGungangTel(e.target.value);
    } else if (e.target.name === "MAGUNGANGFAX") {
      setMAGungangFax(e.target.value);
    } else if (e.target.name === "MAGOYONGJISA") {
      setMAGoyongJisa(e.target.value);
    } else if (e.target.name === "MAGOYONGTEL") {
      setMAGoyongTel(e.target.value);
    } else if (e.target.name === "MAGOYONGFAX") {
      setMAGoyongFax(e.target.value);
    } else if (e.target.name === "MABIGO") {
      setMABigo(e.target.value);
    } else if (e.target.name === "MAMEMO") {
      setMAMemo(e.target.value);
    } else {
    }
  });

  const [AddArray, setAddArray] = useState([
    {
      SANAME: "",
      SABOSSNAME: "",
      SASAUPNUM: "",
      SATEL: "",
      SAJUSO: "",
      SAGUBUN: "",
      SAMEMO: ""
    }
  ]);
  const ReArray = [];
  const onChangeValue = (e, idx) => {
    console.log("onChangeValue", e.target.name);
    console.log("SAList", SAList);
    const TName = e.target.name;

    if (SAList.length === 0) {
      //splice(인덱스, 인덱스부터 삭제(1)추가(0)할 원소개수, 추가할 원소..)

      // 1. 원본에서 가져오고
      // ReArray.concat(AddArray);
      // 2. 복사본에 입력 받고
      ReArray.splice(idx, 0, {
        SANAME: idx === 0 ? e.target.value : "",
        SABOSSNAME: idx === 1 ? e.target.value : "",
        SASAUPNUM: idx === 2 ? e.target.value : "",
        SATEL: idx === 3 ? e.target.value : "",
        SAJUSO: idx === 4 ? e.target.value : "",
        SAGUBUN: idx === 5 ? e.target.value : "",
        SAMEMO: idx === 6 ? e.target.value : ""
      });

      // 3. 복사본 > 원본으로 복사

      setAddArray(
        AddArray.splice(idx, 0, {
          SANAME: idx === 0 ? e.target.value : "",
          SABOSSNAME: idx === 1 ? e.target.value : "",
          SASAUPNUM: idx === 2 ? e.target.value : "",
          SATEL: idx === 3 ? e.target.value : "",
          SAJUSO: idx === 4 ? e.target.value : "",
          SAGUBUN: idx === 5 ? e.target.value : "",
          SAMEMO: idx === 6 ? e.target.value : ""
        })
      );
      // temp = ReArray.map((value, index) => {
      //   if (idx === index) {
      //     return { ...value, [TName]: e.target.value };
      //   } else {
      //     return { ...value };
      //   }
      // });
      // setAddArray(temp);
    }

    console.log("ReArray", ReArray);
    console.log("AddArray", AddArray);

    var temp = SAList.map((value, index) => {
      console.log("Value", value);
      if (idx === index) {
        return { ...value, [TName]: e.target.value };
      } else {
        return { ...value };
      }
    });
    setSAList(temp);
  };

  const [Test, setTest] = useState(0);
  // 지자체 / 사업추진부서 등록 폼

  const AddRow = () => {
    console.log("AddRow 실행됨");
    return (
      <tr>
        <td id="TdInput">
          <input
            className="InputContainer"
            name={"SANAME"}
            readOnly={ReadOnly}
            onChange={e => onChangeValue(e, 0)}
          />
        </td>
        <td id="TdInput">
          <input
            className="InputContainer"
            name={"SABOSSNAME"}
            readOnly={ReadOnly}
            onChange={e => onChangeValue(e, 1)}
          />
        </td>
        <td id="TdInput">
          <input
            className="InputContainer"
            name={"SASAUPNUM"}
            readOnly={ReadOnly}
            onChange={e => onChangeValue(e, 2)}
          />
        </td>
        <td id="TdInput">
          <input
            className="InputContainer"
            name={"SATEL"}
            readOnly={ReadOnly}
            onChange={e => onChangeValue(e, 3)}
          />
        </td>
        <td id="TdInput">
          <input
            className="InputContainer"
            name={"SAJUSO"}
            readOnly={ReadOnly}
            onChange={e => onChangeValue(e, 4)}
          />
        </td>
        <td id="TdInput">
          <input
            className="InputContainer"
            name={"SAGUBUN"}
            readOnly={ReadOnly}
            onChange={e => onChangeValue(e, 5)}
          />
        </td>
        <td id="TdInput">
          <input
            className="InputContainer"
            name={"SAMEMO"}
            readOnly={ReadOnly}
            onChange={e => onChangeValue(e, 6)}
          />
        </td>
      </tr>
    );
  };
  const [SaupRowNum, setSaupRowNum] = useState(0);
  const List = () => {
    // console.log("array", array);
    // console.log("SAList2", SAList);
    // console.log("MACODE", MACODE);
    // console.log("Test", Test);
    if (SAList.length === 0) {
      console.log("SAList.length === 0");
    }
    return SAList.length !== 0
      ? SAList.map((value, index) => {
          console.log("SaupRowNum :::::  ", SaupRowNum);
          return (
            <tr>
              <td id="TdInput">
                <input
                  className="InputContainer"
                  key={0 + index}
                  onChange={e => onChangeValue(e, index)}
                  value={
                    FirstData
                      ? BaicInfo_Data && value.SANAME
                      : SAList.SANAME
                      ? SAList.SANAME
                      : value.SANAME
                  }
                  name={"SANAME"}
                  readOnly={ReadOnly}
                  onClick={() => [getDamdang(), setSaupRowNum(index)]}
                />
              </td>
              <td id="TdInput">
                <input
                  className="InputContainer"
                  key={1 + index}
                  onChange={e => onChangeValue(e, index)}
                  value={
                    FirstData
                      ? BaicInfo_Data && value.SABOSSNAME
                      : SABOSSNAME
                      ? SABOSSNAME
                      : value.SABOSSNAME
                  }
                  name={"SABOSSNAME"}
                  readOnly={ReadOnly}
                  onClick={() => setSaupRowNum(index + 1)}
                />
              </td>
              <td id="TdInput">
                <input
                  className="InputContainer"
                  key={2 + index}
                  onChange={e => onChangeValue(e, index)}
                  value={
                    FirstData
                      ? BaicInfo_Data && value.SASAUPNUM
                      : SASAUPNUM
                      ? SASAUPNUM
                      : value.SASAUPNUM
                  }
                  name={"SASAUPNUM"}
                  readOnly={ReadOnly}
                  onClick={() => setSaupRowNum(index + 1)}
                />
              </td>
              <td id="TdInput">
                <input
                  className="InputContainer"
                  key={3 + index}
                  onChange={e => onChangeValue(e, index)}
                  value={
                    FirstData
                      ? BaicInfo_Data && value.SATEL
                      : SATEL
                      ? SATEL
                      : value.SATEL
                  }
                  name={"SATEL"}
                  readOnly={ReadOnly}
                  onClick={() => setSaupRowNum(index + 1)}
                />
              </td>
              <td id="TdInput">
                <input
                  className="InputContainer"
                  key={4 + index}
                  onChange={e => onChangeValue(e, index)}
                  value={
                    FirstData
                      ? BaicInfo_Data && value.SAJUSO
                      : SAJUSO
                      ? SAJUSO
                      : value.SAJUSO
                  }
                  name={"SAJUSO"}
                  readOnly={ReadOnly}
                  onClick={() => setSaupRowNum(index + 1)}
                />
              </td>
              <td id="TdInput">
                <input
                  className="InputContainer"
                  key={5 + index}
                  onChange={e => onChangeValue(e, index)}
                  value={
                    FirstData
                      ? BaicInfo_Data && value.SAGUBUN
                      : SAGUBUN
                      ? SAGUBUN
                      : value.SAGUBUN
                  }
                  name={"SAGUBUN"}
                  readOnly={ReadOnly}
                  onClick={() => setSaupRowNum(index + 1)}
                />
              </td>
              <td id="TdInput">
                <input
                  className="InputContainer"
                  key={6 + index}
                  onChange={e => onChangeValue(e, index)}
                  value={
                    FirstData
                      ? BaicInfo_Data && value.SAMEMO
                      : SAMEMO
                      ? SAMEMO
                      : value.SAMEMO
                  }
                  name={"SAMEMO"}
                  readOnly={ReadOnly}
                  onClick={() => setSaupRowNum(index + 1)}
                />
              </td>
            </tr>
          );
        })
      : AddRow();
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
            <div>
              <ButtonToolbar>
                <Button variant="primary" onClick={() => [setModals(true)]}>
                  Launch modal with grid
                </Button>

                <ModalGrid />
              </ButtonToolbar>
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
                        onChange={onChangeText}
                        value={
                          // 수정 or 기본값 넣기(비었을 경우 = 기본값)
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MANAME
                            : MANAME
                            ? MANAME
                            : BaicInfo_Data.BaicInfo_Data[0].MANAME
                        }
                        name="MANAME"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td className="ColGubun">대표자</td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={onChangeText}
                        value={
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MABOSSNAME
                            : MABOSSNAME
                            ? MABOSSNAME
                            : BaicInfo_Data.BaicInfo_Data[0].MABOSSNAME
                        }
                        name="MABOSSNAME"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td className="ColGubun">고유번호</td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={onChangeText}
                        value={
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MASAUPNUM
                            : MASAUPNUM
                            ? MASAUPNUM
                            : BaicInfo_Data.BaicInfo_Data[0].MASAUPNUM
                        }
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
                        onChange={onChangeText}
                        value={
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MAJUSO
                            : MAJUSO
                            ? MAJUSO
                            : BaicInfo_Data.BaicInfo_Data[0].MAJUSO
                        }
                        name="MAJUSO"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td className="ColGubun">홈페이지</td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={onChangeText}
                        value={
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MAHOMEPAGE
                            : MAHOMEPAGE
                            ? MAHOMEPAGE
                            : BaicInfo_Data.BaicInfo_Data[0].MAHOMEPAGE
                        }
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
                        onChange={onChangeText}
                        value={
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MADAMDANG
                            : MADAMDANG
                            ? MADAMDANG
                            : BaicInfo_Data.BaicInfo_Data[0].MADAMDANG
                        }
                        name="MADAMDANG"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td className="ColGubun">이메일</td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={onChangeText}
                        value={
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MAEMAIL
                            : MAEMAIL
                            ? MAEMAIL
                            : BaicInfo_Data.BaicInfo_Data[0].MAEMAIL
                        }
                        name="MAEMAIL"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td className="ColGubun">전화번호</td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={onChangeText}
                        value={
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MATEL
                            : MATEL
                            ? MATEL
                            : BaicInfo_Data.BaicInfo_Data[0].MATEL
                        }
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
                        onChange={onChangeText}
                        value={
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MAHP
                            : MAHP
                            ? MAHP
                            : BaicInfo_Data.BaicInfo_Data[0].MAHP
                        }
                        name="MAHP"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td className="ColGubun">팩스 번호</td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={onChangeText}
                        value={
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MAFAX
                            : MAFAX
                            ? MAFAX
                            : BaicInfo_Data.BaicInfo_Data[0].MAFAX
                        }
                        name="MAFAX"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td className="ColGubun">비고</td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={onChangeText}
                        value={
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MABIGO
                            : MABIGO
                            ? MABIGO
                            : BaicInfo_Data.BaicInfo_Data[0].MABIGO
                        }
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
                        onChange={onChangeText}
                        value={
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MAMEMO
                            : MAMEMO
                            ? MAMEMO
                            : BaicInfo_Data.BaicInfo_Data[0].MAMEMO
                        }
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
                        onChange={onChangeText}
                        value={
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MAKOOKMINJISA
                            : MAKOOKMINJISA
                            ? MAKOOKMINJISA
                            : BaicInfo_Data.BaicInfo_Data[0].MAKOOKMINJISA
                        }
                        name="MAKOOKMINJISA"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={onChangeText}
                        value={
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MAKOOKMINTEL
                            : MAKOOKMINTEL
                            ? MAKOOKMINTEL
                            : BaicInfo_Data.BaicInfo_Data[0].MAKOOKMINTEL
                        }
                        name="MAKOOKMINTEL"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={onChangeText}
                        value={
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MAKOOKMINFAX
                            : MAKOOKMINFAX
                            ? MAKOOKMINFAX
                            : BaicInfo_Data.BaicInfo_Data[0].MAKOOKMINFAX
                        }
                        name="MAKOOKMINFAX"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={onChangeText}
                        value={
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MAGUNGANGJISA
                            : MAGUNGANGJISA
                            ? MAGUNGANGJISA
                            : BaicInfo_Data.BaicInfo_Data[0].MAGUNGANGJISA
                        }
                        name="MAGUNGANGJISA"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={onChangeText}
                        value={
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MAGUNGANGTEL
                            : MAGUNGANGTEL
                            ? MAGUNGANGTEL
                            : BaicInfo_Data.BaicInfo_Data[0].MAGUNGANGTEL
                        }
                        name="MAGUNGANGTEL"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={onChangeText}
                        value={
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MAGUNGANGFAX
                            : MAGUNGANGFAX
                            ? MAGUNGANGFAX
                            : BaicInfo_Data.BaicInfo_Data[0].MAGUNGANGFAX
                        }
                        name="MAGUNGANGFAX"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={onChangeText}
                        value={
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MAGOYONGJISA
                            : MAGOYONGJISA
                            ? MAGOYONGJISA
                            : BaicInfo_Data.BaicInfo_Data[0].MAGOYONGJISA
                        }
                        name="MAGOYONGJISA"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={onChangeText}
                        value={
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MAGOYONGTEL
                            : MAGOYONGTEL
                            ? MAGOYONGTEL
                            : BaicInfo_Data.BaicInfo_Data[0].MAGOYONGTEL
                        }
                        name="MAGOYONGTEL"
                        readOnly={ReadOnly}
                      />
                    </td>
                    <td id="TdInput">
                      <input
                        className="InputContainer"
                        onChange={onChangeText}
                        value={
                          FirstData
                            ? BaicInfo_Data &&
                              BaicInfo_Data.BaicInfo_Data[0].MAGOYONGFAX
                            : MAGOYONGFAX
                            ? MAGOYONGFAX
                            : BaicInfo_Data.BaicInfo_Data[0].MAGOYONGFAX
                        }
                        name="MAGOYONGFAX"
                        readOnly={ReadOnly}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <label className="TableTitle">지자체/사업추진부서 등록</label>
            <button type="button" className="btn btn-primary">
              담당자 상세보기
            </button>
            <button
              type="button"
              className="btn btn-primary"
              style={{ float: "Right" }}
            >
              제거
            </button>
            <button
              type="button"
              className="btn btn-primary"
              style={{ float: "Right" }}
              onClick={AddRow}
            >
              추가
            </button>
            <div>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td className="ColGubun">주민센터(참여기관)명</td>
                    <td className="ColGubun">대표자</td>
                    <td className="ColGubun">고유(사업자번호)</td>
                    <td className="ColGubun">전화번호</td>
                    <td className="ColGubun">주소</td>
                    <td className="ColGubun">구분</td>
                    <td className="ColGubun">메모</td>
                  </tr>
                  {List()}
                  {/* <td >
                    <input className="InputContainer"
                    className ="InputContainer"
                      
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfoSaup_Data[0].SANAME
                      }
                    />
                  </td>
                  <td >
                    <input className="InputContainer"
                    className ="InputContainer"
                      
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfoSaup_Data[0].SABOSSNAME
                      }
                    />
                  </td>
                  <td >
                    <input className="InputContainer"
                    className ="InputContainer"
                      
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfoSaup_Data[0].SASAUPNUM
                      }
                    />
                  </td>
                  <td >
                    <input className="InputContainer"
                    className ="InputContainer"
                      
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfoSaup_Data[0].SATEL
                      }
                    />
                  </td>
                  <td >
                    <input className="InputContainer"
                    className ="InputContainer"
                      
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfoSaup_Data[0].SAJUSO
                      }
                    />
                  </td>
                  <td >
                    <input className="InputContainer"
                    className ="InputContainer"
                      
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfoSaup_Data[0].SAGUBUN
                      }
                    />
                  </td>
                  <td >
                    <input className="InputContainer"
                    className ="InputContainer"
                      
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfoSaup_Data[0].SAMEMO
                      }
                    />
                  </td> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
// store 업데이트 마다 호출
// const mapStateToProps = state => {
//   console.log("----------State",          state.BasicInfo.BaicInfo_Data.BaicInfo_Data[0]);
//   return {
//     Data: state.BasicInfo.BaicInfo_Data.BaicInfo_Data[0]
//   };
// };

// const mapDispatchToProps = dispatch => {
//   // return bindActionCreators(ADD_BASIC_SUCCESS,           dispatch);
//   return {
//     handleData: () => {
//       dispatch(ADD_BASIC_SUCCESS);
//     }
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(BasicInfo);
export default BasicInfo;
