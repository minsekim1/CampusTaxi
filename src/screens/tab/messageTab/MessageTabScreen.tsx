import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { MessageStackNavigation } from './MessageStackNavigation';

export const MessageTabScreen = () => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#fff');
      }
      StatusBar.setBarStyle('dark-content');
    }
  }, [isFocused]);

  return <MessageStackNavigation />;
};
