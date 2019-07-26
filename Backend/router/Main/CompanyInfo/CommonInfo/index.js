var express = require("express");
var router = express.Router();
var globalValue = require("../../../../globalValue");
const passport = require("passport");
var moment = require("moment");
router.post("/getSudang", async (req, res) => {
  console.log("getSudang 실행됨");
  var con = await globalValue.connectDB("g00001");
  var result = {};
  var sql = "";
  var parm = [];
  // var KeyWord = "%" + req.body[0].KeyWord + "%";
  // var STRDate = req.body[0].KeyYear + "-01-01";
  // var ENDDate = req.body[0].KeyYear + "-12-31";
  con.connect();

  sql = `SELECT * FROM WORKINFOPUBLIC  `;

  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      result = {
        ...result,
        Sudang: rows
      };

      console.log("rows", rows.length);
      // console.log("rows", rows);
      res.send(result);
    } else {
      console.log("Query ERR : ", err);
      res.send("NoData");
    }
  });

  con.end();
});

router.post("/getHoliday", async (req, res) => {
  console.log("getHoliday 실행됨");
  var con = await globalValue.connectDB("g00001");
  var result = {};
  var sql = "";
  var parm = [];

  var STRDate = req.body.HoliDate + "-01-01";
  var ENDDate = req.body.HoliDate + "-12-31";
  con.connect();

  sql = `SELECT * FROM COMPANYHOLIDAYS
          WHERE CHDATE >= ?    
            AND CHDATE <= ?    
          ORDER BY CHDATE             `;
  parm = [STRDate, ENDDate];
  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      result = {
        ...result,
        HoliList: rows
      };

      // console.log("rows", rows);
      res.send(result);
    } else {
      console.log("Query ERR : ", err);
      res.send("NoData");
    }
  });

  con.end();
});
// 4대보험 요율 조회
router.post("/getIRRate", async (req, res) => {
  console.log("getIRRate 실행됨");
  var con = await globalValue.connectDB("g00001");
  var result = {};
  var sql = "";
  var parm = [];

  var STRDate = moment().format("YYYY-MM-DD");
  var ENDDate = moment().format("YYYY-MM-DD");
  console.log(ENDDate);
  con.connect();

  sql = `SELECT * FROM INSURRATE   
          WHERE IRSTRDATE <= ?
            AND IRENDDATE >= ?             `;
  parm = [STRDate, ENDDate];
  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      result = {
        ...result,
        IRRateList: rows
      };

      console.log("rows", rows);
      // console.log("rows", rows);
      res.send(result);
    } else {
      console.log("Query ERR : ", err);
      res.send("NoData");
    }
  });

  con.end();
});
router.post("/getZiwonGwanRi", async (req, res) => {
  var con = await globalValue.connectDB("g00001");
  var result = {};
  var sql = "";
  var parm = [];
  var KeyWord = req.body[0].KeyWord;
  var STRDate = req.body[0].KeyYear + "-01-01";
  var ENDDate = req.body[0].KeyYear + "-12-31";

  con.connect();

  sql = `SELECT PDB_ACCT.pdbDec('normal'  , A.SSMGUBUNSUID, '', 0) AS SSMGUBUNSUID       
              , PDB_ACCT.pdbDec('pattern7', B.STJUMIN     , '', 0) AS STJUMIN            
              , PDB_ACCT.pdbDec('normal'  , B.STTEL       , '', 0) AS STTEL              
              , B.STNAMEKOR , A.*         , A.SSSWGUBUN , E.SANAME                           
              , A.SSMMIDALYN, A.SSMGUBUN  , C1.SDNAME                                        
              , A.SSMEMO    , A.SSMSTRDATE, A.SSMENDDATE, A.SSMGUBUNDATE                     
              , C1.SDSTRDATE, C1.SDENDDATE, C2.SHNAMESHORT                FROM SAUPSTAFF A   
            LEFT JOIN STAFF      B ON A.SSMSTCODE = B.STCODE                                  
            LEFT JOIN SAUPDETAIL C1 ON (A.SSMSHCODE = C1.SDSHCODE AND A.SSMSDCODE = C1.SDCODE)
            LEFT JOIN SAUPHEAD   C2 ON (C1.SDSHCODE = C2.SHCODE                              )
            LEFT JOIN SYSUSER    D ON (C1.SDSUID    = D.SUID                                 )
            LEFT JOIN SUBAGENCY  E ON (D.SUSACODE  = E.SACODE                                )
           WHERE SSMSHCODE = ?                                                       `;
  parm = [req.body[0].SDSHCODE];
  if (req.body[0].SDCODE !== -1) {
    sql = sql + ` AND A.SSMSDCODE = ? `;
    parm.push(req.body[0].SDCODE);
  }
  if (KeyWord !== "") {
    sql =
      sql +
      `    AND (  B.STNAMEKOR    = ?  
    OR LEFT(B.STJUMIN,6) = ?  
    OR B.STTELKEY        = ? ) `;
    parm.push(KeyWord, KeyWord, KeyWord);
  }
  if (req.body[0].Gubun !== "전체" && req.body[0].Gubun !== "") {
    sql = sql + ` AND A.SSMGUBUN = ? `;
    parm.push(req.body[0].Gubun);
  }
  sql = sql + ` ORDER BY B.STNAMEKOR `;

  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      result = {
        ...result,
        ZiwonList: rows
      };

      res.send(result);
      console.log("rows", rows.length);
      console.log("Parm", parm);
      // console.log("SQL", sql);
    } else {
      console.log("Query ERR : ", err);
    }
  });

  con.end();
});

module.exports = router;
