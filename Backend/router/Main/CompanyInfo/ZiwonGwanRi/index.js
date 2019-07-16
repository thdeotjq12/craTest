var express = require("express");
var router = express.Router();
var globalValue = require("../../../../globalValue");
const passport = require("passport");
// ------------------------------------------------- 사업관리 탭
router.post("/getZiwonSearch", async (req, res) => {
  console.log("getZiwonSearch 실행됨");
  var con = await globalValue.connectDB("g00001");
  var result = {};
  var sql = "";
  var parm = [];
  var KeyWord = "%" + req.body[0].KeyWord + "%";
  var STRDate = req.body[0].KeyYear + "-01-01";
  var ENDDate = req.body[0].KeyYear + "-12-31";
  con.connect();
  console.log("BODY", req.body[0]);
  if (req.body[0].SULevel <= 1000) {
    sql = `SELECT A.*, B.*, C1.SUNAME AS SHSUNAME, C2.SUNAME AS SDSUNAME, D.SANAME
             FROM SAUPHEAD A 
             LEFT JOIN SAUPDETAIL  B  ON A.SHCODE   = B.SDSHCODE                    
             LEFT JOIN SYSUSER     C1  ON A.SHSUID  = C1.SUID                      
             LEFT JOIN SYSUSER     C2  ON B.SDSUID  = C2.SUID                      
             LEFT JOIN SUBAGENCY   D  ON B.SDSACODE = D.SACODE  `;

    if (req.body[0].KeyGubun === "추진") {
      sql = sql + " WHERE A.SHNAME LIKE ? ";
      parm.push(KeyWord);
      if (req.body[0].KeyYear !== "전체") {
        sql = sql + "  AND (A.SHSTRDATE >= ? AND A.SHENDDATE <= ?) ";
        parm.push(STRDate, ENDDate);
      }
    } else if (req.body[0].KeyGubun === "세부") {
      sql = sql + " WHERE B.SDNAME LIKE ? ";
      parm.push(KeyWord);
      if (req.body[0].KeyYear !== "전체") {
        sql = sql + " AND (B.SDSTRDATE >= ? AND B.SDENDDATE <= ?)";
        parm.push(STRDate, ENDDate);
      }
    } else {
      // 전체 조회
      sql = sql + ` WHERE (  A.SHNAME LIKE ? OR B.SDNAME LIKE ?) `;
      parm.push(KeyWord, KeyWord);
      if (req.body[0].KeyYear !== "전체") {
        sql =
          sql +
          `  AND (  (A.SHSTRDATE >= ? AND A.SHENDDATE <= ? ) 
              OR (B.SDSTRDATE    >= ? AND B.SDENDDATE <= ? )) `;
        parm.push(STRDate, ENDDate);
        parm.push(STRDate, ENDDate);
      }
    }
    if (req.body[0].SHCODE === "") {
      sql = sql + ` AND A.SHCODE = ?`;
      parm.push(req.body[0].SHCODE);
    }

    // if (req.body[0].KeyYear !== "전체") {
    //   parm.push(STRDate, ENDDate);
    // }
    sql = sql + ` ORDER BY A.SHCODE, A.SHNAME , B.SDNAME`;
    await con.query(sql, parm, (err, rows, fields) => {
      if (!err) {
        result = {
          ...result,
          SAList: rows
        };
        console.log("SQL", sql);
        console.log("PARM", parm);
        console.log("rows", rows.length);
        // console.log("rows", rows);
        res.send(result);
      } else {
        console.log("Query ERR : ", err);
      }
    });
  } else {
    //추진사업담당자 이하 레벨, 본인에게 배정된 사업만 조회할 수 있다.
    sql = ` SELECT A.SUMSHCODE,A.SUMSDCODE                                                                            
                , B1.SHCODE, B1.SHNAME, B1.SHNAMESHORT, B1.SHSTRDATE, B1.SHENDDATE, B1.SHGUBUN, B1.SHMEMO            
                , B2.SDSHCODE, B2.SDCODE, B2.SDNAME, B2.SDSTRDATE, B2.SDENDDATE, B2.SDGUBUN, B2.SDMEMO, B2.SDSACODE  
                , C1.SDSHCODE AS SDSHCODE2, C1.SDCODE AS SDCODE2, C1.SDNAME AS SDNAME2, C1.SDSTRDATE AS SDSTRDATE2   
                , C1.SDENDDATE AS SDENDDATE2, C1.SDGUBUN AS SDGUBUN2, C1.SDMEMO AS SDMEMO2, C1.SDSACODE AS SDSACODE2 
                , C2.SHNAME AS SHNAME2, D.SANAME , E1.SUNAME AS SDSUNAME1 , E2.SUNAME AS SDSUNAME2 FROM SAUPSYSUSER A
            LEFT JOIN SAUPHEAD   B1 ON ( A.SUMSHCODE = B1.SHCODE AND A.SUMSDCODE = -1                                )
            LEFT JOIN SAUPDETAIL B2 ON ( B1.SHCODE   = B2.SDSHCODE                                                   )
            LEFT JOIN SAUPDETAIL C1 ON ( A.SUMSHCODE = C1.SDSHCODE AND A.SUMSDCODE = C1.SDCODE                       )
            LEFT JOIN SAUPHEAD   C2 ON ( C1.SDSHCODE = C2.SHCODE                                                     )
            LEFT JOIN SUBAGENCY  D  ON ( C1.SDSACODE  = D.SACODE                                                     )
            LEFT JOIN SYSUSER    E1  ON ( B1.SHSUID   = E1.SUID                                                      )
            LEFT JOIN SYSUSER    E2  ON ( C1.SDSUID   = E1.SUID                                                      )
            WHERE A.SUMSUID = PDB_ACCT.pdbEnc('normal', ? , '')                                               
            ORDER BY A.SUMSDCODE, B1.SHCODE, B2.SDSHCODE, B2.SDCODE                                                  `;

    parm.push(req.body.SUID);
    await con.query(sql, parm, (err, rows, fields) => {
      if (!err) {
        result = {
          ...result,
          SAList: rows
        };

        res.send(result);
      } else {
        console.log("Query ERR : ", err);
      }
    });
  }

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
