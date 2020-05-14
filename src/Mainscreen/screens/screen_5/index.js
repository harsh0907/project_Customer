/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  BackHandler,
} from 'react-native';
import * as screen_6 from '../../../GlobleStates/actions/screen_6';
import * as screen_7 from '../../../GlobleStates/actions/screen_7';
import * as screen_5 from '../../../GlobleStates/actions/screen_5';
import {connect} from 'react-redux';
import axios from 'axios';
import {notification} from '../../component/PushNotification';

class Screen_5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 0,
    };
  }

  UNSAFE_componentWillMount() {
    this.props.screen_7ChangeActivation(false);
    this.shiftCheck();
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });
  }

  shiftCheck() {
    var t = null;
    const request = () => {
      clearInterval(t);
      const url = `${this.props.important_data.url}/cust/relese`;
      axios({
        method: 'post',
        url,
        data: {
          historyid: this.props.screen_3.history_id,
        },
      })
        .then(res => {
          if (res.data[0] === 0) {
            t = setInterval(request, 1);
          } else {
            if (res.data[0] === 1) {
              notification({
                bigText: 'Please share your feedback with us',
                message: 'Press done button to complete',
                title: 'Finally Done!!',
              });
              this.setState({data: 1});
            }
          }
        })
        .catch(() => {
          t = setInterval(request, 1);
        });
    };
    var t = setInterval(request, 1);
  }

  onCencel() {
    const {net} = this.props.netconnect;
    Alert.alert(
      'Completed!!',
      'Press! Yes When Work Done ',
      [
        {text: 'Yes', onPress: () => (!net ? {} : this.onDone())},
        {
          text: 'No',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }

  onDone() {
    this.props.screen_7ChangeActivation(true);
    const url = `${this.props.important_data.url}/cust/done`;
    axios({
      method: 'post',
      url,
      data: {
        _id: this.props.screen_3.selectData._id,
      },
    })
      .then(res => {
        this.props.screen_5ChangeActivation(false);
        this.props.screen_6ChangeActivation(true);
      })
      .catch(() => {
        this.props.screen_7ChangeActivation(false);
      });
  }

  render() {
    const {data} = this.state;
    const {net} = this.props.netconnect;
    return (
      <View style={styles.container}>
        <View style={styles.maincontainer}>
          <Text style={styles.thanktext}>{data === 1 ? 'Thanks!' : ''}</Text>
          <Text style={[styles.thanktext, {fontSize: data === 1 ? 20 : 50}]}>
            {data === 1 ? 'for' : 'Repairing...'}
          </Text>
          <Text style={styles.thanktext}>{data === 1 ? 'Choose' : ''}</Text>
        </View>

        <View>
          <View style={styles.buttoncontainer}>
            <View style={styles.buttonContainer}>
              {this.state.data === 1 ? (
                <TouchableOpacity onPress={() => (!net ? {} : this.onCencel())}>
                  <Image
                    style={{width: 70, height: 70}}
                    source={require('./icons/done.png')}
                  />
                </TouchableOpacity>
              ) : (
                <ActivityIndicator size={'large'} color={'#fff'} />
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  maincontainer: {
    backgroundColor: '#CA6F1E',
    borderRadius: 30,
    shadowWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 50,
    elevation: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20,
  },
  thanktext: {
    fontSize: 20,
    color: '#fff',
  },
  buttonContainer: {
    height: 100,
    width: 100,
    backgroundColor: '#CA6F1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    shadowWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 40,
    elevation: 20,
  },
  buttoncontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  container: {
    backgroundColor: '#F5CBA7',
    justifyContent: 'space-between',
    flex: 1,
  },
};

export default connect(
  state => state,
  {...screen_7, ...screen_6, ...screen_5},
)(Screen_5);
