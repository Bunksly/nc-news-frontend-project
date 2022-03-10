import "./App.css";
import { Routes, Route } from "react-router-dom";
import Title from "./components/Title";
import Profile from "./components/Profile";
import Articles from "./components/Articles";
import Post from "./components/Post";
import DetailedArticle from "./components/DetailedArticle";

function App() {
  return (
    <div className="App">
      <nav className="topBar">
        <Title />
        <Profile />
      </nav>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/:topic" element={<Articles />} />
        <Route path="/article/:article_id" element={<DetailedArticle />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
