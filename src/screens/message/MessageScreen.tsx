import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { ChatRoom, ChatRoomDummyList, ChatRoomList } from '../../components/chat-room/ChatRoomList';
import { API_URL } from '../../constant';
import { useAuthContext } from '../../contexts/AuthContext';
import { MessageStackParamList } from './MessageNavigation';

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
  const navigation = useNavigation<MessageNavigation>();

  useEffect(() => {
    console.log('token', token);
    axios
      .get<APIData>(`${API_URL}/api/v1/rooms/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
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
      <ScrollView>
        <ChatRoomList
          datas={datas}
          onPress={(id: number) => () => {
            navigation.navigate('ChatRoomScreen', { id });
          }}
        />
      </ScrollView>
    </Container>
  );
};
const Container = styled.SafeAreaView`
  flex: 1;
  background-color:white;
  padding-top:20px;
`;