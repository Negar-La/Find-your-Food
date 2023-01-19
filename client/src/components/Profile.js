import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {AiFillDelete} from "react-icons/ai";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

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
      body: JSON.stringify({post}),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.status === 200) {          
         console.log(data)   
         setFavoriteDeleted(!favoriteDeleted) 
         window.alert('post was deleted')
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
    isAuthenticated && (
      <>
              <FavoriteList>
              <Title>My favorite posts:</Title>
              {
                !favoritePosts ? <h1>...Loading</h1> :
                (
                  <Flex>
                  {favoritePosts && favoritePosts.map((post)=>{
                    // console.log(post) 
                    if (post.email === user.email) {
                      return (
                        <>
                          <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none' }}>
                        <Box key={post._id}>
                            <DeleteBtn  onClick={(e) => { deleteFavoriteHandler(e, post) }}>
                                <AiFillDelete size={25} style={{color: "var(--darkblue)"}}
                                onMouseOver={({target})=>target.style.color="var(--yellow)"}
                                onMouseOut={({target})=>target.style.color="var(--darkblue)"}/>
                            </DeleteBtn>
               
                            <Image src={post.picture} alt={post.name} />
                            <BookTitle>{post.name}</BookTitle>
                            <Author>by: <span>{post.person}</span></Author>
                        </Box>
                        </Link>
                        </>
                      
                      )
                    }
                  })
                  }
                  {(favoritePosts && favoritePosts.filter((post)=>{
                     if (post.userPicture === user.picture)
                     return post
                  }).length < 1) ? <NoBook>You have no post in your favorite list</NoBook> : "" 
  
                  }
                </Flex>
                )
              }
           
          </FavoriteList>
      </>
     
    )
  );
};

const Title = styled.div`
  font-weight: bold;
  font-size: 22px;
  margin-top: 20px;
  margin-bottom: 10px;
  @media (max-width: 600px) {
    margin-left: 30px;
  }
`

const FavoriteList = styled.div`
  margin-left: 130px;
  display: flex;
  flex-direction: column;
  @media (max-width: 600px) {
    
    margin-left: 0px;
  }
`;

const Flex = styled.div`
  display: flex;
  max-width: 1100px;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    justify-content: center;
  }
`

const Box = styled.div`
  /* border: 2px solid var(--darkblue); */
  width: 220px;
  height: 340px;
  border: 2px solid blue;
  padding: 10px 25px;
  margin: 10px;
  text-decoration: none;
  text-align: center;
  border-radius: 10px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: all .2s ease-in-out;
  :hover {
    cursor: pointer;
    transform: scale(1.1);   
  }
`

const NoBook = styled.div`
  font-size: 25px;

`

const BookTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Image = styled.img`
  margin-top: 10px;
  border-radius: 10px;
  width: 134px;
  height: 200px;
  margin-bottom: 10px;
`;

const Author = styled.div`
  font-size: 16px;
  /* color: var(--purple); */
  span{
    font-weight: bold;
  }
`
const DeleteBtn = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  transition: 
              opacity 0.3s;
  &:active {
    opacity: 0.3;
  }
`

const Center = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`


export default Profile;