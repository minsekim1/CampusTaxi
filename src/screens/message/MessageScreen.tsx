import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { ChatRoom, ChatRoomList } from '../../components/chat-room/ChatRoomList';
import { API_URL } from '../../constant';
import { useAuthContext } from '../../contexts/AuthContext';
import { MessageStackParamList } from './MessageNavigation';

type MessageNavigation = StackNavigationProp<MessageStackParamList, 'MessageScreen'>;

const Gender = ['여자', '남자'];
type APIData = {
  count: number;
  next: number;
  previous: number;

  results: {
    id: number;
    gender: number;
    personnel_limit: number;
    current: number;
    boarding_dtm: string;
    start_address: string;
    end_address: string;
  }[];
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
        const data = response.data.results.map((item) => ({
          id: 1,
          gender: Gender[item.gender] ?? '남 여',
          title: 'title',
          currentCount: item.current,
          maxCount: item.personnel_limit,
          time: format(new Date(item.boarding_dtm), 'HH:MM'),
          startLocation: item.start_address,
          arriveLocation: item.end_address,
          unreadMessage: '300+',
        }));
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
`;
