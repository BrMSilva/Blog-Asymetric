import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
});

export const fetchArticles = async () => {
  const { data } = await api.get("/posts");
  return data;
};

export const fetchArticle = async (slug) => {
  const { data } = await api.get(`/posts/${slug}`);
  return data;
};

