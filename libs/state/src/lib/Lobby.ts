import { TServerState } from "./types";
import { User } from "./User";

export type LobbyId = string;

export class Lobby {
  // All Playeys who not in game now
  readonly players: Map<string, User>;

  constructor(public readonly state: TServerState) {
    this.players = new Map<string, User>();
  }

  enter(user: User, userId: string) {
    this.players.set(userId, user);
  }

  leave(user: User) {
    this.players.delete(user.id);
  }

  get(userId: string): User | undefined {
    return this.players.get(userId);
  }

  /**
   * @returns the number of elements in the Lobby
   */
  get length(): number {
    return this.players.size;
  }

  // get(user)
}
