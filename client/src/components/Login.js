import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import {BiLogIn} from "react-icons/bi";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <LoginBtn onClick={() => loginWithRedirect()}>Log In <BiLogIn size={23} style={{marginBottom: '-6px', color: '#795E96'}}/> </LoginBtn>;
};

const LoginBtn = styled.button`
  padding: 6px 10px;
  font-weight: 600;
  font-size: 17px;
  border-radius: 14px;
  border: none;
  background-color: var(--background);
  margin-left: 15px;
  margin-right: 15px;
  cursor: pointer;
  transition: background-color 0.3s,
              opacity 0.3s;
  &:hover {
    background-color: var(--yellow);
  }
  &:active {
    opacity: 0.3;
  }
`
export default LoginButton;