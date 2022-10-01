import { Server } from "socket.io";

import { state, User } from "@tic-tac-ws/state";

import { v4 as uuidv4 } from "uuid";

import { WSLobbyToClient, LobbyChannel, WSLobbyToServerPayload } from "@tic-tac-ws/types";

type TLobbyInitilizer = {
  me: User;
  io: Server;
};

export const lobbyHandler = ({ io, me }: TLobbyInitilizer) => {
  const socket = io.sockets.sockets.get(me.id);

  const send = (data: WSLobbyToClient) => socket?.emit("lobby" as LobbyChannel, data);

  send({ type: "lobby:code", data: me.code });

  return (data: WSLobbyToServerPayload) => {
    if (typeof data !== "object") return null;
    switch (data.type) {
      case "lobby:update-code": {
        me.updateCode();
        send({ type: "lobby:code", data: me.code });
        break;
      }
      case "lobby:connect": {
        // const enterCode = data.payload;
        // if (typeof enterCode === "string" && enterCode.length === CODE_STRENGTH) {
        //   if (enterCode === code) {
        //     return send({ type: "[switch-to-room]-error", payload: "Cannot connect to myself" });
        //   }
        //   const userFromLobby = state.lobby.get(enterCode);
        //   if (!userFromLobby) {
        //     return send({ type: "[switch-to-room]-error", payload: "user not find" });
        //   }
        //   const room = state.createRoom(uuidv4(), [me, userFromLobby]);
        //   room.players.forEach((user: User) => {
        //     io.sockets.sockets.get(user.id)?.emit("data", {
        //       data: "[switch-to-room]-success",
        //       payload: room.id,
        //     });
        //   });
        // } else send({ type: "[switch-to-room]-error", payload: "code invalid" });
      }
    }
  };
};
