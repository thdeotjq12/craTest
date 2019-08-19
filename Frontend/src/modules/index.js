import { combineReducers } from "redux";
import Loginpage from "./Login/LoginReducer";
import BasicInfo from "./Main/CompanyInfo/BasicInfo/BasicInfoReducer";
import SaupGwanRi from "./Main/CompanyInfo/SaupGwanRi/SaupGwanRiReducer";
import CommonInfo from "./Main/CompanyInfo/CommonInfo/CommonInfoReducer";
import ValList from "./Func/ValListReducer";
import ComeCheck from "./Main/ComeCheck/ComeCheckReducer";
import ComeCheckDetail from "./Main/ComeCheckDetail/ComeCheckDetailReducer";
// 스토어 등록
const rootReducer = combineReducers({
  Loginpage,
  BasicInfo,
  SaupGwanRi,
  CommonInfo,
  ValList,
  ComeCheck,
  ComeCheckDetail
});

export default rootReducer;
