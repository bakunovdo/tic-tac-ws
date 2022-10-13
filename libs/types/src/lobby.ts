import { WSAsyncGeneric, SpecificChannel } from "./base";

//common
export type LobbyChannel = "lobby";
export type LobbyGeneric<T extends string, P = undefined> = SpecificChannel<LobbyChannel, T, P>;

// client request
export type WSLobbyConnectClient = LobbyGeneric<"connect", string>;
export type WSLobbyUpdateCodeClient = LobbyGeneric<"update-code">;

export type WSLobbyClientRequest = WSLobbyConnectClient | WSLobbyUpdateCodeClient;

// server response
export type WSLobbyCodeServer = LobbyGeneric<"code", string>;
export type WSLobbyConnectResultServer = WSAsyncGeneric<`${LobbyChannel}-connect`>;

export type WSLobbyServerResponse = WSLobbyCodeServer | WSLobbyConnectResultServer;
