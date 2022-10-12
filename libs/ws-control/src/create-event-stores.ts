import { createStore, is, Store } from "effector";
import { Options } from "./types";

export function createEventsStores(channel: Options["channel"]): [Store<string>, Store<string>] {
  if (is.unit(channel)) return [channel, channel];

  if (typeof channel === "string") {
    const store = createStore(channel);
    return [store, store];
  }

  const onStore = createStore(channel.on);
  const emitStore = createStore(channel.emit);

  return [onStore, emitStore];
}
