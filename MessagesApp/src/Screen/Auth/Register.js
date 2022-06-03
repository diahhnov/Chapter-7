import React, {useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {Icon} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS} from '../../Component/Constant/Color';
import Navigation from '../../Service/Navigation';
import uuid from 'react-native-uuid';
import SimpleToast from 'react-native-simple-toast';
import database from '@react-native-firebase/database';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import stylesRegister from './stylesRegister';
import authProvider from '@react-native-firebase/auth';
import messagingProvider from '@react-native-firebase/messaging';

const {width, height} = Dimensions.get('window');

export default function Register() {
  const save = authProvider();
  const messaging = messagingProvider();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');

  const registerUser = async () => {
    try {
      const res = await save.createUserWithEmailAndPassword(email, pass);
      console.log(res);
      if ('email' in res.user && res.user.email) {
        await save.currentUser.updateProfile({
          displayName: name,
        });

        const token = await messaging.getToken();

        if (token) {
          const payload = {
            id: uuid.v4(),
            name: name,
            emailId: email,
            password: pass,
            img: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png',
          };
          await database().ref(`users/${res.user.uid}`).set(payload);
          dispatch(userData(payload));
          navigate('Home');
        }
      }

      if (name == '' || email == '' || pass == '') {
        SimpleToast.show('Fill in all the fields!');
        return false;
      }
      const data = {
        id: uuid.v4(),
        name: name,
        emailId: email,
        password: pass,
        img: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png',
      };

      database()
        .ref('/users/' + data.id)
        .set(data)
        .then(() => {
          SimpleToast.show('Register Successfully!');
          setname('');
          setemail('');
          setpass('');
          console.log('Data: ', data);
          Navigation.navigate('Login');
        });
    } catch (error) {
      Alert.alert('Pemberitahuan', `${error}`);
    }
  };

  return (
    <SafeAreaView style={stylesRegister.areaRegister}>
      <ScrollView>
        <StatusBar
          backgroundColor={COLORS.theme}
          barStyle="light-content"
          hidden={false}
        />
        <View
          style={{
            height: height / 4,
            borderBottomLeftRadius: height / 8,
            borderBottomRightRadius: height / 8,
            backgroundColor: COLORS.theme,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={stylesRegister.textRegis}>REGISTER</Text>
        </View>

        <View style={stylesRegister.key}>
          <KeyboardAwareScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={stylesRegister.wrapperinputRegis}>
              <View style={stylesRegister.inputContainer}>
                <View style={stylesRegister.inputIconView}>
                  <Icon
                    name="person"
                    as={Fontisto}
                    style={stylesRegister.icon}
                  />
                </View>
                <TextInput
                  style={stylesRegister.inputs}
                  placeholder="Enter Name"
                  underlineColorAndroid="transparent"
                  onChangeText={value => setname(value)}
                  value={name}
                  placeholderTextColor={COLORS.black}
                />
              </View>

              <View style={[stylesRegister.inputContainer, {marginTop: 10}]}>
                <View style={stylesRegister.inputIconView}>
                  <Icon
                    name="mail"
                    as={AntDesign}
                    style={stylesRegister.icon}
                  />
                </View>
                <TextInput
                  style={stylesRegister.inputs}
                  placeholder="Enter Email"
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  onChangeText={value => {
                    setemail(value);
                  }}
                  value={email}
                  placeholderTextColor={COLORS.black}
                />
              </View>

              <View style={[stylesRegister.inputContainer, {marginTop: 10}]}>
                <View style={stylesRegister.inputIconView}>
                  <Icon name="key" as={Fontisto} style={stylesRegister.icon} />
                </View>
                <TextInput
                  style={stylesRegister.inputs}
                  placeholder="Enter Password"
                  underlineColorAndroid="transparent"
                  onChangeText={value => {
                    setpass(value);
                  }}
                  value={pass}
                  secureTextEntry={true}
                  placeholderTextColor={COLORS.black}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>

          <View style={stylesRegister.wrapperRegisterBtn}>
            <TouchableOpacity style={stylesRegister.btn} onPress={registerUser}>
              <Text style={stylesRegister.btnText}>Register Now</Text>
            </TouchableOpacity>
          </View>

          <View style={stylesRegister.contactView}>
            <Text style={stylesRegister.smallTxt}>have an account?</Text>
            <TouchableOpacity
              style={stylesRegister.toLogin}
              onPress={() => Navigation.navigate('Login')}>
              <Text style={stylesRegister.login}>Login Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
