import axios from "axios";
import { addHours } from "date-fns";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";
var Func = {};
Func.infraRoundUp = (number, disit) => {
  var disit10;
  disit10 = 1;
  console.log("Number0", number, disit);
  for (let i = 1; i < Math.abs(disit); i++) {
    disit10 = disit10 * 10;
  }
  if (disit >= 0) number = number * disit10;
  else number = number / disit10;
  console.log("Number1", number);
  if (disit === 0) number = Math.trunc(number * 10) / 10;
  console.log("Number2", number);
  number = Math.ceil(Math.trunc(number * 10) / 10);
  console.log("Number3", number);
  disit10 = Math.trunc(disit10);
  if (disit >= 0) number = number / disit10;
  else number = number * disit10;
  console.log("Number4", number);
  return number;
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
    iTime.substr(2, 1) !== ":"
    // ||  (StrToIntDef(iTime.substr(1,2),-9999999999) === -9999999999)
    // ||  (StrToIntDef(iTime.substr(4,2),-9999999999) === -9999999999)
  ) {
    Result = "";
    return Result;
  }
  iHour = iTime.substr(0, 2);
  iMinute = iTime.substr(3, 2);
  SumMinute = iHour * 60 + iMinute + incValue;

  if (SumMinute < 0) {
    SumMinute = 24 * 60 + SumMinute;
  }
  Result = Math.trunc(SumMinute / 60) + (SumMinute % 60); // mod 함수
  return Result;
};
//Base시간을 기준으로 Obj시간이 겹치는 부분에대한 시간값(분)을 계산
Func.calcMiute_BaseNObjTime = (
  BaseTimeStr,
  BaseTimeEnd,
  ObjTimeStr,
  ObjTimeEnd
) => {
  var StrTime;
  var EndTime;
  if (
    BaseTimeStr === "" ||
    BaseTimeEnd === "" ||
    ObjTimeStr === "" ||
    ObjTimeEnd === ""
  ) {
    return 0;
  }
  if (BaseTimeStr >= BaseTimeEnd) BaseTimeEnd = addHours(BaseTimeEnd, 24);
  if (
    (ObjTimeStr <= BaseTimeStr && ObjTimeEnd <= BaseTimeEnd) ||
    (ObjTimeStr >= BaseTimeEnd && ObjTimeEnd >= BaseTimeEnd)
  ) {
    //둘다 시간외. 계산없음
    StrTime = "";
    EndTime = "";
  } else if (ObjTimeStr <= BaseTimeStr && ObjTimeEnd <= BaseTimeEnd) {
    //시작은 시간외 이지만 종료는 시간내. BaseTimeStr ~ ObjTimeEnd까지 계산
    StrTime = BaseTimeStr;
    EndTime = ObjTimeEnd;
  } else if (ObjTimeStr >= BaseTimeStr && ObjTimeEnd >= BaseTimeEnd) {
    StrTime = ObjTimeStr;
    EndTime = BaseTimeEnd;
  } else if (
    ObjTimeStr >= BaseTimeStr &&
    ObjTimeStr <= BaseTimeEnd &&
    (ObjTimeEnd >= BaseTimeStr && ObjTimeEnd <= BaseTimeEnd)
  ) {
    StrTime = ObjTimeStr;
    EndTime = ObjTimeEnd;
  } else if (ObjTimeStr <= BaseTimeStr && ObjTimeEnd >= BaseTimeEnd) {
    StrTime = BaseTimeStr;
    EndTime = BaseTimeEnd;
  }
  if (StrTime === "" || EndTime === "") {
    return 0;
  } else {
    return Func.TimeTermMinuteStr(StrTime, EndTime);
  }
};
//시작 시간부터 종료시간까지 시간차를 계산하는 함수. 실수로 시간을 리턴
Func.CalcTimeTermFloat = (StrTime, EndTime) => {
  var strHour;
  var strMinute;
  var endHour;
  var endMinute;
  var resHour;
  var resMinute;

  if (
    StrTime.trim() === "" ||
    EndTime.trim() === "" ||
    StrTime.length !== 5 ||
    EndTime.length !== 5
  )
    return 0;

  strHour = Number(StrTime.substr(0, 2));
  strMinute = Number(StrTime.substr(3, 2));
  endHour = Number(EndTime.substr(0, 2));
  endMinute = Number(EndTime.substr(3, 2));
  if (StrTime !== EndTime) {
    resHour = endHour - strHour;
    if (endMinute < strMinute) {
      if (resHour >= 1) {
        resHour = resHour - 1;
        resMinute = 60 + endMinute - strMinute;
      } else {
        resMinute = 0;
      }
    } else {
      resMinute = endMinute - strMinute;
    }
    resMinute = resMinute / 60;
  } else if (StrTime > EndTime) {
    resHour = 24 - strHour;
    resHour = resHour + endHour;
    if (endMinute < strMinute) {
      if (resHour >= 1) {
        resHour = resHour - 1;
        resMinute = 60 + endMinute - strMinute;
      } else {
        resMinute = 0;
      }
    } else {
      resMinute = endMinute - strMinute;
    }
    resMinute = resMinute / 60;
  } else {
    resHour = 24;
    resMinute = 0;
  }

  return resHour + resMinute;
};
//두 문자열형 시간사이에 시간차를 분으로 리턴
Func.TimeTermMinuteStr = (befTime, aftTime) => {
  var befMinute;
  var aftMinute;

  if (befTime && aftTime) {
    if (
      befTime === "" ||
      aftTime === "" ||
      befTime.length < 5 ||
      befTime.substr(2, 1) !== ":" ||
      // Number(befTime.substr(0, 2) - 9999999999) === -9999999999 ||
      // Number(befTime.substr(3, 2) - 9999999999) === -9999999999 ||
      aftTime.length < 5 ||
      aftTime.substr(2, 1) !== ":"
      // Number(aftTime.substr(0, 2) - 9999999999) === -9999999999 ||
      // Number(aftTime.substr(3, 2) - 9999999999) === -9999999999
    )
      return 0;

    befMinute =
      Number(befTime.substr(0, 2)) * 60 + Number(befTime.substr(3, 2));
    aftMinute =
      Number(aftTime.substr(0, 2)) * 60 + Number(aftTime.substr(3, 2));
    if (befMinute >= aftMinute) aftMinute = aftMinute + 60 * 24; //만약 이전 시간이 이후시간보다 더 크면 24:00을 지난 것이므로 24시간*60분을 가산한다.

    return aftMinute - befMinute;
  }
  return 0;
};
export default Func;
