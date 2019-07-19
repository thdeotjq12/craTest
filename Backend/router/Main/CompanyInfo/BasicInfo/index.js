var express = require("express");
var router = express.Router();
var globalValue = require("../../../../globalValue");
const passport = require("passport");
// ------------------------------------------------- 기관정보 탭
router.post("/BasicInfo", async (req, res) => {
  var con = await globalValue.connectDB("g00001");
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
  con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      //   if(
      result = {
        ...result,
        BaicInfo_Data: rows
      };
    } else {
      console.log("기본정보 조회 에러 : ", err);
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
  var con = await globalValue.connectDB("g00001");
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

  for (let i = 0; i < req.body.SALIST.length; i++) {
    if (req.body.SALIST[i].N === "N") {
      var SACODE = await GetSysCode(
        con,
        "SubAgency",
        "SACode",
        "",
        "",
        new Date(),
        5
      );
      console.log("TestCOde", SACODE);
      sql = ` INSERT INTO SUBAGENCY(  SADAMDANG                                            
                             ,  SATEL                                                
                             ,  SACODE ,  SAGUBUN,  SANAME ,  SABOSSNAME,  SASAUPNUM 
                             ,  SAEMAIL,  SAJUSO ,  SAMEMO ,  SADELYN               )
                       VALUES( PDB_ACCT.pdbEnc('NORMAL', ? ,'')         
                             , PDB_ACCT.pdbEnc('NORMAL', ? ,'')         
                             , ? , ?, ? , ?, ? 
                             , ?, ? , ? , ?               ) `;
      parm = [
        req.body.SALIST[i].SADAMDANG,
        req.body.SALIST[i].SATEL,
        SACODE,
        req.body.SALIST[i].SAGUBUN,

        req.body.SALIST[i].SANAME,
        req.body.SALIST[i].SABOSSNAME,
        req.body.SALIST[i].SASAUPNUM,
        req.body.SALIST[i].SAEMAIL,
        req.body.SALIST[i].SAJUSO,
        req.body.SALIST[i].SAMEMO,
        "N" // 삭제시엔 Y로 넣기
      ];
      console.log("인써트!!!!@@");
      await globalValue.PromiseQuery(con, sql, parm);
    } else if (req.body.SALIST[i].N === "U") {
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
      await globalValue.PromiseQuery(con, sql, parm);
    } else if (req.body.SALIST[i].N === "D") {
      sql = `UPDATE SUBAGENCY SET      
              SADELYN    = ?  
             WHERE SACODE= ?   `;
      parm = ["Y", req.body.SALIST[i].SACODE];
      console.log("딜리트!!!!@@");
    }
    await globalValue.PromiseQuery(con, sql, parm);
  }

  isSuccess ? res.send("OK") : res.send("OK");
  console.log("isSuccess", isSuccess);
  con.end();
});

router.post("/BasicInfo_getDamdang", async (req, res) => {
  var con = await globalValue.connectDB("g00001");
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
  var con = await globalValue.connectDB("g00001");
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
  var con = await globalValue.connectDB("g00001");
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

module.exports = router;
