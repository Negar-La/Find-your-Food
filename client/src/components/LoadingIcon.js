import styled from "styled-components";
import loadingImg from "../assets/images/loader.gif";

const LoadingIcon = () => {
  return (
    <Loading>
      <img src={loadingImg} />
    </Loading>
  )
}

const Loading = styled.div`
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default LoadingIcon