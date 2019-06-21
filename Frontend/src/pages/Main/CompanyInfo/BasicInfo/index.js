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
  const [text, setText] = useState("");
  // function createWarning(funcName) {
  //   return () => console.warn(funcName + " is not defined");
  // }

  // const defaultProps = {
  //   onData: createWarning("onData")
  // };
  const dispatch = useDispatch();
  // 처음한번실행, 그다음 [] 내용이 변하면 실행
  useEffect(() => {
    if (BaicInfo_Data === null) {
      axios
        .post("http://localhost:5000/CompanyInfo/BasicInfo/BasicInfo")
        .then(res => {
          console.log(res);
          if (res.data === "NoData") {
            console.log("BasicInfo 데이터가 없습니다");
          } else {
            console.log("BasicInfo pathname", res.data);
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
  }, [BaicInfo_Data]);
  const onSubmitForm = useCallback(e => {
    BaicInfo_Data !== null && console.log("onsubmit", BaicInfo_Data);
    e.preventDefault(); // 현재 이벤트의 기본 동작을 중단
    // type="submit" 을 해주면 그 컴포넌트 이벤트 발생 시 onSubmitForm 실행
    // 하나도 안해주면 전부 실행 ?
    dispatch({
      type: ADD_BASIC_SUCCESS,
      payload: text
    });
  });

  const onChangeText = useCallback(e => {
    setText(e.target.value);
  }, []);

  // 지자체 / 사업추진부서 등록 폼
  const List = () => {
    var array = BaicInfo_Data !== null && BaicInfo_Data.BaicInfoSaup_Data;
    return (
      BaicInfo_Data !== null &&
      array.map((value, index) => {
        return (
          <tr>
            <td>
              <input
                style={{ width: "54px" }}
                key={index}
                value={value.SANAME}
              />
            </td>
            <td>
              <input
                style={{ width: "54px" }}
                key={index}
                value={value.SABOSSNAME}
              />
            </td>
            <td>
              <input
                style={{ width: "54px" }}
                key={index}
                value={value.SASAUPNUM}
              />
            </td>
            <td>
              <input
                style={{ width: "54px" }}
                key={index}
                value={value.SATEL}
              />
            </td>
            <td>
              <input
                style={{ width: "54px" }}
                key={index}
                value={value.SAJUSO}
              />
            </td>
            <td>
              <input
                style={{ width: "54px" }}
                key={index}
                value={value.SAGUBUN}
              />
            </td>
            <td>
              <input
                style={{ width: "54px" }}
                key={index}
                value={value.SAMEMO}
              />
            </td>
          </tr>
        );
      })
    );
  };

  console.log("render");
  return (
    <form onSubmit={onSubmitForm}>
      <div>
        <div>
          <label className="TableTitle">기관정보</label>
          <button type="submit" className="btn btn-primary">
            수정
          </button>
          <button type="button" className="btn btn-primary">
            저장
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
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MANAME
                      }
                    />
                  </td>
                  <td className="ColGubun">대표자</td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MABOSSNAME
                      }
                      readOnly={false}
                    />
                  </td>
                  <td className="ColGubun">고유번호</td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MASAUPNUM
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className="ColGubun">기관주소</td>
                  <td colSpan="3">
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MAJUSO
                      }
                    />
                  </td>
                  <td className="ColGubun">홈페이지</td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MAHOMEPAGE
                      }
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
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MADAMDANG
                      }
                    />
                  </td>
                  <td className="ColGubun">이메일</td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MAEMAIL
                      }
                    />
                  </td>
                  <td className="ColGubun">전화번호</td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MATEL
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className="ColGubun">휴대폰 번호</td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MAHP
                      }
                    />
                  </td>
                  <td className="ColGubun">팩스 번호</td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MAFAX
                      }
                    />
                  </td>
                  <td className="ColGubun">비고</td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MABIGO
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className="ColGubun">메모</td>
                  <td colSpan="5">
                    <textarea
                      style={{ width: "100%", border: "0" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MAMEMO
                      }
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
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MAKOOKMINJISA
                      }
                    />
                  </td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MAKOOKMINTEL
                      }
                    />
                  </td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MAKOOKMINFAX
                      }
                    />
                  </td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MAGUNGANGJISA
                      }
                    />
                  </td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MAGUNGANGTEL
                      }
                    />
                  </td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MAGUNGANGFAX
                      }
                    />
                  </td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MAGOYONGJISA
                      }
                    />
                  </td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MAGOYONGTEL
                      }
                    />
                  </td>
                  <td>
                    <input
                      style={{ width: "54px" }}
                      value={
                        BaicInfo_Data !== null &&
                        BaicInfo_Data.BaicInfo_Data[0].MAGOYONGFAX
                      }
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
//   console.log("----------State", state.BasicInfo.BaicInfo_Data.BaicInfo_Data[0]);
//   return {
//     Data: state.BasicInfo.BaicInfo_Data.BaicInfo_Data[0]
//   };
// };

// const mapDispatchToProps = dispatch => {
//   // return bindActionCreators(ADD_BASIC_SUCCESS, dispatch);
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
