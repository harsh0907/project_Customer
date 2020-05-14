/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {ScrollView, BackHandler} from 'react-native';
import Button from './component/Button';
import VehicleList from './component/VehicleList';
import Navbar from './component/Navbar';
import Tow from './component/Tow';
import Location from './component/Location';
import {connect} from 'react-redux';
import * as screen_7 from '../../../GlobleStates/actions/screen_7';

class Screen_1 extends Component {
  UNSAFE_componentWillMount() {
    this.props.screen_7ChangeActivation(false);
    BackHandler.addEventListener('hardwareBackPress', () =>
      BackHandler.exitApp(),
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      BackHandler.exitApp(),
    );
  }

  render() {
    return (
      <>
        <Location />
        <ScrollView style={{backgroundColor: '#A3E4D7'}}>
          <VehicleList />
          <Tow />
          <Button />
        </ScrollView>
        <Navbar />
      </>
    );
  }
}
export default connect(
  state => state,
  screen_7,
)(Screen_1);
