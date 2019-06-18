export const LOGIN_CHECK = "Loginpage/LOGIN_CHECK";
export const INPUT_ID = "Loginpage/INPUT_ID";
export const INPUT_PW = "Loginpage/INPUT_PW";
const initalState = {
  ID: "",
  PassWord: "",
  Success: false,
  isLogin: false
};

const Loginpage = (state = initalState, action) => {
  switch (action.type) {
    case INPUT_ID:
      console.log("INPUT_ID 실행됨");
      return {
        ...state,
        ID: action.payload
      };
    case INPUT_PW:
      console.log("INPUT_PW 실행됨");
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
    default:
      return state;
  }
};

export default Loginpage;
