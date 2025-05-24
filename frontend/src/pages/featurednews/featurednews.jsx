import React, { useState, useEffect } from 'react';
import '../../styles/featurednews.css';
import { mockData } from './mockData'; // Import mock data từ file mockData.jsx
import { useNavigate } from 'react-router-dom'; // Import useNavigate từ react-router-dom

function FeaturedNews() {
  const [activeTab, setActiveTab] = useState('featured');
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  const tabs = [
    { id: 'featured', label: 'Tin nổi bật' },
    { id: 'hcm', label: 'BĐS TP.HCM' },
    { id: 'hanoi', label: 'BĐS Hà Nội' },
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Mock data filtering
        let filteredArticles = [...mockData].sort(
          (a, b) => new Date(b.published_at) - new Date(a.published_at)
        ); // Sort by latest
        if (activeTab === 'hcm') {
          filteredArticles = mockData.filter(
            (article) =>
              article.title.includes('TP.HCM') ||
              article.summary.includes('TP.HCM') ||
              article.tags?.includes('TPHCM')
          );
        } else if (activeTab === 'hanoi') {
          filteredArticles = mockData.filter(
            (article) =>
              article.title.includes('Hà Nội') ||
              article.summary.includes('Hà Nội') ||
              article.tags?.includes('HàNội')
          );
        } else if (activeTab === 'featured') {
          // Lấy tất cả bài, ưu tiên mới nhất
          filteredArticles = filteredArticles.slice(0, 10); // Giới hạn 10 bài
        }
        setArticles(filteredArticles);
      } catch (error) {
        console.error('Lỗi khi lấy bài báo:', error);
        setArticles(mockData);
      }
    };
    fetchArticles();
  }, [activeTab]);

  const featuredArticle = articles[0];
  const relatedArticles = articles.slice(1, 4);

  const handleArticleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  return (
    <div className="featured-news-container">
      <h2 className="featured-news-title">Tin tức nổi bật</h2>
      <div className="news-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`news-tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="news-content">
        {featuredArticle ? (
          <div className="featured-article">
            <img
              src={featuredArticle.images?.[0]?.url }
              className="article-image"
              alt={featuredArticle.title}
              onClick={() => handleArticleClick(featuredArticle.id)}
            />
            <h3
              className="article-title"
              onClick={() => handleArticleClick(featuredArticle.id)}
            >
              {featuredArticle.title}
            </h3>
            <p
              className="article-summary"
              onClick={() => handleArticleClick(featuredArticle.id)}
            >
              {featuredArticle.summary}
            </p>
            <p
              className="article-date"
              onClick={() => handleArticleClick(featuredArticle.id)}
            >
              {new Date(featuredArticle.published_at).toLocaleDateString('vi-VN')}
            </p>
          </div>
        ) : (
          <p className="no-articles">Không có bài báo nào.</p>
        )}
        <div className="related-articles">
          {relatedArticles.length > 0 ? (
            relatedArticles.map((article) => (
              <div
                key={article.id}
                className="related-article-item"
                onClick={() => handleArticleClick(article.id)}
              >
                <h4 className="related-article-title">{article.title}</h4>
                <p>{article.summary}</p>
                <p className="related-article-date">
                  {new Date(article.published_at).toLocaleDateString('vi-VN')}
                </p>
              </div>
            ))
          ) : (
            <p className="no-articles">Không có bài báo liên quan.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeaturedNews;
