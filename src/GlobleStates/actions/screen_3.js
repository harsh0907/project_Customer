export const screen_3SetData = data => {
  return {
    type: 'screen_3setData',
    payload: data,
  };
};

export const screen_3SelectData = select => {
  return {
    type: 'screen_3selectData',
    payload: select,
  };
};

export const screen_3ChangeActivation = activation => {
  return {
    type: 'screen_3changeActivation',
    payload: activation,
  };
};

export const screen_3SetEmpty = empty => {
  return {
    type: 'screen_3setEmpty',
    payload: empty,
  };
};

export const screen_3SetHistory_id = empty => {
  return {
    type: 'screen_3setHistory_id',
    payload: empty,
  };
};

export const screen_3SetRefresh = ref => {
  return {
    type: 'screen_3setRefresh',
    payload: ref,
  };
};
