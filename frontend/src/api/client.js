import axios from "axios";

// A URL base SEM "/posts"
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// Endpoints
export async function fetchArticles() {
  const res = await axios.get(`${BASE_URL}/posts`);
  return res.data;
}
// Fetch a single article by slug
export async function fetchArticle(slug) {
  const res = await axios.get(`${BASE_URL}/posts/${slug}`);
  return res.data;
}

