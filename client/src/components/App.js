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
import usePersistedState from "./usePersistedState";
import { useState } from "react";

const App = () => {

  const [isToggled, setIsToggled] = usePersistedState({})
  // in order to delete an item from favorite list both in homepage and profile page and remove the red heart.

  return (
    <Wrapper>
        <BrowserRouter>
      <GlobalStyles />
        <Navbar/>
            <Routes>
              <Route path="/" element={<HomePage isToggled={isToggled} setIsToggled={setIsToggled} />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/profile" element={<Profile isToggled={isToggled} setIsToggled={setIsToggled} />} />
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
