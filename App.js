import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginNav from './component/Login/nav'
import * as Font from 'expo-font';
import { CustomContext, CustomProvider } from './component/store/context';
import styled from 'styled-components/native';
import Constants from 'expo-constants';

const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Constants.statusBarHeight}px;
`;
export default function App() {
  React.useEffect(() => {
    Font.loadAsync({ FontAwesome: require('./assets/fonts/Montserrat.ttf') });
  }, []);
  return (
    <Container>
      <CustomProvider>
        <Navigator />
      </CustomProvider>
    </Container>
  );
}

import TabNav from './component/TabNav';
const headerDisable = { headerShown: false };
const s = createStackNavigator();
const Navigator = () => {
  return (
    <NavigationContainer >
      <s.Navigator screenOptions={headerDisable}>
        <s.Screen name="Home" component={TabNav} />
        <s.Screen name="SignIn" component={LoginNav} />
      </s.Navigator>
    </NavigationContainer>
  );
}
import _ from "lodash";
import { Button, Text } from 'react-native';
