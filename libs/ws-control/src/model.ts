import { createEffect, sample, Store } from "effector";
import { Socket } from "socket.io-client";

import { createEventsStores } from "./create-event-stores";

import { Emit, EmitEffectParams, Options, SocketWithEvent } from "./types";

export function createSocketControl<
  ClientPayload extends Record<string, unknown>,
  ServerPayload extends { type: string },
>($socket: Store<Socket | null>, options: Options<ServerPayload>) {
  const [$on, $emit] = createEventsStores(options.channel);

  const attachEventHandlerFx = createEffect<SocketWithEvent, void>(({ event, socket }) => {
    socket.on(event, options.target);
  });

  sample({
    clock: $socket,
    source: { socket: $socket, event: $on },
    filter: (data): data is SocketWithEvent => Boolean(data.socket),
    target: attachEventHandlerFx,
  });

  function emit<Payload extends ClientPayload, Event = void>(params: Emit<Payload, Event>) {
    const emitEventHandlerFx = createEffect<EmitEffectParams<Payload, Event>, void>(
      ({ socket, emitName, clockData, payload }) => {
        const data = typeof payload === "function" ? payload(clockData) : payload;
        socket.emit(emitName, data);
      },
    );

    sample({
      clock: params.clock,
      source: { socket: $socket, event: $emit },
      filter: (data): data is SocketWithEvent => Boolean(data.socket),
      fn: ({ socket, event }: SocketWithEvent, clockData) => ({
        socket,
        clockData,
        emitName: event,
        payload: params.send,
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

  return { emit, match, extract };
}
