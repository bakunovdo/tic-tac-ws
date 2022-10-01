import { LobbyChannel, LobbyGeneric, WSAsyncGeneric } from "./base";

//common

// to server
export type WSLobbyConnectFromClient = LobbyGeneric<"connect", string>;
export type WSLobbyUpdateCodeFromClient = LobbyGeneric<"update-code">;

export type WSLobbyToServerPayload = WSLobbyConnectFromClient | WSLobbyUpdateCodeFromClient;

// to client
export type WSLobbyCodeToClient = LobbyGeneric<"code", string>;
export type WSLobbyConnectResult = WSAsyncGeneric<`${LobbyChannel}-connect`>;

export type WSLobbyToClient = WSLobbyCodeToClient | WSLobbyConnectResult;
