import { WSClientPayload } from "@tic-tac-ws/types";

type AnyPayload = { type: string; data: unknown };

export type UI<T extends WSClientPayload> = T extends AnyPayload ? T["data"] : void;
