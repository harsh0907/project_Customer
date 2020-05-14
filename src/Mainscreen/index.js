import React from 'react';
import Screen_1 from './screens/screen_1';
import Screen_2 from './screens/screen_2';
import Screen_3 from './screens/screen_3';
import Screen_4 from './screens/screen_4';
import Screen_5 from './screens/screen_5';
import Screen_6 from './screens/screen_6';
import {connect} from 'react-redux';

const Mainscreen = props => {
  const {screen_1, screen_2, screen_3, screen_4, screen_5, screen_6} = props;
  return (
    <>
      {screen_1.activation ? <Screen_1 /> : <></>}
      {screen_2.activation ? <Screen_2 /> : <></>}
      {screen_3.activation ? <Screen_3 /> : <></>}
      {screen_4.activation ? <Screen_4 /> : <></>}
      {screen_5.activation ? <Screen_5 /> : <></>}
      {screen_6.activation ? <Screen_6 /> : <></>}
    </>
  );
};

export default connect(state => state)(Mainscreen);
