/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../../../GlobleStates/actions/screen_1';

class VehicleList extends Component {
  clickEventListener(item) {
    this.props.screen_1SelectVehicleType(item);
  }

  render() {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          marginTop: 10,
          backgroundColor: '#A3E4D7',
        }}>
        <View
          style={{
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <Text style={{fontSize: 18}}>Select Vehicle Type</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.listContainer}>
            <View>
              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      this.props.vehicleType === 'car' ? '#145A32' : '#e2e2e2',
                  },
                ]}
                onPress={() => this.clickEventListener('car')}>
                <Image
                  style={styles.cardImage}
                  source={require('../icons/car.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      this.props.vehicleType === 'bus' ? '#145A32' : '#e2e2e2',
                  },
                ]}
                onPress={() => this.clickEventListener('bus')}>
                <Image
                  style={styles.cardImage}
                  source={require('../icons/bus.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      this.props.vehicleType === 'autoer'
                        ? '#145A32'
                        : '#e2e2e2',
                  },
                ]}
                onPress={() => this.clickEventListener('autoer')}>
                <Image
                  style={styles.cardImage}
                  source={require('../icons/rickshow.png')}
                />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      this.props.vehicleType === 'tacter'
                        ? '#145A32'
                        : '#e2e2e2',
                  },
                ]}
                onPress={() => this.clickEventListener('tacter')}>
                <Image
                  style={styles.cardImage}
                  source={require('../icons/tacter.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      this.props.vehicleType === 'truck'
                        ? '#145A32'
                        : '#e2e2e2',
                  },
                ]}
                onPress={() => this.clickEventListener('truck')}>
                <Image
                  style={styles.cardImage}
                  source={require('../icons/truck.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      this.props.vehicleType === 'bike' ? '#145A32' : '#e2e2e2',
                  },
                ]}
                onPress={() => this.clickEventListener('bike')}>
                <Image
                  style={styles.cardImage}
                  source={require('../icons/bike.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A3E4D7',
  },
  list: {
    paddingHorizontal: 5,
  },
  listContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  /******** card **************/
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 20,
    marginHorizontal: 40,
    //flexBasis: '42%',
    width: 80,
    height: 80,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#EE82EE',
    borderWidth: 1,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 50,
    width: 50,
    alignSelf: 'center',
  },
});

const MSTP = state => state.screen_1;

export default connect(
  MSTP,
  actions,
)(VehicleList);
