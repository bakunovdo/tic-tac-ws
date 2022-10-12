import type { Event, EventPayload } from "effector";
import type { Socket } from "socket.io-client";
import { Store } from "effector";

export type Options<T = unknown> = {
  target: Event<T>;
  channel:
    | string
    | Store<string>
    | {
        on: string;
        emit: string;
      };
};

type EventFn<P, T> = (event: EventPayload<Event<T>>) => P;

export type Emit<P, E> = {
  clock: Event<E>;
  send: P | EventFn<P, E>;
};

export type EmitEffectParams<Payload, T> = {
  socket: Socket;
  emitName: string;
  clockData: EventPayload<Event<T>>;
  payload: Payload | ((event: EventPayload<Event<T>>) => Payload);
};

export type SocketWithEvent = { socket: Socket; event: string };
