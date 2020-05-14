const initial_value = {
  activation: false,
  email: '',
  password: '',
  name: '',
  mobile: '',
  conform_password: '',
  change: 0,
  error: 0,
  _id: null, //null replace
};

export default (state = initial_value, action) => {
  switch (action.type) {
    case 'screen_2setEmail':
      return {...state, email: action.payload};
    case 'screen_2setName':
      return {...state, name: action.payload};
    case 'screen_2setPassword':
      return {...state, password: action.payload};
    case 'screen_2setConform_Password':
      return {...state, conform_password: action.payload};
    case 'screen_2setError':
      return {...state, error: action.payload};
    case 'screen_2setChange':
      return {...state, change: action.payload};
    case 'screen_2setMobile':
      return {...state, mobile: action.payload};
    case 'screen_2changeActivation':
      return {...state, activation: action.payload};
    case 'screen_2set_id':
      return {...state, _id: action.payload};
    default:
      return state;
  }
};
