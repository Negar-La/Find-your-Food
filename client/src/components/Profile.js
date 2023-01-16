import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import {TiDeleteOutline} from "react-icons/ti";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Profile = ({isToggled, setIsToggled}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  // console.log(user);
  // console.log(isAuthenticated);
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
         setIsToggled(isToggled =>({
          ...isToggled, [post.id]: !isToggled[post.id]
        }))
         setFavoriteDeleted(!favoriteDeleted)    
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
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
              <FavoriteList>
              <Title>Your favorite posts:</Title>
              {
                !favoritePosts ? <h1>...Loading</h1> :
                (
                  <Flex>
                  {favoritePosts && favoritePosts.map((post)=>{
                    // console.log(post) 
                    if (post.userPicture === user.picture) {
                      return (
                        <Box key={post._id}>
                            <DeleteBtn  onClick={(e) => { deleteFavoriteHandler(e, post) }}
                            ><TiDeleteOutline size={26} style={{color: 'var(--darkblue)'}}/></DeleteBtn>
                             <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                                <Image src={post.picture} alt={post.name} />
                                <BookTitle>{post.name}</BookTitle>
                                <Author>by: <span>{post.person}</span></Author>
                            </Link>
                         
                        </Box>
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

const Wrapper = styled.div`
  display: flex;
  padding-top: 70px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`

const UserInfo = styled.article`
  text-align: center;
  h2, h3 {
    margin: 15px;
    @media (max-width: 600px) {
    font-size: 18px;
  }
  }
`;

const UserImage = styled.img`
  height: 300px;
  border-radius: 30px;
  margin: 20px;
  margin-bottom: 0px;
  @media (max-width: 600px) {
    height: 200px;
  }
`
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
  max-width: 200px;
  padding: 10px 25px;
  margin: 10px;
  text-decoration: none;
  text-align: center;
  border-radius: 10px;
  position: relative;
  &:hover {
    box-shadow: rgba(255, 201, 113, 0.8) -3px 2px 4px 3px,
      rgba(255, 201, 113, 0.8) 0px 1px 3px 1px;
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
const DeleteBtn = styled.button`
  position: absolute;
  right: 0px;
  top: 0px;
  cursor: pointer;
  border: none;
  /* background-color: white; */
  border-radius: 50%;
  transition: background-color 0.3s,
              opacity 0.3s;
  &:hover {
    background-color: var(--yellow);
  }
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