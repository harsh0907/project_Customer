/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  BackHandler,
  NativeModules,
} from 'react-native';
import NavIcons from './components/NavIcons';
import {connect} from 'react-redux';
import * as screen_3 from '../../../GlobleStates/actions/screen_3';
import * as screen_7 from '../../../GlobleStates/actions/screen_7';
import * as screen_4 from '../../../GlobleStates/actions/screen_4';
import * as screen_1 from '../../../GlobleStates/actions/screen_1';
import {notification} from '../../component/PushNotification';
import {length, time} from 'units-converter';
import axios from 'axios';

const UPI = NativeModules.UPI;

class Screen_3 extends Component {
  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.back());
    this.ontakeData();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.back());
  }

  back() {
    this.props.screen_3ChangeActivation(false);
    this.props.screen_1ChangeActivation(true);
    return true;
  }

  ontakeData() {
    const {tow, vehicleType, latitude, longitude} = this.props.screen_1;
    const url = `${this.props.important_data.url}/cust/mechalist`;
    this.props.screen_7ChangeActivation(true);
    axios({
      method: 'post',
      url,
      data: {
        toe: tow,
        latitude,
        longitude,
        type: vehicleType,
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

  renderTags = item => {
    const ti = time(item.time)
      .from('s')
      .toBest();
    const di = length(item.distance)
      .from('m')
      .toBest();
    var tir = Math.round(ti.value * 10) / 10;
    var dir = Math.round(di.value * 10) / 10;
    ti.unit = ti.value === 0 ? 'min' : ti.unit;
    di.unit = di.value === 0 ? 'm' : di.unit;
    const rating = Math.round(item.rating * 10) / 10;

    return (
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
        }}>
        <View style={styles.btnColor}>
          <Image
            source={require('./iconsImage/rupee.png')}
            style={styles.tagIcon}
          />
          <Text style={styles.tagText}>{` ${item.chargingfee}`}</Text>
        </View>
        <View style={styles.btnColor}>
          <Image
            source={require('./iconsImage/rating.png')}
            style={styles.tagIcon}
          />
          <Text style={styles.tagText}>{` ${rating}/5`}</Text>
        </View>
        <View style={styles.btnColor}>
          <Image
            source={require('./iconsImage/distence.png')}
            style={styles.tagIcon}
          />
          <Text style={styles.tagText}>{` ${dir + di.unit}`}</Text>
        </View>
        <View style={styles.btnColor}>
          <Image
            source={require('./iconsImage/time.png')}
            style={styles.tagIcon}
          />
          <Text style={styles.tagText}>{` ${tir + ti.unit}`}</Text>
        </View>
      </View>
    );
  };

  onselect(item) {
    this.props.screen_7ChangeActivation(true);
    const openLink = async () => {
      const url = `${this.props.important_data.url}/cust/payment`;
      const url1 = `${this.props.important_data.url}/cust/paymentupdate`;
      const payment = await axios({
        method: 'post',
        url,
        data: {id: item._id, amount: item.chargingfee},
      });
      let result = {Status: 'SUCCESS', txnId: '0'};
      if (item.chargingfee !== 0) {
        let UpiUrl = `upi://pay?pa=${item.upiId}&pn=Harsh&tr=${
          payment.data._id
        }&am=${
          item.chargingfee
        }&mam=null&cu=INR&url=https://MyUPIApp&refUrl=https://MyUPIApp`;
        let res = await UPI.openLink(UpiUrl);
        result = JSON.parse(
          `{"${res
            .replace(/&/g, '","')
            .replace(/[=]/g, '":"')
            .replace(/ /g, '')}"}`,
        );
      }
      if (result.Status !== 'SUCCESS') {
        await axios({
          method: 'post',
          url: url1,
          data: {
            _id: payment.data._id,
            status: result.Status,
          },
        });
        notification({
          bigText: 'Try Again',
          message: 'your payment has been failed',
          title: 'Payment Failed',
        });
        this.props.screen_7ChangeActivation(false);
        this.props.screen_3ChangeActivation(false);
        this.props.screen_1ChangeActivation(true);
      } else {
        this.props.screen_1ChangeActivation(false);
        this.props.screen_3SelectData(item);
        notification({
          bigText: 'Thanks for choose',
          message: `You pay ₹${item.chargingfee} `,
          title: 'Payment Done',
        });

        const {
          tow,
          vehicleType,
          latitude,
          longitude,
          address,
        } = this.props.screen_1;
        const {distance, _id} = this.props.screen_3.selectData;
        const urlh = `${this.props.important_data.url}/cust/selectmecha`;

        const History = await axios({
          method: 'post',
          url: urlh,
          data: {
            toe: tow,
            latitude,
            longitude,
            time: this.props.screen_3.selectData.time,
            distance,
            mechaid: _id,
            custid: this.props.screen_2._id,
            type: vehicleType,
            address,
          },
        });
        this.props.screen_3SetHistory_id(History.data);

        await axios({
          method: 'post',
          url: url1,
          data: {
            status: result.Status,
            _id: payment.data._id,
            historyid: History.data,
            txnid: result.txnId,
            amount: item.chargingfee,
          },
        });
        this.props.screen_3ChangeActivation(false);
        this.props.screen_4ChangeActivation(true);
      }
    };
    openLink().catch(() => {
      this.props.screen_7ChangeActivation(false);
      this.props.screen_3ChangeActivation(false);
      this.props.screen_1ChangeActivation(true);
    });
  }

  cardClickEventListener(item) {
    const {net} = this.props.netconnect;
    Alert.alert(
      'Alert!!',
      `You have to pay Rs. ${item.chargingfee}.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Pay', onPress: () => (!net ? {} : this.onselect(item))},
      ],
      {cancelable: false},
    );
  }

  renderItem(item) {
    const {net} = this.props.netconnect;
    return (
      <TouchableOpacity
        style={[
          styles.card,
          {borderColor: item.Organization ? '#ff0000' : '#0000ff'},
        ]}
        onPress={() => {
          !net ? {} : this.cardClickEventListener(item);
        }}>
        <View style={[styles.cardContent, {marginLeft: 10}]}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View style={[styles.cardContent, styles.tagsContent]}>
          {this.renderTags(item)}
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{justifyContent: 'flex-end', backgroundColor: '#fff'}}>
        <NavIcons ontakedata={this.ontakeData} />
        {this.props.screen_3.data.length !== 0 ? (
          <FlatList
            style={{backgroundColor: '#fff'}}
            data={this.props.screen_3.data}
            keyExtractor={item => {
              return item._id;
            }}
            renderItem={({item}) => this.renderItem(item)}
          />
        ) : (
          <View style={styles.nocontainer}>
            <Text style={styles.notext}>No Mechanic Found</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nocontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  notext: {
    fontSize: 30,
    color: '#797D7F',
  },
  tagIcon: {
    height: 25,
    width: 25,
  },
  container: {
    backgroundColor: '#0000ff',
    height: null,
    flex: 1,
    justifyContent: 'center',
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
    backgroundColor: '#A2D9CE',
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
    borderRadius: 40,
    backgroundColor: '#EAECEE',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
  },
  tagText: {
    fontSize: 15,
  },
});

export default connect(
  state => state,
  {...screen_3, ...screen_7, ...screen_4, ...screen_1},
)(Screen_3);
