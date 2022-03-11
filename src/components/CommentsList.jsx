import { useState, useEffect, useContext } from "react";
import Comment from "./Comment";
import { UserContext } from "../contexts/user-context";
import { fetchCommentsByArticleId, postCommentbyId } from "../api";

export default function CommentsList({ article_id, comment_count }) {
  const [isCommentsLoading, setIsCommentLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [postComment, setPostComment] = useState(null);
  const [postErr, setPostErr] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const { loggedIn } = useContext(UserContext);

  useEffect(() => {
    setIsCommentLoading(true);
    fetchCommentsByArticleId(article_id).then((res) => {
      setComments(res);
      setIsCommentLoading(false);
    });
  }, [article_id, isPosting, loggedIn]);

  useEffect(() => {
    setPostComment(null);
  }, [loggedIn]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target[0].value.length <= 10) {
      setPostErr(
        <p className="commentErrMsg">comment must be 10 characters or longer</p>
      );
    } else if (loggedIn === "-------") {
      setPostErr(<p className="commentErrMsg">please log in</p>);
    } else {
      setPostErr(null);
      postCommentbyId(article_id, {
        username: loggedIn,
        body: event.target[0].value,
      }).then((res) => {
        setPostComment(
          <Comment
            key={res.comment_id}
            comment_id={res.comment_id}
            votes={res.votes}
            created_at={res.created_at}
            author={res.author}
            body={res.body}
            loggedIn={loggedIn}
          />
        );
      });
    }
  };
  const handlePostComment = () => {
    setIsPosting(!isPosting);
    setPostComment(
      <form onSubmit={handleSubmit} className="post-comment">
        <div>
          <label htmlFor="commentbody">
            Comment: <br />
          </label>
          <textarea id="commentbody"></textarea>
        </div>
        <div>
          <input type="submit" value="Submit"></input>
        </div>
      </form>
    );
  };

  if (isCommentsLoading) return <p>loading...</p>;
  return (
    <section>
      <div className="commentSection">
        <h4 className="commentHeader">Comments({comment_count}):</h4>
        <h5 onClick={handlePostComment} className="postComment">
          Post Comment
        </h5>
      </div>
      <ul className="comments">
        {postErr}
        {postComment}
        {comments.map(({ comment_id, votes, created_at, author, body }) => {
          return (
            <Comment
              key={comment_id}
              comment_id={comment_id}
              votes={votes}
              created_at={created_at}
              author={author}
              body={body}
              loggedIn={loggedIn}
            />
          );
        })}
      </ul>
    </section>
  );
}
