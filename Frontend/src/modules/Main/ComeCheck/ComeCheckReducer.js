export const ADD_ComeCheckTot_REQUEST = "SaupGwanRi/ADD_ComeCheckTot_REQUEST";
export const ADD_ComeCheckTot_SUCCESS = "SaupGwanRi/ADD_ComeCheckTot_SUCCESS";
export const ADD_ComeCheckTot_FAILURE = "SaupGwanRi/ADD_ComeCheckTot_FAILURE";

const initalState = {
  ComeCheckTot_Data: null, // 기본정보 데이터 리스트
  ComeCheckLoading: false
};

const ComeCheck = (state = initalState, action) => {
  switch (action.type) {
    case ADD_ComeCheckTot_REQUEST:
      console.log("ComeCheck_REQUEST 요청 Loading True");
      return {
        ...state,
        ComeCheckLoading: true
      };
    case ADD_ComeCheckTot_SUCCESS:
      console.log("ComeCheck_SUCCESS 요청 Loading false");
      return {
        ...state,
        ZiwonSerch_Data: action.payload,
        ComeCheckLoading: false
      };

    default:
      return state;
  }
};

export default ComeCheck;
