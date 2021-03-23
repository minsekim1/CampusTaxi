import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useAuthContext } from '../../contexts/AuthContext';
import { SettingStackParamList } from './SettingNavigation';

type SettingScreenNavigationProp = StackNavigationProp<SettingStackParamList, 'SettingScreen'>;

type Props = {
  navigation: SettingScreenNavigationProp;
};
export const SettingScreen: React.FC<Props> = () => {
  const { setLoggedOut } = useAuthContext();

  return (
    <SafeAreaView>
      <Text
        onPress={() => {
          setLoggedOut();
        }}>
        setting
      </Text>
    </SafeAreaView>
  );
};
