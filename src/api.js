import axios from "axios";

const newsAPI = axios.create({
  baseURL: "https://nc-news-backend-project.herokuapp.com/api",
});

export const fetchArticles = (topic) => {
  return newsAPI
    .get("/articles", { params: { topic: topic } })
    .then(({ data }) => {
      return data.articles;
    });
};

export const fetchTopics = () => {
  return newsAPI.get("/topics").then(({ data }) => {
    return data.topics;
  });
};
