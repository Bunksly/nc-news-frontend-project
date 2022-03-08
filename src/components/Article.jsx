import { Link } from "react-router-dom";

export default function Article({
  article_id,
  author,
  title,
  topic,
  created_at,
  votes,
  comment_count,
}) {
  const date = new Date(created_at);
  return (
    <li className="article">
      <div>
        <div>
          <Link to={`/article/${article_id}`}>
            <h4>{title}</h4>
          </Link>
        </div>
        <div className="article-topBar">
          <h6>Topic: {topic}</h6>
          <h6>Author: {author}</h6>
          <h6>Created: {date.toLocaleDateString()}</h6>
          <div className="votesComments">
            <button className="voteButton">
              {String.fromCodePoint(0x1f53c)}
            </button>
            <h6>{votes}</h6>
            <button className="voteButton">
              {String.fromCodePoint(0x1f53d)}
            </button>
          </div>
          <h6>Comments ({comment_count})</h6>
        </div>
      </div>
    </li>
  );
}
