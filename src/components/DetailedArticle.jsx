import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchArticleById,
  fetchCommentsByArticleId,
  patchArticleVotesbyId,
  postCommentbyId,
  fetchUsers,
} from "../api";
import Comment from "./Comment";
import UserDropDown from "./UserDropDown";

export default function DetailedArticle() {
  const { article_id } = useParams();

  const [article, setArticle] = useState({});
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [isCommentsLoading, setIsCommentLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState(0);
  const [voteErr, setVoteErr] = useState(null);
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
    setIsArticleLoading(true);
    fetchArticleById(article_id).then((res) => {
      setArticle(res);
      setVotes(res.votes);
      setIsArticleLoading(false);
    });
  }, [article_id]);

  useEffect(() => {
    setIsCommentLoading(true);
    fetchCommentsByArticleId(article_id).then((res) => {
      setComments(res);
      setIsCommentLoading(false);
    });
  }, [article_id, isPosting]);

  const handleUpvote = () => {
    setVotes((currCount) => currCount + 1);
    setVoteErr(null);
    patchArticleVotesbyId(article_id, { inc_votes: 1 }).catch((err) => {
      setVotes((currCount) => currCount - 1);
      setVoteErr("something went wrong with your upvote, please try again");
    });
  };

  const handleDownvote = () => {
    setVotes((currCount) => currCount - 1);
    setVoteErr(null);
    patchArticleVotesbyId(article_id, { inc_votes: -1 }).catch((err) => {
      setVotes((currCount) => currCount + 1);
      setVoteErr("something went wrong with your downvote, please try again");
    });
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

  const date = new Date(article.created_at);

  console.log("mistake catcher");

  if (isArticleLoading) return <p>loading...</p>;
  if (isCommentsLoading) return <p>loading...</p>;
  return (
    <section>
      <h1>{article.title}</h1>
      <p className="article-body">{article.body}</p>
      <p className="errmsg">{voteErr}</p>
      <div className="credentials">
        <h5>Author: {article.author}</h5>
        <h5>Topic: {article.topic}</h5>
        <h5>Created: {date.toLocaleDateString()}</h5>
        <div>
          <button onClick={handleUpvote} className="detailedVoteButton">
            {String.fromCodePoint(0x1f53c)}
          </button>
        </div>
        <h5>{votes}</h5>
        <div>
          <button onClick={handleDownvote} className="detailedVoteButton">
            {String.fromCodePoint(0x1f53d)}
          </button>
        </div>
      </div>
      <div className="commentSection">
        <h4 className="commentHeader">Comments({article.comment_count}):</h4>
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
