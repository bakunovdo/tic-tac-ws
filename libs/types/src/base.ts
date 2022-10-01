export type WSMessage<T extends string, P> = P extends undefined
  ? { type: T }
  : { type: T; data: P };

export type LobbyChannel = "lobby";
export type LobbyGeneric<T extends string, P = undefined> = WSMessage<`${LobbyChannel}:${T}`, P>;
