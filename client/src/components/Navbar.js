import Login from "./Login";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext } from "react";
import { MenuContext } from "./MenuContext";
import Logo from '../assets/images/food2.svg';

const Navbar = () => {

  const { user, isAuthenticated } = useAuth0();
  const { openMenu, setOpenMenu } = useContext(MenuContext);

  const handleClick = ()=>{
      // console.log('hi');
      setOpenMenu(!openMenu)
  }

  return (
    <Wrapper>
        <Nav to="/">  <Image src={Logo} alt='Logo' /> Find Your Food 😋</Nav>
     
        {!isAuthenticated && 
        <Div>
          <Login/>
          <NavFav to="/myFavorites" >
               My Favorites
          </NavFav>
        </Div>
        }

        {isAuthenticated &&    
        <Div>
            <Text>Hello {user.nickname[0].toUpperCase() + user.nickname.substring(1)}</Text>
            <HamburgerButton onClick={handleClick}>
                 <GiHamburgerMenu style={{color: 'white'}} />
            </HamburgerButton>
        </Div>
        }

    </Wrapper>

  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #795E96;
  padding: 10px;
  height: 50px;
`

const Nav = styled(NavLink)`
  font-size: 20px;
  text-decoration: none;
  color: white;
`
const Image = styled.img`
	margin-bottom: -2px;
  margin-right: 5px;
  width: 26px;
  `

const NavFav = styled(NavLink)`
  font-size: 20px;
  text-decoration: none;
  color: white;
  margin-left: 15px;
`

const Text = styled.p`
  color: white;
  font-size: 20px;
  margin-right: 100px;
`

const Div = styled.div`
`
const HamburgerButton = styled.button`
  position: absolute;
  right: 3rem;
  top: 0.5rem;
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