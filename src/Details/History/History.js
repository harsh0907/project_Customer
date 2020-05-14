/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import * as screen_7 from '../../GlobleStates/actions/screen_7';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      show: [],
    };
  }
  UNSAFE_componentWillMount() {
    this.props.screen_7ChangeActivation(true);

    const {url} = this.props.important_data;
    const uri = `${url}/history`;
    axios({
      method: 'post',
      url: uri,
      data: {
        _id: this.props.screen_2._id,
        type: 'custid',
      },
    })
      .then(res => {
        const op = res.data.sort(function(a, b) {
          return b.requesttime - a.requesttime;
        });
        this.setState({data: op, show: op});
        this.props.screen_7ChangeActivation(false);
      })
      .catch(() => {
        this.props.screen_7ChangeActivation(false);
      });
  }

  onAll() {
    this.props.screen_7ChangeActivation(true);
    this.setState({show: this.state.data});
    this.props.screen_7ChangeActivation(false);
  }

  onCompleted() {
    this.props.screen_7ChangeActivation(true);
    const op = this.state.data.filter(one => {
      return !one.cencelbycustomer;
    });
    this.setState({show: op});
    this.props.screen_7ChangeActivation(false);
  }

  onCencel() {
    this.props.screen_7ChangeActivation(true);
    const op = this.state.data.filter(one => {
      return one.cencelbycustomer;
    });
    this.setState({show: op});
    this.props.screen_7ChangeActivation(false);
  }

  renderItem(item) {
    const t = moment(item.item.requesttime).toArray();
    var co = null;
    switch (item.item.typeofvehicle) {
      case 'bike':
        co = require('../../Mainscreen/screens/screen_1/icons/bike.png');
        break;
      case 'car':
        co = require('../../Mainscreen/screens/screen_1/icons/car.png');
        break;
      case 'bus':
        co = require('../../Mainscreen/screens/screen_1/icons/bus.png');
        break;
      case 'truck':
        co = require('../../Mainscreen/screens/screen_1/icons/truck.png');
        break;
      case 'tacter':
        co = require('../../Mainscreen/screens/screen_1/icons/tacter.png');
        break;
      case 'autoer':
        co = require('../../Mainscreen/screens/screen_1/icons/rickshow.png');
        break;
    }
    return (
      <View
        style={[
          styles.listcontainer,
          {backgroundColor: item.item.cencelbycustomer ? '#FFCCBC' : '#E1BEE7'},
        ]}>
        <View>
          <Image style={{width: 60, height: 60}} source={co} />
          {item.item.toe === 1 ? (
            <Image
              style={{width: 40, height: 40}}
              source={require('../../Mainscreen/screens/screen_1/icons/hook.png')}
            />
          ) : (
            <></>
          )}
        </View>
        <View style={{justifyContent: 'space-evenly'}}>
          <View style={[styles.addcon]}>
            <Text style={styles.rupee}>{`${item.item.address}`}</Text>
          </View>
          <View
            style={[
              styles.addcon,
              {height: 30, marginBottom: 8, marginTop: 8},
            ]}>
            <Text>{`${t[2]}/${t[1]}/${t[0]} ${t[3]}:${t[4]}`}</Text>
          </View>
        </View>
        <View style={styles.rupeecont}>
          <Text style={styles.rupee}>{`₹ ${item.item.chargingfee}`}</Text>
        </View>
      </View>
    );
  }

  render() {
    const {net} = this.props.netconnect;
    return (
      <View style={{flex: 1}}>
        <View style={styles.Topcontainer}>
          <TouchableOpacity
            style={[styles.buttoncontainer, {marginLeft: 10, width: 80}]}
            onPress={() => (!net ? {} : this.onAll())}>
            <Text style={styles.button}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttoncontainer}
            onPress={() => (!net ? {} : this.onCompleted())}>
            <Text style={styles.button}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttoncontainer, {marginRight: 10}]}
            onPress={() => (!net ? {} : this.onCencel())}>
            <Text style={styles.button}>Cancelled</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.show}
          horizontal={false}
          keyExtractor={item => {
            return item._id;
          }}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addcon: {
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rupee: {
    fontSize: 20,
  },
  rupeecont: {
    width: 80,
    height: 60,
    backgroundColor: '#FFCC80',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 40,
    elevation: 20,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  listcontainer: {
    backgroundColor: '#CACFD2',
    marginTop: 10,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  Topcontainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#FFCC80',
    paddingTop: 20,
    paddingBottom: 7,
  },
  buttoncontainer: {
    width: 120,
    height: 40,
    backgroundColor: '#FB8C00',
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 40,
    elevation: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 20,
  },
  icons: {
    width: 100,
    height: 100,
    backgroundColor: '#00f',
  },
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
    backgroundColor: '#FCDFFF',
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
  screen_7,
)(History);
