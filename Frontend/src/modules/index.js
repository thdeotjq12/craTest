import { combineReducers } from "redux";
import Loginpage from "./Login/LoginReducer";
import BasicInfo from "./Main/CompanyInfo/BasicInfo/BasicInfoReducer";
// 스토어 등록
const rootReducer = combineReducers({
  Loginpage,
  BasicInfo
});

export default rootReducer;
