import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

import { CORS, PORT } from "./config";
import { onConnection } from "./ws";
import { state } from "@tic-tac-ws/state";

const app = express();

app.use(cors(CORS));

const server = createServer(app);
const io = new Server(server, { cors: CORS, path: "/ws" });

server.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

state.initUser("debug");

io.on("connection", onConnection(io));

app.get("/match/:id", (req, res) => {
  const isHas = state.rooms.has(req.params.id);
  if (!isHas) res.status(400);
  res.send(isHas);
});
