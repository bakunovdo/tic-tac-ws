import { WSClientPayload, WSLobbyConnectFromClient, WSServerPayload } from "@tic-tac-ws/types";
import { sample } from "effector";
import { createSocketControl } from "./create-ws-control";

import { gameDomain } from "./domain";
import { $io } from "./socket";
import { UI } from "./types";

export const $lobbyCode = gameDomain.createStore<string | null>(null);

export const formSubmitted = gameDomain.createEvent<UI<WSLobbyConnectFromClient>>();

const updateCode = gameDomain.createEvent<string>();

export const refreshCodePressed = gameDomain.createEvent();

const messageReceived = gameDomain.createEvent<WSServerPayload>();

$lobbyCode.on(updateCode, (_, payload) => payload);

const lobbyControl = createSocketControl<WSClientPayload, WSServerPayload>($io, {
  channel: "lobby",
  onTarget: messageReceived,
});

sample({
  clock: messageReceived,
  filter: lobbyControl.match("code"),
  fn: lobbyControl.extract("data"),
  target: $lobbyCode,
});

lobbyControl.emit({
  clock: refreshCodePressed,
  send: { type: "lobby:update-code" },
});

lobbyControl.emit({
  clock: formSubmitted,
  send: (data) => ({ type: "lobby:connect", data }),
});
