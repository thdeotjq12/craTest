import React from "react";
import "./index.css";
import Grid_Buyang from "./Grid_Buyang";

const Grid_BuyangCol = [
  { key: "DDD1", name: "관계", width: 80, editable: true },
  { key: "DDD2", name: "성명", width: 80, editable: true },
  { key: "DDD3", name: "주민등록번호", width: 120, editable: true },
  { key: "DDD4", name: "연령", width: 80, editable: true }
];
const Info = props => {
  const getCellValue = value => {};

  return (
    <div className="MainDivContainer">
      <div>
        <label className="TableTitle">근로자 기본정보</label>
      </div>
      <div>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td className="ColGubun">이름(한글)</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td className="ColGubun">이름(영문)</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td className="ColGubun">연락처</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
            </tr>
            <tr>
              <td className="ColGubun">주민번호</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td className="ColGubun">근로구분</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td className="ColGubun">대표자와의 관계</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
            </tr>
            <tr>
              <td className="ColGubun">국적</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td className="ColGubun">체류자격</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td className="ColGubun">체류코드</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
            </tr>
            <tr>
              <td className="ColGubun">주소</td>
              <td id="TdInput" colSpan="5">
                <input className="InputContainer" />
              </td>
            </tr>
            <tr>
              <td className="ColGubun">최초근로일</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td className="ColGubun">최종근로일</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td className="ColGubun">누적근로일</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <label className="TableTitle">우대/기타사항</label>
        </div>
        <table className="table table-bordered" style={{ marginBottom: "0" }}>
          <tbody>
            <tr>
              <td className="ColGubun">전공</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td className="ColGubun">자격면허</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td className="ColGubun" colSpan="2" />
            </tr>
            <tr>
              <td className="ColGubun">경력/메모</td>
              <td id="TdInput" colSpan="5">
                <textarea className="InputContainer" />
              </td>
            </tr>
            <tr>
              <td className="ColGubun">급여계좌(은행)</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td className="ColGubun">계좌번호</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td className="ColGubun">예금주/관계</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td className="ColGubun" rowSpan="2">
                취약계층정보
              </td>
              <td id="TdInput" colSpan="8">
                <label class="form-check-label">
                  <input type="checkbox" name="optradio" />
                  여성가장
                </label>
                <label class="form-check-label">
                  <input type="checkbox" name="optradio" />
                  한부모가정
                </label>
                <label class="form-check-label">
                  <input type="checkbox" name="optradio" />
                  차상위계층
                </label>
                <label class="form-check-label">
                  <input type="checkbox" name="optradio" />
                  결혼이주여성
                </label>
                <label class="form-check-label">
                  <input type="checkbox" name="optradio" />
                  북한이탈주민
                </label>
                <label class="form-check-label">
                  <input type="checkbox" name="optradio" />
                  노숙인
                </label>
                <label class="form-check-label">
                  <input type="checkbox" name="optradio" />
                  기초생활수급권자
                </label>
              </td>
            </tr>
            <tr>
              <td className="ColMultiGubun">장애유형</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td className="ColMultiGubun">장애등급</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td className="ColMultiGubun">증증/경증</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td className="ColMultiGubun">장애인정일</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <label className="TableTitle">부양가족 등록</label>
          <div style={{ float: "left" }}>
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              style={{ width: "90px" }}
            >
              추가
            </button>
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              style={{ width: "90px" }}
            >
              제거
            </button>
          </div>
        </div>
        <Grid_Buyang
          columns={Grid_BuyangCol}
          rows={["123", "123"]}
          getCellValue={getCellValue}
        />
      </div>
    </div>
  );
};

export default Info;
