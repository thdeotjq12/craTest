var ValBaseDigit = 2;
var ValOverDigit = 2;
var ValWTimeLimitOfDay = 8;
var PValue = {
  ValVersionText: (ValVersionText = "181018.01"),
  ValWTimeHoliRate: (ValWTimeHoliRate = 0.2),
  WTimeOfDayLimit: (WTimeOfDayLimit = 8),
  WTimeOfDayLimitMinor: (WTimeOfDayLimitMinor = 7),
  WTimeOfWeekLimit: (WTimeOfWeekLimit = 40),
  WTimeOfWeekLimitMinor: (WTimeOfWeekLimitMinor = 40),
  ValPWCheckLevel: (ValPWCheckLevel = 5),
  ValBaseDigit: ValBaseDigit,
  ValOverDigit: ValOverDigit,
  ValWTimeLimitOfDay: ValWTimeLimitOfDay //일일 기본 근로 시간
};

var ValVersionText = "181018.01";
var ValWTimeHoliRate = 0.2; //주휴수당 계수
var WTimeOfDayLimit = 8; //법정 하루 최대 근무시간
var WTimeOfDayLimitMinor = 7; //법정 하루 최대 근무시간(미성년자)
var WTimeOfWeekLimit = 40; //법정 주 최대 근무시간
var WTimeOfWeekLimitMinor = 40; //법정 주 최대 근무시간(미성년자: 성인근로자와 같음)=>유영혜20161021: 미성년자도 주당 40시간이후로 연장근로 적용받음
var ValPWCheckLevel = 5; //0: 기본체크(nowPW와 newPW가 다르고 rePW가 newPW와 같은지 여부 체크)
export default PValue;
