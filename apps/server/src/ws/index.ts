import { Socket, Server } from "socket.io";

import { CODE_STRENGTH } from "../config";

import { state, createUniqCode } from "@tic-tac-ws/state";
import { lobbyHandler } from "./lobby-handler";

export const onConnection = (io: Server) => (socket: Socket) => {
  const send = (data) => socket.emit("data", data);

  // Initilizing
  const code = createUniqCode(CODE_STRENGTH);
  send({ type: "room-code", payload: code });

  const me = state.initUser(socket.id, code);

  socket.on("lobby", lobbyHandler({ io, me, code }));
  socket.on("disconnect", () => {
    me.destroy();
  });
};
