import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchArticleById,
  fetchCommentsByArticleId,
  patchArticleVotebyId,
} from "../api";
import Comment from "./Comment";

export default function DetailedArticle() {
  const { article_id } = useParams();

  const [article, setArticle] = useState({});
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [isCommentsLoading, setIsCommentLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [isArticleVoting, setIsArticleVoting] = useState(false);
  const [isCommentVoting, setIsCommentVoting] = useState(false);

  useEffect(() => {
    setIsArticleLoading(true);
    fetchArticleById(article_id).then((res) => {
      setArticle(res);
      setIsArticleLoading(false);
      setIsArticleVoting(false);
    });
  }, [article_id, isArticleVoting]);

  useEffect(() => {
    setIsCommentLoading(true);
    fetchCommentsByArticleId(article_id).then((res) => {
      setComments(res);
      setIsCommentLoading(false);
      setIsCommentVoting(false);
    });
  }, [article_id, isCommentVoting]);

  const handleVote = (event) => {
    let voteObj = {
      inc_votes: 0,
    };
    if (event.target.value == "up") {
      voteObj.inc_votes = 1;
    } else {
      voteObj.inc_votes = -1;
    }
    patchArticleVotebyId(article_id, voteObj).then(() => {
      setIsArticleVoting(true);
    });
  };

  const date = new Date(article.created_at);

  if (isArticleLoading) return <p>loading...</p>;
  if (isCommentsLoading) return <p>loading...</p>;
  return (
    <section>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <div className="credentials">
        <h5>Author: {article.author}</h5>
        <h5>Topic: {article.topic}</h5>
        <h5>Created: {date.toLocaleDateString()}</h5>
        <div>
          <button
            onClick={handleVote}
            value="up"
            aria-label="upvote-button"
            className="detailedVoteButton"
          >
            {String.fromCodePoint(0x1f53c)}
          </button>
        </div>
        <h5>{article.votes}</h5>
        <div>
          <button
            onClick={handleVote}
            value="down"
            aria-label="downvote-button"
            className="detailedVoteButton"
          >
            {String.fromCodePoint(0x1f53d)}
          </button>
        </div>
      </div>
      <h4 className="commentHeader">Comments({article.comment_count}):</h4>
      <ul className="comments">
        {comments.map(({ comment_id, votes, created_at, author, body }) => {
          return (
            <Comment
              key={comment_id}
              comment_id={comment_id}
              votes={votes}
              created_at={created_at}
              author={author}
              body={body}
              setIsCommentVoting={setIsCommentVoting}
            />
          );
        })}
      </ul>
    </section>
  );
}
