import axios from "axios";
import InfraLib from "./InfraLib";
import PublicValue from "./PublicValue";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tr } from "date-fns/esm/locale";
var Func = {};
const GongLib = porps => {
  const { ValList } = useSelector(state => state.ValList);
};

Func.SetSaupHead = function(Select, Year, Mode) {
  var parm = {
    Year: Year,
    Mode: Mode
  };

  axios
    .post("http://localhost:5000/Func/SetSaupHead", parm)
    .then(res => {
      console.log(res);
      if (res.data === "NoData") {
        console.log("SaupHead 데이터가 없습니다");
      } else {
        // 모든 select 내용을 지운다.
        for (let i = Select.options.length - 1; i >= 0; i--) {
          Select.remove(i);
        }
        Select.options[Select.options.length] = new Option("전체", "전체");
        for (let i = 0; i < res.data.SaupHead.length; i++) {
          Select.options[Select.options.length] = new Option(
            res.data.SaupHead[i].SHNAME,
            res.data.SaupHead[i].SHCODE
          );
        }
      }
    })
    .catch(err => {
      console.log("SaupHead 에러", err);
    });
};

Func.SetSaupDetail = function(Select, Year, SHCode, Mode) {
  var parm = {
    SHCode: SHCode,
    Year: Year,
    Mode: Mode
  };

  axios
    .post("http://localhost:5000/Func/SetSaupDetail", parm)
    .then(res => {
      console.log(res);
      if (res.data === "NoData") {
        console.log("SaupHeadList 데이터가 없습니다");
      } else {
        console.log("Test SetSaupDetail", res.data);
        // 모든 select 내용을 지운다.
        for (let i = Select.options.length - 1; i >= 0; i--) {
          Select.remove(i);
        }
        Select.options[Select.options.length] = new Option("전체", "전체");
        for (let i = 0; i < res.data.SaupDetail.length; i++) {
          Select.options[Select.options.length] = new Option(
            res.data.SaupDetail[i].SDNAME,
            res.data.SaupDetail[i].SDSHCODE +
              "|" +
              res.data.SaupDetail[i].SDCODE
          );
        }
      }
    })
    .catch(err => {
      console.log("SaupHeadList 에러", err);
    });
};

Func.GetSDCode = (SaupDetail_value, Result) => {
  var Codes = [];
  if (SaupDetail_value === "전체") {
    Codes = null;
  } else {
    Codes = SaupDetail_value.split("|");
    console.log("GetSDCode    : ", SaupDetail_value, Codes);
    return Codes;
  }
};
//일자별로 출퇴근시간, 근무구분 등을 입력받아서 근로시간을 계산하여 셋팅하는 함수
Func.SetCellEditExit = (
  CNList,
  CNList_BefMonth,
  CNList_AftMonth,
  Row,
  iWTimeOfDayLimit,
  SWMinorYN,
  SWNightStrWTime,
  SWNightEndWTime,
  SWLTimeGubun1,
  SWLTimeGubun2,
  SWLTimeGubun3,
  SWLTimeGubun4,
  SWLTimeGubun5,
  SWHoliWeek,
  SWHoliPayYN,
  G1_CNDate,
  G1_DateGubun,
  G1_CNDayWeek,
  G1_CNGubun,
  G1_SSWTimeStr,
  G1_SSWTimeEnd,
  G1_CNWStrTime,
  G1_CNWEndTime,
  G1_SWLTimeStr1,
  G1_SWLTimeEnd1,
  G1_SWLTimeStr2,
  G1_SWLTimeEnd2,
  G1_SWLTimeStr3,
  G1_SWLTimeEnd3,
  G1_SWLTimeStr4,
  G1_SWLTimeEnd4,
  G1_SWLTimeStr5,
  G1_SWLTimeEnd5,
  G1_HTime,
  G1_CNHTime,
  G1_TotWorkTime,
  G1_CNSStrTime,
  G1_CNSEndTime,
  G1_CCWTimeNormal,
  G1_CCWTimeHoli,
  G1_CCWTimeOver,
  G1_CCWTimeNight,
  G1_CCWTimeNightOver,
  G1_CCHTimeBase,
  G1_CCHTimeOver,
  G1_CCHTimeNight,
  G1_CCHTimeNightOver,
  G1_CCTkTime,
  G1_CDNoComeCNT,
  G1_CDLateTime,
  G1_CDEarlyOutTime,
  isFirst
) => {
  var moment = require("moment");
  var MuhueWeek;
  //연장가산요일 선택
  //1일 2월 3화 4수 5목 6금 7토
  if ((SWHoliWeek = "1")) MuhueWeek = "7";
  else if ((SWHoliWeek = "2")) MuhueWeek = "1";
  else if ((SWHoliWeek = "3")) MuhueWeek = "2";
  else if ((SWHoliWeek = "4")) MuhueWeek = "3";
  else if ((SWHoliWeek = "5")) MuhueWeek = "4";
  else if ((SWHoliWeek = "6")) MuhueWeek = "5";
  else if ((SWHoliWeek = "7")) MuhueWeek = "6";
  Func.SetTimeForGrid(
    //해당그리드의 근무구분에 때라 row행의 시간값을 셋팅하는 함수
    CNList,
    Row,
    iWTimeOfDayLimit,
    SWMinorYN,
    SWHoliWeek,
    SWHoliPayYN,
    SWNightStrWTime,
    SWNightEndWTime,
    SWLTimeGubun1,
    SWLTimeGubun2,
    SWLTimeGubun3,
    SWLTimeGubun4,
    SWLTimeGubun5,
    G1_CNDate,
    G1_CNDayWeek,
    G1_DateGubun,
    G1_CNGubun,
    G1_CNHTime,
    G1_SSWTimeStr,
    G1_SSWTimeEnd,
    G1_CNWStrTime,
    G1_CNWEndTime,
    G1_SWLTimeStr1,
    G1_SWLTimeEnd1,
    G1_SWLTimeStr2,
    G1_SWLTimeEnd2,
    G1_SWLTimeStr3,
    G1_SWLTimeEnd3,
    G1_SWLTimeStr4,
    G1_SWLTimeEnd4,
    G1_SWLTimeStr5,
    G1_SWLTimeEnd5,
    G1_CNSStrTime,
    G1_CNSEndTime,
    G1_CCWTimeNormal,
    G1_CCWTimeHoli,
    G1_CCWTimeOver,
    G1_CCWTimeNight,
    G1_CCWTimeNightOver,
    G1_CCHTimeBase,
    G1_CCHTimeOver,
    G1_CCHTimeNight,
    G1_CCHTimeNightOver,
    G1_CCTkTime,
    G1_CDNoComeCNT,
    G1_CDLateTime,
    G1_CDEarlyOutTime,
    isFirst
  );

  if (CNList[Row].G1_CNGubun !== "1") {
    if (CNList[Row].G1_CNGubun !== "6") {
      if (moment(CNList[Row].G1_CNDate).day() + 1 === MuhueWeek) {
        Func.MuhueOverTimeCheck(
          true,
          CNList,
          CNList_BefMonth,
          CNList_AftMonth,
          G1_CNDate,
          G1_DateGubun,
          G1_CNDayWeek,
          G1_CNGubun,
          G1_SSWTimeStr,
          G1_SSWTimeEnd,
          G1_CNWStrTime,
          G1_CNWEndTime,
          G1_SWLTimeStr1,
          G1_SWLTimeEnd1,
          G1_SWLTimeStr2,
          G1_SWLTimeEnd2,
          G1_SWLTimeStr3,
          G1_SWLTimeEnd3,
          G1_SWLTimeStr4,
          G1_SWLTimeEnd4,
          G1_SWLTimeStr5,
          G1_SWLTimeEnd5,
          G1_HTime,
          G1_CNHTime,
          G1_TotWorkTime,
          G1_CNSStrTime,
          G1_CNSEndTime,
          G1_CCWTimeNormal,
          G1_CCWTimeHoli,
          G1_CCWTimeOver,
          G1_CCWTimeNight,
          G1_CCWTimeNightOver,
          G1_CCHTimeBase,
          G1_CCHTimeOver,
          G1_CCHTimeNight,
          G1_CCHTimeNightOver,
          G1_CCTkTime,
          SWHoliWeek,
          SWNightStrWTime,
          SWNightEndWTime,
          SWLTimeGubun1,
          SWLTimeGubun2,
          SWLTimeGubun3,
          SWLTimeGubun4,
          SWLTimeGubun5,
          Row,
          SWMinorYN
        );
      } else {
        for (let i = Row; i < CNList.length; i++) {
          if (CNList[i].G1_CNDayWeek !== "3") {
            if (SWHoliPayYN) {
              CNList[i].G1_CCWTimeHoli = InfraLib.infraRoundUp(
                CNList[i].G1_CCWTimeNormal * PublicValue.ValWTimeHoliRate,
                PublicValue.ValBaseDigit
              );
            } else {
              CNList[i].G1_CCWTimeHoli = 0;
            }
          }
        }
      }
    }
  }
  Func.calcLTimeNWTime(
    CNList,
    G1_CNWStrTime,
    G1_CNWEndTime,
    G1_SWLTimeStr1,
    G1_SWLTimeEnd1,
    G1_SWLTimeStr2,
    G1_SWLTimeEnd2,
    G1_SWLTimeStr3,
    G1_SWLTimeEnd3,
    G1_SWLTimeStr4,
    G1_SWLTimeEnd4,
    G1_SWLTimeStr5,
    G1_SWLTimeEnd5,
    G1_HTime,
    G1_CNHTime,
    G1_TotWorkTime,
    Row
  );
  Func.SetAddHTime(
    CNList,
    Row,
    SWHoliPayYN,
    G1_CNHTime,
    G1_CNGubun,
    G1_CCWTimeNormal,
    G1_CCWTimeHoli,
    G1_CCWTimeOver,
    G1_CCWTimeNight,
    G1_CCWTimeNightOver,
    G1_CCHTimeBase,
    G1_CCHTimeOver,
    G1_CCHTimeNight,
    G1_CCHTimeNightOver,
    G1_CCTkTime
  );
  CNList[Row].G1_TotWorkTime =
    InfraLib.TimeTermMinuteStr(
      CNList[Row].G1_CNWStrTime,
      CNList[Row].G1_CNWEndTime
    ) /
      60 -
    CNList[Row].G1_HTime;
};
//해당그리드의 근무구분에 때라 row행의 시간값을 셋팅하는 함수
Func.SetTimeForGrid = (
  grid,
  row,
  iWTimeOfDayLimit,
  SWMinorYN,
  _SWHoliWeek,
  SWHoliPayYN,
  SWNightStrWTime,
  SWNightEndWTime,
  SWLTimeGubun1,
  SWLTimeGubun2,
  SWLTimeGubun3,
  SWLTimeGubun4,
  SWLTimeGubun5,
  G1_CNDate,
  G1_CNDayWeek,
  G1_DateGubun,
  G1_CNGubun,
  G1_CNHTime,
  G1_SSWTimeStr,
  G1_SSWTimeEnd,
  G1_CNWStrTime,
  G1_CNWEndTime,
  G1_SWLTimeStr1,
  G1_SWLTimeEnd1,
  G1_SWLTimeStr2,
  G1_SWLTimeEnd2,
  G1_SWLTimeStr3,
  G1_SWLTimeEnd3,
  G1_SWLTimeStr4,
  G1_SWLTimeEnd4,
  G1_SWLTimeStr5,
  G1_SWLTimeEnd5,
  G1_CNSStrTime,
  G1_CNSEndTime,
  G1_CCWTimeNormal,
  G1_CCWTimeHoli,
  G1_CCWTimeOver,
  G1_CCWTimeNight,
  G1_CCWTimeNightOver,
  G1_CCHTimeBase,
  G1_CCHTimeOver,
  G1_CCHTimeNight,
  G1_CCHTimeNightOver,
  G1_CCTkTime,
  G1_CDNoComeCNT,
  G1_CDLateTime,
  G1_CDEarlyOutTime,
  isFirst
) => {
  var isBelowMuhue;
  var doCalcHTimeToHoli;
  var OutTime = "";
  var SSOutTime = "";
  if (grid.length === 0) return;
  ClearTime(
    grid,
    row,
    G1_CCWTimeNormal,
    G1_CCWTimeHoli,
    G1_CCWTimeOver,
    G1_CCWTimeNight,
    G1_CCWTimeNightOver,
    G1_CCHTimeBase,
    G1_CCHTimeOver,
    G1_CCHTimeNight,
    G1_CCHTimeNightOver,
    G1_CCTkTime,
    G1_CDNoComeCNT,
    G1_CDLateTime,
    G1_CDEarlyOutTime
  );
  doCalcHTimeToHoli = false;
  if (
    grid[row].G1_CNGubun === "0" || // 정상근무
    grid[row].G1_CNGubun === "2" || // 대근
    grid[row].G1_CNGubun === "5" || // 무급휴무
    grid[row].G1_CNGubun === "7" // 휴직
  ) {
    //정상근무,대근시 시간 계산
  }
};
//해당행의 계산된 각종 시간을 0으로 클리어하는 함수
const ClearTime = (
  grid,
  row,
  G1_CCWTimeNormal,
  G1_CCWTimeHoli,
  G1_CCWTimeOver,
  G1_CCWTimeNight,
  G1_CCWTimeNightOver, //매개변수 G1_CCWTime 삭제됨 //G1_CCWTime    , G1_CCWTimeNormal, G1_CCWTimeHoli , G1_CCWTimeOver     , G1_CCWTimeNight, G1_CCWTimeNightOver
  G1_CCHTimeBase,
  G1_CCHTimeOver,
  G1_CCHTimeNight,
  G1_CCHTimeNightOver,
  G1_CCTkTime,
  G1_CDNoComeCNT,
  G1_CDLateTime,
  G1_CDEarlyOutTime
) => {
  if (grid.length === 0) return;
  if (G1_CCWTimeNormal !== -1) grid[row].G1_CCWTimeNormal = 0;
  if (G1_CCWTimeHoli !== -1) grid[row].G1_CCWTimeHoli = 0;
  if (G1_CCWTimeOver !== -1) grid[row].G1_CCWTimeOver = 0;
  if (G1_CCWTimeNight !== -1) grid[row].G1_CCWTimeNight = 0;
  if (G1_CCWTimeNightOver !== -1) grid[row].G1_CCWTimeNightOver = 0;
  if (G1_CCHTimeBase !== -1) grid[row].G1_CCHTimeBase = 0;
  if (G1_CCHTimeOver !== -1) grid[row].G1_CCHTimeOver = 0;
  if (G1_CCHTimeNight !== -1) grid[row].G1_CCHTimeNight = 0;
  if (G1_CCHTimeNightOver !== -1) grid[row].G1_CCHTimeNightOver = 0;
  if (G1_CCTkTime !== -1) grid[row].G1_CCTkTime = 0;
  if (G1_CDNoComeCNT !== -1) grid[row].G1_CDNoComeCNT = 0;
  if (G1_CDLateTime !== -1) grid[row].G1_CDLateTime = 0;
  if (G1_CDEarlyOutTime !== -1) grid[row].G1_CDEarlyOutTime = 0;
};
//근무시간 및 휴게시간으로 각 근무시간을 계산.
const CalcTimes = (
  grid,
  row,
  iWTimeOfDayLimit,
  SWMinorYN,
  SWHoliWeek,
  SWNightStrWTime,
  SWNightEndWTime,
  SWLTimeGubun1,
  SWLTimeGubun2,
  SWLTimeGubun3,
  SWLTimeGubun4,
  SWLTimeGubun5,
  G1_CNDayWeek,
  G1_CNGubun,
  G1_CNWStrTime,
  G1_CNWEndTime,
  G1_SWLTimeStr1,
  G1_SWLTimeEnd1,
  G1_SWLTimeStr2,
  G1_SWLTimeEnd2,
  G1_SWLTimeStr3,
  G1_SWLTimeEnd3,
  G1_SWLTimeStr4,
  G1_SWLTimeEnd4,
  G1_SWLTimeStr5,
  G1_SWLTimeEnd5,
  G1_CNSStrTime,
  G1_CNSEndTime,
  G1_CCWTimeNormal,
  G1_CCWTimeHoli,
  G1_CCWTimeOver,
  G1_CCWTimeNight,
  G1_CCWTimeNightOver,
  G1_CCHTimeBase,
  G1_CCHTimeOver,
  G1_CCHTimeNight,
  G1_CCHTimeNightOver,
  G1_CCTkTime
) => {
  if (grid[row].G1_CNDayWeek === SWHoliWeek && grid[row].G1_CNGubun !== "2") {
    //주휴일인경우
    grid[row].G1_CCHTimeBase = CalcWTimes(
      "기본",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].G1_CNWStrTime,
      grid[row].G1_CNWEndTime,
      grid[row].G1_SWLTimeStr1,
      grid[row].G1_SWLTimeEnd1,
      SWLTimeGubun1,
      grid[row].G1_SWLTimeStr2,
      grid[row].G1_SWLTimeEnd2,
      SWLTimeGubun2,
      grid[row].G1_SWLTimeStr3,
      grid[row].G1_SWLTimeEnd3,
      SWLTimeGubun3,
      grid[row].G1_SWLTimeStr4,
      grid[row].G1_SWLTimeEnd4,
      SWLTimeGubun4,
      grid[row].G1_SWLTimeStr5,
      grid[row].G1_SWLTimeEnd5,
      SWLTimeGubun5
    );
    grid[row].G1_CCHTimeOver = CalcWTimes(
      "연장",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].G1_CNWStrTime,
      grid[row].G1_CNWEndTime,
      grid[row].G1_SWLTimeStr1,
      grid[row].G1_SWLTimeEnd1,
      SWLTimeGubun1,
      grid[row].G1_SWLTimeStr2,
      grid[row].G1_SWLTimeEnd2,
      SWLTimeGubun2,
      grid[row].G1_SWLTimeStr3,
      grid[row].G1_SWLTimeEnd3,
      SWLTimeGubun3,
      grid[row].G1_SWLTimeStr4,
      grid[row].G1_SWLTimeEnd4,
      SWLTimeGubun4,
      grid[row].G1_SWLTimeStr5,
      grid[row].G1_SWLTimeEnd5,
      SWLTimeGubun5
    );
    grid[row].G1_CCHTimeNight = CalcWTimes(
      "야간",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].G1_CNWStrTime,
      grid[row].G1_CNWEndTime,
      grid[row].G1_SWLTimeStr1,
      grid[row].G1_SWLTimeEnd1,
      SWLTimeGubun1,
      grid[row].G1_SWLTimeStr2,
      grid[row].G1_SWLTimeEnd2,
      SWLTimeGubun2,
      grid[row].G1_SWLTimeStr3,
      grid[row].G1_SWLTimeEnd3,
      SWLTimeGubun3,
      grid[row].G1_SWLTimeStr4,
      grid[row].G1_SWLTimeEnd4,
      SWLTimeGubun4,
      grid[row].G1_SWLTimeStr5,
      grid[row].G1_SWLTimeEnd5,
      SWLTimeGubun5
    );
    grid[row].G1_CCHTimeNightOver = CalcWTimes(
      "야간연장",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].G1_CNWStrTime,
      grid[row].G1_CNWEndTime,
      grid[row].G1_SWLTimeStr1,
      grid[row].G1_SWLTimeEnd1,
      SWLTimeGubun1,
      grid[row].G1_SWLTimeStr2,
      grid[row].G1_SWLTimeEnd2,
      SWLTimeGubun2,
      grid[row].G1_SWLTimeStr3,
      grid[row].G1_SWLTimeEnd3,
      SWLTimeGubun3,
      grid[row].G1_SWLTimeStr4,
      grid[row].G1_SWLTimeEnd4,
      SWLTimeGubun4,
      grid[row].G1_SWLTimeStr5,
      grid[row].G1_SWLTimeEnd5,
      SWLTimeGubun5
    );
    grid[row].G1_CCTkTime = CalcWTimes(
      "특근",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].G1_CNWStrTime,
      grid[row].G1_CNWEndTime,
      grid[row].G1_SWLTimeStr1,
      grid[row].G1_SWLTimeEnd1,
      SWLTimeGubun1,
      grid[row].G1_SWLTimeStr2,
      grid[row].G1_SWLTimeEnd2,
      SWLTimeGubun2,
      grid[row].G1_SWLTimeStr3,
      grid[row].G1_SWLTimeEnd3,
      SWLTimeGubun3,
      grid[row].G1_SWLTimeStr4,
      grid[row].G1_SWLTimeEnd4,
      SWLTimeGubun4,
      grid[row].G1_SWLTimeStr5,
      grid[row].G1_SWLTimeEnd5,
      SWLTimeGubun5
    );
  }
};
//포괄근로시간 계산하는 함수
export const CalcWTimes = (
  KindOfTime, //계산할 시간의 종류
  DayWTimeLimit, //일일 근무 최대시간(기본은 8시간이지만 소정 근로 시간에 따라 줄어들 수 있다. 소정근로가 6시간인데 근무시간이 8시간이면 6시간=기본근로시간  2시간=연장근로시간)
  NightStr,
  NightEnd, //야간근무 시작시간
  // Week1YN, Week2YN, Week3YN, Week4YN, Week5YN, Week6YN, Week7YN: Boolean;  //근무요일(1:일요일 ~ 7토요일)
  WTimeStr,
  WTimeEnd, //출근, 퇴근 시간
  LTimeStr1,
  LTimeEnd1,
  LTimeGubun1, //휴게시간1과 휴게구분(0:휴게시간을 근무에서 제외, 1: 휴게시간을 근무에 포함)
  LTimeStr2,
  LTimeEnd2,
  LTimeGubun2, //휴게시간2과 휴게구분(0:휴게시간을 근무에서 제외, 1: 휴게시간을 근무에 포함)
  LTimeStr3,
  LTimeEnd3,
  LTimeGubun3, //휴게시간3과 휴게구분(0:휴게시간을 근무에서 제외, 1: 휴게시간을 근무에 포함)
  LTimeStr4,
  LTimeEnd4,
  LTimeGubun4, //휴게시간4과 휴게구분(0:휴게시간을 근무에서 제외, 1: 휴게시간을 근무에 포함)
  LTimeStr5,
  LTimeEnd5,
  LTimeGubun5 //휴게시간5과 휴게구분(0:휴게시간을 근무에서 제외, 1: 휴게시간을 근무에 포함)
) => {
  var is24Add; //근무시간에 24시간을 가산한 것인지 체크하는 변수
  var DayWTimeStrs; //근로시작시간 리스트
  var DayWTimeEnds; //근로종료시간 리스트
  var BaseTime; //기본근로시간
  var NightTime; //야간근로시간:기본근로시간중 야간타임
  var OverTime; //연장근로시간:기본근로시간 이후 야간타임 이전
  var ONTime; //야간연장근로시간: 기본근로시간 이후 야간타임
  var TkTime; //특근시간
  var tempTime;
  var Result;
  //근로시간 리스트중 휴게시간이 걸려있으면 휴게시간만큼을 빼는 함수(근로시간이 분할된다)
  const WTimeMinusLTime = (WTimeStrList, WTimeEndList, LTimeStr, LTimeEnd) => {
    var WTimeStr;
    var WTimeEnd;
    var oriLTimeStr;
    var oriLTimeEnd;
    var is24AddStr;
    var is24AddEnd;

    is24AddStr = false;
    is24AddEnd = false;
    oriLTimeStr = LTimeStr;
    oriLTimeEnd = LTimeEnd;
    for (let i = 0; i < WTimeStrList.length; i++) {
      LTimeStr = oriLTimeStr;
      LTimeEnd = oriLTimeEnd;
      if (
        is24Add && //근무시간에 24시간을 가산했음.휴게 시작시간과 종료시간이 근무시간 안쪽인지 판단하여 근무시간 바깥쪽인경우(시작과 종료둘다) 24시간을 가산한다.
        LTimeStr < WTimeStrList[i] &&
        LTimeStr > WTimeEndList[i] &&
        LTimeEnd < WTimeStrList[i] &&
        LTimeEnd > WTimeEndList[i]
      ) {
        LTimeStr = InfraLib.IncMinuteStr(LTimeStr, 24 * 60); //휴게 시작시간이 근무시간 범위밖에 있음
        LTimeEnd = InfraLib.IncMinuteStr(LTimeEnd, 24 * 60); //휴게 종료시간이 근무시간 범위밖에 있음
      }
      WTimeStr = WTimeStrList[i];
      WTimeEnd = WTimeEndList[i];
      if (LTimeStr <= WTimeStr && LTimeEnd > WTimeStr && LTimeEnd < WTimeEnd) {
        //1. 휴게시간이 근로시작시간전에 시작하여 근무시간중에 끝나는 경우
        WTimeStrList[i] = LTimeEnd;
      } else if (LTimeStr > WTimeStr && LTimeEnd < WTimeEnd) {
        //2. 근로시간중에 휴게시간이 시작되어서 근로시간 내에 끝나는 경우
        //휴게시간 이후로 근로시간 만듬
        WTimeStrList.push(LTimeEnd);
        WTimeEndList.push(WTimeEndList[i]);
        //휴게시간 이전의 근로시간은 종료시간만 휴게시작시간으로 바꿈
        WTimeEndList[i] = LTimeStr;
      } else if (
        LTimeStr > WTimeStr &&
        LTimeStr < WTimeEnd &&
        LTimeEnd >= WTimeEnd
      ) {
        WTimeEndList[i] = LTimeStr;
      }
    }
  };
  //시작시간으로 부터 종료시간까지의 연장, 야간연장시간을 가산
  const CalcOverTimes = (StrTime, EndTime) => {
    var i = 0;
    if (StrTime < NightStr) {
      if (EndTime <= NightStr) {
        //근로시작시간이 야간근로시작시간 전인 경우
        OverTime =
          OverTime + InfraLib.TimeTermMinuteStr(StrTime, DayWTimeEnds[i]);
      } else if (EndTime <= NightEnd) {
        //근로종료시간이 야간근로시작 전인 경우
        OverTime = OverTime + InfraLib.TimeTermMinuteStr(StrTime, NightStr);
        ONTime = ONTime + InfraLib.TimeTermMinuteStr(NightStr, EndTime);
      } else if (EndTime > NightEnd) {
        //근로종료시간이 야간 근로종료 전인 경우
        OverTime = OverTime + InfraLib.TimeTermMinuteStr(StrTime, NightStr);
        ONTime = ONTime + InfraLib.TimeTermMinuteStr(NightStr, NightEnd);
        OverTime = OverTime + InfraLib.TimeTermMinuteStr(NightEnd, EndTime);
      } else if (StrTime < NightEnd) {
        //근로시작시간이 야간근로시간 안쪽에 있는 경우
        if (EndTime <= NightEnd) {
          //근로종료시간이 야간 근로종료 전인 경우
          ONTime = ONTime + InfraLib.TimeTermMinuteStr(StrTime, EndTime);
        } else if (EndTime > NightEnd) {
          ONTime = ONTime + InfraLib.TimeTermMinuteStr(StrTime, NightEnd);
          OverTime = OverTime + InfraLib.TimeTermMinuteStr(NightEnd, EndTime);
        }
      } else if (StrTime >= NightEnd) {
        //근로시작시간이 야간근로시간 이후인경우.
        OverTime = OverTime + InfraLib.TimeTermMinuteStr(StrTime, EndTime);
      }
    }
  };
  //시작시간으로부터 종료시간까지 야간근로시간을 계산
  const CalcNightTime = (StrTime, EndTime) => {
    if (StrTime > EndTime) EndTime = InfraLib.IncMinuteStr(EndTime, 24 * 60);
    if (EndTime < NightStr) {
      StrTime = InfraLib.IncMinuteStr(EndTime, 24 * 60);
      EndTime = InfraLib.IncMinuteStr(EndTime, 24 * 60);
    }
    //근로시작시간이 야간근로시간 이전에 시작된 경우
    if (StrTime < NightStr) {
      //근로종료시간이 야간근로시간 안에 있는 경우
      if (EndTime > NightStr && EndTime <= NightEnd) {
        NightTime = NightTime + InfraLib.TimeTermMinuteStr(NightStr, EndTime);
      } else if (EndTime > NightEnd) {
        NightTime = NightTime + InfraLib.TimeTermMinuteStr(NightStr, NightEnd);
      }
    } else if (StrTime < NightEnd) {
      //근로시작시간이 야간근로시간 안쪽인 경우
      if (EndTime <= NightEnd) {
        //근로종료시간도 야간근로시간 안쪽인 경우
        NightTime = NightTime + InfraLib.TimeTermMinuteStr(StrTime, EndTime);
      } else {
        NightTime = NightTime + InfraLib.TimeTermMinuteStr(StrTime, NightEnd);
      }
    }
  };
  //휴게시간(분단위)
  const calcTkTime = (SWLTimeGubun, StrTime, EndTime) => {
    var LTimeMinute;

    if (Math.trim(StrTime) === "" || Math.trim(EndTime) === "")
      return (Result = 0);
    if (SWLTimeGubun !== "0" && SWLTimeGubun !== "9") {
      if (StrTime >= EndTime) EndTime = InfraLib.IncMinuteStr(EndTime, 24 * 60);
      if (WTimeStr > StrTime && WTimeStr >= EndTime) {
        StrTime = InfraLib.IncMinuteStr(StrTime, 24 * 60);
        EndTime = InfraLib.IncMinuteStr(EndTime, 24 * 60);
      }

      if (StrTime < WTimeStr && EndTime > WTimeStr) StrTime = WTimeStr;
      if (StrTime < WTimeEnd && EndTime > WTimeEnd) EndTime = WTimeEnd;

      if (
        WTimeStr <= StrTime &&
        WTimeEnd > StrTime &&
        WTimeStr < EndTime &&
        WTimeEnd > EndTime
      ) {
        LTimeMinute = InfraLib.TimeTermMinuteStr(StrTime, EndTime);
        LTimeMinute =
          Math.trunc(LTimeMinute / GongLib.ValList[1].WPMOBILECCTIMEUPIN) *
          GongLib.ValList[1].WPMOBILECCTIMEUPOUT;
        if (SWLTimeGubun === "1" || SWLTimeGubun === "A") Result = 0.25;
        if (SWLTimeGubun === "2" || SWLTimeGubun === "B") Result = 0.5;
        if (SWLTimeGubun === "3" || SWLTimeGubun === "C") Result = 0.75;
        if (SWLTimeGubun === "4" || SWLTimeGubun === "D") Result = 1;
        if (SWLTimeGubun === "5" || SWLTimeGubun === "E") Result = 1.25;
        if (SWLTimeGubun === "6" || SWLTimeGubun === "F") Result = 1.5;
        if (SWLTimeGubun === "7" || SWLTimeGubun === "G") Result = 1.75;
        if (SWLTimeGubun === "8" || SWLTimeGubun === "H") Result = 2;
        Result = InfraLib.infraRoundUp(
          Result * (LTimeMinute / 60),
          GongLib.ValList[1].VALBASEDIGIT
        );
      }
    }
  };

  if (WTimeStr === WTimeEnd) {
    return (Result = 0);
  }

  if (KindOfTime === "특근") {
    if (Math.trim(WTimeStr) === "" || Math.trim(WTimeEnd) === "") {
      return (Result = 0);
    }
    is24Add = false;
    if (WTimeEnd < WTimeStr) {
      WTimeEnd = InfraLib.IncMinuteStr(WTimeEnd, 24 * 60);
      is24Add = true;
      TkTime = calcTkTime(LTimeGubun1, LTimeStr1, LTimeEnd1);
      TkTime = TkTime + calcTkTime(LTimeGubun2, LTimeStr2, LTimeEnd2);
      TkTime = TkTime + calcTkTime(LTimeGubun3, LTimeStr3, LTimeEnd3);
      TkTime = TkTime + calcTkTime(LTimeGubun4, LTimeStr4, LTimeEnd4);
      TkTime = TkTime + calcTkTime(LTimeGubun5, LTimeStr5, LTimeEnd5);
      Result = TkTime;
      return;
    }
  }
  //매개변수에 공백 제거
  WTimeStr = Math.trim(WTimeStr);
  WTimeEnd = Math.trim(WTimeEnd);
  LTimeStr1 = Math.trim(LTimeStr1);
  LTimeEnd1 = Math.trim(LTimeEnd1);
  LTimeGubun1 = Math.trim(LTimeGubun1);
  LTimeStr2 = Math.trim(LTimeStr2);
  LTimeEnd2 = Math.trim(LTimeEnd2);
  LTimeGubun2 = Math.trim(LTimeGubun2);
  LTimeStr3 = Math.trim(LTimeStr3);
  LTimeEnd3 = Math.trim(LTimeEnd3);
  LTimeGubun3 = Math.trim(LTimeGubun3);
  LTimeStr4 = Math.trim(LTimeStr4);
  LTimeEnd4 = Math.trim(LTimeEnd4);
  LTimeGubun4 = Math.trim(LTimeGubun4);
  LTimeStr5 = Math.trim(LTimeStr5);
  LTimeEnd5 = Math.trim(LTimeEnd5);
  LTimeGubun5 = Math.trim(LTimeGubun5);
  if (WTimeStr === WTimeEnd || WTimeStr === "" || WTimeEnd === "") {
    return (Result = 0);
  }
  //휴게시간 적용법에 따라 휴게시간 재셋팅: 포함(1)인 경우 휴게시간을 비워서 반영되지 않게 한다.
  if (LTimeGubun1 === "1") {
    LTimeStr1 = "";
    LTimeEnd1 = "";
  }
  if (LTimeGubun2 === "1") {
    LTimeStr2 = "";
    LTimeEnd2 = "";
  }
  if (LTimeGubun3 === "1") {
    LTimeStr3 = "";
    LTimeEnd3 = "";
  }
  if (LTimeGubun4 === "1") {
    LTimeStr4 = "";
    LTimeEnd4 = "";
  }
  if (LTimeGubun5 === "1") {
    LTimeStr5 = "";
    LTimeEnd5 = "";
  }
  is24Add = false; //근무시간에 24시간을 가산한 것인지 체크하는 변수
  //근로 종료 시간이 근로 시작시간보다 작은 경우는 방 12시를 넘긴 것이므로 종료시간에 24시간을 더하여 계산
  if (WTimeStr >= WTimeEnd) {
    WTimeEnd = InfraLib.IncMinuteStr(WTimeEnd, 24 * 60);
    is24Add = true;
  }

  //휴게 종료 시간이 휴게 시작시간보다 작은 경우는 방 12시를 넘긴 것이므로 종료시간에 24시간을 더하여 계산
  if (
    Math.trim(LTimeStr1) !== "" &&
    Math.trim(LTimeEnd1) !== "" &&
    LTimeStr1 >= LTimeEnd1
  )
    LTimeEnd1 = InfraLib.IncMinuteStr(LTimeEnd1, 24 * 60);
  if (
    Math.trim(LTimeStr2) !== "" &&
    Math.trim(LTimeEnd2) !== "" &&
    LTimeStr2 >= LTimeEnd2
  )
    LTimeEnd2 = InfraLib.IncMinuteStr(LTimeEnd2, 24 * 60);
  if (
    Math.trim(LTimeStr3) !== "" &&
    Math.trim(LTimeEnd3) !== "" &&
    LTimeStr3 >= LTimeEnd3
  )
    LTimeEnd3 = InfraLib.IncMinuteStr(LTimeEnd3, 24 * 60);
  if (
    Math.trim(LTimeStr4) !== "" &&
    Math.trim(LTimeEnd4) !== "" &&
    LTimeStr4 >= LTimeEnd4
  )
    LTimeEnd4 = InfraLib.IncMinuteStr(LTimeEnd4, 24 * 60);
  if (
    Math.trim(LTimeStr5) !== "" &&
    Math.trim(LTimeEnd5) !== "" &&
    LTimeStr5 >= LTimeEnd5
  )
    LTimeEnd5 = InfraLib.IncMinuteStr(LTimeEnd5, 24 * 60);

  //휴게시간이 근무시간에 포함되어 있지 않다면 휴게시간도 24시간을 가산해서 계산
  if (Math.trim(LTimeStr1) !== "" && Math.trim(LTimeEnd1) !== "") {
    if (
      (LTimeStr1 < WTimeStr && LTimeEnd1 < WTimeEnd) ||
      (LTimeStr1 > WTimeStr && LTimeEnd1 > WTimeEnd)
    ) {
      LTimeStr1 = InfraLib.IncMinuteStr(LTimeStr1, 24 * 60);
      LTimeEnd1 = InfraLib.IncMinuteStr(LTimeEnd1, 24 * 60);
    }
  }
  if (Math.trim(LTimeStr2) !== "" && Math.trim(LTimeEnd2) !== "") {
    if (
      (LTimeStr2 < WTimeStr && LTimeEnd2 < WTimeEnd) ||
      (LTimeStr2 > WTimeStr && LTimeEnd2 > WTimeEnd)
    ) {
      LTimeStr2 = InfraLib.IncMinuteStr(LTimeStr2, 24 * 60);
      LTimeEnd2 = InfraLib.IncMinuteStr(LTimeEnd2, 24 * 60);
    }
  }
  if (Math.trim(LTimeStr3) !== "" && Math.trim(LTimeEnd3) !== "") {
    if (
      (LTimeStr3 < WTimeStr && LTimeEnd3 < WTimeEnd) ||
      (LTimeStr3 > WTimeStr && LTimeEnd3 > WTimeEnd)
    ) {
      LTimeStr3 = InfraLib.IncMinuteStr(LTimeStr3, 24 * 60);
      LTimeEnd3 = InfraLib.IncMinuteStr(LTimeEnd3, 24 * 60);
    }
  }
  if (Math.trim(LTimeStr4) !== "" && Math.trim(LTimeEnd4) !== "") {
    if (
      (LTimeStr4 < WTimeStr && LTimeEnd4 < WTimeEnd) ||
      (LTimeStr4 > WTimeStr && LTimeEnd4 > WTimeEnd)
    ) {
      LTimeStr4 = InfraLib.IncMinuteStr(LTimeStr4, 24 * 60);
      LTimeEnd4 = InfraLib.IncMinuteStr(LTimeEnd4, 24 * 60);
    }
  }
  if (Math.trim(LTimeStr5) !== "" && Math.trim(LTimeEnd5) !== "") {
    if (
      (LTimeStr5 < WTimeStr && LTimeEnd5 < WTimeEnd) ||
      (LTimeStr5 > WTimeStr && LTimeEnd5 > WTimeEnd)
    ) {
      LTimeStr5 = InfraLib.IncMinuteStr(LTimeStr5, 24 * 60);
      LTimeEnd5 = InfraLib.IncMinuteStr(LTimeEnd5, 24 * 60);
    }
  }

  //법정야간근로시간을 재계산(종료시간이 시작시간보다 작은경우 24시간을 더함)
  if (NightStr >= NightEnd) NightEnd = InfraLib.IncMinuteStr(NightEnd, 24 * 60);

  //근로시간을 주간 근로 시간과 야간 근로시간으로 나눔
  //  DayWTimeStrs   := TStringList.Create;
  //  DayWTimeEnds   := TStringList.Create;
  DayWTimeStrs.push(WTimeStr);
  DayWTimeEnds.push(WTimeEnd);

  //주간 근로시간중 휴게시간은 제외0
  if (Math.trim(LTimeStr1) !== "" && Math.trim(LTimeEnd1) !== "")
    WTimeMinusLTime(DayWTimeStrs, DayWTimeEnds, LTimeStr1, LTimeEnd1);
  if (Math.trim(LTimeStr2) !== "" && Math.trim(LTimeEnd2) !== "")
    WTimeMinusLTime(DayWTimeStrs, DayWTimeEnds, LTimeStr2, LTimeEnd2);
  if (Math.trim(LTimeStr3) !== "" && Math.trim(LTimeEnd3) !== "")
    WTimeMinusLTime(DayWTimeStrs, DayWTimeEnds, LTimeStr3, LTimeEnd3);
  if (Math.trim(LTimeStr4) !== "" && Math.trim(LTimeEnd4) !== "")
    WTimeMinusLTime(DayWTimeStrs, DayWTimeEnds, LTimeStr4, LTimeEnd4);
  if (Math.trim(LTimeStr5) !== "" && Math.trim(LTimeEnd5) !== "")
    WTimeMinusLTime(DayWTimeStrs, DayWTimeEnds, LTimeStr5, LTimeEnd5);

  BaseTime = 0;
  NightTime = 0;
  OverTime = 0;
  ONTime = 0;

  //하루의주간 근로시간을 계산한다.
  for (let i = 0; i < DayWTimeStrs.length; i++) {
    //주간 근로시간을 분단위로 계산

    if (BaseTime < DayWTimeLimit * 60) {
      //기본 근로시간이 법정일당근로시간 미만인경우: 기본근로시간을 가산. 만약 법정일당근로시간 초과시 자투리만큼을 연장근로에 가산. 연장근로에 가산시 야간타임이면 야간연장에 가산.
      //기본근로시간중 야간타임에 걸렸으면 해당시간만큼 야간기간 가산.
      BaseTime =
        BaseTime + InfraLib.TimeTermMinuteStr(DayWTimeStrs[i], DayWTimeEnds[i]);
      //법정일당기본근로시간을 초과한 순간. 해당 구획의 근로시간의 자투리시간을 가지고 연장과 연장여간을 계산
      if (BaseTime > DayWTimeLimit * 60) {
        //기본근로시간이 법정일당근로시간 초과. 초과분이 야간타임인지에 따라 연장, 또는 연장야간에 가산
        //자투리시작시간 찾기
        tempTime = InfraLib.IncMinuteStr(
          DayWTimeEnds[i],
          Math.Floor(DayWTimeLimit * 60 - BaseTime)
        ); //근무종료시간에서 초과분시작지점의 시간을 계산
        CalcOverTimes(tempTime, DayWTimeEnds[i]); //자투리 시간의 연장, 야간 연장근로 시간을 계산
        CalcNightTime(DayWTimeStrs[i], tempTime); //자투리 시간이 아닌 범위의 야간근로시간을 계산
        BaseTime = DayWTimeLimit * 60;
      } else {
        //법정일당근로시간안쪽. 야간근로시간이 결려있는지 계산
        CalcNightTime(DayWTimeStrs[i], DayWTimeEnds[i]); //야간근로시간을 계산
      }
    } else {
      //법정일당기본근로를 초과한 경우. 연장근로와 야간연장 근로를 계산한다.
      CalcOverTimes(DayWTimeStrs[i], DayWTimeEnds[i]);
    }
  }
  //분단위 시간을 시간단위로 환산하여 리턴
  if (KindOfTime === "기본")
    Result = InfraLib.infraRoundUp(
      BaseTime / 60,
      GongLib.ValList[1].VALBASEDIGIT
    );
  else if (KindOfTime === "연장")
    Result = InfraLib.infraRoundUp(
      OverTime / 60,
      GongLib.ValList[1].VALOVERDIGIT
    );
  else if (KindOfTime === "야간")
    Result = InfraLib.infraRoundUp(
      NightTime / 60,
      GongLib.ValList[1].VALOVERDIGIT
    );
  else if (KindOfTime === "연장야간" || KindOfTime === "야간연장")
    Result = InfraLib.infraRoundUp(
      ONTime / 60,
      GongLib.ValList[1].VALOVERDIGIT
    );
  else if (KindOfTime === "휴일기본")
    Result = InfraLib.infraRoundUp(
      BaseTime / 60,
      GongLib.ValList[1].VALOVERDIGIT
    );
  else Result = -1;
};
//무휴일에 대해 주간 소정근로시간 초과, 또는 법정주간근로시간(40시간)초과시 연장근무로 셋팅하는 함수
Func.MuhueOverTimeCheck = (
  WTimeReCalc,
  CDList,
  CDList_BefMonth,
  CDList_AftMonth,
  G1_CDate,
  G1_DateGubun,
  G1_CNDayWeek,
  G1_CNGubun,
  G1_SWTimeStr,
  G1_SWTimeEnd,
  G1_CNWStrTime,
  G1_CNWEndTime,
  G1_SWLTimeStr1,
  G1_SWLTimeEnd1,
  G1_SWLTimeStr2,
  G1_SWLTimeEnd2,
  G1_SWLTimeStr3,
  G1_SWLTimeEnd3,
  G1_SWLTimeStr4,
  G1_SWLTimeEnd4,
  G1_SWLTimeStr5,
  G1_SWLTimeEnd5,
  G1_HTime,
  G1_CNHTime,
  G1_TotWorkTime,
  G1_CNSStrTime,
  G1_CNSEndTime,
  G1_CCWTimeNormal,
  G1_CCWTimeHoli, //매개변수중 G1_CCWTime가 삭제됨//, G1_CCWTime, G1_CCWTimeNormal, G1_CCWTimeHoli
  G1_CCWTimeOver,
  G1_CCWTimeNight,
  G1_CCWTimeNightOver,
  G1_CCHTimeBase,
  G1_CCHTimeOver,
  G1_CCHTimeNight,
  G1_CCHTimeNightOver,
  G1_CCTkTime,
  SWHoliWeek,
  SWNightStrWTime,
  SWNightEndWTime,
  SWLTimeGubun1,
  SWLTimeGubun2,
  SWLTimeGubun3,
  SWLTimeGubun4,
  SWLTimeGubun5,
  iRow,
  SWMinorYN
) => {
  var q;
  var isMuhue;
  var JuHueRow;
  var WTimeWork; //해당주의 총근로시간
  var BaseTotOfWeek; //해당주의 기본 실근로시간의 합계
  var BaseTotOfWeek_Join; //해당주의 기본 소정근로시간의 합계
  var Base_Join; //해당 일의 소정근로시간
  var MuhueBase; //무휴일때 해당일의 기본근로시간
  var MuhueNight; //무휴일때 해당일의 야간근로시간
  var MuhueNightOver; //당일 연장야간기산
  var iWTimeOfWeekLimit;
  if (CDList[iRow].G1_CNGubun === "8") return;
  //미성년 여부에 따라 주당 법정 근로시간 셋팅
  if (SWMinorYN) {
    iWTimeOfWeekLimit = GongLib.ValList[1].WTIMEOFWEEKLIMITMINOR;
  } else {
    iWTimeOfWeekLimit = GongLib.ValList[1].WTIMEOFWEEKLIMIT;
  }
  //우선 기본,야간근로시간 계산
  MuhueBase = CalcWTimes(
    "기본",
    GongLib.ValList[1].WTIMEOFDAYLIMIT,
    SWNightStrWTime,
    SWNightEndWTime,
    CDList[iRow].G1_CNWStrTime,
    CDList[iRow].G1_CNWEndTime,
    CDList[iRow].G1_SWLTimeStr1,
    CDList[iRow].G1_SWLTimeEnd1,
    SWLTimeGubun1,
    CDList[iRow].G1_SWLTimeStr2,
    CDList[iRow].G1_SWLTimeEnd2,
    SWLTimeGubun2,
    CDList[iRow].G1_SWLTimeStr3,
    CDList[iRow].G1_SWLTimeEnd3,
    SWLTimeGubun3,
    CDList[iRow].G1_SWLTimeStr4,
    CDList[iRow].G1_SWLTimeEnd4,
    SWLTimeGubun4,
    CDList[iRow].G1_SWLTimeStr5,
    CDList[iRow].G1_SWLTimeEnd5,
    SWLTimeGubun5
  );

  MuhueNight = CalcWTimes(
    "야간",
    GongLib.ValList[1].WTIMEOFDAYLIMIT,
    SWNightStrWTime,
    SWNightEndWTime,
    CDList[iRow].G1_CNWStrTime,
    CDList[iRow].G1_CNWEndTime,
    CDList[iRow].G1_SWLTimeStr1,
    CDList[iRow].G1_SWLTimeEnd1,
    SWLTimeGubun1,
    CDList[iRow].G1_SWLTimeStr2,
    CDList[iRow].G1_SWLTimeEnd2,
    SWLTimeGubun2,
    CDList[iRow].G1_SWLTimeStr3,
    CDList[iRow].G1_SWLTimeEnd3,
    SWLTimeGubun3,
    CDList[iRow].G1_SWLTimeStr4,
    CDList[iRow].G1_SWLTimeEnd4,
    SWLTimeGubun4,
    CDList[iRow].G1_SWLTimeStr5,
    CDList[iRow].G1_SWLTimeEnd5,
    SWLTimeGubun5
  );
  MuhueNightOver = CalcWTimes(
    "연장야간",
    GongLib.ValList[1].WTIMEOFDAYLIMIT,
    SWNightStrWTime,
    SWNightEndWTime,
    CDList[iRow].G1_CNWStrTime,
    CDList[iRow].G1_CNWEndTime,
    CDList[iRow].G1_SWLTimeStr1,
    CDList[iRow].G1_SWLTimeEnd1,
    SWLTimeGubun1,
    CDList[iRow].G1_SWLTimeStr2,
    CDList[iRow].G1_SWLTimeEnd2,
    SWLTimeGubun2,
    CDList[iRow].G1_SWLTimeStr3,
    CDList[iRow].G1_SWLTimeEnd3,
    SWLTimeGubun3,
    CDList[iRow].G1_SWLTimeStr4,
    CDList[iRow].G1_SWLTimeEnd4,
    SWLTimeGubun4,
    CDList[iRow].G1_SWLTimeStr5,
    CDList[iRow].G1_SWLTimeEnd5,
    SWLTimeGubun5
  );
  //해당일자의 앞쪽일자의 주당 근로시간(소정, 실제 둘다)을 합산
  BaseTotOfWeek = 0; //해당주의 기본 실근로시간의 합계
  BaseTotOfWeek_Join = 0; //해당주의 기본 소정근로시간의 합계
  q = iRow - 1; //주휴는제외?? -1??
  while (q >= 0) {
    if (CDList[q].G1_CNDayWeek === SWHoliWeek) break;
    BaseTotOfWeek = BaseTotOfWeek + CDList[q].G1_CCWTimeNormal;
    BaseTotOfWeek_Join =
      BaseTotOfWeek_Join +
      CalcWTimes(
        "기본",
        GongLib.ValList[1].WTIMEOFDAYLIMIT,
        SWNightStrWTime,
        SWNightEndWTime,
        CDList[q].G1_CNWStrTime,
        CDList[q].G1_CNWEndTime,
        CDList[q].G1_SWLTimeStr1,
        CDList[q].G1_SWLTimeEnd1,
        SWLTimeGubun1,
        CDList[q].G1_SWLTimeStr2,
        CDList[q].G1_SWLTimeEnd2,
        SWLTimeGubun2,
        CDList[q].G1_SWLTimeStr3,
        CDList[q].G1_SWLTimeEnd3,
        SWLTimeGubun3,
        CDList[q].G1_SWLTimeStr4,
        CDList[q].G1_SWLTimeEnd4,
        SWLTimeGubun4,
        CDList[q].G1_SWLTimeStr5,
        CDList[q].G1_SWLTimeEnd5,
        SWLTimeGubun5
      );
    q = q - 1;
  }
  if (q < 0) {
    //이번달 그리드의 1일까지 합산됨. 이전달의 합을 계산해야함
    if (CDList_BefMonth !== null) {
      for (let i = 0; i < CDList_BefMonth.length; i++) {
        //이전달 그리드어 어차피 마지막 주휴 다음날부터 말일까지 조회되므로 전부 합계를 내면 됨
        BaseTotOfWeek = BaseTotOfWeek + CDList_BefMonth[q].G1_CCWTimeNormal;
        BaseTotOfWeek_Join =
          BaseTotOfWeek_Join +
          CalcWTimes(
            "기본",
            GongLib.ValList[1].WTIMEOFDAYLIMIT,
            SWNightStrWTime,
            SWNightEndWTime,
            CDList[q].G1_CNWStrTime,
            CDList[q].G1_CNWEndTime,
            CDList[q].G1_SWLTimeStr1,
            CDList[q].G1_SWLTimeEnd1,
            SWLTimeGubun1,
            CDList[q].G1_SWLTimeStr2,
            CDList[q].G1_SWLTimeEnd2,
            SWLTimeGubun2,
            CDList[q].G1_SWLTimeStr3,
            CDList[q].G1_SWLTimeEnd3,
            SWLTimeGubun3,
            CDList[q].G1_SWLTimeStr4,
            CDList[q].G1_SWLTimeEnd4,
            SWLTimeGubun4,
            CDList[q].G1_SWLTimeStr5,
            CDList[q].G1_SWLTimeEnd5,
            SWLTimeGubun5
          );
      }
    }
  }
  //해당일자의 뒤쪽일자의 주당 근로시간(소정, 실제 둘다)을 합산
  for (let i = iRow; i < CDList.length; i++) {
    if (CDList[i].G1_CNDayWeek === SWHoliWeek) break; //주휴일을 만남.합산 끝
    BaseTotOfWeek_Join =
      BaseTotOfWeek_Join +
      CalcWTimes(
        "기본",
        GongLib.ValList[1].WTIMEOFDAYLIMIT,
        SWNightStrWTime,
        SWNightEndWTime,
        CDList[i].G1_CNWStrTime,
        CDList[i].G1_CNWEndTime,
        CDList[i].G1_SWLTimeStr1,
        CDList[i].G1_SWLTimeEnd1,
        SWLTimeGubun1,
        CDList[i].G1_SWLTimeStr2,
        CDList[i].G1_SWLTimeEnd2,
        SWLTimeGubun2,
        CDList[i].G1_SWLTimeStr3,
        CDList[i].G1_SWLTimeEnd3,
        SWLTimeGubun3,
        CDList[i].G1_SWLTimeStr4,
        CDList[i].G1_SWLTimeEnd4,
        SWLTimeGubun4,
        CDList[i].G1_SWLTimeStr5,
        CDList[i].G1_SWLTimeEnd5,
        SWLTimeGubun5
      );
    if ((q = iRow)) continue;
    if (CDList[i].G1_CNDayWeek === SWHoliWeek) break;
    if (CDList_BefMonth !== null) {
      BaseTotOfWeek = BaseTotOfWeek + CDList_BefMonth[i].G1_CCWTimeNormal;
    }
  }
  //실 근로시간이 소정근로 시간합을 초과했는지 비교
  if (BaseTotOfWeek + MuhueBase > iWTimeOfWeekLimit) {
    //소정근로시간보다 주간 실근로시간과 무휴일의 근무시간의 합이 더 큼. 초과분만큼은 연장으로 들어간다.
    if (MuhueNight > 0 && BaseTotOfWeek + MuhueBase - BaseTotOfWeek_Join > 0)
      CDList[iRow].G1_CCWTimeNight =
        MuhueNight - (BaseTotOfWeek + MuhueBase - BaseTotOfWeek_Join); //당일실제야간 = 당일야간-(주간실근로시간+당일기본근로시간-주간소정근로시간)

    if (CDList[iRow].G1_CCWTimeNight < 0) CDList[iRow].G1_CCWTimeNight = 0; //야간근로시간이 마이너스면 강제로 0으로 셋팅
    CDList[iRow].G1_CCWTimeNightOver =
      MuhueNight - CDList[iRow].G1_CCWTimeNight; //당일야간연장 = 당일야간 - 당일실제야간
    if (CDList[iRow].G1_CCWTimeNightOver < 0)
      CDList[iRow].G1_CCWTimeNightOver = 0; //마이너스면 강제로 0으로

    CDList[iRow].G1_CCWTimeOver = BaseTotOfWeek + MuhueBase - iWTimeOfWeekLimit; //당일연장=(주간실근로시간+당일기본근로시간-주간소정근로시간)
    CDList[iRow].G1_CCWTimeNormal = iWTimeOfWeekLimit - BaseTotOfWeek;
    if (CDList[iRow].G1_CCWTimeOver > MuhueBase)
      CDList[iRow].G1_CCWTimeOver = MuhueBase;
    if (CDList[iRow].G1_CCWTimeOver < 0) CDList[iRow].G1_CCWTimeOver = 0;
    if (CDList[iRow].G1_CCWTimeNormal > MuhueBase)
      CDList[iRow].G1_CCWTimeNormal = MuhueBase;
    if (CDList[iRow].G1_CCWTimeNormal < 0) CDList[iRow].G1_CCWTimeNormal = 0;
    CDList[iRow].G1_CCWTimeOver =
      CDList[iRow].G1_CCWTimeOver +
      CalcWTimes(
        "연장",
        GongLib.ValList[1].WTIMEOFDAYLIMIT,
        SWNightStrWTime,
        SWNightEndWTime,
        CDList[iRow].G1_CNWStrTime,
        CDList[iRow].G1_CNWEndTime,
        CDList[iRow].G1_SWLTimeStr1,
        CDList[iRow].G1_SWLTimeEnd1,
        SWLTimeGubun1,
        CDList[iRow].G1_SWLTimeStr2,
        CDList[iRow].G1_SWLTimeEnd2,
        SWLTimeGubun2,
        CDList[iRow].G1_SWLTimeStr3,
        CDList[iRow].G1_SWLTimeEnd3,
        SWLTimeGubun3,
        CDList[iRow].G1_SWLTimeStr4,
        CDList[iRow].G1_SWLTimeEnd4,
        SWLTimeGubun4,
        CDList[iRow].G1_SWLTimeStr5,
        CDList[iRow].G1_SWLTimeEnd5,
        SWLTimeGubun5
      );
    CDList[iRow].G1_CCWTimeNightOver =
      CDList[iRow].G1_CCWTimeNightOver +
      CalcWTimes(
        "야간연장",
        GongLib.ValList[1].WTIMEOFDAYLIMIT,
        SWNightStrWTime,
        SWNightEndWTime,
        CDList[iRow].G1_CNWStrTime,
        CDList[iRow].G1_CNWEndTime,
        CDList[iRow].G1_SWLTimeStr1,
        CDList[iRow].G1_SWLTimeEnd1,
        SWLTimeGubun1,
        CDList[iRow].G1_SWLTimeStr2,
        CDList[iRow].G1_SWLTimeEnd2,
        SWLTimeGubun2,
        CDList[iRow].G1_SWLTimeStr3,
        CDList[iRow].G1_SWLTimeEnd3,
        SWLTimeGubun3,
        CDList[iRow].G1_SWLTimeStr4,
        CDList[iRow].G1_SWLTimeEnd4,
        SWLTimeGubun4,
        CDList[iRow].G1_SWLTimeStr5,
        CDList[iRow].G1_SWLTimeEnd5,
        SWLTimeGubun5
      );
    CDList[iRow].G1_CCWTimeHoli = InfraLib.infraRoundUp(
      CDList[iRow].G1_CCWTimeNormal * GongLib.ValList[1].VALWTIMEHOLIRATE,
      GongLib.ValList[1].VALBASEDIGIT
    );
  } else {
    CDList[iRow].G1_CCWTimeNormal = MuhueBase;
    CDList[iRow].G1_CCWTimeNight = MuhueNight;
    CDList[iRow].G1_CCWTimeOver = CalcWTimes(
      "연장",
      GongLib.ValList[1].WTIMEOFDAYLIMIT,
      SWNightStrWTime,
      SWNightEndWTime,
      CDList[iRow].G1_CNWStrTime,
      CDList[iRow].G1_CNWEndTime,
      CDList[iRow].G1_SWLTimeStr1,
      CDList[iRow].G1_SWLTimeEnd1,
      SWLTimeGubun1,
      CDList[iRow].G1_SWLTimeStr2,
      CDList[iRow].G1_SWLTimeEnd2,
      SWLTimeGubun2,
      CDList[iRow].G1_SWLTimeStr3,
      CDList[iRow].G1_SWLTimeEnd3,
      SWLTimeGubun3,
      CDList[iRow].G1_SWLTimeStr4,
      CDList[iRow].G1_SWLTimeEnd4,
      SWLTimeGubun4,
      CDList[iRow].G1_SWLTimeStr5,
      CDList[iRow].G1_SWLTimeEnd5,
      SWLTimeGubun5
    );
    CDList[iRow].G1_CCWTimeNightOver = CalcWTimes(
      "야간연장",
      GongLib.ValList[1].WTIMEOFDAYLIMIT,
      SWNightStrWTime,
      SWNightEndWTime,
      CDList[iRow].G1_CNWStrTime,
      CDList[iRow].G1_CNWEndTime,
      CDList[iRow].G1_SWLTimeStr1,
      CDList[iRow].G1_SWLTimeEnd1,
      SWLTimeGubun1,
      CDList[iRow].G1_SWLTimeStr2,
      CDList[iRow].G1_SWLTimeEnd2,
      SWLTimeGubun2,
      CDList[iRow].G1_SWLTimeStr3,
      CDList[iRow].G1_SWLTimeEnd3,
      SWLTimeGubun3,
      CDList[iRow].G1_SWLTimeStr4,
      CDList[iRow].G1_SWLTimeEnd4,
      SWLTimeGubun4,
      CDList[iRow].G1_SWLTimeStr5,
      CDList[iRow].G1_SWLTimeEnd5,
      SWLTimeGubun5
    );
  }
};
Func.MuhueOverTimeCheck = (
  WTimeReCalc,
  CDList,
  CDList_BefMonth,
  CDList_AftMonth,
  G1_CDate,
  G1_DateGubun,
  G1_CNDayWeek,
  G1_CNGubun,
  G1_SWTimeStr,
  G1_SWTimeEnd,
  G1_CNWStrTime,
  G1_CNWEndTime,
  G1_SWLTimeStr1,
  G1_SWLTimeEnd1,
  G1_SWLTimeStr2,
  G1_SWLTimeEnd2,
  G1_SWLTimeStr3,
  G1_SWLTimeEnd3,
  G1_SWLTimeStr4,
  G1_SWLTimeEnd4,
  G1_SWLTimeStr5,
  G1_SWLTimeEnd5,
  G1_HTime,
  G1_CNHTime,
  G1_TotWorkTime,
  G1_CNSStrTime,
  G1_CNSEndTime,
  G1_CCWTimeNormal,
  G1_CCWTimeHoli, //매개변수중 G1_CCWTime가 삭제됨//, G1_CCWTime, G1_CCWTimeNormal, G1_CCWTimeHoli
  G1_CCWTimeOver,
  G1_CCWTimeNight,
  G1_CCWTimeNightOver,
  G1_CCHTimeBase,
  G1_CCHTimeOver,
  G1_CCHTimeNight,
  G1_CCHTimeNightOver,
  G1_CCTkTime,
  SWHoliWeek,
  SWNightStrWTime,
  SWNightEndWTime,
  SWLTimeGubun1,
  SWLTimeGubun2,
  SWLTimeGubun3,
  SWLTimeGubun4,
  SWLTimeGubun5,
  iRow,
  SWMinorYN
) => {};
//적용휴게시간과 총근로시간을 계산
Func.calcLTimeNWTime = (
  CNList,
  G1_CNWStrTime,
  G1_CNWEndTime,
  G1_SWLTimeStr1,
  G1_SWLTimeEnd1,
  G1_SWLTimeStr2,
  G1_SWLTimeEnd2,
  G1_SWLTimeStr3,
  G1_SWLTimeEnd3,
  G1_SWLTimeStr4,
  G1_SWLTimeEnd4,
  G1_SWLTimeStr5,
  G1_SWLTimeEnd5,
  G1_HTime,
  G1_CNHTime,
  G1_TotWorkTime,
  Row
) => {};

Func.SetAddHTime = (
  CNList,
  Row,
  SWHoliPayYN,
  G1_CNHTime,
  G1_CNGubun,
  G1_CCWTimeNormal,
  G1_CCWTimeHoli,
  G1_CCWTimeOver,
  G1_CCWTimeNight,
  G1_CCWTimeNightOver, //매개변수 G1_CCWTime 삭제됨 //, G1_CCWTime, G1_CCWTimeNormal, G1_CCWTimeHoli, G1_CCWTimeOver, G1_CCWTimeNight, G1_CCWTimeNightOver
  G1_CCHTimeBase,
  G1_CCHTimeOver,
  G1_CCHTimeNight,
  G1_CCHTimeNightOver,
  G1_CCTkTime
) => {};
export default Func;
