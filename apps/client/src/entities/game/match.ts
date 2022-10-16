import { createDomain, restore, sample } from "effector";

import { createSocketControl } from "@tic-tac-ws/ws-control";

import { $io } from "./socket";
import { MatchPage } from "../../pages/match/index";
import { WSMatchClientRequest, WSMatchCellClickedClient } from "@tic-tac-ws/types";
import { UI } from "./types";
import { BACKEND_URL } from "../../shared/config";
import { chainRoute } from "atomic-router";
import { MatchNotFound } from "../../pages/match/not-found";
import { debug } from "patronum";

const matchDomain = createDomain("match");

const $matchState = matchDomain.createStore<unknown>(null);

const messageReceived = matchDomain.createEvent<never>();
const cellPressed = matchDomain.createEvent<UI<WSMatchCellClickedClient>>();

const connectToMatchFx = matchDomain.createEffect<string, boolean>(async (matchId) => {
  const response = await fetch(`${BACKEND_URL}/match/${matchId}`);
  if (!response.ok) throw Error("Request fail");
  const isHas = await response.json();
  if (!isHas) throw Error("Room not find");
  return isHas;
});

export const $isConnected = restore(connectToMatchFx, false);
export const $isConnecting = connectToMatchFx.pending;

const matchControl = createSocketControl<WSMatchClientRequest, never>($io, {
  channel: MatchPage.route.$params.map(({ matchId }) => `match/${matchId}`),
  filter: $isConnected,
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

chainRoute({
  route: MatchPage.route,
  beforeOpen: {
    effect: connectToMatchFx,
    mapParams: ({ params: { matchId } }) => matchId,
  },
});

sample({
  clock: connectToMatchFx.fail,
  target: MatchNotFound.route.open,
});

debug(matchDomain);

export const events = { cellPressed };
export const stores = { $matchState };
