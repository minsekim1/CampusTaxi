import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { BackIcon } from '../../components/icon/BackIcon';
import { PremiumScreen } from './PremiumScreen';

export type PremiumStackParamList = {
  PremiumScreen: undefined;
};
const PremiumStack = createStackNavigator<PremiumStackParamList>();

export const PremiumNavigation = () => {
  return (
    <PremiumStack.Navigator
      initialRouteName="PremiumScreen"
      screenOptions={{
        headerTitleStyle: { alignSelf: 'center' },
        headerLeft: ({ onPress }) => <BackIcon onPress={onPress} />,
      }}>
      <PremiumStack.Screen
        name="PremiumScreen"
        component={PremiumScreen}
        options={{ title: '프리미엄', headerLeft: undefined, headerShown:false }}
      />
    </PremiumStack.Navigator>
  );
};
