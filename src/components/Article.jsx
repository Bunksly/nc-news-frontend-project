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
          <h4>{title}</h4>
        </div>
        <div className="article-topBar">
          <h6>Topic: {topic}</h6>
          <h6>Author: {author}</h6>
          <h6>Created: {date.toLocaleDateString()}</h6>
          <div className="votesComments">
            <h6>{votes}</h6>
            <div>
              <button className="voteButton">
                {String.fromCodePoint(0x1f53c)}
              </button>
              <button className="voteButton">
                {String.fromCodePoint(0x1f53d)}
              </button>
            </div>
          </div>
          <h6>Comments ({comment_count})</h6>
        </div>
      </div>
    </li>
  );
}
