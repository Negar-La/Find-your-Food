import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import HomePage from "./Pages/HomePage";
import Navbar from "./Navbar";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import MyFavorites from "./Pages/MyFavorites";
import Footer from "./Footer";
import Form from "./Pages/Form";
import PostDetails from "./Pages/PostDetails";
import styled from "styled-components";
import MyPosts from "./Pages/MyPosts";
import UpdateForm from "./Pages/UpdateForm";
import Menu from "./Menu";
import FAQ from "./Pages/FAQ";
import MyMessages from "./Pages/MyMessages";

const App = () => {
  return (
    <Wrapper>
        <BrowserRouter>
      <GlobalStyles />
        <Navbar/>
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/myFavorites" element={<MyFavorites/>} />
              <Route path="/myPosts" element={<MyPosts/>} />
              <Route path="/myMessages" element={<MyMessages/>} />
              <Route path="/new" element={<Form/>} />
              <Route path="/faq" element={<FAQ/>} />
              <Route path="/updateform/:postId" element={<UpdateForm/>} />
              <Route path="/posts/:postId" element={<PostDetails/>} />
            </Routes>
            <Menu/>
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
