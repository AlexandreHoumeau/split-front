export const initialState = {
  step: "profile",
  profile: null,
  firstName: null,
  lastName: null,
  email: null,
  sector: null,
  details: [],
  bio: null,
  about: null,
  exp: null
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_STEP":
      return {
        ...state,
        step: action.payload,
      };
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    case "SET_SECTOR":
      return {
        ...state,
        sector: action.payload,
      };
    case "SET_DETAILS":
      return {
        ...state,
        details: action.payload,
      };
    case "SET_BIO":
      return {
        ...state,
        bio: action.payload,
      };
    case "SET_ABOUT":
      return {
        ...state,
        about: action.payload,
      };
    case "SET_EXP":
      return {
        ...state,
        exp: action.payload,
      };
    case "SET_INFORMATION":
      return {
        ...state,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        password: action.payload.password,
      };
    default:
      return state;
  }
};
