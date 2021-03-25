import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import React from 'react';
import { useAuthContext } from '../../../contexts/AuthContext';
import { GeoScreen } from '../login/document/GeoScreen';
import { MarketingScreen } from '../login/document/MarketingScreen';
import { PrivacyScreen } from '../login/document/PrivacyScreen';
import { TermsScreen } from '../login/document/TermsScreen';

export type SettingNoTabNavigationParamList = {
	GeoScreen: undefined;
	MarketingScreen: undefined;
	PrivacyScreen: undefined;
	TermsScreen: undefined;
};
const SettingStack = createStackNavigator<SettingNoTabNavigationParamList>();
export const SettingNoTabNavigation = () => {
	const props = useAuthContext().MoveNav.props;
	const { setNavName } = useAuthContext();
	return (
		<SettingStack.Navigator initialRouteName={(props?.screen) ? props.screen : "ChatRoomScreen"}  >
			<SettingStack.Screen
				options={{
						headerTitleAlign: 'center', title: '위치정보 이용약관',
						headerLeft: (props) => (
							<HeaderBackButton
								{...props}
								onPress={() => setNavName({ istab: 'Tab', tab:'SettingTabScreen'})}/>)
					}}
				name="GeoScreen"
				component={GeoScreen}
			/>
			<SettingStack.Screen
				name="MarketingScreen"
				component={MarketingScreen}
				options={{
					headerTitleAlign: 'center', title: '마케팅 정보 수신',
					headerLeft: (props) => (
						<HeaderBackButton
							{...props}
							onPress={() => setNavName({ istab: 'Tab', tab: 'SettingTabScreen' })} />)
				}}
			/>
			<SettingStack.Screen
				name="PrivacyScreen"
				component={PrivacyScreen}
				options={{
					headerTitleAlign: 'center', title: '개인정보처리방침',
					headerLeft: (props) => (
						<HeaderBackButton
							{...props}
							onPress={() => setNavName({ istab: 'Tab', tab: 'SettingTabScreen' })} />)
				}}
			/>
			<SettingStack.Screen
				name="TermsScreen"
				component={TermsScreen}
				options={{
					headerTitleAlign: 'center', title: '서비스 이용약관',
					headerLeft: (props) => (
						<HeaderBackButton
							{...props}
							onPress={() => setNavName({ istab: 'Tab', tab: 'SettingTabScreen' })} />)
				}}
			/>
		</SettingStack.Navigator>
	);
};
