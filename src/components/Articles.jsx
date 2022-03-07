import { useEffect, useState } from "react";
import { fetchArticles } from "../api";
import { useParams } from "react-router-dom";
import Article from "./Article";
import TopicDropDown from "./TopicDropDown";

export default function Articles() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(topic).then((res) => {
      setArticles(res);
      setIsLoading(false);
    });
  }, [topic]);

  if (isLoading) return <p>loading...</p>;
  return (
    <section>
      <nav className="nav">
        <TopicDropDown />
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
