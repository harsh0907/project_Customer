import React, {Component} from 'react';
import Mainscreen from './Mainscreen';
import {connect} from 'react-redux';
import {Platform, AppState} from 'react-native';
import Profile from './Details/Profile';
import History from './Details/History';
import Screen_7 from './Mainscreen/screens/screen_7';
import PushNotification from 'react-native-push-notification';
import NetConnect from './Mainscreen/component/NetConnect';
import NetInfo from '@react-native-community/netinfo';
import * as net_connect from './GlobleStates/actions/net_connect';
import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-community/async-storage';

class App extends Component {
  UNSAFE_componentWillMount() {
    PushNotification.configure({
      onRegister: function(token) {
        console.log('TOKEN:', token);
      },
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
    NetInfo.addEventListener(sta => {
      this.props.net_Change(sta.isConnected);
    });
    AppState.addEventListener('change', res => {
      if (res === 'background') {
        BackgroundTimer.setTimeout(() => {
          const op = this.props;
          const {screen_4, screen_5, screen_6, screen_3} = this.props;
          if (
            screen_3.activation ||
            screen_4.activation ||
            screen_5.activation ||
            screen_6.activation
          ) {
            op.screen_1.activation = false;
            AsyncStorage.setItem('storage_Key', JSON.stringify(op));
          } else {
            op.screen_1.activation = true;
            op.screen_2.activation = false;
            op.screen_3.activation = false;
            op.history.change = 0;
            op.profile.change = 0;
            op.combine.change = 'mainscreen';
            op.combine.bufferchange = 'mainscreen';
            op.screen_2.change = 0;
            op.screen_2.error = 0;
            AsyncStorage.setItem('storage_Key', JSON.stringify(op));
          }
        }, 1);
      }
    });
  }

  render() {
    return (
      <>
        <NetConnect />
        {this.props.combine.change === 'mainscreen' ? <Mainscreen /> : <></>}
        {this.props.combine.change === 'profile' ? <Profile /> : <></>}
        {this.props.combine.change === 'history' ? <History /> : <></>}
        {this.props.screen_7.activation ? <Screen_7 /> : <></>}
      </>
    );
  }
}

export default connect(
  state => state,
  net_connect,
)(App);
