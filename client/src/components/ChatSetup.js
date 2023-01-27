import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import styled from "styled-components";

const socket = io.connect("http://localhost:8000");


const ChatSetup = ({cook, cookEmail, user}) => {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    // console.log(showChat);
    // console.log(cook);
    // console.log(user);

    const joinRoom = () =>{
        if (username === user.name || username === user.nickname || username === cook ) {
            socket.emit('join-room', room)
            setShowChat(true)
        }
    }


    return (
        <div>
        {!showChat ? (
        <JoinChatContainer>
            <h3>Start to Chat with {cook}</h3>
            <input type="text" placeholder="Enter your name..." onChange={(e)=>{setUsername(e.target.value)}} />
            <input type="text" placeholder="Enter food name..." onChange={(e)=>{setRoom(e.target.value)}}/>
            <button onClick={joinRoom} >Join a Room</button>
        </JoinChatContainer>
            ): (
            <Chat socket={socket} room= {room} cook={cook} cookEmail={cookEmail} username={username}/>
            )}

        </div>
    )

}

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
    border: 2px solid #795E96;
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
  background: #795E96;
  color: #fff;
  cursor: pointer;
  transition: all ease .15s;
  &:hover {
    transform: scale(1.15);
  }
  }
`

export default ChatSetup;