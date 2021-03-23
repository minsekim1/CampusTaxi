import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { BackIcon } from '../../components/icon/BackIcon';
import { SettingScreen } from './SettingScreen';

export type SettingStackParamList = {
  SettingScreen: undefined;
};
const SettingStack = createStackNavigator<SettingStackParamList>();

export const SettingNavigation = () => {
  return (
    <SettingStack.Navigator
      initialRouteName="SettingScreen"
      screenOptions={{
        headerTitleStyle: { alignSelf: 'center' },
        headerLeft: ({ onPress }) => <BackIcon onPress={onPress} />,
      }}>
      <SettingStack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ title: '설정', headerLeft: undefined }}
      />
    </SettingStack.Navigator>
  );
};
