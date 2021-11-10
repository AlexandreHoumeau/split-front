export const initialState = {
  keyword: null,
  result: [],
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH":
      return {
        ...state,
        keyword: action.keyword,
        result: action.result,
      }
    default:
      return state;
  }
};
