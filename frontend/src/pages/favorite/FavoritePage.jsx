import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/ui/parts/header';
import Footer from '../../components/ui/parts/footer';
import styles from '../../styles/FavoritePage.module.css';
import '../../styles/App.css';

const mockFavorites = [
  {
    id: '11',
    title: 'Căn hộ cao cấp Quận 7',
    price: 2500000000,
    address: '123 Nguyễn Hữu Thọ, Quận 7, TP.HCM',
    property_type: 'apartment',
    status: 'available',
    images: ['https://example.com/images/prop001-1.jpg'],
  },
  {
    id: 'POST002',
    title: 'Nhà phố Cầu Giấy',
    price: 4500000000,
    address: '456 Nguyễn Du, Cầu Giấy, Hà Nội',
    property_type: 'house',
    status: 'pending',
    images: ['https://example.com/images/prop002-1.jpg'],
  },
];

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

  useEffect(() => {
    const user = { user_id: 1 };
    // const user = JSON.parse(localStorage.getItem('user'));
    // if (!user || !user.user_id) {
    //   setError('Đã xảy ra lỗi, vui lòng thử lại');
    //   return;
    // }

    // Placeholder API call
    // axios.get(`/users/${user.user_id}/favorites`)
    //   .then(response => setFavorites(response.data.favorites))
    //   .catch(() => setError('Đã xảy ra lỗi, vui lòng thử lại'));
    console.log('Setting mock favorites:', mockFavorites);
    setFavorites(mockFavorites);
  }, []);

  console.log('Favorites state:', favorites);

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
                onClick={() => navigate('/nhadatban')}
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
