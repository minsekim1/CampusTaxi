import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HomeScreen } from './HomeScreen';
import {CreateScreen} from './CreateScreen';

export type HomeStackParamList = {
  HomeScreen: undefined;
  CreateScreen: undefined;
};
const HomeStack = createStackNavigator<HomeStackParamList>();

export const HomeNavigation = () => {
  
  return (
    <HomeStack.Navigator  initialRouteName="HomeScreen" >
      <HomeStack.Screen name="HomeScreen" options={{headerShown: false}} component={HomeScreen} />
      <HomeStack.Screen name="CreateScreen" options={{ headerTitleAlign: 'center', title: "지도 선택"}}component={CreateScreen} />
    </HomeStack.Navigator>
  );
};
