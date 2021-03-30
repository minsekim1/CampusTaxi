export type Message = {
  id: number;
  message: string;
  message_type: "Message" | "Notice" | "Enter";
  writer: number;
  room: number;
  created_at: Date;
  updated_at: Date;
};

export const MessageDummy: Message[] | (() => Message[]) = [
  {
    id: 1,
    message: "hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello",
    message_type: "Message",
    writer: 1,
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    message: "hello",
    message_type: "Notice",
    writer: 1,
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    message: "helhellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellolo",
    message_type: "Enter",
    writer: 2,
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 4,
    message: "hello",
    message_type: "Message",
    writer: 1,
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 5,
    message: "hello",
    message_type: "Message",
    writer: 2,
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 6,
    message: "hello",
    message_type: "Message",
    writer: 2,
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 7,
    message: "hello",
    message_type: "Message",
    writer: 1,
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 8,
    message: "hello",
    message_type: "Message",
    writer: 1,
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 9,
    message: "hello",
    message_type: "Message",
    writer: 1,
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 10,
    message: "hello",
    message_type: "Message",
    writer: 1,
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 11,
    message: "hello",
    message_type: "Message",
    writer: 1,
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 12,
    message: "hello",
    message_type: "Message",
    writer: 1,
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 13,
    message: "hello",
    message_type: "Message",
    writer: 1,
    room: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
];