import { Link } from "react-router-dom";

// Reusable component for displaying an item card.
export default function ArticleCard({ article, full = false }) {
  const contentPreview = full
    ? article.content
    : article.content.length > 150
    ? article.content.slice(0, 150) + "..."
    : article.content;

  return (
    <div
      className={`bg-white shadow-md rounded-lg p-6 transition-shadow duration-300 ${
        full ? "md:col-span-3" : "hover:shadow-xl"
      }`}
    >
      <h2 className={`font-bold mb-4 ${full ? "text-4xl" : "text-2xl"}`}>
        {article.title}
      </h2>
      <p className="text-gray-700 mb-4">{contentPreview}</p>

      {!full && (
        <Link
          to={`/article/${article.slug}`}
          className="text-amber-600 hover:text-amber-800 font-semibold transition-colors duration-300"
        >
          Read more
        </Link>
      )}
    </div>
  );
}



