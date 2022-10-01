import { Event, EventPayload, sample, Store } from "effector";
import { Socket } from "socket.io-client";

type Options<T = unknown> = {
  onTarget: Event<T>;
  channel:
    | string
    | {
        on: string;
        emit: string;
      };
};

export function createSocketControl<
  ClientPayload extends Record<string, unknown>,
  ServerPayload extends { type: string },
>($socket: Store<Socket | null>, options: Options<ServerPayload>) {
  const onName = typeof options.channel === "string" ? options.channel : options.channel.on;
  const emitName = typeof options.channel === "string" ? options.channel : options.channel.emit;

  sample({
    clock: $socket,
    filter: Boolean,
    fn: (socket) => socket.on(onName, options.onTarget),
  });

  function emit<Payload extends ClientPayload, T = void>({
    clock,
    send,
  }: {
    clock: Event<T>;
    send: Payload | ((event: EventPayload<Event<T>>) => Payload);
  }) {
    sample({
      source: $socket,
      filter: Boolean,
      clock,
      fn: (socket, clock) => {
        const payload = typeof send === "function" ? send(clock) : send;
        socket.emit(emitName, payload);
      },
    });
  }

  function match(postfix: string) {
    return (data: Partial<ServerPayload> | undefined) => `${emitName}:${postfix}` === data?.type;
  }

  function extract(key: keyof ServerPayload) {
    return (data: ServerPayload) => data[key];
  }

  return { emit, match, extract };
}
