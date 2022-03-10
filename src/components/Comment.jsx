import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/user-context";
import { patchCommentVotesbyId, deleteCommentById } from "../api";
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
  const [deleteButton, setDeleteButton] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const { loggedIn } = useContext(UserContext);

  useEffect(() => {
    setCommentVotes(votes);
    if (author === loggedIn) {
      setIsYou(" (You)");
      setDeleteButton(
        <button className="delete-button" onClick={handleDelete}>
          DELETE
        </button>
      );
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

  const handleDelete = () => {
    setIsDeleted(true);
    deleteCommentById(comment_id).catch((err) => {
      setIsDeleted(false);
      setVoteErr("something went wrong while deleting your comment");
    });
  };

  const date = new Date(created_at);
  if (isDeleted)
    return (
      <header className="deleted-message">
        <h3>COMMENT DELETED</h3>
      </header>
    );
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
      <div>{deleteButton}</div>
    </article>
  );
}
