import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticles } from "../api/client";
import ArticleCard from "../components/ArticleCard";

// Page component for displaying a full article with sidebar of other articles.
export default function ArticlePage() {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) return <p>Loading...</p>;

  const article = articles.find(a => a.slug === slug);
  const others = articles.filter(a => a.slug !== slug);

  if (!article) return <p>Article not found.</p>;

  return (
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 p-6">
      {/* Sidebar */}
      <aside className="md:col-span-1 space-y-4">
        {others.map(a => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </aside>

      {/* Main article */}
      <main className="md:col-span-3 bg-white p-8 rounded shadow">
        {/* Link return */}
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 font-semibold mb-4 inline-block"
        >
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
        <div className="prose max-w-none">
          {article.content.split("\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </main>
    </div>
  );
}


