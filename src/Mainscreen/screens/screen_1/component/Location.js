/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import * as screen_1 from '../../../../GlobleStates/actions/screen_1';
import * as screen_7 from '../../../../GlobleStates/actions/screen_7';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {connect} from 'react-redux';
import axios from 'axios';

class Location extends Component {
  UNSAFE_componentWillMount() {
    this.props.screen_7ChangeActivation(true);
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then(granted => {
        if (granted) {
          this.cencelCheck();
        } else {
          console.log('error');
        }
      })
      .catch(console.log);
  }

  cencelCheck() {
    var t = null;
    const request = () => {
      clearInterval(t);
      Geolocation.getCurrentPosition(
        data => {
          const {latitude, longitude} = data.coords;
          const url = `https://us1.locationiq.com/v1/reverse.php?key=d488d6c287186b&lat=${latitude}&lon=${longitude}&format=json&accept-language=%3CISO%20639-1%20Code%3E`;
          axios({method: 'get', url})
            .then(res => {
              this.props.screen_1SetLatitude(latitude);
              this.props.screen_1SetLongitude(longitude);
              this.props.screen_1SetAddress(res.data.display_name);
              this.props.screen_7ChangeActivation(false);
            })
            .catch(() => {
              t = setInterval(request, 100);
            });
        },
        () => {
          t = setInterval(request, 100);
        },
      );
    };
    var t = setInterval(request, 100);
  }

  render() {
    return (
      <View style={styles.iconcontainer}>
        <Image style={styles.icons} source={require('../icons/location.png')} />
        <ScrollView
          horizontal={true}
          contentContainerStyle={{alignItems: 'center'}}>
          <Text style={styles.location}>{this.props.screen_1.address}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  location: {
    fontSize: 20,
  },
  iconcontainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: '#1ABC9C',
  },
  icons: {
    height: 50,
    width: 40,
    marginRight: 10,
  },
});

export default connect(
  state => state,
  {...screen_1, ...screen_7},
)(Location);
