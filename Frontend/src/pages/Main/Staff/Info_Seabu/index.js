import React from "react";
import "./index.css";
import Grid_ChamYeo from "./Grid_ChamYeo";
import Grid_NomalSudang from "./Grid_NomalSudang";
import Grid_TimeSudang from "./Grid_TimeSudang";
import Grid_DaySudang from "./Grid_DaySudang";
import Grid_BeGwaSudang from "./Grid_BeGwaSudang";
const Grid_NomalSudangCol = [
  { key: "DDD", name: "일반수당", width: 150, editable: true },
  { key: "DDD", name: "수당금액", width: 150, editable: true }
];
const Grid_TimeSudangCol = [
  { key: "DDD", name: "시간비례수당", width: 150, editable: true },
  { key: "DDD", name: "수당금액", width: 150, editable: true }
];
const Grid_DaySudangCol = [
  { key: "DDD", name: "일자비례수당", width: 150, editable: true },
  { key: "DDD", name: "수당금액", width: 150, editable: true }
];
const Grid_BeGwaSudangCol = [
  { key: "DDD", name: "비과세수당", width: 150, editable: true },
  { key: "DDD", name: "수당금액", width: 150, editable: true }
];
const Grid_ChamYeoCol = [
  { key: "DDD1", name: "사업명", width: 180, editable: true },
  { key: "DDD2", name: "시작일", width: 80, editable: true },
  { key: "DDD3", name: "종료일", width: 80, editable: true },
  { key: "DDD4", name: "참여기관", width: 200, editable: true },
  { key: "DDD3", name: "진행구분", width: 80, editable: true },
  { key: "DDD3", name: "근로구분", width: 80, editable: true },
  { key: "DDD3", name: "인사처리", width: 80, editable: true }
];
const Info_Seabu = props => {
  const getCellValue = value => {};

  return (
    <div className="MainDivContainer">
      <div>
        <label className="TableTitle">참여사업정보</label>
      </div>
      <div>
        <table className="table table-bordered" style={{ marginBottom: "0" }}>
          <tbody>
            <tr>
              <td className="ColGubunFront" rowSpan="2">
                최종참여사업
              </td>
              <td className="ColGubun" colSpan="2">
                사업명(여기에표시)
              </td>
              <td className="ColGubun" colSpan="2">
                세부사업명(여기에표시)
              </td>
              <td className="ColGubun" colSpan="2">
                선발여부
              </td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
            </tr>
            <tr>
              <td className="ColGubun">최초시작일</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td className="ColGubun">최종종료일</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td className="ColGubun">사업구분</td>
              <td id="TdInput" colSpan="2">
                <input className="InputContainer" />
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td className="ColGubunFront" rowSpan="2">
                누적사업참여
              </td>
              <td>
                <Grid_ChamYeo
                  columns={Grid_ChamYeoCol}
                  rows={["123", "123"]}
                  getCellValue={getCellValue}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <label className="TableTitle">선발 정보</label>
        </div>
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
                  고령자
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
              <td className="ColGubun">장애유형</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td className="ColGubun">장애등급</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td className="ColGubun">증증/경증</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td className="ColGubun">장애인정일</td>
              <td id="TdInput">
                <input className="InputContainer" />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <label className="TableTitle">근로운영 설정</label>
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
                연차휴가
              </td>
              <td id="TdInput" colSpan="9">
                <label class="form-check-label">
                  <input type="checkbox" name="optradio" />
                  연차관리에서 연차휴가 사용
                </label>
              </td>
            </tr>
            <tr>
              <td className="ColGubunFront" colSpan="3">
                연장계산
              </td>
              <td id="TdInput" colSpan="9">
                <label class="form-check-label">
                  <input type="checkbox" name="optradio" />
                  일일소정근로시간 기준으로 연장근무 계산
                </label>
              </td>
            </tr>
            <tr>
              <td className="ColGubunFront" colSpan="3">
                연차휴가
              </td>
              <td id="TdInput" colSpan="9">
                <label class="form-check-label">
                  <input type="radio" name="optradio" />
                  근태시간반영
                </label>
                <label class="form-check-label">
                  <input type="radio" name="optradio" />
                  연평균(포괄계산)반영
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
          <label className="TableTitle">급여정보</label>
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
        <div>
          <label className="TableTitle">수당정보</label>
        </div>
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
        <div>
          <label className="TableTitle">사회보험</label>
        </div>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td className="ColGubun">실수령급여</td>
              <td id="TdInput">
                <label class="form-check-label">
                  <input type="radio" name="optradio" />
                  귀속월액
                </label>
                <label class="form-check-label">
                  <input type="radio" name="optradio" />
                  보수월액
                </label>
                <label class="form-check-label">
                  <input type="radio" name="optradio" />
                  납입액입력
                </label>
                <label class="form-check-label">
                  <input type="radio" name="optradio" />
                  외부파일등록
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <label className="TableTitle">사회보험 관리</label>
        </div>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td className="ColGubun">구분</td>
              <td className="ColGubun">여/부</td>
              <td className="ColGubun">취득월 납부</td>
              <td className="ColGubun">취득일</td>
              <td className="ColGubun">상실일</td>
              <td className="ColGubun" colSpan="2">
                보험료
              </td>
              <td className="ColGubun">관리번호</td>
            </tr>
            <tr>
              <td className="ColGubun">국민연금</td>
              <td id="TdInput">
                <label class="form-check-label">
                  <input type="checkbox" name="optradio" />
                </label>
              </td>
              <td id="TdInput">
                <label class="form-check-label">
                  <input type="checkbox" name="optradio" />
                </label>
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
            <tr>
              <td className="ColGubun" rowSpan="2">
                건강보험
              </td>
              <td id="TdInput" rowSpan="2">
                <label class="form-check-label">
                  <input type="checkbox" name="optradio" />
                </label>
              </td>
              <td id="TdInput" rowSpan="2">
                <label class="form-check-label">
                  <input type="checkbox" name="optradio" />
                </label>
              </td>
              <td id="TdInput" rowSpan="2">
                <input className="InputContainer" />
              </td>

              <td id="TdInput" rowSpan="2">
                <input className="InputContainer" />
              </td>
              <td id="TdInput">건강보험</td>

              <td id="TdInput">
                <input className="InputContainer" />
              </td>
              <td id="TdInput" rowSpan="2">
                <input className="InputContainer" />
              </td>
              <td id="TdInput" rowSpan="2">
                <input className="InputContainer" />
              </td>
            </tr>

            <tr>
              <td id="TdInput">장기요양</td>

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
            <tr>
              <td className="ColGubun">고용보험</td>
              <td id="TdInput">
                <label class="form-check-label">
                  <input type="checkbox" name="optradio" />
                </label>
              </td>
              <td id="TdInput">
                <label class="form-check-label">
                  <input type="checkbox" name="optradio" />
                </label>
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
            <tr>
              <td className="ColGubun">산재보험</td>
              <td id="TdInput">
                <label class="form-check-label">
                  <input type="checkbox" name="optradio" />
                </label>
              </td>
              <td id="TdInput">
                <label class="form-check-label">
                  <input type="checkbox" name="optradio" />
                </label>
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
      </div>
    </div>
  );
};

export default Info_Seabu;
