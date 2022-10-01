export { LobbyChannel } from "./base";

import { WSLobbyToClient, WSLobbyToServerPayload } from "./lobby";

export * from "./lobby";

export type WSClientPayload = WSLobbyToServerPayload;
export type WSServerPayload = WSLobbyToClient;
