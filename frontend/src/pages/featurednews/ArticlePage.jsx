import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { format } from 'date-fns';
import { mockNews } from '../news/newsData.jsx';
import Header from '../../components/ui/parts/header.jsx';
import Footer from '../../components/ui/parts/footer.jsx';
import styles from '../../styles/ArticlePage.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { API_URL } from '../../config.js';
import axios from 'axios';
function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock author mapping for user_id
  const authorMap = {
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // const response = await axios.get(`${API_URL}/news/${id}`);
        // Simulating API call with mock data
        const foundArticle = mockNews.find((item) => item.news_id === parseInt(id));
        if (!foundArticle) throw new Error('Không tìm thấy bài báo');
        // Enhance article with mocked fields
        const enhancedArticle = {
          ...foundArticle,
          author: authorMap[foundArticle.user_id] || 'Tác giả ẩn danh',
          tags: [foundArticle.province],
          summary: truncate(foundArticle.content, 50)
        };
        setArticle(enhancedArticle);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const truncate = (text, words) => {
    const wordArray = text.split(' ');
    return wordArray.length > words ? `${wordArray.slice(0, words).join(' ')}...` : text;
  };

  if (loading) return <div className={styles.loading}>Đang tải...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!article) return null;

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <button className={styles.customPrev}></button>,
    nextArrow: <button className={styles.customNext}></button>
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.container}>
        <h1 className={styles.title}>{article.title}</h1>
        <p className={styles.meta}>Tác giả: Quản trị viên</p>
        <p className={styles.meta}>
          Ngày đăng: {format(new Date(article.created_at), 'dd/MM/yyyy')}
        </p>
        {/* <div className={styles.tags}>
          {article.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div> */}
        {/* <p className={styles.summary}>{article.summary}</p> */}
        <Slider {...sliderSettings} className={styles.carousel}>
          <div>
            <img src={article.thumbnail_url} alt={article.title} className={styles.image} />
          </div>
        </Slider>
        <div className={styles.content}>
          <p>{article.content}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ArticlePage;
