import React from 'react';
import { MapRoomCard } from '../map/MapRoomCard';

export type ChatRoom = {
  id: number;
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
  gender: number,
  owner?: number,
  category?: string,
  current?: string,
  cost?:number,
};

export type User = {
	uuid:	string;
	username:	string;
	gender:	number;
	nickname:	string;
	phone:	string;
	name:	string;
	email:	string;
	address?:	string;
	is_cert?:	boolean;
	cert_dtm?:	string;
	ban_dtm?:	string;
	date_joined?:	string;
	campus_name?:	string;
	student_card?:	string;
	is_staff?:	boolean;
	is_active?:	boolean;
}

export const UserDummy = {
	uuid:	'1',
	username:	'string',
	gender:	2,
	nickname:	'string',
	phone:	'string',
	name:	'string',
	email:	'string',
	address:	'string',
	is_cert:	false,
	cert_dtm:	'string',
	ban_dtm:	'string',
	date_joined:	'string',
	campus_name:	'string',
	student_card:	'string',
	is_staff:	false,
	is_active:	true,
}
export const UserDummyList = [
  { ...UserDummy },
  { ...UserDummy, uuid:'2', gender:1 },
  {...UserDummy, uuid:'3', gender:2},
  {...UserDummy, uuid:'4', gender:1},
]
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
export const ChatRoomDummyList = [ChatRoomDummy, ChatRoomDummy, ChatRoomDummy, ChatRoomDummy, ChatRoomDummy, ChatRoomDummy, ChatRoomDummy];

export type Props = {
  onPress: (data: ChatRoom) => () => void;
  datas: ChatRoom[];
};
export const ChatRoomList: React.FC<Props> = ({ datas, onPress }) => {
  return (
    <>
      {datas.map((data) => (
        <MapRoomCard key={data.id} data={data} onPress={onPress(data)} />
      ))}
    </>
  );
};
