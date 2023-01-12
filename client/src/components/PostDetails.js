import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Map from "./Map";
import {BsFillPinMapFill} from "react-icons/bs";

const PostDetails = () => {

    const { postId } = useParams();
    const [post, setPost] = useState(null)

    const [showMap,setShowMap]=useState(false)

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
  return (
        <>
        {!post ? <h1>Loading...</h1>
        :
        <Flex>
            <Info>
              <Text><Tag>Food Type:</Tag> {post.foodType}</Text>
              <Text><Tag>Food Name:</Tag> {post.name}</Text>
              <Text><Tag>By:</Tag> {post.person}</Text>
              <Text><Tag>Price:</Tag> {post.price}</Text>
              <Text><Tag>Ingredients: </Tag>{post.ingredients}</Text>
              <Text><Tag>About this item:</Tag> {post.about ? post.about : "Nothing mentioned"}</Text>
              <Text><Tag>Address:</Tag>  {post.stNum} {post.stName} - {post.postalCode}</Text>
              <FlexDiv>
                <MapButton onClick={()=> setShowMap(true)}>View on Map <BsFillPinMapFill style={{marginLeft: '5px'}} /></MapButton>
                              {showMap && <Map onCloseFunc={()=>setShowMap(false)} center={[parseFloat(post.lat), parseFloat(post.lng)]} />}
                              
              </FlexDiv>
            </Info>
            <ImageContainer> {post.picture ? <Img src={post.picture}/> : (<NoImage>No Image provided</NoImage>) } </ImageContainer>
  
        </Flex> 
        }

        </>
  )
}

const Flex = styled.div`
  display: flex;
  margin: 20px 50px 100px 50px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const Info = styled.div` 
border: 1px solid green;
min-width: 350px;
max-width: 800px;
padding: 10px;
height: 400px;
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
`
const ImageContainer = styled.div`
display: flex;
border: 1px solid red;
margin-left: 30px;
@media (max-width: 600px) {
  margin-left: 0px;
  }
`

const Img = styled.img`
height: 400px;
  border-radius: 10px;
`
const NoImage = styled.p`
font-size: 18px;
`
const FlexDiv = styled.div`
   display: flex;
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

export default PostDetails