import styled from "styled-components";
import { AiFillInstagram,  } from "react-icons/ai";
import { BsTwitter , BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <FootWrap>
        <FlexDiv>
            {/* <Logo src={SamLogo} /> */}
            <Copyright>© 2023 Food Inc. {""}</Copyright>
            <FlexDiv2>
            <a href="https://www.facebook.com/"   target='_blank'><BsFacebook /></a>
            <a href="https://www.twitter.com/"   target='_blank'><BsTwitter/></a>
            <a href="https://www.instagram.com/"   target='_blank'><AiFillInstagram/></a>
            </FlexDiv2>
        </FlexDiv>
        <FlexDiv>
            <P>Company</P>
            <Option>About Us</Option>
            <Option>Blog</Option>
        </FlexDiv>
        <FlexDiv>
            <P>Support</P>
            <Option>Terms and Condition</Option>
            <Option>Contact Us</Option>
        </FlexDiv>
        <FlexDiv>
            <P>Privacy Policy</P>
            <Option>Privacy Policy</Option>
            <Option>Notice of Collection</Option>
        </FlexDiv>
        <FlexDiv2>
        </FlexDiv2>
      
      
    </FootWrap>
  );
};

const FootWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: gray;
  color: white;
  min-height: 120px;
  position: fixed;
  bottom: 0px;
`;

const Copyright = styled.div`
  margin-bottom: 10px;
`;


const P=styled.button`
  color: white;
  background: none;
  border: none;
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  :hover {
    cursor: pointer;
  }
`
const Option = styled.button`
  color: whitesmoke;
  background: none;
  height: 25px;
  text-align: center;
  border: none;
  :hover {
    color: yellow;
    cursor: pointer;
  }
`;
const Logo = styled.img`
  width: 60px;
  margin-bottom: 15px;
`;
const FlexDiv=styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
`;
const FlexDiv2=styled.div`
    display: flex;
    margin-right: 10px;
    justify-content: space-between;
`;



export default Footer;
