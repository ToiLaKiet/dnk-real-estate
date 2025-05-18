import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { format } from 'date-fns';
import { mockData } from './mockData.jsx';
import Header from '../../components/ui/parts/header.jsx';
import Footer from '../../components/ui/parts/footer.jsx';
import styles from '../../styles/ArticlePage.module.css'; // Import CSS styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Giả định API: const response = await fetch(`/api/article/${id}`);
        // const data = await response.json();
        const foundArticle = mockData.find((item) => item.id === id);
        if (!foundArticle) throw new Error('Không tìm thấy bài báo');
        setArticle(foundArticle);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

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
    arrows: true,  // Bật nút điều hướng
    prevArrow: <button className="slick-prev"></button>,
    nextArrow: <button classNam="slick-next"></button>
  };

  

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.container}>
        <h1 className={styles.title}>{article.title}</h1>
        {article.author && <p className={styles.meta}>Tác giả: {article.author}</p>}
        {article.published_at && (
          <p className={styles.meta}>
            Ngày đăng: {format(new Date(article.published_at), 'dd/MM/yyyy')}
          </p>
        )}
        {article.tags && article.tags.length > 0 && (
          <div className={styles.tags}>
            {article.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
        )}
        {article.summary && <p className={styles.summary}>{article.summary}</p>}
        {article.images && article.images.length > 0 && (
          <Slider {...sliderSettings} className={styles.carousel}>
            {article.images.map((img, index) => (
              <div key={index}>
                <img src={img.url} alt={`Hình ${index + 1}`} className={styles.image} />
              </div>
            ))}
          </Slider>
        )}
        {article.videos && article.videos.length > 0 && (
          <video src={article.videos[0].url} controls className={styles.video} />
        )}
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </main>
      <Footer />
    </div>
  );
}

export default ArticlePage;
