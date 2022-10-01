import { LobbyGeneric } from "./base";

// to server
export type WSLobbyConnectFromClient = LobbyGeneric<"connect", string>;
export type WSLobbyUpdateCodeFromClient = LobbyGeneric<"update-code">;

export type WSLobbyToServerPayload = WSLobbyConnectFromClient | WSLobbyUpdateCodeFromClient;

// to client
export type WSLobbyCodeToClient = LobbyGeneric<"code", string>;

export type WSLobbyToClient = WSLobbyCodeToClient;
