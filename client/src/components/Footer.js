import styled from "styled-components";
import { AiFillInstagram,  } from "react-icons/ai";
import { BsTwitter , BsFacebook } from "react-icons/bs";
import { useNavigate } from "react-router-dom";


const Footer = () => {
  const navigate = useNavigate();

  return (
    <FootWrap>
        <FlexDiv>
            <Copyright>© 2023 Food Inc. {""}</Copyright>
            <FlexDiv2>
            <a href="https://www.facebook.com/"   target='_blank'><BsFacebook style={{color: "white"}}/></a>
            <a href="https://www.twitter.com/"   target='_blank'><BsTwitter  style={{color: "white"}}/></a>
            <a href="https://www.instagram.com/"   target='_blank'><AiFillInstagram  style={{color: "white"}}/></a>
            </FlexDiv2>
        </FlexDiv>
        <FlexDiv>
            <P>Useful Links</P>
            <Option onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate("/");
                    }}>Home</Option>
                <Option onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate("/faq");
                    }}>FAQ</Option>
        </FlexDiv>
    </FootWrap>
  );
};

const FootWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color:	#795E96;
  color: white;
  position: fixed;
  bottom: 0px;
`;

const Copyright = styled.div`
  margin-bottom: 10px;
  @media screen and (max-width: 500px) {
        margin: auto;
    }
`;

const P = styled.button`
  color: white;
  background: none;
  border: none;
  text-align: center;
  font-weight: bold;
  @media screen and (max-width: 500px) {
        display: none;
    }
`
const Option = styled.button`
  color: whitesmoke;
  background: none;
  height: 25px;
  text-align: center;
  border: none;
  :hover {
    color:  var(--yellow);
    cursor: pointer;
  }
`;

const FlexDiv=styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    @media screen and (max-width: 500px) {
      flex-direction: row;
    }
`;
const FlexDiv2=styled.div`
    display: flex;
    margin-right: 10px;
    justify-content: space-between;
    @media screen and (max-width: 500px) {
        display: none;
    }
`;

export default Footer;
