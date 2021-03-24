import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
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
      }}>
      <MessageStack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          title: '내 채팅방 목록', headerLeft: undefined, headerTintColor: 'black',
        }}
      />
      <MessageStack.Screen
        name="ChatRoomScreen"
        component={ChatRoomScreen}

        options={{ headerTransparent: true, title: '', headerTintColor: 'white' }}
      />
    </MessageStack.Navigator>
  );
};
