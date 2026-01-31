import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router as articleRoutes } from './routes/articles.js';
import { initDb } from './models/db.js';
import { scheduleDailyJob } from './services/articleJob.js';

   
// Initialize Express app
const app = express();

// CORS enabled for developers only — you can adjust it later.
app.use(cors({
  origin: ['https://blog-bmarques.duckdns.org'],  // frontend Vite
  methods: ['GET', 'POST'],
}));
app.use(bodyParser.json());
app.use('/posts', articleRoutes);

// Health check endpoint
app.get('/health', (_, res) => res.json({ ok: true }));

// Start the server after initializing the database and scheduling jobs
async function start() {
await initDb();
scheduleDailyJob();

//  Start listening for requests
const port = process.env.PORT || 4000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Backend running on port ${port}`);
});
}


start();