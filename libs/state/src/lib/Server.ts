import { User } from "./User/class";
import { Lobby } from "./Lobby";
import { FullPlayersRoom, Room, RoomId } from "./Room";
import { TServerOptions, TServerState } from "./types";
import { UserId } from "./User";

import EventEmitter from "events";
import { ROOM_CREATED } from "./const";

export class ServerState implements TServerState {
  public lobby: Lobby;
  public users: Map<UserId, User>;
  public rooms: Map<RoomId, Room>;

  public options: TServerOptions;

  emitter: EventEmitter;

  constructor(options: TServerOptions = {}) {
    this.lobby = new Lobby(this);
    this.users = new Map();
    this.rooms = new Map();

    this.emitter = new EventEmitter();

    this.options = {
      ...options,
    };
  }

  get size() {
    return;
  }

  get state(): TServerState {
    return {
      lobby: this.lobby,
      rooms: this.rooms,
      users: this.users,
      options: this.options,
      emitter: this.emitter,
    };
  }

  initUser(id: UserId): User {
    const me = this.createUser(id);
    return me;
  }

  createUser(id: UserId, room: Room | undefined = undefined) {
    const exist = this.users.get(id);
    if (exist) return exist;

    return new User(this.state, { id, room });
  }

  createRoom(id: RoomId, users: FullPlayersRoom): Room {
    const exist = this.rooms.get(id);
    if (exist) return exist;

    return new Room(this.state, id, users);
  }

  onRoomCreated(cb: (room: Room) => void) {
    this.emitter.on(ROOM_CREATED, cb);
  }

  clearAll() {
    this.lobby = new Lobby(this);
    this.users = new Map();
    this.rooms = new Map();
  }
}

export const state = new ServerState();
