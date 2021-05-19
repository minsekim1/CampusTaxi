import React from "react";
import { User, UserDummy } from "../../contexts/User";
import { MapRoomCard } from "../map/MapRoomCard";
import { ChatRoomCard } from "./ChatRoomCard";

export type ChatRoom = {
  // DB 스웨거 데이터폼
  id: number;
  start_address_code?: string;
  start_address?: string;
  start_address_detail?: string;
  start_lat: number;
  start_lon: number;
  end_address_code?: string;
  end_address?: string;
  end_address_detail?: string;
  end_lat: number;
  end_lon: number;
  boarding_dtm?: string;
  personnel_limit?: number;
  gender: "MALE" | "FEMALE" | "NONE";
  owner?: string;
  category?: string; //"등교 데이터 가져올때는 =1"
  current?: number; // 현재 인원

  // 커스텀
  cost?: number;
  distance?: number;
  unreadMessage?: string;
  costTime?: number;
};

export const UserDummyList: User[] = [
  { ...UserDummy },
  { ...UserDummy, uuid: "2", gender: "MALE" },
  { ...UserDummy, uuid: "3", gender: "FEMALE" },
  { ...UserDummy, uuid: "4", gender: "MALE" },
];
export const ChatRoomDummy:ChatRoom = {
  id: -1, //id가 -1인 경우는 Start CreateRoom만 유일하다.
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
  gender: "MALE",
  owner: 'cam',
  category: undefined,
  current: undefined,
};

export const ChatRoomDummyList: ChatRoom[] = [
  {
    id: 1,
    unreadMessage: "string",
    distance: 1.0,
    start_address_code: "string",
    start_address: "태릉입구역 2번출구",
    start_address_detail: "태릉입구역 2번출구",
    start_lat: 0,
    start_lon: 0,
    end_address: "삼육대학교",
    end_address_detail: "삼육대학교 분수대 앞",
    end_lat: 37.64353854399491,
    end_lon: 127.10579154192136,
    boarding_dtm: "string",
    personnel_limit: 4,
    gender: "FEMALE",
     owner: 'cam',
    category: "string",
    current: 3,
  },
  {
    id: 2,
    unreadMessage: "string",
    distance: 1.1,
    start_address_code: "01849",
    start_address: "태릉입구역 7번출구",
    start_address_detail: "태릉입구역 7번출구",
    start_lat: 37.61770651126973,
    start_lon: 127.07611602070332,
    end_address: "삼육대학교",
    end_address_detail: "삼육대학교 분수대 앞",
    end_lat: 37.64353854399491,
    end_lon: 127.10579154192136,
    boarding_dtm: "string",
    personnel_limit: 4,
    gender: "MALE",
    owner: 'cam',
    category: "string",
    current: 3,
  },
  {
    id: 3,
    unreadMessage: "string",
    distance: 2.1,
    start_address_code: "01849",
    start_address: "태릉입구역 7번출구",
    start_address_detail: "태릉입구역 7번출구",
    start_lat: 37.61770651126973,
    start_lon: 127.07611602070332,
    end_address: "삼육대학교",
    end_address_detail: "삼육대학교 분수대 앞",
    end_lat: 37.64353854399491,
    end_lon: 127.10579154192136,
    boarding_dtm: "string",
    personnel_limit: 4,
    gender: "NONE",
     owner: 'cam',
    category: "string",
    current: 3,
  },
  {
    id: 4,
    unreadMessage: "string",
    distance: 2.4,
    start_address_code: "string",
    start_address: "태릉입구역 7번출구",
    start_address_detail: "태릉입구역 7번출구",
    start_lat: 37.617753979295095,
    start_lon: 127.07629280500707,
    end_address: "삼육대학교",
    end_address_detail: "삼육대학교 분수대 앞",
    end_lat: 37.64353854399491,
    end_lon: 127.10579154192136,
    boarding_dtm: "string",
    personnel_limit: 4,
    gender: "MALE",
     owner: 'cam',
    category: "string",
    current: 3,
  },
  {
    id: 5,
    unreadMessage: "string",
    distance: 5.1,
    start_address_code: "string",
    start_address: "공릉역 2번출구",
    start_address_detail: "공릉역 2번출구",
    start_lat: 37.625317280381715,
    start_lon: 127.07327644534814,
    end_address: "삼육대학교",
    end_address_detail: "삼육대학교 분수대 앞",
    end_lat: 37.64353854399491,
    end_lon: 127.10579154192136,
    boarding_dtm: "string",
    personnel_limit: 3,
    gender: "FEMALE",
     owner: 'cam',
    category: "string",
    current: 3,
  },
  {
    id: 6,
    unreadMessage: "string",
    distance: 6.1,
    start_address_code: "string",
    start_address: "태릉입구역 2번출구",
    start_address_detail: "태릉입구역 2번출구",
    start_lat: 37.618404661690704,
    start_lon: 127.07521073018373,
    end_address: "삼육대학교",
    end_address_detail: "삼육대학교 분수대 앞",
    end_lat: 37.64353854399491,
    end_lon: 127.10579154192136,
    boarding_dtm: "string",
    personnel_limit: 4,
    gender: "NONE",
     owner: 'cam',
    category: "string",
    current: 3,
  },
];

export const ChatRoomSkeleton: ChatRoom = {
  id: -2,
  unreadMessage: "",
  distance: 1.0,
  start_address_code: "string",
  start_address: "",
  start_address_detail: "",
  start_lat: 0,
  start_lon: 0,
  end_address: "",
  end_address_detail: "삼육대학교 분수대 앞",
  end_lat: 0,
  end_lon: 0,
  boarding_dtm: "",
  personnel_limit: 4,
  gender: "NONE",
   owner: 'cam',
  category: "",
  current: 3,
};
export const ChatRoomSkeletonList: ChatRoom[] = [
  ChatRoomSkeleton,
  ChatRoomSkeleton,
  ChatRoomSkeleton,
  ChatRoomSkeleton,
  ChatRoomSkeleton,
  ChatRoomSkeleton,
  ChatRoomSkeleton,
  ChatRoomSkeleton,
];
export type Props = {
  onPress: (data: ChatRoom) => () => void;
  datas?: ChatRoom[];
};
export const ChatRoomList: React.FC<Props> = ({ datas, onPress }) => {
  return (
    <>
      {datas?.map((data, i) => (
        <ChatRoomCard key={i + "r"} data={data} onPress={onPress(data)} />
      ))}
    </>
  );
};
