import { Room, RoomId } from "../Room";
import { TUser } from "./types";
import { TServerState } from "../types";

import { createUniqCode } from "../../utils/create-room-code";

export type TUserContructor = TUser;

export const initial: Partial<TUser> = { room: undefined };

export class User implements TUser {
  id: TUser["id"];
  room: TUser["room"];
  code: TUser["code"];
  // add destroyed flag

  constructor(public state: TServerState, params: Omit<TUser, "code">) {
    this.state.users.set(params.id, this);

    this.id = params.id;
    this.room = params.room;
    this.code = createUniqCode(this.state.options.CODE_STRENGTH);

    if (params.room) this.join(params.room);
    else this.state.lobby.enter(this, this.code);
  }

  updateCode() {
    this.code = createUniqCode(this.state.options.CODE_STRENGTH);
    return this.code;
  }

  join(value: Room | RoomId) {
    const id = value instanceof Room ? value.id : value;
    const room = this.state.rooms.get(id);
    if (room === this.room) return;
    if (room) {
      this.leave();
      this.room = room;
      room.add(this);
    }
  }

  leave() {
    if (this.room) this.room.remove(this);
  }

  // TODO Write tests
  destroy() {
    this.leave();
    this.state.lobby.leave(this);
    this.state.users.delete(this.id);
  }

  get info() {
    return {
      id: this.id,
      Room: this.room,
    };
  }

  toJSON() {
    return this.info;
  }

  toString() {
    return this.info;
  }

  toObject() {
    return this.info;
  }
}
