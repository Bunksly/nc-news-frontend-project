import { patchCommentVotebyId } from "../api";

export default function Comment({
  comment_id,
  votes,
  created_at,
  author,
  body,
  setIsCommentVoting,
}) {
  const handleVote = (event) => {
    let voteObj = {
      inc_votes: 0,
    };
    if (event.target.value == "up") {
      voteObj.inc_votes = 1;
    } else {
      voteObj.inc_votes = -1;
    }
    patchCommentVotebyId(comment_id, voteObj).then(() => {
      setIsCommentVoting(true);
    });
  };

  const date = new Date(created_at);
  return (
    <article>
      <div className="commentTopBar">
        <h5>{author}</h5>
        <h5>{date.toLocaleDateString()}</h5>
        <div>
          <button
            onClick={handleVote}
            value="up"
            className="detailedVoteButton"
          >
            {String.fromCodePoint(0x1f53c)}
          </button>
        </div>
        <h5>{votes}</h5>
        <div>
          <button
            onClick={handleVote}
            value="down"
            className="detailedVoteButton"
          >
            {String.fromCodePoint(0x1f53d)}
          </button>
        </div>
      </div>
      <p>{body}</p>
    </article>
  );
}
