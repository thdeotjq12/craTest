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
        // MACODE: rows[0].MACODE,
        // MANAME: rows[0].MANAME,
        // MABOSSNAME: rows[0].MABOSSNAME,
        // MASAUPNUM: rows[0].MASAUPNUM,
        // MAJUSO: rows[0].MAJUSO,
        // MAHOMEPAGE: rows[0].MAHOMEPAGE,
        // MADAMDANG: rows[0].MADAMDANG,
        // MAEMAIL: rows[0].MAEMAIL,
        // MATEL: rows[0].MATEL,
        // MAHP: rows[0].MAHP,
        // MAFAX: rows[0].MAFAX,
        // MAKOOKMINJISA: rows[0].MAKOOKMINJISA,
        // MAKOOKMINTEL: rows[0].MAKOOKMINTEL,
        // MAKOOKMINFAX: rows[0].MAKOOKMINFAX,
        // MAGUNGANGJISA: rows[0].MAGUNGANGJISA,
        // MAGUNGANGTEL: rows[0].MAGUNGANGTEL,
        // MAGUNGANGFAX: rows[0].MAGUNGANGFAX,
        // MAGOYONGJISA: rows[0].MAGOYONGJISA,
        // MAGOYONGTEL: rows[0].MAGOYONGTEL,
        // MAGOYONGFAX: rows[0].MAGOYONGFAX,
        // MABIGO: rows[0].MABIGO,
        // MAMEMO: rows[0].MAMEMO
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

        // {SACode: rows[i].SACode},
        // {SAName: rows[i].SAName},
        // {SABossName: rows[i].SABossName},
        // {SASaupNum: rows[i].SASaupNum},
        // {SADamdang: rows[i].SADamdang},
        // {SATel: rows[i].SATel},
        // {SAEMail: rows[i].SAEMail},
        // {SAJuso: rows[i].SAJuso},
        // {SAGubun: rows[i].SAGubun},
        // {SAMemo: rows[i].SAMemo}
      };

      res.send(result);
      console.log("BasicInfo Result", result);
    } else {
      console.log("query error : " + err);
      res.send("NoData");
    }
    con.end();
  });
});

// 저장하기
router.post("/BasicInfo_Save", async (req, res) => {
  var con = globalValue.connectDB("g00001");
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
  console.log("MABOSSNAME", req.body);
  await con.query(sql, parm, (err, rows, fields) => {
    if (err !== null) {
      res.status(200).send("서버에러 입니다. 관리자에게 문의하세요");
      con.rollback();
    } else {
      res.send("업데이트 성공");
    }
    con.end();
  });
});

module.exports = router;
