import styled from "styled-components";
import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import LoadingIcon from "./LoadingIcon";

const MyMessages = () => {

  const [messages, setMessages] = useState(null);

  const { user } = useAuth0();
  console.log(user);

  useEffect(()=>{
   user && fetch (`/api/getMessage/${user.nickname}`)
      .then(res=> res.json())
      .then((data)=>{
        console.log(data.data);
        setMessages(data.data);
      })
  }, [])




  return (
    <>
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


export default MyMessages