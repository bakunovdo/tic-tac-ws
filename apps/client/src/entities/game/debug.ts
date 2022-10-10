/* eslint-disable @typescript-eslint/ban-ts-comment */
import { sample } from "effector";

import { createSocketControl } from "@tic-tac-ws/ws-control";

import { gameDomain } from "./domain";
import { $io } from "./socket";

const debugDomain = gameDomain.createDomain("debug");

export const $debugState = debugDomain.createStore<unknown>("debug");

const messageReceived = debugDomain.createEvent<never>();

createSocketControl($io, { channel: "debug", onTarget: messageReceived });

sample({
  clock: messageReceived,
  target: $debugState,
});
