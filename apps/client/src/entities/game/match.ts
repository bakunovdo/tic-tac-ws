import { createDomain, sample } from "effector";

import { createSocketControl } from "@tic-tac-ws/ws-control";

import { $io } from "./socket";
import { MatchPage } from "../../pages/match/index";

export type CellIdx = 0 | 1 | 2;

type ClientCellClicked = {
  type: "cell-click";
  data: [CellIdx, CellIdx];
};

type ClientMatchPayload = ClientCellClicked;

const matchDomain = createDomain("match");

const $matchState = matchDomain.createStore<unknown>(null);

const messageReceived = matchDomain.createEvent<never>();

const cellPressed = matchDomain.createEvent<[CellIdx, CellIdx]>();

const matchControl = createSocketControl<ClientMatchPayload, never>($io, {
  channel: MatchPage.route.$params.map(({ matchId }) => `match/${matchId}`),
  onTarget: messageReceived,
});

sample({
  clock: messageReceived,
  target: $matchState,
});

matchControl.emit({
  clock: cellPressed,
  send: (params) => ({
    type: "cell-click",
    data: params,
  }),
});

export const events = { cellPressed };
export const stores = { $matchState };
