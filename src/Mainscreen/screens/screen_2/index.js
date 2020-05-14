/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  BackHandler,
} from 'react-native';
import isEmail from 'validator/lib/isEmail';
import isByteLength from 'validator/lib/isByteLength';
import {connect} from 'react-redux';
import * as screen_2 from '../../../GlobleStates/actions/screen_2';
import * as screen_3 from '../../../GlobleStates/actions/screen_3';
import * as screen_7 from '../../../GlobleStates/actions/screen_7';
import * as combine from '../../../GlobleStates/actions/combine';

import axios from 'axios';

class Screen_2 extends Component {
  UNSAFE_componentWillMount() {
    this.props.screen_7ChangeActivation(false);
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });
  }

  onClickListener = viewId => {
    Alert.alert('Alert', 'Button pressed ' + viewId);
  };

  onRegistor() {
    const i = this.props.screen_2.change;
    this.props.screen_2SetChange((i + 1) % 2);
    this.props.screen_2SetError(0);
  }

  onSignUp() {
    const {
      name,
      email,
      password,
      conform_password,
      mobile,
    } = this.props.screen_2;
    const {url} = this.props.important_data;
    const {screen_2SetError} = this.props;
    if (!isEmail(email)) {
      screen_2SetError(1);
      return null;
    } else if (isByteLength(password, {min: 0, max: 5})) {
      screen_2SetError(1);
      return null;
    } else if (conform_password !== password) {
      screen_2SetError(1);
      return null;
    } else if (isByteLength(mobile, {min: 0, max: 9})) {
      screen_2SetError(1);
      return null;
    } else if (name === '') {
      screen_2SetError(1);
      return null;
    }
    const uri = `${url}/cust/newuser`;
    this.props.screen_7ChangeActivation(true);
    axios({
      method: 'post',
      url: uri,
      data: {
        email,
        password,
        mobileno: mobile,
        name,
      },
    })
      .then(res => {
        this.props.screen_2Set_Id(res.data._id);
        this.props.screen_2SetChange(0);
        this.props.screen_2ChangeActivation(false);
        if (this.props.combine.bufferchange === 'profile') {
          this.props.combine_Change('profile');
        } else if (this.props.combine.bufferchange === 'history') {
          this.props.combine_Change('history');
        } else {
          this.props.screen_3ChangeActivation(true);
        }
      })
      .catch(() => {
        this.props.screen_7ChangeActivation(false);
        screen_2SetError(1);
      });
  }

  onLogin() {
    const {email, password} = this.props.screen_2;
    const {screen_2SetError} = this.props;
    const {url} = this.props.important_data;
    if (!isEmail(email)) {
      screen_2SetError(1);
      return null;
    } else if (isByteLength(password, {min: 0, max: 5})) {
      screen_2SetError(1);
      return null;
    }
    const uri = `${url}/login`;
    this.props.screen_7ChangeActivation(true);
    axios({
      method: 'post',
      url: uri,
      data: {
        email,
        password,
        type: 'cust',
      },
    })
      .then(res => {
        this.props.screen_2SetName(res.data[0].name);
        this.props.screen_2SetMobile(res.data[0].mobileno);
        this.props.screen_2Set_Id(res.data[0]._id);
        this.props.screen_2ChangeActivation(false);
        if (this.props.combine.bufferchange === 'profile') {
          this.props.combine_Change('profile');
        } else if (this.props.combine.bufferchange === 'history') {
          this.props.combine_Change('history');
        } else {
          this.props.screen_3ChangeActivation(true);
        }
      })
      .catch(() => {
        this.props.screen_7ChangeActivation(false);
        screen_2SetError(1);
      });
  }

  render() {
    const {
      screen_2SetEmail,
      screen_2SetName,
      screen_2SetPassword,
      screen_2SetMobile,
      screen_2setConform_Password,
      screen_2SetError,
    } = this.props;
    const {net} = this.props.netconnect;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.props.screen_2.error === 1 ? (
          <Text style={styles.error}>Invalid Details</Text>
        ) : (
          <View />
        )}
        <View style={[styles.inputContainer, {marginTop: 25}]}>
          <Image
            style={styles.inputIcon}
            source={require('./icons/email.png')}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => {
              screen_2SetEmail(email);
              screen_2SetError(0);
            }}
          />
        </View>

        {this.props.screen_2.change === 1 ? (
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require('./icons/user.png')}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Full-Name"
              underlineColorAndroid="transparent"
              onChangeText={name => {
                screen_2SetName(name);
                screen_2SetError(0);
              }}
            />
          </View>
        ) : (
          <View />
        )}

        {this.props.screen_2.change === 1 ? (
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require('./icons/mobile.png')}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Mobile No."
              keyboardType="number-pad"
              underlineColorAndroid="transparent"
              onChangeText={mobile => {
                screen_2SetMobile(mobile);
                screen_2SetError(0);
              }}
            />
          </View>
        ) : (
          <View />
        )}

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require('./icons/password.png')}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => {
              screen_2SetPassword(password);
              screen_2SetError(0);
            }}
          />
        </View>

        {this.props.screen_2.change === 1 ? (
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require('./icons/password.png')}
            />
            <TextInput
              style={styles.inputs}
              secureTextEntry={true}
              placeholder="Confirm-Password"
              underlineColorAndroid="transparent"
              onChangeText={conform_password => {
                screen_2setConform_Password(conform_password);
                screen_2SetError(0);
              }}
            />
          </View>
        ) : (
          <View />
        )}

        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => {
            !net
              ? {}
              : this.props.screen_2.change === 1
              ? this.onSignUp()
              : this.onLogin();
          }}>
          <Text style={styles.loginText}>
            {this.props.screen_2.change === 1 ? 'Sign Up' : 'Log In'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => (!net ? {} : this.onRegistor())}>
          <Text style={{fontSize: 16}}>
            {this.props.screen_2.change === 1 ? 'Log In' : 'Register'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  error: {marginBottom: 20, color: 'red', fontSize: 16},
  container: {
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 40,
    elevation: 20,
  },
  inputContainer: {
    borderColor: '#00b5ec',
    backgroundColor: '#DCDCDC',
    borderBottomWidth: 2,
    width: 250,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    backgroundColor: '#DCDCDC',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
    backgroundColor: '#DCDCDC',
    marginRight: 10,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
    marginTop: 18,
  },
  loginText: {
    color: 'white',
  },
});

export default connect(
  state => state,
  {...screen_2, ...{...screen_3, ...screen_7, ...combine}},
)(Screen_2);
