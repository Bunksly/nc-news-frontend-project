import { useEffect, useState } from "react";
import { patchCommentVotesbyId } from "../api";
export default function Comment({
  comment_id,
  votes,
  created_at,
  author,
  body,
}) {
  const [commentVotes, setCommentVotes] = useState(0);
  const [voteErr, setVoteErr] = useState(null);

  useEffect(() => {
    setCommentVotes(votes);
  }, []);

  const handleUpvote = () => {
    setCommentVotes((currCount) => currCount + 1);
    setVoteErr(null);
    patchCommentVotesbyId(comment_id, { inc_votes: 1 }).catch((err) => {
      setCommentVotes((currCount) => currCount - 1);
      setVoteErr("something went wrong with your upvote, please try again");
    });
  };

  const handleDownvote = () => {
    setCommentVotes((currCount) => currCount - 1);
    setVoteErr(null);
    patchCommentVotesbyId(comment_id, { inc_votes: -1 }).catch((err) => {
      setCommentVotes((currCount) => currCount + 1);
      setVoteErr("something went wrong with your downvote, please try again");
    });
  };

  const date = new Date(created_at);
  return (
    <article>
      <div className="commentTopBar">
        <h5>{author}</h5>
        <h5>{date.toLocaleDateString()}</h5>
        <div>
          <button onClick={handleUpvote} className="detailedVoteButton">
            {String.fromCodePoint(0x1f53c)}
          </button>
        </div>
        <h5>{commentVotes}</h5>
        <div>
          <button onClick={handleDownvote} className="detailedVoteButton">
            {String.fromCodePoint(0x1f53d)}
          </button>
        </div>
      </div>
      <p>{body}</p>
    </article>
  );
}
