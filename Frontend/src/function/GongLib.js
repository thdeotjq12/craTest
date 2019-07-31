import axios from "axios";
import InfraLib from "./InfraLib";
import PublicValue from "./PublicValue";
var Func = {};

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
) => {};
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
