var express = require("express");
var router = express.Router();
var globalValue = require("../../../globalValue");
const passport = require("passport");

router.post("/CleanComeCheckTot", async (req, res) => {
  console.log("CleanComeCheckTot");
  var con = await globalValue.connectDB("g00001");
  var result = {};
  var sql = "";
  var parm = [];
  var moment = require("moment");
  var FirstDate = req.body.Year + "-" + req.body.Month + "-01";
  var ENDDate =
    req.body.Year +
    "-" +
    req.body.Month +
    "-" +
    moment(FirstDate)
      .endOf("month")
      .format("DD");
  var CTSTCode = [];
  var CTSHCode = [];
  var CTSDCode = [];
  con.connect();

  sql = ` SELECT CTSTCODE, CTSHCODE, CTSDCODE FROM COMECHECKTOT A            
          LEFT JOIN SAUPSTAFF B ON (A.CTSTCODE = B.SSMSTCODE            
                                AND A.CTSHCODE = B.SSMSHCODE            
                                AND A.CTSDCODE = B.SSMSDCODE)           
           WHERE A.CTYEARMONTH = ?                                    
             AND NOT (( B.SSMSTRDATE <= ? AND B.SSMENDDATE >= ?) 
                 OR   ( B.SSMSTRDATE <= ? AND B.SSMENDDATE >= ?))      `;
  parm = [FirstDate, FirstDate, FirstDate, ENDDate, ENDDate];

  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      if (rows) {
        for (let i = 0; i < rows.length; i++) {
          CTSTCode.push(rows[i].CTSTCODE);
          CTSHCode.push(rows[i].CTSHCODE);
          CTSDCODE.push(rows[i].CTSDCODE);
        }
      }
    } else {
      console.log("Query ERR : ", err);
    }
  });
  if (CTSTCode.length === 0) {
    console.log("CTSTCode 가 존재하지 않음");
    // await globalValue.PromiseQuery(con, sql, parm);
    con.end();
    return;
  } else {
    sql = ` DELETE FROM COMECHECKTOT
            WHERE               `;
    for (let i = 0; i < CTSTCode.length; i++) {
      if (i > 0) {
        sql = sql + ` OR `;
      }
      sql =
        sql +
        `(  CTSTCode    =  ?                          
        and CTSHCode    =  ?
        and CTSDCode    =  ?
        and CTYearMonth =  ?)   `;
      parm.push([CTSTCode[i], CTSHCode[i], CTSDCode[i], FirstDate]);
      console.log("CTSTCode 가 존재함", rows);
    }

    await con.query(sql, parm, (err, rows, fields) => {
      if (!err) {
        console.log("CleanComeCheckTot 성공");
      } else {
        console.log("Query ERR : ", err);
      }
    });
  }

  con.end();
});

router.post("/ShowCCList_admin", async (req, res) => {
  console.log("ShowCCList_admin 실행됨");
  var con = await globalValue.connectDB("g00001");
  var result = {};
  var sql = "";
  var parm = [];
  var moment = require("moment");
  var KeyWord = req.body.KeyWord;
  var SaupHeadKeyWord = req.body.SHKeyWord;
  var SaupDetailKeyWord = req.body.SDKeyWord;
  var SHCode = req.body.SHCode;
  var GetSDCode = req.body.Codes;
  var SUID = req.body.SUID;
  var STRDate = req.body.Year + "-" + req.body.Month + "-01";
  var ENDDate =
    req.body.Year +
    "-" +
    req.body.Month +
    "-" +
    moment(STRDate)
      .endOf("month")
      .format("DD");
  con.connect();

  sql = `SELECT PDB_ACCT.pdbDec('pattern7', E.STJUMIN, '', 0) AS STJUMIN    
              , E.STNAMEKOR, A.*, B.*, C.SHNAMESHORT, D.SDSHCODE, D.SDCODE      
              , D.SDNAME, F.SHSTCODE                           FROM SAUPSTAFF A 
           LEFT JOIN COMECHECKTOT  B ON (    A.SSMSTCODE = B.CTSTCODE           
                                        AND  A.SSMSHCODE = B.CTSHCODE           
                                        AND  A.SSMSDCODE = B.CTSDCODE           
                                        AND  B.CTYEARMONTH = ?          )
           LEFT JOIN SAUPHEAD      C ON      A.SSMSHCODE = C.SHCODE             
           LEFT JOIN SAUPDETAIL    D ON (    A.SSMSHCODE = D.SDSHCODE           
                                         AND A.SSMSDCODE = D.SDCODE            )
           LEFT JOIN STAFF         E ON      A.SSMSTCODE = E.STCODE             
           LEFT JOIN STAFFHUEJIK   F ON (    A.SSMSTCODE = F.SHSTCODE           
                                         AND ((    F.SHSTRDATE <= ?   
                                               AND F.SHENDDATE >= ?)  
                                           OR (    F.SHSTRDATE <= ?   
                                               AND F.SHENDDATE >= ?)))
           LEFT JOIN SAUPSYSUSER   G ON (    A.SSMSHCODE = G.SUMSHCODE          
                                         AND A.SSMSDCODE = G.SUMSDCODE          
                                         AND G.SUMSUID   = PDB_ACCT.pdbEnc('normal', ?, ''))
          WHERE (  (A.SSMSTRDATE <= ? AND A.SSMENDDATE >= ?    ) 
                OR (A.SSMSTRDATE <= ? AND A.SSMENDDATE >= ?   ))
          AND A.SSMSDCODE <> -1                                               
          AND A.SSMGUBUN IN('1','3','4','5')                                                 `;
  parm = [
    STRDate,
    STRDate,
    STRDate,
    ENDDate,
    ENDDate,
    SUID,
    STRDate,
    STRDate,
    ENDDate,
    ENDDate
  ];
  if (KeyWord) {
    sql =
      sql +
      ` AND (  E.STNAMEKOR    = ?    
         OR LEFT(E.STJUMIN,6) = ?    
         OR E.STTELKEY        = ?  ) `;
    parm.push(KeyWord, KeyWord, KeyWord);
  }
  if (SaupHeadKeyWord !== "전체") {
    sql = sql + `AND SDSHCODE = ? `;
    parm.push(SHCode);
  }
  if (SaupDetailKeyWord !== "전체") {
    if (GetSDCode) {
      sql =
        sql +
        ` AND A.SSMSHCODE = ?
          AND A.SSMSDCODE = ? `;
      parm.push(GetSDCode[0], GetSDCode[1]);
    }
  }

  sql = sql + ` ORDER BY D.SDSHCODE, D.SDCODE, E.STNAMEKOR   `;

  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      result = {
        ...result,
        SaupDetailList: rows
      };

      console.log("parm", parm);

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
