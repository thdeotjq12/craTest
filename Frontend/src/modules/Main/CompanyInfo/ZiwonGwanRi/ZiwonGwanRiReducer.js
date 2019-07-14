// 지원자 검색 클릭 그리드 정보
export const ADD_ZiwonSerch_Grid_REQUEST = "SaupGwanRi/ADD_Saup_Grid_REQUEST";
export const ADD_ZiwonSerch_Grid_SUCCESS = "SaupGwanRi/ADD_Saup_Grid_SUCCESS";
export const ADD_ZiwonSerch_Grid_FAILURE = "SaupGwanRi/ADD_Saup_Grid_FAILURE";

const initalState = {
  ZiwonSerch_Data: null, // 기본정보 데이터 리스트
  Loading: false
};

const ZiwonGwanRi = (state = initalState, action) => {
  switch (action.type) {
    case ADD_ZiwonSerch_Grid_REQUEST:
      console.log("ADD_ZiwonSerch_Grid_REQUEST 요청 Loading True");
      return {
        ...state,
        Loading: true
      };
    case ADD_ZiwonSerch_Grid_SUCCESS:
      console.log("ADD_ZiwonSerch_Grid_SUCCESS 요청 Loading True");
      return {
        ...state,
        ZiwonSerch_Data: action.payload,
        Loading: false
      };

    default:
      return state;
  }
};

export default ZiwonGwanRi;
