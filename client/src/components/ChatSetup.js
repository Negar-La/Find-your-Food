import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import styled from "styled-components";
const { v4: uuidv4 } = require("uuid");

const socket = io.connect("http://localhost:8000");

const ChatSetup = ({ cook, cookEmail, user }) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [conversationId, setConversationId] = useState(""); // State to manage conversationId
  // console.log(showChat);
  // console.log(cook);
  // console.log(user);

  const joinRoom = () => {
    if (
      username === user.name ||
      username === user.nickname ||
      username === cook
    ) {
      const newConversationId = uuidv4(); // Generate a unique ID for the conversation
      socket.emit("join-room", { room, conversationId: newConversationId }); // Pass the conversationId to the server
      console.log("newConversationId", newConversationId);
      setConversationId(newConversationId); // Update conversationId in state
      setShowChat(true);
    }
  };

  return (
    <div>
      {!showChat ? (
        <JoinChatContainer>
          <h3>Start to Chat with {cook}</h3>
          <input
            type="text"
            placeholder="Enter your name..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter food name..."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button onClick={joinRoom}>Join a Room</button>
        </JoinChatContainer>
      ) : (
        <Chat
          socket={socket}
          room={room}
          cook={cook}
          conversationId={conversationId}
          cookEmail={cookEmail}
          username={username}
        />
      )}
    </div>
  );
};

const JoinChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  input {
    width: 210px;
    height: 40px;
    margin: 7px;
    border: 2px solid #795e96;
    border-radius: 5px;
    padding: 5px;
    font-size: 16px;
  }
  button {
    width: 225px;
    height: 50px;
    margin: 7px;
    border: none;
    border-radius: 5px;
    padding: 5px;
    font-size: 16px;
    background: #795e96;
    color: #fff;
    cursor: pointer;
    transition: all ease 0.15s;
    &:hover {
      transform: scale(1.15);
    }
  }
`;

export default ChatSetup;
