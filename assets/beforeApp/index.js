import React from 'react';
import {
    Text
} from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from '@react-navigation/native';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import firebaseConfig from "../../firebaseConfig";
const HomeStack = createStackNavigator(
    {HomeScreen},
    {defaultNavigationOptions: ({navigation}) => ({title: 'Home'})}
);
const SettingStack = createStackNavigator(
    { SettingScreen},
    { defaultNavigationOptions: ({navigation}) => ({title: 'Setting',})
    ,initialRouteName: 'SettingScreen'}
);


const TabNavigator = createBottomTabNavigator({
    Home: HomeStack,
    Setting: SettingStack
}, {
    defaultNavigationOptions: ({navigation}) => ({
        lazy: false,
        tabBarOptions: {
            activeTintColor: "#46c3ad",
            inactiveTintColor: "#888"
        }
    });

const AppStack = createStackNavigator(
    {
        LoginScreen: LoginScreen,
        TabNavigator: {
            screen: TabNavigator,
            navigationOptions: ({navigation}) => ({
            }),
        },
    }
);

export default createAppContainer(AppStack);