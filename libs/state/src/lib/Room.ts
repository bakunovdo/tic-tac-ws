import { UserId } from "./User";
import { User } from "./User/class";
import { TServerState } from "./types";
import { ROOM_CREATED } from "./const";

export type FullPlayersRoom = [User, User];
export type PartPlayersRoom = [User, null] | [null, User];
export type EmptyPlayersRoom = [null, null];

export type TPlayers = FullPlayersRoom | PartPlayersRoom | EmptyPlayersRoom;

export type RoomId = string;

export class Room {
  public players: TPlayers;

  constructor(private state: TServerState, public id: RoomId, players: FullPlayersRoom) {
    this.state?.rooms.set(id, this);
    this.players = players;
    players.forEach((player) => {
      this.state?.lobby.leave(player);
      player.join(this);
    });

    this.state.emitter.emit(ROOM_CREATED, this);
  }

  private isUserAt(id: 0 | 1, value: User | UserId) {
    return (
      this.players[id] === value ||
      this.players[id]?.id === value ||
      this.players[id]?.code === "1234"
    );
  }

  private destroy() {
    this.state?.rooms.delete(this.id);
  }

  add(user: User): Room {
    if (this.canJoin && !this.has(user.id)) {
      const index = !this.players[0] ? 0 : 1;
      this.players[index] = user;
    }
    return this;
  }

  remove(value: User | UserId): Room {
    if (this.isUserAt(0, value)) this.players[0] = null;
    if (this.isUserAt(1, value)) this.players[1] = null;
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
      len: this.len,
    };
  }

  toJSON() {
    return this.info;
  }

  toString() {
    return this.info;
  }
}
