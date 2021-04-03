import styled from "@emotion/native";
import React from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useAuthContext } from "../../../contexts/AuthContext";

export const AppInfo: React.FC = () => {
  return (
		<Container>
			<Center>
				<AppVersion>asd</AppVersion>
				<AppBuild>asd</AppBuild>
				</Center>
    </Container>
  );
};
const Center = styled.View`align-items: center; justify-content: center; height:97%`
const Container = styled.SafeAreaView``;
const AppVersion = styled.Text``;
const AppBuild = styled.Text``;