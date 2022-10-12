/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createDomain, sample } from "effector";

import { createSocketControl } from "@tic-tac-ws/ws-control";

import { $io } from "./socket";

const debugDomain = createDomain("debug");

export const $debugState = debugDomain.createStore<unknown>("debug");

const messageReceived = debugDomain.createEvent<never>();

createSocketControl($io, { channel: "debug", target: messageReceived });

sample({
  clock: messageReceived,
  target: $debugState,
});
