import { Socket, Server } from "socket.io";

import { state } from "@tic-tac-ws/state";
import { lobbyHandler } from "./lobby-handler";

export const onConnection = (io: Server) => (socket: Socket) => {
  console.log("connected", socket.id);

  const me = state.initUser(socket.id);

  socket.on("lobby", lobbyHandler({ io, me }));
  socket.on("disconnect", () => {
    me.destroy();
  });
};
