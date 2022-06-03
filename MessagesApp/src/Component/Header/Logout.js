import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {setLogout} from '../../Redux/reducer/user';
import auth from '@react-native-firebase/auth';
import {COLORS} from '../Constant/Color';
import Navigation from '../../Service/Navigation';

const Logout = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(setLogout());
        console.log(setLogout);
        Navigation.navigate('Login');
      });
  };

  return (
    <TouchableOpacity onPress={() => onLogout()} style={styles.button}>
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  );
};

export default Logout;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.black,
    padding: moderateScale(12),
    borderRadius: moderateScale(6),
    marginBottom: moderateScale(24),
  },
  text: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
