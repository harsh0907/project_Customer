const initial_value = {
  activation: false,
};

export default (state = initial_value, action) => {
  switch (action.type) {
    case 'screen_5changeActivation':
      return {...state, activation: action.payload};
    default:
      return state;
  }
};
