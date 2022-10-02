import { sample } from "effector";

import { toast } from "react-toastify";

import { WSClientPayload, WSLobbyConnectFromClient, WSServerPayload } from "@tic-tac-ws/types";
import { createSocketControl } from "@tic-tac-ws/ws-control";

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
  filter: lobbyControl.match("lobby:code"),
  fn: lobbyControl.extract("data"),
  target: $lobbyCode,
});

sample({
  clock: messageReceived,
  filter: lobbyControl.match("[lobby-connect]-error"),
  fn: ({ data }) => {
    toast(data, {
      toastId: "[lobby-connect]-error" + data,
    });
  },
});

lobbyControl.emit({
  clock: refreshCodePressed,
  send: { type: "lobby:update-code" },
});

lobbyControl.emit({
  clock: formSubmitted,
  send: (data) => ({ type: "lobby:connect", data }),
});
