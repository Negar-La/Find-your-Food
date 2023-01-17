import styled from "styled-components";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {AiOutlineHeart} from "react-icons/ai";
import {FcLike} from "react-icons/fc";
import moment from 'moment';


const HomePage = ({isToggled, setIsToggled}) => {

  const [posts, setPosts] = useState(null);
  const {user, isAuthenticated} = useAuth0();
  const [favoritePost, setFavoritePost] = useState([])

  //add to favorite and remove from favorite list
console.log(isToggled); //isToggled is an object including all post.id(s) which are either true (added to favorite list) or false (removed from favorite list).

  useEffect(()=>{
      fetch ("/api/getPosts")
        .then(res=> res.json())
        .then((data)=>{
          // console.log(data);
          setPosts(data.data);
        })
    }, [])
    
//https://stackoverflow.com/questions/70922600/when-i-click-one-button-its-open-all-buttons-simultaneously
    const handlefavorite = (e, post) =>{
      console.log(post.id);
      if (!isToggled[post.id])
      {
        e.preventDefault();
      fetch(`/api/add-favorite`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...post,
          user: user.name, 
          userPicture: user.picture,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setFavoritePost([...favoritePost, data.data])
          // localStorage.setItem("setIsToggled", !isToggled[post.id])
          setIsToggled(isToggled =>({
            ...isToggled, [post.id]: !isToggled[post.id]
          }))

          if(data.message === 'This post is already in your favorite list'){
            window.alert("This item is already in your favorite list!")
          }
        })
        .catch((error) => {
          console.log(error);
        });
      } else if (isToggled[post.id]) {
        e.preventDefault();
        fetch(`/api/delete-favorite`, {         
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({post}),
        })
          .then((data) => {
            return data.json();
          })
          .then((data) => {
            if (data.status === 200) {          
             console.log(data)   
            //  localStorage.setItem("setIsToggled", !isToggled[post.id])
             setIsToggled(isToggled =>({
              ...isToggled, [post.id]: !isToggled[post.id]
            }))
            }
          })
          .catch((error) => {
            return error;
          });
      }

    }


  return (
    <>
        <Title> Posts</Title>
        <Wrapper>
      {!posts ? <h2>Loading...</h2>
        :
        posts.map((post)=>{
          // console.log(post);
          return (  
            <>
              <ItemContainer to={`/posts/${post.id}`} key={post.id} style={{ textDecoration: 'none' }}>
                <Text> {post.picture ? <Image src={post.picture}/> : (<NoImage>No Image provided</NoImage>) } </Text>
                <Text><Tag>Name:</Tag> {post.name}</Text>
                <Text><Tag>Price:</Tag> {post.price}</Text>
                <FavoriteBtn    onClick={(e) => {
                    if (!isAuthenticated)
                    {
                      window.alert("Please log in first!")
                    } else {
                      handlefavorite(e, post);
                    }
                      }}> {!isAuthenticated ? <AiOutlineHeart />
                      :
                      isToggled[post.id]  ? <FcLike/> : <AiOutlineHeart /> }
                  </FavoriteBtn>
                  {post.posted ?     <span>Posted {moment(post.posted).fromNow()}</span>
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
  border: 1px solid blue;
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
const FavoriteBtn = styled.div`
  border: 1px solid pink;
  background-color: inherit;
  width: 15px;
  cursor: pointer;
`

export default HomePage