import {StatusBar} from 'expo-status-bar';
import glamorous from 'glamorous-native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components/native';


const Container= styled.SafeAreaView`
  border: 1px;
`;
export default function Test(){
    return(
        <Container></Container>
    )
}