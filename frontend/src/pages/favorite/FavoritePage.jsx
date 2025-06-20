
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/ui/parts/header';
import Footer from '../../components/ui/parts/footer';
import styles from '../../styles/FavoritePage.module.css';
import '../../styles/App.css';
import { API_URL } from '../../config.js';

const FavoriteCard = ({ post, index }) => {
  const navigate = useNavigate();
  const formatPrice = (price,type) => {
    if (type === 'rent') {
      return price + ' triệu VNĐ/tháng';
    }
    else return price + ' tỷ VNĐ'
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ffc107';
      case 'available':
        return '#28a745';
      case 'sold':
      case 'rented':
        return '#d32f2f';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className={`${styles.fpFavoriteCard} ${styles.slideUp}`} style={{ transitionDelay: `${index * 0.1}s` }}>
      <div className={styles.fpFavoriteImageWrapper}>
        <img
          src={post.images?.[0].image_url}
          alt={post.title}
          className={styles.fpFavoriteImage}
        />
      </div>
      <div className={styles.fpFavoriteContent}>
        <h3 className={styles.fpFavoriteTitle}>{post.title}</h3>
        <p className={styles.fpFavoritePrice}>{formatPrice(post.price)}</p>
        <p className={styles.fpFavoriteAddress}>{post.address}</p>
        <p className={styles.fpFavoriteType}>{post.property_type}</p>
        <span
          className={`${styles.fpFavoriteStatus} ${post.status === 'available' ? styles.pulse : ''}`}
          style={{ backgroundColor: getStatusColor(post.status) }}
        >
          {post.status}
        </span>
        <button
          className={styles.fpViewButton}
          onClick={() => navigate(`/postspage/${post.property_id}`)}
        >
          View
        </button>
      </div>
    </div>
  );
};

const FavoritePosts = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.user_id) {
        setError('Đã xảy ra lỗi, vui lòng thử lại');
        return;
      }
      // Placeholder API call
      try{
        const token = localStorage.getItem('token');
        const response = await axios.get(API_URL+`/favorites/`,{
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        const data =[];
        if(response.data.length > 0){
          for (const item of response.data) {
            const res = await axios.get(API_URL+`/properties/${item.property_id}`);
            data.push(res.data);
          }
        }
        setFavorites(data);
      }
      catch (err) {
        console.error('Error fetching favorite posts:', err);
        setError('Đã xảy ra lỗi khi tải bài đăng yêu thích. Vui lòng thử lại sau.');
        return;
      }
    }
    fetchData();
  }, []);

  if (error) {
    return (
      <div className={`${styles.fpFlexbox} ${styles.shake}`}>
        <Header />
        <div className={styles.fpErrorMessage}>{error}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`flex-box slide-in`}>
      <Header />
      <div className={styles.fpContent}>
        <h1 className={`${styles.userdashboardTabName} ${styles.fadeIn}`}>Bài đăng yêu thích</h1>
        <hr className={styles.decorativeHr} />
        <div className={styles.userdashboardSection}>
          {favorites.length > 0 ? (
            <div className={styles.fpFavoriteList}>
              {favorites.map((post, index) => (
                <FavoriteCard key={post.property_id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className={styles.fpEmptyState}>
              <div className={styles.fpEmptyIcon}></div>
              <p className={styles.fpEmptyMessage}>Chưa có bài đăng yêu thích</p>
              <button
                className={`${styles.fpFindButton} ${styles.pulse}`}
                onClick={() => navigate('/home')}
              >
                Tìm bài đăng
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FavoritePosts;
