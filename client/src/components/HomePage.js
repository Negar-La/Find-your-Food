import styled from "styled-components";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import moment from 'moment';


const HomePage = () => {

  const [posts, setPosts] = useState(null);
  const { user, isAuthenticated } = useAuth0();

  //add to favorite and remove from favorite list
//isToggled is an object including all post.id(s) which are either true (added to favorite list) or false (removed from favorite list).

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
        posts.slice().reverse().map((post)=>{
          // console.log(post);
          return (  
            <>
              <ItemContainer to={`/posts/${post.id}`} key={post.id} style={{ textDecoration: 'none' }}>
                <Text> {post.foodPicture ? <Image src={post.foodPicture}/> : (<NoImage>No Image provided</NoImage>) } </Text>
                <Text><Tag>Name:</Tag> {post.foodName}</Text>
                <Text><Tag>Price:</Tag> {post.price}$</Text>
              
                  {post.posted ?     <Posted>Posted {moment(post.posted).fromNow()}</Posted>
                  : ""
                  }
              
            </ItemContainer>       
            </>
          
          )
        })
      }
    </Wrapper>
    </>

  )
}

const Wrapper = styled.div`
  margin: 20px 50px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const Text = styled.p`
width: 190px;
margin-bottom: 10px;
color: black;
font-size: 18px;
display: flex;
justify-content: center;
`
const Tag = styled.span`
font-weight: bold;
margin-right: 5px;
`

const Posted = styled.span`
  text-align: center;
  margin-bottom: 7px;
`

const Title = styled.h1`
margin: 25px;
font-size: 25px;
text-align: center;
`

const ItemContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  padding: 20px 10px 10px 15px;
  margin: 0 0px 30px 20px;
  width: 220px;
  height: 360px;
  text-decoration: none;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
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