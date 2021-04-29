import styled from '@emotion/native';
import CheckBox from '@react-native-community/checkbox';
import React, { Dispatch, SetStateAction } from 'react';

export const GenderColor = (gender: "MALE" | "FEMALE" | "NONE") => {
	return ((gender == "MALE") ? '#579FEE' : ((gender == "FEMALE") ? '#F28A8A' : '#000000'))
};

export const GenderText = (gender: "MALE" | "FEMALE" | "NONE") => {
	return ((gender == "MALE") ? '남자' : ((gender == "FEMALE") ? '여자' : '무관'))
}; 

export const GenderProfileColor = (gender: "MALE" | "FEMALE" | "NONE") => {
	return ((gender == "MALE") ? '#55A1EE' : ((gender == "FEMALE") ? '#FF6464' : '#000000'))
}

export const LogoColor = '#579FEE'