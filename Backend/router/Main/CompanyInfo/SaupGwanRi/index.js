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

// 저장하기
router.post("/BasicInfo_Save", async (req, res) => {
  console.log("---------- backend ");
  var con = globalValue.connectDB("g00001");
  var isSuccess = false;
  con.connect();
  // MainAgency 테이블 기본정보를 조회
  var sql = `UPDATE MAINAGENCY SET                                            
  MADAMDANG     = PDB_ACCT.pdbEnc('normal', ?     , '') ,
  MATEL         = PDB_ACCT.pdbEnc('normal', ?     , '') ,
  MAHP          = PDB_ACCT.pdbEnc('normal', ?     , '') ,
  MAFAX         = PDB_ACCT.pdbEnc('normal', ?     , '') ,
  MANAME        =   ?                                   ,
  MABOSSNAME    =   ?                                   ,
  MASAUPNUM     =   ?                                   ,
  MAJUSO        =   ?                                   ,
  MAHOMEPAGE    =   ?                                   ,
  MAEMAIL       =   ?                                   ,
  MAKOOKMINJISA =   ?                                   ,
  MAKOOKMINTEL  =   ?                                   ,
  MAKOOKMINFAX  =   ?                                   ,
  MAGUNGANGJISA =   ?                                   ,
  MAGUNGANGTEL  =   ?                                   ,
  MAGUNGANGFAX  =   ?                                   ,
  MAGOYONGJISA  =   ?                                   ,
  MAGOYONGTEL   =   ?                                   ,
  MAGOYONGFAX   =   ?                                   ,
  MABIGO        =   ?                                   ,
  MAMEMO        =   ?                                         
 where MACODE   =   ?                                    `;

  var parm = [
    req.body.MADAMDANG,
    req.body.MATEL,
    req.body.MAHP,
    req.body.MAFAX,
    req.body.MANAME,
    req.body.MABOSSNAME,
    req.body.MASAUPNUM,
    req.body.MAJUSO,
    req.body.MAHOMEPAGE,
    req.body.MAEMAIL,
    req.body.MAKOOKMINJISA,
    req.body.MAKOOKMINTEL,
    req.body.MAKOOKMINFAX,
    req.body.MAGUNGANGJISA,
    req.body.MAGUNGANGTEL,
    req.body.MAGUNGANGFAX,
    req.body.MAGOYONGJISA,
    req.body.MAGOYONGTEL,
    req.body.MAGOYONGFAX,
    req.body.MABIGO,
    req.body.MAMEMO,
    req.body.MACODE
  ];

  await con.query(sql, parm, (err, rows, fields) => {
    if (err !== null) {
      res.status(200).send("서버에러 입니다. 관리자에게 문의하세요");
      con.rollback();
      console.log("조회 실패!!!");
    }
  });

  console.log("back", req.body.SALIST.length);
  console.log(req.body.SALIST);
  for (let i = 0; i < req.body.SALIST.length; i++) {
    sql = `UPDATE SUBAGENCY SET                                         
    SADAMDANG   = PDB_ACCT.pdbEnc('normal', ? ,'') ,
    SATEL       = PDB_ACCT.pdbEnc('normal', ? ,'') ,
    SAGUBUN     = ?                                ,
    SANAME      = ?                                ,
    SABOSSNAME  = ?                                ,
    SASAUPNUM   = ?                                ,
    SAEMAIL     = ?                                ,
    SAJUSO      = ?                                ,
    SAMEMO      = ?                                ,
    SADELYN     = ?                                     
    WHERE SACODE= ?                                `;
    parm = [
      req.body.SALIST[i].SADAMDANG,
      req.body.SALIST[i].SATEL,
      req.body.SALIST[i].SAGUBUN,
      req.body.SALIST[i].SANAME,
      req.body.SALIST[i].SABOSSNAME,
      req.body.SALIST[i].SASAUPNUM,
      req.body.SALIST[i].SAEMAIL,
      req.body.SALIST[i].SAJUSO,
      req.body.SALIST[i].SAMEMO,
      "N", // 삭제시엔 Y로 넣기
      req.body.SALIST[i].SACODE
    ];

    con.query(sql, parm, (err, rows, fields) => {
      if (err !== null) {
        res.status(200).send("SEVER ERROR");
        isSuccess = false;

        con.rollback();
        console.log("SUBAGENCY 업데이트 실패!!!", err);
      } else {
        isSuccess = true;
        console.log("SUBAGENCY 업데이트 성공!!!");
      }
    });
  }

  isSuccess ? res.send("OK") : res.send("OK");
  console.log("isSuccess", isSuccess);
  con.end();
});

router.post("/BasicInfo_getDamdang", async (req, res) => {
  var con = globalValue.connectDB("g00001");
  var result = {};
  con.connect();
  // MainAgency 테이블 기본정보를 조회
  // ### 담당자 정보 저장할때 SUID 값이 암호화 되서 올라와서 A.*을 맨 앞으로 옮김.
  var sql = `SELECT A.*,PDB_ACCT.pdbDec("normal", SUID, "", 0) as SUID,  B.SANAME as SANAME FROM SYSUSER A  
   LEFT JOIN SUBAGENCY B on A.SUSACODE = B.SACODE          
   WHERE A.SUSACODE = ?                       `;

  var parm = req.body;
  console.log(" Print res.body", req.body);
  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      result = {
        ...result,

        BaicInfo_Damdang: rows
      };
      res.send(result);
      console.log("result", result);
    } else {
      console.log("query error : " + err);
      res.send("NoData");
    }
  });

  con.end();
});

router.post("/BasicInfo_getDamdang_findUser", async (req, res) => {
  var con = globalValue.connectDB("g00001");
  var result = {};
  con.connect();
  // MainAgency 테이블 기본정보를 조회
  var sql = `SELECT  PDB_ACCT.pdbDec('normal', SUID , '', 0) AS SUID       
  , PDB_ACCT.pdbDec('normal', SUPW , '', 0) AS SUPW       
  , PDB_ACCT.pdbDec('normal', SUTEL, '', 0) AS SUTEL      
  , A.SUNAME    , A.SULEVEL, A.SUINDAY , A.SUOUTDAY, A.SUBUSEO
  , A.SUJIKCHECK, A.SUEMAIL, A.SUSACODE, A.SUNAME  , B.SANAME 
                                                FROM SYSUSER A
    LEFT JOIN SUBAGENCY B ON A.SUSACODE = B.SACODE                  
    WHERE A.SULEVEL >= 1000                                          
    AND A.SUUSEYN = 'Y' `;
  console.log("findUser parm", req.body);
  var setParm = req.body;
  var parm = [];

  if (setParm.findUer !== "") {
    sql =
      sql +
      ` AND (  A.SUNAME     = ?
         OR    A.SUID       = ?
         OR    A.SUTELKEY   LIKE ? ) `;

    parm = [setParm.findUer, setParm.findUer, setParm.findUer];

    // console.log(
    //   " 파람 넘어옴 !!! ",
    //   "(1)" + req.body,
    //   "(2)" + parm["findUer"],
    //   "(3)" + parm.findUer,
    //   "(4)" + parm[0].findUer,
    //   "(5)" + JSON.stringify(parm),
    //   "(6)" + JSON.parse(parm[0].findUer)
    // );
  }
  console.log(" _findUser res.body", setParm.findUer);
  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      result = {
        ...result,
        BaicInfo_findDamdang: rows
      };
      res.send(result);
      console.log(" findUser result", result);
    } else {
      console.log("query error : " + err);
      res.send("NoData");
    }
  });

  con.end();
});

// 담당자 정보 저장
router.post("/BasicInfo_getDamdang_Save", async (req, res) => {
  var con = globalValue.connectDB("g00001");
  var isSuccess = false;
  con.connect();
  // MainAgency 테이블 기본정보를 조회
  var sql = `UPDATE SYSUSER SET                                   
  SUSACODE = ?                             
  WHERE SUID = PDB_ACCT.pdbEnc('normal', ?, '') `;
  var parm = [];

  for (let i = 0; i < req.body.Damdang.length; i++) {
    console.log("N", req.body.Damdang[i].N);
    console.log("req.body.", req.body);
    if (req.body.Damdang[i].N === "N") {
      parm = [req.body.SACODE, req.body.Damdang[i].SUID];
      sql = `UPDATE SYSUSER SET                                   
      SUSACODE = ?                             
      WHERE SUID = PDB_ACCT.pdbEnc('normal', ?, '') `;
      console.log("업데이트실행됨: ");
    } else if (req.body.Damdang[i].N === "D") {
      parm = [req.body.Damdang[i].SUID];
      sql = `UPDATE SYSUSER SET                                   
      SUSACODE = ''                             
      WHERE SUID = PDB_ACCT.pdbEnc('normal', ?, '') `;
      console.log("삭제실행됨: ");
    } else {
      parm = [req.body.SACODE, req.body.Damdang[i].SUID];
      console.log("아무것도 안됨: ");
    }
    // console.log("req.body.", req.body);
    await con.query(sql, parm, (err, rows, fields) => {
      if (err !== null) {
        isSuccess = false;
        console.log("담당자 정보 저장 에러: ", err);
      } else {
        isSuccess = true;
      }
    });
  }
  console.log(" req.body.length ", req.body.Damdang.length);
  isSuccess ? res.send("OK") : res.send("NoData");

  con.end();
});

module.exports = router;
