import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/user-context";
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
  const [isYou, setIsYou] = useState(null);
  const { loggedIn, setLoggedIn } = useContext(UserContext);

  useEffect(() => {
    setCommentVotes(votes);
    if (author === loggedIn) {
      setIsYou(" (You)");
    }
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
    <article className="comment">
      <p className="errmsg">{voteErr}</p>
      <p className="comment-body">{body}</p>
      <div className="commentTopBar">
        <h5>
          {author}
          {isYou}
        </h5>
        <h5>{date.toLocaleDateString()}</h5>
        <div className="votesComments">
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
      </div>
    </article>
  );
}
