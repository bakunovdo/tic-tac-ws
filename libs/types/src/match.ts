import { SpecificChannel } from "./base";

//common
export type MatchChannel = "match";
export type MatchGeneric<T extends string, P = undefined> = SpecificChannel<MatchChannel, T, P>;

export type CellIdx = 0 | 1 | 2;

export type WSMatchCellClickedClient = MatchGeneric<"cell-click", [CellIdx, CellIdx]>;

export type WSMatchClientRequest = WSMatchCellClickedClient;
