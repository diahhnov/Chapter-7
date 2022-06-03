import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {COLORS} from '../Component/Constant/Color';
import Screen from '../Screen';
import AppStack from './AppStack';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: COLORS.button},
        gestureEnabled: true,
        backgroundColor: COLORS.button,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
      }}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={Screen.Login} />
      <Stack.Screen name="Register" component={Screen.Register} />
      <Stack.Screen name="AppStack" component={AppStack} />
    </Stack.Navigator>
  );
}
