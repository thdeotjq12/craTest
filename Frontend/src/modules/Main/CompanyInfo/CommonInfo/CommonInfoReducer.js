// 공통근로정보 - 수당정보 그리드
export const ADD_COMMINFO_GridData_REQUEST =
  "CommonInfo/ADD_COMMINFO_GridData_REQUEST";
export const ADD_COMMINFO_GridData_SUCCESS =
  "CommonInfo/ADD_COMMINFO_GridData_REQUEST";
export const ADD_COMMINFO_GridData_FAILURE =
  "CommonInfo/ADD_COMMINFO_GridData_REQUEST";
export const ADD_COMMINFO_Holiday_SUCCESS =
  "CommonInfo/ADD_COMMINFO_Holiday_SUCCESS";
export const ADD_COMMINFO_Holiday_FAILURE =
  "CommonInfo/ADD_COMMINFO_Holiday_FAILURE";

const initalState = {
  CommonInfo_Data: null, // 기본정보 데이터 리스트
  Loading: true, // 데이터 불러오는 중]
  Loading_Holiy: true
};

const CommonInfo = (state = initalState, action) => {
  switch (action.type) {
    case ADD_COMMINFO_GridData_REQUEST:
      console.log("ADD_COMMINFO_GridData_REQUEST 요청 Loading True");
      return {
        ...state,
        Loading: true
      };
    case ADD_COMMINFO_GridData_SUCCESS:
      return {
        ...state,
        Loading: false
      };
    case ADD_COMMINFO_GridData_FAILURE:
      return {
        ...state,
        Loading: false
      };
    case ADD_COMMINFO_Holiday_SUCCESS:
      return {
        ...state,
        Loading_Holiy: false
      };
    case ADD_COMMINFO_Holiday_FAILURE:
      return {
        ...state,
        Loading_Holiy: false
      };
    default:
      return state;
  }
};

export default CommonInfo;
