import { createDomain } from "effector";
import { debug } from "patronum";

export const gameDomain = createDomain("gameDomain");

debug(gameDomain);
