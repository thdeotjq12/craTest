var express = require("express");
var router = express.Router();
var globalValue = require("../../globalValue");
const passport = require("passport");

// router.get("/", (req, res) => {
//   //get/user
//   if (!req.user) {
//     return res.status(401).send("로그인이 필요합니다.");
//   }
//   return res.json(req.user);
// });
// router.post("/login", (req, res, next) => {
//   try {
//     passport.authenticate("local", (err, user, info) => {
//       if (err) {
//         console.error(err);
//         return next(err);
//       }
//       console.log("info", info);
//       if (info) {
//         return res.status(401).send(info.reason);
//       }
//       return req.login(user, loginErr => {
//         if (loginErr) {
//           return next(loginErr);
//         }
//         const filteredUser = Object.assign({}, user);
//         delete filteredUser.password;
//         return res.json(filteredUser);
//       });
//     })(req, res, next);
//   } catch (e) {
//     console.error(e);
//   }
//   // res.send("OK");
// });

// router.post("/logout", (req, res) => {
//   console.log("info", "logout");
//   req.logout();
//   req.session.destroy();
//   res.send("logOut 성공");
// });

router.post("/login", async (req, res) => {
  var con = globalValue.connectDB("g00001");

  con.connect();
  var sql =
    "SELECT PDB_ACCT.pdbDec('normal', SUID ,'', 0) as SUID FROM SYSUSER";

  var parm = [req.body.id, req.body.pw];
  console.log("1", req.body);
  con.query(sql, parm, (err, rows, fields) => {
    console.log("sql", sql);
    if (!err) {
      //   if(
      if (rows.length === 0) {
        console.log("rows.length === 0");
      } else {
        User_Info(rows, res, con);
      }
    } else {
      console.log("query error : " + err);
    }
  });
});

// sysuser 의 id, pw 값 기준 syscompany 를 조회
User_Info = (sysuser, res, con) => {
  console.log("2", sysuser[0]);
  var sql =
    // "SELECT * FROM SYSUSER USER" + "WHERE USER.SUID = ?";
    "SELECT * FROM SYSUSER USER";

  var parm = [sysuser[0].SUID];
  con.query(sql, parm, function(err, rows, fields) {
    if (!err) {
      //   if(
      console.log(rows);
      var result = {
        SUID: rows[0].SUID,
        SUPW: rows[0].SUPW,
        SUName: rows[0].SUName,
        SULevel: rows[0].SULevel,
        SUInDay: rows[0].SUInDay,
        SUOutDay: rows[0].SUOutDay,
        SUBuseo: rows[0].SUBuseo,
        SUJikcheck: rows[0].SUJikcheck,
        SUTel: rows[0].SUTel,
        SUEMail: rows[0].SUEMail,
        SUUseYN: rows[0].SUUseYN,
        SUTalkYN: rows[0].SUTalkYN,
        SUSACode: rows[0].SUSACode
      };
      res.send(result);
      console.log("User_Info Result", result);
    } else {
      console.log("query error : " + err);
    }
  });

  con.end();
};

module.exports = router;
