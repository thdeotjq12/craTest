import axios from "axios";
var Func = {};

Func.SetSaupHead = function(Select, Year, Mode) {
  var parm = {
    Year: Year,
    Mode: Mode
  };

  axios
    .post("http://localhost:5000/Func/SetSaupHead", parm)
    .then(res => {
      console.log(res);
      if (res.data === "NoData") {
        console.log("SaupHead 데이터가 없습니다");
      } else {
        // 모든 select 내용을 지운다.
        for (let i = Select.options.length - 1; i >= 0; i--) {
          Select.remove(i);
        }
        Select.options[Select.options.length] = new Option("전체", "전체");
        for (let i = 0; i < res.data.SaupHead.length; i++) {
          Select.options[Select.options.length] = new Option(
            res.data.SaupHead[i].SHNAME,
            res.data.SaupHead[i].SHCODE
          );
        }
      }
    })
    .catch(err => {
      console.log("SaupHead 에러", err);
    });
};

Func.SetSaupDetail = function(Select, Year, SHCode, Mode) {
  var parm = {
    SHCode: SHCode,
    Year: Year,
    Mode: Mode
  };

  axios
    .post("http://localhost:5000/Func/SetSaupDetail", parm)
    .then(res => {
      console.log(res);
      if (res.data === "NoData") {
        console.log("SaupHeadList 데이터가 없습니다");
      } else {
        console.log("Test SetSaupDetail", res.data);
        // 모든 select 내용을 지운다.
        for (let i = Select.options.length - 1; i >= 0; i--) {
          Select.remove(i);
        }
        Select.options[Select.options.length] = new Option("전체", "전체");
        for (let i = 0; i < res.data.SaupDetail.length; i++) {
          Select.options[Select.options.length] = new Option(
            res.data.SaupDetail[i].SDNAME,
            res.data.SaupDetail[i].SDSHCODE +
              "|" +
              res.data.SaupDetail[i].SDCODE
          );
        }
      }
    })
    .catch(err => {
      console.log("SaupHeadList 에러", err);
    });
};

Func.GetSDCode = (SaupDetail_value, Result) => {
  var Codes = [];
  if (SaupDetail_value === "전체") {
    Codes = null;
  } else {
    Codes = SaupDetail_value.split("|");
    console.log("GetSDCode    : ", SaupDetail_value, Codes);
    return Codes;
  }
};
export default Func;
