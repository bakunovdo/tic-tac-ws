import { createEvent } from "effector";

import { __IS_DEV__, __IS_PROD__ } from "@tic-tac-ws/config";
import { environment } from "../../environments/environment";

export const appStarted = createEvent();

if (__IS_DEV__) {
  console.log("DEV");
}

if (__IS_PROD__) {
  console.log("PROD");
}

console.log(process.env);
