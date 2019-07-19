var express = require("express");
var router = express.Router();
var globalValue = require("../../../../globalValue");
const passport = require("passport");
// ------------------------------------------------- 사업관리 탭
router.post("/getSaupGwanRi", async (req, res) => {
  console.log("getSaupGwanRi 실행됨");
  var con = await globalValue.connectDB("g00001");
  var result = {};
  var sql = "";
  var parm = [];
  var LikeKey = "%" + req.body.Key + "%";

  con.connect();

  if (req.body.SULevel <= 1000) {
    sql = `SELECT PDB_ACCT.pdbDec('normal', B.SUTEL, '', 0) as SUTEL
                , A.SHCODE   , A.SHGUBUN  , A.SHNAME, A.SHNAMESHORT     
                , A.SHSTRDATE, A.SHENDDATE, A.SHSUID, B.SUNAME          
                , B.SUEMAIL  , A.SHMEMO                  FROM SAUPHEAD A
           LEFT JOIN SYSUSER     B ON A.SHSUID  = B.SUID              
           WHERE SHSTRDATE >= ?                                 
           AND   SHSTRDATE <= ?                                 
           AND   SHDELYN   <> 'Y'     `;
    parm = [req.body.STRDATE, req.body.ENDDATE];
    if (req.body.Key) {
      sql = sql + `and  SHName like ? `;
      parm.push(LikeKey);
    }
    sql = sql + `order by SHCode`;
  } else {
    sql = ` SELECT PDB_ACCT.pdbDec('normal', B.SUTEL, '', 0) as SUTEL 
                  , A.SHCODE   , A.SHGUBUN  , A.SHNAME, A.SHNAMESHORT      
                  , A.SHSTRDATE, A.SHENDDATE, A.SHSUID, B.SUNAME           
                  , B.SUEMAIL  , A.SHMEMO                   FROM SAUPHEAD A
               LEFT JOIN SYSUSER     B ON   A.SHSUID  = B.SUID             
               LEFT JOIN SAUPSYSUSER C ON ( A.SHCODE = C.SUMSHCODE        )
              WHERE A.SHSTRDATE >= ?                              
                AND A.SHSTRDATE <= ?                                
                AND C.SUMSUID    = PDB_ACCT.pdbEnc('normal', ?, '')
                AND A.SHDELYN   <> 'Y'                                  
              GROUP BY A.SHCODE, A.SHGUBUN  , A.SHNAME, A.SHNAMESHORT      
                     , A.SHSTRDATE, A.SHENDDATE, A.SHSUID, B.SUNAME        
                     , B.SUTEL    , B.SUEMAIL  , A.SHMEMO                `;
    parm = [req.body.STRDATE, req.body.ENDDATE, req.body.SUID];
    if (req.body.Key) {
      sql = sql + `and  SHName like ? `;
      parm.push(LikeKey);
      sql = sql + `order by SHCode`;
    }
  }

  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      result = {
        ...result,
        SaupGwanRi_Data: rows
      };
      console.log("추진사업 검색 행 수 ", rows.length);
      res.send(result);
    } else {
      console.log("Query ERR : ", err);
    }
  });

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

const GetSysCode = async (
  con,
  TableName,
  CodeName,
  GroupFieldName,
  GroupValue,
  DataYear,
  Disit
) => {
  var moment = require("moment");
  var sql = "";
  var parm = [];
  var Code = "";
  var iCode = "";
  var HexCode_2 = "";
  var Today = moment(DataYear).format("YYYY-MM");
  var ResultCode = "";
  // 숫자, 크기를 넣으면 크기만큼 숫자앞에 0을 채워줌
  function pad(n, width) {
    n = n + "";
    return n.length >= width
      ? n
      : new Array(width - n.length + 1).join("0") + n;
  }
  sql = `SELECT * FROM SYSCODE   
  WHERE SCDATE = ?   `;
  parm = [Today];
  ResultCode = await globalValue.PromiseQuery(con, sql, parm);
  Code = ResultCode[0].SCCODE;
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
  if (result[0].MAXCODE === null) {
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

const SaveSaup = async (con, req) => {
  var parm = [];
  var SHCODE = "";
  var sql = "";
  for (let i = 0; i < req.body.SaupList.length; i++) {
    // 신규저장
    if (req.body.SaupList[i].N === "N") {
      SHCODE = await GetSysCode(
        con,
        "SaupHead",
        "SHCode",
        "",
        "",
        new Date(),
        4
      );
      sql = `INSERT INTO SAUPHEAD( SHSUID                                       
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
      parm = [
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
      console.log("인서트 실행됨", i, req.body.SaupList[i]);
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
        req.body.SaupList[i].SHGUBUN,
        req.body.SaupList[i].SHNAME,
        req.body.SaupList[i].SHNAMESHORT,
        req.body.SaupList[i].SHSTRDATE,
        req.body.SaupList[i].SHENDDATE,
        req.body.SaupList[i].SHMEMO,
        "N",
        req.body.SaupList[i].SHCODE
      ];
      await globalValue.PromiseQuery(con, sql, parm);
      console.log("업데이트 실행됨", i);
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
  var con = await globalValue.connectDB("g00001");
  var isSuccess = false;

  // 추진사업 저장
  try {
    await SaveSaup(con, req); // 업뎃.인서트,딜리트
    isSuccess = true;
    console.log("추진사업 저장 성공 ");
  } catch (err) {
    console.log("추진사업 저장 실패 err ", err);
  }

  isSuccess ? res.send("OK") : res.send("Fail");
  console.log("isSuccess", isSuccess);
  con.end();
});

module.exports = router;
