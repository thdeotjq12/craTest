import React, { useState, useEffect } from "react";
import ING_N from "../../../Images/ING_N.bmp";
import ING_Y from "../../../Images/ING_Y.bmp";
import Grid_ComeCheck from "./Grid_ComeCheck";
import ReactDataGrid from "react-data-grid";
import { useSelector, useDispatch } from "react-redux";
// import "./index.css";
import GongLib from "../../../function/GongLib";
import axios from "axios";
import ComeCheckDetail from "../ComeCheckDetail";
import "bootstrap/dist/css/bootstrap.css";
import CCDetail from "../ComeCheckDetail/Grid_ComeCheckDetail";
const checkBoxFormatter = () => {
  return (
    <div>
      <input type="checkbox">123 </input>
    </div>
  );
};

const columns = [
  { key: "id", name: "ID", editable: true },
  { key: "title", name: "Title", editable: true },
  { key: "complete", name: "Complete", editable: true }
];

const rows = [
  { id: 0, title: "Task 1", complete: 20 },
  { id: 1, title: "Task 2", complete: 40 },
  { id: 2, title: "Task 3", complete: 60 }
];

const Grid_ComeChecCol = [
  { key: "DDD0", name: "구분", width: 120, editable: true },
  { key: "SHNAMESHORT", name: "사업명", width: 120, editable: false },
  { key: "SDNAME", name: "세부사업명", width: 120, editable: true },
  { key: "STNAMEKOR", name: "근로자명", width: 120, editable: true },
  { key: "DDD2", name: "생년월일", width: 120, editable: true },
  { key: "CTSUSUPYN", name: "수습", width: 120, editable: true },
  { key: "CTHUEYN", name: "휴직", width: 120, editable: true },
  { key: "SSMSTRDATE", name: "시작일", width: 120, editable: true },
  { key: "SSMENDDATE", name: "종료일", width: 120, editable: true },
  {
    key: "CTWDATECNT",
    name: "근무일",
    width: 120,
    editable: true
    // editor: checkBoxFormatter
  },
  { key: "CTWTIMECNT", name: "근무 시간", width: 120, editable: true },
  { key: "CTNOCOMECNT", name: "결근", width: 120, editable: true },
  { key: "CTLATETIME", name: "지각", width: 120, editable: true },
  { key: "CTEARLYOUTTIME", name: "조퇴", width: 120, editable: true },
  { key: "CTWTIMENORMAL", name: "기본", width: 120, editable: true },
  { key: "CTWTIMEHOLI", name: "주휴", width: 120, editable: true },
  { key: "CTWTIMEOVER", name: "연장", width: 120, editable: true },
  { key: "CTWTIMENIGHT", name: "야간", width: 120, editable: true },
  { key: "CTWTIMENIGHTOVER", name: "연야", width: 120, editable: true },
  { key: "CTHTIMEBASE", name: "기본", width: 120, editable: true },
  { key: "CTHTIMEOVER", name: "연장", width: 120, editable: true },
  { key: "CTHTIMENIGHT", name: "야간", width: 120, editable: true },
  { key: "CTHTIMENIGHTOVER", name: "연야", width: 120, editable: true }
];
const today = new Date();
const ComeCheck = props => {
  const dispatch = useDispatch();
  const { User_Data } = useSelector(state => state.Loginpage);
  const { ValList } = useSelector(state => state.ValList);
  const [CCList, setCCList] = useState("");
  const [Year, setYear] = useState(today.getFullYear());
  const [Month, setMonth] = useState(
    (today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth() + 1)
  );
  const [WPCCEditAbleDate, setWPCCEditAbleDate] = useState(
    ValList && ValList[1].WPCCEDITABLEDATE
  ); //근태수정가능일
  // 모달 - 그리드 테스트용  ------------------------
  // const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
  //   const Update_rows = rows.slice();

  //   for (let i = fromRow; i <= toRow; i++) {
  //     rows[i] = { ...rows[i], ...updated };
  //   }
  //   setMT(ModalTest ? false : true);
  //   console.log("updated", updated);
  //   return { Update_rows };
  // };
  // const [ModalTest, setMT] = useState(false);
  // const openButton = document.getElementById("open");
  // const modal = document.querySelector(".modal");
  // const openModal = () => {
  //   modal.classList.remove("hidden");
  // };
  // const closeModal = () => {
  //   modal.classList.add("hidden");
  // };
  // if (openButton) {
  //   openButton.addEventListener("click", openModal);
  // }
  // ------------------------------------------------
  // 상세근태 모달
  const [Modals, setModals] = useState(false); // 근로정보 모달 상태
  useEffect(() => {
    console.log("VALIST", ValList);
    console.log("Year :", Year, "Month :", Month);
  }, [CCList]);
  const getCellValue = value => {};

  // 담당자 모달 열기/닫기
  const handleClose = () => {
    setModals(Modals ? false : true);
  };

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
    // ShowCCList_admin();
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
    console.log("CleanComeCheckTot 함수 실행됨");
    var parm = {
      Year: Year,
      Month: Month
    };

    axios
      .post("http://localhost:5000/ComeCheck/CleanComeCheckTot", parm)
      .then(res => {
        console.log("CleanComeCheckTot res.data", res.data);
        if (res.data === "NoData") {
          console.log("CleanComeCheckTot 데이터가 없습니다");
        } else {
          console.log("CleanComeCheckTot !!!!!");
        }
      })
      .catch(err => {
        console.log("SaupHeadList 에러", err);
      });
  };
  // 근태집계를 조회하는 함수
  const ShowCCList_admin = () => {
    console.log("ShowCCList_admin 함수 실행됨");
    // setCCList("");
    var SaupDetail = document.getElementById("SaupDetail");
    var SHKeyWord = document.getElementById("SaupHead").value;
    var SDKeyWord = document.getElementById("SaupDetail").value;
    var Codes = [];

    CleanComeCheckTot(Year, Month); // 쿼리 충돌?? 여러번 클릭 시 db 멈춤
    Codes = GongLib.GetSDCode(
      SaupDetail.options[SaupDetail.selectedIndex].value
    );

    console.log("TTTTTTTTTTTTTT", Codes, Year, Month);
    var parm = {
      Year: Year,
      Month: Month,
      Codes: Codes,
      SUID: User_Data && User_Data.SUID,
      SHKeyWord: SHKeyWord,
      SDKeyWord: SDKeyWord
    };
    console.log("Parms", parm);
    axios
      .post("http://localhost:5000/ComeCheck/ShowCCList_admin", parm)
      .then(res => {
        console.log(res);
        if (res.data === "NoData") {
        } else {
          console.log("SHOWCCLIST_ADMIN    :", res.data);
          setCCList(res.data.SaupDetailList);
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
  // 상세근태 팝업 띄우는 함수

  const ComeDetailPop = () => {
    var Test;
    var url = "Test";
    // var url = "/Main/ComeCheck/ComeCheckDetail?CCList=" + CCList && CCList;
    var name = "newWindow";
    var specs =
      "width=900, height=900,right=300, toolbar=no, menubar=no,scrollbars=no, resizable=yes";
    Test = window.open(url, name, specs);
  };
  // 창 크기 조정 이벤트를 두 번 호출하는 것
  const resizeEvent = document.createEvent("HTMLEvents");
  resizeEvent.initEvent("resize", true, false);
  window.dispatchEvent(resizeEvent);
  setTimeout(() => {
    window.dispatchEvent(resizeEvent);
  }, 0);

  return (
    <div className="MainDivContainer">
      <div>
        {CCList.length !== 0 && (
          <ComeCheckDetail
            handleClose={handleClose}
            Modals={Modals}
            CCList={CCList}
            Year={Year}
            Month={Month}
          />
        )}

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
                  id="open"
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                  onClick={() => setModals(true)}
                  // onClick={() => openModal()}
                  // onClick={() => ComeDetailPop()}
                >
                  상세 설정
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
                  근태 복사
                </button>
              </td>
              <td rowSpan="2" style={{ padding: "0", height: "100%" }}>
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ width: "100%", height: "80px", padding: "0" }}
                >
                  만근 처리
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
                    <option selected defaultValue="2019">
                      2019
                    </option>
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
                    <option selected defaultValue="07">
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
                  rows={CCList && CCList}
                  getCellValue={getCellValue}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <div className="modal hidden">
        <div className="modal_overlay" />
        <div className="modal_content">
          <h1>im a modal</h1>
          <Grid_ComeCheck
            columns={Grid_ComeChecCol}
            rows={CCList && CCList}
            getCellValue={getCellValue}
          />
          <ReactDataGrid
            columns={columns}
            rowGetter={i => rows[i]}
            rowsCount={3}
            onGridRowsUpdated={onGridRowsUpdated}
            enableCellSelect={true}
          />
          <button onClick={() => closeModal()}>close</button>
        </div>
      </div> */}
    </div>
  );
};

export default ComeCheck;
