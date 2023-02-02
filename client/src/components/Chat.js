import { useEffect, useState } from "react";
import styled from "styled-components";
import "./Chat.css";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({socket, room, username, cook, cookEmail}) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const [msgList, setMsgList] = useState('');

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                author: username,
                room: room,
                cook: cook,
                cookEmail: cookEmail,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send-message", messageData)
            setMessageList((list) => [...list, messageData]);  
            setCurrentMessage("");
            fetch(`${process.env.REACT_APP_SERVER_URL}/api/postMessage`, { 
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                    messageData
                })
              })
              .then(res=> res.json())
              .then(data => {
                setMsgList(data)
                console.log(data)
              })
        }
    };

    useEffect(()=>{
        socket.on("receive-message", (data) => {
            // console.log(data);
            setMessageList((list) => [...list, data]);  
        })
    }, [socket]);

  return (
    <Chatwindow>
        <ChatHeader>
            <p>Live Chat</p>
        </ChatHeader>
        <ChatBody>
            <ScrollToBottom className="message-container">
                {messageList.map((messageContent)=>{
                    return <div  className="message"
                                id={username === messageContent.author ? "you" : "other"}>
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <MessageMeta>
                                        <p>{messageContent.time}</p>
                                        <Author>{messageContent.author}</Author>
                                    </MessageMeta>
                                </div>
                        </div>
                })}
            </ScrollToBottom>
        </ChatBody>
        <ChatFooter>
            <input 
                type="text" 
                value={currentMessage}
                placeholder="Hey..."
                onChange={(e)=>{
                    setCurrentMessage(e.target.value)
                }}
                onKeyDown={(e)=>{
                    e.key === "Enter" && sendMessage();
                }}
                />
            <button onClick={sendMessage} >&#9658;</button>
        </ChatFooter>

    </Chatwindow>
  )
}

const Chatwindow = styled.div`
  width: 300px;
  height: 420px;
`

const ChatHeader = styled.div`
  margin-top: 15px;
  height: 45px;
  border-radius: 6px;
  background: #795E96;
  position: relative;
  cursor: pointer;
  p {
    display: block;
    padding: 0 1em 0 2em;
    color: #fff;
    font-weight: 700;
    line-height: 45px;
  }

`
const ChatBody = styled.div`
  height: calc(450px - (45px + 70px));
  border: 1px solid #263238;
  background: #fff;
  border-radius: 5px;
  position: relative;

`

const ChatFooter = styled.div`
  height: 40px;
  border: 1px solid #263238;
  border-top: none;
  display: flex;
  border-radius: 5px;
  input {
    height: 100%;
    flex: 85%;
    border: 0;
    padding: 0 0.7em;
    font-size: 1em;
    border-right: 1px dotted #607d8b;
    outline: none;
    font-family: 'Signika', sans-serif;
  }
  button {
    border: 0;
    display: grid;
    place-items: center;
    cursor: pointer;
    flex: 15%;
    height: 100%;
    background: transparent;
    outline: none;
    font-size: 25px;
    color: lightgray;
    &:hover {
        color: #795E96;
  }
  }
`

const MessageMeta = styled.div`
  display: flex;
  font-size: 13px;
  p {
    margin-right: 8px;
  }
`
const Author = styled.p`
  margin-left: 10px;
  font-weight: bold;
`

export default Chat