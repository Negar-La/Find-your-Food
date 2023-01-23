import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {AiFillDelete} from "react-icons/ai";

const MyFavorites = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
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


  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
      <>
              <Title>My favorite posts:</Title>
              <Wrapper>
              {!favoritePosts ? <h2>Loading...</h2> 
                :
                  favoritePosts.map((post)=>{
                    if (post.userAddedtoFav === user.email) 
                      return (
                        <>
                          <ItemContainer to={`/posts/${post.id}`} key={post.id} style={{ textDecoration: 'none' }}>
                            <Text> {post.foodPicture ? <Image src={post.foodPicture}/> : (<NoImage>No Image provided</NoImage>) } </Text>
                            <Text><Tag>Name: </Tag> {post.foodName}</Text>
                            <Text><Tag>By: </Tag> {post.cook}$</Text>
                    
                            <BtnContainer>
                              <DeleteBtn  onClick={(e) => { deleteFavoriteHandler(e, post) }}> 
                                <AiFillDelete size={25} style={{color: "var(--darkblue)"}}
                                  onMouseOver={({target})=>target.style.color="var(--yellow)"}
                                  onMouseOut={({target})=>target.style.color="var(--darkblue)"}/>
                              </DeleteBtn>
                            </BtnContainer>
                        </ItemContainer> 
                        </>
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
border: 1px solid red;
  font-size: 25px;
`

export default MyFavorites