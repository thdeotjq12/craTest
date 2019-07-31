import { combineReducers } from "redux";
import Loginpage from "./Login/LoginReducer";
import BasicInfo from "./Main/CompanyInfo/BasicInfo/BasicInfoReducer";
import SaupGwanRi from "./Main/CompanyInfo/SaupGwanRi/SaupGwanRiReducer";
import CommonInfo from "./Main/CompanyInfo/CommonInfo/CommonInfoReducer";
import ValList from "./Func/ValListReducer";
import ComeCheck from "./Main/ComeCheck/ComeCheckReducer";
// 스토어 등록
const rootReducer = combineReducers({
  Loginpage,
  BasicInfo,
  SaupGwanRi,
  CommonInfo,
  ValList,
  ComeCheck
});

export default rootReducer;
