import { useEffect, useState } from "react";
import { fetchTopics } from "../api";
import { useNavigate } from "react-router-dom";

export default function TopicDropDown({ selected }) {
  let navigate = useNavigate();
  const handleTopicChange = (event) => {
    navigate(`/articles/${event.target.value}`);
  };

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics().then((res) => {
      setTopics(res);
    });
  }, []);

  return (
    <form>
      <label htmlFor="topics">Topic:</label>
      <select onChange={handleTopicChange} name="topics" value={selected}>
        <option key="all" value="all">
          all
        </option>
        {topics.map(({ slug }) => {
          return (
            <option key={slug} value={slug}>
              {slug}
            </option>
          );
        })}
      </select>
    </form>
  );
}
