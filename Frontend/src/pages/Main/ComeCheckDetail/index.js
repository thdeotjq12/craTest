import React, { useState, useEffect } from "react";
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
import "./index.css";
import Grid_ComeCheckDetail from "./Grid_ComeCheckDetail";
import { formatRelative } from "date-fns/esm";
import WTimes from "../../../function/WTimes";
import GongLib from "../../../function/GongLib";
import axios from "axios";
const Grid_ComeCheckDetailCol = [
  { key: "CDDate", name: "근무날짜", width: 80, editable: true },
  { key: "CDDayWeek", name: "요일", width: 70, editable: true },
  { key: "DateGubun", name: "근무구분", width: 80, editable: true },
  { key: "SSWTimeStr", name: "기준시업", width: 80, editable: true },
  { key: "SSWTimeEnd", name: "기준종업", width: 80, editable: true },
  { key: "SSLTime", name: "휴게(-)", width: 50, editable: true },
  { key: "TotOriWorkTime", name: "총근로시간", width: 90, editable: true },
  { key: "CDWStrTime", name: "시업", width: 50, editable: true },
  { key: "CDWEndTime", name: "종업", width: 50, editable: true },
  { key: "TotWorkTime", name: "총근로시간", width: 90, editable: true },
  { key: "CDGubun", name: "근무처리", width: 80, editable: true },
  { key: "HTime", name: "기준적용", width: 80, editable: true },
  { key: "CDWTimeNormal", name: "기본", width: 50, editable: true },
  { key: "CDWTimeHoli", name: "주휴", width: 50, editable: true },
  { key: "CDWTimeOver", name: "연장", width: 50, editable: true },
  { key: "CDWTimeNight", name: "야간", width: 50, editable: true },
  { key: "CDHTimeBase", name: "기본", width: 50, editable: true },
  { key: "CDHTimeOver", name: "연장", width: 50, editable: true },
  { key: "CDHTimeNight", name: "야간", width: 50, editable: true },
  { key: "CDMemo", name: "메모", width: 50, editable: true }
];

const ComeCheckDetail = props => {
  const { handleClose, Modals, CCList, Year, Month } = props;
  var moment = require("moment");
  const [DetailList, setDetailList] = useState("");
  const [DetailList_Bef, setDetailList_Bef] = useState("");
  const [DetailList_Aft, setDetailList_Aft] = useState("");
  const [NowDate, setNowDate] = useState(Year + "-" + Month + "-" + "01");
  const [LastDate, setLastDate] = useState(
    Year +
      "-" +
      Month +
      "-" +
      moment(Year + "-" + Month + "-")
        .endOf("month")
        .format("DD")
  );
  //빈 배열을 useEffect의 두 번째 인수로 전달하면 마운트 및 마운트 해제시에만 실행되므로 무한 루프가 중지됩니다.
  useEffect(() => {
    SetCalenderGrid(DetailList, NowDate, LastDate);
    console.log("NowDate", NowDate, "LastDate", LastDate);
    console.log("CCList", CCList);
  }, []);
  const getCellValue = value => {};

  const Close = handleCloser => {
    props.handleClose(handleCloser);
  };
  // 스크롤 포지션 0으로 맞추기 위함 .. 나중에 구현
  const scrollBack = () => {
    window.scrollTo(0, 0);
  };

  const Save = e => {
    console.log("Save", e);
  };
  const ShowComeCheckDate = () => {};
  //현재달 달력 셋팅
  const SetCalenderNow = ShowDB => {
    var WeekDayIndex = moment(NowDate).day() + 1;
    //시작일부터 말일까지 grid에 달력을 셋팅하는 함수
    SetCalenderGrid(NowDate, LastDate);
    //이번달 달력에 일자별 근태를 조회하는 함수
    if (ShowDB) ShowComeCheckDate(DetailList);
  };
  //다음달 달력셋팅
  const SetCalendarAft = () => {
    var moment = require("moment");
    var WeekDayIndex; //셋팅되는 요일
    var iSSHoliWeek; //주휴요일
    var nowDate;
    var LastDate;
    if (DetailList.length === 0) return;
    setDetailList_Aft("");
    iSSHoliWeek = CCList[0].SSHOLIWEEK;
    if (
      moment(DetailList[DetailList.length - 1].CDDate).day() + 1 ===
      iSSHoliWeek
    )
      return;
    nowDate = moment(DetailList[DetailList.length - 1].CDDate, "YYYY-MM-DD")
      .add("days", 1)
      .format("YYYY-MM-DD"); //- iSSHoliWeek * -1, "days");
    LastDate = moment(nowDate, "YYYY-MM-DD")
      .add("days", 7 - moment(nowDate).day())
      .format("YYYY-MM-DD"); //- iSSHoliWeek * -1, "days");
    console.log(
      "nowDate AFT",
      nowDate,
      "NowDate",
      NowDate,
      DetailList[DetailList.length - 1].CDDate
    );
    console.log("LastDat AFT", LastDate, "iSSHoliWeek", iSSHoliWeek);
  };

  //이전달 달력 셋팅
  const SetCalendarBef = () => {
    var moment = require("moment");
    var WeekDayIndex; //셋팅되는 요일
    var iSSHoliWeek; //주휴요일
    var nowDate;
    var LastDate;
    if (DetailList.length === 0) return;
    setDetailList_Bef("");
    iSSHoliWeek = CCList[0].SSHOLIWEEK;
    if (moment(DetailList[0].CDDate).day() + 1 === iSSHoliWeek) return;
    nowDate = moment(NowDate, "YYYY-MM-DD")
      .add("days", (moment(NowDate).day() + 1 - iSSHoliWeek) * -1)
      .format("YYYY-MM-DD"); //- iSSHoliWeek * -1, "days");
    LastDate = NowDate;

    console.log("nowDate ggggg", nowDate, "NowDate", NowDate);
    console.log("LastDat GGGGGG", LastDate, "iSSHoliWeek", iSSHoliWeek);
  };
  //휴직 정보를 셋팅
  const SetHuejik = () => {
    var HStrDate;
    var HEndDate;
    var Hujik = DetailList;
    var parm = {
      StrDate: NowDate,
      EndDate: LastDate,
      SWGubun: CCList[0].SWGubun
    };
    var HuejikList = {};
    axios
      .post("http://localhost:5000/ComeCheckDetail/SetHuejik", parm)
      .then(res => {
        console.log(res);
        if (res.data === "NoData") {
        } else {
          HuejikList = res.data.HuejikList;
          for (let i = 0; i < HuejikList.length; i++) {
            HStrDate = HuejikList[i].SHSTRDATE;
            HEndDate = HuejikList[i].SHENDDATE;
            if (HuejikList[i].SHENDDATE <= NowDate) {
              HStrDate = NowDate;
            }
            if (HuejikList[i].SHENDDATE >= LastDate) {
              HEndDate = LastDate;
            }

            while (HStrDate <= HEndDate) {
              for (let i = 0; i < DetailList.length; i++) {
                if (DetailList[i].CDDate === HStrDate) {
                  if (HuejikList[i].SHPAYGUBUN === "0") {
                    Hujik[i].CDWSTRTIME = "";
                    Hujik[i].CDWENDTIME = "";
                    Hujik[i].CDSSTRTIME = "";
                    Hujik[i].CDSENDTIME = "";
                    Hujik[i].CDWTIME = 0;
                    Hujik[i].CDWTIMENORMAL = 0;
                    Hujik[i].CDWTIMEHOLI = 0;
                    Hujik[i].CDWTIMEOVER = 0;
                    Hujik[i].CDWTIMENIGHT = 0;
                    Hujik[i].CDWTIMENIGHTOVER = 0;
                    Hujik[i].CDHTIMEBASE = 0;
                    Hujik[i].CDHTIMEOVER = 0;
                    Hujik[i].CDHTIMENIGHT = 0;
                    Hujik[i].CDHTIMENIGHTOVER = 0;
                    Hujik[i].CDTKTIME = 0;
                    Hujik[i].SSLTIMESTR1 = "";
                    Hujik[i].SSLTIMEEND1 = "";
                    Hujik[i].SSLTIMESTR2 = "";
                    Hujik[i].SSLTIMEEND2 = "";
                    Hujik[i].SSLTIMESTR3 = "";
                    Hujik[i].SSLTIMEEND3 = "";
                    Hujik[i].SSLTIMESTR4 = "";
                    Hujik[i].SSLTIMEEND4 = "";
                    Hujik[i].SSLTIMESTR5 = "";
                    Hujik[i].SSLTIMEEND5 = "";
                  } else {
                    if (Hujik[i].CDGubun === "4") {
                      Hujik[i].CDWTIMENORMAL = 0;
                      Hujik[i].CDWTIMEHOLI = 0;
                      Hujik[i].CDWTIMEOVER = 0;
                      Hujik[i].CDWTIMENIGHT = 0;
                      Hujik[i].CDWTIMENIGHTOVER = 0;
                      Hujik[i].CDHTIMEBASE = 0;
                      Hujik[i].CDHTIMEOVER = 0;
                      Hujik[i].CDHTIMENIGHT = 0;
                      Hujik[i].CDHTIMENIGHTOVER = 0;
                      Hujik[i].CDTKTIME = 0;
                    } else {
                      Hujik[i].CDWTIMENORMAL =
                        (Hujik[i].CDWTIMENORMAL * HuejikList[i].SHPayRate) /
                        100;
                      Hujik[i].CDWTIMEHOLI = 0;
                      Hujik[i].CDWTIMEOVER =
                        (Hujik[i].CDWTIMEOVER * HuejikList[i].SHPayRate) / 100;
                      Hujik[i].CDWTIMENIGHT =
                        (Hujik[i].CDWTIMENIGHT * HuejikList[i].SHPayRate) / 100;
                      Hujik[i].CDWTIMENIGHTOVER =
                        (Hujik[i].CDWTIMENIGHTOVER * HuejikList[i].SHPayRate) /
                        100;
                      Hujik[i].CDHTIMEBASE =
                        (Hujik[i].CDHTIMEBASE * HuejikList[i].SHPayRate) / 100;
                      Hujik[i].CDHTIMEOVER =
                        (Hujik[i].CDHTIMEOVER * HuejikList[i].SHPayRate) / 100;
                      Hujik[i].CDHTIMENIGHT =
                        (Hujik[i].CDHTIMENIGHT * HuejikList[i].SHPayRate) / 100;
                      Hujik[i].CDHTIMENIGHTOVER =
                        (Hujik[i].CDHTIMENIGHTOVER * HuejikList[i].SHPayRate) /
                        100;
                      Hujik[i].CDTKTIME =
                        (Hujik[i].CDTKTIME * HuejikList[i].SHPayRate) / 100;
                    }
                  }
                  Hujik[i].CDGubun = "7"; // 휴직처리
                  break;
                }
              }
              HStrDate = moment(HStrDate, "YYYY-MM-DD")
                .add("days", 1)
                .format("YYYY-MM-DD");
            }
          }
          setDetailList(Hujik);
        }
      })
      .catch(err => {
        console.log("SaupHeadList 에러", err);
      });
  };
  //입퇴사에 관하여 입사이전과 퇴사이후는 무급휴일로 자동 셋팅하는 함수
  const SetInOutDate = () => {
    var moment = require("moment");
    var InOutDate = DetailList;
    //이번달이 사업참여 시작일이 포함된 경우
    if (
      moment(NowDate, "YYYY-MM-DD").format("YYYY-MM-DD") === //현재 화면상의 년월
      CCList[0].SSMStrDate //사업참여 시작년월
    ) {
      for (let i = 0; i < DetailList.length; i++) {
        //그리드상의 근무 일자가 사업참여 시작 전인 경우.
        if (DetailList[i].CDDate < CCList[0].SSMStrDate) {
          InOutDate[i].CDGubun = "5";
          // GongLib.SetCellEditExit;
        }
      }
    }
  };
  // 1. 이 함수를 Show이벤트에서 호출하여 휴일 목록을 만들고 휴일에 해당하는 날짜가
  // 2. 정상 근무인경우 WTimes.Holidays.CHCCGubun를 해당일에 근무 구분으로 변경한다.
  const SetHolidays = (StrDate, EndDate, SWGubun) => {
    // WTimes.WTimes.STCode
    var parm = {
      StrDate: NowDate,
      EndDate: LastDate,
      SWGubun: CCList[0].SWGubun
    };
    var HoliList = {};
    axios
      .post("http://localhost:5000/ComeCheckDetail/SetHolidays", parm)
      .then(res => {
        console.log(res);
        if (res.data === "NoData") {
        } else {
          HoliList = res.data.HolidaysList;
          for (let i = 0; i < HoliList.length; i++) {}
          WTimes.AddHolidays(
            HoliList.CHCode,
            HoliList.CHGubun,
            HoliList.CHName,
            HoliList.CHDate,
            HoliList.CHMemo,
            HoliList.CHCCGubun
          );
        }
      })
      .catch(err => {
        console.log("SaupHeadList 에러", err);
      });
  };
  const SetCalenderGrid = (TList, StrDate, EndDate) => {
    console.log("SetCalenderGrid 실행됨");

    var moment = require("moment");
    var WeekDayIndex = moment(StrDate).day() + 1; // 2
    var RowCount = moment(EndDate).diff(moment(StrDate), "days") + 1; //31
    var List = {};
    console.log("RowCount", RowCount);
    StrDate = moment(StrDate).format("YYYY-MM-DD");
    for (let i = 0; i < RowCount; i++) {
      List[i] = { Test: "123" };
      List[i] = { CDDate: StrDate };
      List[i].CDDayWeek = WeekDayIndex;
      if (List[i].CDDayWeek === CCList[0].SSHoliWeek)
        List[i] = { DateGubun: "1" };
      else if (
        (WeekDayIndex === 1 && CCList[0].SSWEEK1YN === "Y") ||
        (WeekDayIndex === 2 && CCList[0].SSWEEK2YN === "Y") ||
        (WeekDayIndex === 3 && CCList[0].SSWEEK3YN === "Y") ||
        (WeekDayIndex === 4 && CCList[0].SSWEEK4YN === "Y") ||
        (WeekDayIndex === 5 && CCList[0].SSWEEK5YN === "Y") ||
        (WeekDayIndex === 6 && CCList[0].SSWEEK6YN === "Y") ||
        (WeekDayIndex === 7 && CCList[0].SSWEEK7YN === "Y")
      )
        List[i].DateGubun = "0";
      else List[i].DateGubun = "2";
      List[i].SSWTimeStr = CCList[0].SSWTIMESTR;
      List[i].SSWTimeEnd = CCList[0].SSWTIMEEND;
      List[i].SSLTimeStr1 = CCList[0].SSLTIMESTR1;
      List[i].SSLTimeEnd1 = CCList[0].SSLTIMEEND1;
      List[i].SSLTimeStr2 = CCList[0].SSLTIMESTR2;
      List[i].SSLTimeEnd2 = CCList[0].SSLTIMEEND2;
      List[i].SSLTimeStr3 = CCList[0].SSLTIMESTR3;
      List[i].SSLTimeEnd3 = CCList[0].SSLTIMEEND3;
      List[i].SSLTimeStr4 = CCList[0].SSLTIMESTR4;
      List[i].SSLTimeEnd4 = CCList[0].SSLTIMEEND4;
      List[i].SSLTimeStr5 = CCList[0].SSLTIMESTR5;
      List[i].SSLTimeEnd5 = CCList[0].SSLTIMEEND5;
      //근로시간 셋팅
      List[i].CDWStrTime = "";
      List[i].CDWEndTime = "";
      List[i].SSLTime = 0;
      List[i].TotOriWorkTime = 0;
      List[i].CDHTime = 0;
      List[i].CDSStrTime = "";
      List[i].CDSEndTime = "";
      List[i].HTime = 0;
      List[i].TotWorkTime = 0;
      //근무구분
      if (List[i].DateGubun === 0)
        List[i].CDGubun = WTimes.getHolidayCCGubun(List[i].CDDate, "0");
      else if (List[i].DateGubun === 1) {
        List[i].CDGubun = "6"; //주휴일
      } else if (List[i].DateGubun === 2) {
        List[i].CDGubun = "5"; //무휴일
      }

      List[i].btnBaseWTime = "입력";
      List[i].CDWTime = 0;
      List[i].CDWTimeNormal = 0;
      List[i].CDWTimeHoli = 0;
      List[i].CDWTimeOver = 0;
      List[i].CDWTimeNight = 0;
      List[i].CDWTimeNightOver = 0;
      List[i].CDHTimeBase = 0;
      List[i].CDHTimeOver = 0;
      List[i].CDHTimeNight = 0;
      List[i].CDHTimeNightOver = 0;
      List[i].CDTkTime = 0;
      List[i].CDMemo = 0;
      List[i].ChangeGubun = 0;
      StrDate = moment(StrDate, "YYYY-MM-DD")
        .add("days", 1)
        .format("YYYY-MM-DD");
      WeekDayIndex = WeekDayIndex + 1;
      if (WeekDayIndex > 7) WeekDayIndex = 1;
    }

    console.log("List  :", List);
    if (TList === DetailList) {
      console.log("TList === DetailList");
      setDetailList(Object.values(List));
      console.log("DetailList Done", DetailList);
    } else if (TList === DetailList_Bef) {
      console.log("TList === DetailList_Bef");
      if (DetailList_Bef === null) {
        setDetailList_Bef(Object.assign(DetailList, List));
      }
    } else {
      console.log("TList === setDetailList_Aft");
      if (DetailList_Aft === null) {
        setDetailList_Aft(Object.assign(DetailList, List));
      }
    }
    return List;
  };

  return (
    <Modal
      show={Modals}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="ModalContainer"
      // centered
      // modal-dialog
      // modal-lg
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          상세근태
          <div
            style={{
              float: "right"
            }}
          />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="MainDivContainer">
          <div>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td className="ColGubun">추진사업</td>
                  <td id="TdInput">
                    <input
                      className="InputContainer"
                      value={CCList[0].SHNAMESHORT}
                    />
                  </td>
                  <td className="ColGubun">사원명</td>
                  <td id="TdInput">
                    <input
                      className="InputContainer"
                      value={CCList[0].STNAMEKOR}
                    />
                  </td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    style={{
                      float: "right"
                    }}
                    onClick={() => [SetCalendarBef(), SetCalendarAft()]}
                  >
                    엑셀
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    style={{
                      float: "right"
                    }}
                  >
                    만근처리
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    style={{
                      float: "right"
                    }}
                  >
                    저장
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    style={{
                      float: "right"
                    }}
                  >
                    닫기
                  </button>
                </tr>
                <tr>
                  <td className="ColGubun">세부사업</td>
                  <td id="TdInput">
                    <input
                      className="InputContainer"
                      value={CCList[0].SDNAME}
                    />
                  </td>
                  <td className="ColGubun">근로구분</td>
                  <td id="TdInput">
                    <input
                      className="InputContainer"
                      value={CCList[0].SSMGUBUN}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <Grid_ComeCheckDetail
                columns={Grid_ComeCheckDetailCol}
                rows={DetailList}
                getCellValue={getCellValue}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">저장</Button>

        <Button onClick={() => Close(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ComeCheckDetail;
