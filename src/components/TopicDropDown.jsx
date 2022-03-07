import { useEffect, useState } from "react";
import { fetchTopics } from "../api";
import { useNavigate } from "react-router-dom";

export default function TopicDropDown() {
  let navigate = useNavigate();
  const HandleTopicChange = (event) => {
    if (event.target.value === "all" || event.target.value === "-------") {
      navigate("/");
    } else {
      navigate(`/${event.target.value}`);
    }
  };

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics().then((res) => {
      setTopics(res);
    });
  }, []);

  return (
    <form onChange={HandleTopicChange}>
      <label htmlFor="topics">Topic:</label>
      <select name="topics">
        <option key="-">{"-------"}</option>
        <option key="all" value="all">
          All
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
