import { WSClientRequest } from "@tic-tac-ws/types";

type AnyPayload = { type: string; data: unknown };

export type UI<T extends WSClientRequest> = T extends AnyPayload ? T["data"] : void;
