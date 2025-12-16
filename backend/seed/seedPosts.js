import { initDb, getDb } from '../src/models/db.js';

// Seed script to ensure at least 3 articles exist in the database
(async () => {
const db = initDb();

// Check the current number of articles
const count = db.prepare('SELECT COUNT(*) AS c FROM posts').get().c;
if (count < 3) {
for (let i = count; i < 3; i++) {
const title = `Seed article ${i + 1}`;
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const content = 'This is an auto-generated seed article.';

// Insert the new article
db.prepare(`INSERT OR IGNORE INTO posts (title, slug, content) VALUES (?, ?, ?)`)
.run(title, slug, content);
}
console.log('Seed completed.');
} else {
console.log('Seed skipped. Enough articles exist.');
}
})();