import styled from "styled-components";
import { useEffect, useState } from 'react';

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
    <Wrapper>
       <Title> Posts</Title>
      {!posts ? <h2>Loading...</h2>
        :
        posts.map((post)=>{
          return (        
            <Info>
            <Text><Tag>Food Type:</Tag> {post.foodType}</Text>
            <Text><Tag>Title:</Tag> {post.name}</Text>
            <Text><Tag>By:</Tag> {post.person}</Text>
            <Text><Tag>Ingredients: </Tag>{post.ingredients}</Text>
            <Text><Tag>About this item:</Tag> {post.about}</Text>
            </Info>
          )
        })

      }
    </Wrapper>
  )
}

const Wrapper = styled.div`

`

const Info = styled.div` 
margin-bottom: 15px;
`
const Text = styled.p`
line-height: 40px;
color: black;
font-size: 18px;
`
const Tag = styled.span`
font-weight: bold;
`
const Title = styled.h1`
color: var(--color-alabama-crimson);
border-bottom: var(--color-alabama-crimson) solid 2px;
margin: 0px 15px;
padding-bottom: 20px;
`


export default HomePage