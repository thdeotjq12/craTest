export const ComeCheckDetail_REQUEST =
  "ComeCheckDetail/ComeCheckDetail_REQUEST";
export const ComeCheckDetail_AFT_REQUEST =
  "ComeCheckDetail/ComeCheckDetail_AFT_REQUEST";
export const ComeCheckDetail_BFR_REQUEST =
  "ComeCheckDetail/ComeCheckDetail_BFR_REQUEST";
export const ComeCheckDetail_SUCCESS =
  "ComeCheckDetail/ComeCheckDetail_SUCCESS";
export const ComeCheckDetail_FAILURE =
  "ComeCheckDetail/ComeCheckDetail_FAILURE";

const initalState = {
  CCDetail_Data: null, // 기본정보 데이터 리스트
  CCDetailLoading: false,
  CCDetail_AFTLoading: false,
  CCDetail_BFRLoading: false
};

const ComeCheckDetail = (state = initalState, action) => {
  switch (action.type) {
    case ComeCheckDetail_REQUEST:
      console.log("ComeCheck_REQUEST 요청 Loading True");
      return {
        ...state,
        CCDetailLoading: true
      };
    case ComeCheckDetail_AFT_REQUEST:
      console.log("ComeCheck_REQUEST 요청 Loading True");
      return {
        ...state,
        CCDetail_AFTLoading: true
      };
    case ComeCheckDetail_BFR_REQUEST:
      console.log("ComeCheck_REQUEST 요청 Loading True");
      return {
        ...state,
        CCDetail_BFRLoading: true
      };
    case ComeCheckDetail_SUCCESS:
      console.log("ComeCheck_SUCCESS 요청 Loading false");
      return {
        ...state,
        // CCDetail_Data: action.payload,
        CCDetailLoading: false
        // CCDetail_AFTLoading: false,
        // CCDetail_BFRLoading: false
      };

    default:
      return state;
  }
};

export default ComeCheckDetail;
