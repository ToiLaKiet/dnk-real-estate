import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../components/ui/context/AuthContext.jsx';
import { useParams } from 'react-router-dom';
import Header from '../components/ui/parts/header.jsx';
import Footer from '../components/ui/parts/footer.jsx';
import GoogleMapComponent from '../components/ui/googlemap.jsx';
import styles from '../styles/PostsPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Login from './login/Dangnhap1.jsx';
import ReportPosts from '../components/ui/reportPost.jsx';
import Modal from '../components/ui/modal-reg-log.jsx';
import '../styles/App.css';
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
  faExclamationTriangle,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_URL } from '../config.js';

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user, isLoading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [reportsPostsModal, setReportsPostsModal] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useEffect(() => {
    const loadPost = async () => {
      try {
        if (!id || typeof id !== 'string' || id.trim() === '') {
          throw new Error('ID tin đăng không hợp lệ');
        }
        const postId = parseInt(id, 10);
        if (isNaN(postId) || postId <= 0) {
          throw new Error(`ID tin đăng phải là số nguyên dương, nhận được: "${id}"`);
        }
        const res = await axios.get(`${API_URL}/properties/${postId}`);
        const foundPost = res.data;
        console.log('Post data:', foundPost);
        
        if (foundPost.status !== 'available') {
          throw new Error(`Tin đăng "${id}" đã không còn khả dụng`);
        }
        if (!foundPost) {
          throw new Error(`Không tìm thấy tin đăng với ID ${postId}`);
        }
        
        if (user) {
          const favorite = await axios.get(`${API_URL}/favorites/`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          const favoritePropertyIds = favorite.data.map(item => item.property_id);
          setIsFavorite(favoritePropertyIds.includes(foundPost.property_id));
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
  }, [id, user]);

  // Define mediaItems using useMemo to avoid recalculating unnecessarily
  const mediaItems = useMemo(() => {
    const validImages = post?.images?.filter(img => img && img.image_url) || [];
    const validVideos = post?.videos?.[0]?.video_url ? [post.videos[0]] : [];
    return [...validImages, ...validVideos];
  }, [post]);

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };

  const handleFavorite = async () => {
    if (user) {
      try {
        if (!isFavorite) {
          await axios.post(
            `${API_URL}/favorites`,
            { property_id: id },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
        } else {
          await axios.delete(`${API_URL}/favorites/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
        }
        console.log(`User ${user.user_id} ${isFavorite ? 'removed' : 'added'} post ${post.property_id} to favorites`);
        setIsFavorite(!isFavorite);
      } catch (err) {
        console.error('Error updating favorite status:', err);
      }
    } else {
      console.log('User not authenticated, show login modal');
      setShowLoginModal(true);
    }
  };

  const handleReport = () => {
    console.log('handleReport: user=', user, 'isLoading=', isLoading);
    if (isLoading) {
      console.log('Auth still loading');
      return;
    }
    if (!user) {
      console.log('No user authenticated, showing login modal');
      setShowLoginModal(true);
      return;
    }
    setReportsPostsModal(true);
  };

  const renderMedia = () => {
    if (!mediaItems.length) {
      return (
        <div className={styles.noMedia}>
          Không có hình ảnh hoặc video
        </div>
      );
    }

    const currentMedia = mediaItems[currentMediaIndex];

    return (
      <div className={styles.mediaGallery}>
        <div className={styles.mediaContainer}>
          {currentMedia.image_url ? (
            <img
              src={currentMedia.image_url}
              alt={currentMedia.caption || `Hình ảnh ${currentMediaIndex + 1}`}
              className={styles.detailImage}
              loading="lazy"
              onError={(e) => {
                console.warn(`Không tải được hình ảnh: ${currentMedia.image_url}`);
                e.target.src = 'https://i.pravatar.cc/150?u=1';
                e.target.alt = 'Hình ảnh không khả dụng';
              }}
            />
          ) : (
            <video
              src={currentMedia.video_url}
              controls
              className={styles.detailVideo}
              title="Video bất động sản"
              onError={(e) => {
                console.warn(`Không tải được video: ${currentMedia.video_url}`);
              }}
            />
          )}
          {mediaItems.length > 1 && (
            <>
              <button
                className={styles.mediaNavPrev}
                onClick={prevMedia}
                aria-label="Ảnh hoặc video trước đó"
              >
                ‹
              </button>
              <button
                className={styles.mediaNavNext}
                onClick={nextMedia}
                aria-label="Ảnh hoặc video tiếp theo"
              >
                ›
              </button>
            </>
          )}
        </div>
        {mediaItems.length > 1 && (
          <div className={styles.mediaThumbnails}>
            {mediaItems.map((media, index) => (
              <img
                key={media.image_url || media.video_url || `media-${index}`}
                src={media.image_url || media.video_url}
                alt={`Thumbnail ${index + 1}`}
                className={`${styles.thumbnail} ${index === currentMediaIndex ? styles.thumbnailActive : ''}`}
                onClick={() => setCurrentMediaIndex(index)}
                onKeyDown={(e) => e.key === 'Enter' && setCurrentMediaIndex(index)}
                tabIndex={0}
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://i.pravatar.cc/150?u=1';
                }}
              />
            ))}
          </div>
        )}
        <p className={styles.mediaCount}>
          {post?.images?.filter(img => img && img.image_url)?.length || 0} hình ảnh,{' '}
          {post?.videos?.[0]?.video_url ? 1 : 0} video
        </p>
      </div>
    );
  };

  const renderLocation = () => {
    return post?.address || 'Thông tin vị trí không khả dụng';
  };

  const formatPrice = (price, type) => {
    if (!price || typeof price !== 'number' || price <= 0 || isNaN(price)) {
      return 'Liên hệ để biết giá';
    }
    if (type === 'sell' || type === 'project') {
      return `${price.toLocaleString()} tỷ VND`;
    } else {
      return `${price.toLocaleString()} triệu VND/ tháng`;
    }
  };

  const getPropertyTypeLabel = (type) => {
    switch (type) {
      case 'sell':
        return 'Bán';
      case 'rent':
        return 'Cho thuê';
      case 'project':
        return 'Dự án';
      default:
        return 'Không xác định';
    }
  };

  const getStatusLabel = (type) => {
    switch (type) {
      case 'available':
        return 'Có sẵn';
      default:
        return 'Không xác định';
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
                  <div className={styles.iconth}>
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className={styles.triangleexclamation}
                      onClick={isLoading ? null : handleReport}
                      aria-label="Báo cáo tin đăng"
                    />
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={`${styles.heartIcon} ${isFavorite ? styles.favorite : ''}`}
                      onClick={handleFavorite}
                      aria-label={isFavorite ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
                    />
                  </div>
                </div>
                <div className={styles.summaryPriceArea}>
                  <p className={styles.summary}>{renderLocation()}</p>
                  <div className={styles.priceArea}>
                    <p className={styles.price}>
                      <strong>Giá:</strong> {formatPrice(post.price, post.property_type)}
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
                      <strong>Loại bất động sản:</strong> {getPropertyTypeLabel(post.property_type) || 'N/A'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faTag} className={styles.icon} />
                      <strong>Trạng thái:</strong> {getStatusLabel(post.status) || 'N/A'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faFileContract} className={styles.icon} />
                      <strong>Pháp lý:</strong> {post.features?.find(f => f.feature_name === 'legalDocuments')?.feature_value || 'N/A'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faBed} className={styles.icon} />
                      <strong>Phòng ngủ:</strong> {post.features?.find(f => f.feature_name === 'bedrooms')?.feature_value || 'N/A'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faBath} className={styles.icon} />
                      <strong>Phòng tắm:</strong> {post.features?.find(f => f.feature_name === 'bathrooms')?.feature_value || 'N/A'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faCouch} className={styles.icon} />
                      <strong>Nội thất:</strong> {post.features?.find(f => f.feature_name === 'furniture')?.feature_value || 'N/A'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faCompass} className={styles.icon} />
                      <strong>Hướng nhà:</strong> {post.features?.find(f => f.feature_name === 'houseDirection')?.feature_value || 'N/A'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faWind} className={styles.icon} />
                      <strong>Hướng ban công:</strong> {post.features?.find(f => f.feature_name === 'balconyDirection')?.feature_value || 'N/A'}
                    </div>
                  </div>
                </div>
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
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png"
                  alt="Zalo Logo"
                  style={{ width: '30px', height: '30px' }}
                />
                {'   '}
                <div style={{ marginLeft: '10px' }}>Liên hệ qua Zalo</div>
              </a>
            </div>
          </aside>
        )}
      </div>
      <Modal isOpen={reportsPostsModal} onClose={() => setReportsPostsModal(false)}>
        <div style={{ padding: '30px' }}>
          <ReportPosts
            propertyId={id}
            user_id={user?.user_id}
            isOpen={reportsPostsModal}
            onClose={() => setReportsPostsModal(false)}
          />
        </div>
      </Modal>
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <Login />
      </Modal>
      <Footer />
    </div>
  );
}

export default PostPage;
