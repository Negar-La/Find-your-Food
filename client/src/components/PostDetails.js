import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Map from "./Map";
import {BsFillPinMapFill} from "react-icons/bs";
import {FcLike} from "react-icons/fc";
import { useAuth0 } from "@auth0/auth0-react";
import { BsChatRightDots } from "react-icons/bs";
import ChatSetup from "./ChatSetup";
import LoadingIcon from "./LoadingIcon";


const PostDetails = () => {

    const { postId } = useParams();
    const [post, setPost] = useState(null)
    const {user, isAuthenticated} = useAuth0();
    // console.log(user);
    const [favoritePost, setFavoritePost] = useState([])

    const navigate = useNavigate();
    const [showMap,setShowMap]=useState(false)

    const [isShown, setIsShown] = useState(false);

    const handleClick = (ev) => {
      setIsShown(current => !current);
      ;
    };

    useEffect(() => {
        fetch(`/api/get-post/${postId}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 200) {
              setPost(data.data);
              console.log(data.data);
            }    
        })  
            .catch((error) => {
                return error;
              });
      }, [postId]);

      //https://stackoverflow.com/questions/70922600/when-i-click-one-button-its-open-all-buttons-simultaneously
    const addfavorite = (e, post) =>{
      e.preventDefault();
      fetch(`/api/add-favorite`, {
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
        console.log(data)
        setFavoritePost([...favoritePost, data.data])
        if(data.message === 'This post is already in your favorite list'){
          window.alert("This item is already in your favorite list!")
        }
        navigate('/myFavorites');
      })
      .catch((error) => {
        console.log(error);
      });
   

  }

  return (
        <>
        {!post ? (<LoadingWrapper>
                   <LoadingIcon />
                </LoadingWrapper>
                )
        :
        <Flex>
            <Info>
              <Text><Tag>Food Type:</Tag> {post.foodType}</Text>
              <Text><Tag>Food Name:</Tag> {post.foodName}</Text>
              <Text><Tag>Price:</Tag> {post.price} $</Text>
              <Text><Tag>Ingredients: </Tag>{post.ingredients}</Text>
              <Text><Tag>About this item:</Tag> {post.about ? post.about : "Nothing mentioned"}</Text>
              <Text><Tag>By: </Tag> {post.cook[0].toUpperCase() + post.cook.substring(1)} (Email: {post.cookEmail})</Text>
              <Text><Tag>Address:</Tag>  {post.stNum} {post.stName} - {post.postalCode}</Text>
              <Text><Tag>Phone:</Tag>  {post.phone} </Text>
              <FlexDiv>
                <MapButton onClick={()=> setShowMap(true)}>View on Map <BsFillPinMapFill style={{marginLeft: '5px', color: '#795E96'}} /></MapButton>
                              {showMap && <Map onCloseFunc={()=>setShowMap(false)} center={[parseFloat(post.lat), parseFloat(post.lng)]} />}
                              
              </FlexDiv>
              <FlexDiv>
                <MapButton    onClick={(e) => {
                      if (!isAuthenticated)
                      {
                        window.alert("In order to continue, you will need to log in!")
                      } else {
                        addfavorite(e, post);
                      }
                        }}> 
                      Add to Favorite <FcLike style={{marginLeft: '5px'}}/> 
                  </MapButton>
          
              </FlexDiv>
            </Info>
            <ImageContainer> {post.foodPicture ? <Img src={post.foodPicture}/> : (<NoImage>No Image provided</NoImage>) } </ImageContainer>
            <ChatWrap>
              <MsgBtn onClick={handleClick} style={{borderRadius:isShown ? "40px": "3px" }}>
                <BsChatRightDots style={{fontSize:"25px", marginRight:"8px"}}/>
                {isShown ? "Close Chat" : "Message Me"}
              </MsgBtn>
      {isShown && <ChatSetup cook={post.cook} cookEmail={post.cookEmail} user={user}/>}
                
            </ChatWrap>
        </Flex> 
        }

        </>
  )
}

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 50px 100px 50px;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const Info = styled.div` 
border: 3px solid purple;
border-radius: 15px;
padding: 20px;
margin-bottom: 30px;
background-color: white;
`

const Text = styled.p`
line-height: 40px;
color: black;
font-size: 18px;
display: flex;
justify-content: left;
`
const Tag = styled.span`
font-weight: bold;
margin-right: 5px;
`
const ImageContainer = styled.div`
display: flex;
margin-left: 50px;
@media (max-width: 600px) {
  margin-left: 0px;
  }
`

const Img = styled.img`
  height: 400px;
  border-radius: 20px;
`
const NoImage = styled.p`
font-size: 18px;
`
const FlexDiv = styled.div`
   display: flex;
   justify-content: center;
`
const MapButton = styled.button`
  border: none;
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 18px;
  border-radius: 15px;
  padding: 10px 5px;
  width: 200px;
  background-color: var(--background);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
  transition: background-color 0.3s,
              opacity 0.3s;
  &:hover {
    background-color: var(--yellow);
  }
  &:active {
    opacity: 0.3;
  }
`;

  const ChatWrap = styled.div`
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
@media (max-width: 600px) {
  margin-left: 0px;
  margin-top: 30px;
  }
  `
const MsgBtn = styled.button`
display:flex;
justify-content: center;
align-items: center;
width:120px;
height:50px;
cursor:pointer; 
border-radius: 3px;
border: none;
background-color: #795E96;
color:white;
outline: none;
-webkit-transition: all ease .15s;
  -o-transition: all ease .15s;
  -moz-transition: all ease .15s;
  transition: all ease .15s;
  &:hover{
  -webkit-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.2);
  box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.2);
  transform: scale(1.15);
  }
`
const LoadingWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
export default PostDetails