import Login from "./Login";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext } from "react";
import { MenuContext } from "./MenuContext";

const Navbar = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();
  const { openMenu, setOpenMenu } = useContext(MenuContext);

  const handleClick = ()=>{
      // console.log('hi');
      setOpenMenu(!openMenu)
  }

  return (
    <Wrapper>
        <Nav to="/"> Find Your Food 😋</Nav>
     
        {!isAuthenticated && 
          <Login/>
        }
        {isAuthenticated &&    
        <Div>
            <Text>Hello {user.nickname}</Text>
            <HamburgerButton onClick={handleClick}>
                 <GiHamburgerMenu style={{color: 'black'}} />
            </HamburgerButton>
       
        </Div>
        }

    </Wrapper>

  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 25px;
  padding: 10px;
`

const Nav = styled(NavLink)`
font-size: 20px;
text-decoration: none;

`
const Text = styled.p`
color: black;
font-size: 20px;
margin-right: 100px;
`

const Div = styled.div`
`
const HamburgerButton = styled.button`
  position: absolute;
  right: 3rem;
  top: 0.8rem;
  font-size: 2.1rem;
  border: none;
  background-color: inherit;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  &:focus {
    outline: none;
  }
`;
export default Navbar