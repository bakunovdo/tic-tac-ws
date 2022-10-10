import { Socket, Server } from "socket.io";

import { state } from "@tic-tac-ws/state";
import { lobbyHandler } from "./lobby-handler";
import { debugHandler } from "./debug-handler";

// safely handles circular references

export const onConnection = (io: Server) => (socket: Socket) => {
  console.log("connected", socket.id);

  const me = state.initUser(socket.id);

  debugHandler({ io, me });

  // setInterval(() => console.log(state), 5000);

  socket.on("lobby", lobbyHandler({ io, me }));

  socket.on("disconnect", () => {
    me.destroy();
  });
};
