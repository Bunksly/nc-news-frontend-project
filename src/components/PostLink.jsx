import { Link } from "react-router-dom";

export default function PostLink() {
  return (
    <header>
      <Link to={"/post"}>
        <h3>Post</h3>
      </Link>
    </header>
  );
}
