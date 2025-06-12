
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/ui/parts/header';
import Footer from '../../components/ui/parts/footer';
import styles from '../../styles/FavoritePage.module.css';
import '../../styles/App.css';

const FavoriteCard = ({ post, index }) => {
  const navigate = useNavigate();
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
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
          src={post.images && post.images[0] ? post.images[0] : 'https://via.placeholder.com/300'}
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
          onClick={() => navigate(`/postspage/${post.id}`)}
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
  const API_URL = 'http://172.16.2.34:8080';

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.user_id) {
        setError('Đã xảy ra lỗi, vui lòng thử lại');
        return;
      }
      // Placeholder API call
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.get(API_URL+`/favorites/`,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add other headers if needed
        }
      });
      const data =[];
      if(response.data.length > 0){
        for (const item of response.data) {
          // Your logic here
          const iter = item.property_id;
          const res = await axios.get(API_URL+`/properties/${iter}`);
          data.push(res.data);
        }
      }
      console.log(data);
      setFavorites(data);
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
                <FavoriteCard key={post.id} post={post} index={index} />
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
