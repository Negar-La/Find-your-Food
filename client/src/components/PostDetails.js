import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

const PostDetails = () => {

    const { postId } = useParams();
    const [post, setPost] = useState(null)

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
        <>
            <Info>
            <Text><Tag>Food Type:</Tag> {post.foodType}</Text>
            <Text><Tag>Food Name:</Tag> {post.name}</Text>
            <Text><Tag>By:</Tag> {post.person}</Text>
            <Text><Tag>Price:</Tag> {post.price}</Text>
            <Text><Tag>Ingredients: </Tag>{post.ingredients}</Text>
            <Text><Tag>About this item:</Tag> {post.about ? post.about : "Nothing mentioned"}</Text>
            <ImageContainer><Tag>Photo:</Tag> {post.picture ? <Img src={post.picture}/> : (<NoImage>No Image provided</NoImage>) } </ImageContainer>
            </Info>
        </> }

        </>
  )
}

const Info = styled.div` 
margin: 20px 50px 100px 50px;
border: 1px solid green;
min-width: 300px;
max-width: 600px;
padding: 10px;
height: 650px;
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
justify-content: left;
height: 400px;
width: 400px;
border: 1px solid red;
`

const Img = styled.img`
height: 400px;
  border-radius: 10px;
`
const NoImage = styled.p`
font-size: 18px;
`

export default PostDetails