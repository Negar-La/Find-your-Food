import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import Login from "./Login";
import Logout from "./Logout";
import Profile from "./Profile";
import Footer from "./Footer";
import Form from "./Form";
import PostDetails from "./PostDetails";
import styled from "styled-components";
import MyPosts from "./MyPosts";
import UpdateForm from "./UpdateForm";
import Menu from "./Menu";
import FAQ from "./FAQ";

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
              <Route path="/profile" element={<Profile/>} />
              <Route path="/myPosts" element={<MyPosts/>} />
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
