import { Lobby } from "./Lobby";
import { Room, RoomId } from "./Room";
import { User } from "./User";

export interface TServerState {
  lobby: Lobby;
  users: Map<string, User>;
  rooms: Map<RoomId, Room>;
}
