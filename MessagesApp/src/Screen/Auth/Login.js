import React, {useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {Icon} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS} from '../../Component/Constant/Color';
import Navigation from '../../Service/Navigation';
import database from '@react-native-firebase/database';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import {setUser} from '../../Redux/reducer/user';
import Auth from '../../Service/Auth';
import Fontisto from 'react-native-vector-icons/Fontisto';
import stylesLogin from './stylesLogin';
import AntDesign from 'react-native-vector-icons/AntDesign';
import authProvider from '@react-native-firebase/auth';
import messagingProvider from '@react-native-firebase/messaging';

const {height} = Dimensions.get('window');

export default function Login() {
  const dispatch = useDispatch();

  const save = authProvider();
  const messaging = messagingProvider();
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');

  const loginUser = async () => {
    database()
      .ref('users/')
      .orderByChild('emailId')
      .equalTo(email)
      .once('value')
      .then(async snapshot => {
        if (snapshot.val() == null) {
          SimpleToast.show('Invalid Email!');
          return false;
        }
        const userData = Object.values(snapshot.val())[0];
        if (userData?.password != pass) {
          SimpleToast.show('Invalid Password!');
          return false;
        }

        dispatch(setUser(userData));
        await Auth.setAccount(userData);
        SimpleToast.show('Login Successfully!');
        console.log('User data: ', userData);
      });
  };

  return (
    <View style={stylesLogin.container}>
      <StatusBar
        backgroundColor={COLORS.theme}
        barStyle="light-content"
        hidden={false}
      />
      <View
        style={{
          height: height / 4,
          backgroundColor: COLORS.theme,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomLeftRadius: height / 8,
          borderBottomRightRadius: height / 8,
        }}>
        <Text style={stylesLogin.textLogin}>LOGIN</Text>
      </View>

      <View style={stylesLogin.containInput}>
        <View style={stylesLogin.unContainInput}>
          <KeyboardAwareScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={stylesLogin.wrapperInput}>
              <View style={stylesLogin.inputContainer}>
                <View style={stylesLogin.inputIconView}>
                  <Icon name="mail" as={AntDesign} style={stylesLogin.icon} />
                </View>
                <TextInput
                  style={stylesLogin.inputs}
                  placeholder="Enter Email Id"
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  onChangeText={value => {
                    setemail(value);
                  }}
                  value={email}
                  placeholderTextColor={COLORS.liteBlack}
                />
              </View>

              <View style={stylesLogin.inputContainer}>
                <View style={stylesLogin.inputIconView}>
                  <Icon name="key" as={Fontisto} style={stylesLogin.icon} />
                </View>
                <TextInput
                  style={stylesLogin.inputs}
                  placeholder="Enter Password"
                  underlineColorAndroid="transparent"
                  onChangeText={value => {
                    setpass(value);
                  }}
                  value={pass}
                  secureTextEntry={true}
                  placeholderTextColor={COLORS.liteBlack}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>

          <View style={stylesLogin.wrapperButtom}>
            <TouchableOpacity
              style={stylesLogin.btn}
              // onPress={() => Navigation.navigate('AppStack')}
              onPress={loginUser}>
              <Text style={stylesLogin.btnText}>Login Now</Text>
            </TouchableOpacity>
          </View>

          <View style={stylesLogin.contactView}>
            <Text style={stylesLogin.smallTxt}>New user?</Text>
            <TouchableOpacity
              style={stylesLogin.toRegister}
              onPress={() => Navigation.navigate('Register')}>
              <Text style={stylesLogin.register}>Register Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
