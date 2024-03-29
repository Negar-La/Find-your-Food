import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import moment from "moment";
import LoadingIcon from "../LoadingIcon";
import ErrorPage from "./ErrorPage";
import ConfirmationModal from "../ConfirmationModal";
import ScrollToTop from "../ScrollToTop";

const MyPosts = () => {
  const [status, setStatus] = useState("loading");
  const { user } = useAuth0();
  const [posts, setPosts] = useState(null);
  const [postDeleted, setPostDeleted] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/getPosts`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setPosts(data.data);
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
      });
  }, [postDeleted]);

  const deleteHandler = (e, post) => {
    e.preventDefault();
    setSelectedItem(post);
    setModalIsOpen(true);
  };

  const confirmDeleteHandler = (e, post) => {
    e.preventDefault();
    // console.log("clicked");
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/delete-post`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post }),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.status === 200) {
          // console.log(data);
          setPostDeleted(!postDeleted);
          setSelectedItem(post);
          setModalIsOpen(false);
        }
      })
      .catch((error) => {
        return error;
      });
  };

  //function that navigates to the update form componenets
  const editHandler = (e, post) => {
    // console.log(post.id);
    e.preventDefault();
    navigate(`/updateform/${post.id}`);
  };

  if (status === "error") {
    return <ErrorPage />;
  }
  return (
    <>
      <Title>My posts:</Title>
      <Wrapper>
        {!posts ? (
          <LoadingWrapper>
            <LoadingIcon />
          </LoadingWrapper>
        ) : (
          user &&
          posts
            .slice()
            .reverse()
            .map((post) => {
              if (post.cookEmail === user.email)
                // console.log(post);
                return (
                  <ItemContainer
                    to={`/posts/${post.id}`}
                    key={post.id}
                    style={{ textDecoration: "none" }}
                  >
                    <Text>
                      {" "}
                      {post.foodPicture ? (
                        <Image src={post.foodPicture} />
                      ) : (
                        <NoImage>No Image provided</NoImage>
                      )}{" "}
                    </Text>
                    <Text>
                      <Tag>Name: </Tag> {post.foodName}
                    </Text>
                    <Text>
                      <Tag>Price: </Tag> {post.price}$
                    </Text>
                    {post.posted ? (
                      <Posted>Posted {moment(post.posted).fromNow()}</Posted>
                    ) : (
                      ""
                    )}
                    <BtnContainer>
                      <DeleteBtn
                        onClick={(e) => {
                          deleteHandler(e, post);
                        }}
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
                      <DeleteBtn
                        onClick={(e) => {
                          editHandler(e, post);
                        }}
                      >
                        <AiFillEdit
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
                  </ItemContainer>
                );
            })
        )}

        {/* Render the confirmation modal */}
        {selectedItem && (
          <ConfirmationModal
            modalIsOpen={modalIsOpen}
            closeModal={() => setModalIsOpen(false)}
            confirmAction={(e) => confirmDeleteHandler(e, selectedItem)}
            itemName={selectedItem.foodName} // Pass the item name to the modal
          />
        )}

        {posts &&
        user &&
        posts.filter((post) => {
          if (post.cookEmail === user.email) return post;
        }).length < 1 ? (
          <NoPost>You have no post in your list</NoPost>
        ) : (
          ""
        )}
        <ScrollToTop />
      </Wrapper>
    </>
  );
};

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  border: none;
  label {
    font-size: 1.2rem;
    font-weight: 500;
    max-width: 500px;
    line-height: 1.5rem;
    margin: 15px 0;
    &:after {
      color: var(--darkblue);
    }
  }
  button {
    width: 150px;
    height: 40px;
    margin: 15px 10px;
    background-color: var(--darkblue);
    border-radius: 6px;
    border: none;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.4s, opacity 0.5s;
    &:hover {
      background-color: var(--yellow);
      padding: 5px;
      border-radius: 14px;
      color: var(--darkblue);
      font-weight: 500;
      font-size: 20px;
    }
    &:active {
      opacity: 0.3;
    }
  }

  @media screen and (max-width: 600px) {
    padding: 10px;
    label {
      font-size: 1.1rem;
      font-weight: 500;
      max-width: 300px;
      line-height: 1.5rem;
      margin: 10px 0;
    }
    button {
      width: 120px;
      padding: 0.8rem;
      font-size: 1rem;
      &:hover {
        font-size: 1rem;
      }
    }
  }
`;
const Wrapper = styled.div`
  margin: 20px 50px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Text = styled.p`
  width: 190px;
  margin-bottom: 10px;
  color: black;
  font-size: 18px;
  display: flex;
  justify-content: center;
`;
const Tag = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const Posted = styled.span`
  text-align: center;
  margin-bottom: 7px;
`;

const Title = styled.h1`
  margin: 25px;
  font-size: 25px;
  text-align: center;
`;

const ItemContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  padding: 20px 10px 10px 15px;
  margin: 0 0px 3% 2%;
  width: 220px;
  height: 24rem;
  text-decoration: none;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: all 0.2s ease-in-out;
  color: var(--text-color);
  background-color: white;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 5px;
  object-fit: cover;
`;

const NoImage = styled.p`
  height: 200px;
  display: flex;
  align-items: center;
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
const NoPost = styled.div`
  font-size: 25px;
`;
const LoadingWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default MyPosts;
