var express = require("express");
var router = express.Router();
var globalValue = require("../../globalValue");
const passport = require("passport");

// ------------------------------------------------- 로그인

router.post("/login", async (req, res) => {
  var con = await globalValue.connectDB("g00001");
  var parm = [];
  var sql = "";
  var isAdminOK = false; // 관리자 로그인 플레그
  var moment = require("moment");
  var adminPW = moment().format("mmHH");
  var otherPW = moment().format("ddmmHH");
  con.connect();
  if (
    req.body.id !== "admin" &&
    req.body.id !== "line001" &&
    req.body.id !== "seowon_admin" &&
    req.body.id !== "seowon_subadmin" &&
    req.body.id !== "seowon"
  ) {
    sql = ` SELECT PDB_ACCT.pdbDec('normal', SUID , '', 0) as SUID 
                 , PDB_ACCT.pdbDec('normal', SUPW , '', 0) as SUPW 
                 , PDB_ACCT.pdbDec('normal', SUTEL, '', 0) as SUTEL
                 , SUNAME    , SULEVEL, SUINDAY, SUOUTDAY, SUBUSEO     
                 , SUJIKCHECK, SUEMAIL, SUUSEYN, SUTALKYN, SUSACODE    
                   WHERE SUID = PDB_ACCT.pdbEnc('normal', ? , '') 
                   AND   SUPW = PDB_ACCT.pdbEnc('normal', ? , '')  `;

    parm = [req.body.id, req.body.pw];
  } else {
    if (req.body.id === "admin") {
      if (req.body.pw === adminPW) {
        isAdminOK = true;
      }
    } else {
      if (req.body.pw === otherPW) {
        isAdminOK = true;
      }
    }
    if (isAdminOK === true) {
      sql = ` SELECT PDB_ACCT.pdbDec('normal', SUID , '', 0) as SUID 
                   , PDB_ACCT.pdbDec('normal', SUPW , '', 0) as SUPW 
                   , PDB_ACCT.pdbDec('normal', SUTEL, '', 0) as SUTEL
                   , SUNAME    , SULEVEL, SUINDAY, SUOUTDAY, SUBUSEO     
                   , SUJIKCHECK, SUEMAIL, SUUSEYN, SUTALKYN, SUSACODE  
              FROM SYSUSER  
              WHERE SUID = PDB_ACCT.pdbEnc('normal', ? , '')  `;
      parm = [req.body.id];
    } else {
      console.log("관리자 비밀번호가 틀립니다.", req.body.pw, adminPW);
    }
  }

  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      //   if(
      if (rows.length === 0) {
        console.log(" Login getData === 0");
        res.send("LoginFail");
      } else {
        User_Info(rows, res, con);
      }
    } else {
      console.log("query error : " + err);
    }
  });
});

// sysuser 의 id값(PK) 기준 사용자정보를 조회
User_Info = (sysuser, res, con) => {
  console.log("2", sysuser[0]);
  var sql =
    // "SELECT * FROM SYSUSER USER" + "WHERE USER.SUID = ?";
    "SELECT * FROM SYSUSER WHERE SUID = PDB_ACCT.pdbEnc('normal', ? , '')";
  var parm = [sysuser[0].SUID];
  con.query(sql, parm, function(err, rows, fields) {
    if (!err) {
      //   if(
      var result = {
        SUID: rows[0].SUID,
        SUPW: rows[0].SUPW,
        SUNAME: rows[0].SUNAME,
        SULEVEL: rows[0].SULEVEL,
        SUINDAY: rows[0].SUINDAY,
        SUOUTDAY: rows[0].SUOUTDAY,
        SUBUSEO: rows[0].SUBUSEO,
        SUJIKCHECK: rows[0].SUJIKCHECK,
        SUTEL: rows[0].SUTEL,
        SUEMAIL: rows[0].SUEMAIL,
        SUUSEYN: rows[0].SUUSEYN,
        SUTALKYN: rows[0].SUTALKYN,
        SUSACODE: rows[0].SUSACODE
      };
      res.send(result);
      // console.log("User_Info Result", result);
    } else {
      console.log("query error : " + err);
    }
  });

  con.end();
};

module.exports = router;
