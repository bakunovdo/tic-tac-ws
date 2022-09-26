import { Server } from "socket.io";

import { CODE_STRENGTH } from "../config";

import { state, User } from "@tic-tac-ws/state";

import { v4 as uuidv4 } from "uuid";

type TLobbyInitilizer = {
  me: User;
  code: string;
  io: Server;
};

type Data = {
  type: "enter-code";
  payload: string;
};

export const lobbyHandler = ({ io, code, me }: TLobbyInitilizer) => {
  const socket = io.sockets.sockets.get(me.id);
  const send = (data) => socket?.emit("data", data);

  return (data: Data) => {
    if (typeof data !== "object") return null;
    switch (data.type) {
      case "enter-code": {
        const enterCode = data.payload;
        if (typeof enterCode === "string" && enterCode.length === CODE_STRENGTH) {
          if (enterCode === code) {
            return send({ type: "[switch-to-room]-error", payload: "Cannot connect to myself" });
          }

          const userFromLobby = state.lobby.get(enterCode);

          if (!userFromLobby) {
            return send({ type: "[switch-to-room]-error", payload: "user not find" });
          }

          const room = state.createRoom(uuidv4(), [me, userFromLobby]);

          room.players.forEach((user: User) => {
            io.sockets.sockets.get(user.id)?.emit("data", {
              data: "[switch-to-room]-success",
              payload: room.id,
            });
          });
        } else send({ type: "[switch-to-room]-error", payload: "code invalid" });
      }
    }
  };
};
