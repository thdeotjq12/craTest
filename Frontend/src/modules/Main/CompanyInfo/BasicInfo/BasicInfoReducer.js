// 기본정보 리스트 불러오기
export const ADD_BASIC_REQUEST = "BasicInfo/ADD_BASIC_REQUEST";
export const ADD_BASIC_UPDATE = "BasicInfo/ADD_BASIC_UPDATE";
export const ADD_BASIC_SUCCESS = "BasicInfo/ADD_BASIC_SUCCESS";
export const ADD_BASIC_FAILURE = "BasicInfo/ADD_BASIC_FAILURE";
const initalState = {
  BaicInfo_Data: null, // 기본정보 데이터 리스트
  Loading: true // 데이터 불러오는 중
};

const BasicInfo = (state = initalState, action) => {
  switch (action.type) {
    case ADD_BASIC_REQUEST:
      console.log("BasicIn_data 요청");
      return {
        ...state,
        Loading: true
      };
    case ADD_BASIC_SUCCESS:
      console.log("BasicIn_data 불러오기 완료", action.payload);
      return {
        ...state,
        Loading: false,
        BaicInfo_Data: action.payload
      };
    case ADD_BASIC_FAILURE:
      console.log("BasicIn_data 불러오기 실패");
      return {
        ...state,
        Loading: false
      };
    case ADD_BASIC_UPDATE:
      return {
        ...state
      };

    default:
      return state;
  }
};

export default BasicInfo;
