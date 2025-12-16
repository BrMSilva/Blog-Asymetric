import { listArticles, findArticleById } from "../models/db.js";
// Controller to manage articles
export async function getAllArticles(req, res) {
  const articles = await listArticles();
  res.json(articles);
}
// Controller to retrieve an article by ID.
export async function getArticleById(req, res) {
  const article = await findArticleById(req.params.id);

  if (!article) {
    return res.status(404).json({ message: "Artigo não encontrado" });
  }

  res.json(article);
}
