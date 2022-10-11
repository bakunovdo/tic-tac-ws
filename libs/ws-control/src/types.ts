import type { Event, EventPayload } from "effector";
import type { Socket } from "socket.io-client";
import { Store } from "effector";

export type Options<T = unknown> = {
  onTarget: Event<T>;
  channel:
    | string
    | Store<string>
    | {
        on: string;
        emit: string;
      };
};

export type EmitParams<Payload, T> = {
  socket: Socket;
  emitName: string;
  clockData: EventPayload<Event<T>>;
  payload: Payload | ((event: EventPayload<Event<T>>) => Payload);
};

// export type NonNullData<T> = {
//   [K in keyof T]: K[T] extends Store<infer V> ? NonNullable<V> : NonNullable<K[T]>;
// };
