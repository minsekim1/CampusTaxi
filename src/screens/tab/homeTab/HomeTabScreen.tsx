import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { HomeStackNavigation } from './HomeStackNavigation';

export const HomeTabScreen = () => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#76A2EB');
      }
      StatusBar.setBarStyle('light-content');
    }
  }, [isFocused]);

  return <HomeStackNavigation />;
};
