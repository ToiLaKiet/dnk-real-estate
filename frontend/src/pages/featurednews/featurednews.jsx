import React, { useState, useEffect } from 'react';
import '../../styles/featurednews.css';
import { mockNews } from '../news/newsData.jsx';
import { useNavigate } from 'react-router-dom';

function FeaturedNews() {
  const [activeTab, setActiveTab] = useState('featured');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const tabs = [
    { id: 'featured', label: 'Tin nổi bật' },
    { id: 'hcm', label: 'BĐS TP.HCM' },
    { id: 'hanoi', label: 'BĐS Hà Nội' },
  ];

  const provinceAliases = {
    'TP.HCM': ['TP.HCM', 'Thành phố Hồ Chí Minh', 'Saigon'],
    'Hà Nội': ['Hà Nội', 'Hanoi']
  };

  // Cache regex for provinces
  const provinceRegex = {
    'hcm': new RegExp(`\\b(${provinceAliases['TP.HCM'].map(a => a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'i'),
    'hanoi': new RegExp(`\\b(${provinceAliases['Hà Nội'].map(a => a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'i')
  };

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        let filteredArticles = mockNews
          .filter(n => n.status === 'published')
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        if (activeTab === 'hcm') {
          filteredArticles = filteredArticles.filter(n =>
            provinceRegex['hcm'].test(n.title) || provinceRegex['hcm'].test(n.content)
          );
        } else if (activeTab === 'hanoi') {
          filteredArticles = filteredArticles.filter(n =>
            provinceRegex['hanoi'].test(n.title) || provinceRegex['hanoi'].test(n.content)
          );
        } else if (activeTab === 'featured') {
          filteredArticles = filteredArticles.slice(0, 4); // Limit to 4 for featured
        }

        setArticles(filteredArticles);
      } catch (err) {
        console.error('Lỗi khi lấy bài báo:', err);
        setError('Lỗi khi tải tin tức');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [activeTab]);

  const truncate = (text, words) => {
    const wordArray = text.split(' ');
    return wordArray.length > words ? `${wordArray.slice(0, words).join(' ')}...` : text;
  };

  const featuredArticle = articles[0];
  const relatedArticles = articles.slice(1, 4);

  const handleArticleClick = (newsId) => {
    navigate(`/news/${newsId}`);
  };

  if (loading) return <div className="no-articles">Đang tải...</div>;
  if (error) return <div className="no-articles">{error}</div>;

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
              src={featuredArticle.thumbnail_url}
              className="article-image"
              alt={featuredArticle.title}
              onClick={() => handleArticleClick(featuredArticle.news_id)}
            />
            <h3
              className="article-title"
              onClick={() => handleArticleClick(featuredArticle.news_id)}
            >
              {featuredArticle.title}
            </h3>
            <p
              className="article-summary"
              onClick={() => handleArticleClick(featuredArticle.news_id)}
            >
              {truncate(featuredArticle.content, 50)}
            </p>
            <p
              className="article-date"
              onClick={() => handleArticleClick(featuredArticle.news_id)}
            >
              {new Date(featuredArticle.created_at).toLocaleDateString('vi-VN')}
            </p>
          </div>
        ) : (
          <p className="no-articles">Không có bài báo nào.</p>
        )}
        <div className="related-articles">
          {relatedArticles.length > 0 ? (
            relatedArticles.map((article) => (
              <div
                key={article.news_id}
                className="related-article-item"
                onClick={() => handleArticleClick(article.news_id)}
              >
                <h4 className="related-article-title">{article.title}</h4>
                <p>{truncate(article.content, 30)}</p>
                <p className="related-article-date">
                  {new Date(article.created_at).toLocaleDateString('vi-VN')}
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
