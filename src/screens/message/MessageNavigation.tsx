import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { BackIcon } from '../../components/icon/BackIcon';
import { ChatRoomScreen } from './ChatRoomScreen';
import { MessageScreen } from './MessageScreen';

export type MessageStackParamList = {
  MessageScreen: undefined;
  ChatRoomScreen: { id: number };
};
const MessageStack = createStackNavigator<MessageStackParamList>();

export const MessageNavigation = () => {
  return (
    <MessageStack.Navigator
      initialRouteName="MessageScreen"
      screenOptions={{
        headerTitleStyle: { alignSelf: 'center' },
        headerLeft: ({ onPress }) => <BackIcon onPress={onPress} />,
      }}>
      <MessageStack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{ title: '내 채팅방 목록', headerLeft: undefined }}
      />
      <MessageStack.Screen
        name="ChatRoomScreen"
        component={ChatRoomScreen}
        options={{ headerTransparent: true }}
      />
    </MessageStack.Navigator>
  );
};
