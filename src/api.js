import axios from "axios";

const newsAPI = axios.create({
  baseURL: "https://nc-news-backend-project.herokuapp.com/api",
});

export const fetchArticles = () => {
  return newsAPI.get("/articles").then(({ data }) => {
    return data.articles;
  });
};
