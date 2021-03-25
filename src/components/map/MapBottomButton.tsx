import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { CreateScreenNavigationProp, myCoordProps } from '../../screens/notab/home/CreateScreen';
import { ChatRoom } from '../chat-room/ChatRoomList';

type Props = {
	selectRoom?: ChatRoom;
	end: myCoordProps;
	start: myCoordProps;
};

export const MapBottomButton: React.FC<Props> = ({ selectRoom, end, start }) => {
	const disabled = !(!!start.latitude && !!end.latitude);
	const isCreateRoom = selectRoom?.id == -1 || selectRoom?.id == -2;
	const { navigate } = useNavigation<CreateScreenNavigationProp>();
	return (
		<BottomButton
			underlayColor={'#83ABED'}
			disabled={disabled}
			onPress={() => navigate("CreateScreenDetails", selectRoom)}
			style={{ backgroundColor: disabled ? "rgb(112,112,112)" : "rgb(118, 162, 235)"}}>
			<Title>
				{disabled ? "채팅방 목록에서 방을 선택 또는 직접 출발지를 정해주세요." : isCreateRoom ? "새 방 만들기" :"방 입장하기"}
			</Title> 
		</BottomButton>
	);
};

const Title = styled.Text`
	font-size: 14px;
	font-family: bold;
	color: #FFFFFF;
`
type BottomButtonProps = {
	disabled?: boolean;
}
const BottomButton = styled.TouchableHighlight<BottomButtonProps>`
	position:absolute;
	bottom:0;
	width:100%;
	height: 48px;
	justify-content: center;
	align-items: center;
	z-index: 9999;
	`