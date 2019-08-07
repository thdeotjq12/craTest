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
import WTimes from "../../../function/WTimes";

import GongLib from "../../../function/GongLib";
import InfraLib from "../../../function/InfraLib";
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
  const { ValList } = useSelector(state => state.ValList);
  const [HoliDays, SetHoli] = useState(""); // 휴일 리스트
  const [DetailList, setDetailList] = useState(""); // 달력 리스트
  const [DetailList_Bef, setDetailList_Bef] = useState("");
  const [DetailList_Aft, setDetailList_Aft] = useState("");
  const [MuHueWeek, setMuHueWeek] = useState(""); //무휴요일
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
    SetCalendar(true);
    // SetCalenderGrid(DetailList, NowDate, LastDate);

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
  const SetCalendarNow = ShowDB => {
    var WeekDayIndex = moment(NowDate).day() + 1;
    //시작일부터 말일까지 grid에 달력을 셋팅하는 함수
    SetCalenderGrid(DetailList, NowDate, LastDate);
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
  //달력을 셋팅하는 함수
  const SetCalendar = ShowDB => {
    console.log("SetCalendar 실행됨 #####");
    SetHolidays(NowDate, LastDate, CCList[0].SSSWGUBUN);
    //연장가산요일 선택
    //1일 2월 3화 4수 5목 6금 7토
    if ((CCList[0].SSHoliWeek = "1")) setMuHueWeek("7");
    else if ((CCList[0].SSHoliWeek = "2")) setMuHueWeek("1");
    else if ((CCList[0].SSHoliWeek = "3")) setMuHueWeek("2");
    else if ((CCList[0].SSHoliWeek = "4")) setMuHueWeek("3");
    else if ((CCList[0].SSHoliWeek = "5")) setMuHueWeek("4");
    else if ((CCList[0].SSHoliWeek = "6")) setMuHueWeek("5");
    else if ((CCList[0].SSHoliWeek = "7")) setMuHueWeek("6");
    SetCalendarNow(true); //이번달 달력 셋팅//반드시 이번달 먼저 셋팅해야 이전달과 다음달을 이번달에서 필요한 만큼만 조회해서 그리드에 셋팅한다.
    SetCalendarBef(); //이전달 달력 셋팅
    SetCalendarAft(); //다음달 달력 셋팅

    SetHuejik(); //휴직 정보를 셋팅
    // SetInOutDate(); ////입퇴사에 관하여 입사이전과 퇴사이후는 무급휴일로 자동 셋팅하는 함수
    // SetMuhueOverTime(); //전체라인에 대해서 무휴일(주휴 직전일)에 추가연장을 계산하는 함수

    // ClearJuhueByOut(DetailList); //근무구분중 결근이 있으면 해당 주의 주휴를 제거하는 함수
  };
  //휴직 정보를 셋팅
  const SetHuejik = () => {
    var HStrDate;
    var HEndDate;
    var Hujik = DetailList;
    var parm = {
      STCode: CCList[0].STCode,
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
          InOutDate[i].CDGubun = "5"; //무급휴무로 설정
          setDetailList(
            GongLib.SetCellEditExit(
              InOutDate,
              null,
              null,
              i,
              InOutDate[i].SSWTimeOfDayLimit,
              false,
              InOutDate[i].SSNightStrWTime,
              InOutDate[i].SSNightEndWTime,
              InOutDate[i].SSLTimeGubun1,
              InOutDate[i].SSLTimeGubun2,
              InOutDate[i].SSLTimeGubun3,
              InOutDate[i].SSLTimeGubun4,
              InOutDate[i].SSLTimeGubun5,
              InOutDate[i].SSHoliWeek,
              InOutDate[i].SSHoliPayYN,
              InOutDate[i].CDDate,
              InOutDate[i].DateGubun,
              InOutDate[i].CDDayWeek,
              InOutDate[i].CDGubun,
              InOutDate[i].SSWTimeStr,
              InOutDate[i].SSWTimeEnd,
              InOutDate[i].CDWStrTime,
              InOutDate[i].CDWEndTime,
              InOutDate[i].SSLTimeStr1,
              InOutDate[i].SSLTimeEnd1,
              InOutDate[i].SSLTimeStr2,
              InOutDate[i].SSLTimeEnd2,
              InOutDate[i].SSLTimeStr3,
              InOutDate[i].SSLTimeEnd3,
              InOutDate[i].SSLTimeStr4,
              InOutDate[i].SSLTimeEnd4,
              InOutDate[i].SSLTimeStr5,
              InOutDate[i].SSLTimeEnd5,
              InOutDate[i].HTime,
              InOutDate[i].CDHTime,
              InOutDate[i].TotWorkTime,
              InOutDate[i].CDSStrTime,
              InOutDate[i].CDSEndTime,
              InOutDate[i].CDWTimeNormal,
              InOutDate[i].CDWTimeHoli,
              InOutDate[i].CDWTimeOver,
              InOutDate[i].CDWTimeNight,
              InOutDate[i].CDWTimeNightOver,
              InOutDate[i].CDHTimeBase,
              InOutDate[i].CDHTimeOver,
              InOutDate[i].CDHTimeNight,
              InOutDate[i].CDHTimeNightOver,
              InOutDate[i].CDTkTime, //특근 인덱스
              InOutDate[i].CDNoComeCNT,
              InOutDate[i].CDLateTime,
              InOutDate[i].CDEarlyOutTime,
              false
            )
          );
        }
      }
    }
    //퇴사일 이후 근무를 무급휴일로 처리
    if (
      moment(NowDate, "YYYY-MM-DD").format("YYYY-MM-DD") === //현재 화면상의 년월
      CCList[0].SSMEndDate //사업참여 시작년월
    ) {
      for (let i = 0; i < DetailList.length; i++) {
        //그리드상의 근무 일자가 사업참여 시작 전인 경우.
        if (DetailList[i].CDDate > CCList[0].SSMEndDate) {
          InOutDate[i].CDGubun = "5"; //무급휴무로 설정
          setDetailList(
            GongLib.SetCellEditExit(
              InOutDate,
              null,
              null,
              i,
              InOutDate[i].SSWTimeOfDayLimit,
              false,
              InOutDate[i].SSNightStrWTime,
              InOutDate[i].SSNightEndWTime,
              InOutDate[i].SSLTimeGubun1,
              InOutDate[i].SSLTimeGubun2,
              InOutDate[i].SSLTimeGubun3,
              InOutDate[i].SSLTimeGubun4,
              InOutDate[i].SSLTimeGubun5,
              InOutDate[i].SSHoliWeek,
              InOutDate[i].SSHoliPayYN,
              InOutDate[i].CDDate,
              InOutDate[i].DateGubun,
              InOutDate[i].CDDayWeek,
              InOutDate[i].CDGubun,
              InOutDate[i].SSWTimeStr,
              InOutDate[i].SSWTimeEnd,
              InOutDate[i].CDWStrTime,
              InOutDate[i].CDWEndTime,
              InOutDate[i].SSLTimeStr1,
              InOutDate[i].SSLTimeEnd1,
              InOutDate[i].SSLTimeStr2,
              InOutDate[i].SSLTimeEnd2,
              InOutDate[i].SSLTimeStr3,
              InOutDate[i].SSLTimeEnd3,
              InOutDate[i].SSLTimeStr4,
              InOutDate[i].SSLTimeEnd4,
              InOutDate[i].SSLTimeStr5,
              InOutDate[i].SSLTimeEnd5,
              InOutDate[i].HTime,
              InOutDate[i].CDHTime,
              InOutDate[i].TotWorkTime,
              InOutDate[i].CDSStrTime,
              InOutDate[i].CDSEndTime,
              InOutDate[i].CDWTimeNormal,
              InOutDate[i].CDWTimeHoli,
              InOutDate[i].CDWTimeOver,
              InOutDate[i].CDWTimeNight,
              InOutDate[i].CDWTimeNightOver,
              InOutDate[i].CDHTimeBase,
              InOutDate[i].CDHTimeOver,
              InOutDate[i].CDHTimeNight,
              InOutDate[i].CDHTimeNightOver,
              InOutDate[i].CDTkTime, //특근 인덱스
              InOutDate[i].CDNoComeCNT,
              InOutDate[i].CDLateTime,
              InOutDate[i].CDEarlyOutTime,
              false
            )
          );
        }
      }
    }
  };
  //전체라인에 대해서 무휴일(주휴 직전일)에 추가연장을 계산하는 함수
  const SetMuhueOverTime = () => {
    //연장가산일은 사원 명부에서 설정된 주휴일 직전일로보고 계산한다.
    for (let i = 0; i < DetailList.length; i++) {
      if (DetailList[i].CDGubun === "1") continue;
      if (moment(DetailList[i].CDDate).day() + 1 === MuHueWeek) {
        //무휴일로 인정
        //무휴일에 대해 주간 소정근로시간 초과, 또는 법정주간근로시간(40시간)초과시 연장근무로 셋팅하는 함수
        GongLib.MuhueOverTimeCheck(
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
          DetailList[i].SSHoliWeek,
          DetailList[i].SSNightStrWTime,
          DetailList[i].SSNightEndWTime,
          DetailList[i].SSLTimeGubun1,
          DetailList[i].SSLTimeGubun2,
          DetailList[i].SSLTimeGubun3,
          DetailList[i].SSLTimeGubun4,
          DetailList[i].SSLTimeGubun5,
          i,
          false
        );
      }
      if (DetailList[i].SSHoliPayYN) {
        DetailList[i].CDWTimeHoli = InfraLib.infraRoundUp(
          DetailList[i].CDWTimeNormal * ValList[1].ValWTimeHoliRate,
          ValList[1].ValBaseDigit
        );
      } else {
        DetailList[i].CDWTimeHoli = 0;
      }
    }
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
            grid[i].SSHoliWeek
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
              grid[i].SSHoliWeek
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
              grid[i].SSHoliWeek
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
              grid[i].SSHoliWeek
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
