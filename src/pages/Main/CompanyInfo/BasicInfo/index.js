import React from "react";
import "./index.css";
const BasicInfo = () => {
  return (
    <div>
      <div>
        <label className="TableTitle">기관정보</label>
        <div>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className="ColGubun">기관명</td>
                <td>#</td>
                <td className="ColGubun">대표자</td>
                <td>#</td>
                <td className="ColGubun">고유번호</td>
                <td>#</td>
              </tr>
              <tr>
                <td className="ColGubun">기관주소</td>
                <td colSpan="3">#</td>
                <td className="ColGubun">홈페이지</td>
                <td>#</td>
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
                <td>#</td>
                <td className="ColGubun">이메일</td>
                <td>#</td>
                <td className="ColGubun">전화번호</td>
                <td>#</td>
              </tr>
              <tr>
                <td className="ColGubun">휴대폰 번호</td>
                <td>#</td>
                <td className="ColGubun">팩스 번호</td>
                <td>#</td>
                <td className="ColGubun">비고</td>
                <td>#</td>
              </tr>
              <tr>
                <td className="ColGubun">메모</td>
                <td colSpan="5">
                  <textarea style={{ width: "100%", border: "0" }} />
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
                <td>#</td>
                <td>#</td>
                <td>#</td>
                <td>#</td>
                <td>#</td>
                <td>#</td>
                <td>#</td>
                <td>#</td>
                <td>#</td>
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
              <tr>
                <td>#</td>
                <td>#</td>
                <td>#</td>
                <td>#</td>
                <td>#</td>
                <td>#</td>
                <td>#</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
