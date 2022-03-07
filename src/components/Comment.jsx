export default function Comment({
  comment_id,
  votes,
  created_at,
  author,
  body,
}) {
  const date = new Date(created_at);
  return (
    <article>
      <div className="commentTopBar">
        <h5>{author}</h5>
        <h5>{date.toLocaleDateString()}</h5>
        <div>
          <button className="detailedVoteButton">
            {String.fromCodePoint(0x1f53c)}
          </button>
        </div>
        <h5>{votes}</h5>
        <div>
          <button className="detailedVoteButton">
            {String.fromCodePoint(0x1f53d)}
          </button>
        </div>
      </div>
      <p>{body}</p>
    </article>
  );
}
