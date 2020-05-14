import React, {Component} from 'react';
import Password from './Password';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
import History from './History';
import * as screen_7 from '../../GlobleStates/actions/screen_7';
import * as combine from '../../GlobleStates/actions/combine';
import * as profile from '../../GlobleStates/actions/profile';
import * as screen_1 from '../../GlobleStates/actions/screen_1';

class Index extends Component {
  UNSAFE_componentWillMount() {
    this.props.screen_7ChangeActivation(false);
    BackHandler.addEventListener('hardwareBackPress', () => this.back());
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.back());
  }

  back() {
    this.props.combine_Change('mainscreen');
    this.props.combine_Buffer_change('mainscreen');
    this.props.screen_1ChangeActivation(true);
    this.props.profile_Change(0);
    return true;
  }
  render() {
    return (
      <>
        <History />
      </>
    );
  }
}

export default connect(
  state => state,
  {...screen_7, ...combine, ...profile, ...screen_1},
)(Index);
