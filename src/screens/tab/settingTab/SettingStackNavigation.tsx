import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SettingScreen } from './SettingScreen';

export type SettingStackParamList = {
  SettingScreen: undefined;
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
