import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/ui/parts/header.jsx';
import Footer from '../../components/ui/parts/footer.jsx';
import '../../styles/TinTuc.css';
import { API_URL } from '../../config.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNewspaper,
  faShuffle
} from '@fortawesome/free-solid-svg-icons';

function TinTuc() {
  const [allNews, setAllNews] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterProvince, setFilterProvince] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const limit = 8;

  const provinceAliases = {
    'TP.HCM': ['TP.HCM', 'Thành phố Hồ Chí Minh', 'Saigon', 'Sài Gòn', 'Ho Chi Minh City', 'HCM', 'Hồ Chí Minh', 'HCM City'],
    'Hà Nội': ['Hà Nội', 'Hanoi', 'Hà Nội City', 'Hanoi City', 'Thủ đô Hà Nội', 'Thủ đô Hanoi', 'Hà Nội Thủ đô'],
    'Đà Nẵng': ['Đà Nẵng', 'Da Nang', 'ĐN', 'Đà Nẵng City', 'Da Nang City'],
    'Hải Phòng': ['Hải Phòng', 'Hai Phong', 'HP', 'Hải Phòng City', 'Hai Phong City'],
    'Cần Thơ': ['Cần Thơ', 'Can Tho', 'CT', 'Cần Thơ City', 'Can Tho City'],
    'Bình Dương': ['Bình Dương', 'Binh Duong', 'BD', 'Bình Dương City', 'Binh Duong City'],
    'Đồng Nai': ['Đồng Nai', 'Dong Nai', 'DN', 'Đồng Nai City', 'Dong Nai City'],
    'Khánh Hòa': ['Khánh Hòa', 'Khanh Hoa', 'KH', 'Khánh Hòa City', 'Khanh Hoa City'],
    'Nghệ An': ['Nghệ An', 'Nghe An', 'NA', 'Nghệ An City', 'Nghe An City'],
    'Quảng Ninh': ['Quảng Ninh', 'Quang Ninh', 'QN', 'Quảng Ninh City', 'Quang Ninh City'],
  };

  const provinceRegex = Object.keys(provinceAliases).reduce((acc, province) => {
    const aliases = provinceAliases[province].map(alias => alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    acc[province] = new RegExp(`\\b(${aliases.join('|')})\\b`, 'i');
    return acc;
  }, {});

  // Add unique IDs and timestamps since API doesn't provide them
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/news`);
        // Enhance API response with necessary fields
        const enhancedNews = response.data.map((item, index) => ({
          ...item,
        }));
        setAllNews(enhancedNews);
        setError(null);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Không thể tải tin tức. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Handle pagination and filtering
  useEffect(() => {
    if (allNews.length === 0) return;

    let filteredNews = [...allNews];
    if (filterProvince) {
      const regex = provinceRegex[filterProvince];
      filteredNews = allNews.filter(newsItem =>
        regex.test(newsItem.title) || regex.test(newsItem.content)
      );
    }

    const totalItems = filteredNews.length;
    const totalPagesCount = Math.max(1, Math.ceil(totalItems / limit));
    setTotalPages(totalPagesCount);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    setNews(filteredNews.slice(startIndex, endIndex));
  }, [allNews, page, filterProvince]);

  // Reset page when filter changes
  useEffect(() => {
    setPage(1);
  }, [filterProvince]);

  const FeaturedNews = () => {
    if (!news[0]) return <div>Không có tin tức nổi bật.</div>;
    const { news_id, title, content, thumbnail_url, created_at } = news[0];
    return (
      <Link to={`/news/${news_id}`} className="tintuc-featured">
        <div className="tintuc-featured-image-wrapper">
          <img
            src={thumbnail_url || '/placeholder-news.jpg'}
            alt={title}
            className="tintuc-featured-image"
            onError={(e) => { e.target.src = '/placeholder-news.jpg'; }}
          />
          <div className="tintuc-featured-content">
            <h2 className="tintuc-featured-title">{title}</h2>
            <p className="tintuc-featured-summary">{truncate(content, 100)}</p>
            <p className="tintuc-featured-date">{formatDate(created_at)}</p>
          </div>
        </div>
      </Link>
    );
  };

  const NewsList = () => {
    const newsToShow = news.length > 1 ? news.slice(1) : news;

    return (
      <div className="tintuc-news-list">
        {newsToShow.map(({ news_id, title, content, thumbnail_url, created_at }) => (
          <Link to={`/news/${news_id}`} key={news_id} className="tintuc-news-card">
            <img
              src={thumbnail_url || '/placeholder-news.jpg'}
              alt={title}
              className="tintuc-news-image"
              onError={(e) => { e.target.src = '/placeholder-news.jpg'; }}
            />
            <div className="tintuc-news-content">
              <h3 className="tintuc-news-title">{title}</h3>
              <p className="tintuc-news-summary">{truncate(content, 50)}</p>
              <p className="tintuc-news-date">{formatDate(created_at)}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  const Pagination = () => {
    if (totalPages <= 1) return null;

    const pageRange = 3;
    const start = Math.max(1, page - pageRange);
    const end = Math.min(totalPages, page + pageRange);
    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    return (
      <div className="tintuc-pagination">
        <button
          className="tintuc-pagination-button"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Trước
        </button>
        {pages.map(p => (
          <button
            key={p}
            className={`tintuc-pagination-button ${p === page ? 'tintuc-active' : ''}`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
        <button
          className="tintuc-pagination-button"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Sau
        </button>
      </div>
    );
  };

  const RandomNews = () => {
    const [randomNews, setRandomNews] = useState([]);

    useEffect(() => {
      if (allNews.length === 0) return;
      const shuffled = [...allNews].sort(() => Math.random() - 0.5).slice(0, 3);
      setRandomNews(shuffled);
    }, [allNews, refreshTrigger]);

    if (randomNews.length === 0) return null;

    return (
      <div className="tintuc-random-news">
        <h3 className="tintuc-section-title">Tin tức ngẫu nhiên <FontAwesomeIcon icon={faShuffle}/></h3>
        <ul className="tintuc-random-list">
          {randomNews.map(({ news_id, title, content }) => (
            <li key={news_id}>
              <Link to={`/news/${news_id}`} className="tintuc-random-item">
                <div className="tintuc-random-item-tii">{title}</div>
                <br />
                {truncate(content, 100)}
              </Link>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const MostViewedNews = () => {
    if (allNews.length === 0) return null;
    const random = [...allNews].sort(() => Math.random() - 0.5).slice(0, 4);

    return (
      <div className="tintuc-most-viewed-news">
        <h3 className="tintuc-section-title">Tin tức được xem nhiều nhất</h3>
        <ul className="tintuc-most-viewed-list">
          {random.map(({ news_id, title, content }) => (
            <li key={news_id}>
              <Link to={`/news/${news_id}`} className="tintuc-most-viewed-item">
              <FontAwesomeIcon icon={faNewspaper} className="tintuc-icon" />
                <div className="tintuc-random-item-tii">{title}</div>
                <br />
                {truncate(content, 100)}
              </Link>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const RealEstateNews = () => {
    const provinces = Object.keys(provinceAliases);

    const realEstateNews = provinces
      .map(province => {
        const newsForProvince = allNews.find(newsItem => {
          const regex = provinceRegex[province];
          return regex.test(newsItem.title) || regex.test(newsItem.content);
        });
        return newsForProvince ? { ...newsForProvince, province } : null;
      })
      .filter(item => item !== null);

    if (realEstateNews.length === 0) return null;

    return (
      <div className="tintuc-realestate-news">
        <h3 className="tintuc-section-title">Tin thị trường 10 tỉnh</h3>
        <button
          className={`tintuc-filter-button ${filterProvince === null ? 'tintuc-active' : ''}`}
          onClick={() => setFilterProvince(null)}
        >
          Tất cả
        </button>
        <ul className="tintuc-realestate-list">
          {realEstateNews.map(item => (
            <li key={item.news_id}>
              <button
                className={`tintuc-realestate-item ${filterProvince === item.province ? 'tintuc-active' : ''}`}
                onClick={() => setFilterProvince(item.province)}
              >
               
                <div className="tintuc-realestate-content">
                  <p>{item.province}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const HotMarkets = () => {
    const landmarks = [
      { province: 'Hà Nội', image: 'https://res.cloudinary.com/df8ry7bhf/image/upload/v1750168697/dia-diem-du-lich-o-ha-noi-1_ezf1pd.jpg', name: 'Hà Nội' },
      { province: 'TP.HCM', image: 'https://res.cloudinary.com/df8ry7bhf/image/upload/v1750168701/tphcm-co-bao-nhieu-quan-huyen-va-thanh-pho_jqeycu.jpg', name: 'Tp. HCM' },
    ];

    return (
      <div className="tintuc-hot-markets">
        <h3 className="tintuc-section-title">Thị trường BĐS tại các tỉnh/thành sôi động nhất</h3>
        <div className="tintuc-hot-markets-list">
          {landmarks.map(({ province, image, name }) => (
            <button
              key={province}
              className={`tintuc-hot-market-item ${filterProvince === province ? 'tintuc-active' : ''}`}
              onClick={() => setFilterProvince(province)}
            >
              <img src={image} alt={name} className="tintuc-hot-market-image" />
              <p>{name}</p>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const truncate = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  if (loading) {
    return <div className="tintuc-loading">Đang tải tin tức...</div>;
  }

  if (error) {
    return (
      <div className="tintuc-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Thử lại</button>
      </div>
    );
  }

  return (
    <div className="tintuc-wrapper">
      <Header />
      <div className="tintuc-container">
        <div className="tintuc-introduction">
          <p>
            Tin tức bất động sản mới nhất. Thông tin mới, đầy đủ, hấp dẫn về thị trường bất động sản Việt Nam thông qua dữ liệu lớn về giá, giao dịch, nguồn cung - cầu và khảo sát thực tế của đội ngũ phóng viên, biên tập của DNK Real Estate.
          </p>
        </div>
        <div className="tintuc-main-content">
          <div className="tintuc-main-news">
            <FeaturedNews />
            <NewsList />
            <Pagination />
          </div>
          <div className="tintuc-sidebar">
            <RandomNews />
            <MostViewedNews />
            <HotMarkets />
            <RealEstateNews />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TinTuc;
