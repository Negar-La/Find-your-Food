import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import Login from "./Login";
import Logout from "./Logout";
import Profile from "./Profile";
import Footer from "./Footer";
import PostNewAd from "./PostNewAd";
import PostDetails from "./PostDetails";
import styled from "styled-components";

const App = () => {
  return (
    <Wrapper>
        <BrowserRouter>
      <GlobalStyles />
        <Navbar/>
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/logout" element={<Logout/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/new" element={<PostNewAd/>} />
              <Route path="/posts/:postId" element={<PostDetails/>} />
            </Routes>
            <Footer/>
    </BrowserRouter>
    </Wrapper>

  );
}

const Wrapper = styled.div`
   box-sizing:border-box;
    padding:0 0 85px;
`

export default App;
