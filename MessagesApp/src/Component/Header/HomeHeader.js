import {Icon} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {COLORS} from '../Constant/Color';
import {FONTS} from '../Constant/Font';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from 'react-native-size-matters';
import Navigation from '../../Service/Navigation';

const HomeHeader = () => {
  return (
    <View style={styles.containnerHeader}>
      <Text style={styles.logo}>MessagesApp</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="notifications" as={Ionicons} style={styles.iconNotif} />
        <TouchableOpacity onPress={() => Navigation.navigate('Profile')}>
          <Avatar
            source={{
              uri: 'https://occ-0-590-586.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABctIIxIDrJHbuXAG4RQA01xnTkhJ3mncsrzhVX08_cdlc-x5SoE59szDeBEMi8XDbVd902ZiChDFkZ_dYWsEoZs9IK3NKVmd9AKL4b7tOsJyIRhmsHllRPlk.jpg?r=c3a',
            }}
            rounded
            size="small"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  logo: {
    fontFamily: FONTS.Bold,
    color: COLORS.theme,
    fontSize: 22,
  },
  containnerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    backgroundColor: COLORS.white,
    paddingVertical: moderateScale(15),
  },
  iconNotif: {
    color: COLORS.theme,
    marginRight: moderateScale(7),
    fontSize: 18,
  },
});
