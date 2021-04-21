import styled from '@emotion/native';
import React, { Dispatch, SetStateAction} from 'react';
import { ChatRoom } from '../chat-room/ChatRoomList';
import { Boarding_dtmToRecently } from '../chat/date';
import { GenderColor, GenderText } from '../color/GenderColor';
import { CreateRoomSelectCancel} from '../icon/home/CreateRoomSelectCancel';

type Props = {
  data?: ChatRoom;
  onPress: (data: ChatRoom) => () => void;
  backgroundColor?: string;
  activeCancelBtn?: boolean;
};
export const ChatRoomCard: React.FC<Props> = ({ data, onPress, backgroundColor, activeCancelBtn }) => {
  if (!data)
    return <></>
  const bgColor = GenderColor(data.gender);
  const genderText = GenderText(data.gender);
  return (
    <DataContainer onPress={()=>onPress(data)}>
      <Card style={{ backgroundColor: backgroundColor ? backgroundColor : 'white' }}>
        <TempCircle style={{ backgroundColor: bgColor}}>
          <CircleText>{genderText}</CircleText>
        </TempCircle>
        <CardContainer>
          <CardHeaderContainer>
            <LeftContainer>
              <Time>{Boarding_dtmToRecently(data.boarding_dtm)} 탑승</Time>
              <TitleView>
                <Title>{data.owner}</Title>
              <TitleVip>VIP</TitleVip>
              </TitleView>
            </LeftContainer>
            <Distance>{data.distance}</Distance>
          </CardHeaderContainer>
          <CardBodyContainer>
            <TextContainer>
              <TextArea>출발지 - {data.start_address_detail}</TextArea>
              <TextArea>도착지 - {data.end_address_detail}</TextArea>
            </TextContainer>
            <RightContainer>
              <Count>
                {data.current}명/{data.personnel_limit}명
              </Count>
            </RightContainer>
          </CardBodyContainer>
        </CardContainer>
      </Card>
    </DataContainer>
  );
};
const OnlyCancelView = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  background-color: rgb(233,235,255);
  height:28px;
  width:28px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`
const Distance = styled.Text`
  color: #B7B7BB;
  font-size: 10px;
`
const CancelBtn = styled.TouchableOpacity`
  margin: 0 4px 4px 4px;
  padding: 2px 5px 5px 5px;
  height: 30px;
`;
const DataContainer = styled.TouchableOpacity`
  height: 115px;
`;

const Card = styled.View`
  flex-direction: row;
  padding: 8px 8px 8px 9px;
  margin: 0 8px 18px 9px;
  border-radius: 19px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
`;

const TempCircle = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 17px;
  background-color: #F28A8A;
  justify-content: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  margin-right: 16px;
  margin-top: 20px;
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
  margin-top:-1px;
`;

const TitleView = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top:3px;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 13px;
  font-weight: bold;
  `;
const TitleVip = styled.Text`
  font-size: 9px;
  font-weight: bold;
  background-color: #fff780;
  height: 18px;
  padding: 2px 7px 2px 7px;
  margin-left: 17px;
  text-align: center;
  border-radius: 25px;
`;

const RightContainer = styled.View`
  padding-right:10px;
`;

const Count = styled.Text`
  color: #343434;
  font-size: 11px;
  font-weight: bold;
  opacity: 0.59;
`;

const Time = styled.Text`
  font-size: 8px;
  font-weight: bold;
  padding: 1px 8px 1px 8px;
  border-radius: 7px;
  border: solid 1px #D0D0D0;
  background-color: #ffffff;
  text-align:center;
`;

const CardBodyContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TextContainer = styled.View`
margin-bottom:0px;
`;

const TextArea = styled.Text`
  font-size: 11px;
  margin-bottom: 3px;
`;