import { useState, useEffect } from "react";
import UserDropDown from "./UserDropDown";
import Comment from "./Comment";
import { fetchCommentsByArticleId, postCommentbyId, fetchUsers } from "../api";

export default function CommentsList({ article_id, comment_count }) {
  const [isCommentsLoading, setIsCommentLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [postComment, setPostComment] = useState(null);
  const [postErr, setPostErr] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  useEffect(() => {
    setIsCommentLoading(true);
    fetchCommentsByArticleId(article_id).then((res) => {
      setComments(res);
      setIsCommentLoading(false);
    });
  }, [article_id, isPosting]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target[0].value.length <= 10) {
      setPostErr(
        <p className="commentErrMsg">comment must be 10 characters or longer</p>
      );
    } else if (event.target[1].value === "-------") {
      setPostErr(<p className="commentErrMsg">please select username</p>);
    } else {
      setPostErr(null);
      postCommentbyId(article_id, {
        username: event.target[1].value,
        body: event.target[0].value,
      }).then((res) => {
        console.log(res);
        setPostComment(
          <Comment
            key={res.comment_id}
            comment_id={res.comment_id}
            votes={res.votes}
            created_at={res.created_at}
            author={res.author}
            body={res.body}
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
          <label htmlFor="commentbody">Comment:</label>
          <textarea id="commentbody"></textarea>
        </div>
        <div>
          <UserDropDown users={users} />
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
            />
          );
        })}
      </ul>
    </section>
  );
}
