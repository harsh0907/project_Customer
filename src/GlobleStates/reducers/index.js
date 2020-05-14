import {combineReducers} from 'redux';
import screen_1Reducer from './screen_1Reducer';
import screen_2Reducer from './screen_2Reducer';
import screen_3Reducer from './screen_3Reducer';
import screen_4Reducer from './screen_4Reducer';
import screen_5Reducer from './screen_5Reducer';
import screen_6Reducer from './screen_6Reducer';
import screen_7Reducer from './screen_7Reducer';
import important_Data from './important_Data';
import profile_Reducer from '../reducers/profile_Reducer';
import combine_Reducer from '../reducers/combine_Reducer';
import history_Reducer from '../reducers/history_Reducer';
import netconnect_Reducer from '../reducers/netconnect_Reducer';

export default combineReducers({
  important_data: important_Data,
  screen_1: screen_1Reducer,
  screen_2: screen_2Reducer,
  screen_3: screen_3Reducer,
  screen_4: screen_4Reducer,
  screen_5: screen_5Reducer,
  screen_6: screen_6Reducer,
  screen_7: screen_7Reducer,
  profile: profile_Reducer,
  combine: combine_Reducer,
  history: history_Reducer,
  netconnect: netconnect_Reducer,
});
