import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import AppStack from './src/Navigation/AppStack';
import AuthStack from './src/Navigation/AuthStack';
import {COLORS} from './src/Component/Constant/Color';
import Navigation from './src/Service/Navigation';
import Auth from './src/Service/Auth';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from './src/Redux/reducer/user';
import SplashScreen from 'react-native-splash-screen';
import {NativeBaseProvider} from 'native-base';

const Stack = createStackNavigator();

export default function App() {
  const dispatch = useDispatch();

  const {userData, login} = useSelector(state => state.User);

  const [loginChk, setloginChk] = useState(true);

  useEffect(() => {
    getUser();
    SplashScreen.hide();
  }, []);

  const getUser = async () => {
    let data = await Auth.getAccount();
    if (data != null) {
      dispatch(setUser(data));
      setloginChk(false);
    } else {
      setloginChk(false);
    }
  };

  if (loginChk) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer ref={r => Navigation.setTopLevelNavigator(r)}>
        <Stack.Navigator
          // headerMode="none"
          detachInactiveScreens={false}
          initialRouteName="Auth"
          screenOptions={{
            cardStyle: {backgroundColor: COLORS.white},
            gestureEnabled: true,
            backgroundColor: COLORS.button,
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
          }}>
          {!login ? (
            <Stack.Screen name="Auth" component={AuthStack} />
          ) : (
            <Stack.Screen name="AppStack" component={AppStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
