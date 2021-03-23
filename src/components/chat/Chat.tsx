import styled from '@emotion/native';
import { format, getDate } from 'date-fns';
import { ko } from 'date-fns/locale';
import React from 'react';
import { Text } from 'react-native';
import { Message } from '../../screens/message/ChatRoomScreen';
import { MessageCard } from './MessageCard';

type Props = {
  data: Message;
  datas: Message[];
  index: number;
};
export const Chat: React.FC<Props> = ({ data, index, datas }) => {
  const beforeDate = index !== 0 ? getDate(new Date(datas[index - 1].created_at)) : undefined;
  const nowDate = getDate(new Date(data.created_at));

  return (
    <>
      {beforeDate !== nowDate && (
        <DateContainer>
          <DateWrapper>
            <Text>
              {format(new Date(data.created_at), 'yyyy년 M월 dd일 EEEE', {
                locale: ko,
              })}
            </Text>
          </DateWrapper>
        </DateContainer>
      )}
      <MessageContainer>
        <MessageCard isWriter={data.writer === 1} key={data.id}>
          {data.message}
        </MessageCard>
      </MessageContainer>
    </>
  );
};

const DateContainer = styled.View`
  align-items: center;
`;

const DateWrapper = styled.View`
  max-width: 180px;
  align-items: center;
  border-radius: 13px;
  background-color: #e5e5e8;
  padding: 4px 16px;
  margin-top: 16px;
`;

const MessageContainer = styled.View`
  display: flex;
`;
