import Login from "./Login";
import Logout from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Profile from "./Profile";

const Navbar = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();


  return (
    <Wrapper>
        <Nav to="/">Find Your Food 😋</Nav>
        {!isAuthenticated && 
          <Login/>
        }
        {isAuthenticated &&    
        <>
            <p>Hello {user.name}</p>
            <Logout/>
            <Nav to="/profile">Profile</Nav>
        </>

        }
      
    
    </Wrapper>

  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`

const Nav = styled(NavLink)`

`

export default Navbar