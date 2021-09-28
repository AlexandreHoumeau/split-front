export const setProfile = (profile) => async (dispatch) => {
  console.log(profile)
  dispatch({
    type: 'SET_PROFILE',
    payload: profile
  })
}

export const setStep = (step) => async (dispatch) => {
  dispatch({
    type: 'SET_STEP',
    payload: step
  })
}

export const setInformation = (user) => async (dispatch) => {
  dispatch({
    type: 'SET_INFORMATION',
    payload: user
  })
}

export const setSector = (sector) => async (dispatch) => {
  dispatch({
    type: 'SET_SECTOR',
    payload: sector
  })
}