import { WSLobbyServerResponse, WSLobbyClientRequest } from "./lobby";
import { WSMatchClientRequest } from "./match";

//utility base
export * from "./helpers";
// websocket

export * from "./lobby";
export * from "./match";

export type WSClientRequest = WSLobbyClientRequest | WSMatchClientRequest;
export type WSServerResponse = WSLobbyServerResponse;
