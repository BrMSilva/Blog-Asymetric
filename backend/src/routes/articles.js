import { Router } from 'express';
import { generateArticle } from '../services/aiClient.js';
import { db } from '../models/db.js';


export const router = Router();

// List all posts
router.get('/', (_, res) => {
  try {
    const rows = db.prepare('SELECT id, title, slug, content, created_at FROM posts ORDER BY created_at DESC').all();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search for a post by slug 
router.get('/:slug', (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM posts WHERE slug = ?').get(req.params.slug);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Generate post automatically (protected)
router.post('/admin/generate', async (req, res) => {
  const token = req.headers.authorization;
  if (token !== `Bearer ${process.env.ADMIN_TOKEN}`)
    return res.status(403).json({ error: 'Forbidden' });

  try {
    const article = await generateArticle();
    db.prepare('INSERT INTO posts (title, slug, content) VALUES (?, ?, ?)').run(
      article.title,
      article.slug,
      article.content
    );
    res.json({ ok: true, article });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a post by ID (protected)
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const stmt = db.prepare('DELETE FROM posts WHERE id = ?');
  const result = stmt.run(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.json({ ok: true });
});

