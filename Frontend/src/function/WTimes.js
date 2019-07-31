import axios from "axios";
import { ISO_8601 } from "moment";
var Func = {};
//공휴일 리스트
var CHCode = "";
var CHGubun = "";
var CHName = "";
var CHDate = "";
var CHMemo = "";
var CHCCGubun = "";
var Holidays = {
  CHCode: CHCode, //공휴코드
  CHGubun: CHGubun, //공휴구분(HG_로 시작하는 상수 확인)
  CHName: CHName, //휴일명
  CHDate: CHDate, //날짜
  CHMemo: CHMemo, //비고, 메모
  CHCCGubun: CHCCGubun //근태처리방법(0:근무일 5:무급휴무 6:유급휴무 -> WG_로 시작하는 상수 확인)
}; //공휴일 목록 리스트
//근로시간을 계산하는 클래스
var TWTimes = {};
//공휴목록을 추가하는 함수
Func.AddHolidays = (CHCode, CHGubun, CHName, CHDate, CHMemo, CHCCGubun) => {
  var iHolidays = {};
  iHolidays.CHCode = CHCode;
  iHolidays.CHGubun = CHGubun;
  iHolidays.CHName = CHName;
  iHolidays.CHDate = CHDate;
  iHolidays.CHMemo = CHMemo;
  iHolidays.CHCCGubun = CHCCGubun;
  Holidays.push(iHolidays);
};
//CheckDate가 휴일인 경우 근태처리방법을 불러오는 함수(0:근무일 5:무급휴무 6:유급휴무)
Func.getHolidayCCGubun = (CheckDate, DefaultValue) => {
  var Result = "";
  if (Holidays.CHCode === "") return;
  for (let i = 0; i < Holidays.length; i++) {
    if (CheckDate === Holidays[i].CHDate) Result = Holidays[i].CHCCGubun;
  }
  return Result;
};
export default Func;
