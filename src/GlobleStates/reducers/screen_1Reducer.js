const initial_value = {
  activation: true,
  vehicleType: null,
  tow: 0,
  latitude: null,
  longitude: null,
  address: null,
};

export default (state = initial_value, action) => {
  switch (action.type) {
    case 'screen_1TowChange':
      return {...state, tow: action.payload};
    case 'screen_1selectVehicleType':
      return {...state, vehicleType: action.payload};
    case 'screen_1setLatitude':
      return {...state, latitude: action.payload};
    case 'screen_1setLongitude':
      return {...state, longitude: action.payload};
    case 'screen_1changeActivation':
      return {...state, activation: action.payload};
    case 'screen_1setAddress':
      return {...state, address: action.payload};
    default:
      return state;
  }
};
