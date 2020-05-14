const initial_value = {
  name: null,
  password: null,
  mobile: null,
  route: null,
  conform_password: null,
  error: 0,
  error1: 0,
  change: 0,
};

export default (state = initial_value, action) => {
  switch (action.type) {
    case 'profile_Name':
      return {...state, name: action.payload, error: 0};
    case 'profile_Password':
      return {...state, password: action.payload, error: 0};
    case 'profile_Mobile':
      return {...state, mobile: action.payload, error: 0};
    case 'profile_Route':
      return {...state, route: action.payload};
    case 'profile_Conform_password':
      return {...state, conform_password: action.payload, error: 0};
    case 'profile_Error':
      return {...state, error: action.payload};
    case 'profile_Error1':
      return {...state, error1: action.payload};
    case 'profile_Change':
      return {...state, change: action.payload};
    default:
      return state;
  }
};
