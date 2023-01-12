import styled from "styled-components";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const HomePage = () => {

  const [posts, setPosts] = useState(null);

  useEffect(()=>{
      fetch ("/api/getPosts")
        .then(res=> res.json())
        .then((data)=>{
          console.log(data);
          setPosts(data.data);
        })
    }, [])




  return (
    <>
        <Title> Posts</Title>
        <Wrapper>
      {!posts ? <h2>Loading...</h2>
        :
        posts.map((post)=>{
          return (  
            <ItemContainer to={`/posts/${post.id}`} key={post.id} style={{ textDecoration: 'none' }}>
            <Text> {post.picture ? <Image src={post.picture}/> : (<NoImage>No Image provided</NoImage>) } </Text>
            <Text><Tag>Name:</Tag> {post.name}</Text>
            <Text><Tag>Price:</Tag> {post.price}</Text>
            </ItemContainer>
          )
        })
      }
    </Wrapper>
    </>

  )
}

const Wrapper = styled.div`
  border: 1px solid red;
  margin: 20px 50px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const Text = styled.p`
line-height: 40px;
color: black;
font-size: 18px;
display: flex;
justify-content: center;
`
const Tag = styled.span`
font-weight: bold;
`
const Title = styled.h1`
margin: 25px;
border: 1px solid green;
font-size: 25px;
text-align: center;
`

const ItemContainer = styled(Link)`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  padding: 20px 10px 10px 10px;
  margin: 0 0px 30px 20px;
  width: 200px;
  height: 320px;
  text-decoration: none;
  box-shadow: 6px 10px 79px 10px rgba(184,178,184,1);
  transition: all .2s ease-in-out;
  color: var(--text-color);
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
`


export default HomePage