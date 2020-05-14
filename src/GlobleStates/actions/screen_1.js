export const screen_1TowChange = tow => {
  return {
    type: 'screen_1TowChange',
    payload: tow,
  };
};

export const screen_1SelectVehicleType = type => {
  return {
    type: 'screen_1selectVehicleType',
    payload: type,
  };
};

export const screen_1ChangeActivation = activation => {
  return {
    type: 'screen_1changeActivation',
    payload: activation,
  };
};

export const screen_1SetLatitude = latitude => {
  return {
    type: 'screen_1setLatitude',
    payload: latitude,
  };
};

export const screen_1SetLongitude = longitude => {
  return {
    type: 'screen_1setLongitude',
    payload: longitude,
  };
};

export const screen_1SetAddress = add => {
  return {
    type: 'screen_1setAddress',
    payload: add,
  };
};
