import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";
import { MenuContext } from "./MenuContext";


const Menu = () => {

  const { isAuthenticated } = useAuth0();
  const { openMenu, setOpenMenu } = useContext(MenuContext);

  return (
    <Wrapper open={openMenu}>
         <Link to="/new" onClick={() => setOpenMenu(!openMenu)}>
        Post a New Add
      </Link>
        <Link to="/myPosts" onClick={() => setOpenMenu(!openMenu)}>
        My Posts
      </Link>
      {isAuthenticated &&
      <>
        <Link to="/myFavorites" onClick={() => setOpenMenu(!openMenu)}>
            My Favorites
        </Link>
        <Link to="/myMessages" onClick={() => setOpenMenu(!openMenu)}>
            My Messages
        </Link>
        <Link to="/faq" onClick={() => setOpenMenu(!openMenu)}>
            FAQ
        </Link>
        <Link to="/logout" onClick={() => setOpenMenu(!openMenu)}>
             Log out
        </Link>
      </>
      }
       {!isAuthenticated && 
       <Link>
       <Login onClick={() => setOpenMenu(!openMenu)} /> 
       </Link>    
       }    
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #795E96;
  /* if navbar is fixed, changing position from absolute to fixed so when you scroll down it works properly */
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  top: 50px;
  right: 0px;

  visibility: ${(props) => (props.open ? "visible" : "hidden")};
`;

const Link = styled(NavLink)`
  color: white;
  height: 50px;
  width: 150px;
  text-decoration: none;
  text-align: center;
  padding-top: 18px;
  font-size: 1.2rem;
  font-weight: 600;
  &:hover {
    background-color: var(--yellow);
    color: black;
  }
`;


export default Menu;