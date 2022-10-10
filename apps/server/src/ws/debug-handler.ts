import { Server } from "socket.io";

import { state, User } from "@tic-tac-ws/state";

type TLobbyInitilizer = {
  me: User;
  io: Server;
};

export const debugHandler = ({ io, me }: TLobbyInitilizer) => {
  const socket = io.sockets.sockets.get(me.id);

  const send = (data) => socket?.emit("debug", data);

  const timerId = setInterval(() => {
    send({
      users: [...state.users],
      lobby: [...state.lobby.players],
    });
  }, 1000);

  socket.on("disconnect", () => {
    console.log(socket.id, "- destroyed");
    clearInterval(timerId);
  });
};
