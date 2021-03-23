import styled from '@emotion/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { differenceInMilliseconds } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, ScrollView, StatusBar } from 'react-native';
import { Chat } from '../../components/chat/Chat';
import { BlankBackground } from '../../components/layout/BlankBackground';
import { API_URL } from '../../constant';
import { useAuthContext } from '../../contexts/AuthContext';
import { MessageStackParamList } from './MessageNavigation';

type NavigationRoute = RouteProp<MessageStackParamList, 'ChatRoomScreen'>;
export type Message = {
  id: number;
  message: string;
  message_type: 'Message' | 'Notice' | 'Enter';
  writer: number;
  room: number;
  created_at: Date;
  updated_at: Date;
};

const data = [
  {
    id: 1,
    message: 'hello',
    message_type: 'Message',
    writer: 1,
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    message: 'hello',
    message_type: 'Message',
    writer: 1,
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    message: 'hello',
    message_type: 'Message',
    writer: 2,
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export const ChatRoomScreen: React.FC = () => {
  const [datas, setDatas] = useState<Message[]>(data);
  const [message, setMessage] = useState('');
  const { token } = useAuthContext();
  const route = useRoute<NavigationRoute>();
  const id = route.params.id;
  const [refetch, setRefetch] = useState<Date>();
  const scrollView = useRef<ScrollView>(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#579fee');
    }
    StatusBar.setBarStyle('dark-content');
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get<Message[]>(`${API_URL}/api/v1/messages/?room=${id}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          const data = response.data.sort((a, b) =>
            differenceInMilliseconds(new Date(a.created_at), new Date(b.created_at)),
          );
          // setDatas(data);
        });
    }
  }, [id, token, refetch]);

  useEffect(() => {
    if (datas && scrollView.current) {
      setTimeout(() => {
        scrollView.current?.scrollToEnd({ animated: true });
      }, 500);
    }
  }, [scrollView, datas]);

  const sendMessage = (text: string) => {
    if (token) {
      axios
        .post(
          `${API_URL}/api/v1/messages/`,
          { message: text, message_type: 'Message', writer: 1, room: id },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          },
        )
        .then(() => {
          setRefetch(new Date());
        });
    }
  };

  if (!datas || datas.length <= 0) {
    return <></>;
  }

  return (
    <BlankBackground color="#579fee">
      <KeyboardContainer behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Container>
          <BlankBackground color="#fff">
            <TitleContainer />
            <ContentContainer
              ref={scrollView}
              onLayout={() => {
                scrollView.current?.scrollToEnd({ animated: true });
              }}>
              {datas.map((data, index) => (
                <Chat key={data.created_at.toString()} data={data} index={index} datas={datas} />
              ))}
            </ContentContainer>
            <TextAreaContainer>
              <TextArea
                value={message}
                autoCapitalize="none"
                returnKeyType="send"
                onChangeText={setMessage}
                onSubmitEditing={(e) => {
                  setMessage('');
                  sendMessage(e.nativeEvent.text);
                }}
              />
            </TextAreaContainer>
          </BlankBackground>
        </Container>
      </KeyboardContainer>
    </BlankBackground>
  );
};

const Container = styled.SafeAreaView`
  justify-content: space-around;
  padding-top: 24px;
  flex: 1;
`;

const KeyboardContainer = styled.KeyboardAvoidingView`
  flex: 1;
`;

const TitleContainer = styled.View`
  background-color: #579fee;
  height: 120px;
`;

const ContentContainer = styled.ScrollView`
  margin-bottom: 12px;
`;

const TextAreaContainer = styled.View`
  padding: 5px 22px 10px 24px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
  background-color: #faf9f9;
`;

const TextArea = styled.TextInput`
  padding: 8px 12px;
  margin: 5px 0 1px 10px;
  border-radius: 21px;
  border: solid 1px #b7b7bb;
  background-color: #ffffff;
`;
