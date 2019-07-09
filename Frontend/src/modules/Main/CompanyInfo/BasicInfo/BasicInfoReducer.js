// 기본정보 리스트 불러오기
export const ADD_BASIC_REQUEST = "BasicInfo/ADD_BASIC_REQUEST";
export const ADD_BASIC_UPDATE = "BasicInfo/ADD_BASIC_UPDATE";
export const ADD_BASIC_SUCCESS = "BasicInfo/ADD_BASIC_SUCCESS";
export const ADD_BASIC_FAILURE = "BasicInfo/ADD_BASIC_FAILURE";
// 담당자 정보
export const ADD_BASIC_Damdang_REQUEST = "BasicInfo/ADD_BASIC_Damdang_REQUEST";
export const ADD_BASIC_Damdang_SUCCESS = "BasicInfo/ADD_BASIC_Damdang_SUCCESS";
export const ADD_BASIC_Damdang_FAILURE = "BasicInfo/ADD_BASIC_Damdang_FAILURE";
// 담당자 - 그리드 클릭 정보
export const ADD_BASIC_DamGrid_REQUEST = "BasicInfo/ADD_BASIC_DamGrid_REQUEST";
export const ADD_BASIC_DamGrid_SUCCESS = "BasicInfo/ADD_BASIC_DamGrid_SUCCESS";
const initalState = {
  BaicInfo_Data: null, // 기본정보 데이터 리스트
  BaicInfo_Damdang: null, // 담당자 상세보기 리스트
  Loading: true, // 데이터 불러오는 중
  BaicInfo_DamdangLoading: false,
  BaicInfo_DamGridCell: null // 담당자 - 그리드 셀 클릭 정보
};

const BasicInfo = (state = initalState, action) => {
  switch (action.type) {
    case ADD_BASIC_REQUEST:
      console.log("BasicIn_data 요청 Loading True");
      return {
        ...state,
        Loading: true
      };
    case ADD_BASIC_SUCCESS:
      console.log("BasicIn_data 불러오기 완료, Loading False", action.payload);
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
        ...state,
        Loading: false
      };
    case ADD_BASIC_Damdang_REQUEST:
      console.log("ADD_BASIC_Damdang_REQUEST 요청 Loading True");
      return {
        ...state,
        BaicInfo_DamdangLoading: true
      };
    case ADD_BASIC_Damdang_SUCCESS:
      console.log("BasicIn_data 불러오기 완료, Loading False", action.payload);
      return {
        ...state,
        BaicInfo_DamdangLoading: false,
        BaicInfo_Damdang: action.payload
      };
    case ADD_BASIC_Damdang_FAILURE:
      console.log("BasicIn_data 불러오기 실패");
      return {
        ...state,
        BaicInfo_DamdangLoading: false
      };

    case ADD_BASIC_DamGrid_REQUEST:
      console.log("ADD_BASIC_DamGrid_REQUEST 요청 Loading True");
      return {
        ...state
      };
    case ADD_BASIC_DamGrid_SUCCESS:
      console.log("ADD_BASIC_DamGrid_SUCCESS", action.payload);
      return {
        ...state,
        BaicInfo_DamGridCell: action.payload
      };

    default:
      return state;
  }
};

export default BasicInfo;
