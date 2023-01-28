import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {AiFillDelete} from "react-icons/ai";
import LoadingIcon from "../LoadingIcon";
import Login from "./Login";

const MyFavorites = () => {
  const { user, isAuthenticated} = useAuth0();
  // console.log(user);
  const [favoritePosts, setFavoritePosts] = useState(null)
  const[favoriteDeleted, setFavoriteDeleted] = useState(false)


  useEffect(() => {
    fetch(`/api/get-favorites`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setFavoritePosts(data.data);
          console.log(data.data)
        } 
      });
  }, [favoriteDeleted]);

  const deleteFavoriteHandler = (e, post) => {                        
    e.preventDefault();
    fetch(`/api/delete-favorite`, {         
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({post, emailAddedtoFav:user.email}),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.status === 200) {          
         console.log(data)   
         setFavoriteDeleted(!favoriteDeleted) 
         window.alert('post was deleted from Favorite list')
        }
      })
      .catch((error) => {
        return error;
      });
  };


  if (!isAuthenticated) {
    return (<LoadingWrapper>
             <Title>You need an account to save your <Purple>Favorite Foods</Purple>!</Title>
             <Login/>
          </LoadingWrapper>
           )
  }

  return (
      <>
              <Title>My favorite posts:</Title>
              <Wrapper>
              {!favoritePosts ? (<LoadingWrapper>
                                    <LoadingIcon />
                                </LoadingWrapper>
                                ) 
                :
                  favoritePosts.map((post)=>{
                    if (post.userAddedtoFav === user.email) 
                      return (
                          <ItemContainer to={`/posts/${post.id}`} key={post.id} style={{ textDecoration: 'none' }}>
                            <Text> {post.foodPicture ? <Image src={post.foodPicture}/> : (<NoImage>No Image provided</NoImage>) } </Text>
                            <Text><Tag>Name: </Tag> {post.foodName}</Text>
                            <Text><Tag>By: </Tag> {post.cook}</Text>
                    
                            <BtnContainer>
                              <DeleteBtn  onClick={(e) => { deleteFavoriteHandler(e, post) }}> 
                                <AiFillDelete size={25} style={{color: "#4A2E67"}}
                                  onMouseOver={({target})=>target.style.color="var(--yellow)"}
                                  onMouseOut={({target})=>target.style.color="#4A2E67"}/>
                              </DeleteBtn>
                            </BtnContainer>
                        </ItemContainer> 
                      )
                  })
              }
                {favoritePosts && favoritePosts.filter((post)=>{
                     if (post.userAddedtoFav === user.email)
                        return post
                    }).length < 1 ? (<NoPost>You have no post in your favorite list</NoPost>) : "" 
                }

              </Wrapper>
           
      </>
     
 
  );
};


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
const Title = styled.h1`
margin: 25px;
font-size: 25px;
text-align: center;
`
const Purple = styled.span`
  color: purple;
  font-weight: bold;
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
`
const BtnContainer = styled.div`
  display: flex;
  width: 50px;
  justify-content: space-between;
`

const DeleteBtn = styled.div`
  background-color: inherit;
  width: 15px;
  cursor: pointer;
`
const NoPost = styled.div`
  font-size: 25px;
`
const LoadingWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default MyFavorites