/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {Rating} from 'react-native-elements';
import * as screen_6 from '../../../GlobleStates/actions/screen_6';
import * as screen_7 from '../../../GlobleStates/actions/screen_7';
import * as screen_1 from '../../../GlobleStates/actions/screen_1';
import {connect} from 'react-redux';
import axios from 'axios';

class Screen_6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: 2.5,
    };
  }

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

  feedback() {
    this.props.screen_7ChangeActivation(true);
    const url = `${this.props.important_data.url}/cust/feedback`;
    axios({
      method: 'post',
      url,
      data: {
        historyid: this.props.screen_3.history_id,
        _id: this.props.screen_3.selectData._id,
        rating: this.state.data1,
      },
    })
      .then(() => {
        this.props.screen_6ChangeActivation(false);
        this.props.screen_1ChangeActivation(true);
      })
      .catch(() => {
        this.props.screen_7ChangeActivation(false);
      });
  }

  render() {
    const {net} = this.props.netconnect;
    return (
      <View style={styles.maincontainer}>
        <View style={styles.textcontainer}>
          <View>
            <Text style={styles.toptext}>Thank You</Text>
          </View>
          <Rating
            showRating
            fractions={1}
            ratingTextColor="#fff"
            onFinishRating={rat => this.setState({data1: rat})}
            style={{paddingVertical: 10, backgroundColor: '#FF7043'}}
          />
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => (!net ? {} : this.feedback())}>
          <View style={styles.buttoncontainer}>
            <Text style={styles.button}>FeedBack</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  maincontainer: {
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#FFCCBC',
  },
  buttoncontainer: {
    width: 200,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    borderRadius: 30,
    shadowRadius: 20,
    elevation: 12,
  },
  button: {
    fontSize: 25,
    paddingTop: 15,
    color: '#fff',
  },
  textcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7043',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    borderRadius: 30,
    shadowRadius: 20,
    elevation: 12,
  },
  container: {
    backgroundColor: '#0000ff',
    height: null,
    justifyContent: 'space-between',
  },
  toptext: {
    fontSize: 45,
    paddingTop: 20,
    paddingBottom: 20,
    color: '#fff',
  },
  formContent: {
    flexDirection: 'row',
    marginTop: 30,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  card: {
    height: null,
    paddingBottom: 10,
    marginTop: 2,
    flexDirection: 'column',
    borderTopWidth: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    borderRadius: 30,
    shadowRadius: 20,
    elevation: 12,
  },
  cardContent: {
    flexDirection: 'row',
  },
  imageContent: {
    marginTop: -40,
  },
  tagsContent: {
    marginTop: 10,
    flexWrap: 'wrap',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    alignSelf: 'center',
    color: '#000',
  },
  btnColor: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: '#FFFDD0',
    marginTop: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  tagText: {
    fontSize: 15,
  },
});

export default connect(
  state => state,
  {...screen_1, ...screen_6, ...screen_7},
)(Screen_6);
