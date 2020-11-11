//실제 유저들이 채팅하는 화면
export default class chatroomScreen extends Component {
	//#region 변수들
	constructor(props) {
		super(props);
		this.state = {
			bbskey: this.props.route.params.bbskey,
			myname: userStore.user.i,
			mygender: this.props.route.params.mygender,
			personmember: this.props.route.params.personmember,
			personmax: this.props.route.params.personmax,
			meetingdate: this.props.route.params.meetingdate,
			chattingData: [],
			refreshing: false,
			time: new Date(),
			textInput: "",
			isVision: false,
			textSearch: "",
		};

		this.setTextSearch = this.setTextSearch.bind(this);
	}
	componentDidMount() {
		this.updateChattingDate();
		bbsStore.asyncAllBbs();
	}
	async updateChattingDate() {
		await firebase
			.database()
			.ref("bbs/data/" + this.state.bbskey + "/d")
			.on("value", (snap) => {
				let resultarr = [];
				snap.forEach((snap2) => {
					let item = snap2.val();
					resultarr.push(item);
				});
				if (resultarr.length != 0) {
					this.setState({ chattingData: resultarr });
				}
			});
		await this.flatListRef.scrollToEnd({ animated: false }); // 채팅을 가장 아래로 내립니다.
	}
	getServerTime() {
		fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul")
			.then((res) => res.json())
			.then((result) => {
				let time = result.datetime.slice(0, 21) + result.datetime.slice(26, 32);
				this.setState({ time: time });
			});
	}
	async sendMessage() {
		if (this.state.textInput != "") {
			await this.getServerTime(); //현재 시간을 가져옵니다.
			await firebase //파이어베이스 push
				.database()
				.ref("bbs/data/" + this.props.route.params.bbskey + "/d")
				.push({
					db: userStore.user.h,
					dc: String(this.state.time),
					dd: this.state.textInput,
				});
			await this.updateChattingDate();
			this.setState({ textInput: "" }); //Input의 채팅 내용을 지웁니다.
			this.flatListRef.scrollToEnd({ animated: true }); // 채팅을 가장 아래로 내립니다.
		}
	}
	//Start Search Text
	setVision(Bool) {
		this.setState({
			isVision: Bool
		});
	}
	setTextSearch(text) {
		this.setState({
			textSearch: text
		})
	}
	//End Search Text
	//#endregion
	render() {
		const { navigation } = this.props;
		return (
			<>
				<View style={{ height: "20%", marginBottom: 15 }}>
					<View
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							zIndex: 1,
						}}
					>
						<Header
							containerStyle={{
								height: 170,
								alignItems: "stretch",
							}}
							backgroundColor={
								bbsStore.bbsnow.h == 2
									? "#3A3A3A"
									: bbsStore.bbsnow.h == 1
									? "#DE22A3"
									: "#55A1EE"
							}
							leftComponent={
								<Button
									type="clear"
									title=""
									icon={<Icon name="arrow-back" size={24} color="white" />}
									onPress={() => navigation.goBack()}
								></Button>
							}
							centerComponent={{
								text: (
									<>
										<View
											style={{
												flex: 1,
												flexDirection: "column",
												justifyContent: "space-around",
												alignItems: "center",
											}}
										>
											<View style={campusStyle.View.top5}>
												<View style={campusStyle.View.row}>
													<Image
														source={crown}
														style={{ width: 23, height: 15, marginTop: 3 }}
													/>
													<Observer>
														{() => (
															<Text style={campusStyle.Text.middleBold}>
																{bbsStore.bbsnow.i}
															</Text>
														)}
													</Observer>
												</View>
											</View>

											<Text style={campusStyle.Text.whiteInput}>
												출발지:
												{/* {bbsStore.bbsnow != ""
													? bbsStore.bbsnow.n.name
													: this.props.route.params.startplace.name} */}
												{this.props.route.params.startplace.name}
											</Text>
											<Text style={campusStyle.Text.whiteInput}>
												도착지:
												{/* {bbsStore.bbsnow != ""
													? bbsStore.bbsnow.g.name
													: this.props.route.params.endplace.name} */}
												{this.props.route.params.endplace.name}
											</Text>

											<Text style={campusStyle.Text.smallCenter}>
												{bbsStore.bbsnow.j} 출발예정
											</Text>
										</View>
									</>
								),
							}}
							rightComponent={
								<View style={campusStyle.View.row}>
									<Button
										type="clear"
										title=""
										icon={<Icon name="map" size={24} color="white" />}
										onPress={() => {
											navigation.navigate("지도", {
												url:
													"https://m.map.naver.com/directions/#/publicTransit/detail/%25ED%2583%259C%25EB%25A6%2589%25EC%259E%2585%25EA%25B5%25AC%25EC%2597%25AD%25206%25ED%2598%25B8%25EC%2584%25A0,127.0747201,37.6173467,127.0744909,37.6174622,false,13479509/%25EC%2582%25BC%25EC%259C%25A1%25EB%258C%2580%25ED%2595%2599%25EA%25B5%2590,127.1042695,37.6429793,127.1074000,37.6386000,false,11591563/0/0/map/0",
											});
										}}
									/>
									<Button
										type="clear"
										title=""
										icon={<Icon name="search" size={24} color="white" />}
										onPress={() => {
											this.setVision(!this.state.isVision);
										}}
									/>
									
									{this.state.isVision ? ( // Modal search
										<Modal
											isVisible={this.state.isVision}
											style={campusStyle.Modal.modalStyle}
										>
											<View style={campusStyle.Modal.view}>
												<Header
													containerStyle={campusStyle.Modal.container}
													centerComponent={{
														text: "검색",
														style: campusStyle.Modal.component,
													}}
												/>
												<Input type="text" name="TextSearch" onChange={(event) => {
													this.setTextSearch(event.nativeEvent["text"]);
												}} autoFocus />
												<Button
													title="검색하기"
													onPress={() => { 
														let result = this.state.chattingData; // 채팅 내용 가져옴
														for(let i = 0; i < result.length; i++) {
															if (result[i]["dd"] == this.state.textSearch) { // "dd" -> 채팅 내용배열
																this.flatListRef.scrollToIndex({
																	animated: true, // 애니메이션
																	index: i // index 위치로 이동
																});
															}
														}
														// console.log(this.state.textSearch); // test
														this.setVision(!this.state.isVision); // off
													}}
												/>
												<Button
													title="닫기"
													onPress={() => {
														this.setVision(!this.state.isVision); // off function
													}}
												/>
											</View>
										</Modal>
									): null
									}

									<Button
										type="clear"
										title=""
										icon={<Icon name="person" size={24} color="white" />}
										onPress={() => {
											navigation.navigate("채팅방정보", {
												bbskey: this.state.bbskey,
											});
										}}
									/>
								</View>
							}
						/>
					</View>
				</View>

				{/* 채팅 내용부분 */}
				<FlatList
					data={this.state.chattingData}
					keyExtractor={(item, i) => String(i)}
					ref={(ref) => {
						this.flatListRef = ref;
					}}
					renderItem={({ item }) => (
						<ChattingItem
							isLeader={this.state.leaderkey == item.db ? true : false}
							say={item.dd}
							name={item.db}
							time={item.dc}
							isMychat={userStore.user.i == item.db ? true : false}
						/>
					)}
				/>

				{/* 채팅 Input 부분 */}
				<View style={campusStyle.View.wideWhite}>
					<View style={{ flex: 4 }}>
						<TextInput
							value={this.state.textInput}
							onChangeText={(textEntry) => {
								this.setState({ textInput: textEntry });
							}}
							onSubmitEditing={() => this.sendMessage()}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<Button title="전송" onPress={() => this.sendMessage()}>
							<Image style={campusStyle.Image.middleSize} />
						</Button>
					</View>
				</View>
			</>
		);
	}
}

class ChattingItem extends React.PureComponent {
	render() {
		const isLeader = this.props.leaderkey;
		const say = this.props.say;
		const name = this.props.name;
		const time = this.props.time;
		const isMychat = this.props.isMychat;
		const now = new Date(time);
		let hour = now.getHours().toString();
		let min = now.getMinutes().toString();
		if (min.length == 1) min = "0" + min;
		let day = "오전";
		if (hour >= 12) {
			if (hour != 12) hour -= 12;
			day = "오후";
		}

		// 방장 일경우 왕관 이미지 넣기
		let image;
		if (isLeader) {
			image = <Image source={crown} />;
		}
		let containerItem; //내 채팅일 경우 좌우반전
		//getMonth +1 월
		//getDate 일
		//getDay 요일(0:일, 1:월 ...)
		//getHours 0-23
		//getMinutes() 0-59
		if (name == "SYSTEM") {
			containerItem = (
				<View style={ItemStyle.itemSystem_Message}>
					<Text>{say}</Text>
				</View>
			);
		} else if (isMychat) {
			containerItem = (
				<View>
					<Text style={ItemStyle.item_titleReverse}>
						{image}
						{name}
					</Text>
					<View style={ItemStyle.itemMain_containerReverse}>
						<Text style={ItemStyle.item_time}>
							{day + " " + hour + ":" + min}
						</Text>
						<Text style={ItemStyle.item_contentReverse}>{say}</Text>
					</View>
				</View>
			);
		} else {
			containerItem = (
				<View>
					<Text style={ItemStyle.item_title}>
						{image}
						{name}
					</Text>
					<View style={ItemStyle.itemMain_container}>
						<Text style={ItemStyle.item_content}>{say}</Text>
						<Text style={ItemStyle.item_time}>
							{day + " " + hour + ":" + min}
						</Text>
					</View>
				</View>
			);
		}
		return <>{containerItem}</>;
	}
}

const ItemStyle = StyleSheet.create({
	item_title: {
		alignSelf: "flex-start",
		fontSize: 15,
		fontWeight: "bold",
		marginBottom: 5,
		marginLeft: 20,
	},
	item_titleReverse: {
		alignSelf: "flex-end",
		fontSize: 15,
		fontWeight: "bold",
		marginBottom: 5,
		marginRight: 20,
	},
	item_content: {
		fontSize: 15,
		backgroundColor: "#E5E5E8",
		borderRadius: 9,
		padding: 10,
		fontWeight: "400",
		maxWidth: "77%",
		marginLeft: 20,
	},
	item_contentReverse: {
		fontSize: 15,
		backgroundColor: "#E5E5E8",
		borderRadius: 9,
		padding: 10,
		fontWeight: "400",
		maxWidth: "77%",
		marginRight: 20,
	},
	item_time: {
		justifyContent: "flex-start",
		alignSelf: "flex-end",
		fontSize: 11,
		marginLeft: 5,
		marginRight: 5,
		color: "grey",
	},
	itemMain_container: {
		flexDirection: "row",
		marginBottom: 10,
	},
	itemMain_containerReverse: {
		flexDirection: "row",
		marginBottom: 10,
		justifyContent: "flex-end",
	},
	itemSystem_Message: {
		flexDirection: "row",
		marginTop: 10,
		marginBottom: 5,
		marginLeft: 20,
		marginRight: 20,
		justifyContent: "center",
		alignSelf: "center",
		fontSize: 15,
		padding: 10,
		fontWeight: "400",
		backgroundColor: "rgba(0, 0, 0, 0.05)",
		borderRadius: 10,
	},
});

import React, { useState, useRef, Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Image,
	StatusBar
} from "react-native";
import { Header, Icon, Button, Input } from "react-native-elements";
import campusStyle from "style";
import { TextInput } from "react-native-gesture-handler";
import crown from "image/crown.png";
const firebase = require("firebase");
import { bbsStore, userStore, anotherStore } from "store";
import { Observer } from "mobx-react";
import Modal from "react-native-modal";