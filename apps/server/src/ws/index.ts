import { Socket, Server } from "socket.io";

import { state } from "@tic-tac-ws/state";
import { lobbyHandler } from "./lobby-handler";
import { debugHandler } from "./debug-handler";

export const onConnection = (io: Server) => (socket: Socket) => {
  console.log("connected", socket.id);

  const me = state.initUser(socket.id);

  debugHandler({ io, me });

  socket.on("lobby", lobbyHandler({ io, me }));

  // state.o

  socket.on("disconnect", () => {
    me.destroy();
  });
};
