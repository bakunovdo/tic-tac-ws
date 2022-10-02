import type { Event, EventPayload } from "effector";
import type { Socket } from "socket.io-client";

export type Options<T = unknown> = {
  onTarget: Event<T>;
  channel:
    | string
    | {
        on: string;
        emit: string;
      };
};

export type EmitParams<Payload, T> = {
  socket: Socket;
  clockData: EventPayload<Event<T>>;
  payload: Payload | ((event: EventPayload<Event<T>>) => Payload);
};
