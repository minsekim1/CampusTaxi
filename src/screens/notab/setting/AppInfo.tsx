import styled from "@emotion/native";
import React from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import VersionCheck from "react-native-version-check";
import { useAuthContext } from "../../../contexts/AuthContext";
export const AppInfo: React.FC = () => {
  return (
    <Container>
      <Center>
        <AppVersion>Version: {VersionCheck.getCurrentVersion()}</AppVersion>
        <AppBuild>BuildNumber: {VersionCheck.getCurrentBuildNumber()}</AppBuild>
        <AppBuild>PackageName: {VersionCheck.getPackageName()}</AppBuild>
        {/* <AppBuild>{VersionCheck.getCountry()}</AppBuild> */}
        {/* <AppBuild>{VersionCheck.getStoreUrl()}</AppBuild> */}
        {/* <AppBuild>{VersionCheck.getAppStoreUrl()}</AppBuild> */}
        {/* <AppBuild>{VersionCheck.getPlayStoreUrl()}</AppBuild> */}

        <We>
          Hi! We are CampustaxI{"\n"}
          Minsekim Mina Yeon{"\n"}
          Ryul Seung Rily Jeong Hyeons
        </We>
      </Center>
    </Container>
  );
};
//https://github.com/oblador/react-native-vector-icons


const Center = styled.View`
  align-items: center;
  justify-content: center;
  height: 97%;
  background-color: white;
`;
const Container = styled.SafeAreaView``;
const AppVersion = styled.Text`
  font-size: 15px;
`;
const AppBuild = styled.Text`
  font-size: 13px;
`;
const We = styled.Text`
  position: absolute;
  bottom: 30px;
  font-size: 10px;
`;
