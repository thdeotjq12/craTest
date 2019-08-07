//공통근로운영 정보를 공용변수에 넣는 함수
var express = require("express");
var router = express.Router();
var globalValue = require("../../globalValue");
const passport = require("passport");

router.post("/SetPublicInfo", async (req, res) => {
  console.log("SetPublicInfo");
  var con = await globalValue.connectDB("g00001");

  var sql = "";
  var parm = [];
  var moment = require("moment");
  var ValMACode = "0000"; //사용기관은 하나만 존재하므로 코드를 직접 넣어준다
  var ValList1 = "";
  var ValList2 = "";

  con.connect();

  sql = ` SELECT PDB_ACCT.pdbDec('normal', MATEL, '', 0) AS MATEL                                        
               , PDB_ACCT.pdbDec('normal', MAHP , '', 0) AS MAHP                                         
               , PDB_ACCT.pdbDec('normal', MAFAX, '', 0) AS MAFAX                                        
               , MACODE           , MANAME          , MABOSSNAME       , MASAUPNUM       , MAJUSO            
               , MAHOMEPAGE       , MADAMDANG       , MAEMAIL          , MAKOOKMINJISA   , MAKOOKMINTEL      
               , MAKOOKMINFAX     , MAGUNGANGJISA   , MAGUNGANGTEL     , MAGUNGANGFAX    , MAGOYONGJISA      
               , MAGOYONGTEL      , MAGOYONGFAX     , MASIGN1          , MASIGN2         , MASIGN3           
               , MASIGN4          , MASIGN5         , MASTAMPFILENAME  , MALOGOFILENAME  , MAHOLIGUBUN0      
               , MAYENCHADEACHE0YN, MAHOLIGUBUN1    , MAYENCHADEACHE1YN, MAHOLIGUBUN2    , MAYENCHADEACHE2YN 
               , MAKOOKMINAUTO0YN , MAGUNGANGAUTO0YN, MAGOYONGAUTO0YN  , MAINSUREBIGO0   , MAKOOKMINAUTO1YN  
               , MAGUNGANGAUTO1YN , MAGOYONGAUTO1YN , MAINSUREBIGO1    , MAKOOKMINAUTO2YN, MAGUNGANGAUTO2YN  
               , MAGOYONGAUTO2YN  , MAINSUREBIGO2   , MAYENCHAPAY0YN   , MAYENCHAPAYBIGO0, MAYENCHAPAY1YN    
               , MAYENCHAPAYBIGO1 , MAYENCHAPAY2YN  , MAYENCHAPAYBIGO2 , MABIGO               FROM MAINAGENCY
           WHERE MACODE = ?                                                                         
   `;
  parm = [ValMACode];

  con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      ValList1 = rows;
    } else {
      console.log("Query ERR : ", err);
      res.send("NoData");
    }
  });

  sql = ` SELECT * FROM WORKINFOPUBLIC
           WHERE WPMACODE = ?  `;
  con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      ValList2 = rows;

      Result = ValList1.concat(ValList2);
      Result[1].WPMOBILECCTIMEUPIN = 15;
      Result[1].WPMOBILERATETIMEIN = 5;
      Result[1].WPMOBILECCTIMEUPOUT = 15;
      Result[1].WPMOBILERATETIMEOUT = 5;
      Result[1].ValBaseDigit = 2;
      Result[1].ValOverDigit = 2;
      Result[1].ValWTimeLimitOfDay = 8; //일일 기본 근로 시간
      Result[1].ValWTimeHoliRate = 0.2; //주휴수당 계수
      Result[1].WTimeOfDayLimit = 8; //법정 하루 최대 근무시간
      Result[1].WTimeOfDayLimitMinor = 7; //법정 하루 최대 근무시간(미성년자)
      Result[1].WTimeOfWeekLimit = 40; //법정 주 최대 근무시간
      Result[1].WTimeOfWeekLimitMinor = 40; //법정 주 최대 근무시간(미성년자: 성인근로자와 같음)=>유영혜20161021: 미성년자도 주당 40시간이후로 연장근로 적용받음
      res.send(Result);
    } else {
      console.log("Query ERR : ", err);
      res.send("NoData");
    }
  });
  con.end();
});

router.post("/SetSaupHead", async (req, res) => {
  console.log("SetSaupHead");
  var con = await globalValue.connectDB("g00001");
  var SaupHead = {};
  var sql = "";
  var parm = [];
  var moment = require("moment");

  var STRDate = req.body.Year + "-01-01";
  var ENDDate = req.body.Year + "-12-31";
  var SHCode = req.body.SHCode;
  var Mode = req.body.Mode;
  console.log(req.body);
  con.connect();

  sql = `SELECT SHCODE, SHNAME FROM SAUPHEAD
          WHERE SHSTRDATE >=  ?      
            AND SHSTRDATE <=  ?     
            AND SHDELYN   <> 'Y'         
          ORDER BY SHCODE,SHNAME            
                        `;
  parm = [STRDate, ENDDate];

  con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      SaupHead = {
        ...SaupHead,
        SaupHead: rows
      };
      console.log("Head", SaupHead, STRDate, ENDDate);
      res.send(SaupHead);
    } else {
      console.log("Query ERR : ", err);
      res.send("NoData");
    }
  });

  con.end();
});

router.post("/SetSaupDetail", async (req, res) => {
  console.log("SetSaupDetail");
  var con = await globalValue.connectDB("g00001");
  var SaupDetail = {};
  var sql = "";
  var parm = [];
  var moment = require("moment");

  var STRDate = req.body.Year + "-01-01";
  var ENDDate = req.body.Year + "-12-31";
  var SHCode = req.body.SHCode;
  var Mode = req.body.Mode;

  con.connect();

  sql = `SELECT SDSHCODE, SDCODE, SDNAME FROM SAUPDETAIL       
          WHERE SDSTRDATE >= ? AND SDSTRDATE <= ?
            AND SDDELYN <> 'Y'                          `;
  parm = [STRDate, ENDDate];
  if (SHCode !== "전체") {
    sql = sql + ` AND SDSHCODE = ? `;
    parm.push(SHCode);
  }
  sql = sql + ` ORDER BY SDSHCODE, SDCODE, SDNAME       `;

  con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      SaupDetail = {
        ...SaupDetail,
        SaupDetail: rows
      };
      res.send(SaupDetail);
    } else {
      console.log("Query ERR : ", err);
      res.send("NoData");
    }
  });

  con.end();
});

module.exports = router;
