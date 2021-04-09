import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeNoTabNavigation } from './home/HomeNoTabNavigation';
import { MessageNoTabNavigation } from './message/MessageNoTabNavigation';
import { SettingNoTabNavigation } from './setting/SettingNoTabNavigation';
import { NotificationNoTabNavigation } from './notification/NotificationNoTabNavigation';

export type NoTabParamList = {
	HomeNoTabNavigation: undefined;
	MessageNoTabNavigation: undefined;
	SettingNoTabNavigation: undefined;
	NotificationNoTabNavigation: undefined;
};

const NoTab = createStackNavigator<NoTabParamList>();
export const NoTabNavigation = () => {
	const tab = useAuthContext().MoveNav.tab;
	return (
		<NoTab.Navigator
			initialRouteName={(
				tab === 'HomeNoTabNavigation' ||
				tab === 'MessageNoTabNavigation' ||
				tab === 'SettingNoTabNavigation' ||
				tab === 'NotificationNoTabNavigation')
				? tab : "HomeNoTabNavigation"}
			screenOptions={{ title: '', headerShown:false, }}>
			<NoTab.Screen
				name="HomeNoTabNavigation"
				component={HomeNoTabNavigation}
			/>
			<NoTab.Screen
				name="MessageNoTabNavigation"
				component={MessageNoTabNavigation}
			/>
			<NoTab.Screen
				name="SettingNoTabNavigation"
				component={SettingNoTabNavigation}
			/>
			<NoTab.Screen
				name="NotificationNoTabNavigation"
				component={NotificationNoTabNavigation}
			/>
		</NoTab.Navigator>
	);
};
