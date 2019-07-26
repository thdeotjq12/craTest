import React, { useState, useEffect } from "react";
import ING_N from "../../../Images/ING_N.bmp";
import ING_Y from "../../../Images/ING_Y.bmp";
import Grid_ComeCheck from "./Grid_ComeCheck";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import GongLib from "../../../function/GongLib";
import axios from "axios";

const Grid_ComeChecCol = [
  { key: "DDD1", name: "구분", width: 120, editable: true },
  { key: "SDNAME", name: "세부사업명", width: 120, editable: true },
  { key: "STNAMEKOR", name: "사원명", width: 120, editable: true },
  { key: "DDD4", name: "근무날짜", width: 120, editable: true },
  { key: "DDD4", name: "요일", width: 120, editable: true },
  { key: "DDD4", name: "근무구분", width: 120, editable: true },
  { key: "DDD4", name: "기준시업", width: 120, editable: true },
  { key: "DDD4", name: "기준종업", width: 120, editable: true },
  { key: "DDD4", name: "수습", width: 120, editable: true },
  { key: "DDD4", name: "휴직", width: 120, editable: true },
  { key: "DDD4", name: "시작일", width: 120, editable: true },
  { key: "DDD4", name: "종료일", width: 120, editable: true },
  { key: "DDD4", name: "출근", width: 120, editable: true },
  { key: "DDD4", name: "퇴근", width: 120, editable: true },
  { key: "DDD4", name: "근무처리", width: 120, editable: true },
  { key: "DDD4", name: "기준적용", width: 120, editable: true },
  { key: "DDD4", name: "결근", width: 120, editable: true },
  { key: "DDD4", name: "지각", width: 120, editable: true }
];
const ComeCheck = props => {
  const dispatch = useDispatch();
  const { User_Data } = useSelector(state => state.Loginpage);
  const { ValList } = useSelector(state => state.ValList);
  const [CCList, setCCList] = useState("");
  const [Year, setYear] = useState(document.getElementsByName("Year").value);
  const [Month, setMonth] = useState(document.getElementsByName("Month").value);
  const [WPCCEditAbleDate, setWPCCEditAbleDate] = useState(
    ValList && ValList[1].WPCCEDITABLEDATE
  ); //근태수정가능일
  useEffect(() => {
    console.log("VALIST", ValList);
  });
  const getCellValue = value => {};
  //검색버튼 클릭
  const btnFindClick = () => {
    // ChangeYear();
    if (User_Data) {
      if (User_Data.SULEVEL <= 1000) {
        ShowCCList_admin();
      } else {
        ShowCCList_user();
      }
    }
    ShowCCList_admin();
  };
  // 날짜변경 -> 참여사업 리스트 조회
  const ChangeYear = () => {
    var SaupHead = document.getElementById("SaupHead");
    var SaupDetail = document.getElementById("SaupDetail");
    GongLib.SetSaupHead(SaupHead, Year, "전체");
    GongLib.SetSaupDetail(SaupDetail, Year, SaupHead.value, "전체");
  };
  // 참여사업 변경 -> 세부사업 리스트 조회
  const ChangeSA = () => {
    var SaupHead = document.getElementById("SaupHead");
    var SaupDetail = document.getElementById("SaupDetail");
    GongLib.SetSaupDetail(SaupDetail, Year, SaupHead.value, "전체");
  };

  //참여사업기간의 변경 등의 사항으로 근로기간이 변경되었을때
  //해당 년월에 해당하는 기간에 근무하지 않는 근로자 데이터를 삭제
  const CleanComeCheckTot = (Year, Month) => {
    var parm = {
      Year: Year,
      Month: Month
    };

    axios
      .post("http://localhost:5000/ComeCheck/CleanComeCheckTot", parm)
      .then(res => {
        console.log(res);
        if (res.data === "NoData") {
          console.log("SaupHeadList 데이터가 없습니다");
        } else {
        }
      })
      .catch(err => {
        console.log("SaupHeadList 에러", err);
      });
  };
  // 근태집계를 조회하는 함수
  const ShowCCList_admin = () => {
    console.log("ShowCCList_admin");
    CleanComeCheckTot("2019", "07");
    var SaupDetail = document.getElementById("SaupDetail");
    var Codes = [];
    Codes = GongLib.GetSDCode(
      SaupDetail.options[SaupDetail.selectedIndex].value
    );
    console.log("TTTTTTTTTTTTTT", Codes);
    var parm = {
      Year: Year,
      Month: Month,
      Codes: Codes,
      SUID: User_Data.SUID,
      SHKeyWord: document.getElementById("SaupHead").value,
      SDKeyWord: document.getElementById("SaupDetail").value
    };

    axios
      .post("http://localhost:5000/ComeCheck/ShowCCList_admin", parm)
      .then(res => {
        console.log(res);
        if (res.data === "NoData") {
        } else {
          console.log("SHOWCCLIST_ADMIN    :", res.data);
          setCCList(res.data);
        }
      })
      .catch(err => {
        console.log("SaupHeadList 에러", err);
      });
  };
  // 근태집계를 조회하는 함수
  const ShowCCList_user = () => {
    console.log("456");
  };

  // 추진사업 콤보상자 셋팅
  const setSACombo = SaupHeadList => {
    var Combo = document.getElementById("SaupHead");
    for (let i = 0; i < SaupHeadList.length; i++) {
      Combo.options[Combo.options.length] = new Option("Text", "value");
    }
  };

  return (
    <div className="MainDivContainer">
      <div>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td className="ColTitle" style={{ width: "150px" }}>
                사업시작연도
              </td>
              <td className="ColTitle" style={{ width: "250px" }}>
                참여사업
              </td>
              <td className="ColTitle" style={{ width: "250px" }}>
                참여 세부사업
              </td>
              <td className="ColTitle" style={{ width: "150px" }}>
                검색어
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => btnFindClick()}
                  style={{ width: "100%", height: "80px" }}
                >
                  검색
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  삭제
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  기타기능
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  마감
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  모바일근태 불러오기
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  근태반영
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  일별만근
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  엑셀
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <div class="input-group-prepend">
                  <select
                    class="browser-default custom-select"
                    name="Year"
                    onClick={e => [
                      setYear(e.target.value),
                      // setSACombo(["1", "2"])
                      ChangeYear()
                    ]}
                  >
                    <option selected>2019</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                  </select>
                  <select
                    class="browser-default custom-select"
                    name="Month"
                    onClick={e => setMonth(e.target.value)}
                  >
                    <option selected value="07">
                      07
                    </option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>
              </td>
              <td>
                <div class="input-group-prepend">
                  <select
                    class="browser-default custom-select"
                    id="SaupHead"
                    onChange={() => ChangeSA()}
                  >
                    <option selected>전체</option>
                  </select>
                </div>
              </td>
              <td>
                <div class="input-group-prepend">
                  <select class="browser-default custom-select" id="SaupDetail">
                    <option selected>전체</option>
                  </select>
                </div>
              </td>

              <td />
            </tr>

            <tr>
              <td className="ColGubun">범례</td>
              <td>
                <img src={ING_Y} /> 진행중
                <img src={ING_N} />
                사업종료
                <img src={ING_N} />
                선택
              </td>
              <td className="ColGubun">마감여부</td>
              <td>
                <img src={ING_Y} /> 마감완료
              </td>

              <td className="ColGubun">근태수정 기능일(오늘 -Dday)</td>
              <td id="TdInput">
                <input
                  className="InputContainer"
                  name="WPCCEditAbleDate"
                  defaultValue={WPCCEditAbleDate}
                />
              </td>
              <td>
                <button className="btn btn-primary">저장</button>
              </td>
              <td>
                <button className="btn btn-primary">근무처리복사</button>
                <button className="btn btn-primary">주휴시간삭제</button>
              </td>
            </tr>
            <tr>
              <td colSpan="12" style={{ verticalAlign: "top" }}>
                <Grid_ComeCheck
                  columns={Grid_ComeChecCol}
                  rows={CCList}
                  getCellValue={getCellValue}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComeCheck;
