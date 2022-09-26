import { UserId } from "./User";
import { User } from "./User/class";
import { TServerState } from "./types";

export type TPlayers = [User, User] | [User] | [];

export type RoomId = string;

export class Room {
  constructor(
    private state: TServerState | undefined = undefined,
    public id: RoomId,
    public players: TPlayers = [],
  ) {
    this.state?.rooms.set(id, this);
    if (players[0]) {
      this.state?.lobby.leave(players[0]);
      players[0].join(this);
    }

    if (players[1]) {
      this.state?.lobby.leave(players[1]);
      players[1].join(this);
    }
  }

  private isUserAt(id: 0 | 1, value: User | UserId) {
    return this.players[id] === value || this.players[id]?.id === value;
  }

  private destroy() {
    this.state?.rooms.delete(this.id);
    delete this.state;
  }

  add(user: User): Room {
    if (this.canJoin && !this.has(user.id)) {
      const index = !this.players[0] ? 0 : 1;
      this.players[index] = user;
    }
    return this;
  }

  remove(value: User | UserId): Room {
    if (this.isUserAt(0, value)) this.players[0] = undefined;
    if (this.isUserAt(1, value)) this.players[1] = undefined;

    if (this.len === 0) this.destroy();

    return this;
  }

  get len() {
    let counter = 0;
    if (this.players[0]) counter++;
    if (this.players[1]) counter++;
    return counter;
  }

  has(userId: UserId) {
    return this.players.some((user) => user?.id === userId);
  }

  get canJoin() {
    return !this.players[0] || !this.players[1];
  }

  get info() {
    return {
      id: this.id,
      players: this.players,
    };
  }

  toJSON() {
    return this.info;
  }

  toString() {
    return this.info;
  }
}
