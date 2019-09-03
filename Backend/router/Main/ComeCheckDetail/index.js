// import GongLib from "../../../../Frontend/src/function/GongLib";
var express = require("express");
var router = express.Router();
var globalValue = require("../../../globalValue");
const passport = require("passport");

var ValBaseDigit = 2;
var ValOverDigit = 2;
var ValWTimeLimitOfDay = 8;
var ValWPMobileCCTimeUpIn = 15; //출근보정(적용단위), 모바일근태시간올림(분단위) : 모바일에서 체크된 근태를 불러올때 올림할 단위.
var ValWPMobileRateTimeIn = 5;
var ValWPMobileCCTimeUpOut = 15;
var ValWPMobileRateTimeOut = 5;
var PValue = {
  ValVersionText: (ValVersionText = "181018.01"),
  ValWTimeHoliRate: (ValWTimeHoliRate = 0.2),
  WTimeOfDayLimit: (WTimeOfDayLimit = 8),
  WTimeOfDayLimitMinor: (WTimeOfDayLimitMinor = 7),
  WTimeOfWeekLimit: (WTimeOfWeekLimit = 40),
  WTimeOfWeekLimitMinor: (WTimeOfWeekLimitMinor = 40),
  ValPWCheckLevel: (ValPWCheckLevel = 5),
  ValBaseDigit: ValBaseDigit,
  ValOverDigit: ValOverDigit,
  ValWTimeLimitOfDay: ValWTimeLimitOfDay, //일일 기본 근로 시간
  ValWPMobileCCTimeUpIn: ValWPMobileCCTimeUpIn,
  ValWPMobileRateTimeIn: ValWPMobileRateTimeIn,
  ValWPMobileCCTimeUpOut: ValWPMobileCCTimeUpOut,
  ValWPMobileRateTimeOut: ValWPMobileRateTimeOut
};
const infraRoundUp = (number, disit) => {
  var disit10;
  disit10 = 1;

  for (let i = 1; i < Math.abs(disit); i++) {
    disit10 = disit10 * 10;
  }
  if (disit >= 0) number = number * disit10;
  else number = number / disit10;

  if (disit === 0) number = Math.trunc(number * 10) / 10;

  number = Math.ceil(Math.trunc(number * 10) / 10);

  disit10 = Math.trunc(disit10);
  if (disit >= 0) number = number / disit10;
  else number = number * disit10;

  return number;
};
const Bool2YN = BoolValue => {
  var Result;
  if (BoolValue) Result = "Y";
  else Result = "N";
  return Result;
};

const SaveClick1 = async (CDSTCode, CDSHCode, CDSDCode, CDDate) => {
  var con = await globalValue.connectDB("g00001");
  var sql = ` SELECT COUNT(*) CNT FROM COMECHECKTOT
  WHERE CTSTCODE    = ?       
    AND CTSHCODE    = ?       
    AND CTSDCODE    = ?       
    AND CTYEARMONTH = ?    `;

  var parm = [CDSTCode, CDSHCode, CDSDCode, CDDate];
  var Result;
  console.log("       5        ");
  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      Result = {
        ...Result,
        COMECHECKTOT: rows
      };
      Result &&
        console.log(
          "       5 RE       ",
          Result.COMECHECKTOT[0].CNT,
          Result.CNT
        );
      return Result.COMECHECKTOT[0].CNT;
    } else {
      console.log("Query ERR : ", err);
      res.send("NoData");
    }
  });
};
router.post("/SetHolidays", async (req, res) => {
  // console.log("SetHolidays");
  var con = await globalValue.connectDB("g00001");
  var result = {};
  var sql = "";
  var parm = [];
  var moment = require("moment");
  var StrDate = req.body.StrDate;
  var EndDate = req.body.EndDAte;
  var SWGubun = req.body.SWGubun;
  con.connect();

  sql =
    ` SELECT CHCODE, CHGUBUN, CHNAME, CHDATE, CHMEMO, CHCCGUBUN` +
    SWGubun +
    ` AS CHCCGUBUN FROM COMPANYHOLIDAYS
           WHERE CHDATE >= ?                                                                             
             AND CHDATE <= ?
           ORDER BY CHDATE                                                                                        `;
  parm = [StrDate, EndDate];

  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      result = {
        ...result,
        HolidaysList: rows
      };

      res.send(result);
    } else {
      console.log("Query ERR : ", err);
      res.send("NoData");
    }
  });

  con.end();
});

router.post("/SetHuejik", async (req, res) => {
  var con = await globalValue.connectDB("g00001");
  var result = {};
  var sql = "";
  var parm = [];
  var moment = require("moment");
  var STCode = req.body.STCode;
  var StrDate = req.body.StrDate;
  var EndDate = req.body.EndDAte;

  con.connect();

  sql = ` SELECT * FROM STAFFHUEJIK                                   
           WHERE SHSTCODE = ?                                   
             AND ((SHSTRDATE <= ? AND SHENDDATE >= ?) 
              OR ( SHSTRDATE >= ? AND SHSTRDATE <= ?))   `;
  parm = [STCode, StrDate, StrDate, StrDate, EndDate];

  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      result = {
        ...result,
        HuejikList: rows
      };
      // console.log("HuejikList", result);
      res.send(result);
    } else {
      console.log("Query ERR : ", err);
      res.send("NoData");
    }
  });

  con.end();
});

router.post("/SetComeCheckDate", async (req, res) => {
  console.log("SetComeCheckDate");
  var con = await globalValue.connectDB("g00001");
  var result = {};
  var sql = "";
  var parm = [];
  var moment = require("moment");
  var STCode = req.body.STCode;
  var SHCode = req.body.SHCode;
  var SDCode = req.body.SDCode;
  var StrDate = req.body.StrDate;
  var EndDate = req.body.EndDate;
  console.log("Test 2 ", req.body);
  con.connect();

  sql = ` SELECT * FROM COMECHECKDATE
           WHERE CDSTCODE = ?
             AND CDSHCODE = ?
             AND CDSDCODE = ?
             AND CDDATE  >= ? 
             AND CDDATE  <= ? 
           ORDER BY CDDATE               `;
  parm = [STCode, SHCode, SDCode, StrDate, EndDate];

  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      result = {
        ...result,
        ComeCheckDateList: rows
      };
      console.log("ComeChec Parm", parm);

      console.log("ComeCheckDateList", result);
      res.send(result);
    } else {
      console.log("Query ERR : ", err);
      res.send("NoData");
    }
  });

  con.end();
});

router.post("/btnSaveClick", async (req, res) => {
  console.log("btnSaveClick");
  var con = await globalValue.connectDB("g00001");
  var CTWDateCNT = 0; //근무일
  var CTWTimeCNT = 0; //근무시간
  var CTWTimeNormal = 0; //평일기본
  var CTWTimeHoli = 0; //평일주휴
  var CTWTimeOver = 0; //평일연장
  var CTWTimeNight = 0; //평일야간
  var CTWTimeNightOver = 0; //평일연장야간
  var CTHTimeBase = 0; //휴일기본
  var CTHTimeOver = 0; //휴일연장
  var CTHTimeNight = 0; //휴일야간
  var CTHTimeNightOver = 0; //휴일연장야간
  var CTTkTime = 0; //특근
  var CTNoComeCNT = 0; //결근일수
  var CTLateTime = 0; //지각시간
  var CTEarlyOutTime = 0; //조퇴시간

  //포괄근태 계산을 계산하기 위한 변수
  var DateOfWeek; //주간 근로일수.
  var StrDate;
  var EndDate;
  var iMonthMaxDate;
  var GongjeaDate;

  var result = {};
  var sql = "";
  var parm = [];
  var moment = require("moment");
  var Mode = req.body.Mode;
  var CDSTCode = req.body.CDSTCode;
  var CDSHCode = req.body.CDSHCode;
  var CDSDCode = req.body.CDSDCode;
  var StrDate = req.body.StrDate;
  var EndDate = req.body.EndDate;
  var SuccessFalg = false;
  var CDList = req.body.CDList;
  var CCList = req.body.CCList;
  var CCYearMonth = req.body.CCYearMonth;
  con.connect();

  sql = ` DELETE FROM COMECHECKDATE  
           WHERE CDSTCODE = ?
             AND CDSHCODE = ?
             AND CDSDCODE = ?
             AND CDDATE  >= ?
             AND CDDATE  <= ?
            `;
  parm = [CDSTCode, CDSHCode, CDSDCode, StrDate, EndDate];

  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      SuccessFalg = true;
    } else {
      console.log("Query ERR : ", err);
      res.send("NoData");
    }
  });
  console.log("       1        ");
  //일자별 근태 저장
  let i = 0;
  while (i < CDList.length) {
    //집계값을 먼저 계산한다.
    if (CDList[i].CDWStrTime !== "" && CDList[i].CDWEndTime) {
      CTWDateCNT = CTWDateCNT + 1; // 근무일
      CTWTimeCNT =
        CTWTimeCNT +
        CDList[i].CDWTimeNormal +
        CDList[i].CDWTimeOver +
        CDList[i].CDWTimeNightOver +
        CDList[i].CDHTimeBase +
        CDList[i].CDHTimeOver +
        CDList[i].CDHTimeNightOver +
        CDList[i].CDTkTime;
    }
    CTWTimeNormal = CTWTimeNormal + CDList[i].CDWTimeNormal; //평일기본
    CTWTimeHoli = CTWTimeHoli + CDList[i].CDWTimeHoli; //평일주휴
    CTWTimeOver = CTWTimeOver + CDList[i].CDWTimeOver; //평일연장
    CTWTimeNight = CTWTimeNight + CDList[i].CDWTimeNight; //평일야간
    CTWTimeNightOver = CTWTimeNightOver + CDList[i].CDWTimeNightOver; //평일연장야간
    CTHTimeBase = CTHTimeBase + CDList[i].CDHTimeBase; //휴일기본
    CTHTimeOver = CTHTimeOver + CDList[i].CDHTimeOver; //휴일연장
    CTHTimeNight = CTHTimeNight + CDList[i].CDHTimeNight; //휴일야간
    CTHTimeNightOver = CTHTimeNightOver + CDList[i].CDHTimeNightOver; //휴일연장야간
    CTTkTime = CTTkTime + CDList[i].CDTkTime; //특근
    CTNoComeCNT = CTNoComeCNT + CDList[i].CDNoComeCNT; //결근일수
    CTLateTime = CTLateTime + CDList[i].CDLateTime; //지각시간
    CTEarlyOutTime = CTEarlyOutTime + CDList[i].CDEarlyOutTime; //조퇴시간
    if (CDList[i].ChangeGubun === "N") {
      //신규메모, DB에 저장
      sql = ` INSERT INTO COMECHECKDATE(CDSTCODE   , CDSHCODE    , CDSDCODE        , CDDATE     , CDWSTRTIME , CDWENDTIME  , CDSSTRTIME      , CDSENDTIME          
                                      , CDGUBUN    , CDHTIME     , CDWTIMENORMAL   , CDWTIMEHOLI, CDWTIMEOVER, CDWTIMENIGHT, CDWTIMENIGHTOVER, CDHTIMEBASE         
                                      , CDHTIMEOVER, CDHTIMENIGHT, CDHTIMENIGHTOVER, CDTKTIME   , CDNOCOMECNT, CDLATETIME  , CDEARLYOUTTIME  , CDMEMO     )        
              VALUES(?   , ?   , ?  , ?  , ?, ?  , ?  , ?  
                   , ?   , ?   , ?  , ?  , ?, ?  , ?  , ? 
                   , ?   , ?   , ?  , ?  , ?, ?  , ?  , ?     )

       `;
      parm = [
        CDSTCode,
        CDSHCode,
        CDSDCode,
        CDList[i].CDDate,
        CDList[i].CDWStrTime,
        CDList[i].CDWEndTime,
        CDList[i].CDSStrTime,
        CDList[i].CDSEndTime,
        CDList[i].CDGubun,
        CDList[i].CDHTime,
        CDList[i].CDWTimeNormal,
        CDList[i].CDWTimeHoli,
        CDList[i].CDWTimeOver,
        CDList[i].CDWTimeNight,
        CDList[i].CDWTimeNightOver,
        CDList[i].CDHTimeBase,
        CDList[i].CDHTimeOver,
        CDList[i].CDHTimeNight,
        CDList[i].CDHTimeNightOver,
        CDList[i].CDTkTime,
        CDList[i].CDNoComeCNT,
        CDList[i].CDLateTime,
        CDList[i].CDEarlyOutTime,
        CDList[i].CDMemo
      ];
      i = i + 1;
      await con.query(sql, parm, (err, rows, fields) => {
        if (!err) {
        } else {
          console.log("Query ERR : ", err);
          res.send("NoData");
        }
      });
      console.log("       2        ");
    } else if (CDList[i].ChangeGubun === "U") {
      sql = ` UPDATE COMECHECKDATE SET             
               CDWSTRTIME       = ?      
               CDWENDTIME       = ?      
               CDSSTRTIME       = ?      
               CDSENDTIME       = ?      
               CDGUBUN          = ?         
               CDHTIME          = ?         
               CDWTIMENORMAL    = ?   
               CDWTIMEHOLI      = ?     
               CDWTIMEOVER      = ?     
               CDWTIMENIGHT     = ?    
               CDWTIMENIGHTOVER = ?
               CDHTIMEBASE      = ?     
               CDHTIMEOVER      = ?     
               CDHTIMENIGHT     = ?    
               CDHTIMENIGHTOVER = ?
               CDTKTIME         = ?        
               CDNOCOMECNT      = ?     
               CDLATETIME       = ?      
               CDEARLYOUTTIME   = ?  
               CDMEMO           = ?          
              WHERE CDSTCODE    = ?        
                AND CDSHCODE    = ?        
                AND CDSDCODE    = ?        
                AND CDDATE      = ?               
      `;
      parm = [
        CDList[i].CDWStrTime,
        CDList[i].CDWEndTime,
        CDList[i].CDSStrTime,
        CDList[i].CDSEndTime,
        CDList[i].CDGubun,
        CDList[i].CDHTime,
        CDList[i].CDWTimeNormal,
        CDList[i].CDWTimeHoli,
        CDList[i].CDWTimeOver,
        CDList[i].CDWTimeNight,
        CDList[i].CDWTimeNightOver,
        CDList[i].CDHTimeBase,
        CDList[i].CDHTimeOver,
        CDList[i].CDHTimeNight,
        CDList[i].CDHTimeNightOver,
        CDList[i].CDTkTime,
        CDList[i].CDNoComeCNT,
        CDList[i].CDLateTime,
        CDList[i].CDEarlyOutTime,
        CDList[i].CDMemo,
        CDSTCode,
        CDSHCode,
        CDSDCode,
        CDList[i].CDDate
      ];
      i = i + 1;
      await con.query(sql, parm, (err, rows, fields) => {
        if (!err) {
        } else {
          console.log("Query ERR : ", err);
          res.send("NoData");
        }
      });
      console.log("       3        ");
    } else if (CDList[i].ChangeGubun === "D") {
      //삭제
      sql = ` DELETE COMECHECKDATE SET     
               WHERE CDSTCODE    = ?
                 AND CDSHCODE    = ?
                 AND CDSDCODE    = ?
                 AND CDDATE      = ?  
      `;
      parm = [CDSTCode, CDSHCode, CDSDCode, CDList[i].CDDate];
      await con.query(sql, parm, (err, rows, fields) => {
        if (!err) {
        } else {
          console.log("Query ERR : ", err);
          res.send("NoData");
        }
      });
      console.log("       4        ");
      // CDList.DeleteRow( i );  >>>>>>>>>>>>>>>>>>>>>> 미구현
      i = i + 1; // 이거로 대체
    } else {
      i = i + 1;
    }
  }

  if (!CCList[0].SSCCUSEYN) {
    DateOfWeek = 0;
    if (CCList[0].SSWEEK1YN) DateOfWeek = DateOfWeek + 1;
    if (CCList[0].SSWEEK2YN) DateOfWeek = DateOfWeek + 1;
    if (CCList[0].SSWEEK3YN) DateOfWeek = DateOfWeek + 1;
    if (CCList[0].SSWEEK4YN) DateOfWeek = DateOfWeek + 1;
    if (CCList[0].SSWEEK5YN) DateOfWeek = DateOfWeek + 1;
    if (CCList[0].SSWEEK6YN) DateOfWeek = DateOfWeek + 1;
    if (CCList[0].SSWEEK7YN) DateOfWeek = DateOfWeek + 1;
    sql = ` SELECT SSBASETIME, SSHTIME , SSOVERTIME, SSNIGHTTIME, SSONTIME
                 , SSHOLITIME, SSHOTIME, SSHNTIME  , SSHONTIME  , SSTKTIME
                                                            FROM SAUPSTAFF
             WHERE SSMSHCODE = ?                                    
               AND SSMSDCODE = ?                                    
               AND SSMSTCODE = ?                                    `;
    parm = [CDSHCode, CDSDCode, CDSTCode];
    await con.query(sql, parm, (err, rows, fields) => {
      if (!err) {
        CTWDateCNT = DateOfWeek * 4.34; //근무일
        CTWTimeCNT =
          rows.SSBaseTime +
          rows.SSOverTime +
          rows.SSONTime +
          rows.SSHoliTime +
          rows.SSHOTime +
          rows.SSHONTime +
          rows.SSTkTime; //근무시간
        CTWTimeNormal = rows.SSBaseTime; //평일기본
        CTWTimeHoli = rows.SSHTime; //평일주휴
        CTWTimeOver = rows.SSOverTime; //평일연장
        CTWTimeNight = rows.SSNightTime; //평일야간
        CTWTimeNightOver = rows.SSONTime; //평일연장야간
        CTHTimeBase = rows.SSHoliTime; //휴일기본
        CTHTimeOver = rows.SSHOTime; //휴일연장
        CTHTimeNight = rows.SSHNTime; //휴일야간
        CTHTimeNightOver = rows.SSHONTime; //휴일연장야간
        CTTkTime = rows.SSTkTime; //특근
        CTNoComeCNT = 0; //결근일수
        CTLateTime = 0; //지각시간
        CTEarlyOutTime = 0; //조퇴시간
        //사업 시작일과 종료일이 끼인 달의 계산: DB에서 불러온 근무 시간 집계를 클리어 하고 공제일을 반영하여 다시 계산한다.
        //CCYearMonth : 현재 화면에 뿌려질 년월(일자는 무조건 1일)
        if (
          moment(CCList[0].SSMSTRDATE).format("YYYY") ===
            moment(CCList[0].CCYearMonth).format("YYYY") &&
          moment(CCList[0].SSMSTRDATE).format("MM") ===
            moment(CCList[0].CCYearMonth).format("MM") &&
          moment(CCList[0].SSMENDDATE).format("YYYY") ===
            moment(CCList[0].SSMENDDATE).format("YYYY") &&
          moment(CCList[0].SSMENDDATE).format("MM") ===
            moment(CCList[0].SSMENDDATE).format("MM")
        ) {
          //사업 시작일이 이번 달인 경우 시작 전 날짜만큼 제외
          //사업 종료일이 이번 달인 경우 종료 이후 날짜 만큼 제외
          //근무일 계산
          StrDate = CCYearMonth;
          EndDate =
            moment(StrDate).format("YYYY") +
            "-" +
            moment(StrDate).format("MM") +
            "-" +
            moment(StrDate)
              .endOf("month")
              .format("DD");
          while (moment(StrDate) < moment(EndDate)) {
            //퇴사당일은 근무하지 않은것이므로 누적하지 않음
            if (
              (CDList[moment(StrDate).day()].CDDayWeek === "1" && SSWEEK1YN) ||
              (CDList[moment(StrDate).day()].CDDayWeek === "2" && SSWEEK2YN) ||
              (CDList[moment(StrDate).day()].CDDayWeek === "3" && SSWEEK3YN) ||
              (CDList[moment(StrDate).day()].CDDayWeek === "4" && SSWEEK4YN) ||
              (CDList[moment(StrDate).day()].CDDayWeek === "5" && SSWEEK5YN) ||
              (CDList[moment(StrDate).day()].CDDayWeek === "6" && SSWEEK6YN) ||
              (CDList[moment(StrDate).day()].CDDayWeek === "7" && SSWEEK7YN)
            )
              //근무일만 근로일로 누적
              CTWDateCNT = CTWDateCNT + 1;
            StrDate = moment(StrDate)
              .add("days", 1)
              .format("YYYY-MM-DD");
          }
          var EndMon =
            moment(CCYearMonth).format("YYYY") +
            "-" +
            moment(CCYearMonth).format("MM") +
            "-" +
            moment(CCYearMonth)
              .endOf("month")
              .format("DD");
          if (
            moment(CCList[0].SSMSTRDATE) > moment(CCYearMonth) ||
            moment(CCList[0].SSMENDDATE) <= moment(EndMon)
          ) {
            GongjeaDate = 0;
            StrDate = CCList[0].SSMSTRDATE;
            EndMon =
              moment(StrDate).format("YYYY") +
              "-" +
              moment(StrDate).format("MM") +
              "-" +
              moment(StrDate)
                .endOf("month")
                .format("DD");
            iMonthMaxDate = moment(EndMon).day() + 1;
            if (moment(StrDate, "YYYYMM") === moment(CCYearMonth, "YYYYMM"))
              //입사일이 이번달임
              GongjeaDate = moment(StrDate, "YYYY-MM-DD").day(); // 0부터시작이라 -1 안해줬음
            //퇴사일에 따른 공제일 계산
            EndDate = CCList[0].SSMENDDATE;
            EndMon =
              moment(EndDate).format("YYYY") +
              "-" +
              moment(EndDate).format("MM") +
              "-" +
              moment(EndDate)
                .endOf("month")
                .format("DD");
            iMonthMaxDate = moment(EndMon).day() + 1;
            if (moment(EndDate, "YYYYMM") === moment(CCYearMonth, "YYYYMM"))
              //퇴사일이 이번달임
              GongjeaDate =
                GongjeaDate +
                (iMonthMaxDate - moment(StrDate, "YYYY-MM-DD").day()); // 0부터시작이라 -1 안해줬음
            //변경후: 2017-09-06: 유영혜. (근무시간 / 해당월의 총일수) * (해당월의 총일수 - 공제일수) -> 실제 근무한 날만큼으로 계산
            StrDate = CCYearMonth;
            EndMon =
              moment(StrDate).format("YYYY") +
              "-" +
              moment(StrDate).format("MM") +
              "-" +
              moment(StrDate)
                .endOf("month")
                .format("DD");
            iMonthMaxDate = moment(EndMon).day() + 1;
            CTWTimeNormal = infraRoundUp(
              CTWTimeNormal - CTWTimeNormal * (GongjeaDate / iMonthMaxDate),
              PValue.ValBaseDigit
            ); //평일기본
            CTWTimeHoli = infraRoundUp(
              CTWTimeHoli - CTWTimeHoli * (GongjeaDate / iMonthMaxDate),
              PValue.ValBaseDigit
            ); //평일주휴
            CTWTimeOver = infraRoundUp(
              CTWTimeOver - CTWTimeOver * (GongjeaDate / iMonthMaxDate),
              PValue.ValOverDigit
            ); //평일연장
            CTWTimeNight = infraRoundUp(
              CTWTimeNight - CTWTimeNight * (GongjeaDate / iMonthMaxDate),
              PValue.ValOverDigit
            ); //평일야간
            CTWTimeNightOver = infraRoundUp(
              CTWTimeNightOver -
                CTWTimeNightOver * (GongjeaDate / iMonthMaxDate),
              PValue.ValOverDigit
            ); //평일연장야간
            CTHTimeBase = infraRoundUp(
              CTHTimeBase - CTHTimeBase * (GongjeaDate / iMonthMaxDate),
              PValue.ValBaseDigit
            ); //휴일기본
            CTHTimeOver = infraRoundUp(
              CTHTimeOver - CTHTimeOver * (GongjeaDate / iMonthMaxDate),
              PValue.ValOverDigit
            ); //휴일연장
            CTHTimeNight = infraRoundUp(
              CTHTimeNight - CTHTimeNight * (GongjeaDate / iMonthMaxDate),
              PValue.ValOverDigit
            ); //휴일야간
            CTHTimeNightOver = infraRoundUp(
              CTHTimeNightOver -
                CTHTimeNightOver * (GongjeaDate / iMonthMaxDate),
              PValue.ValOverDigit
            ); //휴일연장야간
            CTTkTime = infraRoundUp(
              CTTkTime - CTTkTime * (GongjeaDate / iMonthMaxDate),
              PValue.ValOverDigit
            ); //특근
            CTWTimeCNT =
              CTWTimeNormal +
              CTWTimeOver +
              CTWTimeNightOver +
              CTHTimeBase +
              CTHTimeOver +
              CTHTimeNightOver +
              CTTkTime; //근무시간 합계
          }
        }
      } else {
        console.log("Query ERR : ", err);
        res.send("NoData");
      }
    });
  }
  //집계값 저장
  var Result;

  // sql = ` SELECT COUNT(*) CNT FROM COMECHECKTOT
  //          WHERE CTSTCODE    = ?
  //            AND CTSHCODE    = ?
  //            AND CTSDCODE    = ?
  //            AND CTYEARMONTH = ?    `;
  // parm = [CDSTCode, CDSHCode, CDSDCode, CDList[0].CDDate];
  // var Result;
  // console.log("       5        ");
  // await con.query(sql, parm, (err, rows, fields) => {
  //   if (!err) {
  //     Result = {
  //       ...Result,
  //       COMECHECKTOT: rows
  //     };
  //     console.log("Result IN: ", Result);
  //   } else {
  //     console.log("Query ERR : ", err);
  //     res.send("NoData");
  //   }
  // });
  console.log("       6        ");
  Result = await SaveClick1(CDSTCode, CDSHCode, CDSDCode, CDList[0].CDDate);
  Result && console.log("Result : ", Result);
  if (Result) {
    if (Result.CNT === 0) {
      sql = ` INSERT INTO COMECHECKTOT(CTSTCODE   , CTSHCODE     , CTSDCODE        , CTYEARMONTH, CTSUSUPYN   , CTHUEYN         , CTWDATECNT    
                                   , CTWTIMECNT , CTWTIMENORMAL, CTWTIMEHOLI     , CTWTIMEOVER, CTWTIMENIGHT, CTWTIMENIGHTOVER, CTHTIMEBASE    
                                   , CTHTIMEOVER, CTHTIMENIGHT , CTHTIMENIGHTOVER, CTTKTIME   , CTNOCOMECNT , CTLATETIME      , CTEARLYOUTTIME)
            VALUES(?  , ?  ,  ?  , ?  , ?  , ?  , ?     
                  ,?  , ?  ,  ?  , ?  , ?  , ?  , ?    
                  ,?  , ?  ,  ?  , ?  , ?  , ?  , ?)`;
      parm = [
        CDSTCode,
        CDSHCode,
        CDSDCode,
        CDList[0].CDDate,
        Bool2YN(CCList[0].CDDATESUSUPYN),
        Bool2YN(CCList[0].CDDATEHUEJIKYN),
        CTWDateCNT,
        CTWTimeCNT,
        CTWTimeNormal,
        CTWTimeHoli,
        CTWTimeOver,
        CTWTimeNight,
        CTWTimeNightOver,
        CTHTimeBase,
        CTHTimeOver,
        CTHTimeNight,
        CTHTimeNightOver,
        CTTkTime,
        CTNoComeCNT,
        CTLateTime,
        CTEarlyOutTime
      ];
    } else {
      //업데이트
      sql = ` UPDATE COMECHECKTOT SET               
             CTSUSUPYN        = ?       ,
             CTHUEYN          = ?         ,
             CTWDATECNT       = ?      ,
             CTWTIMECNT       = ?      ,
             CTWTIMENORMAL    = ?   ,
             CTWTIMEHOLI      = ?     ,
             CTWTIMEOVER      = ?     ,
             CTWTIMENIGHT     = ?    ,
             CTWTIMENIGHTOVER = ?,
             CTHTIMEBASE      = ?     ,
             CTHTIMEOVER      = ?     ,
             CTHTIMENIGHT     = ?    ,
             CTHTIMENIGHTOVER = ?,
             CTTKTIME         = ?        ,
             CTNOCOMECNT      = ?     ,
             CTLATETIME       = ?      ,
             CTEARLYOUTTIME   = ?   
            WHERE CTSTCODE    = ?         
              AND CTSHCODE    = ?         
              AND CTSDCODE    = ?         
              AND CTYEARMONTH = ?      
   `;
    }
    parm = [
      Bool2YN(CCList[0].CDDATESUSUPYN),
      Bool2YN(CCList[0].CDDATEHUEJIKYN),
      CTWDateCNT,
      CTWTimeCNT,
      CTWTimeNormal,
      CTWTimeHoli,
      CTWTimeOver,
      CTWTimeNight,
      CTWTimeNightOver,
      CTHTimeBase,
      CTHTimeOver,
      CTHTimeNight,
      CTHTimeNightOver,
      CTTkTime,
      CTNoComeCNT,
      CTLateTime,
      CTEarlyOutTime,
      CDSTCode,
      CDSHCode,
      CDSDCode,
      CDList[0].CDDate
    ];
    await con.query(sql, parm, (err, rows, fields) => {
      if (!err) {
        console.log("성공");
        res.send("SUCCESS");
      } else {
        console.log("Query ERR : ", err);
        res.send("NoData");
      }
    });
  }
  console.log("       7        ");
  con.end();
});
module.exports = router;
