/* eslint-disable @typescript-eslint/ban-ts-comment */
import { split } from "effector";
import { redirect } from "atomic-router";

import {
  WSLobbyConnectClient,
  WSLobbyServerResponse,
  WSLobbyClientRequest,
} from "@tic-tac-ws/types";
import { createSocketControl } from "@tic-tac-ws/ws-control";

import { gameDomain } from "./domain";
import { $io } from "./socket";
import { UI } from "./types";
import { notifyFx } from "../toast";
import { MatchPage } from "../../pages/match";

export const $lobbyCode = gameDomain.createStore<string | null>(null);

export const formSubmitted = gameDomain.createEvent<UI<WSLobbyConnectClient>>();

const updateCode = gameDomain.createEvent<string>();

export const refreshCodePressed = gameDomain.createEvent();

const messageReceived = gameDomain.createEvent<WSLobbyServerResponse>();

$lobbyCode.on(updateCode, (_, payload) => payload);

const lobbyControl = createSocketControl<WSLobbyClientRequest, WSLobbyServerResponse>($io, {
  channel: "lobby",
  target: messageReceived,
});

split({
  // @ts-ignore
  source: messageReceived,
  match: {
    code: lobbyControl.match("lobby:code"),
    notifyError: lobbyControl.match("[lobby-connect]-error"),
    navigateToRoom: lobbyControl.match("[lobby-connect]-success"),
  },
  cases: {
    code: updateCode.prepend(lobbyControl.extract("data")),
    notifyError: notifyFx.prepend(({ data }: WSLobbyServerResponse) => {
      return {
        content: data,
        options: {
          toastId: "[lobby-connect]-error" + data,
        },
      };
    }),

    navigateToRoom: redirect({
      route: MatchPage.route,
      params: (data: WSLobbyServerResponse) => ({ matchId: data.data }),
    }),
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
