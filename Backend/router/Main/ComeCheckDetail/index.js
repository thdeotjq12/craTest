var express = require("express");
var router = express.Router();
var globalValue = require("../../../globalValue");
const passport = require("passport");

router.post("/SetHolidays", async (req, res) => {
  console.log("SetHolidays");
  var con = await globalValue.connectDB("g00001");
  var result = {};
  var sql = "";
  var parm = [];
  var moment = require("moment");
  var StrDate = req.body.StrDate;
  var EndDate = req.body.EndDAte;
  var SWGubun = req.body.SWGubun;
  con.connect();

  sql =
    ` SELECT CHCODE, CHGUBUN, CHNAME, CHDATE, CHMEMO, CHCCGUBUN` +
    SWGubun +
    ` AS CHCCGUBUN FROM COMPANYHOLIDAYS
           WHERE CHDATE >= ?                                                                             
             AND CHDATE <= ?
           ORDER BY CHDATE                                                                                        `;
  parm = [StrDate, EndDate];

  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      result = {
        ...result,
        HolidaysList: rows
      };

      res.send(result);
    } else {
      console.log("Query ERR : ", err);
      res.send("NoData");
    }
  });

  con.end();
});

router.post("/SetHuejik", async (req, res) => {
  console.log("SetHuejik");
  var con = await globalValue.connectDB("g00001");
  var result = {};
  var sql = "";
  var parm = [];
  var moment = require("moment");
  var STCode = req.body.STCode;
  var StrDate = req.body.StrDate;
  var EndDate = req.body.EndDAte;
  console.log("Test 2 ", req.body);
  con.connect();

  sql = ` SELECT * FROM STAFFHUEJIK                                   
           WHERE SHSTCODE = ?                                   
             AND ((SHSTRDATE <= ? AND SHENDDATE >= ?) 
              OR ( SHSTRDATE >= ? AND SHSTRDATE <= ?))   `;
  parm = [STCode, StrDate, StrDate, StrDate, EndDate];

  await con.query(sql, parm, (err, rows, fields) => {
    if (!err) {
      result = {
        ...result,
        HuejikList: rows
      };
      console.log("HuejikList", result);
      res.send(result);
    } else {
      console.log("Query ERR : ", err);
      res.send("NoData");
    }
  });

  con.end();
});
module.exports = router;
