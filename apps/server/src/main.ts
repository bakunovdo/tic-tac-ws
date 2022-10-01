import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

import { CORS, PORT } from "./config";
import { onConnection } from "./ws";

const app = express();

app.use(cors(CORS));

const server = createServer(app);
const io = new Server(server, { cors: CORS });

server.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

io.on("connection", onConnection(io));
