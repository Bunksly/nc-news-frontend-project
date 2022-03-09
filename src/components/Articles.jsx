import { useEffect, useState } from "react";
import { fetchArticles } from "../api";
import { useParams } from "react-router-dom";
import Article from "./Article";
import TopicDropDown from "./TopicDropDown";
import SortDropDown from "./SortDropDown";
import OrderDropDown from "./OrderDropDown";

export default function Articles() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(topic, sortBy, order).then((res) => {
      setArticles(res);
      setIsLoading(false);
    });
  }, [topic, sortBy, order]);

  if (isLoading) return <p>loading...</p>;
  return (
    <section>
      <nav className="nav">
        <TopicDropDown />
        <SortDropDown setSortBy={setSortBy} />
        <OrderDropDown setOrder={setOrder} />
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
