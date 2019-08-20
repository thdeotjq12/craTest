import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { Editors, Formatters } from "react-data-grid-addons";
import WTimes from "../../../function/WTimes";
import {
  ComeCheckDetail_REQUEST,
  ComeCheckDetail_SUCCESS,
  ComeCheckDetail_AFT_REQUEST,
  ComeCheckDetail_BFR_REQUEST
} from "../../../modules/Main/ComeCheckDetail/ComeCheckDetailReducer";
import GongLib from "../../../function/GongLib";
import InfraLib from "../../../function/InfraLib";
import axios from "axios";
import { watchFile } from "fs";
import { promises } from "dns";
const issueTypes = [
  { id: "bug", value: "Bug" },
  { id: "epic", value: "Epic" },
  { id: "CDGubun", value: "CDGubun" }
];
const { DropDownEditor } = Editors;
const { DropDownFormatter } = Formatters;
const IssueTypeEditor = <DropDownEditor options={issueTypes} />;
const TitleTypesFormatter = <DropDownFormatter options={issueTypes} />;
const Grid_ComeCheckDetailCol = [
  { key: "CDDate", name: "근무날짜", width: 120, editable: true },
  { key: "CDDayWeek", name: "요일", width: 70, editable: true },
  { key: "DateGubun", name: "근무구분", width: 80, editable: true },
  { key: "SSWTimeStr", name: "기준시업", width: 80, editable: true },
  { key: "SSWTimeEnd", name: "기준종업", width: 80, editable: true },
  { key: "SSLTime", name: "휴게(-)", width: 50, editable: true },
  { key: "TotOriWorkTime", name: "총근로시간", width: 90, editable: true },
  { key: "CDWStrTime", name: "시업", width: 50, editable: true },
  { key: "CDWEndTime", name: "종업", width: 50, editable: true },
  { key: "TotWorkTime", name: "총근로시간", width: 90, editable: true },
  {
    key: "CDGubun",
    name: "근무처리",
    width: 80,
    editable: true,
    formatter: TitleTypesFormatter,
    editor: IssueTypeEditor
  },
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
  const {
    CCDetailLoading,
    CCDetail_AFTLoading,
    CCDetail_BFRLoading
  } = useSelector(state => state.ComeCheckDetail);
  const dispatch = useDispatch();
  var moment = require("moment");
  var CDDate = 0;
  var DateGubun = 1;
  var CDDayWeek = 2;
  var CDGubun = 3;
  var SSWTimeStr = 4;
  var SSWTimeEnd = 5;
  var CDWStrTime = 6;
  var CDWEndTime = 7;
  var SSLTimeStr1 = 8;
  var SSLTimeEnd1 = 9;
  var SSLTimeStr2 = 10;
  var SSLTimeEnd2 = 11;
  var SSLTimeStr3 = 12;
  var SSLTimeEnd3 = 13;
  var SSLTimeStr4 = 14;
  var SSLTimeEnd4 = 15;
  var SSLTimeStr5 = 16;
  var SSLTimeEnd5 = 17;
  var HTime = 18;
  var CDHTime = 19;
  var TotWorkTime = 20;
  var CDSStrTime = 21;
  var CDSEndTime = 22;
  var CDWTimeNormal = 23;
  var CDWTimeHoli = 24;
  var CDWTimeOver = 25;
  var CDWTimeNight = 26;
  var CDWTimeNightOver = 27;
  var CDHTimeBase = 28;
  var CDHTimeOver = 29;
  var CDHTimeNight = 30;
  var CDHTimeNightOver = 31;
  var CDTkTime = 32;
  var CDNoComeCNT = 33;
  var CDLateTime = 34;
  var CDEarlyOutTime = 35;
  var CDTkTime = 36;
  var CDNoComeCNT = 37;
  var CDLateTime = 38;
  var CDEarlyOutTime = 39;
  var CDMemoImage = 40;
  var CDMemo = 41;
  var ChangeGubun = 42;

  const { ValList } = useSelector(state => state.ValList);
  const [HoliDays, SetHoli] = useState(""); // 휴일 리스트
  const [Flag, setFlag] = useState(true);
  const [flagNow, setFN] = useState(true);
  const [flagBef, setFB] = useState(true);
  const [flagAft, setFA] = useState(true);
  const [DetailList, setDetailList] = useState(""); // 현재달력 리스트
  const [DetailList_Bef, setDetailList_Bef] = useState(""); //지난달 리스트
  const [DetailList_Aft, setDetailList_Aft] = useState(""); //다음달 리스트
  const [MuHueWeek, setMuHueWeek] = useState(""); //무휴요일
  const [NowDate, setNowDate] = useState(Year + "-" + Month + "-" + "01"); //현재달 첫째날
  const [LastDate, setLastDate] = useState(
    // 현재달 마지막날
    Year +
      "-" +
      Month +
      "-" +
      moment(Year + "-" + Month + "-")
        .endOf("month")
        .format("DD")
  );
  const [Mode, setMode] = useState("일반"); // 만근/일반

  //빈 배열을 useEffect의 두 번째 인수로 전달하면 마운트 및 마운트 해제시에만 실행되므로 무한 루프가 중지됩니다.
  //useEffect 는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정
  useEffect(() => {
    SetCalendar(true);
    // SetCalenderGrid(DetailList, NowDate, LastDate);
    console.log("ComeCheckDetail USEEFEECT 실행됨");

    console.log("NowDate", NowDate, "LastDate", LastDate);
    console.log("CCList", CCList);
  }, [DetailList, DetailList_Aft, DetailList_Bef]); //[DetailList, DetailList_Aft, DetailList_Bef]
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
  //만근처리 버튼 클릭
  const btnSetAllComeOkClick = () => {
    setMode("만근");
    var AllComeOkList;
    AllComeOkList = DetailList;

    if (!AllComeOkList || !CCList) return;
    for (let i = 0; i < AllComeOkList.length; i++) {
      AllComeOkList[i].CDHTime = 0;
    }
    setDetailList(AllComeOkList);
    SetCalendar(false); //달력을 셋팅하는 함수

    for (let i = 0; i < AllComeOkList.length; i++) {
      if (
        moment(CCList[0].SSMSTRDATE).format("YYYY") ===
          moment(NowDate).format("YYYY") &&
        moment(CCList[0].SSMSTRDATE).format("MM") ===
          moment(NowDate).format("MM") &&
        moment(CCList[0].SSMSTRDATE).day() >
          moment(AllComeOkList[i].CDDate).day()
      ) {
        //이번달이 사업 시작일이 있는 경우. 사업 시작일 이전이면 근무 구분 없음 처리
        AllComeOkList[i].CDGubun = "";
      }
      if (
        moment(CCList[0].SSMENDDATE).format("YYYY") ===
          moment(NowDate).format("YYYY") &&
        moment(CCList[0].SSMENDDATE).format("MM") ===
          moment(NowDate).format("MM") &&
        moment(CCList[0].SSMENDDATE).day() <
          moment(AllComeOkList[i].CDDate).day()
      ) {
        //이번달이 사업 종료일이 있는 경우. 사업 종료일 이후면 근무 구분 없음 처리
        AllComeOkList[i].CDGubun = "";
      }
      if (AllComeOkList[i].CDGubun === "0") {
        //정상근무일때
        AllComeOkList[i].CDWStrTime = AllComeOkList[i].SSWTimeStr;
        AllComeOkList[i].CDWEndTime = AllComeOkList[i].SSWTimeEnd;
        //휴게시간 계산
        AllComeOkList[i].SSLTime =
          InfraLib.CalcTimeTermFloat(
            AllComeOkList[i].SSLTimeStr1,
            AllComeOkList[i].SSLTimeEnd1
          ) +
          InfraLib.CalcTimeTermFloat(
            AllComeOkList[i].SSLTimeStr2,
            AllComeOkList[i].SSLTimeEnd2
          ) +
          InfraLib.CalcTimeTermFloat(
            AllComeOkList[i].SSLTimeStr3,
            AllComeOkList[i].SSLTimeEnd4
          ) +
          InfraLib.CalcTimeTermFloat(
            AllComeOkList[i].SSLTimeStr4,
            AllComeOkList[i].SSLTimeEnd4
          ) +
          InfraLib.CalcTimeTermFloat(
            AllComeOkList[i].SSLTimeStr5,
            AllComeOkList[i].SSLTimeEnd5
          );
        //소정근로 총 근로시간
        AllComeOkList[i].TotOriWorkTime =
          InfraLib.TimeTermMinuteStr(
            AllComeOkList[i].SSWTimeStr,
            AllComeOkList[i].SSWTimeEnd
          ) /
            60 -
          AllComeOkList[i].SSLTime; // 총근로시간
      } else {
        //기타 특근, 대근, 결근, 연차처리, 무급휴일, 유급휴일, 휴직, 휴일근무 일때
        AllComeOkList[i].CDWStrTime = "";
        AllComeOkList[i].CDWEndTime = "";
        //휴게시간 계산
        AllComeOkList[i].SSLTime = 0;
        //총근로시간 계산
        AllComeOkList[i].TotOriWorkTime = 0;
      }
      AllComeOkList[i].ChangeGubun = "N";
      console.log("TEST", AllComeOkList, ValList);
      ValList &&
        setDetailList(
          GongLib.SetCellEditExit(
            AllComeOkList,
            null,
            null,
            i,
            CCList[0].SSWTIMEOFDAYLIMIT,
            false,
            CCList[0].SSNIGHTSTRWTIME,
            CCList[0].SSNIGHTENDWTIME,
            CCList[0].SSLTIMEGUBUN1,
            CCList[0].SSLTIMEGUBUN2,
            CCList[0].SSLTIMEGUBUN3,
            CCList[0].SSLTIMEGUBUN4,
            CCList[0].SSLTIMEGUBUN5,
            CCList[0].SSHOLIWEEK,
            CCList[0].SSHOLIPAYYN,
            CDDate,
            DateGubun,
            CDDayWeek,
            CDGubun,
            SSWTimeStr,
            SSWTimeEnd,
            CDWStrTime,
            CDWEndTime,
            SSLTimeStr1,
            SSLTimeEnd1,
            SSLTimeStr2,
            SSLTimeEnd2,
            SSLTimeStr3,
            SSLTimeEnd3,
            SSLTimeStr4,
            SSLTimeEnd4,
            SSLTimeStr5,
            SSLTimeEnd5,
            HTime,
            CDHTime,
            TotWorkTime,
            CDSStrTime,
            CDSEndTime,
            CDWTimeNormal,
            CDWTimeHoli,
            CDWTimeOver,
            CDWTimeNight,
            CDWTimeNightOver,
            CDHTimeBase,
            CDHTimeOver,
            CDHTimeNight,
            CDHTimeNightOver,
            CDTkTime, //특근 인덱스
            CDNoComeCNT,
            CDLateTime,
            CDEarlyOutTime,
            false,
            ValList
          )
        );
      ClearJuhueByOut(AllComeOkList);
    }
  };

  //이번달 달력에 일자별 근태를 조회하는 함수
  function ShowComeCheckDate(grid) {
    if (grid.length === 0) {
      return;
    }
    console.log(" ### @@@  ### @@@ ShowComeCheckDate 실행됨");
    var parm = {
      StrDate: grid[0].CDDate,
      EndDate: grid[grid.length - 1].CDDate,
      STCode: CCList[0].SSMSTCODE,
      SHCode: CCList[0].SDSHCODE,
      SDCode: CCList[0].SDCODE
    };

    var ComeCheckDateList = {};
    var ComeCheckList;
    grid && (ComeCheckList = grid);
    dispatch({
      type: ComeCheckDetail_REQUEST // true
    });
    if (CCDetailLoading) {
      console.log(" # ComeCheckDateList[i] parm", parm);

      axios
        .post("http://localhost:5000/ComeCheckDetail/SetComeCheckDate", parm)
        .then(res => {
          console.log(res);
          if (res.data === "NoData") {
          } else {
            // if (!ComeCheckList && CCDetailLoading) return;
            ComeCheckDateList = res.data.ComeCheckDateList;
            console.log(" ###  ComeCheckDateList", ComeCheckDateList);
            for (let i = 0; i < ComeCheckDateList.length; i++) {
              if (ComeCheckList[i].CDDate === ComeCheckDateList[i].CDDATE) {
                // ComeCheckList = ComeCheckDateList[i].CHCODE;
                console.log("#### #### #### ####", ComeCheckList[i].CDDate);

                ComeCheckList[i].CDWEndTime = ComeCheckDateList[i].CDWENDTIME;
                ComeCheckList[i].CDSStrTime = ComeCheckDateList[i].CDSSTRTIME;
                ComeCheckList[i].CDSEndTime = ComeCheckDateList[i].CDSENDTIME;
                ComeCheckList[i].CDGubun = ComeCheckDateList[i].CDGUBUN;
                ComeCheckList[i].CDHTime = ComeCheckDateList[i].CDHTIME;
                ComeCheckList[i].CDWTimeNormal =
                  ComeCheckDateList[i].CDWTIMENORMAL;
                ComeCheckList[i].CDWTimeHoli = ComeCheckDateList[i].CDWTIMEHOLI;
                ComeCheckList[i].CDWTimeOver = ComeCheckDateList[i].CDWTIMEOVER;
                ComeCheckList[i].CDWTimeNight =
                  ComeCheckDateList[i].CDWTIMENIGHT;
                ComeCheckList[i].CDWTimeNightOver =
                  ComeCheckDateList[i].CDWTIMENIGHTOVER;
                ComeCheckList[i].CDHTimeBase = ComeCheckDateList[i].CDHTIMEBASE;
                ComeCheckList[i].CDHTimeOver = ComeCheckDateList[i].CDHTIMEOVER;
                ComeCheckList[i].CDHTimeNight =
                  ComeCheckDateList[i].CDHTIMENIGHT;
                ComeCheckList[i].CDHTimeNightOver =
                  ComeCheckDateList[i].CDHTIMENIGHTOVER;
                ComeCheckList[i].CDTkTime = ComeCheckDateList[i].CDTKTIME;
                ComeCheckList[i].CDNoComeCNT = ComeCheckDateList[i].CDNOCOMECNT;
                ComeCheckList[i].CDLateTime = ComeCheckDateList[i].CDLATETIME;
                ComeCheckList[i].CDEarlyOutTime =
                  ComeCheckDateList[i].CDEARLYOUTTIME;
                ComeCheckList[i].CDMemo = ComeCheckDateList[i].CDMEMO;
                ComeCheckList[i].ChangeGubun = ""; //DB에서 불러온 근태이므로 변경구분을 N에서 공백으로 변경해 준다.
                console.log("TTTTTTTTFFFFFFFFF 1", ComeCheckList);
                // break;
              }
            }
            // dispatch({
            //   type: ComeCheckDetail_SUCCESS
            // });
          }
        })

        .catch(err => {
          console.log("ComeCheckList 에러", err);
        });
      for (let i = 0; i < ComeCheckList.length; i++) {
        //휴게시간 계산
        ComeCheckList[i].SSLTime =
          InfraLib.CalcTimeTermFloat(
            ComeCheckList[i].SSLTimeStr1,
            ComeCheckList[i].SSLTimeEnd1
          ) +
          InfraLib.CalcTimeTermFloat(
            ComeCheckList[i].SSLTimeStr2,
            ComeCheckList[i].SSLTimeEnd2
          ) +
          InfraLib.CalcTimeTermFloat(
            ComeCheckList[i].SSLTimeStr3,
            ComeCheckList[i].SSLTimeEnd3
          ) +
          InfraLib.CalcTimeTermFloat(
            ComeCheckList[i].SSLTimeStr4,
            ComeCheckList[i].SSLTimeEnd4
          ) +
          InfraLib.CalcTimeTermFloat(
            ComeCheckList[i].SSLTimeStr5,
            ComeCheckList[i].SSLTimeEnd5
          );
        //소정근로 총근로시간

        ComeCheckList[i].TotOriWorkTime =
          ComeCheckList[i].SSWTimeStr &&
          ComeCheckList[i].SSWTimeEnd &&
          InfraLib.TimeTermMinuteStr(
            ComeCheckList[i].SSWTimeStr,
            ComeCheckList[i].SSWTimeEnd
          ) /
            60 -
            ComeCheckList[i].SSLTime;

        grid = GongLib.SetCellEditExit(
          ComeCheckList,
          null,
          null,
          i,
          CCList[0].SSWTIMEOFDAYLIMIT,
          false,
          CCList[0].SSNIGHTSTRWTIME,
          CCList[0].SSNIGHTENDWTIME,
          CCList[0].SSLTIMEGUBUN1,
          CCList[0].SSLTIMEGUBUN2,
          CCList[0].SSLTIMEGUBUN3,
          CCList[0].SSLTIMEGUBUN4,
          CCList[0].SSLTIMEGUBUN5,
          CCList[0].SSHOLIWEEK,
          CCList[0].SSHOLIPAYYN,
          CDDate,
          DateGubun,
          CDDayWeek,
          CDGubun,
          SSWTimeStr,
          SSWTimeEnd,
          CDWStrTime,
          CDWEndTime,
          SSLTimeStr1,
          SSLTimeEnd1,
          SSLTimeStr2,
          SSLTimeEnd2,
          SSLTimeStr3,
          SSLTimeEnd3,
          SSLTimeStr4,
          SSLTimeEnd4,
          SSLTimeStr5,
          SSLTimeEnd5,
          HTime,
          CDHTime,
          TotWorkTime,
          CDSStrTime,
          CDSEndTime,
          CDWTimeNormal,
          CDWTimeHoli,
          CDWTimeOver,
          CDWTimeNight,
          CDWTimeNightOver,
          CDHTimeBase,
          CDHTimeOver,
          CDHTimeNight,
          CDHTimeNightOver,
          CDTkTime, //특근 인덱스
          CDNoComeCNT,
          CDLateTime,
          CDEarlyOutTime,
          false,
          ValList
        );
      }
      setTimeout(() => {}, 5000);
      if (grid === DetailList) {
        // 스스로를 결정하는 thenable 에서 Promise.resolve 를 호출하면 안됩니다. 이는 무한히 중첩된 프로미스를 펼치려고하므로 무한 재귀를 유발할 것입니다.
        setDetailList(grid);
        dispatch({
          type: ComeCheckDetail_SUCCESS
        });
        console.log("★★ (1) 종료됨");
      } else if (grid === DetailList_Bef) {
        setDetailList_Bef(grid);
        dispatch({
          type: ComeCheckDetail_SUCCESS
        });
        console.log("★★ (2) 종료됨");
      } else {
        setDetailList_Aft(grid);
        dispatch({
          type: ComeCheckDetail_SUCCESS
        });
        console.log("★★ (3) 종료됨");
      }
      ClearJuhueByOut(grid);
    }
  }
  const CDListValueChanged = () => {
    if (DetailList.length === 0) return;
  };

  //현재달 달력 셋팅
  function SetCalendarNow(ShowDB) {
    setFN(false);
    console.log("★★ Now 실행됨");
    //시작일부터 말일까지 grid에 달력을 셋팅하는 함수
    SetCalenderGrid(DetailList, NowDate, LastDate);
    //이번달 달력에 일자별 근태를 조회하는 함수
    ShowComeCheckDate(DetailList);

    return;
    // return new Promise(function(resolve) {
    //   setTimeout(async () => {
    //     await ShowComeCheckDate(DetailList);
    //   }, 3000);
    // });
  }

  //다음달 달력셋팅
  function SetCalendarAft() {
    setFB(false);
    console.log("★★ AFT 실행됨");
    var moment = require("moment");
    var WeekDayIndex; //셋팅되는 요일
    var iSSHoliWeek; //주휴요일
    var nowDate;
    var LastDate;
    if (DetailList.length === 0) return;

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
    console.log("AFT nowDate ", nowDate, "AFT LastDate ", LastDate);
    SetCalenderGrid(DetailList_Aft, nowDate, LastDate);
    DetailList_Aft && ShowComeCheckDate(DetailList_Aft);
    return;
    // return new Promise(function(resolve) {
    //   setTimeout(() => {
    //     ShowComeCheckDate(DetailList_Aft);
    //   }, 3000);
    // });
  }

  //이전달 달력 셋팅
  function SetCalendarBef() {
    setFA(false);
    console.log("★★ Bef 실행됨");
    var moment = require("moment");
    var WeekDayIndex; //셋팅되는 요일
    var iSSHoliWeek; //주휴요일
    var nowDate;
    var LastDate;
    if (DetailList.length === 0) return;

    iSSHoliWeek = CCList[0].SSHOLIWEEK;
    if (moment(DetailList[0].CDDate).day() + 1 === iSSHoliWeek) return;
    nowDate = moment(NowDate, "YYYY-MM-DD")
      .add("days", (moment(NowDate).day() + 1 - iSSHoliWeek) * -1)
      .format("YYYY-MM-DD"); //- iSSHoliWeek * -1, "days");
    LastDate = moment(nowDate)
      .endOf("month")
      .format("YYYY-MM-DD");
    console.log("Bef NowDate", nowDate, "Bef LastDat ", LastDate);
    SetCalenderGrid(DetailList_Bef, nowDate, LastDate);
    DetailList_Bef && ShowComeCheckDate(DetailList_Bef);
    return;
    // return new Promise(function(resolve) {
    //   setTimeout(() => {
    //     DetailList_Bef && ShowComeCheckDate(DetailList_Bef);
    //   }, 3000);
    // });
  }
  //달력을 셋팅하는 함수

  function SetCalendar(ShowDB) {
    console.log("SetCalendar 실행됨 #####");

    SetHolidays(NowDate, LastDate, CCList[0].SSSWGUBUN);
    //연장가산요일 선택
    //1일 2월 3화 4수 5목 6금 7토
    if ((CCList[0].SSHOLIWEEK = "1")) setMuHueWeek("7");
    else if ((CCList[0].SSHOLIWEEK = "2")) setMuHueWeek("1");
    else if ((CCList[0].SSHOLIWEEK = "3")) setMuHueWeek("2");
    else if ((CCList[0].SSHOLIWEEK = "4")) setMuHueWeek("3");
    else if ((CCList[0].SSHOLIWEEK = "5")) setMuHueWeek("4");
    else if ((CCList[0].SSHOLIWEEK = "6")) setMuHueWeek("5");
    else if ((CCList[0].SSHOLIWEEK = "7")) setMuHueWeek("6");

    SetCalendarNow(true); //이번달 달력 셋팅//반드시 이번달 먼저 셋팅해야 이전달과 다음달을 이번달에서 필요한 만큼만 조회해서 그리드에 셋팅한다.
    SetCalendarBef(); //이전달 달력 셋팅
    SetCalendarAft(); //다음달 달력 셋팅
    //await은 내 메소드의 실행을 일시중지시킵니다. promise의 값이 사용가능할 때까지요.
    SetHuejik(); //휴직 정보를 셋팅
    SetInOutDate(); ////입퇴사에 관하여 입사이전과 퇴사이후는 무급휴일로 자동 셋팅하는 함수
    SetMuhueOverTime(); //전체라인에 대해서 무휴일(주휴 직전일)에 추가연장을 계산하는 함수

    ClearJuhueByOut(DetailList); //근무구분중 결근이 있으면 해당 주의 주휴를 제거하는 함수
  }
  //휴직 정보를 셋팅
  const SetHuejik = () => {
    var HStrDate;
    var HEndDate;
    var Hujik = DetailList;
    var parm = {
      STCode: CCList[0].STCODE,
      StrDate: NowDate,
      EndDate: LastDate
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
            setDetailList(Hujik);
          }
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
      moment(NowDate).format("YYYY-MM-DD") === CCList[0].SSMSTRDATE //현재 화면상의 년월 //사업참여 시작년월
    ) {
      for (let i = 0; i < DetailList.length; i++) {
        //그리드상의 근무 일자가 사업참여 시작 전인 경우.
        if (DetailList[i].CDDate < CCList[0].SSMSTRDATE) {
          InOutDate[i].CDGubun = "5"; //무급휴무로 설정
          setDetailList(
            GongLib.SetCellEditExit(
              InOutDate,
              null,
              null,
              i,
              CCList[0].SSWTIMEOFDAYLIMIT,
              false,
              CCList[0].SSNIGHTSTRWTIME,
              CCList[0].SSNIGHTENDWTIME,
              CCList[0].SSLTIMEGUBUN1,
              CCList[0].SSLTIMEGUBUN2,
              CCList[0].SSLTIMEGUBUN3,
              CCList[0].SSLTIMEGUBUN4,
              CCList[0].SSLTIMEGUBUN5,
              CCList[0].SSHOLIWEEK,
              CCList[0].SSHOLIPAYYN,
              CDDate,
              DateGubun,
              CDDayWeek,
              CDGubun,
              SSWTimeStr,
              SSWTimeEnd,
              CDWStrTime,
              CDWEndTime,
              SSLTimeStr1,
              SSLTimeEnd1,
              SSLTimeStr2,
              SSLTimeEnd2,
              SSLTimeStr3,
              SSLTimeEnd3,
              SSLTimeStr4,
              SSLTimeEnd4,
              SSLTimeStr5,
              SSLTimeEnd5,
              HTime,
              CDHTime,
              TotWorkTime,
              CDSStrTime,
              CDSEndTime,
              CDWTimeNormal,
              CDWTimeHoli,
              CDWTimeOver,
              CDWTimeNight,
              CDWTimeNightOver,
              CDHTimeBase,
              CDHTimeOver,
              CDHTimeNight,
              CDHTimeNightOver,
              CDTkTime, //특근 인덱스
              CDNoComeCNT,
              CDLateTime,
              CDEarlyOutTime,
              false,
              ValList
            )
          );
        }
      }
    }
    //퇴사일 이후 근무를 무급휴일로 처리
    if (
      moment(NowDate).format("YYYY-MM-DD") === CCList[0].SSMENDDATE //현재 화면상의 년월 //사업참여 시작년월
    ) {
      for (let i = 0; i < DetailList.length; i++) {
        //그리드상의 근무 일자가 사업참여 시작 전인 경우.
        if (DetailList[i].CDDate > CCList[0].SSMENDDATE) {
          InOutDate[i].CDGubun = "5"; //무급휴무로 설정
          setDetailList(
            GongLib.SetCellEditExit(
              InOutDate,
              null,
              null,
              i,
              CCList[0].SSWTIMEOFDAYLIMIT,
              false,
              CCList[0].SSNIGHTSTRWTIME,
              CCList[0].SSNIGHTENDWTIME,
              CCList[0].SSLTIMEGUBUN1,
              CCList[0].SSLTIMEGUBUN2,
              CCList[0].SSLTIMEGUBUN3,
              CCList[0].SSLTIMEGUBUN4,
              CCList[0].SSLTIMEGUBUN5,
              CCList[0].SSHOLIWEEK,
              CCList[0].SSHOLIPAYYN,
              CDDate,
              DateGubun,
              CDDayWeek,
              CDGubun,
              SSWTimeStr,
              SSWTimeEnd,
              CDWStrTime,
              CDWEndTime,
              SSLTimeStr1,
              SSLTimeEnd1,
              SSLTimeStr2,
              SSLTimeEnd2,
              SSLTimeStr3,
              SSLTimeEnd3,
              SSLTimeStr4,
              SSLTimeEnd4,
              SSLTimeStr5,
              SSLTimeEnd5,
              HTime,
              CDHTime,
              TotWorkTime,
              CDSStrTime,
              CDSEndTime,
              CDWTimeNormal,
              CDWTimeHoli,
              CDWTimeOver,
              CDWTimeNight,
              CDWTimeNightOver,
              CDHTimeBase,
              CDHTimeOver,
              CDHTimeNight,
              CDHTimeNightOver,
              CDTkTime, //특근 인덱스
              CDNoComeCNT,
              CDLateTime,
              CDEarlyOutTime,
              false,
              ValList
            )
          );
        }
      }
    }
  };
  //전체라인에 대해서 무휴일(주휴 직전일)에 추가연장을 계산하는 함수
  const SetMuhueOverTime = () => {
    //연장가산일은 사원 명부에서 설정된 주휴일 직전일로보고 계산한다.
    var MuhueOverTime = DetailList;

    for (let i = 0; i < DetailList.length; i++) {
      if (DetailList[i].CDGubun === "1") continue;
      if (String(moment(DetailList[i].CDDate).day() + 1) === MuHueWeek) {
        console.log(" MuhueOverTimeCheck");
        //무휴일로 인정
        //무휴일에 대해 주간 소정근로시간 초과, 또는 법정주간근로시간(40시간)초과시 연장근무로 셋팅하는 함수
        MuhueOverTime = GongLib.MuhueOverTimeCheck(
          false,
          DetailList,
          DetailList_Bef,
          DetailList_Aft,
          DetailList[i].CDDate,
          DetailList[i].DateGubun,
          DetailList[i].CDDayWeek,
          DetailList[i].CDGubun,
          DetailList[i].SSWTimeStr,
          DetailList[i].SSWTimeEnd,
          DetailList[i].CDWStrTime,
          DetailList[i].CDWEndTime,
          DetailList[i].SSLTimeStr1,
          DetailList[i].SSLTimeEnd1,
          DetailList[i].SSLTimeStr2,
          DetailList[i].SSLTimeEnd2,
          DetailList[i].SSLTimeStr3,
          DetailList[i].SSLTimeEnd3,
          DetailList[i].SSLTimeStr4,
          DetailList[i].SSLTimeEnd4,
          DetailList[i].SSLTimeStr5,
          DetailList[i].SSLTimeEnd5,
          DetailList[i].HTime,
          DetailList[i].CDHTime,
          DetailList[i].TotWorkTime,
          DetailList[i].CDSStrTime,
          DetailList[i].CDSEndTime,
          DetailList[i].CDWTimeNormal,
          DetailList[i].CDWTimeHoli,
          DetailList[i].CDWTimeOver,
          DetailList[i].CDWTimeNight,
          DetailList[i].CDWTimeNightOver,
          DetailList[i].CDHTimeBase,
          DetailList[i].CDHTimeOver,
          DetailList[i].CDHTimeNight,
          DetailList[i].CDHTimeNightOver,
          DetailList[i].CDTkTime,
          DetailList[i].SSHOLIWEEK,
          DetailList[i].SSNightStrWTime,
          DetailList[i].SSNightEndWTime,
          DetailList[i].SSLTimeGubun1,
          DetailList[i].SSLTimeGubun2,
          DetailList[i].SSLTimeGubun3,
          DetailList[i].SSLTimeGubun4,
          DetailList[i].SSLTimeGubun5,
          i,
          false,
          ValList
        );
      }
      if (CCList[0].SSHOLIPAYYN === "Y") {
        MuhueOverTime[i].CDWTimeHoli = InfraLib.infraRoundUp(
          DetailList[i].CDWTimeNormal * ValList[1].ValWTimeHoliRate,
          ValList[1].ValBaseDigit
        );
      } else {
        MuhueOverTime[i].CDWTimeHoli = 0;
      }
    }

    MuhueOverTime && setDetailList(MuhueOverTime);
  };
  //근무구분중 결근이 있으면 해당 주의 주휴를 제거하는 함수
  const ClearJuhueByOut = grid => {
    var isDoubleOut; //한주에 결근이 2번이상인지 검사하는 플래그
    var isOtherMonthFind; //이전달 마지막주를 검색해야하는 경우인지 확인하는 플래그
    for (let i = 0; i < grid.length; i++) {
      isDoubleOut = false;
      if (grid[i].CDGubun === "3") {
        isOtherMonthFind = true;
        grid[i].CDWTimeHoli = 0;
        for (let j = i; 0; j--) {
          // j===0 ?
          //윗방향 주휴제거
          if (
            Math.trunc(moment(DetailList[i].CDDate).day() + 1) ===
            grid[i].SSHOLIWEEK
          ) {
            isOtherMonthFind = false; //이전달 마지막주를 검색하지 않아도됨
            break; //주휴가 나오면 윗방향으로 주휴제거 중지
          }
          if (i === j) continue;
          if (grid[j].CDWTimeHoli < 0) {
            grid[i].CDWTimeHoli = 0;
            isDoubleOut = true;
            break;
          } else {
            grid[i].CDWTimeHoli = grid[i].CDWTimeHoli - grid[j].CDWTimeHoli;
          }
        }
        // 이전달에 마지막주를 검색함
        if (isOtherMonthFind && !isDoubleOut) {
          for (let j = DetailList_Bef.length; 0; j--) {
            if (
              Math.trunc(moment(DetailList_Bef[i].CDDate).day() + 1) ===
              grid[i].SSHOLIWEEK
            ) {
              isOtherMonthFind = false; //이전달 마지막주를 검색하지 않아도됨
              break; //주휴가 나오면 윗방향으로 주휴제거 중지
            }
            if (DetailList_Bef[j].CDGubun === "3") {
              grid[i].CDWTimeHoli = 0;
              isDoubleOut = true;
              break;
            } else {
              grid[i].CDWTimeHoli =
                grid[i].CDWTimeHoli - DetailList_Bef[j].CDWTimeHoli;
            }
          }
        }
        isOtherMonthFind = true; //우선 다음달 첫째주의 주휴시간을 감산할 예정
        if (!isDoubleOut) {
          for (let j = i; grid.length; i++) {
            if (
              Math.trunc(moment(grid[j].CDDate).day() + 1) ===
              grid[i].SSHOLIWEEK
            ) {
              isOtherMonthFind = false; //다음달 계산할 필요 없음
              break; //주휴가 나오면 아래방향으로 주휴제거 중지
            }
            if (i === j) continue;
            if (grid[j].CDWTimeHoli < 0) {
              grid[i].CDWTimeHoli = 0;
              isDoubleOut = true;
              break;
            } else {
              grid[i].CDWTimeHoli = grid[i].CDWTimeHoli - grid[j].CDWTimeHoli;
            }
          }
        }
        // 다음달에 첫주의 주휴를 소정근로 시간으로 게산하여 감산함
        if (isOtherMonthFind && !isDoubleOut) {
          for (let j = DetailList_Aft.length; 0; j--) {
            if (
              Math.trunc(moment(DetailList_Aft[i].CDDate).day() + 1) ===
              grid[i].SSHOLIWEEK
            ) {
              break; //주휴가 나오면 윗방향으로 주휴제거 중지
            }
            if (DetailList_Aft[j].CDGubun === "3") {
              grid[i].CDWTimeHoli = 0;

              break;
            } else {
              grid[i].CDWTimeHoli =
                grid[i].CDWTimeHoli - DetailList_Aft[j].CDWTimeHoli;
            }
          }
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
      SWGubun: CCList[0].SSSWGUBUN
    };
    var HoliList = {};
    axios
      .post("http://localhost:5000/ComeCheckDetail/SetHolidays", parm)
      .then(res => {
        console.log(res);
        if (res.data === "NoData") {
        } else {
          HoliList = res.data.HolidaysList;
          SetHoli(HoliList);
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
        console.log("SetHolidays 에러", err);
      });
  };
  //그리드 기본값 세팅
  const SetCalenderGrid = (TList, StrDate, EndDate) => {
    console.log("SetCalenderGrid 실행됨");
    if (Flag) {
      var moment = require("moment");
      var WeekDayIndex = moment(StrDate).day() + 1; // 2
      var RowCount = moment(EndDate).diff(moment(StrDate), "days") + 1; //31
      var List = {};
      console.log("RowCount", RowCount);
      StrDate = moment(StrDate).format("YYYY-MM-DD");
      for (let i = 0; i < RowCount; i++) {
        List[i] = { Test: "123" };
        List[i].CDDate = StrDate;
        List[i].CDDayWeek = String(WeekDayIndex);

        if (List[i].CDDayWeek === CCList[0].SSHOLIWEEK) List[i].DateGubun = "1";
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
        List[i].SSWTimeStr = CCList[0].SSWTIMESTR; //기준시업
        List[i].SSWTimeEnd = CCList[0].SSWTIMEEND; //기준종업
        List[i].SSLTimeStr1 = CCList[0].SSLTIMESTR1; //휴게시간시작1
        List[i].SSLTimeEnd1 = CCList[0].SSLTIMEEND1;
        List[i].SSLTimeStr2 = CCList[0].SSLTIMESTR2;
        List[i].SSLTimeEnd2 = CCList[0].SSLTIMEEND2;
        List[i].SSLTimeStr3 = CCList[0].SSLTIMESTR3;
        List[i].SSLTimeEnd3 = CCList[0].SSLTIMEEND3;
        List[i].SSLTimeStr4 = CCList[0].SSLTIMESTR4;
        List[i].SSLTimeEnd4 = CCList[0].SSLTIMEEND4;
        List[i].SSLTimeStr5 = CCList[0].SSLTIMESTR5;
        List[i].SSLTimeEnd5 = CCList[0].SSLTIMEEND5; //휴게시간종료5
        //근로시간 셋팅
        List[i].CDWStrTime = "";
        List[i].CDWEndTime = "";
        //휴게시간 계산
        List[i].SSLTime = 0;
        //소정근로 총근로시간
        List[i].TotOriWorkTime = 0;
        List[i].CDHTime = 0; //추가휴게시간
        List[i].CDSStrTime = ""; //외출시작
        List[i].CDSEndTime = ""; //외출복귀
        List[i].HTime = 0; //적용된 휴게시간
        List[i].TotWorkTime = 0; //총근로시간
        //근무구분
        if (List[i].DateGubun === "0")
          //CheckDate가 휴일인 경우 근태처리방법을 불러오는 함수(0:근무일 5:무급휴무 6:유급휴무);//주간(정상근무)
          List[i].CDDate &&
            (List[i].CDGubun = WTimes.getHolidayCCGubun(List[i].CDDate, "0"));
        else if (List[i].DateGubun === "1") {
          List[i].CDGubun = "6"; //주휴일
        } else if (List[i].DateGubun === "2") {
          List[i].CDGubun = "5"; //무휴일
        }

        List[i].btnBaseWTime = "입력"; //기준시업,종업시간으로 출퇴근시간을 입력하는 버튼(?)
        List[i].CDWTime = 0; //일자의 총 근로시간: 기본+연장+연장야간
        List[i].CDWTimeNormal = 0; //기본근로시간
        List[i].CDWTimeHoli = 0; //주휴
        List[i].CDWTimeOver = 0; //연장
        List[i].CDWTimeNight = 0; //야간
        List[i].CDWTimeNightOver = 0; //야간연장
        List[i].CDHTimeBase = 0; //휴일기본
        List[i].CDHTimeOver = 0; //휴일연장
        List[i].CDHTimeNight = 0; //휴일야간
        List[i].CDHTimeNightOver = 0; //휴일야간연장
        List[i].CDTkTime = 0; //특근
        List[i].CDMemo = ""; //비고내용
        List[i].ChangeGubun = "N"; //우선은 새로운 행으로
        StrDate = moment(StrDate, "YYYY-MM-DD")
          .add("days", 1)
          .format("YYYY-MM-DD");
        WeekDayIndex = WeekDayIndex + 1;
        if (WeekDayIndex > 7) WeekDayIndex = 1;
      }

      console.log("SetCalenderGrid List  :", List);
      // return List;
      if (TList === DetailList) {
        !DetailList && setDetailList(Object.values(List));

        console.log("DetailList Done", DetailList);

        return;
      } else if (TList === DetailList_Bef) {
        setDetailList_Bef(Object.values(List));

        console.log("DetailList_Bef Done", DetailList_Bef);
        return;
      } else {
        setDetailList_Aft(Object.values(List));

        console.log("DetailList_Aft Done", DetailList_Aft);
        return;
      }
    }
  };
  //근무구분중 결근이 있으면 해당 주의 주휴를 제거하는 함수
  // const ClearJuhueByOut = grid => {
  //   var isDoubleOut; //한주에 결근이 2번이상인지 검사하는 플래그
  //   var isOtherMonthFind; //이전달 마지막주를 검색해야하는 경우인지 확인하는 플래그
  //   var moment = require("moment");

  //   for (let i = 0; i < grid.length; i++) {
  //     isDoubleOut = false;
  //     if (grid[i].CDGubun === "3") {
  //       isOtherMonthFind = true;
  //       grid[i].CDWTimeHoli = 0;
  //       for (let j = i; (j = 0); j--) {
  //         if (
  //           String(Math.trunc(moment(grid[i].CDDate).day() + 1)) ===
  //           CCList[0].SSHOLIWEEK
  //         ) {
  //           isOtherMonthFind = false;
  //           break;
  //         }
  //         if (i === j) continue;
  //         if (grid[j].CDWTimeHoli < 0) {
  //           grid[i].CDWTimeHoli === 0;
  //           isDoubleOut = true;
  //           break;
  //         } else {
  //           grid[i].CDWTimeHoli = grid[i].CDWTimeHoli - grid[j].CDWTimeHoli;
  //         }
  //       }
  //       //이전달에 마지막주를 검색함
  //       if (isOtherMonthFind && !isDoubleOut) {
  //         for (let j = DetailList_Bef.length; (j = 0); j--) {
  //           if (
  //             String(Math.trunc(moment(grid[j].CDDate).day() + 1)) ===
  //             CCList[0].SSHOLIWEEK
  //           ) {
  //             isOtherMonthFind = false;
  //             break;
  //           }
  //           if (DetailList_Bef[j].CDGubun === "3") {
  //             grid[i].CDWTimeHoli = 0;
  //             isDoubleOut = true;
  //             break;
  //           } else {
  //             grid[i].CDWTimeHoli =
  //               grid[i].CDWTimeHoli - DetailList_Bef[j].CDWTimeHoli;
  //           }
  //         }
  //       }
  //       isOtherMonthFind = true;
  //       if (!isDoubleOut) {
  //         for (let j = i; grid.length; j++) {
  //           if (
  //             String(Math.trunc(moment(grid[j].CDDate).day() + 1)) ===
  //             CCList[0].SSHOLIWEEK
  //           ) {
  //             isOtherMonthFind = false;
  //             break;
  //           }
  //           if (i === j) continue;
  //           if (grid[j].CDWTimeHoli < 0) {
  //             grid[i].CDWTimeHoli = 0;
  //             isDoubleOut = true;
  //             break;
  //           } else {
  //             grid[i].CDWTimeHoli = grid[i].CDWTimeHoli - grid[j].CDWTimeHoli;
  //           }
  //         }
  //       }
  //       // 다음달에 첫주의 주휴를 소정근로 시간으로 계산하여 감산함.
  //       if (isOtherMonthFind && !isDoubleOut) {
  //         for (let j = DetailList_Aft.length; (j = 0); j--) {
  //           if (
  //             String(Math.trunc(moment(DetailList_Aft[j].CDDate).day() + 1)) ===
  //             CCList[0].SSHOLIWEEK
  //           )
  //             break;
  //           if (DetailList_Aft[j].CDWTimeHoli === "3") {
  //             grid[i].CDWTimeHoli = 0;
  //             break;
  //           } else {
  //             grid[i].CDWTimeHoli =
  //               grid[i].CDWTimeHoli - DetailList_Aft[j].CDWTimeHoli;
  //           }
  //         }
  //       }
  //     }
  //   }
  // };

  return (
    <div>
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
                      onClick={() => btnSetAllComeOkClick()}
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
    </div>
  );
};

export default ComeCheckDetail;
