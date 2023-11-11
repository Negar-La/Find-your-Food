import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingIcon from "../LoadingIcon";
import ErrorPage from "./ErrorPage";
import { AiFillDelete } from "react-icons/ai";

const MyMessages = () => {
  const [status, setStatus] = useState("loading");
  const [conversations, setConversations] = useState(null);
  const [msgDeleted, setMsgDeleted] = useState(false);

  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      //  console.log("Fetching conversations for user:", user.nickname);
      fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/getConversations/${user.nickname}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200 && data.data.length > 0) {
            setConversations(data.data);
            console.log(data.data);
          } else {
            setStatus("no-conversations");
          }
        })
        .catch((error) => {
          console.log("Error fetching conversations:", error);
          setStatus("error");
        });
    }
  }, [msgDeleted, user]);

  const deleteMessageHandler = (e, conversationId) => {
    console.log(conversationId);
    e.preventDefault();
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/deleteConversation`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ conversationId }),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.status === 200) {
          console.log(data);
          setMsgDeleted(!msgDeleted);
          window.alert("Conversation was deleted from your list");
        }
      })
      .catch((error) => {
        return error;
      });
  };

  if (status === "error") {
    return <ErrorPage />;
  } else if (status === "no-conversations") {
    return <NoPost>You have no Conversations</NoPost>;
  } else
    return (
      <>
        <Title>My Conversations:</Title>
        {!conversations ? (
          <LoadingWrapper>
            <LoadingIcon />
          </LoadingWrapper>
        ) : (
          conversations.map((conversation) => (
            <ConversationWrapper key={conversation._id}>
              <InnerContainer>
                <ConversationTitle>
                  Conversation about:{conversation.conversationId}{" "}
                </ConversationTitle>
                <ConversationTitle>
                  Between:{" "}
                  {conversation.participants.map((participant, index) => (
                    <React.Fragment key={participant}>
                      {conversation.participants.length === 2 &&
                      index === conversation.participants.length - 1
                        ? " and "
                        : ""}
                      {participant === user.nickname ? "You" : participant}
                      {conversation.participants.length === 1 &&
                        " and " + conversation.messages[0].cook}
                    </React.Fragment>
                  ))}
                </ConversationTitle>

                {conversation.messages.map((message, index) => (
                  <MessageWrapper key={index}>
                    <Text>
                      <Tag>
                        {message.author === user.nickname
                          ? "You:"
                          : message.author + ":"}
                      </Tag>{" "}
                      {message.message}
                    </Text>
                    <Text>
                      <Tag>Sent at:</Tag> {message.timeForMessagesPage}
                    </Text>
                  </MessageWrapper>
                ))}

                <BtnContainer>
                  <DeleteBtn
                    onClick={(e) =>
                      deleteMessageHandler(e, conversation.conversationId)
                    }
                  >
                    <AiFillDelete
                      size={25}
                      style={{ color: "#4A2E67" }}
                      onMouseOver={({ target }) =>
                        (target.style.color = "var(--yellow)")
                      }
                      onMouseOut={({ target }) =>
                        (target.style.color = "#4A2E67")
                      }
                    />
                  </DeleteBtn>
                </BtnContainer>
              </InnerContainer>
            </ConversationWrapper>
          ))
        )}
      </>
    );
};

const ConversationWrapper = styled.div`
  border-radius: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerContainer = styled.div`
  border: 4px solid purple;
  border-radius: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ConversationTitle = styled.h2`
  margin: 10px 0;
  font-size: 20px;
  text-align: center;
`;

const MessageWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  margin: 25px;
  font-size: 25px;
  text-align: center;
`;

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
`;
const Tag = styled.span`
  font-weight: bold;
  margin-right: 9px;
  text-align: center;
`;

const NoPost = styled.div`
  font-size: 25px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
`;
const BtnContainer = styled.div`
  display: flex;
  width: 50px;
  justify-content: space-between;
`;

const DeleteBtn = styled.div`
  background-color: inherit;
  width: 15px;
  cursor: pointer;
`;

export default MyMessages;
