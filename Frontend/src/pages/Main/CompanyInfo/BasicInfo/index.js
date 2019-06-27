import "./index.css";
import React, { useEffect, useState, useCallback, PropTypes } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
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
  ADD_BASIC_UPDATE
} from "../../../../modules/Main/CompanyInfo/BasicInfo/BasicInfoReducer";
const BasicInfo = ({ props }) => {
  const { BaicInfo_Data, Loading } = useSelector(state => state.BasicInfo);

  const [ReadOnly, setReadOnly] = useState(true); // 수정버튼 클릭 시 false
  const [FirstData, setFisrtData] = useState(true); // 수정버튼 클릭 시 false (수정할때 value 값 입력조건 주기위함)
  const [Modal, setModal] = useState(false); // 모달 상태
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
  var array = BaicInfo_Data && BaicInfo_Data.BaicInfoSaup_Data;

  const ModalOpen = () => {
    <div>
      <Button color="info" onClick={setModal(Modal ? false : true)}>
        모달 열기
      </Button>
      <Modal toggle={setModal(Modal ? false : true)}>
        <ModalHeader toggle={setModal(Modal ? false : true)}>
          Modal title
        </ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={setModal(Modal ? false : true)}>
            확인
          </Button>{" "}
          <Button color="secondary" onClick={setModal(Modal ? false : true)}>
            취소
          </Button>
        </ModalFooter>
      </Modal>
    </div>;
  };

  // 처음한번실행,           그다음 [] 내용이 변하면 실행
  // useEffect 는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정 할 수 있는 Hook 입니다.
  // 클래스형 컴포넌트의 componentDidMount 와 componentDidUpdate 를 합친 형태로 보아도 무방
  // useEffect는 해당 컴포넌트의 연산이 끝난 이후 함수를 실행합니다.
  // 거칠게 표현하자면 화면에 그리는 작업이 끝난 이후에 useEffect 함수가 발동한다고 할 수 있습니다.
  // 비동기방식 - 중간에 다른 함수도 실행됨(render 등)
  const getData = () => {
    // if (BaicInfo_Data === null) {

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
            setSAList(res.data.BaicInfoSaup_Data);
            setMACode(res.data.BaicInfo_Data[0].MACODE);

            dispatch({
              type: ADD_BASIC_SUCCESS,
              payload: res.data
            });
            // props.history.replace({
            //   pathname: "/Main/CompanyInfo/BasicInfo"
            // });
          }
        })
        .catch(err => {
          console.log(err);
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

  useEffect(() => {
    console.log("useEffect 실행됨");
    // 여기서 dispatch > 리퀘스트 로 물어보고 dispatch > suc or fail(err) 분기

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

          // getData(); >> 디스패치에서 loading을 변경해서 겟 하는걸로
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

  const List = () => {
    console.log("array", array);
    console.log("SAList2", SAList);
    console.log("MACODE", MACODE);
    console.log("Test", Test);
    if (SAList.length === 0) {
      console.log("SAList.length === 0");
    }
    return SAList.length !== 0
      ? SAList.map((value, index) => {
          console.log("SAList.length 1이상 ");
          return (
            <tr>
              <td id="TdInput">
                <input
                  className="InputContainer"
                  key={index}
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
                />
              </td>
              <td id="TdInput">
                <input
                  className="InputContainer"
                  key={index}
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
                />
              </td>
              <td id="TdInput">
                <input
                  className="InputContainer"
                  key={index}
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
                />
              </td>
              <td id="TdInput">
                <input
                  className="InputContainer"
                  key={index}
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
                />
              </td>
              <td id="TdInput">
                <input
                  className="InputContainer"
                  key={index}
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
                />
              </td>
              <td id="TdInput">
                <input
                  className="InputContainer"
                  key={index}
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
                />
              </td>
              <td id="TdInput">
                <input
                  className="InputContainer"
                  key={index}
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
                />
              </td>
            </tr>
          );
        })
      : AddRow();
    // <tr>
    //   <td >
    //     <inputclassName ="InputContainer"
    //
    //       name={"SANAME"}
    //       readOnly={ReadOnly}
    //     />
    //   </td>
    //   <td >
    //     <inputclassName ="InputContainer"
    //
    //       name={"SABOSSNAME"}
    //       readOnly={ReadOnly}
    //     />
    //   </td>
    //   <td >
    //     <inputclassName ="InputContainer"
    //
    //       name={"SASAUPNUM"}
    //       readOnly={ReadOnly}
    //     />
    //   </td>
    //   <td >
    //     <inputclassName ="InputContainer"  name={"SATEL"} readOnly={ReadOnly} />
    //   </td>
    //   <td >
    //     <inputclassName ="InputContainer"
    //
    //       name={"SAJUSO"}
    //       readOnly={ReadOnly}
    //     />
    //   </td>
    //   <td >
    //     <inputclassName ="InputContainer"
    //
    //       name={"SAGUBUN"}
    //       readOnly={ReadOnly}
    //     />
    //   </td>
    //   <td >
    //     <inputclassName ="InputContainer"
    //
    //       name={"SAMEMO"}
    //       readOnly={ReadOnly}
    //     />
    //   </td>
    // </tr>
  };
  //css 속성
  return (
    <div>
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={ModalOpen}
            >
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
