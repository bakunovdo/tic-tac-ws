import { createEvent } from "effector";

import { __IS_DEV__, __IS_PROD__ } from "@tic-tac-ws/config";

export const appStarted = createEvent();

console.log({__IS_DEV__, __IS_PROD__});

appStarted.watch(() => console.log("appStarted"));
