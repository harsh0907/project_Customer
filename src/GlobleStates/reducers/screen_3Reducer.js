//const data = require('./testdata');
const initial_value = {
  activation: false,
  data: [],
  selectData: null,
  empty: false,
  history_id: '',
  refresh: false,
};

export default (state = initial_value, action) => {
  switch (action.type) {
    case 'screen_3setData':
      return {...state, data: action.payload};
    case 'screen_3selectData':
      return {...state, selectData: action.payload};
    case 'screen_3changeActivation':
      return {...state, activation: action.payload};
    case 'screen_3setEmpty':
      return {...state, empty: action.payload};
    case 'screen_3setHistory_id':
      return {...state, history_id: action.payload};
    case 'screen_3setRefresh':
      return {...state, refresh: action.payload};
    default:
      return state;
  }
};
