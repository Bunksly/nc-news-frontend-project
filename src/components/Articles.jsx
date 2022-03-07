import { useEffect, useState } from "react";
import { fetchArticles } from "../api";
import Article from "./Article";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles().then((res) => {
      setArticles(res);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>loading...</p>;
  return (
    <section>
      <nav className="nav">
        <h4>topic dd</h4>
        <h4>sort</h4>
        <h4>search</h4>
      </nav>
      <ul className="articles">
        {articles.map(
          ({
            article_id,
            author,
            title,
            topic,
            created_at,
            votes,
            comment_count,
          }) => {
            return (
              <Article
                key={article_id}
                article_id={article_id}
                title={title}
                author={author}
                topic={topic}
                created_at={created_at}
                votes={votes}
                comment_count={comment_count}
              />
            );
          }
        )}
      </ul>
    </section>
  );
}
