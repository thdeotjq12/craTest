import axios from "axios";
import InfraLib from "./InfraLib";
import PublicValue from "./PublicValue";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tr } from "date-fns/esm/locale";
import Val from "../pages/Main/ComeCheckDetail/index";
import { addHours } from "date-fns";
import { getTime } from "date-fns/esm";
import moment from "moment";
import { isString } from "util";
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
//적용휴게시간과 총근로시간을 계산
const calcLTimeNWTime = (
  CNList,
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
  Row
) => {
  var LTimeTot; //적용된 휴게시간
  var is24Over;
  var LTimeStr;
  var LTimeEnd;
  //휴게시간이 24시간 가산된 근무시간 밖에 있을때
  //휴휴게시간도 24시간 가산
  const SetLTime = (WTimeStr, iLTimeStr, iLTimeEnd) => {
    LTimeStr = iLTimeStr;
    LTimeEnd = iLTimeEnd;
    if (WTimeStr === "" || iLTimeStr === "" || iLTimeEnd === "") return;
    if (WTimeStr > LTimeStr) LTimeStr = addHours(LTimeStr, 24);
    if (WTimeStr > LTimeEnd) LTimeEnd = addHours(LTimeEnd, 24);
  };
  is24Over = false;
  //해당일의 적용휴게시간과 총근로시간을 계산
  SetLTime(
    CNList[Row].CDWStrTime,
    CNList[Row].SSLTimeStr1,
    CNList[Row].SSLTimeEnd1
  );
  LTimeTot = InfraLib.calcMiute_BaseNObjTime(
    CNList[Row].CDWStrTime,
    CNList[Row].CDWEndTime,
    LTimeStr,
    LTimeEnd
  );
  SetLTime(
    CNList[Row].CDWStrTime,
    CNList[Row].SSLTimeStr2,
    CNList[Row].SSLTimeEnd2
  );
  LTimeTot =
    LTimeTot +
    InfraLib.calcMiute_BaseNObjTime(
      CNList[Row].CDWStrTime,
      CNList[Row].CDWEndTime,
      LTimeStr,
      LTimeEnd
    );
  SetLTime(
    CNList[Row].CDWStrTime,
    CNList[Row].SSLTimeStr3,
    CNList[Row].SSLTimeEnd3
  );
  LTimeTot =
    LTimeTot +
    InfraLib.calcMiute_BaseNObjTime(
      CNList[Row].CDWStrTime,
      CNList[Row].CDWEndTime,
      LTimeStr,
      LTimeEnd
    );
  SetLTime(
    CNList[Row].CDWStrTime,
    CNList[Row].SSLTimeStr4,
    CNList[Row].SSLTimeEnd4
  );
  LTimeTot =
    LTimeTot +
    InfraLib.calcMiute_BaseNObjTime(
      CNList[Row].CDWStrTime,
      CNList[Row].CDWEndTime,
      LTimeStr,
      LTimeEnd
    );
  SetLTime(
    CNList[Row].CDWStrTime,
    CNList[Row].SSLTimeStr5,
    CNList[Row].SSLTimeEnd5
  );
  LTimeTot =
    LTimeTot +
    InfraLib.calcMiute_BaseNObjTime(
      CNList[Row].CDWStrTime,
      CNList[Row].CDWEndTime,
      LTimeStr,
      LTimeEnd
    );

  CNList[Row].HTime = LTimeTot / 60 + CNList[Row].CDHTime; //적용된 휴게시간
  CNList[Row].TotWorkTime =
    InfraLib.TimeTermMinuteStr(CNList[Row].CDWStrTime, CNList[Row].CDWEndTime) /
      60 -
    CNList[Row].HTime; //총근로시간
  return CNList;
};

const SetAddHTime = (
  CNList,
  Row,
  SWHoliPayYN,
  CNHTime,
  CNGubun,
  CDWTimeNormal,
  CDWTimeHoli,
  CDWTimeOver,
  CDWTimeNight,
  CDWTimeNightOver, //매개변수 G1_CCWTime 삭제됨 //, G1_CCWTime, CDWTimeNormal, CDWTimeHoli, CDWTimeOver, CDWTimeNight, CDWTimeNightOver
  CDHTimeBase,
  CDHTimeOver,
  CDHTimeNight,
  CDHTimeNightOver,
  CDTkTime
) => {
  var AddHTime; //추가휴게시간
  const SetAddHTime = (TimeIndex, ExtraAddHTime) => {
    var HTime;
    HTime = ExtraAddHTime;
    if (TimeIndex > 0) {
      //해당 근로시간이 있는경우
      if (TimeIndex >= ExtraAddHTime) {
        //해당 근로시간이 휴게시간보다 더 크거나 같은경우
        ExtraAddHTime = ExtraAddHTime - TimeIndex;
        TimeIndex = TimeIndex - HTime;
      } else {
        //해당 근로시간이 휴게시간보다 작은경우
        ExtraAddHTime = ExtraAddHTime - TimeIndex;
        TimeIndex = 0;
      }
    }
    if (ExtraAddHTime < 0) ExtraAddHTime = 0;
    return [ExtraAddHTime, TimeIndex]; //남은 추가휴게시간을 리턴
  };

  AddHTime = CNList[Row].CDHTime; //추가휴게시간 셋팅
  AddHTime = SetAddHTime(CNList[Row].CDHTimeNightOver, AddHTime); //휴일야간연장에 추가휴게시간 적용
  CNList[Row].CDHTimeNightOver = AddHTime[1];
  AddHTime = SetAddHTime(CNList[Row].CDHTimeNight, AddHTime[0]); //휴일야간에 추가휴게시간 적용
  CNList[Row].CDHTimeNight = AddHTime[1];
  AddHTime = SetAddHTime(CNList[Row].CDHTimeOver, AddHTime[0]); //휴일연장에 추가휴게시간 적용
  CNList[Row].CDHTimeOver = AddHTime[1];
  AddHTime = SetAddHTime(CNList[Row].CDHTimeBase, AddHTime[0]); //휴일기본에 추가휴게시간 적용
  CNList[Row].CDHTimeBase = AddHTime[1];
  AddHTime = SetAddHTime(CNList[Row].CDWTimeNightOver, AddHTime[0]); //평일야간연장에 추가휴게시간 적용
  CNList[Row].CDWTimeNightOver = AddHTime[1];
  AddHTime = SetAddHTime(CNList[Row].CDWTimeOver, AddHTime[0]); //평일연장에 추가휴게시간 적용
  CNList[Row].CDWTimeOver = AddHTime[1];
  AddHTime = SetAddHTime(CNList[Row].CDWTimeNormal, AddHTime[0]); //평일기본에 추가휴게시간 적용
  CNList[Row].CDWTimeNormal = AddHTime[1];
  //주휴 다시 계산(위에서 계산한 주휴를 다시 계산하는 것은 비효율 적이나 추가휴게를 계산한다음 주휴를 재계산하기 위함)
  //주휴계산
  if (CNList[Row].CDGubun !== "3") {
    if (SWHoliPayYN) {
      CNList[Row].CDWTimeHoli = InfraLib.infraRoundUp(
        CNList[Row].CDWTimeNormal * PublicValue.ValWTimeHoliRate,
        PublicValue.ValBaseDigit
      );
    } else {
      CNList[Row].CDWTimeHoli = 0;
    }
  }

  return CNList;
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
  CDTkTime,
  CDNoComeCNT,
  CDLateTime,
  CDEarlyOutTime,
  isFirst,
  ValList
) => {
  var moment = require("moment");
  var MuhueWeek;
  console.log("SetCellEditExit 실행됨");
  //연장가산요일 선택
  //1일 2월 3화 4수 5목 6금 7토
  if ((SWHoliWeek = "1")) MuhueWeek = "7";
  else if ((SWHoliWeek = "2")) MuhueWeek = "1";
  else if ((SWHoliWeek = "3")) MuhueWeek = "2";
  else if ((SWHoliWeek = "4")) MuhueWeek = "3";
  else if ((SWHoliWeek = "5")) MuhueWeek = "4";
  else if ((SWHoliWeek = "6")) MuhueWeek = "5";
  else if ((SWHoliWeek = "7")) MuhueWeek = "6";
  ValList && // 위험해보이는 예외처리
    (CNList = SetTimeForGrid(
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
      CDDate,
      CDDayWeek,
      DateGubun,
      CDGubun,
      CDHTime,
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
      CDTkTime,
      CDNoComeCNT,
      CDLateTime,
      CDEarlyOutTime,
      isFirst,
      ValList
    ));
  // SetAddHTime(
  //   CNList,
  //   Row,
  //   SWHoliPayYN,
  //   CDHTime,
  //   CDGubun,
  //   CDWTimeNormal,
  //   CDWTimeHoli,
  //   CDWTimeOver,
  //   CDWTimeNight,
  //   CDWTimeNightOver,
  //   CDHTimeBase,
  //   CDHTimeOver,
  //   CDHTimeNight,
  //   CDHTimeNightOver,
  //   CDTkTime
  // );

  if (CNList[Row].CDGubun !== "1") {
    if (CNList[Row].CDGubun !== "6") {
      if (moment(CNList[Row].CDDate).day() + 1 === MuhueWeek) {
        Func.MuhueOverTimeCheck(
          true,
          CNList,
          CNList_BefMonth,
          CNList_AftMonth,
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
          CDTkTime,
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
          if (CNList[i].CDDayWeek !== "3") {
            if (SWHoliPayYN) {
              CNList[i].CDWTimeHoli = InfraLib.infraRoundUp(
                CNList[i].CDWTimeNormal * PublicValue.ValWTimeHoliRate,
                PublicValue.ValBaseDigit
              );
            } else {
              CNList[i].CDWTimeHoli = 0;
            }
            break;
          }
          if (String(moment(CNList[i].CDDate).day() + 1) === MuhueWeek) {
            CNList = Func.MuhueOverTimeCheck(
              true,
              CNList,
              CNList_BefMonth,
              CNList_AftMonth,
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
              CDTkTime,
              SWHoliWeek,
              SWNightStrWTime,
              SWNightEndWTime,
              SWLTimeGubun1,
              SWLTimeGubun2,
              SWLTimeGubun3,
              SWLTimeGubun4,
              SWLTimeGubun5,
              i,
              SWMinorYN
            ); //무휴일에 대해 주간 소정근로시간 초과, 또는 법정주간근로시간(40시간)초과시 연장근무로 셋팅하는 함수
            break;
          }
          //주휴계산
          if (CNList[i].CDGubun !== "3") {
            if (SWHoliPayYN) {
              CNList[i].CDWTimeHoli = InfraLib.infraRoundUp(
                CNList[i].CDWTimeNormal * PublicValue.ValWTimeHoliRate,
                PublicValue.ValBaseDigit
              );
            } else CNList[i].CDWTimeHoli = 0;
          }
        }
      }
    }
    //적용휴게시간과 총근로시간을 계산
    CNList = calcLTimeNWTime(
      CNList,
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
      Row
    );
    CNList = SetAddHTime(
      CNList,
      Row,
      SWHoliPayYN,
      CDHTime,
      CDGubun,
      CDWTimeNormal,
      CDWTimeHoli,
      CDWTimeOver,
      CDWTimeNight,
      CDWTimeNightOver,
      CDHTimeBase,
      CDHTimeOver,
      CDHTimeNight,
      CDHTimeNightOver,
      CDTkTime
    );
    CNList[Row].TotWorkTime =
      InfraLib.TimeTermMinuteStr(
        CNList[Row].CDWStrTime,
        CNList[Row].CDWEndTime
      ) /
        60 -
      CNList[Row].HTime; //총근로시간
    console.log(" ^^^ Test", CNList);
    return CNList;
  }
};
//해당그리드의 근무구분에 때라 row행의 시간값을 셋팅하는 함수
const SetTimeForGrid = (
  grid,
  row,
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
  CDDate,
  CDDayWeek,
  DateGubun,
  CDGubun,
  CDHTime,
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
  CDTkTime,
  CDNoComeCNT,
  CDLateTime,
  CDEarlyOutTime,
  isFirst,
  ValList
) => {
  var isBelowMuhue;
  var doCalcHTimeToHoli;
  var OutTime = "";
  var SSOutTime = "";
  var moment = require("moment");
  if (grid.length === 0) return;
  grid = ClearTime(
    grid,
    row,
    CDWTimeNormal,
    CDWTimeHoli,
    CDWTimeOver,
    CDWTimeNight,
    CDWTimeNightOver,
    CDHTimeBase,
    CDHTimeOver,
    CDHTimeNight,
    CDHTimeNightOver,
    CDTkTime,
    CDNoComeCNT,
    CDLateTime,
    CDEarlyOutTime
  );
  doCalcHTimeToHoli = false;
  if (
    grid[row].CDGubun === "0" || // 정상근무
    grid[row].CDGubun === "2" || // 대근
    grid[row].CDGubun === "5" || // 무급휴무
    grid[row].CDGubun === "7" // 휴직
  ) {
    //정상근무,대근시 시간 계산
    console.log("1. 정상근무,대근시 시간 계산 CalcTimes");
    grid = CalcTimes(
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
      CDDayWeek,
      CDGubun,
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
      CDTkTime
    ); //근무시간 및 휴게시간으로 각 근무시간을 계산.
    //지각 계산

    if (
      InfraLib.HourToInt(grid[row].SSWTimeStr) <
      InfraLib.HourToInt(grid[row].CDWStrTime)
    )
      grid[row].CDLateTime = InfraLib.infraRoundUp(
        InfraLib.TimeTermMinuteStr(
          grid[row].SSWTimeStr,
          grid[row].CDWStrTime ? grid[row].CDWStrTime : ""
        ) / 60,
        2
      );
    //조퇴 계산
    SSOutTime = grid[row].SSWTimeEnd;
    OutTime = grid[row].CDWEndTime;
    if (InfraLib.HourToInt(grid[row].CDWStrTime) > InfraLib.HourToInt(OutTime))
      OutTime = InfraLib.IncMinuteStr(OutTime, 24 * 60); //출근시간이 퇴근시간 보다 더 큰 경우 퇴근 시간에 24시간 가산.
    if (
      InfraLib.HourToInt(grid[row].SSWTimeStr) > InfraLib.HourToInt(SSOutTime)
    ) {
      SSOutTime = InfraLib.IncMinuteStr(SSOutTime, 24 * 60); //출근시간이 퇴근시간 보다 더 큰 경우 퇴근 시간에 24시간 가산.
      console.log("&&& SSOutTime", SSOutTime);
    }

    if (InfraLib.HourToInt(SSOutTime) > InfraLib.HourToInt(OutTime))
      grid[row].CDEarlyOutTime = InfraLib.infraRoundUp(
        InfraLib.TimeTermMinuteStr(OutTime, SSOutTime) / 60,
        2
      );
  } else if (grid[row].CDGubun === "1") {
    //특근시 시간 계산
    grid[row].CDWTimeNormal = 0;
    grid[row].CDWTimeHoli = 0;
    grid[row].CDWTimeOver = 0;
    grid[row].CDWTimeNight = 0;
    grid[row].CDWTimeNightOver = 0;
    grid[row].CDHTimeBase = 0;
    grid[row].CDHTimeOver = 0;
    grid[row].CDHTimeNight = 0;
    grid[row].CDHTimeNightOver = 0;
    grid[row].CDTkTime = InfraLib.infraRoundUp(
      CalcWTimes(
        "기본",
        iWTimeOfDayLimit,
        SWNightStrWTime,
        SWNightEndWTime,
        grid[row].CDWStrTime,
        grid[row].CDWEndTime,
        grid[row].SSLTimeStr1,
        grid[row].SSLTimeEnd1,
        SWLTimeGubun1,
        grid[row].SSLTimeStr2,
        grid[row].SSLTimeEnd2,
        SWLTimeGubun2,
        grid[row].SSLTimeStr3,
        grid[row].SSLTimeEnd3,
        SWLTimeGubun3,
        grid[row].SSLTimeStr4,
        grid[row].SSLTimeEnd4,
        SWLTimeGubun4,
        grid[row].SSLTimeStr5,
        grid[row].SSLTimeEnd5,
        SWLTimeGubun5
      ) +
        CalcWTimes(
          "연장",
          iWTimeOfDayLimit,
          SWNightStrWTime,
          SWNightEndWTime,
          grid[row].CDWStrTime,
          grid[row].CDWEndTime,
          grid[row].SSLTimeStr1,
          grid[row].SSLTimeEnd1,
          SWLTimeGubun1,
          grid[row].SSLTimeStr2,
          grid[row].SSLTimeEnd2,
          SWLTimeGubun2,
          grid[row].SSLTimeStr3,
          grid[row].SSLTimeEnd3,
          SWLTimeGubun3,
          grid[row].SSLTimeStr4,
          grid[row].SSLTimeEnd4,
          SWLTimeGubun4,
          grid[row].SSLTimeStr5,
          grid[row].SSLTimeEnd5,
          SWLTimeGubun5
        ) +
        CalcWTimes(
          "연장야간",
          iWTimeOfDayLimit,
          SWNightStrWTime,
          SWNightEndWTime,
          grid[row].CDWStrTime,
          grid[row].CDWEndTime,
          grid[row].SSLTimeStr1,
          grid[row].SSLTimeEnd1,
          SWLTimeGubun1,
          grid[row].SSLTimeStr2,
          grid[row].SSLTimeEnd2,
          SWLTimeGubun2,
          grid[row].SSLTimeStr3,
          grid[row].SSLTimeEnd3,
          SWLTimeGubun3,
          grid[row].SSLTimeStr4,
          grid[row].SSLTimeEnd4,
          SWLTimeGubun4,
          grid[row].SSLTimeStr5,
          grid[row].SSLTimeEnd5,
          SWLTimeGubun5
        ) -
        grid[row].CDHTime,
      ValList[1].ValOverDigit
    );
  } else if (grid[row].CDGubun === "3") {
    //결근시 시간 계산
    grid[row].CDNoComeCNT = CalcWTimes(
      "기본",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].SSWTimeStr,
      grid[row].SSWTimeEnd,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    ); //결근 계산
  } else if (grid[row].CDGubun === "4" || grid[row].CDGubun === "6") {
    //연차,유급휴일,휴직 시간 계산.
    grid = CalcPayHoliTimes(
      grid,
      row,
      SWMinorYN,
      SWHoliWeek,
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      SWLTimeGubun1,
      SWLTimeGubun2,
      SWLTimeGubun3,
      SWLTimeGubun4,
      SWLTimeGubun5,
      DateGubun,
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
      CDTkTime,
      ValList
    ); //유급휴일,연차처리,휴직일때 각 근무시간을 계산
    if (grid[row].CDHTimeBase > 0) doCalcHTimeToHoli = true;
  } else if (grid[row].CDGubun === "8") {
    //휴일근무시 시간 계산
    grid[row].CDHTimeBase = CalcWTimes(
      "기본",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].CDWStrTime,
      grid[row].CDWEndTime,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    );

    grid[row].CDHTimeOver = CalcWTimes(
      "연장",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].CDWStrTime,
      grid[row].CDWEndTime,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    );

    grid[row].CDHTimeNight = CalcWTimes(
      "야간",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].CDWStrTime,
      grid[row].CDWEndTime,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    );
    grid[row].CDHTimeNightOver = CalcWTimes(
      "야간연장",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].CDWStrTime,
      grid[row].CDWEndTime,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    );
  }
  //주휴계산
  if (SWHoliPayYN) {
    var moment = require("moment");

    if (String(Math.trunc(moment(grid[row].CDDate).day() + 1) !== SWHoliWeek)) {
      //주휴,무휴날은 주휴계산하지 않음
      //무휴일 검사. 무휴일이 아닌 셩우 주휴시간 계산
      if (grid[row].DateGubun !== "2") {
        if (doCalcHTimeToHoli) {
          grid[row].CDWTimeHoli = InfraLib.infraRoundUp(
            grid[row].CDHTimeBase * ValList[1].ValWTimeHoliRate,
            ValList[1].ValBaseDigit
          );
        } else {
          grid[row].CDWTimeHoli = InfraLib.infraRoundUp(
            grid[row].CDWTimeNormal * ValList[1].ValWTimeHoliRate,
            ValList[1].ValBaseDigit
          );
        }
      }
    }
  } else {
    grid[row].CDWTimeHoli = 0;
  }
  return grid;
};
//유급휴일,연차처리,휴직일때 각 근무시간을 계산
//해당행의 계산된 각종 시간을 0으로 클리어하는 함수
const CalcPayHoliTimes = (
  grid,
  row,
  SWMinorYN,
  SWHoliWeek,
  iWTimeOfDayLimit,
  SWNightStrWTime,
  SWNightEndWTime,
  SWLTimeGubun1,
  SWLTimeGubun2,
  SWLTimeGubun3,
  SWLTimeGubun4,
  SWLTimeGubun5,
  DateGubun,
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
  CDTkTime,
  ValList
) => {
  const CalcTimeByReal = () => {
    grid[row].CDHTimeBase = CalcWTimes(
      "휴일기본",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].CDWStrTime,
      grid[row].CDWEndTime,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    );

    grid[row].CDHTimeOver = CalcWTimes(
      "연장",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].CDWStrTime,
      grid[row].CDWEndTime,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    );
    grid[row].CDHTimeNight = CalcWTimes(
      "야간",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].CDWStrTime,
      grid[row].CDWEndTime,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    );
    grid[row].CDHTimeNightOver = CalcWTimes(
      "야간연장",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].CDWStrTime,
      grid[row].CDWEndTime,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    );
    grid[row].CDTkTime = CalcWTimes(
      "특근",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].CDWStrTime,
      grid[row].CDWEndTime,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    );
    if (grid[row].CDHTimeBase > iWTimeOfDayLimit) {
      //기본 근로시간이 법정 일일최대 근로시간을 초과했음. 연장근무로 가산
      grid[row].CDHTimeBase = iWTimeOfDayLimit;
    }

    grid[row].CDWTimeHoli = InfraLib.infraRoundUp(
      grid[row].CDHTimeBase * ValList[1].ValWTimeHoliRate,
      ValList[1].ValBaseDigit
    );
  };
  const CalcTimeByJoin = () => {
    grid[row].CDWTimeNormal = CalcWTimes(
      "기본",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].CDWStrTime,
      grid[row].CDWEndTime,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    );
    if (grid[row].CDWTimeNormal > iWTimeOfDayLimit)
      //기본 근로시간이 법정 일일최대 근로시간을 초과했음. 연장근무로 가산
      grid[row].CDWTimeNormal = iWTimeOfDayLimit;

    grid[row].CDWTimeHoli = InfraLib.infraRoundUp(
      grid[row].CDWTimeNormal * ValList[1].ValWTimeHoliRate,
      ValList[1].ValBaseDigit
    );
  };

  //주휴일인 경우
  //시업,종업시간 없음: 시간계산하지 않음
  //시업,종업시간 있음: 시업과 종업시간으로 휴일 시간 계산
  //주휴일이 아닌 경우
  //시업,종업시간 없음: 기준시업과 기준종업으로 평일 시간 계산
  //시업,종업시간 있음: 시업과 종업시간으로 휴일 시간 계산
  if ((grid[row].DateGubun = "1")) {
    //주휴일인 경우
    if (grid[row].CDWStrTime !== "" && grid[row].CDWEndTime !== "") {
      //시업시간과 종업시간이 있는경우
      CalcTimeByReal();
      grid[row].CDWTimeHoli = 0;
    }
  } else {
    //주휴일이 아닌 경우
    //시업,종업시간 있음: 시업과 종업시간으로 휴일 시간 계산
    //시업,종업시간 없음: 기준시업과 기준종업으로 평일 시간 계산
    if (grid[row].CDWStrTime !== "" && grid[row].CDWEndTime !== "") {
      //시업시간과 종업시간이 있는경우
      CalcTimeByReal();
      //주휴일이 아닌 경우 평일 근무도 찍어준다. 주휴시간은 마지막에 계산하므로 지금 계산하지 않는다.
      grid[row].CDWTimeNormal = CalcWTimes(
        "기본",
        iWTimeOfDayLimit,
        SWNightStrWTime,
        SWNightEndWTime,
        grid[row].CDWStrTime,
        grid[row].CDWEndTime,
        grid[row].SSLTimeStr1,
        grid[row].SSLTimeEnd1,
        SWLTimeGubun1,
        grid[row].SSLTimeStr2,
        grid[row].SSLTimeEnd2,
        SWLTimeGubun2,
        grid[row].SSLTimeStr3,
        grid[row].SSLTimeEnd3,
        SWLTimeGubun3,
        grid[row].SSLTimeStr4,
        grid[row].SSLTimeEnd4,
        SWLTimeGubun4,
        grid[row].SSLTimeStr5,
        grid[row].SSLTimeEnd5,
        SWLTimeGubun5
      );
    } else {
      //시업시간과 종업시간이 없는 경우
      CalcTimeByJoin();
    }
  }
  return grid;
};

const ClearTime = (
  grid,
  row,
  CDWTimeNormal,
  CDWTimeHoli,
  CDWTimeOver,
  CDWTimeNight,
  CDWTimeNightOver, //매개변수 G1_CCWTime 삭제됨 //G1_CCWTime    , CDWTimeNormal, CDWTimeHoli , CDWTimeOver     , CDWTimeNight, CDWTimeNightOver
  CDHTimeBase,
  CDHTimeOver,
  CDHTimeNight,
  CDHTimeNightOver,
  CDTkTime,
  CDNoComeCNT,
  CDLateTime,
  CDEarlyOutTime
) => {
  if (grid.length === 0) return;
  if (CDWTimeNormal !== -1) grid[row].CDWTimeNormal = 0;
  if (CDWTimeHoli !== -1) grid[row].CDWTimeHoli = 0;
  if (CDWTimeOver !== -1) grid[row].CDWTimeOver = 0;
  if (CDWTimeNight !== -1) grid[row].CDWTimeNight = 0;
  if (CDWTimeNightOver !== -1) grid[row].CDWTimeNightOver = 0;
  if (CDHTimeBase !== -1) grid[row].CDHTimeBase = 0;
  if (CDHTimeOver !== -1) grid[row].CDHTimeOver = 0;
  if (CDHTimeNight !== -1) grid[row].CDHTimeNight = 0;
  if (CDHTimeNightOver !== -1) grid[row].CDHTimeNightOver = 0;
  if (CDTkTime !== -1) grid[row].CDTkTime = 0;
  if (CDNoComeCNT !== -1) grid[row].CDNoComeCNT = 0;
  if (CDLateTime !== -1) grid[row].CDLateTime = 0;
  if (CDEarlyOutTime !== -1) grid[row].CDEarlyOutTime = 0;

  return grid;
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
  CDDayWeek,
  CDGubun,
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
  CDTkTime
) => {
  if (grid[row].CDDayWeek === SWHoliWeek && grid[row].CDGubun !== "2") {
    //주휴일인경우
    console.log("1. 주휴일");
    grid[row].CDHTimeBase = CalcWTimes(
      "기본",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].CDWStrTime,
      grid[row].CDWEndTime,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    );
    grid[row].CDHTimeOver = CalcWTimes(
      "연장",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].CDWStrTime,
      grid[row].CDWEndTime,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    );
    grid[row].CDHTimeNight = CalcWTimes(
      "야간",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].CDWStrTime,
      grid[row].CDWEndTime,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    );
    grid[row].CDHTimeNightOver = CalcWTimes(
      "야간연장",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].CDWStrTime,
      grid[row].CDWEndTime,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    );
    grid[row].CDTkTime = CalcWTimes(
      "특근",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].CDWStrTime,
      grid[row].CDWEndTime,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    );
    if (grid[row].CDHTimeBase > iWTimeOfDayLimit) {
      //기본 근로시간이 법정 일일최대 근로시간을 초과했음. 연장근무로 가산
      grid[row].CDHTimeOver =
        grid[row].CDHTimeOver + (grid[row].CDHTimeBase - iWTimeOfDayLimit);
      grid[row].CDHTimeBase = iWTimeOfDayLimit;
    }
  } else {
    //기타 근무일인 경우
    //무휴일인지 체크하여 무휴일인경우 연장근무로 적용(주당 근로시간이 소정 근로시간을 초과한 경우)
    //무휴가 아닐때: 일반적 시간 계산
    console.log("2. 기타 근무일", grid, grid[row].SSLTimeStr1);
    grid[row].CDWTimeNormal = CalcWTimes(
      "기본",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].CDWStrTime,
      grid[row].CDWEndTime,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    );
    console.log(
      "2.1 기본 종료",
      grid[row].CDWTimeNormal,
      grid[row].SSLTimeStr1
    );
    grid[row].CDWTimeNight = CalcWTimes(
      "야간",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].CDWStrTime,
      grid[row].CDWEndTime,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    );
    console.log("2.2 야간 종료", grid[row].CDWTimeNight, grid[row].SSLTimeStr1);
    grid[row].CDWTimeOver = CalcWTimes(
      "연장",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].CDWStrTime,
      grid[row].CDWEndTime,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    );
    console.log("2.3 연장 종료", grid[row].CDWTimeOver, grid[row].SSLTimeStr1);
    grid[row].CDWTimeNightOver = CalcWTimes(
      "야간연장",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].CDWStrTime,
      grid[row].CDWEndTime,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    );
    console.log(
      "2.4 야간연장 종료",
      grid[row].CDWTimeNightOver,
      grid[row].SSLTimeStr1
    );
    grid[row].CDTkTime = CalcWTimes(
      "특근",
      iWTimeOfDayLimit,
      SWNightStrWTime,
      SWNightEndWTime,
      grid[row].CDWStrTime,
      grid[row].CDWEndTime,
      grid[row].SSLTimeStr1,
      grid[row].SSLTimeEnd1,
      SWLTimeGubun1,
      grid[row].SSLTimeStr2,
      grid[row].SSLTimeEnd2,
      SWLTimeGubun2,
      grid[row].SSLTimeStr3,
      grid[row].SSLTimeEnd3,
      SWLTimeGubun3,
      grid[row].SSLTimeStr4,
      grid[row].SSLTimeEnd4,
      SWLTimeGubun4,
      grid[row].SSLTimeStr5,
      grid[row].SSLTimeEnd5,
      SWLTimeGubun5
    );
    console.log("2.4 특근 종료", grid[row].CDTkTime, grid[row].SSLTimeStr1);
    if (grid[row].CDWTimeNormal > iWTimeOfDayLimit) {
      //기본 근로시간이 법정 일일최대 근로시간을 초과했음. 연장근무로 가산
      grid[row].CDWTimeOver =
        grid[row].CDWTimeOver + (grid[row].CDWTimeNormal - iWTimeOfDayLimit);
      grid[row].CDWTimeNormal = iWTimeOfDayLimit;
    }
  }
  console.log("◈◈◈◈◈◈◈◈ ", grid);
  return grid;
};
//포괄근로시간 계산하는 함수
const CalcWTimes = (
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
  var DayWTimeStrs = []; //근로시작시간 리스트
  var DayWTimeEnds = []; //근로종료시간 리스트
  var BaseTime; //기본근로시간
  var NightTime; //야간근로시간:기본근로시간중 야간타임
  var OverTime; //연장근로시간:기본근로시간 이후 야간타임 이전
  var ONTime; //야간연장근로시간: 기본근로시간 이후 야간타임
  var TkTime; //특근시간
  var tempTime;
  var Result;

  console.log("CalcWTimes", WTimeStr, WTimeEnd);
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
    oriLTimeStr = LTimeStr; // "12:00"
    oriLTimeEnd = LTimeEnd; // "13:00"

    for (let i = 0; i < WTimeStrList.length; i++) {
      LTimeStr = oriLTimeStr;
      LTimeEnd = oriLTimeEnd;

      if (
        is24Add && //근무시간에 24시간을 가산했음.휴게 시작시간과 종료시간이 근무시간 안쪽인지 판단하여 근무시간 바깥쪽인경우(시작과 종료둘다) 24시간을 가산한다.
        InfraLib.HourToInt(LTimeStr) < InfraLib.HourToInt(WTimeStrList[i]) &&
        InfraLib.HourToInt(LTimeStr) > InfraLib.HourToInt(WTimeEndList[i]) &&
        InfraLib.HourToInt(LTimeEnd) < InfraLib.HourToInt(WTimeStrList[i]) &&
        InfraLib.HourToInt(LTimeEnd) > InfraLib.HourToInt(WTimeEndList[i])
      ) {
        LTimeStr = InfraLib.IncMinuteStr(LTimeStr, 24 * 60); //휴게 시작시간이 근무시간 범위밖에 있음
        LTimeEnd = InfraLib.IncMinuteStr(LTimeEnd, 24 * 60); //휴게 종료시간이 근무시간 범위밖에 있음
        console.log("##@@", LTimeStr, LTimeEnd);
      }
      WTimeStr = WTimeStrList[i];
      WTimeEnd = WTimeEndList[i];
      console.log(" WTimeStr: ", WTimeStr, " WTimeEnd: ", WTimeEnd);
      if (
        InfraLib.HourToInt(LTimeStr) <= InfraLib.HourToInt(WTimeStr) &&
        InfraLib.HourToInt(LTimeEnd) > InfraLib.HourToInt(WTimeStr) &&
        InfraLib.HourToInt(LTimeEnd) < InfraLib.HourToInt(WTimeEnd)
      ) {
        //1. 휴게시간이 근로시작시간전에 시작하여 근무시간중에 끝나는 경우
        WTimeStrList[i] = LTimeEnd;
      } else if (
        InfraLib.HourToInt(LTimeStr) > InfraLib.HourToInt(WTimeStr) &&
        InfraLib.HourToInt(LTimeEnd) < InfraLib.HourToInt(WTimeEnd)
      ) {
        //2. 근로시간중에 휴게시간이 시작되어서 근로시간 내에 끝나는 경우
        //휴게시간 이후로 근로시간 만듬
        console.log(" ZZZ 13:00 가들어가야함 ", WTimeStrList[i]);
        WTimeStrList.push(LTimeEnd);
        WTimeEndList.push(WTimeEndList[i]);
        //휴게시간 이전의 근로시간은 종료시간만 휴게시작시간으로 바꿈
        WTimeEndList[i] = LTimeStr;
      } else if (
        InfraLib.HourToInt(LTimeStr) > InfraLib.HourToInt(WTimeStr) &&
        InfraLib.HourToInt(LTimeStr) < InfraLib.HourToInt(WTimeEnd) &&
        InfraLib.HourToInt(LTimeEnd) >= InfraLib.HourToInt(WTimeEnd)
      ) {
        WTimeEndList[i] = LTimeStr;
      }
      console.log("WTimeMinusLTime", WTimeStrList);
    }
  };
  //시작시간으로 부터 종료시간까지의 연장, 야간연장시간을 가산
  const CalcOverTimes = (StrTime, EndTime, i) => {
    if (InfraLib.HourToInt(StrTime) < InfraLib.HourToInt(NightStr)) {
      if (InfraLib.HourToInt(EndTime) <= InfraLib.HourToInt(NightStr)) {
        //근로시작시간이 야간근로시작시간 전인 경우

        OverTime =
          OverTime + InfraLib.TimeTermMinuteStr(StrTime, DayWTimeEnds[i]);
        console.log("1. CalOver", StrTime, DayWTimeEnds[i], OverTime);
      } else if (InfraLib.HourToInt(EndTime) <= InfraLib.HourToInt(NightEnd)) {
        //근로종료시간이 야간근로시작 전인 경우
        OverTime = OverTime + InfraLib.TimeTermMinuteStr(StrTime, NightStr);
        ONTime = ONTime + InfraLib.TimeTermMinuteStr(NightStr, EndTime);
        console.log("2. CalOver", StrTime, NightStr, OverTime);
      } else if (InfraLib.HourToInt(EndTime) > InfraLib.HourToInt(NightEnd)) {
        //근로종료시간이 야간 근로종료 전인 경우
        OverTime = OverTime + InfraLib.TimeTermMinuteStr(StrTime, NightStr);
        ONTime = ONTime + InfraLib.TimeTermMinuteStr(NightStr, NightEnd);
        OverTime = OverTime + InfraLib.TimeTermMinuteStr(NightEnd, EndTime);
        console.log("3. CalOver", StrTime, NightStr, OverTime);
      } else if (InfraLib.HourToInt(StrTime) < InfraLib.HourToInt(NightEnd)) {
        //근로시작시간이 야간근로시간 안쪽에 있는 경우
        if (InfraLib.HourToInt(EndTime) <= InfraLib.HourToInt(NightEnd)) {
          //근로종료시간이 야간 근로종료 전인 경우
          ONTime = ONTime + InfraLib.TimeTermMinuteStr(StrTime, EndTime);
          console.log("4. CalOver", StrTime, EndTime, OverTime);
        } else if (InfraLib.HourToInt(EndTime) > InfraLib.HourToInt(NightEnd)) {
          ONTime = ONTime + InfraLib.TimeTermMinuteStr(StrTime, NightEnd);
          OverTime = OverTime + InfraLib.TimeTermMinuteStr(NightEnd, EndTime);
          console.log("5. CalOver", NightEnd, EndTime, OverTime);
        }
      } else if (InfraLib.HourToInt(StrTime) >= InfraLib.HourToInt(NightEnd)) {
        //근로시작시간이 야간근로시간 이후인경우.
        OverTime = OverTime + InfraLib.TimeTermMinuteStr(StrTime, EndTime);
        console.log("6. CalOver", StrTime, EndTime, OverTime);
      }
    }
    console.log("OVER", OverTime);
  };
  //시작시간으로부터 종료시간까지 야간근로시간을 계산
  const CalcNightTime = (StrTime, EndTime) => {
    console.log("CalcNightTime 실행됨");
    if (InfraLib.HourToInt(StrTime) > InfraLib.HourToInt(EndTime))
      EndTime = InfraLib.IncMinuteStr(EndTime, 24 * 60);
    if (InfraLib.HourToInt(EndTime) < InfraLib.HourToInt(NightStr)) {
      StrTime = InfraLib.IncMinuteStr(EndTime, 24 * 60);
      EndTime = InfraLib.IncMinuteStr(EndTime, 24 * 60);
    }
    //근로시작시간이 야간근로시간 이전에 시작된 경우
    if (InfraLib.HourToInt(StrTime) < InfraLib.HourToInt(NightStr)) {
      //근로종료시간이 야간근로시간 안에 있는 경우
      if (
        InfraLib.HourToInt(EndTime) > InfraLib.HourToInt(NightStr) &&
        InfraLib.HourToInt(EndTime) <= InfraLib.HourToInt(NightEnd)
      ) {
        NightTime = NightTime + InfraLib.TimeTermMinuteStr(NightStr, EndTime);
      } else if (InfraLib.HourToInt(EndTime) > InfraLib.HourToInt(NightEnd)) {
        NightTime = NightTime + InfraLib.TimeTermMinuteStr(NightStr, NightEnd);
      }
    } else if (InfraLib.HourToInt(StrTime) < InfraLib.HourToInt(NightEnd)) {
      //근로시작시간이 야간근로시간 안쪽인 경우
      if (InfraLib.HourToInt(EndTime) <= InfraLib.HourToInt(NightEnd)) {
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

    if (String(StrTime).trim() === "" || String(EndTime).trim() === "")
      return (Result = 0);
    if (SWLTimeGubun !== "0" && SWLTimeGubun !== "9") {
      if (InfraLib.HourToInt(StrTime) >= InfraLib.HourToInt(EndTime))
        EndTime = InfraLib.IncMinuteStr(EndTime, 24 * 60);
      if (
        InfraLib.HourToInt(WTimeStr) > InfraLib.HourToInt(StrTime) &&
        InfraLib.HourToInt(WTimeStr) >= InfraLib.HourToInt(EndTime)
      ) {
        StrTime = InfraLib.IncMinuteStr(StrTime, 24 * 60);
        EndTime = InfraLib.IncMinuteStr(EndTime, 24 * 60);
      }

      if (
        InfraLib.HourToInt(StrTime) < InfraLib.HourToInt(WTimeStr) &&
        InfraLib.HourToInt(EndTime) > InfraLib.HourToInt(WTimeStr)
      )
        StrTime = WTimeStr;
      if (
        InfraLib.HourToInt(StrTime) < InfraLib.HourToInt(WTimeEnd) &&
        InfraLib.HourToInt(EndTime) > InfraLib.HourToInt(WTimeEnd)
      )
        EndTime = WTimeEnd;

      if (
        InfraLib.HourToInt(WTimeStr) <= InfraLib.HourToInt(StrTime) &&
        InfraLib.HourToInt(WTimeEnd) > InfraLib.HourToInt(StrTime) &&
        InfraLib.HourToInt(WTimeStr) < InfraLib.HourToInt(EndTime) &&
        InfraLib.HourToInt(WTimeEnd) > InfraLib.HourToInt(EndTime)
      ) {
        LTimeMinute = InfraLib.TimeTermMinuteStr(StrTime, EndTime);
        LTimeMinute =
          Math.trunc(LTimeMinute / PublicValue.ValWPMobileCCTimeUpIn) *
          PublicValue.ValWPMobileCCTimeUpOut;
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
          PublicValue.ValBaseDigit
        );
        return Result;
      }
    }
  };
  console.log("1 TTRREE", LTimeStr1);
  if (WTimeStr === WTimeEnd) {
    console.log("2 TTRREE", LTimeStr1);
    return (Result = 0);
  }

  if (KindOfTime === "특근") {
    if (String(WTimeStr).trim() === "" || String(WTimeEnd).trim() === "") {
      console.log("3 TTRREE", LTimeStr1);
      return (Result = 0);
    }
    is24Add = false;
    if (InfraLib.HourToInt(WTimeEnd) < InfraLib.HourToInt(WTimeStr)) {
      WTimeEnd = InfraLib.IncMinuteStr(WTimeEnd, 24 * 60);
      is24Add = true;
      TkTime = calcTkTime(LTimeGubun1, LTimeStr1, LTimeEnd1);
      TkTime = TkTime + calcTkTime(LTimeGubun2, LTimeStr2, LTimeEnd2);
      TkTime = TkTime + calcTkTime(LTimeGubun3, LTimeStr3, LTimeEnd3);
      TkTime = TkTime + calcTkTime(LTimeGubun4, LTimeStr4, LTimeEnd4);
      TkTime = TkTime + calcTkTime(LTimeGubun5, LTimeStr5, LTimeEnd5);
      Result = TkTime;
      console.log("4 TTRREE", LTimeStr1);
      return Result;
    }
  }

  //매개변수에 공백 제거

  console.log("1 LTimeStr1", LTimeStr1);
  WTimeStr = String(WTimeStr).trim();
  WTimeEnd = String(WTimeEnd).trim();
  LTimeStr1 = String(LTimeStr1).trim();
  LTimeEnd1 = String(LTimeEnd1).trim();
  LTimeGubun1 = String(LTimeGubun1).trim();
  LTimeStr2 = String(LTimeStr2).trim();
  LTimeEnd2 = String(LTimeEnd2).trim();
  LTimeGubun2 = String(LTimeGubun2).trim();
  LTimeStr3 = String(LTimeStr3).trim();
  LTimeEnd3 = String(LTimeEnd3).trim();
  LTimeGubun3 = String(LTimeGubun3).trim();
  LTimeStr4 = String(LTimeStr4).trim();
  LTimeEnd4 = String(LTimeEnd4).trim();
  LTimeGubun4 = String(LTimeGubun4).trim();
  LTimeStr5 = String(LTimeStr5).trim();
  LTimeEnd5 = String(LTimeEnd5).trim();
  LTimeGubun5 = String(LTimeGubun5).trim();
  console.log("2 LTimeStr1", LTimeStr1);
  if (WTimeStr === WTimeEnd || !WTimeStr || !WTimeEnd) {
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
  if (InfraLib.HourToInt(WTimeStr) >= InfraLib.HourToInt(WTimeEnd)) {
    WTimeEnd = InfraLib.IncMinuteStr(WTimeEnd, 24 * 60);
    is24Add = true;
  }

  //휴게 종료 시간이 휴게 시작시간보다 작은 경우는 방 12시를 넘긴 것이므로 종료시간에 24시간을 더하여 계산
  if (
    String(LTimeStr1).trim() !== "" &&
    String(LTimeEnd1).trim() !== "" &&
    InfraLib.HourToInt(LTimeStr1) >= InfraLib.HourToInt(LTimeEnd1)
  )
    LTimeEnd1 = InfraLib.IncMinuteStr(LTimeEnd1, 24 * 60);
  if (
    String(LTimeStr2).trim() !== "" &&
    String(LTimeEnd2).trim() !== "" &&
    InfraLib.HourToInt(LTimeStr2) >= InfraLib.HourToInt(LTimeEnd2)
  )
    LTimeEnd2 = InfraLib.IncMinuteStr(LTimeEnd2, 24 * 60);
  if (
    String(LTimeStr3).trim() !== "" &&
    String(LTimeEnd3).trim() !== "" &&
    InfraLib.HourToInt(LTimeStr3) >= InfraLib.HourToInt(LTimeEnd3)
  )
    LTimeEnd3 = InfraLib.IncMinuteStr(LTimeEnd3, 24 * 60);
  if (
    String(LTimeStr4).trim() !== "" &&
    String(LTimeEnd4).trim() !== "" &&
    InfraLib.HourToInt(LTimeStr4) >= InfraLib.HourToInt(LTimeEnd4)
  )
    LTimeEnd4 = InfraLib.IncMinuteStr(LTimeEnd4, 24 * 60);
  if (
    String(LTimeStr5).trim() !== "" &&
    String(LTimeEnd5).trim() !== "" &&
    InfraLib.HourToInt(LTimeStr5) >= InfraLib.HourToInt(LTimeEnd5)
  )
    LTimeEnd5 = InfraLib.IncMinuteStr(LTimeEnd5, 24 * 60);

  //휴게시간이 근무시간에 포함되어 있지 않다면 휴게시간도 24시간을 가산해서 계산
  if (String(LTimeStr1).trim() !== "" && String(LTimeEnd1).trim() !== "") {
    if (
      (InfraLib.HourToInt(LTimeStr1) < InfraLib.HourToInt(WTimeStr) &&
        InfraLib.HourToInt(LTimeEnd1) < InfraLib.HourToInt(WTimeEnd)) ||
      (InfraLib.HourToInt(LTimeStr1) > InfraLib.HourToInt(WTimeStr) &&
        InfraLib.HourToInt(LTimeEnd1) > InfraLib.HourToInt(WTimeEnd))
    ) {
      LTimeStr1 = InfraLib.IncMinuteStr(LTimeStr1, 24 * 60);
      LTimeEnd1 = InfraLib.IncMinuteStr(LTimeEnd1, 24 * 60);
    }
  }
  if (String(LTimeStr2).trim() !== "" && String(LTimeEnd2).trim() !== "") {
    if (
      (InfraLib.HourToInt(LTimeStr2) < InfraLib.HourToInt(WTimeStr) &&
        InfraLib.HourToInt(LTimeEnd2) < InfraLib.HourToInt(WTimeEnd)) ||
      (InfraLib.HourToInt(LTimeStr2) > InfraLib.HourToInt(WTimeStr) &&
        InfraLib.HourToInt(LTimeEnd2) > InfraLib.HourToInt(WTimeEnd))
    ) {
      LTimeStr2 = InfraLib.IncMinuteStr(LTimeStr2, 24 * 60);
      LTimeEnd2 = InfraLib.IncMinuteStr(LTimeEnd2, 24 * 60);
    }
  }
  if (String(LTimeStr3).trim() !== "" && String(LTimeEnd3).trim() !== "") {
    if (
      (InfraLib.HourToInt(LTimeStr3) < InfraLib.HourToInt(WTimeStr) &&
        InfraLib.HourToInt(LTimeEnd3) < InfraLib.HourToInt(WTimeEnd)) ||
      (InfraLib.HourToInt(LTimeStr3) > InfraLib.HourToInt(WTimeStr) &&
        InfraLib.HourToInt(LTimeEnd3) > InfraLib.HourToInt(WTimeEnd))
    ) {
      LTimeStr3 = InfraLib.IncMinuteStr(LTimeStr3, 24 * 60);
      LTimeEnd3 = InfraLib.IncMinuteStr(LTimeEnd3, 24 * 60);
    }
  }
  if (String(LTimeStr4).trim() !== "" && String(LTimeEnd4).trim() !== "") {
    if (
      (InfraLib.HourToInt(LTimeStr4) < InfraLib.HourToInt(WTimeStr) &&
        InfraLib.HourToInt(LTimeEnd4) < InfraLib.HourToInt(WTimeEnd)) ||
      (InfraLib.HourToInt(LTimeStr4) > InfraLib.HourToInt(WTimeStr) &&
        InfraLib.HourToInt(LTimeEnd4) > InfraLib.HourToInt(WTimeEnd))
    ) {
      LTimeStr4 = InfraLib.IncMinuteStr(LTimeStr4, 24 * 60);
      LTimeEnd4 = InfraLib.IncMinuteStr(LTimeEnd4, 24 * 60);
    }
  }
  if (String(LTimeStr5).trim() !== "" && String(LTimeEnd5).trim() !== "") {
    if (
      (InfraLib.HourToInt(LTimeStr5) < InfraLib.HourToInt(WTimeStr) &&
        InfraLib.HourToInt(LTimeEnd5) < InfraLib.HourToInt(WTimeEnd)) ||
      (InfraLib.HourToInt(LTimeStr5) > InfraLib.HourToInt(WTimeStr) &&
        InfraLib.HourToInt(LTimeEnd5) > InfraLib.HourToInt(WTimeEnd))
    ) {
      LTimeStr5 = InfraLib.IncMinuteStr(LTimeStr5, 24 * 60);
      LTimeEnd5 = InfraLib.IncMinuteStr(LTimeEnd5, 24 * 60);
    }
  }

  //법정야간근로시간을 재계산(종료시간이 시작시간보다 작은경우 24시간을 더함)
  if (InfraLib.HourToInt(NightStr) >= InfraLib.HourToInt(NightEnd))
    NightEnd = InfraLib.IncMinuteStr(NightEnd, 24 * 60);

  //근로시간을 주간 근로 시간과 야간 근로시간으로 나눔

  DayWTimeStrs.push(WTimeStr);
  DayWTimeEnds.push(WTimeEnd);
  console.log(
    "야야야야",
    InfraLib.HourToInt(NightStr),
    InfraLib.HourToInt(NightEnd),
    DayWTimeStrs
  );
  //주간 근로시간중 휴게시간은 제외0
  if (String(LTimeStr1).trim() !== "" && String(LTimeEnd1).trim() !== "")
    WTimeMinusLTime(DayWTimeStrs, DayWTimeEnds, LTimeStr1, LTimeEnd1);
  if (String(LTimeStr2).trim() !== "" && String(LTimeEnd2).trim() !== "")
    WTimeMinusLTime(DayWTimeStrs, DayWTimeEnds, LTimeStr2, LTimeEnd2);
  if (String(LTimeStr3).trim() !== "" && String(LTimeEnd3).trim() !== "")
    WTimeMinusLTime(DayWTimeStrs, DayWTimeEnds, LTimeStr3, LTimeEnd3);
  if (String(LTimeStr4).trim() !== "" && String(LTimeEnd4).trim() !== "")
    WTimeMinusLTime(DayWTimeStrs, DayWTimeEnds, LTimeStr4, LTimeEnd4);
  if (String(LTimeStr5).trim() !== "" && String(LTimeEnd5).trim() !== "")
    WTimeMinusLTime(DayWTimeStrs, DayWTimeEnds, LTimeStr5, LTimeEnd5);

  BaseTime = 0;
  NightTime = 0;
  OverTime = 0;
  ONTime = 0;

  //하루의주간 근로시간을 계산한다.
  for (let i = 0; i < DayWTimeStrs.length; i++) {
    //주간 근로시간을 분단위로 계산

    if (BaseTime < DayWTimeLimit * 60) {
      // 420
      //기본 근로시간이 법정일당근로시간 미만인경우: 기본근로시간을 가산. 만약 법정일당근로시간 초과시 자투리만큼을 연장근로에 가산. 연장근로에 가산시 야간타임이면 야간연장에 가산.
      //기본근로시간중 야간타임에 걸렸으면 해당시간만큼 야간기간 가산.
      BaseTime =
        BaseTime + InfraLib.TimeTermMinuteStr(DayWTimeStrs[i], DayWTimeEnds[i]);
      console.log(
        "      BaseTime 180",
        DayWTimeStrs[i], // 9~12 , 13~17 (만근처리시)
        DayWTimeEnds[i],
        i,
        BaseTime
      );
      //법정일당기본근로시간을 초과한 순간. 해당 구획의 근로시간의 자투리시간을 가지고 연장과 연장여간을 계산
      if (BaseTime > DayWTimeLimit * 60) {
        //기본근로시간이 법정일당근로시간 초과. 초과분이 야간타임인지에 따라 연장, 또는 연장야간에 가산
        //자투리시작시간 찾기
        tempTime = InfraLib.IncMinuteStr(
          DayWTimeEnds[i],
          Math.floor(DayWTimeLimit * 60 - BaseTime)
        ); //근무종료시간에서 초과분시작지점의 시간을 계산
        console.log(
          "tempTime",
          tempTime,
          DayWTimeEnds[i],
          Math.floor(DayWTimeLimit * 60 - BaseTime),
          DayWTimeLimit,
          DayWTimeEnds
        );
        CalcOverTimes(tempTime, DayWTimeEnds[i], i); //자투리 시간의 연장, 야간 연장근로 시간을 계산
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
    Result = InfraLib.infraRoundUp(BaseTime / 60, PublicValue.ValBaseDigit);
  else if (KindOfTime === "연장")
    Result = InfraLib.infraRoundUp(OverTime / 60, PublicValue.ValOverDigit);
  else if (KindOfTime === "야간")
    Result = InfraLib.infraRoundUp(NightTime / 60, PublicValue.ValOverDigit);
  else if (KindOfTime === "연장야간" || KindOfTime === "야간연장")
    Result = InfraLib.infraRoundUp(ONTime / 60, PublicValue.ValOverDigit);
  else if (KindOfTime === "휴일기본")
    Result = InfraLib.infraRoundUp(BaseTime / 60, PublicValue.ValOverDigit);
  else Result = -1;
  if (KindOfTime === "연장") console.log("◈◈◈◈◈◈ RESULT", OverTime, Result);
  console.log("# CalcWTimes 싸이클 종료 #");
  return Result;
};
//무휴일에 대해 주간 소정근로시간 초과, 또는 법정주간근로시간(40시간)초과시 연장근무로 셋팅하는 함수
Func.MuhueOverTimeCheck = (
  WTimeReCalc,
  CDList,
  CDList_BefMonth,
  CDList_AftMonth,
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
  CDWTimeHoli, //매개변수중 G1_CCWTime가 삭제됨//, G1_CCWTime, CDWTimeNormal, CDWTimeHoli
  CDWTimeOver,
  CDWTimeNight,
  CDWTimeNightOver,
  CDHTimeBase,
  CDHTimeOver,
  CDHTimeNight,
  CDHTimeNightOver,
  CDTkTime,
  SWHoliWeek,
  SWNightStrWTime,
  SWNightEndWTime,
  SWLTimeGubun1,
  SWLTimeGubun2,
  SWLTimeGubun3,
  SWLTimeGubun4,
  SWLTimeGubun5,
  iRow,
  SWMinorYN,
  ValList
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

  if (CDList[iRow].CDGubun === "8") return;
  //미성년 여부에 따라 주당 법정 근로시간 셋팅
  if (SWMinorYN) {
    iWTimeOfWeekLimit = ValList[1].WTIMEOFWEEKLIMITMINOR;
  } else {
    iWTimeOfWeekLimit = ValList[1].WTIMEOFWEEKLIMIT;
  }

  //우선 기본,야간근로시간 계산
  MuhueBase = CalcWTimes(
    "기본",
    ValList[1].WTIMEOFDAYLIMIT,
    SWNightStrWTime,
    SWNightEndWTime,
    CDList[iRow].CDWStrTime,
    CDList[iRow].CDWEndTime,
    CDList[iRow].SSLTimeStr1,
    CDList[iRow].SSLTimeEnd1,
    SWLTimeGubun1,
    CDList[iRow].SSLTimeStr2,
    CDList[iRow].SSLTimeEnd2,
    SWLTimeGubun2,
    CDList[iRow].SSLTimeStr3,
    CDList[iRow].SSLTimeEnd3,
    SWLTimeGubun3,
    CDList[iRow].SSLTimeStr4,
    CDList[iRow].SSLTimeEnd4,
    SWLTimeGubun4,
    CDList[iRow].SSLTimeStr5,
    CDList[iRow].SSLTimeEnd5,
    SWLTimeGubun5
  );

  MuhueNight = CalcWTimes(
    "야간",
    ValList[1].WTIMEOFDAYLIMIT,
    SWNightStrWTime,
    SWNightEndWTime,
    CDList[iRow].CDWStrTime,
    CDList[iRow].CDWEndTime,
    CDList[iRow].SSLTimeStr1,
    CDList[iRow].SSLTimeEnd1,
    SWLTimeGubun1,
    CDList[iRow].SSLTimeStr2,
    CDList[iRow].SSLTimeEnd2,
    SWLTimeGubun2,
    CDList[iRow].SSLTimeStr3,
    CDList[iRow].SSLTimeEnd3,
    SWLTimeGubun3,
    CDList[iRow].SSLTimeStr4,
    CDList[iRow].SSLTimeEnd4,
    SWLTimeGubun4,
    CDList[iRow].SSLTimeStr5,
    CDList[iRow].SSLTimeEnd5,
    SWLTimeGubun5
  );
  MuhueNightOver = CalcWTimes(
    "연장야간",
    ValList[1].WTIMEOFDAYLIMIT,
    SWNightStrWTime,
    SWNightEndWTime,
    CDList[iRow].CDWStrTime,
    CDList[iRow].CDWEndTime,
    CDList[iRow].SSLTimeStr1,
    CDList[iRow].SSLTimeEnd1,
    SWLTimeGubun1,
    CDList[iRow].SSLTimeStr2,
    CDList[iRow].SSLTimeEnd2,
    SWLTimeGubun2,
    CDList[iRow].SSLTimeStr3,
    CDList[iRow].SSLTimeEnd3,
    SWLTimeGubun3,
    CDList[iRow].SSLTimeStr4,
    CDList[iRow].SSLTimeEnd4,
    SWLTimeGubun4,
    CDList[iRow].SSLTimeStr5,
    CDList[iRow].SSLTimeEnd5,
    SWLTimeGubun5
  );
  //해당일자의 앞쪽일자의 주당 근로시간(소정, 실제 둘다)을 합산
  BaseTotOfWeek = 0; //해당주의 기본 실근로시간의 합계
  BaseTotOfWeek_Join = 0; //해당주의 기본 소정근로시간의 합계
  q = iRow - 1; //주휴는제외?? -1??
  while (q >= 0) {
    if (CDList[q].CDDayWeek === SWHoliWeek) break;
    BaseTotOfWeek = BaseTotOfWeek + CDList[q].CDWTimeNormal;
    BaseTotOfWeek_Join =
      BaseTotOfWeek_Join +
      CalcWTimes(
        "기본",
        ValList[1].WTIMEOFDAYLIMIT,
        SWNightStrWTime,
        SWNightEndWTime,
        CDList[q].CDWStrTime,
        CDList[q].CDWEndTime,
        CDList[q].SSLTimeStr1,
        CDList[q].SSLTimeEnd1,
        SWLTimeGubun1,
        CDList[q].SSLTimeStr2,
        CDList[q].SSLTimeEnd2,
        SWLTimeGubun2,
        CDList[q].SSLTimeStr3,
        CDList[q].SSLTimeEnd3,
        SWLTimeGubun3,
        CDList[q].SSLTimeStr4,
        CDList[q].SSLTimeEnd4,
        SWLTimeGubun4,
        CDList[q].SSLTimeStr5,
        CDList[q].SSLTimeEnd5,
        SWLTimeGubun5
      );
    q = q - 1;
  }
  if (q < 0) {
    //이번달 그리드의 1일까지 합산됨. 이전달의 합을 계산해야함

    if (CDList_BefMonth) {
      for (let q = 0; q < CDList_BefMonth.length; q++) {
        //이전달 그리드어 어차피 마지막 주휴 다음날부터 말일까지 조회되므로 전부 합계를 내면 됨
        BaseTotOfWeek = BaseTotOfWeek + CDList_BefMonth[q].CDWTimeNormal;
        BaseTotOfWeek_Join =
          BaseTotOfWeek_Join +
          CalcWTimes(
            "기본",
            ValList[1].WTIMEOFDAYLIMIT,
            SWNightStrWTime,
            SWNightEndWTime,
            CDList[q].CDWStrTime,
            CDList[q].CDWEndTime,
            CDList[q].SSLTimeStr1,
            CDList[q].SSLTimeEnd1,
            SWLTimeGubun1,
            CDList[q].SSLTimeStr2,
            CDList[q].SSLTimeEnd2,
            SWLTimeGubun2,
            CDList[q].SSLTimeStr3,
            CDList[q].SSLTimeEnd3,
            SWLTimeGubun3,
            CDList[q].SSLTimeStr4,
            CDList[q].SSLTimeEnd4,
            SWLTimeGubun4,
            CDList[q].SSLTimeStr5,
            CDList[q].SSLTimeEnd5,
            SWLTimeGubun5
          );
      }
    }
  }
  //해당일자의 뒤쪽일자의 주당 근로시간(소정, 실제 둘다)을 합산
  for (let i = iRow; i < CDList.length; i++) {
    if (CDList[i].CDDayWeek === SWHoliWeek) break; //주휴일을 만남.합산 끝
    BaseTotOfWeek_Join =
      BaseTotOfWeek_Join +
      CalcWTimes(
        "기본",
        ValList[1].WTIMEOFDAYLIMIT,
        SWNightStrWTime,
        SWNightEndWTime,
        CDList[i].CDWStrTime,
        CDList[i].CDWEndTime,
        CDList[i].SSLTimeStr1,
        CDList[i].SSLTimeEnd1,
        SWLTimeGubun1,
        CDList[i].SSLTimeStr2,
        CDList[i].SSLTimeEnd2,
        SWLTimeGubun2,
        CDList[i].SSLTimeStr3,
        CDList[i].SSLTimeEnd3,
        SWLTimeGubun3,
        CDList[i].SSLTimeStr4,
        CDList[i].SSLTimeEnd4,
        SWLTimeGubun4,
        CDList[i].SSLTimeStr5,
        CDList[i].SSLTimeEnd5,
        SWLTimeGubun5
      );
    if ((q = iRow)) continue;
    if (CDList[i].CDDayWeek === SWHoliWeek) break;
    if (CDList_BefMonth !== null) {
      BaseTotOfWeek = BaseTotOfWeek + CDList_BefMonth[i].CDWTimeNormal;
    }
  }
  //실 근로시간이 소정근로 시간합을 초과했는지 비교
  if (BaseTotOfWeek + MuhueBase > iWTimeOfWeekLimit) {
    //소정근로시간보다 주간 실근로시간과 무휴일의 근무시간의 합이 더 큼. 초과분만큼은 연장으로 들어간다.
    if (MuhueNight > 0 && BaseTotOfWeek + MuhueBase - BaseTotOfWeek_Join > 0)
      CDList[iRow].CDWTimeNight =
        MuhueNight - (BaseTotOfWeek + MuhueBase - BaseTotOfWeek_Join); //당일실제야간 = 당일야간-(주간실근로시간+당일기본근로시간-주간소정근로시간)

    if (CDList[iRow].CDWTimeNight < 0) CDList[iRow].CDWTimeNight = 0; //야간근로시간이 마이너스면 강제로 0으로 셋팅
    CDList[iRow].CDWTimeNightOver = MuhueNight - CDList[iRow].CDWTimeNight; //당일야간연장 = 당일야간 - 당일실제야간
    if (CDList[iRow].CDWTimeNightOver < 0) CDList[iRow].CDWTimeNightOver = 0; //마이너스면 강제로 0으로

    CDList[iRow].CDWTimeOver = BaseTotOfWeek + MuhueBase - iWTimeOfWeekLimit; //당일연장=(주간실근로시간+당일기본근로시간-주간소정근로시간)
    CDList[iRow].CDWTimeNormal = iWTimeOfWeekLimit - BaseTotOfWeek;
    if (CDList[iRow].CDWTimeOver > MuhueBase)
      CDList[iRow].CDWTimeOver = MuhueBase;
    if (CDList[iRow].CDWTimeOver < 0) CDList[iRow].CDWTimeOver = 0;
    if (CDList[iRow].CDWTimeNormal > MuhueBase)
      CDList[iRow].CDWTimeNormal = MuhueBase;
    if (CDList[iRow].CDWTimeNormal < 0) CDList[iRow].CDWTimeNormal = 0;
    CDList[iRow].CDWTimeOver =
      CDList[iRow].CDWTimeOver +
      CalcWTimes(
        "연장",
        ValList[1].WTIMEOFDAYLIMIT,
        SWNightStrWTime,
        SWNightEndWTime,
        CDList[iRow].CDWStrTime,
        CDList[iRow].CDWEndTime,
        CDList[iRow].SSLTimeStr1,
        CDList[iRow].SSLTimeEnd1,
        SWLTimeGubun1,
        CDList[iRow].SSLTimeStr2,
        CDList[iRow].SSLTimeEnd2,
        SWLTimeGubun2,
        CDList[iRow].SSLTimeStr3,
        CDList[iRow].SSLTimeEnd3,
        SWLTimeGubun3,
        CDList[iRow].SSLTimeStr4,
        CDList[iRow].SSLTimeEnd4,
        SWLTimeGubun4,
        CDList[iRow].SSLTimeStr5,
        CDList[iRow].SSLTimeEnd5,
        SWLTimeGubun5
      );
    CDList[iRow].CDWTimeNightOver =
      CDList[iRow].CDWTimeNightOver +
      CalcWTimes(
        "야간연장",
        ValList[1].WTIMEOFDAYLIMIT,
        SWNightStrWTime,
        SWNightEndWTime,
        CDList[iRow].CDWStrTime,
        CDList[iRow].CDWEndTime,
        CDList[iRow].SSLTimeStr1,
        CDList[iRow].SSLTimeEnd1,
        SWLTimeGubun1,
        CDList[iRow].SSLTimeStr2,
        CDList[iRow].SSLTimeEnd2,
        SWLTimeGubun2,
        CDList[iRow].SSLTimeStr3,
        CDList[iRow].SSLTimeEnd3,
        SWLTimeGubun3,
        CDList[iRow].SSLTimeStr4,
        CDList[iRow].SSLTimeEnd4,
        SWLTimeGubun4,
        CDList[iRow].SSLTimeStr5,
        CDList[iRow].SSLTimeEnd5,
        SWLTimeGubun5
      );
    CDList[iRow].CDWTimeHoli = InfraLib.infraRoundUp(
      CDList[iRow].CDWTimeNormal * PublicValue.VALWTIMEHOLIRATE,
      PublicValue.ValBaseDigit
    );
  } else {
    CDList[iRow].CDWTimeNormal = MuhueBase;
    CDList[iRow].CDWTimeNight = MuhueNight;
    CDList[iRow].CDWTimeOver = CalcWTimes(
      "연장",
      ValList[1].WTIMEOFDAYLIMIT,
      SWNightStrWTime,
      SWNightEndWTime,
      CDList[iRow].CDWStrTime,
      CDList[iRow].CDWEndTime,
      CDList[iRow].SSLTimeStr1,
      CDList[iRow].SSLTimeEnd1,
      SWLTimeGubun1,
      CDList[iRow].SSLTimeStr2,
      CDList[iRow].SSLTimeEnd2,
      SWLTimeGubun2,
      CDList[iRow].SSLTimeStr3,
      CDList[iRow].SSLTimeEnd3,
      SWLTimeGubun3,
      CDList[iRow].SSLTimeStr4,
      CDList[iRow].SSLTimeEnd4,
      SWLTimeGubun4,
      CDList[iRow].SSLTimeStr5,
      CDList[iRow].SSLTimeEnd5,
      SWLTimeGubun5
    );
    CDList[iRow].CDWTimeNightOver = CalcWTimes(
      "야간연장",
      ValList[1].WTIMEOFDAYLIMIT,
      SWNightStrWTime,
      SWNightEndWTime,
      CDList[iRow].CDWStrTime,
      CDList[iRow].CDWEndTime,
      CDList[iRow].SSLTimeStr1,
      CDList[iRow].SSLTimeEnd1,
      SWLTimeGubun1,
      CDList[iRow].SSLTimeStr2,
      CDList[iRow].SSLTimeEnd2,
      SWLTimeGubun2,
      CDList[iRow].SSLTimeStr3,
      CDList[iRow].SSLTimeEnd3,
      SWLTimeGubun3,
      CDList[iRow].SSLTimeStr4,
      CDList[iRow].SSLTimeEnd4,
      SWLTimeGubun4,
      CDList[iRow].SSLTimeStr5,
      CDList[iRow].SSLTimeEnd5,
      SWLTimeGubun5
    );
  }

  return CDList;
};
//그리드의 값이 변경될때 변경구분을 'U'로 변경해주는 함수
Func.RealGrid_ValueChange = (Grid, Row, IndexChangeGubun) => {
  if (Grid.length === 0) return;
  if (IndexChangeGubun === "") return "U";
  return "";
};

export default Func;
