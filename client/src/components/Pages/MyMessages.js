import styled from "styled-components";
import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import LoadingIcon from "../LoadingIcon";
import ErrorPage from "./ErrorPage";
import {AiFillDelete} from "react-icons/ai";

const MyMessages = () => {


  const [status, setStatus] = useState("loading");
  const [messages, setMessages] = useState(null);

  const[msgDeleted, setMsgDeleted] = useState(false)

  const { user } = useAuth0();
  // console.log(user);

  useEffect(()=>{
   user && fetch (`${process.env.REACT_APP_SERVER_URL}/api/getMessage/${user.nickname}`)
      .then(res=> res.json())
      .then((data)=>{
        console.log(data.data);
        setMessages(data.data);
      })
      .catch ((error)=>{
        console.log(error);
        setStatus("error");
      })
  }, [msgDeleted])

  const deleteMessageHandler = (e, msg) => {                        
    e.preventDefault();
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/deleteMessage`, {         
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({msg}),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.status === 200) {          
         console.log(data)   
        setMsgDeleted(!msgDeleted) 
         window.alert('Message was deleted from your list')
        }
      })
      .catch((error) => {
        return error;
      });
  };



  if (status==='error') {return <ErrorPage /> }
  return (
    <>
     <Title>My  Messages:</Title>
      {!messages? (<LoadingWrapper>
                   <LoadingIcon />
                </LoadingWrapper>
                )
      : messages.length < 1 ? (<NoPost>You have no Message</NoPost>)
      :
      messages.map((msg) => {
        return (
          <Wrapper key={msg.id}>
              <Text><Tag>To:</Tag> {msg.messageData.cook === user.nickname ? msg.messageData.author : msg.messageData.cook}</Text>
              <Text><Tag>Food:</Tag> {msg.messageData.room}</Text>
              <Text><Tag>My Message:</Tag> {msg.messageData.message}</Text>
              <Text><Tag>at:</Tag> {msg.messageData.time}</Text>
              <BtnContainer>
                  <DeleteBtn  onClick={(e) => { deleteMessageHandler(e, msg) }}> 
                        <AiFillDelete size={25} style={{color: "#4A2E67"}}
                        onMouseOver={({target})=>target.style.color="var(--yellow)"}
                        onMouseOut={({target})=>target.style.color="#4A2E67"}/>
                  </DeleteBtn>
              </BtnContainer>
          </Wrapper>
        )
      })
      }
    </>
  )
}

const Wrapper = styled.button`
  border: 3px solid purple;
  background-color: inherit;
  border-radius: 15px;
  margin: 20px auto 25px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.h1`
margin: 25px;
font-size: 25px;
text-align: center;
`

const LoadingWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Text = styled.p`
  color: black;
  font-size: 18px;
  display: flex;
  justify-content: center;
`
const Tag = styled.span`
  font-weight: bold;
  margin-right: 9px;
  text-align: center;
`

const NoPost = styled.div`
  font-size: 25px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
`
const BtnContainer = styled.div`
  display: flex;
  width: 50px;
  justify-content: space-between;
`

const DeleteBtn = styled.div`
  background-color: inherit;
  width: 15px;
  cursor: pointer;
  `

export default MyMessages