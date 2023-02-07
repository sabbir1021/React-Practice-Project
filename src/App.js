import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Details from "./pages/Details";
import NavBar from './pages/Nav';
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/product/:id" element={ <Details/> } />
      <Route path="/blogs" element={ <Blog/> } />
      <Route path="/blog/:id" element={ <BlogDetails/> } />

      </Routes>
    </div>
  );
}

export default App;
