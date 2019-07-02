var express = require("express");
var router = express.Router();
var globalValue = require("../../../../globalValue");
const passport = require("passport");
// ------------------------------------------------- 기관정보 탭
router.post("/BasicInfo", async (req, res) => {
  var con = globalValue.connectDB("g00001");
  var result = {};
  con.connect();
  // MainAgency 테이블 기본정보를 조회
  var sql =
    "SELECT PDB_ACCT.pdbDec('normal', MADAMDANG, '', 0) AS MADAMDANG                    " +
    "     , PDB_ACCT.pdbDec('normal', MATEL    , '', 0) AS MATEL                        " +
    "     , PDB_ACCT.pdbDec('normal', MAHP     , '', 0) AS MAHP                         " +
    "     , PDB_ACCT.pdbDec('normal', MAFAX    , '', 0) AS MAFAX                        " +
    "     , MACODE        , MANAME       , MABOSSNAME    , MASAUPNUM    , MAJUSO        " +
    "     , MAHOMEPAGE    , MAEMAIL      , MAKOOKMINJISA , MAKOOKMINTEL , MAKOOKMINFAX  " +
    "     , MAGUNGANGJISA , MAGUNGANGTEL , MAGUNGANGFAX  , MAGOYONGJISA , MAGOYONGTEL   " +
    "     , MAGOYONGFAX   , MABIGO       , MAMEMO                        FROM MAINAGENCY";

  var parm = "";
  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      //   if(
      result = {
        ...result,
        BaicInfo_Data: rows
      };
    }
  });
  sql =
    " SELECT PDB_ACCT.PDBDEC('normal', SADAMDANG, '', 0) AS SADAMDANG " +
    "      , PDB_ACCT.PDBDEC('normal', SATEL    , '', 0) AS SATEL    " +
    "      , SACODE , SANAME , SABOSSNAME, SASAUPNUM                 " +
    "      , SAEMAIL, SAJUSO , SAGUBUN   , SAMEMO   FROM SUBAGENCY " +
    " WHERE  SADELYN = 'N'  " +
    " ORDER  BY SACODE      ";

  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      //   if(
      result = {
        ...result,
        BaicInfoSaup_Data: rows
      };

      res.send(result);
    } else {
      console.log("query error : " + err);
      res.send("NoData");
    }
    con.end();
  });
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
  var sql = `  SELECT PDB_ACCT.pdbDec("normal", SUID, "", 0) as SUID2, A.*, B.SANAME as SANAME FROM SYSUSER A  
   LEFT JOIN SUBAGENCY B on A.SUSACODE = B.SACODE          
   WHERE A.SUSACODE = "?"                       `;

  var parm = [req.body];
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

module.exports = router;
