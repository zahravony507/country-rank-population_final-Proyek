import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';

const News = () => {
  // State untuk menyimpan artikel berita
  const [articles, setArticles] = useState([]);
  // State untuk memantau status loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fungsi untuk mengambil berita dari API New York Times
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json`, {
          params: {
            'api-key': import.meta.env.VITE_NYT_API_KEY, // Menggunakan API key dari environment variable
            'q': 'peace', // Mencari artikel dengan kata kunci "peace"
            'sort': 'newest' // Mengurutkan berdasarkan yang terbaru
          }
        });
        // Mengambil 6 artikel pertama
        setArticles(response.data.response.docs.slice(0, 8));
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false); // Set loading ke false setelah data diambil
      }
    };

    fetchNews();
  }, []); // Effect hanya dijalankan saat komponen di-mount

  return (
    <div className="news-container">
      {/* Menampilkan loading jika data sedang diambil */}
      {loading ? (
        <p>Loading news...</p>
      ) : (
        articles.map((article, index) => (
          <a 
            key={index} 
            href={article.web_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="news-item"
          >
            {/* Menampilkan gambar artikel jika tersedia */}
            {article.multimedia && article.multimedia.length > 0 && (
              <img 
                src={`https://www.nytimes.com/${article.multimedia[0].url}`} 
                alt={article.headline.main} 
                className="news-image"
              />
            )}
            <div className="news-content">
              <h2>{article.headline.main}</h2>
              <p>{article.abstract}</p>
            </div>
          </a>
        ))
      )}
    </div>
  );
};

export default News;
