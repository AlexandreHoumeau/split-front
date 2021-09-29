export const setProfile = (profile) => async (dispatch) => {
  console.log(profile)
  dispatch({
    type: 'SET_PROFILE',
    payload: profile
  })
}

export const setStep = (step) => async (dispatch) => {
  console.log(step)

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

export const setSectorDetails = (details) => async (dispatch) => {
  dispatch({
    type: 'SET_DETAILS',
    payload: details
  })
}

export const setBio = (bio) => async (dispatch) => {
  dispatch({
    type: 'SET_BIO',
    payload: bio
  })
}

export const setAboutText = (about) => async (dispatch) => {
  dispatch({
    type: 'SET_ABOUT',
    payload: about
  })
}

export const setExperience = (exp) => async (dispatch) => {
  dispatch({
    type: 'SET_EXP',
    payload: exp
  })
}