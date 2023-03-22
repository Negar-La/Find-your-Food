import styled from "styled-components";
import PacmanLoader from "react-spinners/PacmanLoader";

const LoadingIcon = () => {
  return (
    <Loading>
      <PacmanLoader color="#795E96" />
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