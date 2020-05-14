export const profile_Name = name => {
  return {
    type: 'profile_Name',
    payload: name,
  };
};

export const profile_Password = password => {
  return {
    type: 'profile_Password',
    payload: password,
  };
};

export const profile_Mobile = number => {
  return {
    type: 'profile_Mobile',
    payload: number,
  };
};

export const profile_Route = route => {
  return {
    type: 'profile_Route',
    payload: route,
  };
};

export const profile_Conform_password = confrom => {
  return {
    type: 'profile_Conform_password',
    payload: confrom,
  };
};
export const profile_SetError = error => {
  return {
    type: 'profile_Error',
    payload: error,
  };
};

export const profile_SetError1 = error => {
  return {
    type: 'profile_Error',
    payload: error,
  };
};

export const profile_Change = change => {
  return {
    type: 'profile_Change',
    payload: change,
  };
};
