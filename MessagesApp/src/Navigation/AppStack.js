import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {COLORS} from '../Component/Constant/Color';
import Screen from '../Screen';

const Stack = createStackNavigator();

export default function AppStack() {
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
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Screen.Home} />
      <Stack.Screen name="AllUser" component={Screen.AllUser} />
      <Stack.Screen name="SingleChat" component={Screen.SingleChat} />
      <Stack.Screen name="Profile" component={Screen.Profile} />
    </Stack.Navigator>
  );
}
