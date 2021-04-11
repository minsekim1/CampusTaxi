import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { AuthProvider, useAuthContext } from './contexts/AuthContext';
import { RootScreen } from './screens/RootScreen';
import messaging from '@react-native-firebase/messaging';
import firebase from 'firebase';
import { MYfirebase } from './constant';
const App = () => {
  const { isLoading } = useAuthContext();
  //#region FCM setting IOS
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  // #endregion FCM setting IOS
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        SplashScreen.hide();
            requestUserPermission();
    getFcmToken();
      }, 500);
    }
  }, [isLoading]);

  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
        <RootScreen />
      </NavigationContainer>
    </AuthProvider>
  );
};


  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
     console.log(fcmToken);
     console.log("Your Firebase Token is:", fcmToken);
    } else {
     console.log("Failed", "No token received");
    }
  }
export default App;
