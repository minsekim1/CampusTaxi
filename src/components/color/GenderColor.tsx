import styled from '@emotion/native';
import CheckBox from '@react-native-community/checkbox';
import React, { Dispatch, SetStateAction } from 'react';

export const GenderColor = (genderNum: string) => {
	return ((genderNum == "MALE") ? '#579FEE' : ((genderNum == "FEMALE") ? '#F28A8A' : '#000000'))
};

export const GenderText = (genderNum: string) => {
	return ((genderNum == "MALE") ? '남자' : ((genderNum == "FEMALE") ? '여자' : '무관'))
}; 

export const GenderProfileColor = (genderNum: string) => {
	return ((genderNum == "MALE") ? '#55A1EE' : ((genderNum == "FEMALE") ? '#FF6464' : '#000000'))
}

export const LogoColor = '#579FEE'