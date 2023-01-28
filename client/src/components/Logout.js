import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


const Logout = () => {
    const { isAuthenticated, isLoading, logout } = useAuth0();
    const navigateHome = useNavigate();

    // User confirms log off and it will log him off
    const handleYes = () => {
        logout({ returnTo: window.location.origin })
    }

    // User cancels the log off and it sends him back to the homepage
    const handleNo = () => {
        navigateHome("/");
    }

    // loading status to prevent false not logged in
    if (isLoading) {
        return (
            <Center><p>Loading...</p></Center> 
        )
    } 

    // if the user is logged in, it offers him options
     else {
        return (
            <Wrapper>
                <LogoutDiv>
                        <Question>Are you sure you want to leave this page?</Question>
                        <Buttons>
                            <Answer value="yes" onClick={handleYes} >Yes</Answer>
                            <Answer value="no" onClick={handleNo} >No</Answer>
                        </Buttons>
                </LogoutDiv>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const LogoutDiv = styled.div`
    margin: auto;
    border-radius: 20px;
    margin-top: 180px;
    margin-bottom: 50px;
    background-color: var(--background);
    display: flex;
    flex-direction: column;
    padding: 20px;
    @media (max-width: 500px) {
    width: 90%;
  }
`

const Answer = styled.button`
    width: 75px;
    height: 40px;
    margin: 3px;
    background-color: #4A2E67;
    border-radius: 6px;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
  transition: background-color 0.4s,
              opacity 0.5s;
  &:hover {
    background-color: var(--yellow);
    padding: 5px;
    border-radius: 14px;
    color: var(--darkblue);
    font-weight: 500;
    font-size: 20px;
  }
  &:active {
    opacity: 0.3;
  }
`

const Question = styled.p`
    padding: 10px;
    margin-bottom: 5px;
    font-size: 22px;
    line-height: 1.3;
    color: var(--darkblue)
`

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const Center = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default Logout;