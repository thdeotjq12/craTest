import "./index.css";
import React, { useEffect, useState, useCallback, PropTypes } from "react";
import {
  useSelector,
  useDispatch,
  connect
  // bindActionCreators
} from "react-redux";
import axios from "axios";
import { ADD_BASIC_SUCCESS } from "../../../../modules/Main/CompanyInfo/BasicInfo/BasicInfoReducer";
const BasicInfo = ({ props }) => {
  const { BaicInfo_Data } = useSelector(state => state.BasicInfo);

  const [ReadOnly, setReadOnly] = useState(true); // 수정버튼 클릭 시 false
  const [FirstData, setFisrtData] = useState(true); // 수정버튼 클릭 시 false (수정할때 value 값 입력조건 주기위함)
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

  const [SACODE, setSACode] = useState([]);
  const [SABOSSNAME, setSABossName] = useState("");
  const [SASAUPNUM, setSASaupNum] = useState("");
  const [SADAMDANG, setSADamdang] = useState("");
  const [SATEL, setSATel] = useState("");
  const [SAEMAIL, setSAEMail] = useState("");
  const [SAJUSO, setSAJuso] = useState("");
  const [SAGUBUN, setSAGubun] = useState("");
  const [SAMEMO, setSAMemo] = useState("");

  // 처음한번실행,           그다음 [] 내용이 변하면 실행
  // useEffect 는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정 할 수 있는 Hook 입니다.
  // 클래스형 컴포넌트의 componentDidMount 와 componentDidUpdate 를 합친 형태로 보아도 무방
  useEffect(() => {
    console.log("useEffect 실행됨");

    if (BaicInfo_Data === null) {
      axios
        .post("http://localhost:5000/CompanyInfo/BasicInfo/BasicInfo")
        .then(res => {
          console.log(res);
          if (res.data === "NoData") {
            console.log("BasicInfo 데이터가 없습니다");
          } else {
            console.log("BasicInfo (dispatch) 불러옴", res.data);
            dispatch({
              type: ADD_BASIC_SUCCESS,
              payload: res.data
            });

            props.history.replace({
              pathname: "/Main/CompanyInfo/BasicInfo"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    console.log("BaicInfo_Data !== null");
  }, [BaicInfo_Data, array]);

  const Save = () => {
    var parm = {
      MADAMDANG: MADAMDANG,
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
      MACODE: MACODE
    };
    console.log("parm", parm);

    axios
      .post("http://localhost:5000/CompanyInfo/BasicInfo/BasicInfo_Save", parm)
      .then(res => {
        if (res.data === "업데이트 성공") {
          alert("업데이트 성공!");
        } else {
          alert("업데이트 실패!");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onSubmitForm = useCallback(e => {
    console.log("onsubmit 실행됨  aicInfo_Data : ", BaicInfo_Data);
    console.log("e.target.value ", e.target.value);
    // BaicInfo_Data !== null && e.preventDefault(); // 현재 이벤트의 기본 동작을 중단,          새로운 페이지로 넘어가는것 방지
    BaicInfo_Data !== null && e.preventDefault();
    // type="submit" 을 해주면 그 컴포넌트 이벤트 발생 시 onSubmitForm 실행
    // 하나도 안해주면 전부 실행 ?
    e.target.value !== null &&
      dispatch({
        type: ADD_BASIC_SUCCESS,
        payload: e.target.value
      });
  });

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
      console.log(BaicInfo_Data.BaicInfoSaup_Data.length);
      console.log(e.target.name);
      // getNames = getName => {
      //   return getName;
      // };
      for (let i = 0; i < BaicInfo_Data.BaicInfoSaup_Data.length - 1; i++) {
        if (e.target.name === "SACODE" + i) {
          setSACode(e.target.value);
        } else if (e.target.name === "SANAME" + i) {
          // getNames && getNames(e.target.name);
          // setSAName(e.target.value);
        } else if (e.target.name === "SABOSSNAME" + i) {
          setSABossName(e.target.value);
        } else if (e.target.name === "SASAUPNUM" + i) {
          setSASaupNum(e.target.value);
        } else if (e.target.name === "SADAMDANG" + i) {
          setSADamdang(e.target.value);
        } else if (e.target.name === "SATEL" + i) {
          setSATel(e.target.value);
        } else if (e.target.name === "SAEMAIL" + i) {
          setSAEMail(e.target.value);
        } else if (e.target.name === "SAJUSO" + i) {
          setSAJuso(e.target.value);
        } else if (e.target.name === "SAGUBUN" + i) {
          setSAGubun(e.target.value);
        } else if (e.target.name === "SAMEMO" + i) {
          setSAMemo(e.target.value);
        }
      }
    }
  });
  const onChangeValue = (e, idx) => {
    console.log("SAList1", SAList);
    var temp = SAList.map((value, index) => {
      if (index === idx) {
        return { ...value, SANAME: e.target.value };
      } else {
        return { ...value };
      }
    });
    setSAList(temp);
  };

  var array = BaicInfo_Data && BaicInfo_Data.BaicInfoSaup_Data;
  const [SAList, setSAList] = useState(array);
  const [Test, setTest] = useState(0);
  // 지자체 / 사업추진부서 등록 폼

  const List = () => {
    console.log("array", array);
    console.log("SAList2", SAList);
    console.log("MACODE", MACODE);
    console.log("Test", Test);
    return (
      SAList &&
      SAList.map((value, index) => {
        return (
          <tr>
            <td>
              <input
                style={{ width: "54px" }}
                key={index}
                onChange={e => onChangeValue(e, index)}
                value={
                  FirstData
                    ? BaicInfo_Data && value.SANAME
                    : SAList.SANAME
                    ? SAList.SANAME
                    : value.SANAME
                }
                name={"SANAME" + index}
                readOnly={ReadOnly}
              />
            </td>
            <td>
              <input
                style={{ width: "54px" }}
                key={index}
                onChange={onChangeText}
                value={
                  FirstData
                    ? BaicInfo_Data && value.SABOSSNAME
                    : SABOSSNAME
                    ? SABOSSNAME
                    : value.SABOSSNAME
                }
                name={"SABOSSNAME" + index}
                readOnly={ReadOnly}
              />
            </td>
            <td>
              <input
                style={{ width: "54px" }}
                key={index}
                onChange={onChangeText}
                value={
                  FirstData
                    ? BaicInfo_Data && value.SASAUPNUM
                    : SASAUPNUM
                    ? SASAUPNUM
                    : value.SASAUPNUM
                }
                name={"SASAUPNUM" + index}
                readOnly={ReadOnly}
              />
            </td>
            <td>
              <input
                style={{ width: "54px" }}
                key={index}
                onChange={onChangeText}
                value={
                  FirstData
                    ? BaicInfo_Data && value.SATEL
                    : SATEL
                    ? SATEL
                    : value.SATEL
                }
                name={"SATEL" + index}
                readOnly={ReadOnly}
              />
            </td>
            <td>
              <input
                style={{ width: "54px" }}
                key={index}
                onChange={onChangeText}
                value={
                  FirstData
                    ? BaicInfo_Data && value.SAJUSO
                    : SAJUSO
                    ? SAJUSO
                    : value.SAJUSO
                }
                name={"SAJUSO" + index}
                readOnly={ReadOnly}
              />
            </td>
            <td>
              <input
                style={{ width: "54px" }}
                key={index}
                onChange={onChangeText}
                value={
                  FirstData
                    ? BaicInfo_Data && value.SAGUBUN
                    : SAGUBUN
                    ? SAGUBUN
                    : value.SAGUBUN
                }
                name={"SAGUBUN" + index}
                readOnly={ReadOnly}
              />
            </td>
            <td>
              <input
                style={{ width: "54px" }}
                key={index}
                onChange={onChangeText}
                value={
                  FirstData
                    ? BaicInfo_Data && value.SAMEMO
                    : SAMEMO
                    ? SAMEMO
                    : value.SAMEMO
                }
                name={"SAMEMO" + index}
                readOnly={ReadOnly}
              />
            </td>
          </tr>
        );
      })
    );
  };
  //css 속성
  console.log("render");
  return (
    <form onSubmit={onSubmitForm}>
      <div>
        <div>
          <label className="TableTitle">기관정보</label>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ float: "right" }}
            onClick={Save}
          >
            저장
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={{ float: "right" }}
            onClick={() => setReadOnly(false)}
          >
            수정
          </button>
          <div>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td className="ColGubun">기관명</td>
                  <td>
                    <input
                      onChange={onChangeText}
                      style={{ width: "54px" }}
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
                  <td>
                    <input
                      style={{ width: "54px" }}
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
                  <td>
                    <input
                      style={{ width: "54px" }}
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
                  <td colSpan="3">
                    <input
                      style={{ width: "54px" }}
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
                  <td>
                    <input
                      style={{ width: "54px" }}
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
                  <td>
                    <input
                      style={{ width: "54px" }}
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
                  <td>
                    <input
                      style={{ width: "54px" }}
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
                  <td>
                    <input
                      style={{ width: "54px" }}
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
                  <td>
                    <input
                      style={{ width: "54px" }}
                      onChange={onChangeText}
                      value={
                        FirstData
                          ? BaicInfo_Data && BaicInfo_Data.BaicInfo_Data[0].MAHP
                          : MAHP
                          ? MAHP
                          : BaicInfo_Data.BaicInfo_Data[0].MAHP
                      }
                      name="MAHP"
                      readOnly={ReadOnly}
                    />
                  </td>
                  <td className="ColGubun">팩스 번호</td>
                  <td>
                    <input
                      style={{ width: "54px" }}
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
                  <td>
                    <input
                      style={{ width: "54px" }}
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
                  <td colSpan="5">
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
                  <td>
                    <input
                      style={{ width: "54px" }}
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
                  <td>
                    <input
                      style={{ width: "54px" }}
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
                  <td>
                    <input
                      style={{ width: "54px" }}
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
                  <td>
                    <input
                      style={{ width: "54px" }}
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
                  <td>
                    <input
                      style={{ width: "54px" }}
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
                  <td>
                    <input
                      style={{ width: "54px" }}
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
                  <td>
                    <input
                      style={{ width: "54px" }}
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
                  <td>
                    <input
                      style={{ width: "54px" }}
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
                  <td>
                    <input
                      style={{ width: "54px" }}
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
                {/* <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfoSaup_Data[0].SANAME
                      }
                    />
                  </td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfoSaup_Data[0].SABOSSNAME
                      }
                    />
                  </td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfoSaup_Data[0].SASAUPNUM
                      }
                    />
                  </td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfoSaup_Data[0].SATEL
                      }
                    />
                  </td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfoSaup_Data[0].SAJUSO
                      }
                    />
                  </td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfoSaup_Data[0].SAGUBUN
                      }
                    />
                  </td>
                  <td>
                    <input
                      style={{ width: "54px" }}
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
    </form>
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
