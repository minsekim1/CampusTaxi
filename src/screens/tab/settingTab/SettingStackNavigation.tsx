import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { GeoScreen } from '../login/document/GeoScreen';
import { MarketingScreen } from '../login/document/MarketingScreen';
import { PrivacyScreen } from '../login/document/PrivacyScreen';
import { TermsScreen } from '../login/document/TermsScreen';
import { RegisterSuccessScreen } from '../login/register/RegisterSuccessScreen';
import { SettingScreen } from './SettingScreen';

export type SettingStackParamList = {
  SettingScreen: undefined;
  GeoScreen: undefined;
  MarketingScreen: undefined;
  PrivacyScreen: undefined;
  TermsScreen: undefined;
};
const SettingStack = createStackNavigator<SettingStackParamList>();

export const SettingStackNavigation = () => {
  return (
    <SettingStack.Navigator
      initialRouteName="SettingScreen"
      screenOptions={{
        headerTitleStyle: { alignSelf: 'center' },
      }}>
      <SettingStack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ title: '설정', headerLeft: undefined }}
      />
    </SettingStack.Navigator>
  );
};
