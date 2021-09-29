const initialState = {
  isLoading: false,
  errors: null
}

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    // case 'SET_ERRORS':
    //   return {
    //     ...state,
    //     isLoading: false,
    //     errors: action.payload
    //   }

    // case 'CLEAR_ERRORS':
    //   return {
    //     ...state,
    //     isLoading: false,
    //     errors: null
    //   }

    case 'LOADING_UI':
      return {
        ...state,
        isLoading: true
      }

    default:
      return state
  }
}