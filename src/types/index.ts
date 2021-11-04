export type SentMessage = {
  id: number;
  message: string;
  date: string;
  senderUserId: number;
  recipientUserId: number;
};

export type UnsentMessage = {
  message: string;
  date: string;
  senderUserId: number;
  recipientUserId: number;
};

export type User = {
  id: number;
  username: string;
};
