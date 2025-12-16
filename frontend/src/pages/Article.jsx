import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticle } from '../api/client';


// Article page component
export default function Article() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticle(slug).then(setArticle).catch(console.error);
  }, [slug]);

  if (!article) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
}
