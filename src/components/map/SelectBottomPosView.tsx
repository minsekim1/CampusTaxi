import styled from '@emotion/native';
import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ChatRoom } from '../chat-room/ChatRoomList';
const windowWidth = Dimensions.get('window').width;
type Props = {
	type: number;
	onPressStart: ()=>void;
	onPressEnd: ()=>void;
};
export const SelectBottomPosView: React.FC<Props> = ({
	type,
	onPressStart,
	onPressEnd,
}) => {
	if (type == 2)
		return (
			<SplitContainer>
				<ColorView onPress={onPressStart}>
					<Col>
						출발지 정하기
					</Col>
				</ColorView>
				<ColorView onPress={onPressEnd}> 
					<Col>
						도착지 정하기
					</Col>
				</ColorView>
			</SplitContainer>
		);
	return (
		<Container onPress={type == 0 ? onPressStart : onPressEnd}>
			<Col>
				현재 화면 가운데로 {type == 0 ? "출발지" : "도착지"} 정하기
			</Col>
		</Container>
	);
};
const SplitContainer = styled.View`
	position:absolute;
	bottom:106px;
	left:70px;
	width:${(windowWidth - 80).toString()}px;
	height:39px;
	flex-direction: row;
	justify-content: space-around;
  align-items: center;
`
const ColorView = styled.TouchableOpacity`
	background-color:rgba(255,255,255,0.6);
	padding: 0 30px 0 30px;
	justify-content: center;
	height: 39px;
	border-radius: 8px;
`

const Col = styled.Text`
	flex-direction: column;
	align-items: center;
	font-size: 13px;
`;
const Container = styled.TouchableOpacity`
	position:absolute;
	bottom:106px;
	left:70px;
	width:${(windowWidth - 80).toString()}px;
	height:39px;
	background-color:rgba(255,255,255,0.6);
	border-radius: 8px;
	flex-direction: row;
	justify-content: space-evenly;
  align-items: center;

`;