import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/ui/parts/header.jsx';
import Footer from '../../components/ui/parts/footer.jsx';
import { mockNews } from './newsData.jsx';
import '../../styles/TinTuc.css'; // Assuming you have a CSS file for styling   
import { API_URL } from '../../config.js';
function TinTuc() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterProvince, setFilterProvince] = useState(null);
  const limit = 8;

  const provinceAliases = {
    'TP.HCM': ['TP.HCM', 'Thành phố Hồ Chí Minh', 'Saigon', 'Sài Gòn', 'Ho Chi Minh City', 'HCM', 'Hồ Chí Minh','HCM City'],
    'Hà Nội': ['Hà Nội', 'Hanoi'],
    'Đà Nẵng': ['Đà Nẵng'],
    'Hải Phòng': ['Hải Phòng'],
    'Cần Thơ': ['Cần Thơ'],
    'Bình Dương': ['Bình Dương'],
    'Đồng Nai': ['Đồng Nai'],
    'Khánh Hòa': ['Khánh Hòa'],
    'Nghệ An': ['Nghệ An'],
    'Quảng Ninh': ['Quảng Ninh']
  };

  // Cache regex for each province
  const provinceRegex = Object.keys(provinceAliases).reduce((acc, province) => {
    const aliases = provinceAliases[province]
      .map(alias => alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); // Escape special chars
    acc[province] = new RegExp(`\\b(${aliases.join('|')})\\b`, 'i');
    return acc;
  }, {});

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // Mock API call
        // const response = await axios.get(`${API_URL}/news`);
        // const news_data = response.data; // Use real API data in production
        // For now, we use mock data
        let publishedNews = mockNews.filter(n => n.status === 'published');
        console.log('Published news count:', publishedNews.length); // Debug
        if (filterProvince) {
          const regex = provinceRegex[filterProvince];
          publishedNews = publishedNews.filter(n => 
            regex.test(n.title) || regex.test(n.content)
          );
          console.log('Filtered news count:', publishedNews.length); // Debug
        }
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedNews = publishedNews.slice(start, end);
        setNews(paginatedNews);
        setTotalPages(Math.max(1, Math.ceil(publishedNews.length / limit))); // Ensure at least 1 page
        console.log('Paginated news:', paginatedNews, 'Total pages:', totalPages); // Debug
      } catch (err) {
        setError('Không thể tải tin tức. Vui lòng thử lại sau.');
        console.error('Fetch error:', err); // Debug
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [page, filterProvince]);

  const FeaturedNews = () => {
    if (!news[0]) return <div>Không có tin tức nổi bật.</div>;
    const { news_id, title, content, thumbnail_url, created_at } = news[0];
    return (
      <Link to={`/news/${news_id}`} className="tintuc-featured">
        <div className="tintuc-featured-image-wrapper">
            <img src={thumbnail_url} alt={title} className="tintuc-featured-image" />
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
    return (
      <div className="tintuc-news-list">
        {news.slice(1).map(({ news_id, title, content, thumbnail_url, created_at }) => (
          <Link to={`/news/${news_id}`} key={news_id} className="tintuc-news-card">
            <img src={thumbnail_url} alt={title} className="tintuc-news-image" />
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
    const publishedNews = mockNews.filter(n => n.status === 'published');
    const random = publishedNews.sort(() => Math.random() - 0.5).slice(0, 3);
    return (
      <div className="tintuc-random-news">
        <h3 className="tintuc-section-title">Tin tức ngẫu nhiên</h3>
        <ul className="tintuc-random-list">
          {random.map(({ news_id, title, content }) => (
            <li key={news_id}>
              <Link to={`/news/${news_id}`} className="tintuc-random-item">
              <div className='tintuc-random-item-tii'>{title}</div>
                <br/>
                {truncate(content, 10)}
              </Link>
              <hr/>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const MostViewedNews = () => {
    const publishedNews = mockNews.filter(n => n.status === 'published');
    const random = publishedNews.sort(() => Math.random() - 0.5).slice(0, 4);
    return (
      <div className="tintuc-most-viewed-news">
        <h3 className="tintuc-section-title">Tin tức được xem nhiều nhất</h3>
        <ul className="tintuc-most-viewed-list">
          {random.map(({ news_id, title, content }) => (
            <li key={news_id}>
              <Link to={`/news/${news_id}`} className="tintuc-most-viewed-item">
                <div className='tintuc-random-item-tii'>{title}</div>
                <br/>
                {truncate(content, 10)}
              </Link>
              <hr/>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const RealEstateNews = () => {
    const provinces = [
      'Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ',
      'Bình Dương', 'Đồng Nai', 'Khánh Hòa', 'Nghệ An', 'Quảng Ninh'
    ];
    const realEstateNews = provinces
      .map(p => mockNews.find(n => n.status === 'published' && n.province === p))
      .filter(item => item !== null);

    return (
      <div className="tintuc-realestate-news">
        <h3 className="tintuc-section-title">Tin thị trường 10 tỉnh</h3>
        <button
          className={`tintuc-filter-button ${filterProvince === null ? 'tintuc-active' : ''}`}
          onClick={() => {
            setFilterProvince(null);
            setPage(1);
          }}
        >
          Tất cả
        </button>
        <ul className="tintuc-realestate-list">
          {realEstateNews.map(item => (
            <li key={item.news_id}>
              <button
                className={`tintuc-realestate-item ${filterProvince === item.province ? 'tintuc-active' : ''}`}
                onClick={() => {
                  setFilterProvince(item.province);
                  setPage(1);
                }}
              >
                <img
                  src={item.province_image || `https://picsum.photos/50/50?random=${item.news_id}`}
                  alt={item.province}
                  className="tintuc-realestate-image"
                />
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
      { province: 'Hà Nội', image: 'https://picsum.photos/100/100?random=102', name: 'Hà Nội' },
      { province: 'TP.HCM', image: 'https://picsum.photos/100/100?random=101', name: 'Tp. HCM' }
    ];

    return (
      <div className="tintuc-hot-markets">
        <h3 className="tintuc-section-title">Thị trường BĐS tại các tỉnh/thành sôi động nhất</h3>
        <div className="tintuc-hot-markets-list">
          {landmarks.map(({ province, image, name }) => (
            <button
              key={province}
              className={`tintuc-hot-market-item ${filterProvince === province ? 'tintuc-active' : ''}`}
              onClick={() => {
                setFilterProvince(province);
                setPage(1);
              }}
            >
              <img src={image} alt={name} className="tintuc-hot-market-image" />
              <p>{name}</p>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const truncate = (text, words) => {
    const wordArray = text.split(' ');
    return wordArray.length > words ? `${wordArray.slice(0, words).join(' ')}...` : text;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

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
            {loading ? (
              <div className="tintuc-loading">Đang tải tin tức...</div>
            ) : error ? (
              <div className="tintuc-error">{error}</div>
            ) : (
              <>
                <FeaturedNews />
                <NewsList />
                <Pagination />
              </>
            )}
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
