import cron from "node-cron";
import crypto from "crypto";
import { db } from "../models/db.js";
import OpenAI from "openai";

// Initializes OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

// Generates a single slug
function createUniqueSlug(title) {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `${baseSlug}-${crypto.randomBytes(3).toString("hex")}`;
}

// Insertion using SQLite
function insertPostSQLite(article) {
  const stmt = db.prepare(`
    INSERT INTO posts (title, slug, content)
    VALUES (?, ?, ?)
  `);
  stmt.run(article.title, article.slug, article.content);
}

// Function to generate article using OpenAI.
async function generateArticle() {
  if (!process.env.OPENAI_API_KEY)
    throw new Error("OPENAI_API_KEY não setado");

  const prompt = "Write a short blog article about technology.";

  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 300,
    });

    const text = response.choices[0].message.content.trim();

    if (!text) throw new Error("Conteúdo gerado indisponível.");

    const title = text.split("\n")[0].slice(0, 60).trim() || "Untitled";
    const slug = createUniqueSlug(title);

    return { title, slug, content: text };
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] Erro ao gerar artigo via OpenAI:`,
      err.message || err
    );
    throw err;
  }
}

// Generates and inserts an article into the database.
async function generateAndInsertArticle() {
  try {
    const article = await generateArticle();

    // Check duplication
    const exists = db
      .prepare("SELECT 1 FROM posts WHERE slug = ? LIMIT 1")
      .get(article.slug);

    if (exists) {
      console.log(`[${new Date().toISOString()}] Slug duplicado. Pulando...`);
      return;
    }

    article.slug = createUniqueSlug(article.title);

    insertPostSQLite(article);

    console.log(
      `[${new Date().toISOString()}] Artigo gerado: "${article.title}"`
    );
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] Erro ao gerar/inserir artigo →`,
      err.message || err
    );
  }
}

// Scheduler daily job at midnight UTC
export function scheduleDailyJob() {
  console.log(`[${new Date().toISOString()}] Scheduler inicializado.`);
  cron.schedule("0 0 * * *", generateAndInsertArticle, { timezone: "UTC" });
}

// Run the job manually now
export async function runNow() {
  await generateAndInsertArticle();
}


