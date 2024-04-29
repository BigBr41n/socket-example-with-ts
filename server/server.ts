import http from "node:http";
import { Server } from "socket.io";
import app from "./src/app";
import dotenv from "dotenv";
dotenv.config();

//PORT FROM .ENV FILE
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

//socket.io server configuration
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("chat_message", (data) => {
    socket.to(data.room).emit("receive_message", data.message);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
