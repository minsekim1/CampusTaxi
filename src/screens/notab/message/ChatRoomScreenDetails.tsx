import styled from "@emotion/native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { differenceInMilliseconds } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { Platform, ScrollView, StatusBar, Text, TextInput } from "react-native";
import { ChatRoom } from "../../../components/chat-room/ChatRoomList";
import BackIconWhite from "../../../components/icon/chat/BackIconWhite";
import { Crown } from "../../../components/icon/chat/Crown";
import { Menu } from "../../../components/icon/chat/Menu";
import { SearchIcon } from "../../../components/icon/chat/SearchIcon";
import { BlankBackground } from "../../../components/layout/BlankBackground";
import { showToastWithGravity } from "../../../components/layout/Toast";
import { API_URL } from "../../../constant";
import { useAuthContext } from "../../../contexts/AuthContext";
import { MessageNoTabNavigationProp } from "./ChatRoomScreen";
import { MessageNoTabNavigationParamList } from "./MessageNoTabNavigation";

export const ChatRoomScreenDetails: React.FC = () => {
  const { navigate } = useNavigation<MessageNoTabNavigationProp>();
  
  const [datas, setDatas] = useState<ChatRoom>();

  const { setNavName } = useAuthContext();

  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#579FEE");
    }
    StatusBar.setBarStyle("dark-content");
  }, []);


  return (
		<>
			<Text>asd</Text>
		</>
  );
};