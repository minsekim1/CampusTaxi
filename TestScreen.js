import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Platform, View, Text, Image } from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import _ from 'lodash'
import * as Location from 'expo-location';

const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Constants.statusBarHeight}px;
`;
const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;
const Contents = styled.ScrollView`
  flex: 1;
  padding: 8px 24px;
`;

export default function TestScreen() {
    //Location.hasServicesEnabledAsync().then(r=>console.log(r?"GPS ON":"GPS OFF"));
    //Location.getCurrentPositionAsync().then(r=>console.log(r));
    //Location.getPermissionsAsync().then(r=> console.log("asdd"+r.granted))
    return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Contents style={{ backgroundColor: 'gray' }}>


        </Contents>
      </KeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});