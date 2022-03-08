import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchArticleById,
  fetchCommentsByArticleId,
  patchArticleVotesbyId,
} from "../api";
import Comment from "./Comment";

export default function DetailedArticle() {
  const { article_id } = useParams();

  const [article, setArticle] = useState({});
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [isCommentsLoading, setIsCommentLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState(0);
  const [voteErr, setVoteErr] = useState(null);

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
  }, [article_id]);

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

  const date = new Date(article.created_at);

  if (isArticleLoading) return <p>loading...</p>;
  if (isCommentsLoading) return <p>loading...</p>;
  return (
    <section>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
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
            />
          );
        })}
      </ul>
    </section>
  );
}
