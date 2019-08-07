import axios from "axios";
var Func = {};
Func.infraRoundUp = (Number, disit) => {
  var disit10;
  disit10 = 1;
  for (let i = 1; i < Math.abs(disit); i++) {
    disit10 = disit10 * 10;
  }
  if (disit10 >= 0) Number = Number * disit10;
  else Number = Number / disit10;
  if (disit10 === 0) Number = Math.trunc(Number * 10) / 10;

  Number = Math.ceil(Math.trunc(Number * 10) / 10);
  disit10 = Math.trunc(disit10);
  if (disit >= 0) Number = Number / disit10;
  else Number = Number * disit10;
  return Number;
};

Func.TimeTermMinuteStr = (befTime, aftTime) => {
  var Result;
  var befMinute;
  var aftMinute;
  if (
    befTime === "" ||
    aftTime === "" ||
    befTime.Length < 5 ||
    befTime.substr(3, 1) !== ":" ||
    // ||  (StrToIntDef(copy(befTime,1,2),-9999999999) === -9999999999)
    // ||  (StrToIntDef(copy(befTime,4,2),-9999999999) === -9999999999)
    aftTime.Length < 5 ||
    aftTime.substr(3, 1) !== ":"
  ) {
    // ||  (StrToIntDef(copy(aftTime,1,2),-9999999999) === -9999999999)
    // ||  (StrToIntDef(copy(aftTime,4,2),-9999999999) === -9999999999)
    Result = 0;
    return Result;
  }
  befMinute = befTime.substr(1, 2) * 60 + befTime.substr(4, 2);
  aftMinute = aftTime.substr(1, 2) * 60 + aftTime.substr(4, 2);
  if (befMinute >= aftMinute) {
    aftMinute = aftMinute + 60 * 24;
    Result = aftMinute - befMinute;
    return Result;
  }
};
//문자열형 시간을 넘겨주면 incValue만큼 분이 가산되어 문자열로 리턴
Func.IncMinuteStr = (iTime, incValue) => {
  var iHour;
  var iMinute;
  var SumMinute;
  var Result;
  if (
    iTime === "" ||
    iTime.Length < 5 ||
    iTime.substr(3, 1) !== ":"
    // ||  (StrToIntDef(iTime.substr(1,2),-9999999999) === -9999999999)
    // ||  (StrToIntDef(iTime.substr(4,2),-9999999999) === -9999999999)
  ) {
    Result = "";
    return Result;
  }
  iHour = iTime.substr(1, 2);
  iMinute = iTime.substr(4, 2);
  SumMinute = iHour * 60 + iMinute + incValue;

  if (SumMinute < 0) {
    SumMinute = 24 * 60 + SumMinute;
  }
  Result = Math.trunc(SumMinute / 60) + (SumMinute % 60); // mod 함수
};

export default Func;
