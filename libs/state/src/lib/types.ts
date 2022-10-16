import EventEmitter from "events";
import { Lobby } from "./Lobby";
import { Room, RoomId } from "./Room";
import { User } from "./User";

export interface TServerState {
  lobby: Lobby;
  users: Map<string, User>;
  rooms: Map<RoomId, Room>;

  options: TServerOptions;

  emitter: EventEmitter;
}

export type TServerOptions = {
  // CODE_STRENGTH?: number; // default 4
};
