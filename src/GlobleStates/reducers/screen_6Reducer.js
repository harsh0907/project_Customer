const initial_value = {
  activation: false,
};

export default (state = initial_value, action) => {
  switch (action.type) {
    case 'screen_6changeActivation':
      return {...state, activation: action.payload};
    default:
      return state;
  }
};
