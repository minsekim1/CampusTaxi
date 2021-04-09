import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { BackHandler, Platform, ScrollView } from 'react-native';
import { ChatRoom, ChatRoomDummyList, ChatRoomList } from '../../../components/chat-room/ChatRoomList';
import { showToast } from '../../../components/layout/Toast';
import { API_URL } from '../../../constant';
import { useAuthContext } from '../../../contexts/AuthContext';
import { MessageStackParamList } from './MessageStackNavigation';

type MessageNavigation = StackNavigationProp<MessageStackParamList, 'MessageScreen'>;

export const Gender = ['여자', '남자'];
export const Week = ['일', '월', '화', '수', '목', '금', '토'];
export type APIData = {
  count: number;
  next: number;
  previous: number;
  results: ChatRoom[];
};

export const MessageScreen: React.FC = () => {
  const [datas, setDatas] = useState<ChatRoom[]>();
  const { token } = useAuthContext();
  const { setNavName } = useAuthContext();
  const navigation = useNavigation<MessageNavigation>();
  const {User} = useAuthContext()
    //#region 뒤로가기 버튼 제어 & 더블클릭시 앱 종료
  let currentCount = 0;
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton)
      //console.log("focus MainScreen");
    });
    navigation.addListener('blur', () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
      //console.log("blur MainScreen");
    })
    return setDatas(undefined);
  }, []);
  const handleBackButton = () => {
    if (currentCount < 1) {
      currentCount += 1;
      if (Platform.OS === 'android') {
        showToast('뒤로 가기를 한번 더 누르면 앱이 종료됩니다.\n로그아웃은 설정->로그아웃으로 가주세요.')
      } else {
        BackHandler.exitApp();
      }
      setTimeout(() => {
        currentCount = 0;
      }, 2000);
      return true;
    }
  }
  //#endregion 뒤로가기 버튼 제어 & 더블클릭시 앱 종료
  useEffect(() => {
    // console.log('token', token);
    // console.log('User', User.uuid);
    axios
      .get<APIData>(`${API_URL}/api/v1/rooms/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: `application/json`,
        },
      })
      .then((response) => {
        // console.log('response',response)
        const data: any = response.data.results.map((d) => {
          const day = (d.boarding_dtm) ? Week[new Date(d.boarding_dtm).getDay()] : '';
          const date = (d.boarding_dtm) ? new Date(d.boarding_dtm) : '';
          return {
          ...d,
            boarding_dtm: (d.boarding_dtm) ?
              (date && date.getDate() == new Date().getDate()) ?
                format(new Date(d.boarding_dtm), '오늘 HH:mm')
                : format(new Date(d.boarding_dtm), 'MM/dd(' + day + ')')
              : undefined
          
        }
      });
        setDatas(data);
      });
  }, [token]);

  if (!datas || datas.length <= 0) {
    return <></>;
  }

  return (
    <Container>
      <ScrollView contentContainerStyle={{marginTop:10}}>
        <ChatRoomList
          datas={datas}
          onPress={(data: ChatRoom) => () => setNavName({
            istab: 'NoTab',
            tab: "MessageNoTabNavigation",
            screen: 'ChatRoomScreen', //CreateScreenDetails하면 기본 초기화 화면 바꿔서 바로 그쪽으로 이동. 안의 props값은 useAuthContext로 해당 페이지에서 또 읽음
            props: {
              data: data,
            }
          })}

            // navigation.navigate('ChatRoomScreen', { id });
        />
      </ScrollView>
    </Container>
  );
};
const Container = styled.SafeAreaView`
  flex: 1;
  background-color:white;
`;