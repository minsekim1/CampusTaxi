import React from "react";
import { Alert, Text } from "react-native";

export const CustomAlert = (
  Title: string,
  SubTitle: string,
  isCancel: boolean,
  isOk: boolean,
  onPressOk?: any,
  color?: string
) => {
    Alert.alert(
      Title,
      SubTitle,
      [
        isCancel
          ? {
              text: "취소",
              style: "cancel",
            }
          : {},
        isOk ? { text: "확인", onPress: onPressOk ? onPressOk : console.log("OK") } : {},
      ],
      { cancelable: true }
    );
};
