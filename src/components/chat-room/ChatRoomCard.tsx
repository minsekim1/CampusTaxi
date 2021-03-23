import styled from '@emotion/native';
import React from 'react';
import { Text } from 'react-native';
import { ChatRoom } from './ChatRoomList';

type Props = {
  data: ChatRoom;
  onPress: () => void;
};
export const ChatRoomCard: React.FC<Props> = ({ data, onPress }) => {
  return (
    <DataContainer onPress={onPress}>
      <Card>
        <TempCircle>
          <CircleText>NO.{data.id}</CircleText>
          <CircleText>{data.gender}</CircleText>
        </TempCircle>
        <CardContainer>
          <CardHeaderContainer>
            <LeftContainer>
              <Title>{data.title}</Title>
            </LeftContainer>
            <RightContainer>
              <Count>
                {data.currentCount}/{data.maxCount}
              </Count>
              <Time>{data.time}</Time>
            </RightContainer>
          </CardHeaderContainer>
          <CardBodyContainer>
            <TextContainer>
              <Text>{data.startLocation}</Text>
              <Text>{data.arriveLocation}</Text>
            </TextContainer>
            {data.unreadMessage ? 
              <MessageBadge>
                <BadgeText>{data.unreadMessage}</BadgeText>
              </MessageBadge>
              : null }
          </CardBodyContainer>
        </CardContainer>
      </Card>
      <Line />
    </DataContainer>
  );
};

const DataContainer = styled.TouchableOpacity``;

const Card = styled.View`
  flex-direction: row;
  background-color: #ffffff;
  padding-top: 24px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 24px;
`;

const Line = styled.View`
  width: 100%;
  height: 0;
  border: solid 1px #e5e5e8;
`;

const TempCircle = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 31px;
  background-color: #ff6464;
  justify-content: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  margin-right: 16px;
`;

const CircleText = styled.Text`
  color: white;
  text-align: center;
`;

const CardContainer = styled.View`
  flex: 1;
`;

const CardHeaderContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const LeftContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

const RightContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Count = styled.Text`
  color: #b7b7bb;
  font-size: 15px;
  font-weight: bold;
`;

const Time = styled.Text`
  font-size: 13px;
  font-weight: 300;
  margin-left: 16px;
`;

const CardBodyContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TextContainer = styled.View``;

const MessageBadge = styled.View`
  border-radius: 14px;
  background-color: #f8843c;
  padding: 8px 12px;
`;

const BadgeText = styled.Text`
  color: white;
`;
