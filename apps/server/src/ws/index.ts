import { Socket, Server } from "socket.io";

import { state } from "@tic-tac-ws/state";
import { lobbyHandler } from "./lobby-handler";
import { debugHandler } from "./debug-handler";
// import { roomHandler } from "./room-handler";

export const onConnection = (io: Server) => (socket: Socket) => {
  console.log("connected", socket.id);

  const me = state.initUser(socket.id);

  debugHandler({ io, me });

  socket.on("lobby", lobbyHandler({ io, me }));

  // state.onRoomCreated((room) => roomHandler({ io, room }));

  socket.on("disconnect", () => {
    me.destroy();
  });
};
