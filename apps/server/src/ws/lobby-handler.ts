import { Server } from "socket.io";

import { state, User } from "@tic-tac-ws/state";

import { WSLobbyToClient, LobbyChannel, WSLobbyToServerPayload } from "@tic-tac-ws/types";

import { nanoidNoLikes } from "@tic-tac-ws/shared";

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

          room.players.forEach((user: User) => {
            io.sockets.sockets.get(user.id)?.emit(
              "lobby" as LobbyChannel,
              {
                type: "[lobby-connect]-success",
                data: room.id,
              } as WSLobbyToClient,
            );
          });

          // TODO Create Match Handler
          const matchChannel = `match/${room.id}`;
          socket.on(matchChannel, (data) => {
            console.log("match:", room.id, data);
          });
        } else send({ type: "[lobby-connect]-error", data: "code invalid" });
      }
    }
  };
};
