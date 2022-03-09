import axios from "axios";

const newsAPI = axios.create({
  baseURL: "https://nc-news-backend-project.herokuapp.com/api",
});

export const fetchArticles = (topic, sortBy, order) => {
  return newsAPI
    .get("/articles", {
      params: { topic: topic, sort_by: sortBy, order: order },
    })
    .then(({ data }) => {
      return data.articles;
    });
};

export const fetchTopics = () => {
  return newsAPI.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

export const fetchArticleById = (id) => {
  return newsAPI.get(`/articles/${id}`).then(({ data }) => {
    return data.article;
  });
};

export const fetchCommentsByArticleId = (id) => {
  return newsAPI.get(`/articles/${id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const patchArticleVotesbyId = (id, vote) => {
  return newsAPI.patch(`/articles/${id}`, vote).then(({ data }) => {
    return data.article;
  });
};

export const patchCommentVotesbyId = (id, vote) => {
  return newsAPI.patch(`/comments/${id}`, vote).then(({ data }) => {
    return data.comment;
  });
};

export const fetchUsers = () => {
  return newsAPI.get("/users").then(({ data }) => {
    return data.users;
  });
};

export const postCommentbyId = (id, comment) => {
  return newsAPI.post(`articles/${id}/comments`, comment).then(({ data }) => {
    return data.comment;
  });
};
