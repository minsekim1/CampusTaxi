import React from 'react';
import { ChatRoomCard } from './ChatRoomCard';

export type ChatRoom = {
  id: number;
  // gender: string;
  // title: string;
  // currentCount: number;
  // maxCount: number;
  // time: string;
  // startLocation: string;
  // arriveLocation: string;
  unreadMessage?: string;
  distance?: number;

  start_address_code?: string,
  start_address?: string,
  start_address_detail?: string,
  start_lat: number,
  start_lon: number,
  end_address?: string,
  end_address_detail?: string,
  end_lat: number,
  end_lon: number,
  boarding_dtm?: string,
  personnel_limit?: number,
  gender?: number,
  owner?: number,
  category?: string,
  current?: string,
  cost?:number,
};

export const ChatRoomDummy = {
  id: -1,//id가 -1인 경우는 Start CreateRoom만 유일하다.
  unreadMessage: undefined,
  distance: 0,
  start_address_code: undefined,
  start_address: undefined,
  start_address_detail: undefined,
  start_lat: 0,
  start_lon: 0,
  end_address: undefined,
  end_address_detail: undefined,
  end_lat: 0,
  end_lon: 0,
  boarding_dtm: undefined,
  personnel_limit: 0,
  gender: 0,
  owner: 0,
  category: undefined,
  current: undefined,
};

export type Props = {
  onPress: (id: number) => () => void;
  datas: ChatRoom[];
};
export const ChatRoomList: React.FC<Props> = ({ datas, onPress }) => {
  return (
    <>
      {datas.map((data) => (
        <ChatRoomCard key={data.id} data={data} onPress={onPress(data.id)} />
      ))}
    </>
  );
};
