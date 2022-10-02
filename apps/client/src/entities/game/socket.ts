import { Event, guard, sample } from "effector";
import { debug } from "patronum";
import { io, Socket } from "socket.io-client";

import { appStarted } from "../../app/model";
import { WS_URL } from "../../shared/config";
import { gameDomain } from "./domain";

export const $io = gameDomain.createStore<Socket | null>(null);

export const initlizeSocketFx = gameDomain.createEffect(() => {
  if (!WS_URL) throw new Error("WebSocket URL not defined");
  return io(WS_URL);
});

sample({
  clock: appStarted,
  target: initlizeSocketFx,
});

sample({
  clock: initlizeSocketFx.doneData,
  target: $io,
});

export function withSocket<T>(event: Event<T>) {
  return guard({ source: $io, clock: event, filter: Boolean });
}

debug(gameDomain);
