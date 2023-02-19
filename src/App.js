import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Details from "./pages/Details";
import NavBar from './pages/Nav';
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import Cart from "./pages/Cart";
import Invoice from "./pages/Invoice";
import ModalFrom from "./pages/ModalForm"

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/product/:id" element={ <Details/> } />
      <Route path="/blogs" element={ <Blog/> } />
      <Route path="/blog/:id" element={ <BlogDetails/> } />
      <Route path="/login" element={ <Login/> } />
      <Route path="/profile" element={ <Profile/> } />
      <Route path="/logout" element={ <Logout/> } />
      <Route path="/cart" element={ <Cart/> } />
      <Route path="/invoice" element={ <Invoice/> } />
      <Route path="/modalform" element={ <ModalFrom/> } />
      </Routes>
    </div>
  );
}

export default App;
