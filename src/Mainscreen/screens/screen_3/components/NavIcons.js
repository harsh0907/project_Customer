/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';
import * as screen_1 from '../../../../GlobleStates/actions/screen_1';
import * as screen_7 from '../../../../GlobleStates/actions/screen_7';
import * as screen_3 from '../../../../GlobleStates/actions/screen_3';

class NavIcon extends Component {
  oncallAgain(type, toe) {
    this.props.screen_1SelectVehicleType(type);
    const {latitude, longitude} = this.props.screen_1;
    const url = `${this.props.important_data.url}/cust/mechalist`;
    this.props.screen_7ChangeActivation(true);
    axios({
      method: 'post',
      url,
      data: {
        toe,
        latitude,
        longitude,
        type,
      },
    })
      .then(res => {
        const op = res.data.sort(function(a, b) {
          return a.distance - b.distance;
        });
        this.props.screen_3SetData(op);
        this.props.screen_7ChangeActivation(false);
      })
      .catch(() => {
        this.props.screen_7ChangeActivation(false);
      });
  }

  render() {
    const {vehicleType, tow} = this.props.screen_1;
    const {screen_1TowChange} = this.props;
    const {net} = this.props.netconnect;
    return (
      <ScrollView
        horizontal={true}
        style={{
          backgroundColor: '#7DCEA0',
          borderBottomWidth: 2,
          height: 70,
          marginBottom: 10,
        }}>
        <TouchableOpacity
          style={[
            {
              backgroundColor: vehicleType === 'car' ? '#148F77' : '#7DCEA0',
              borderRadius: 40,
            },
            styles.navIcon,
          ]}
          onPress={() => (!net ? {} : this.oncallAgain('car', tow))}>
          <Image
            style={{height: 50, width: 50}}
            source={require('../../screen_1/icons/car.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              backgroundColor: vehicleType === 'bike' ? '#148F77' : '#7DCEA0',
              borderRadius: 40,
            },
            styles.navIcon,
          ]}
          onPress={() => (!net ? {} : this.oncallAgain('bike', tow))}>
          <Image
            style={{height: 50, width: 50}}
            source={require('../../screen_1/icons/bike.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              backgroundColor: vehicleType === 'bus' ? '#148F77' : '#7DCEA0',
              borderRadius: 40,
            },
            styles.navIcon,
          ]}
          onPress={() => (!net ? {} : this.oncallAgain('bus', tow))}>
          <Image
            style={{height: 50, width: 50}}
            source={require('../../screen_1/icons/bus.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              backgroundColor: vehicleType === 'truck' ? '#148F77' : '#7DCEA0',
              borderRadius: 40,
            },
            styles.navIcon,
          ]}
          onPress={() => (!net ? {} : this.oncallAgain('truck', tow))}>
          <Image
            style={{height: 50, width: 50}}
            source={require('../../screen_1/icons/truck.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              backgroundColor: vehicleType === 'tacter' ? '#148F77' : '#7DCEA0',
              borderRadius: 40,
            },
            styles.navIcon,
          ]}
          onPress={() => (!net ? {} : this.oncallAgain('tacter', tow))}>
          <Image
            style={{height: 50, width: 50}}
            source={require('../../screen_1/icons/tacter.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              backgroundColor: vehicleType === 'autoer' ? '#148F77' : '#7DCEA0',
              borderRadius: 40,
            },
            styles.navIcon,
          ]}
          onPress={() => (!net ? {} : this.oncallAgain('autoer', tow))}>
          <Image
            style={{height: 50, width: 50}}
            source={require('../../screen_1/icons/rickshow.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              backgroundColor: tow === 1 ? '#148F77' : '#7DCEA0',
              borderRadius: 40,
            },
            styles.navIcon,
          ]}
          onPress={() => {
            !net ? {} : screen_1TowChange((tow + 1) % 2);
            !net ? {} : this.oncallAgain(vehicleType, (tow + 1) % 2);
          }}>
          <Image
            style={{height: 50, width: 50}}
            source={require('../../screen_1/icons/hook.png')}
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 3,
    backgroundColor: '#00ff00',
    height: 30,
  },
  navIcon: {
    height: 50,
    width: 50,
    marginLeft: 10,
  },
});

export default connect(
  state => state,
  {...screen_1, ...screen_3, ...screen_7},
)(NavIcon);
