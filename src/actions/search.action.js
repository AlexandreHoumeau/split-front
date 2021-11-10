export const setSearch = (search) => async (dispatch) => {
  dispatch({
    type: 'SET_SEARCH',
    keyword: search.keyword,
    result: search.result
  })
}