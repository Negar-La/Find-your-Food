import styled from "styled-components";
import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import LoadingIcon from "./LoadingIcon";

const MyMessages = () => {

  const [messages, setMessages] = useState(null);

  const { user } = useAuth0();

  useEffect(()=>{
    fetch ("/api/getMessage")
      .then(res=> res.json())
      .then((data)=>{
        console.log(data.data);
        setMessages(data.data.messages);
      })
  }, [])




  return (
    <Wrapper>
      {!messages? (<LoadingWrapper>
                   <LoadingIcon />
                </LoadingWrapper>
                )
      :
      messages.map((msg) => {
        console.log(msg);
        if (msg.messageData.author === user.name || msg.messageData.author === user.nickname)
        return (
          <>
             <p>{msg.messageData.room}</p>
          <p>{msg.messageData.message}</p>
          </>
        )
      })
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 20px 50px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const LoadingWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default MyMessages