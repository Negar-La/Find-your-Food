import styled from "styled-components";
import image from "../../assets/images/error.jpg";

 const ErrorPage = () => {
  return (
    <ErrorDiv>
      <ErrorIcon>
        <img src={image} />
      </ErrorIcon>
      <h2>Woops!</h2>
      <h3>Something went wrong :&#40; </h3>
      <p>Please try refreshing the page.</p>
    </ErrorDiv>
  );
};

const ErrorDiv = styled.div`
  position: absolute;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 30px;
    h3 {
      margin-top: 20px;
      margin-bottom: 30px;
    }
    p {
      font-size: 20px;
    }
`;

const ErrorIcon = styled.span`
`;

export default ErrorPage;
