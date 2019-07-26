export const ADD_ValList_REQUEST = "Functions/ADD_ValList_REQUEST";
export const ADD_ValList_SUCCESS = "Functions/ADD_ValList_SUCCESS";
const initalState = {
  ValList: null
  // 이부분 추가/수정 하면 서버 재시작 필요
};

const ValList = (state = initalState, action) => {
  switch (action.type) {
    case ADD_ValList_SUCCESS:
      console.log("ADD_ValList_SUCCESS 실행됨", action.payload);
      return {
        ...state,
        ValList: action.payload
      };

    default:
      return state;
  }
};

export default ValList;
