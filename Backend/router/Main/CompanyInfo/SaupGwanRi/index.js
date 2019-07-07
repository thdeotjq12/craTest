var express = require("express");
var router = express.Router();
var globalValue = require("../../../../globalValue");
const passport = require("passport");
// ------------------------------------------------- 사업관리 탭
router.post("/getSaupGwanRi", async (req, res) => {
  console.log("TTTTTTTTTTTTTTTTTTTTT");
  var con = globalValue.connectDB("g00001");
  var result = {};
  var sql = "";
  var parm = [];
  console.log(req.body);
  con.connect();
  if (req.body.SULevel <= 1000) {
    sql = `SELECT PDB_ACCT.pdbDec('normal', B.SUTEL, '', 0) as SUTEL
                , A.SHCODE   , A.SHGUBUN  , A.SHNAME, A.SHNAMESHORT     
                , A.SHSTRDATE, A.SHENDDATE, A.SHSUID, B.SUNAME          
                , B.SUEMAIL  , A.SHMEMO                  FROM SAUPHEAD A
          LEFT JOIN SYSUSER     B ON A.SHSUID  = B.SUID              
          WHERE SHSTRDATE >= ?                                 
          AND SHSTRDATE <= ?                                 
          AND SHDELYN   <> 'Y'     `;
    parm = [req.body.STRDATE, req.body.ENDDATE];
    if (req.body.Key) {
      sql = sql + `and  SHName like ? `;
      parm = [req.body.STRDATE, req.body.ENDDATE, req.body.Key];
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
      parm = [req.body.STRDATE, req.body.ENDDATE, req.body.SUID, req.body.Key];
      sql = sql + `order by SHCode`;
    }
  }
  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      result = {
        ...result,
        SaupGwanRi_Data: rows
      };
      console.log(result);
      res.send(result);
    } else {
      console.log("Query ERR : ", err);
    }
  });

  con.end();
});

router.post("/getSeabuSaupGwanRi", async (req, res) => {
  console.log("GGGGGGGGGGGGGGGGGGGG");
  var con = globalValue.connectDB("g00001");
  var result = {};
  var sql = "";
  var parm = [];
  console.log(req.body);
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
      parm = [req.body.STRDATE, req.body.ENDDATE, req.body.SaupHeadCode];
    }
    if (req.body.Key) {
      sql = sql + `and  SHName like ? `;
      parm = [req.body.STRDATE, req.body.ENDDATE, req.body.Key];
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
      parm = [req.body.STRDATE, req.body.ENDDATE, req.body.SaupHeadCode];
    }
    if (req.body.Key) {
      sql = sql + `and  SHName like ? `;
      parm = [req.body.STRDATE, req.body.ENDDATE, req.body.SUID, req.body.Key];
    }
    sql =
      sql +
      `GROUP BY A.SDSHCODE      , A.SDCODE   , A.SDNAME   , B.SHNAMESHORT
              , A.SDMOZIPENDDATE, A.SDSTRDATE, A.SDENDDATE, C2.SACODE    
              , C2.SANAME       , C1.SUID    , C1.SUNAME  , A.SDGUBUN    
              , A.SDMEMO        , D.WSSHCODE                             
       ORDER BY A.SDSHCODE, A.SDCODE') `;
  }
  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      result = {
        ...result,
        SeabuSaupGwanRi_Data: rows
      };
      console.log(result);
      res.send(result);
    } else {
      console.log("Query ERR : ", err);
    }
  });

  con.end();
});

module.exports = router;
