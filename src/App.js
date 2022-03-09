import "./App.css";
import { Routes, Route } from "react-router-dom";
import Title from "./components/Title";
import PostLink from "./components/PostLink";
import ProfileLink from "./components/ProfileLink";
import Articles from "./components/Articles";
import Post from "./components/Post";
import DetailedArticle from "./components/DetailedArticle";

function App() {
  return (
    <div className="App">
      <nav className="topBar">
        <Title />
        <PostLink />
        <ProfileLink />
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
