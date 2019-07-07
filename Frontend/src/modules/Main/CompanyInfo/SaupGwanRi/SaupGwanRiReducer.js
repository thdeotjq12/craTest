// 사업 그리드 클릭 정보
export const ADD_Saup_Grid_REQUEST = "SaupGwanRi/ADD_Saup_Grid_REQUEST";
export const ADD_Saup_Grid_SUCCESS = "SaupGwanRi/ADD_Saup_Grid_SUCCESS";
export const ADD_Saup_Grid_FAILURE = "SaupGwanRi/ADD_Saup_Grid_FAILURE";
// 세부사업 그리드 클릭 정보
export const ADD_SeabuSaup_Grid_REQUEST =
  "SaupGwanRi/ADD_SeabuSaup_Grid_REQUEST";
export const ADD_SeabuSaup_Grid_SUCCESS =
  "SaupGwanRi/ADD_SeabuSaup_Grid_SUCCESS";
const initalState = {
  SaupGwanRi_Data: null, // 기본정보 데이터 리스트
  SeabuSaupGwanRi_Data: null,
  Loading: true, // 데이터 불러오는 중
  SeabuSaup_Loading: true // 세부사업 로딩중
};

const SaupGwanRi = (state = initalState, action) => {
  switch (action.type) {
    case ADD_Saup_Grid_REQUEST:
      console.log("SaupGwanRi_data 요청 Loading True");
      return {
        ...state,
        Loading: true
      };
    case ADD_Saup_Grid_SUCCESS:
      console.log(
        "SaupGwanRi_data 불러오기 완료, Loading False",
        action.payload
      );
      return {
        ...state,
        Loading: false,
        SaupGwanRi_Data: action.payload
      };

    case ADD_SeabuSaup_Grid_REQUEST:
      console.log("SeabuSaupGwanRi_Data 요청 Loading True");
      return {
        ...state,
        SeabuSaup_Loading: true
      };
    case ADD_SeabuSaup_Grid_SUCCESS:
      console.log(
        "SeabuSaupGwanRi_Data 불러오기 완료, Loading False",
        action.payload
      );
      return {
        ...state,
        SeabuSaup_Loading: false,
        SeabuSaupGwanRi_Data: action.payload
      };

    default:
      return state;
  }
};

export default SaupGwanRi;
