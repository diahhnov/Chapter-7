import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import SimpleToast from 'react-native-simple-toast';
import {COLORS} from '../../Component/Constant/Color';
import {moderateScale} from 'react-native-size-matters';
import Navigation from '../../Service/Navigation';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logout from '../../Component/Header/Logout';

const Profile = () => {
  const {userData} = useSelector(state => state.User);

  const [data, setData] = useState({});

  const upPofile = useCallback(() => {
    const reference = database().ref('/users/' + userData?.id);
    try {
      reference.on('value', snapshot => {
        setData(snapshot.val());
      });
    } catch (err) {
      SimpleToast.show('Error Update');
    }
  }, [userData]);

  useEffect(() => {
    upPofile();
  }, [upPofile]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.theme,
      }}>
      <TouchableOpacity
        style={{margin: moderateScale(15)}}
        onPress={() => Navigation.navigate('Home')}>
        <Icon
          name="arrow-back"
          as={Ionicons}
          style={{
            color: COLORS.white,
            fontSize: moderateScale(18),
            marginTop: moderateScale(30),
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: COLORS.theme,
          alignItems: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            marginBottom: moderateScale(20),
          }}>
          <Image
            source={{uri: data.img}}
            style={{
              marginTop: moderateScale(10),
              marginBottom: moderateScale(20),
              height: moderateScale(180),
              width: moderateScale(180),
              borderRadius: moderateScale(100),
            }}
          />
          <Text
            style={{
              fontSize: moderateScale(16),
              fontWeight: 'bold',
              color: COLORS.white,
            }}>
            {data.name}
          </Text>
          <Text
            style={{
              marginVertical: moderateScale(6),
              color: COLORS.white,
            }}>
            {data.emailId}
          </Text>
        </View>
        <Logout />
      </View>
    </View>
  );
};

export default Profile;
