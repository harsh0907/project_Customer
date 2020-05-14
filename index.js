/* eslint-disable react-native/no-inline-styles */
import {AppRegistry, View} from 'react-native';
import App from './src/App';
import React, {Component} from 'react';
import {name as appName} from './app.json';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './src/GlobleStates/reducers';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

class pro extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      change: 0,
    };
  }
  UNSAFE_componentWillMount() {
    this.renderItem();
  }

  renderItem() {
    const op = {
      combine: {bufferchange: 'mainscreen', change: 'mainscreen'},
      history: {change: 0},
      important_data: {
        url: 'http://3.7.80.236:3000',
      },
      netconnect: {
        net: false,
      },
      profile: {
        change: 0,
        conform_password: null,
        error: 0,
        error1: 0,
        mobile: null,
        name: null,
        password: null,
        route: null,
      },
      screen_1: {
        activation: true,
        address: '',
        latitude: null,
        longitude: null,
        tow: 0,
        vehicleType: null,
      },
      screen_2: {
        activation: false,
        change: 0,
        conform_password: '',
        email: '',
        error: 0,
        mobile: '',
        name: '',
        password: '',
        _id: null,
      },
      screen_3: {
        activation: false,
        data: [],
        empty: false,
        history_id: '',
        refresh: false,
        selectData: null,
      },
      screen_4: {
        activation: false,
        timer: true,
      },
      screen_5: {
        activation: false,
      },
      screen_6: {
        activation: false,
      },
      screen_7: {
        activation: false,
      },
    };

    const storeData = async () => {
      const item = await AsyncStorage.getItem('storage_Key');
      if (item === null) {
        await AsyncStorage.setItem('storage_Key', JSON.stringify(op));
        this.setState({data: op});
      } else {
        this.setState({data: JSON.parse(item)});
      }
      return 1;
    };
    storeData().then(() => this.setState({change: 1}));
  }

  render() {
    return (
      <>
        {this.state.change === 0 ? (
          <View style={{flex: 1, backgroundColor: '#ABEBC6'}}>
            <Spinner
              visible={true}
              textContent={'   Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
          </View>
        ) : (
          <Provider store={createStore(reducers, this.state.data)}>
            <App />
          </Provider>
        )}
      </>
    );
  }
}

const styles = {
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
};

AppRegistry.registerComponent(appName, () => pro);
