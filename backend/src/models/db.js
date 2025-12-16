import Database from 'better-sqlite3';
import dotenv from 'dotenv';
dotenv.config();

// SQLite database path
const dbPath = process.env.DB_PATH || './data/blog.sqlite';

// Create/open the database
export const db = new Database(dbPath);

// Initializes the database and creates a table if it doesn't exist.
export function initDb() {
  try {
    db.prepare(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `).run();

    console.log('Tabela posts verificada/criada com sucesso (SQLite).');
  } catch (err) {
    console.error('Erro ao criar/verificar tabela posts (SQLite):', err);
    throw err;
  }
}

// Helper function for queries
export function query(sql, params = []) {
  const stmt = db.prepare(sql);
  if (sql.trim().toUpperCase().startsWith('SELECT')) {
    return stmt.all(params);
  } else {
    return stmt.run(params);
  }
}

