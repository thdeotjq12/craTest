var express = require("express");
var router = express.Router();
var globalValue = require("../../../../globalValue");
const passport = require("passport");
// ------------------------------------------------- 사업관리 탭
router.post("/getZiwonGwanRi", async (req, res) => {
  console.log("getZiwonGwanRi 실행됨");
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

router.post("/getSeabuSaupGwanRi", async (req, res) => {
  var con = await globalValue.connectDB("g00001");
  var result = {};
  var sql = "";
  var parm = [];
  var LikeKey = "%" + req.body.Key + "%";

  con.connect();
  if (req.body.SULevel <= 1000) {
    sql = `SELECT PDB_ACCT.pdbDec('normal', C1.SUID, '', 0) as SUID    
                , A.SDSHCODE      , A.SDCODE   , A.SDNAME   , B.SHNAMESHORT
                , A.SDMOZIPENDDATE, A.SDSTRDATE, A.SDENDDATE, C2.SACODE    
                , C2.SANAME       , C1.SUNAME  , A.SDGUBUN    
                , A.SDMEMO        , D.WSSHCODE , COUNT(E.SSMSTCODE) AS CNT 
                                                            FROM SAUPDETAIL A  
           LEFT JOIN SAUPHEAD     B ON     A.SDSHCODE =  B.SHCODE        
           LEFT JOIN SYSUSER     C1 ON     A.SDSUID   = C1.SUID          
           LEFT JOIN SUBAGENCY   C2 ON    C1.SUSACODE = C2.SACODE        
           LEFT JOIN WORKINFOSAUP D ON (   A.SDSHCODE =  D.WSSHCODE      
                                       AND A.SDCODE   =  D.WSSDCODE     )
           LEFT JOIN SAUPSTAFF    E ON (   A.SDSHCODE =  E.SSMSHCODE     
                                       AND A.SDCODE   =  E.SSMSDCODE     
                                       AND (  E.SSMGUBUN = '1'         
                                           OR E.SSMGUBUN = '4'         
                                           OR E.SSMGUBUN = '5')       )
          WHERE A.SDSTRDATE >= ?                                  
            AND A.SDSTRDATE <= ?                                  
            AND B.SHDELYN   <> 'Y'                                     
            AND A.SDDELYN   <> 'Y'                                   `;
    parm = [req.body.STRDATE, req.body.ENDDATE];
    if (req.body.SaupHeadCode) {
      sql = sql + `and A.SDSHCODE = ? `;
      parm.push(req.body.SaupHeadCode);
    }
    if (req.body.Key) {
      sql = sql + `and  SDName like ? `;

      parm.push(LikeKey);
    }
    sql =
      sql +
      `GROUP BY A.SDSHCODE      , A.SDCODE   , A.SDNAME   , B.SHNAMESHORT
              , A.SDMOZIPENDDATE, A.SDSTRDATE, A.SDENDDATE, C2.SACODE    
              , C2.SANAME       , C1.SUID    , C1.SUNAME  , A.SDGUBUN    
              , A.SDMEMO        , D.WSSHCODE                             
       ORDER BY A.SDSHCODE, A.SDCODE                                          `;
  } else {
    sql = ` SELECT PDB_ACCT.pdbDec('normal', C1.SUID, '', 0) as SUID    
                 , A.SDSHCODE      , A.SDCODE   , A.SDNAME   , B.SHNAMESHORT
                 , A.SDMOZIPENDDATE, A.SDSTRDATE, A.SDENDDATE, C2.SACODE    
                 , C2.SANAME       , C1.SUNAME  , A.SDGUBUN                 
                 , A.SDMEMO        , D.WSSHCODE , COUNT(E.SSMSTCODE) AS CNT 
                                                         FROM SAUPDETAIL A  
              LEFT JOIN SAUPHEAD     B ON     A.SDSHCODE =  B.SHCODE        
              LEFT JOIN SYSUSER     C1 ON     A.SDSUID   = C1.SUID          
              LEFT JOIN SUBAGENCY   C2 ON    C1.SUSACODE = C2.SACODE        
              LEFT JOIN WORKINFOSAUP D ON (   A.SDSHCODE =  D.WSSHCODE      
                                          AND A.SDCODE   =  D.WSSDCODE     )
              LEFT JOIN SAUPSTAFF    E ON (   A.SDSHCODE =  E.SSMSHCODE     
                                          AND A.SDCODE   =  E.SSMSDCODE     
                                          AND (  E.SSMGUBUN = '1'         
                                              OR E.SSMGUBUN = '4'         
                                              OR E.SSMGUBUN = '5')       )
              LEFT JOIN SAUPSYSUSER  F ON (   A.SDSHCODE = F.SUMSHCODE      
                                          AND A.SDCODE   = F.SUMSDCODE     )
             WHERE A.SDSTRDATE >= ?                                 
               AND A.SDSTRDATE <= ?                               
               and f.SUMSUID    = PDB_ACCT.pdbEnc('normal', ?, '')  
               AND B.SHDELYN   <> 'Y'                                     
               AND A.SDDELYN   <> 'Y'                                     
`;
    parm = [req.body.STRDATE, req.body.ENDDATE, req.body.SUID];
    if (req.body.SaupHeadCode) {
      sql = sql + `and A.SDSHCODE = ? `;
      parm.push(req.body.SaupHeadCode);
    }
    if (req.body.Key) {
      sql = sql + `and  SDName like ? `;
      parm.push(LikeKey);
    }
    sql =
      sql +
      `GROUP BY A.SDSHCODE      , A.SDCODE   , A.SDNAME   , B.SHNAMESHORT
              , A.SDMOZIPENDDATE, A.SDSTRDATE, A.SDENDDATE, C2.SACODE    
              , C2.SANAME       , C1.SUID    , C1.SUNAME  , A.SDGUBUN    
              , A.SDMEMO        , D.WSSHCODE                             
       ORDER BY A.SDSHCODE, A.SDCODE  `;
  }

  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      result = {
        ...result,
        SeabuSaupGwanRi_Data: rows
      };

      res.send(result);
      // console.log(result);
    } else {
      console.log("Query ERR : ", err);
    }
  });

  con.end();
});

const GetSysCode_Child = async con => {
  var moment = require("moment");
  var Today = moment().format("YYYY-MM");
  var sql = `SELECT * FROM SYSCODE   
         WHERE SCDATE = ?   `;
  var parm = [Today];

  var result = await globalValue.PromiseQuery(con, sql, parm);
  console.log("SCCODE", result[0].SCCODE);
  return result[0].SCCODE;
};

const GetSysCode = async (
  con,
  res,
  TableName,
  CodeName,
  GroupFieldName,
  GroupValue,
  Disit
) => {
  var sql = "";
  var parm = [];
  var Code = "";
  var iCode = "";
  var HexCode_2 = "";
  // 숫자, 크기를 넣으면 크기만큼 숫자앞에 0을 채워줌
  function pad(n, width) {
    n = n + "";
    return n.length >= width
      ? n
      : new Array(width - n.length + 1).join("0") + n;
  }
  Code = await GetSysCode_Child(con);
  sql =
    `SELECT MAX(` +
    CodeName +
    `) AS MAXCODE FROM ` +
    TableName +
    `
         WHERE ` +
    CodeName +
    ` LIKE '` +
    Code +
    `%'`;
  if (GroupFieldName) {
    sql = sql + ` AND ` + GroupFieldName + `= ? `;
    parm = [GroupValue];
  }
  var result = await globalValue.PromiseQuery(con, sql, parm);
  if (result.MAXCODE === null) {
    iCode = 0;
  } else {
    HexCode = "" + result[0].MAXCODE;
    console.log("Code", Code);
    console.log("Hex", HexCode);
    HexCode_2 = HexCode.substr(2, HexCode.length);
    console.log("Hex substr", HexCode);
    iCode = parseInt(HexCode_2, 16) + 1;
    iCode = iCode.toString(16);
    iCode = pad(iCode.toUpperCase(), Disit - 2);
    console.log("iCode", iCode);
  }
  HexCode = HexCode.substr(0, 2) + String(iCode);
  console.log("HexCode + String(iCode)", HexCode);
  Code = HexCode;

  // con.end();
  console.log("(1)Code", Code);
  return Code;
};

const SaveSaup = async (con, req, SHCODE) => {
  for (let i = 0; i < req.body.SaupList.length; i++) {
    // 신규저장
    if (req.body.SaupList[i].N === "N") {
      var sql = `INSERT INTO SAUPHEAD( SHSUID                                       
                                 , SHCODE   ,  SHGUBUN  ,  SHNAME,  SHNAMESHORT 
                                 , SHSTRDATE,  SHENDDATE,  SHMEMO,  SHDELYN    )
                           VALUES(PDB_ACCT.pdbEnc('normal', ? , '')    
                                 ,?, ?, ?, ?, ?, ?, ? ,? ) `;
      if (req.body.SaupList[i].SHSTRDATE === "Invalid date") {
        req.body.SaupList[i].SHSTRDATE = "1899-12-30";
      }
      if (req.body.SaupList[i].SHENDDATE === "Invalid date") {
        req.body.SaupList[i].SHENDDATE = "1899-12-30";
      }

      console.log(req.body.SaupList[i].SHSTRDATE);
      var parm = [
        req.body.SaupList[i].SHSUID,
        SHCODE,
        req.body.SaupList[i].SHGUBUN,
        req.body.SaupList[i].SHNAME,
        req.body.SaupList[i].SHNAMESHORT,
        req.body.SaupList[i].SHSTRDATE,
        req.body.SaupList[i].SHENDDATE,
        req.body.SaupList[i].SHMEMO,
        "N"
      ];
      await globalValue.PromiseQuery(con, sql, parm);
      console.log("인서트 실행됨");
    } else if (req.body.SaupList[i].N === "U") {
      sql = ` UPDATE SAUPHEAD SET                                        
      SHSUID       = PDB_ACCT.pdbEnc('normal', ?, ''    ),
      SHGUBUN      = ?                                   ,
      SHNAME       = ?                                   ,
      SHNAMESHORT  = ?                                   ,
      SHSTRDATE    = ?                                   ,
      SHENDDATE    = ?                                   ,
      SHMEMO       = ?                                   ,
      SHDELYN      = ?                                   
     WHERE SHCODE  = ?                                    `;
      if (req.body.SaupList[i].SHSTRDATE === "Invalid date") {
        req.body.SaupList[i].SHSTRDATE = "1899-12-30";
      }
      if (req.body.SaupList[i].SHENDDATE === "Invalid date") {
        req.body.SaupList[i].SHENDDATE = "1899-12-30";
      }
      parm = [
        req.body.SaupList[i].SHSUID,
        req.body.SaupList[i].SHCODE,
        req.body.SaupList[i].SHGUBUN,
        req.body.SaupList[i].SHNAME,
        req.body.SaupList[i].SHNAMESHORT,
        req.body.SaupList[i].SHSTRDATE,
        req.body.SaupList[i].SHENDDATE,

        req.body.SaupList[i].SHMEMO,
        "N"
      ];
      await globalValue.PromiseQuery(con, sql, parm);
      console.log("업데이트 실행됨");
    } else if (req.body.SaupList[i].N === "D") {
      sql = `UPDATE SAUPHEAD SET      
              SHDELYN    = ?   
             WHERE SHCODE= ?  `;
      parm = ["Y", SHCODE];
      await globalValue.PromiseQuery(con, sql, parm);
    }
  }
  console.log("(2)Saup 실행됨");
};
router.post("/getSaupGwanRi_Save", async (req, res) => {
  console.log("getSaupGwanRi_Save 실행됨");
  console.log("저장 리스트", req.body.SaupList[0].N);
  var con = await globalValue.connectDB("g00001");
  var isSuccess = false;
  var sql = "";
  var parm = [];
  var SHCODE = "";

  // 추진사업 저장
  try {
    var result = await GetSysCode(con, res, "SaupHead", "SHCode", "", "", 4);
    await SaveSaup(con, req, result); // 업뎃.인서트,딜리트
    isSuccess = true;
  } catch (err) {
    console.log("추진사업 저장 실패 err ", err);
  }

  isSuccess ? res.send("OK") : res.send("Fail");
  console.log("isSuccess", isSuccess);
  con.end();
});

module.exports = router;
