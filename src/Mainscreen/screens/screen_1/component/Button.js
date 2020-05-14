/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import {connect} from 'react-redux';
import * as screen_1 from '../../../../GlobleStates/actions/screen_1';
import * as screen_2 from '../../../../GlobleStates/actions/screen_2';
import * as screen_3 from '../../../../GlobleStates/actions/screen_3';
import * as screen_7 from '../../../../GlobleStates/actions/screen_7';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

class Button extends Component {
  changeScreen() {
    if (this.props.screen_1.vehicleType !== null) {
      this.props.screen_1ChangeActivation(false);
      if (this.props.screen_2._id === null) {
        this.props.screen_7ChangeActivation(true);
        this.props.screen_2ChangeActivation(true);
      } else {
        this.props.screen_3ChangeActivation(true);
        this.props.screen_7ChangeActivation(true);
      }
    }
  }

  onLocation() {
    this.props.screen_7ChangeActivation(true);
    Geolocation.getCurrentPosition(data => {
      const {latitude, longitude} = data.coords;
      const url = `https://us1.locationiq.com/v1/reverse.php?key=d488d6c287186b&lat=${latitude}&lon=${longitude}&format=json&accept-language=%3CISO%20639-1%20Code%3E`;
      axios({method: 'get', url})
        .then(res => {
          this.props.screen_1SetLatitude(28.63491);
          this.props.screen_1SetLongitude(77.213528);
          this.props.screen_1SetAddress(res.data.display_name);
          this.props.screen_7ChangeActivation(false);
        })
        .catch(() => {
          this.props.screen_7ChangeActivation(false);
        });
    });
  }

  render() {
    const {buttonContainer} = style;
    const {latitude, longitude} = this.props.screen_1;
    const {net} = this.props.netconnect;
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 70,
          backgroundColor: '#A3E4D7',
        }}>
        <TouchableOpacity
          onPress={() => {
            !net
              ? {}
              : latitude !== null && longitude !== null
              ? this.changeScreen()
              : this.onLocation();
          }}
          style={buttonContainer}>
          <Image
            style={style.buttonImage}
            source={require('../icons/search.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const style = {
  buttonImage: {
    height: 60,
    width: 60,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#17A589',
    borderRadius: 60,
    width: 120,
  },
};

export default connect(
  state => state,
  {...screen_1, ...screen_2, ...screen_3, ...screen_7},
)(Button);
