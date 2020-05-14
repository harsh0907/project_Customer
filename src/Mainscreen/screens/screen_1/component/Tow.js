/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../../../GlobleStates/actions/screen_1';

const Tow = ({tow, screen_1TowChange}) => {
  return (
    <View style={styles.hookContainer}>
      <Text style={{fontSize: 16, marginTop: 7}}>Do you need Tow</Text>
      <View
        style={[
          styles.hookCard,
          {backgroundColor: tow === 1 ? '#148F77' : '#e2e2e2'},
        ]}>
        <TouchableOpacity onPress={() => screen_1TowChange((tow + 1) % 2)}>
          <Image
            style={styles.hookImage}
            source={require('../icons/hook.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  hookCard: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    //flexBasis: '42%',
    width: 50,
    height: 50,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#EE82EE',
    borderWidth: 1,
  },
  hookContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 40,
    marginTop: 60,
  },
  hookImage: {
    height: 40,
    width: 40,
    alignSelf: 'center',
  },
};

const MSTP = state => state.screen_1;

export default connect(
  MSTP,
  actions,
)(Tow);
