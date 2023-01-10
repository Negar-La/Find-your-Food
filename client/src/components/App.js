import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import Login from "./Login";
import Logout from "./Logout";
import Profile from "./Profile";
import Footer from "./Footer";
import PostNewAd from "./PostNewAd";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
        <Navbar/>
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/logout" element={<Logout/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/new" element={<PostNewAd/>} />
            </Routes>
            <Footer/>
    </BrowserRouter>
  );
}

export default App;
