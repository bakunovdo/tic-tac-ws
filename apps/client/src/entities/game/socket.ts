import { Event, guard, sample } from "effector";
import { io, Socket } from "socket.io-client";

import { appStarted } from "../../app/model";
import { BACKEND_URL } from "../../shared/config";
import { notifyFx, ToastEffectOptions } from "../toast";
import { gameDomain } from "./domain";

export const $io = gameDomain.createStore<Socket | null>(null);

export const initlizeSocketFx = gameDomain.createEffect(() => {
  if (!BACKEND_URL) throw new Error("WebSocket URL not defined");
  return io(BACKEND_URL, { path: "/ws" });
});

sample({
  clock: appStarted,
  target: initlizeSocketFx,
});

sample({
  clock: initlizeSocketFx.fail,
  fn: (): ToastEffectOptions => ({
    content: "Connection to WebSocket failed!",
    options: { type: "error" },
  }),
  target: notifyFx,
});

sample({
  clock: initlizeSocketFx.doneData,
  target: $io,
});

export function withSocket<T>(event: Event<T>) {
  return guard({ source: $io, clock: event, filter: Boolean });
}
