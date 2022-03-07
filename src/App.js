import "./App.css";
import { Routes, Route } from "react-router-dom";
import Title from "./components/Title";
import PostLink from "./components/PostLink";
import ProfileLink from "./components/ProfileLink";
import Articles from "./components/Articles";

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
      </Routes>
    </div>
  );
}

export default App;
