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
  exp: null,
  location: {},
  phone: null,
  photo: null,
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
    case "SET_LOCATION":
      return {
        ...state,
        location: action.payload,
      };
    case "SET_PHONE":
      return {
        ...state,
        phone: action.payload,
      };
    case "SET_PHOTO":
      return {
        ...state,
        photo: action.payload,
      };
    case "SET_INFORMATION":
      return {
        ...state,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        password: action.payload.password,
      };
    case 'SET_EMAIL':
      return {
        ...state,
        password: action.payload.password,
        email: action.payload.email
      }
    default:
      return state;
  }
};
