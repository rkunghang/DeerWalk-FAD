import { Routes, Route, Link } from "react-router-dom";
import Home from "../components/pages/Home.jsx";
import About from "../components/pages/About.jsx";
import Land from "../components/pages/land.jsx";
import Feed from "../components/pages/Feed.jsx";

export default function App () {
  return (
    <div>
      {/* <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/land">Land</Link> | <Link to="/feed">Feed</Link>
      </nav> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/land" element={<Land />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </div>

    
  );
}