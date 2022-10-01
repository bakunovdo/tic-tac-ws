import {
  WSLobbyConnectFromClient,
  WSLobbyToClient,
  WSLobbyUpdateCodeFromClient,
  WSServerPayload,
} from "@tic-tac-ws/types";
import { sample } from "effector";

import { gameDomain } from "./domain";
import { $io } from "./socket";
import { UI } from "./types";

function lobbyMatcher(postfix: string) {
  return (data: Partial<WSLobbyToClient> | undefined) => `lobby:${postfix}` === data?.type;
}

export const $lobbyCode = gameDomain.createStore<string | null>(null);

export const formSubmitted = gameDomain.createEvent<UI<WSLobbyConnectFromClient>>();

const updateCode = gameDomain.createEvent<string>();

export const refreshCodePressed = gameDomain.createEvent();

const messageReceived = gameDomain.createEvent<WSServerPayload>();

$lobbyCode.on(updateCode, (_, payload) => payload);

sample({
  clock: $io,
  filter: Boolean,
  fn: (socket) => {
    socket.on("lobby", messageReceived);
  },
});

sample({
  clock: messageReceived,
  filter: lobbyMatcher("code"),
  fn: (payload) => payload.data,
  target: $lobbyCode,
});

sample({
  source: $io,
  filter: Boolean,
  clock: refreshCodePressed,
  fn: (socket) => {
    const payload: WSLobbyUpdateCodeFromClient = { type: "lobby:update-code" };
    socket.emit("lobby", payload);
  },
});
