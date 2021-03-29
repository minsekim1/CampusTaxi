import styled from '@emotion/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect} from 'react';
import { Platform, Button, ScrollView, Text, TouchableOpacity, View, Image, Linking } from 'react-native';
import { HomeNoTabNavigationParamList } from './HomeNoTabNavigation';

type CreateScreenDetailsNavigationProp = StackNavigationProp<HomeNoTabNavigationParamList, 'CreateScreenDetails'>;

type Props = {
    navigation: CreateScreenDetailsNavigationProp;
};

export const CreateScreenDetails: React.FC<Props> = () => {
    return(
        <View>
            <Text>텍스트입니다.</Text>
        </View>
    )
}