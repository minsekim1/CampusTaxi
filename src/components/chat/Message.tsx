export type Message = {
  id: number;
  message: string;
  index: number;
  message_type: "NORMAL" | "NOTICE" | "IMAGE";
  writer: string;
  room: number;
  created_at: Date;
  updated_at: Date;
  url?: string;
};

export const MessageDummy: Message[] | (() => Message[]) = [
  {
    id: 1,
    message: "가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사",
    message_type: "NORMAL",
    writer: '1',
    room: 1,
    created_at: new Date(1617209444934),
    updated_at: new Date(),
    index: 0,
  },
  {
    id: 2,
    message: "아아아아",
    message_type: "NOTICE",
    writer: '1',
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
    index: 1,
  },
  {
    id: 3,
    message: "나불렀니불렀니불렀니불렀니불렀니불렀니불렀니불렀니불렀니불렀니불렀니",
    message_type: "NORMAL",
    writer: '2',
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
    index: 2,
  },
  {
    id: 4,
    message: "아아아ㅏ",
    message_type: "NORMAL",
    writer: '1',
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
    index: 3,
  },
  {
    id: 5,
    message: "ㅁㅈㅇㅁㅈㅇㅁㅈㅇㅁㅈㅇㅁㅈㅁㅇㅁㅈㅇㅁㅈㅇ",
    message_type: "NORMAL",
    writer: '2',
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
    index: 4,
  },
  {
    id: 6,
    message: "ㅁㅈㅇㅁㅈㅇㅁㅈㅇㅁㅈㅇㅁㅈㅁㅇㅁㅈㅇㅁㅈㅇㅁㅈㅇㅁㅈㅇㅁㅈㅇㅁㅈㅇㅁㅈㅁㅇㅁㅈㅇㅁㅈㅇ",
    message_type: "NORMAL",
    writer: '2',
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
    index: 5,
  },
  {
    id: 7,
    message: "ㅁㅈㅇㅁㅈㅇㅁㅈㅇㅁㅈㅇㅁㅈㅁㅇㅁㅈㅇㅁㅈㅇㅁㅈㅇㅁㅈㅇㅁㅈㅇㅁㅈㅇㅁㅈㅁㅇㅁㅈㅇㅁㅈㅇㅁㅈㅇㅁㅈㅇㅁㅈㅇㅁㅈㅇㅁㅈㅁㅇㅁㅈㅇㅁㅈㅇ",
    message_type: "NORMAL",
    writer: '1',
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
    index: 6,
  },
  {
    id: 8,
    message: "ㅁㅈㅇㅁ",
    message_type: "NORMAL",
    writer: '1',
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
    index: 7,
  },
  {
    id: 9,
    message: "짐ㅁㅁㅁㅁ",
    message_type: "NORMAL",
    writer: '1',
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
    index: 8,
  },
  {
    id: 10,
    message: "ㄴㄴㄴㄴㄴㄴ",
    message_type: "NORMAL",
    writer: '1',
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
    index: 9,
  },
  {
    id: 11,
    message: "hello",
    message_type: "NORMAL",
    writer: '1',
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
    index: 10,
  },
  {
    id: 12,
    message: "ㅁㅈㅇ",
    message_type: "NORMAL",
    writer: '1',
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
    index: 11,
  },
  {
    id: 13,
    message: "hello",
    message_type: "NORMAL",
    writer: '1',
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
    index: 12,
  },
];