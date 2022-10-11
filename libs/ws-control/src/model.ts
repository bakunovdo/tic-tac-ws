import { createEffect, createStore, Event, EventPayload, is, sample, Store } from "effector";
import { Socket } from "socket.io-client";

import { EmitParams, Options } from "./types";

export function createSocketControl<
  ClientPayload extends Record<string, unknown>,
  ServerPayload extends { type: string },
>($socket: Store<Socket | null>, options: Options<ServerPayload>) {
  const [$on, $emit] = createEventsStores(options.channel);

  const attachEventHandlerFx = createEffect(
    ({ event, socket }: { event: string; socket: Socket }) => {
      socket.on(event, options.onTarget);
    },
  );

  sample({
    clock: $socket,
    source: { socket: $socket, event: $on },
    filter: (data): data is { socket: Socket; event: string } => Boolean(data.socket),
    target: attachEventHandlerFx,
  });

  function emit<Payload extends ClientPayload, T = void>({
    clock,
    send,
  }: {
    clock: Event<T>;
    send: Payload | ((event: EventPayload<Event<T>>) => Payload);
  }) {
    const emitEventHandlerFx = createEffect<EmitParams<Payload, T>, void>(
      ({ socket, emitName, clockData, payload }) => {
        const data = typeof payload === "function" ? payload(clockData) : payload;
        socket.emit(emitName, data);
      },
    );

    sample({
      clock,
      source: { socket: $socket, event: $emit },
      filter: (data): data is { socket: Socket; event: string } => Boolean(data.socket),
      fn: ({ socket, event }: { socket: Socket; event: string }, clockData) => ({
        socket,
        clockData,
        emitName: event,
        payload: send,
      }),
      target: emitEventHandlerFx,
    });
  }

  function match(matchType: ServerPayload["type"]) {
    return (data: Partial<ServerPayload> | undefined) => matchType === data?.type;
  }

  function extract(key: keyof ServerPayload) {
    return (data: ServerPayload) => data[key];
  }

  //impliment split-cases

  return { emit, match, extract };
}

function createEventsStores(channel: Options["channel"]): [Store<string>, Store<string>] {
  if (is.unit(channel)) return [channel, channel];

  if (typeof channel === "string") {
    const store = createStore(channel);
    return [store, store];
  }

  const onStore = createStore(channel.on);
  const emitStore = createStore(channel.emit);

  return [onStore, emitStore];
}
