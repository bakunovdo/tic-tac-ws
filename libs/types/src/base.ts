export type WSMessage<T extends string, P> = P extends undefined
  ? { type: T }
  : { type: T; data: P };

export type WSAsyncGeneric<T extends string, S = string, E = string> =
  | WSMessage<`[${T}]-success`, S>
  | WSMessage<`[${T}]-error`, E>;

export type SpecificChannel<СName extends string, Type extends string, P = undefined> = WSMessage<
  `${СName}:${Type}`,
  P
>;
