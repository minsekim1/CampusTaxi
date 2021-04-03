import styled from '@emotion/native';
import CheckBox from '@react-native-community/checkbox';
import React, { Dispatch, SetStateAction } from 'react';

export const GenderColor = (genderNum: number) => {
	return ((genderNum == 0) ? '#579FEE' : ((genderNum == 1) ? '#F28A8A' : '#000000'))
};

export const GenderText = (genderNum: number) => {
	return ((genderNum == 0) ? '남자' : ((genderNum == 1) ? '여자' : '무관'))
}; 

export const GenderProfileColor = (genderNum: number) => {
	return ((genderNum == 0) ? '#55A1EE' : ((genderNum == 1) ? '#FF6464' : '#000000'))
}

export const LogoColor = '#579FEE'