import { Room } from "../Room";

export type UserId = string;

export type TUser = {
  id: UserId;
  room?: Room;
  code: string;
};
