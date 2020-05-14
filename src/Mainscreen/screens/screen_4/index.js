/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
  BackHandler,
} from 'react-native';
import {length, time} from 'units-converter';
import {connect} from 'react-redux';
import * as screen_7 from '../../../GlobleStates/actions/screen_7';
import * as screen_5 from '../../../GlobleStates/actions/screen_5';
import * as screen_1 from '../../../GlobleStates/actions/screen_1';
import * as screen_4 from '../../../GlobleStates/actions/screen_4';
import {notification} from '../../component/PushNotification';
import axios from 'axios';

class Screen_4 extends Component {
  UNSAFE_componentWillMount() {
    this.props.screen_7ChangeActivation(false);
    this.cencelCheck();
    this.props.screen_4Timer(true);
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });
  }

  cencelCheck() {
    var t = null;
    const request = () => {
      clearInterval(t);
      const url = `${this.props.important_data.url}/cust/checkpoint`;
      axios({
        method: 'post',
        url,
        data: {
          historyid: this.props.screen_3.history_id,
        },
      })
        .then(res => {
          if (res.data[0] === 0 && this.props.screen_4.timer) {
            t = setInterval(request, 1);
          } else {
            if (res.data[0] === 1) {
              this.props.screen_7ChangeActivation(true);
              this.props.screen_4ChangeActivation(false);
              this.props.screen_5ChangeActivation(true);
            }
          }
        })
        .catch(() => {
          t = setInterval(request, 1);
        });
    };
    var t = setInterval(request, 1);
  }

  onNext() {
    this.props.screen_7ChangeActivation(true);
    const url = `${this.props.important_data.url}/cust/cencel`;
    axios({
      method: 'post',
      url,
      data: {
        _id: this.props.screen_3.selectData._id,
      },
    })
      .then(res => {
        notification({
          bigText: '',
          message: 'You cancel request',
          title: 'Canceled',
        });
        this.props.screen_4Timer(false);
        this.props.screen_1ChangeActivation(true);
        this.props.screen_4ChangeActivation(false);
      })
      .catch(() => {
        this.props.screen_7ChangeActivation(false);
      });
  }

  onCencel() {
    const {net} = this.props.netconnect;
    Alert.alert(
      'Alert!!',
      'Do You Want To Cencel To Mechanic',
      [
        {text: 'Yes', onPress: () => (!net ? {} : this.onNext())},
        {
          text: 'No',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    const {net} = this.props.netconnect;
    const {email, distance, name, mobileno} = this.props.screen_3.selectData;
    const ti = time(this.props.screen_3.selectData.time || 500)
      .from('s')
      .toBest();
    const di = length(distance || 100)
      .from('m')
      .toBest();
    var tir = Math.round(ti.value * 10) / 10;
    var dir = Math.round(di.value * 10) / 10;
    ti.unit = ti.value === 0 ? 'min' : ti.unit;
    di.unit = di.value === 0 ? 'm' : di.unit;
    return (
      <View style={styles.container}>
        <View style={styles.maincontainer}>
          <View style={styles.Toptopbarcontainer}>
            <View>
              <Text
                style={styles.Toptopbarcontainertext}>{`Name: ${name}`}</Text>
            </View>
            <TouchableOpacity
              onPress={() => Linking.openURL(`mailto:${email}`)}>
              <Text
                style={
                  styles.Toptopbarcontainertext
                }>{`Email-Id: ${email}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${mobileno}`);
              }}>
              <Text
                style={
                  styles.Toptopbarcontainertext
                }>{`Mobile No. ${mobileno}`}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.Topbottombarcontainer}>
            <View style={styles.bottomleftcontainer}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.distext}>Distance</Text>
                <Text style={styles.distext}>{`(${di.unit})`}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.numtext}>{`${dir}`}</Text>
              </View>
            </View>
            <View style={styles.bottomRightcontainer}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={[styles.distext]}>Time</Text>
                <Text style={[styles.distext]}>{`(${ti.unit})`}</Text>
              </View>

              <View style={{alignItems: 'center'}}>
                <Text style={styles.numtext}>{`${tir}`}</Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={styles.buttoncontainer}
            onPress={() => (!net ? {} : this.onCencel())}>
            <View style={styles.buttonContainer}>
              <Image
                style={{width: 50, height: 50}}
                source={require('./icons/arrow.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  maincontainer: {
    shadowWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    borderRadius: 30,
    shadowRadius: 50,
    backgroundColor: '#E59866',
    elevation: 20,
  },
  buttonContainer: {
    height: 100,
    width: 100,
    backgroundColor: '#E59866',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  buttoncontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  container: {
    backgroundColor: '#F6DDCC',
    justifyContent: 'space-between',
    flex: 1,
  },
  waitcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  waittext: {
    fontSize: 90,
  },
  Toptopbarcontainer: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
  },
  Toptopbarcontainertext: {
    fontSize: 20,
    paddingBottom: 2,
    borderBottomWidth: 2,
    fontWeight: 'bold',
  },
  Topbottombarcontainer: {
    justifyContent: 'center',
  },
  bottomleftcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  distext: {
    fontSize: 25,
    alignItems: 'center',
  },
  bottomRightcontainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  numtext: {
    fontSize: 70,
  },
};

export default connect(
  state => state,
  {...screen_5, ...screen_7, ...screen_1, ...screen_4},
)(Screen_4);
