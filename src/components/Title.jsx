import { Link } from "react-router-dom";

export default function Title() {
  return (
    <Link to="/articles">
      <h1 className="title">NC NEWS</h1>
    </Link>
  );
}
