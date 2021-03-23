import styled from '@emotion/native';
import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ChatRoom } from '../chat-room/ChatRoomList';
const windowWidth = Dimensions.get('window').width;
type Props = {
	data?: ChatRoom;
};
export const SelectedBottomView: React.FC<Props> = ({
	data
}) => {
	if (!data)
		return (<></>);
	return (
		<Container>
			<Col>
				<TitleText>예상시간</TitleText>
				<Row>
					<BlueText>{data.boarding_dtm} </BlueText>
					<TitleText>5km(임시)</TitleText>
				</Row>
			</Col>
			<VerticalBar/>
			<Col>
				<TitleText>예상금액</TitleText>
				<BlueText>약 6,700원(임시)</BlueText>
			</Col>
		</Container>
	);
};

const VerticalBar = styled.View`
	border-width: 0.3px;
	border-color:#707070;
	height: 48px;
`;
const Col = styled.View`
	flex-direction: column;
	align-items: center;
`;
const DownText = styled.View`
	
`
const Row = styled.View`
	align-items: flex-end;
	flex-direction: row;
	`;
const BlueText = styled.Text`
	color: #276FFF;
	font-size: 15px;
	font-weight: bold;
	padding-top:3px;
	`;
const TitleText = styled.Text`
	font-size: 11px;
	font-weight: bold;
	`;
const Container = styled.View`
	position:absolute;
	bottom:106px;
	left:70px;
	width:${(windowWidth-80).toString()}px;
	height:72px;
	background-color:rgba(255,255,255,0.6);
	border-radius: 8px;
	flex-direction: row;
	justify-content: space-evenly;
  align-items: center;

`;