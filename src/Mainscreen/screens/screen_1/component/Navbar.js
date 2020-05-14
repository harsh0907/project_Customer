/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import * as screen_2 from '../../../../GlobleStates/actions/screen_2';
import * as screen_7 from '../../../../GlobleStates/actions/screen_7';
import * as screen_1 from '../../../../GlobleStates/actions/screen_1';
import * as combine from '../../../../GlobleStates/actions/combine';

class Location extends Component {
  onLogout() {
    const url = `${this.props.important_data.url}/logout`;
    this.props.screen_7ChangeActivation(true);
    axios({
      method: 'post',
      url,
      data: {
        _id: this.props.screen_2._id,
      },
    })
      .then(() => {
        this.props.screen_2Set_Id(null);
        this.props.screen_7ChangeActivation(false);
      })
      .catch(() => {
        this.props.screen_7ChangeActivation(false);
      });
  }

  onProfile() {
    this.props.screen_7ChangeActivation(true);
    this.props.combine_Buffer_change('profile');
    if (this.props.screen_2._id === null) {
      this.props.screen_1ChangeActivation(false);
      this.props.screen_2ChangeActivation(true);
    } else {
      this.props.combine_Change('profile');
    }
  }

  onHistory() {
    this.props.screen_7ChangeActivation(true);
    this.props.combine_Buffer_change('history');
    if (this.props.screen_2._id === null) {
      this.props.screen_1ChangeActivation(false);
      this.props.screen_2ChangeActivation(true);
    } else {
      this.props.combine_Change('history');
    }
  }

  render() {
    const {net} = this.props.netconnect;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => (net ? this.onHistory(this.props) : {})}>
          <Image
            style={[styles.icons, {marginLeft: 10}]}
            source={require('../icons/history.png')}
          />
        </TouchableOpacity>

        {this.props.screen_2._id !== null ? (
          <TouchableOpacity
            onPress={() => (net ? this.onLogout(this.props) : {})}>
            <Image style={styles.icons} source={require('../icons/quit.png')} />
          </TouchableOpacity>
        ) : (
          <View />
        )}

        <TouchableOpacity
          onPress={() => (net ? this.onProfile(this.props) : {})}>
          <Image
            style={[styles.icons, {marginRight: 10}]}
            source={require('../icons/profile.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1ABC9C',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopWidth: 2,
  },
  icons: {
    height: 50,
    width: 50,
    margin: 6,
  },
});

export default connect(
  state => state,
  {...screen_2, ...screen_7, ...combine, ...screen_1},
)(Location);
