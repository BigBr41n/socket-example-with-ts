# Socket Events and Rooms

## Client-Side (React App)

### Socket Initialization

```Typescript
import io from "socket.io-client";

const socket = io("http://localhost:3669");
```

### Joining a Room

```Typescript
const joinRoom = (): void => {
  if (room !== "") {
    socket.emit("join_room", room);
  }
};
```

### Sending a Message

```Typescript
const sendMessage = (): void => {
  socket.emit("chat_message", { message, room });
};
```

### Receiving Messages

```Typescript
useEffect(() => {
  socket.on("receive_message", (data) => {
    setMessageReceived(data);
  });
}, [socket]);
```

## Server-Side (Node.js with Express)

### Socket Initialization

```Typescript
import { Server } from "socket.io";
import http from "http";

const server = http.createServer(app);
const io = new Server(server);
```

### Handling Client Connections and socket events : 

```Typescript
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Joining a Room
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  // Sending and Broadcasting Messages
  socket.on("chat_message", (data) => {
    socket.to(data.room).emit("receive_message", data.message);
  });
});
```
