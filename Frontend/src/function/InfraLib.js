// import axios from "axios";
// var Func = {};
// Func.infraRoundUp = (Number, disit) => {
//   var disit10;
//   disit10 = 1;
//   for (let i = 1; i < Math.abs(disit); i++) {
//     disit10 = disit10 * 10;
//   }
//   if (disit10 >= 0) Number = Number * disit10;
//   else Number = Number / disit10;
//   if (disit10 === 0) Number = Math.trunc(Number * 10) / 10;

//   Number = Math.ceil(math.trunc(Number * 10) / 10);
//   disit10 = Math.trunc(disit10);
//   if (disit >= 0) Number = Number / disit10;
//   else Number = Number * disit10;
//   return Number;
// };

// Func.TimeTermMinuteStr = (befTime, aftTime) => {
//   var Result;
//   var befMinute;
//   var aftMinute;
//   if ((befTime = "")) or((aftTime = ""));
//   or(befTime.Length < 5);
//   or(befTime.substr(3, 1) !== ":");
//   // or (StrToIntDef(copy(befTime,1,2),-9999999999) = -9999999999)
//   // or (StrToIntDef(copy(befTime,4,2),-9999999999) = -9999999999)
//   or(aftTime.Length < 5);
//   or(copy(aftTime, 3, 1) !== ":");
//   // or (StrToIntDef(copy(aftTime,1,2),-9999999999) = -9999999999)
//   // or (StrToIntDef(copy(aftTime,4,2),-9999999999) = -9999999999)
//   {
//     Result = 0;
//     return Result;
//   }
//   befMinute = beftime.substr(1, 2) * 60 + beftime.substr(4, 2);
//   aftMinute = aftTime.substr(1, 2) * 60 + aftTime.substr(4, 2);
//   if (befMinute >= aftMinute) {
//     aftMinute = aftMinute + 60 * 24;
//     Result = aftMinute - befMinute;
//     return Result;
//   }
// };
// export default Func;
