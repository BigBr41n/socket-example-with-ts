import React, { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import { useEffect } from "react";

const socket = io("http://localhost:3669");

function App() {
  //room state

  const [room, setRoom] = useState("");

  //Message states
  const [message, setMessage] = useState<String>("");
  const [messageReceived, setMessageReceived] = useState<String>("");

  //joining a room
  const joinRoom = (): void => {
    if (room! != "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = (): void => {
    socket.emit("chat_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data);
    });
  }, [socket]);

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="join a room"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Join</button>
      </div>
      <input
        type="text"
        placeholder="Message..."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>Send</button>
      <h1>Message :</h1>
      {messageReceived}
    </div>
  );
}

export default App;
