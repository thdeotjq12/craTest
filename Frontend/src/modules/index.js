import { combineReducers } from "redux";
import Loginpage from "./Login/LoginReducer";
import BasicInfo from "./Main/CompanyInfo/BasicInfo/BasicInfoReducer";
import SaupGwanRi from "./Main/CompanyInfo/SaupGwanRi/SaupGwanRiReducer";
// 스토어 등록
const rootReducer = combineReducers({
  Loginpage,
  BasicInfo,
  SaupGwanRi
});

export default rootReducer;
