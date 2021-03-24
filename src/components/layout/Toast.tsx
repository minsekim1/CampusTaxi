import React from "react";
import { View, StyleSheet, ToastAndroid, Button, StatusBar } from "react-native";

	export const showToast = (text:string) => {
		ToastAndroid.show(text, ToastAndroid.SHORT);
	};

export const showToastWithGravity = (text: string) => {
		ToastAndroid.showWithGravity(
			text,
			ToastAndroid.SHORT,
			ToastAndroid.CENTER
		);
	};

export const showToastWithGravityAndOffset = (text: string) => {
		ToastAndroid.showWithGravityAndOffset(
			text,
			ToastAndroid.LONG,
			ToastAndroid.BOTTOM,
			25,
			50
		);
	};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		paddingTop: StatusBar.currentHeight,
		backgroundColor: "#888888",
		padding: 8
	}
});
