import { Server } from "socket.io";

import { state, User } from "@tic-tac-ws/state";

import { WSLobbyServerResponse, LobbyChannel, WSLobbyClientRequest } from "@tic-tac-ws/types";

import { nanoidNoLikes } from "@tic-tac-ws/shared";

type TLobbyInitilizer = {
  me: User;
  io: Server;
};

export const lobbyHandler = ({ io, me }: TLobbyInitilizer) => {
  const socket = io.sockets.sockets.get(me.id);

  const send = (data: WSLobbyServerResponse) => socket?.emit("lobby" as LobbyChannel, data);

  send({ type: "lobby:code", data: me.code });

  return (data: WSLobbyClientRequest) => {
    if (typeof data !== "object") return null;
    switch (data.type) {
      case "lobby:update-code": {
        me.updateCode();
        send({ type: "lobby:code", data: me.code });
        break;
      }
      case "lobby:connect": {
        const enterCode = data.data;
        if (typeof enterCode === "string") {
          if (enterCode === me.code) {
            return send({ type: "[lobby-connect]-error", data: "Cannot connect to myself" });
          }
          const userFromLobby = state.lobby.get(enterCode);
          if (!userFromLobby) {
            return send({ type: "[lobby-connect]-error", data: "user not find" });
          }

          const room = state.createRoom(nanoidNoLikes(), [me, userFromLobby]);

          const roomPayload: WSLobbyServerResponse = {
            type: "[lobby-connect]-success",
            data: room.id,
          };

          room.players.forEach((user: User) => {
            const userSocket = io.sockets.sockets.get(user.id);
            if (!userSocket) return;

            userSocket.emit("lobby" as LobbyChannel, roomPayload);

            // TODO Create Match Handler
            const matchChannel = `match/${room.id}`;
            userSocket.on(matchChannel, (data) => {
              console.log("userId:", userSocket.id, data);
            });
          });
        } else send({ type: "[lobby-connect]-error", data: "code invalid" });
      }
    }
  };
};
