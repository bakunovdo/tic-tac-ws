import { User } from "./User/class";
import { Lobby } from "./Lobby";
import { Room, RoomId, TPlayers } from "./Room";
import { TServerState } from "./types";
import { UserId } from "./User";

export class ServerState implements TServerState {
  public lobby: Lobby;
  public users: Map<UserId, User>;
  public rooms: Map<RoomId, Room>;

  constructor() {
    this.lobby = new Lobby(this);
    this.users = new Map();
    this.rooms = new Map();
  }

  get size() {
    return;
  }

  get state(): TServerState {
    return { lobby: this.lobby, rooms: this.rooms, users: this.users };
  }

  initUser(id: UserId, code: string): User {
    const me = this.createUser(id);
    this.lobby.enter(me, code);
    return me;
  }

  createUser(id: UserId, room: Room | undefined = undefined) {
    const exist = this.users.get(id);
    if (exist) return exist;

    return new User(this.state, { id, room });
  }

  createRoom(id: RoomId, users: TPlayers = []): Room {
    const exist = this.rooms.get(id);
    if (exist) return exist;

    return new Room(this.state, id, users);
  }

  clearAll() {
    this.lobby = new Lobby(this);
    this.users = new Map();
    this.rooms = new Map();
  }
}

export const state = new ServerState();

// sState.clientManager.
