import { createEffect, Event, EventPayload, sample, Store } from "effector";
import { Socket } from "socket.io-client";

import { EmitParams, Options } from "./types";

export function createSocketControl<
  ClientPayload extends Record<string, unknown>,
  ServerPayload extends { type: string },
>($socket: Store<Socket | null>, options: Options<ServerPayload>) {
  const onName = typeof options.channel === "string" ? options.channel : options.channel.on;
  const emitName = typeof options.channel === "string" ? options.channel : options.channel.emit;

  const attachEventHandlerFx = createEffect((socket: Socket) => {
    socket.on(onName, options.onTarget);
  });

  sample({
    clock: $socket,
    filter: Boolean,
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
      ({ socket, clockData, payload }) => {
        const data = typeof payload === "function" ? payload(clockData) : payload;
        socket.emit(emitName, data);
      },
    );

    sample({
      source: $socket,
      filter: Boolean,
      clock,
      fn: (socket, clockData) => ({ socket, clockData, payload: send }),
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
