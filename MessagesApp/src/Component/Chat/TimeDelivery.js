//import liraries
import moment from 'moment';
import {Icon} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../Constant/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';

// create a component
const TimeDelivery = props => {
  const {sender, item} = props;
  return (
    <View
      style={[
        styles.mainView,
        {
          justifyContent: 'flex-end',
        },
      ]}>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 7,
          color: sender ? COLORS.white : COLORS.gray,
        }}>
        {moment(item.send_time).format('LLL')}
      </Text>

      <Icon
        name={'checkmark-done'}
        as={Ionicons}
        style={{
          color: item.seen ? COLORS.black : COLORS.white,
          fontSize: 15,
          marginLeft: 5,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
});
export default TimeDelivery;
