import { createDomain, sample } from "effector";

import { createSocketControl } from "@tic-tac-ws/ws-control";

import { $io } from "./socket";
import { MatchPage } from "../../pages/match/index";
import { WSMatchClientRequest, WSMatchCellClickedClient } from "@tic-tac-ws/types";
import { UI } from "./types";

const matchDomain = createDomain("match");

const $matchState = matchDomain.createStore<unknown>(null);

const messageReceived = matchDomain.createEvent<never>();
const cellPressed = matchDomain.createEvent<UI<WSMatchCellClickedClient>>();

const matchControl = createSocketControl<WSMatchClientRequest, never>($io, {
  channel: MatchPage.route.$params.map(({ matchId }) => `match/${matchId}`),
  target: messageReceived,
});

sample({
  clock: messageReceived,
  target: $matchState,
});

matchControl.emit({
  clock: cellPressed,
  send: (params) => ({
    type: "match:cell-click",
    data: params,
  }),
});

export const events = { cellPressed };
export const stores = { $matchState };
