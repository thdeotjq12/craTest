export const LOGIN_CHECK = "Loginpage/LOGIN_CHECK";
export const INPUT_ID = "Loginpage/INPUT_ID";
export const INPUT_PW = "Loginpage/INPUT_PW";
export const USERINFO_DATA = "Loginpage/USERINFO_DATA";
const initalState = {
  ID: "",
  PassWord: "",
  User_Data: null,
  Success: false,
  isLogin: false,
  GlovalValue: null
  // 이부분 추가/수정 하면 서버 재시작 필요
};

const Loginpage = (state = initalState, action) => {
  switch (action.type) {
    case INPUT_ID:
      console.log("INPUT_ID 실행됨", action.payload);
      return {
        ...state,
        ID: action.payload
      };
    case INPUT_PW:
      console.log("INPUT_PW 실행됨", action.payload);
      return {
        ...state,
        PassWord: action.payload
      };
    case LOGIN_CHECK:
      console.log(action.payload.id);
      if (action.payload.id === "9") {
        return {
          ...state,
          isLogin: true
        };
      } else {
        return {
          ...state,
          isLogin: false
        };
      }
    case USERINFO_DATA:
      console.log("USERINFO_DATA 실행됨", action.payload);
      return {
        ...state,
        User_Data: action.payload
      };

    default:
      return state;
  }
};

export default Loginpage;
