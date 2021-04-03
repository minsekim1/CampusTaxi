import styled from '@emotion/native';
import React, { Dispatch, SetStateAction, useRef, useEffect } from 'react';
import { Modalize } from 'react-native-modalize';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { MapRoomCard } from './MapRoomCard';
import { ChatRoom, ChatRoomDummy } from '../chat-room/ChatRoomList';
import NaverMapView from 'react-native-nmap';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = {
	datas: ChatRoom[];
	onPress: (data: ChatRoom) => void;
};
export const SwipeableView: React.FC<Props> = ({
	datas,
	onPress
}) => {
	const modalizeRef = useRef<Modalize>(null);
	const onPressMapRoomCard = (data: ChatRoom) => {
		onPress(data);
		modalizeRef.current?.close('alwaysOpen');
	};
	return (
			<Container>
				<Modalize alwaysOpen={70} ref={modalizeRef}
					overlayStyle={overlayStyle}
					handlePosition="inside"
					handleStyle={handleStyle}
				modalStyle={modalStyle}
			>
				<HView>
					{datas.map((data) => (
						(data.id != -1) ?
							<MapRoomCard key={data.id} data={data} onPress={() => onPressMapRoomCard(data)} /> : null
					))}
					</HView>
				</Modalize>
		</Container>
  );
};
const HView = styled.View`width:100%;height:500px;padding:10px;padding-top:52px`
const overlayStyle = { backgroundColor: 'rgba(0,0,0,0)' }
const handleStyle = { backgroundColor: "#707070" }
const modalStyle = { backgroundColor: 'rgba(255,250,240,0.9)', marginHorizontal: 5 }
const Container = styled.View`
	height:76%;
	width: 100%;
	position: absolute;
	bottom: 30px;
`