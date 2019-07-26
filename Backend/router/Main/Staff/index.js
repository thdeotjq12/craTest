var express = require("express");
var router = express.Router();
var globalValue = require("../../../globalValue");
const passport = require("passport");

router.post("/getSaupHead", async (req, res) => {
  var con = await globalValue.connectDB("g00001");
  var result = {};
  var sql = "";
  var parm = [];

  var STRDate = req.body.KeyYear + "-01-01";
  var ENDDate = req.body.KeyYear + "-12-31";
  con.connect();

  sql = ` SELECT SHCODE, SHNAME FROM SAUPHEAD
           WHERE SHSTRDATE >= ?   
             AND SHSTRDATE <= ?
             AND SHDELYN   <> 'Y'          
           ORDER BY SHCODE,SHNAME             `;
  parm = [STRDate, ENDDate];

  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      if (req.body.Mode !== "") {
        rows.unshift({ SHCode: req.body.Mode }); // 맨 앞에 추가
      }
      result = {
        ...result,
        SaupHeadList: rows
      };

      console.log("SaupHead rows", rows.length);
      // console.log("rows", rows);
      res.send(result);
    } else {
      console.log("Query ERR : ", err);
    }
  });

  con.end();
});

router.post("/getSaupDetail", async (req, res) => {
  var con = await globalValue.connectDB("g00001");
  var result = {};
  var sql = "";
  var parm = [];

  var STRDate = req.body.KeyYear + "-01-01";
  var ENDDate = req.body.KeyYear + "-12-31";
  con.connect();

  sql = ` SELECT SDSHCODE, SDCODE, SDNAME FROM SAUPDETAIL       
           WHERE SDSTRDATE >= ? AND SDSTRDATE <= ?
             AND SDDELYN <> 'Y'                          `;
  parm = [STRDate, ENDDate];
  if (req.body.SHCode !== "전체") {
    sql = sql + `AND SDSHCODE = ? `;
    parm.push(req.body.SHCode);
  }
  sql = sql + `  ORDER BY SDSHCODE, SDCODE, SDNAME                   `;

  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      if (req.body.Mode !== "") {
        rows.unshift(req.body.Mode); // 맨 앞에 추가
      }
      result = {
        ...result,
        SaupDetailList: rows
      };

      console.log("rows", rows.length);
      // console.log("rows", rows);
      res.send(result);
    } else {
      console.log("Query ERR : ", err);
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
