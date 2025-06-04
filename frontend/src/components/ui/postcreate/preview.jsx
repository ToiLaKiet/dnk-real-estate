import React, { useState, useEffect, useContext, use } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from '../components/ui/parts/header.jsx';
import Footer from '../components/ui/parts/footer.jsx';
import GoogleMapComponent from '../components/ui/googlemap.jsx';
import styles from '../styles/PostsPage.module.css';
import { FaHeart } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../components/ui/context/AuthContext.jsx';
import { useLocation } from 'react-router-dom';

import {
  faHome,
  faTag,
  faFileContract,
  faBed,
  faBath,
  faCouch,
  faCompass,
  faWind,
  faUser,
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';


function Preview() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const location = useLocation();
  const postData = location.state?.package;


  useEffect(() => {
    const loadPost = () => {
      try {
        if (!id || typeof id !== 'string' || id.trim() === '') {
          throw new Error('ID tin đăng không hợp lệ');
        }

        const postId = parseInt(id, 10);
        if (isNaN(postId) || postId <= 0) {
          throw new Error(`ID tin đăng phải là số nguyên dương, nhận được: "${id}"`);
        }

        if (!postData || !Array.isArray(postData) || postData.length === 0) {
          console.log('DDDD',typeof postData);
          throw new Error('Dữ liệu tin đăng không khả dụng');
        }

        const foundPost = postData.find(post => post && post.property_id === postId);

        if (!foundPost) {
          throw new Error(`Không tìm thấy tin đăng với ID ${postId}`);
        }

        setPost(foundPost);

      } catch (err) {
        console.error('Lỗi khi tải tin đăng:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  };

  const handleFavorite = () => {
    // TODO: Implement backend request to add/remove favorite for post ${post.property_id}
    setIsFavorite(!isFavorite);
    if (isAuthenticated && user) {
      console.log(`User ${user.id} ${isFavorite ? 'removed' : 'added'} post ${post.property_id} to favorites`);
    } else {
      console.log('User not authenticated, show login modal');
    }
  };

  const renderMedia = () => {
    if (!post?.media || !Array.isArray(post.media.images) || post.media.images.length === 0) {
      return (
        <div className={styles.noMedia}>
          Không có hình ảnh
        </div>
      );
    }

    const validImages = post.media.images.filter(img => img && img.url);
    const videoCount = post.media.videoUrl ? 1 : 0;

    return (
      <div>
        <Slider {...sliderSettings}>
          {validImages.map((img, index) => (
            <div key={img.url || `image-${index}`} className={styles.mediaItem}>
              <img
                src={img.url}
                alt={img.caption || `Hình ảnh ${index + 1}`}
                className={styles.mediaImage}
                onError={(e) => {
                  console.warn(`Không tải được hình ảnh: ${img.url}`);
                  e.target.src = 'https://i.pravatar.cc/150?u=1';
                  e.target.alt = 'Hình ảnh không khả dụng';
                }}
              />
            </div>
          ))}
          {post.media.videoUrl && (
            <div key="video" className={styles.mediaItem}>
              <video
                src={post.media.videoUrl}
                controls
                className={styles.mediaVideo}
                title="Video bất động sản"
                onError={(e) => {
                  console.warn(`Không tải được video: ${post.media.videoUrl}`);
                }}
              />
            </div>
          )}
        </Slider>
        <br />
        <p className={styles.mediaCount}>
          {validImages.length} hình ảnh, {videoCount} video
        </p>
      </div>
    );
  };

  const renderLocation = () => {
    return post.address.displayAddress || 'Thông tin vị trí không khả dụng';
  };

  const formatPrice = (price, type) => {
    if (!price || typeof price !== 'number' || price <= 0 || isNaN(price)) {
      return 'Liên hệ để biết giá';
    }
    if (type === 'nhadatban') {
      if (price >= 1e9) {
        return `${(price / 1e9).toFixed(1)} tỷ VND`;
      }
      return `${(price / 1e6).toFixed(1)} triệu VND`;
    } else {
      return `${(price / 1e6).toFixed(1)} triệu/tháng`;
    }
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.mainWrapper}>
        <main className={styles.container}>
          {loading ? (
            <div className={styles.loading}>Đang tải chi tiết tin đăng...</div>
          ) : error ? (
            <div className={styles.error}>
              <h2>Lỗi khi tải tin đăng</h2>
              <p>{error}</p>
              <p>Vui lòng thử lại hoặc quay lại trang tìm kiếm.</p>
            </div>
          ) : !post ? (
            <div className={styles.error}>
              <h2>Không tìm thấy tin đăng</h2>
              <p>Tin đăng bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            </div>
          ) : (
            <div className={styles.content}>
              <div className={styles.carousel}>
                {renderMedia()}
              </div>
              <div className={styles.info}>
                <div className={styles.titleWrapper}>
                  <h1 className={styles.title}>{post.title || 'Tin đăng không có tiêu đề'}</h1>
                  <FaHeart
                    className={`${styles.heartIcon} ${isFavorite ? styles.favorite : ''}`}
                    onClick={handleFavorite}
                    aria-label={isFavorite ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
                  />
                </div>
                <div className={styles.summaryPriceArea}>
                  <p className={styles.summary}>{renderLocation()}</p>
                  <div className={styles.priceArea}>
                    <p className={styles.price}>
                      <strong>Giá:</strong> {formatPrice(post.price, post.type)}
                    </p>
                    <p className={styles.area}>
                      <strong>Diện tích:</strong> {post.area ? `${post.area} m²` : 'N/A'}
                    </p>
                  </div>
                </div>
                <div className={styles.description}>
                  <h3 className={styles.descriptionTitle}>Chi tiết mô tả</h3>
                  <p className={styles.descriptionText}>{post.description || 'Không có mô tả'}</p>
                </div>
                <div className={styles.features}>
                  <h3 className={styles.featuresTitle}>Đặc điểm bất động sản</h3>
                  <div className={styles.featuresGrid}>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faHome} className={styles.icon} />
                      <strong>Loại bất động sản:</strong> {post.property_type || 'N/A'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faTag} className={styles.icon} />
                      <strong>Trạng thái:</strong> {post.status || 'N/A'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faFileContract} className={styles.icon} />
                      <strong>Pháp lý:</strong> {post.features.legalDocuments || 'N/A'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faBed} className={styles.icon} />
                      <strong>Phòng ngủ:</strong> {post.features.bedrooms || 'N/A'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faBath} className={styles.icon} />
                      <strong>Phòng tắm:</strong> {post.features.bathrooms || 'N/A'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faCouch} className={styles.icon} />
                      <strong>Nội thất:</strong> {post.features.furniture || 'N/A'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faCompass} className={styles.icon} />
                      <strong>Hướng nhà:</strong> {post.features.houseDirection || 'N/A'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faWind} className={styles.icon} />
                      <strong>Hướng ban công:</strong> {post.features.balconyDirection || 'N/A'}
                    </div>
                  </div>
                </div>
                {post.address.coordinates && (
                  <div className={styles.mapSection}>
                    <h3 className={styles.mapTitle}>Vị trí</h3>
                    <GoogleMapComponent
                      coordinates={post.address.coordinates}
                      address={post.address.displayAddress}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
        {post && (
          <aside className={styles.contactBox}>
            <h3 className={styles.contactTitle}>Thông tin liên hệ</h3>
            <p className={styles.contactInfo}>
              <FontAwesomeIcon icon={faUser} className={styles.icon} />
              <strong>Người liên hệ:</strong> {post.contact.name}
            </p>
            <p className={styles.contactInfo}>
              <FontAwesomeIcon icon={faPhone} className={styles.icon} />
              <strong>Phone:</strong> {post.contact.phone}
            </p>
            <p className={styles.contactInfo}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
              <strong>Email:</strong> {post.contact.email}
            </p>
            <div className={styles.contactButtons}>
              <a href={`tel:${post.contact.phone}`} className={styles.contactButton}>
                <FontAwesomeIcon icon={faPhone} className={styles.icon} />
                Gọi điện
              </a>
              <a
                href={`https://zalo.me/${post.contact.phone}`}
                className={styles.ZalocontactButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                Liên hệ qua Zalo
              </a>
            </div>
          </aside>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Preview;
