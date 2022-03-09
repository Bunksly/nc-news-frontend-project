import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleById, patchArticleVotesbyId } from "../api";

import CommentsList from "./CommentsList";

export default function DetailedArticle() {
  const { article_id } = useParams();

  const [article, setArticle] = useState({});
  const [isArticleLoading, setIsArticleLoading] = useState(true);
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
      <CommentsList
        article_id={article_id}
        comment_count={article.comment_count}
      />
    </section>
  );
}
