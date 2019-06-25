var express = require("express");
var router = express.Router();
var globalValue = require("../../globalValue");
const passport = require("passport");

// ------------------------------------------------- 로그인

router.post("/login", async (req, res) => {
  var con = globalValue.connectDB("g00001");

  con.connect();
  var sql =
    " SELECT PDB_ACCT.pdbDec('normal', SUID ,'', 0) as SUID FROM SYSUSER " +
    " WHERE SUID = PDB_ACCT.pdbEnc('normal', ? , '') " +
    " AND   SUPW = PDB_ACCT.pdbEnc('normal', ? , '')";

  var parm = [req.body.id, req.body.pw];
  console.log("1", req.body);
  con.query(sql, parm, (err, rows, fields) => {
    console.log("sql", sql);
    if (!err) {
      //   if(
      if (rows.length === 0) {
        console.log("rows.length === 0");
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
