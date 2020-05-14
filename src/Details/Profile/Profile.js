/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import * as profile from '../../GlobleStates/actions/profile';
import * as screen_2 from '../../GlobleStates/actions/screen_2';
import * as screen_7 from '../../GlobleStates/actions/screen_7';
import isByteLength from 'validator/lib/isByteLength';
import axios from 'axios';

class Profile extends Component {
  UNSAFE_componentWillMount() {
    const {name, mobile, password} = this.props.screen_2;
    this.props.profile_Name(name);
    this.props.profile_Password(password);
    this.props.profile_Conform_password(password);
    this.props.profile_Mobile(mobile.toString());
  }

  onUpdate() {
    const {name, password, mobile, conform_password} = this.props.profile;
    const {url} = this.props.important_data;
    const {profile_SetError, profile_Route} = this.props;
    if (isByteLength(password, {min: 0, max: 5})) {
      profile_SetError(1);
      return null;
    } else if (conform_password !== password) {
      profile_SetError(1);
      return null;
    } else if (isByteLength(mobile, {min: 0, max: 9})) {
      profile_SetError(1);
      return null;
    } else if (name === '') {
      profile_SetError(1);
      return null;
    }
    profile_Route(null);
    const uri = `${url}/cust/updateuser/${this.props.screen_2._id}`;
    this.props.screen_7ChangeActivation(true);
    axios({
      method: 'post',
      url: uri,
      data: {
        password,
        mobileno: mobile,
        name,
      },
    })
      .then(() => {
        this.props.screen_7ChangeActivation(false);
        this.props.profile_SetError(0);
        this.props.screen_2SetName(name);
        this.props.screen_2SetPassword(password);
        this.props.screen_2SetMobile(mobile);
      })
      .catch(() => {
        this.props.screen_7ChangeActivation(false);
        this.props.profile_SetError(1);
      });
  }

  render() {
    const {
      name,
      mobile,
      password,
      route,
      conform_password,
    } = this.props.profile;
    const {net} = this.props.netconnect;
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{backgroundColor: '#F3E5F5'}}>
        <View>
          <View style={styles.imagecontainer}>
            <Image style={styles.avatar} source={require('./profile.png')} />

            <TouchableOpacity
              style={{paddingBottom: 10}}
              onPress={() =>
                !net
                  ? {}
                  : this.props.profile_Route(route !== 'name' ? 'name' : null)
              }>
              {route !== 'name' ? (
                <Text style={styles.name}>{this.props.screen_2.name}</Text>
              ) : (
                <TextInput
                  style={[styles.name]}
                  placeholder="Name"
                  underlineColorAndroid="transparent"
                  value={name}
                  onChangeText={this.props.profile_Name}
                />
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            {this.props.profile.error === 1 ? (
              <Text style={{color: 'red', fontSize: 15}}>Invalid update</Text>
            ) : (
              <View />
            )}
          </View>

          <View>
            <TouchableOpacity
              style={styles.lowercontainer}
              onPress={() =>
                !net
                  ? {}
                  : this.props.profile_Route(
                      route !== 'mobile' ? 'mobile' : null,
                    )
              }>
              {route !== 'mobile' ? (
                <Text style={styles.lowertext}>
                  {this.props.screen_2.mobile}
                </Text>
              ) : (
                <TextInput
                  style={[styles.inputs]}
                  placeholder="Mobile No."
                  keyboardType="number-pad"
                  underlineColorAndroid="transparent"
                  value={mobile.toString()}
                  onChangeText={this.props.profile_Mobile}
                />
              )}
            </TouchableOpacity>

            <View style={styles.lowercontainer}>
              <Text style={styles.lowertext}>{this.props.screen_2.email}</Text>
            </View>

            <TouchableOpacity
              style={styles.lowercontainer}
              onPress={() =>
                !net
                  ? {}
                  : this.props.profile_Route(
                      route !== 'password' ? 'password' : null,
                    )
              }>
              {route !== 'password' ? (
                <Text style={styles.lowertext}>*********</Text>
              ) : (
                <View>
                  <TextInput
                    style={[styles.inputs, {marginBottom: 7}]}
                    placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                    value={password}
                    onChangeText={this.props.profile_Password}
                  />
                  <TextInput
                    style={[styles.inputs]}
                    placeholder="conform_Password"
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                    value={conform_password}
                    onChangeText={this.props.profile_Conform_password}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        {route !== null ? (
          <View>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}
              onPress={!net ? {} : () => this.onUpdate()}>
              <View style={styles.updatecontainer}>
                <Text style={styles.updatetext}>Update</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  inputs: {
    fontSize: 18,
  },
  imagecontainer: {
    backgroundColor: '#CE93D8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 40,
    elevation: 20,
  },
  name: {
    fontSize: 38,
  },
  lowercontainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  lowertext: {
    fontSize: 18,
  },
  updatecontainer: {
    width: 150,
    height: 60,
    backgroundColor: '#B39DDB',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 40,
    elevation: 20,
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: 70,
    marginTop: 90,
  },
  updatetext: {
    fontSize: 20,
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  body: {
    backgroundColor: '#778899',
    height: 500,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: '#FFFFFF',
  },
});

export default connect(
  state => state,
  {...profile, ...screen_2, ...screen_7},
)(Profile);
