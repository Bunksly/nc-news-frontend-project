import { useEffect, useState } from "react";
import { fetchArticles } from "../api";
import { useParams } from "react-router-dom";
import Article from "./Article";
import ErrorPage from "./ErrorPage";
import TopicDropDown from "./TopicDropDown";
import SortDropDown from "./SortDropDown";
import OrderDropDown from "./OrderDropDown";

export default function Articles() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [orderSelected, setOrderSelected] = useState(order);
  const [sortBySelected, setSortBySelected] = useState(sortBy);
  const [topicSelected, setTopicSelected] = useState(topic);
  const [isErr, setisErr] = useState(false);

  useEffect(() => {
    setisErr(false);
    setIsLoading(true);
    fetchArticles(topic, sortBy, order)
      .then((res) => {
        setArticles(res);
        setIsLoading(false);
        setOrderSelected(order);
        setSortBySelected(sortBy);
        setTopicSelected(topic);
      })
      .catch((err) => {
        setisErr(true);
        setIsLoading(false);
      });
  }, [topic, sortBy, order]);

  if (isLoading) return <p>loading...</p>;
  if (isErr) return <ErrorPage error={{ topic: topic }} />;
  return (
    <section>
      <nav className="nav">
        <TopicDropDown selected={topicSelected} />
        <SortDropDown setSortBy={setSortBy} selected={sortBySelected} />
        <OrderDropDown setOrder={setOrder} selected={orderSelected} />
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
