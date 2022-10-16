import { Room } from "@tic-tac-ws/state";
import { Server } from "socket.io";

type Options = {
  io: Server;
  room: Room;
};

export const roomHandler = ({ io, room }: Options) => {
  const channel = `match/${room.id}`;

  function emit(action: unknown) {
    room.players.forEach((user) => {
      const userSocket = io.sockets.sockets.get(user.id);
      if (!userSocket) return;
      userSocket.emit(channel, action);
    });
  }

  // TODO: FIX, Emit twice becouse each player create that handler
  emit("Hello");
};
