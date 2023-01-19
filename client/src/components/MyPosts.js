import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {AiFillDelete} from "react-icons/ai";
import {AiFillEdit} from "react-icons/ai";

const MyPosts = () => {

    const { user, isAuthenticated, isLoading } = useAuth0();
    const [posts, setPosts] = useState(null);
    const[postDeleted, setPostDeleted] = useState(false)

    const navigate = useNavigate();

    useEffect(()=>{
        fetch ("/api/getPosts")
          .then(res=> res.json())
          .then((data)=>{
            // console.log(data);
            setPosts(data.data);
          })
      }, [postDeleted])



    const deleteHandler = (e, post) => {
        e.preventDefault();
        fetch(`/api/delete-post`, {         
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
               setPostDeleted(!postDeleted)  
               window.alert("Successfully deleted")  
              }
            })
            .catch((error) => {
              return error;
            });
    }
        
      //function that navigates to the update form componenets
  const editHandler = ((e,post) => {
    console.log(post._id);
    e.preventDefault();
    navigate(`/updateform/${post._id}`);
  })
  return (
    <>
     <Title>My posts:</Title>
     <Wrapper>
    {!posts ? <h2>Loading...</h2>
      :
      posts.map((post)=>{
        if (post.email === user.email) 
        // console.log(post);
        return (  
          <>
            <ItemContainer to={`/posts/${post._id}`} key={post._id} style={{ textDecoration: 'none' }}>
              <Text> {post.picture ? <Image src={post.picture}/> : (<NoImage>No Image provided</NoImage>) } </Text>
              <Text><Tag>Name:</Tag> {post.name}</Text>
              <Text><Tag>Price:</Tag> {post.price}</Text>
              <BtnContainer>
                <DeleteBtn  onClick={(e) => { deleteHandler(e, post) }}> 
                   <AiFillDelete size={25} style={{color: "var(--darkblue)"}}
                    onMouseOver={({target})=>target.style.color="var(--yellow)"}
                    onMouseOut={({target})=>target.style.color="var(--darkblue)"}/>
                </DeleteBtn>
                <DeleteBtn  onClick={(e) => { editHandler(e, post) }}> 
                   <AiFillEdit size={25} style={{color: "var(--darkblue)"}}
                    onMouseOver={({target})=>target.style.color="var(--yellow)"}
                    onMouseOut={({target})=>target.style.color="var(--darkblue)"}/>
                </DeleteBtn>
              </BtnContainer>
            
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
border: 1px solid green;
width: 190px;
margin-bottom: 10px;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  padding: 20px 10px 10px 10px;
  margin: 0 0px 30px 20px;
  width: 220px;
  height: 340px;
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
  font-size: 25px;
  margin-top: 200px;
  border: 2px solid green;
`

export default MyPosts