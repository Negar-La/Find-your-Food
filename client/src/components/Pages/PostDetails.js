import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Map from "../Map";
import { BsFillPinMapFill } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { useAuth0 } from "@auth0/auth0-react";
import { BsChatRightDots } from "react-icons/bs";
import ChatSetup from "../ChatSetup";
import LoadingIcon from "../LoadingIcon";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const { user, isAuthenticated } = useAuth0();
  // console.log(user);
  const [favoritePost, setFavoritePost] = useState([]);

  const navigate = useNavigate();
  const [showMap, setShowMap] = useState(false);

  const [isShown, setIsShown] = useState(false);

  const handleClick = (ev) => {
    setIsShown((current) => !current);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/get-post/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setPost(data.data);
          // console.log(data.data);
        }
      })
      .catch((error) => {
        return error;
      });
  }, [postId]);

  //https://stackoverflow.com/questions/70922600/when-i-click-one-button-its-open-all-buttons-simultaneously
  const addfavorite = (e, post) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/add-favorite`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: post.id,
        foodName: post.foodName,
        price: post.price,
        cook: post.cook,
        foodPicture: post.foodPicture,
        userAddedtoFav: user.email,
        userPictureAddedtoFav: user.picture,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setFavoritePost([...favoritePost, data.data]);
        if (data.message === "This post is already in your favorite list") {
          window.alert("This item is already in your favorite list!");
        }
        navigate("/myFavorites");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  console.log(post);
  return (
    <>
      {!post ? (
        <LoadingWrapper>
          <LoadingIcon />
        </LoadingWrapper>
      ) : (
        <Flex>
          <Info>
            <FlexDiv>
              <Title>Food Type:</Title>
              <Detail> {post.foodType}</Detail>
            </FlexDiv>
            <FlexDiv>
              <Title>Food Name:</Title>
              <Detail> {post.foodName}</Detail>
            </FlexDiv>
            <FlexDiv>
              <Title>Price:</Title>
              <Detail> {post.price} $</Detail>
            </FlexDiv>
            <FlexDiv>
              <Title>Ingredients:</Title>
              <Detail> {post.ingredients}</Detail>
            </FlexDiv>
            <AboutDiv>
              <AboutTitle>About {post.foodName}:</AboutTitle>
              <AboutDetail>
                {" "}
                {post.about ? post.about : "Nothing mentioned"}
              </AboutDetail>
            </AboutDiv>
            <AboutDiv>
              <AboutTitle> Contact Information </AboutTitle>
              <AboutDetail>
                {" "}
                {post.cook[0].toUpperCase() +
                  post.cook.substring(1)} (Email: {post.cookEmail})
              </AboutDetail>
              <AboutTitle style={{ marginTop: "10px" }}> Address: </AboutTitle>
              <AboutDetail>
                {" "}
                {post.stNum} {post.stName}, {capitalizeFirstLetter(post.city)},{" "}
                {capitalizeFirstLetter(post.province)} - {post.postalCode}
              </AboutDetail>
              <AboutTitle style={{ marginTop: "10px" }}> Phone: </AboutTitle>
              <AboutDetail> {post.phone} </AboutDetail>
            </AboutDiv>

            <FlexButtons>
              <MapButton onClick={() => setShowMap(true)}>
                View on Map{" "}
                <BsFillPinMapFill
                  style={{ marginLeft: "5px", color: "#795E96" }}
                />
              </MapButton>
              {showMap && (
                <Map
                  onCloseFunc={() => setShowMap(false)}
                  center={[parseFloat(post.lat), parseFloat(post.lng)]}
                />
              )}

              <MapButton
                onClick={(e) => {
                  if (!isAuthenticated) {
                    window.alert(
                      "In order to continue, you will need to log in!"
                    );
                  } else {
                    addfavorite(e, post);
                  }
                }}
              >
                Add to Favorite <FcLike style={{ marginLeft: "5px" }} />
              </MapButton>
            </FlexButtons>
          </Info>

          <DivButton>
            {" "}
            {post.foodPicture ? (
              <PostImage src={post.foodPicture} />
            ) : (
              <NoImage>No Image provided</NoImage>
            )}
          </DivButton>
          <ChatWrap>
            <MsgBtn
              onClick={handleClick}
              style={{ borderRadius: isShown ? "40px" : "40px" }}
            >
              <BsChatRightDots
                style={{ fontSize: "25px", marginRight: "8px" }}
              />
              {isShown ? "Close Chat" : "Message Me"}
            </MsgBtn>
            {isShown && (
              <ChatSetup
                cook={post.cook}
                cookEmail={post.cookEmail}
                user={user}
                room1={post.foodName}
              />
            )}
          </ChatWrap>
        </Flex>
      )}
    </>
  );
};

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 50px 100px 50px;
  flex-wrap: wrap;
  @media (max-width: 750px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 5px;
    margin-top: 50px;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 750px) {
  }
`;

const Title = styled.h4`
  font-size: 21px;
  margin-top: 10px;
  border-radius: 30px;
  background-color: #795e96;
  padding: 10px;
  text-align: center;
  width: 40%;
  border: 2px solid white;
  color: var(--yellow);
  @media (max-width: 750px) {
    font-size: 19px;
    width: 50%;
  }
`;

const Detail = styled.p`
  font-size: 21px;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 30px;
  background-color: #795e96;
  padding: 8px;
  text-align: center;
  width: 40%;
  color: white;
  border: 2px solid white;
  @media (max-width: 750px) {
    font-size: 19px;
    width: 50%;
  }
`;

const AboutDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  border-radius: 30px;
  background-color: #795e96;
  padding: 20px;
  padding-left: 25px;
  border: 2px solid white;
  max-width: 650px;
`;

const AboutTitle = styled.h4`
  font-size: 21px;
  text-align: left;
  color: var(--yellow);
  margin-bottom: 10px;
  @media (max-width: 750px) {
    font-size: 19px;
  }
`;

const AboutDetail = styled.p`
  font-size: 21px;
  text-align: justify;
  line-height: 1.6rem;
  color: white;
  @media (max-width: 750px) {
    font-size: 19px;
  }
`;

const Info = styled.div`
  border: 3px solid purple;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  background-color: white;
  min-width: 700px;
  @media (max-width: 750px) {
    padding: 20px;
    min-width: 0px;
  }
`;

const PostImage = styled.img`
  height: 600px;
  max-width: 600px;
  object-fit: cover;
  margin-left: 20px;
  border-radius: 10px;
  @media (max-width: 750px) {
    margin: 0px;
    height: 400px;
    max-width: 340px;
  }
`;

const DivButton = styled.div`
  display: flex;
  justify-content: center;
  border: 2px solid white;
  margin: 20px;
  @media (max-width: 750px) {
    margin: 0px;
  }
`;

const NoImage = styled.p`
  font-size: 18px;
`;
const FlexButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;
const MapButton = styled.button`
  border: none;
  margin-top: 20px;
  font-size: 18px;
  border-radius: 15px;
  padding: 10px 5px;
  width: 200px;
  margin-left: 50px;
  margin-right: 50px;
  background-color: var(--background);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
  transition: background-color 0.3s, opacity 0.3s;
  &:hover {
    background-color: var(--yellow);
  }
  &:active {
    opacity: 0.3;
  }
`;

const ChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 750px) {
    margin-top: 30px;
  }
`;
const MsgBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 170px;
  height: 50px;
  cursor: pointer;
  border-radius: 3px;
  border: none;
  background-color: #795e96;
  margin-bottom: 10px;
  color: white;
  outline: none;
  -webkit-transition: all ease 0.15s;
  -o-transition: all ease 0.15s;
  -moz-transition: all ease 0.15s;
  transition: all ease 0.15s;
  &:hover {
    transform: scale(1.15);
  }
`;
const LoadingWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
export default PostDetails;
