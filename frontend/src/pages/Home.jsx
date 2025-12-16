import { useEffect, useState } from 'react';
import { fetchArticles } from '../api/client';
import ArticleCard from '../components/ArticleCard';
import Footer from "./Footer";
import Header from './Header';

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then(setArticles).catch(console.error);
  }, []);

  return (
    <div className="bg-blend-soft-light flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <ArticleCard key={a.id} article={a} />
          ))}

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

