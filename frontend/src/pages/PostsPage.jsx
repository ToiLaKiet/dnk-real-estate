import React, { useState, useEffect, useContext } from 'react';
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
import Login from './login/Dangnhap1.jsx';

import {
  faHome,
  faTag,
  faFileContract,
  faBed,
  faBath,
  faUtensils,
  faSnowflake,
  faTshirt,
  faCouch,
  faSwimmingPool,
  faDumbbell,
  faCar,
  faShieldAlt,
  faElevator,
  faUser,
  faPhone,
  faEnvelope,
  faClock,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';


// Tạm thời dùng mock data, sẽ thay bằng API call sau
let postData = require('./postData.jsx').postData;

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  useEffect(() => {
    const loadPost = () => {
      try {
        console.log('Raw ID from useParams:', id, typeof id);

        // Kiểm tra id ngay từ đầu
        if (!id || typeof id !== 'string' || id.trim() === '') {
          throw new Error('ID tin đăng không được để trống hoặc không hợp lệ');
        }

        const postId = parseInt(id, 10);
        console.log('Parsed ID:', postId, typeof postId);

        if (isNaN(postId) || postId <= 0) {
          throw new Error(`ID tin đăng phải là số nguyên dương, nhận được: "${id}"`);
        }

        // Tạm thời dùng mock data, sẽ thay bằng API call sau
        // TODO: Thay bằng API call, ví dụ:
        // import axios from 'axios';
        // const response = await axios.get(`/api/posts/${postId}`);
        // setPost(response.data);

        if (!postData || !Array.isArray(postData) || postData.length === 0) {
          throw new Error('Dữ liệu tin đăng không khả dụng hoặc rỗng');
        }

        const foundPost = postData.find(post => post && post.id === postId);
        if (!foundPost) {
          throw new Error(`Không tìm thấy tin đăng với ID ${postId}`);
        }

        console.log('Post found:', foundPost.title);
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
    setIsFavorite(!isFavorite);
    //backend Send this post to favorite list of the current user
    if(isAuthenticated && user) {
      // Call API to add/remove favorite
      console.log(`User ${user.id} ${isFavorite ? 'removed' : 'added'} post ${post.id} to favorites`);
      //API call to add/remove favorite
    }
    else{
      console.log('User not authenticated, show login modal');
      // Show login modal
      // openModal('login');
    }


  };

  const renderMedia = () => {
    if (!post?.media || !Array.isArray(post.media) || post.media.length === 0) {
      return (
        <div className={styles.noMedia}>
          Không có hình ảnh hoặc video
        </div>
      );
    }

    const validMedia = post.media.filter(
      (item) => item && item.url && ['image', 'video'].includes(item.type)
    );

    if (validMedia.length === 0) {
      return (
        <div className={styles.noMedia}>
          Không có hình ảnh hoặc video hợp lệ
        </div>
      );
    }

    const imageCount = validMedia.filter(item => item.type === 'image').length;
    const videoCount = validMedia.filter(item => item.type === 'video').length;

    return (
      <div>
        <Slider {...sliderSettings}>
          {validMedia.map((item, index) => (
            <div key={item.url || `media-${index}`} className={styles.mediaItem}>
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.alt || `Hình ảnh ${index + 1}`}
                  className={styles.mediaImage}
                  onError={(e) => {
                    console.warn(`Không tải được hình ảnh: ${item.url}`);
                    e.target.src = 'https://i.pravatar.cc/150?u=1';
                    e.target.alt = 'Hình ảnh không khả dụng';
                  }}
                />
              ) : (
                <video
                  src={item.url}
                  controls
                  className={styles.mediaVideo}
                  title={item.title || `Video ${index + 1}`}
                  onError={(e) => {
                    console.warn(`Không tải được video: ${item.url}`);
                  }}
                />
              )}
            </div>
          ))}
        </Slider>
        <br></br>
        <p className={styles.mediaCount}>
          {imageCount} hình ảnh, {videoCount} video
        </p>
      </div>
    );
  };

  const renderLocation = () => {
    if (!post?.location) return 'Thông tin vị trí không khả dụng';
    const { address, ward, district, province } = post.location;
    const locationParts = [address, ward, district, province].filter(Boolean);
    return locationParts.length > 0 ? locationParts.join(', ') : 'Chi tiết vị trí không khả dụng';
  };

  const formatPrice = (price) => {
    if (!price || typeof price !== 'number' || isNaN(price)) {
      return 'Liên hệ để biết giá';
    }
    if (price >= 1000000000) {
      return `${(price / 1000000000).toFixed(1)} tỷ VND`;
    } else if (price >= 1000000) {
      return `${(price / 1000000).toFixed(0)} triệu VND`;
    } else {
      return `${price.toLocaleString()} VND`;
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
                      <strong>Giá:</strong> {formatPrice(post.price)}
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
                      <strong>Loại bất động sản:</strong> {post.propertyType || 'N/A'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faTag} className={styles.icon} />
                      <strong>Trạng thái:</strong> {post.status || 'N/A'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faFileContract} className={styles.icon} />
                      <strong>Pháp lý:</strong> {post.legalDocuments || 'N/A'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faBed} className={styles.icon} />
                      <strong>Phòng ngủ:</strong> {post.furniture?.bedrooms || 'N/A'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faBath} className={styles.icon} />
                      <strong>Phòng tắm:</strong> {post.furniture?.bathrooms || 'N/A'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faUtensils} className={styles.icon} />
                      <strong>Nhà bếp:</strong> {post.furniture?.kitchen ? 'Có' : 'Không'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faSnowflake} className={styles.icon} />
                      <strong>Điều hòa:</strong> {post.furniture?.airConditioners || 'N/A'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faTshirt} className={styles.icon} />
                      <strong>  Máy giặt:</strong> {post.furniture?.washingMachine ? 'Có' : 'Không'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faSnowflake} className={styles.icon} />
                      <strong>  Tủ lạnh:</strong> {post.furniture?.refrigerator ? 'Có' : 'Không'}
                    </div>
                    <div className={styles.featureItem}>
                      <FontAwesomeIcon icon={faCouch} className={styles.icon} />
                      <strong>  Nội thất:</strong> {post.furniture?.otherFurniture || 'Không có'}
                    </div>
                  </div>
                </div>
                {post.utilities && (
                  <div className={styles.utilities}>
                    <h3 className={styles.utilitiesTitle}>Tiện ích</h3>
                    <div className={styles.utilitiesGrid}>
                      <div className={styles.utilityItem}>
                        <FontAwesomeIcon icon={faSwimmingPool} className={styles.icon} />
                        <strong>Hồ bơi:</strong> {post.utilities.pool ? 'Có' : 'Không'}
                      </div>
                      <div className={styles.utilityItem}>
                        <FontAwesomeIcon icon={faDumbbell} className={styles.icon} />
                        <strong>Phòng gym:</strong> {post.utilities.gym ? 'Có' : 'Không'}
                      </div>
                      <div className={styles.utilityItem}>
                        <FontAwesomeIcon icon={faCar} className={styles.icon} />
                        <strong>Bãi đỗ xe:</strong> {post.utilities.parking ? 'Có' : 'Không'}
                      </div>
                      <div className={styles.utilityItem}>
                        <FontAwesomeIcon icon={faShieldAlt} className={styles.icon} />
                        <strong>An ninh:</strong> {post.utilities.security ? 'Có' : 'Không'}
                      </div>
                      <div className={styles.utilityItem}>
                        <FontAwesomeIcon icon={faElevator} className={styles.icon} />
                        <strong>Thang máy:</strong> {post.utilities.elevator ? 'Có' : 'Không'}
                      </div>
                    </div>
                  </div>
                )}
                {post.location?.coordinates && (
                  <div className={styles.mapSection}>
                    <h3 className={styles.mapTitle}>Vị trí</h3>
                    <GoogleMapComponent
                      coordinates={post.location.coordinates}
                      address={renderLocation()}
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
            {post.contactInfo?.name && (
              <p className={styles.contactInfo}>
                <FontAwesomeIcon icon={faUser} className={styles.icon} />
                <strong>  Người liên hệ:</strong> {post.contactInfo.name}
              </p>
            )}
            {post.phone && (
              <p className={styles.contactInfo}>
                <FontAwesomeIcon icon={faPhone} className={styles.icon} />
                <strong>  Số điện thoại:</strong> {post.phone}
              </p>
            )}
            {post.contactInfo?.email && (
              <p className={styles.contactInfo}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                <strong>  Email:</strong> {post.contactInfo.email}
              </p>
            )}
            {post.contactInfo?.contactHours && (
              <p className={styles.contactInfo}>
                <FontAwesomeIcon icon={faClock} className={styles.icon} />
                <strong>  Giờ liên hệ:</strong> {post.contactInfo.contactHours}
              </p>
            )}
            <div className={styles.contactButtons}>
              {post.phone && (
                <>
                  <a href={`tel:${post.phone}`} className={styles.contactButton}>
                  <FontAwesomeIcon icon={faPhone} className={styles.icon} />
                      Gọi điện
                  </a>
                  <a
                    href={`https://zalo.me/${post.phone}`}
                    className={styles.ZalocontactButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Liên hệ qua Zalo
                  </a>
                </>
              )}
            </div>
            {post.viewingSchedule?.length > 0 && (
              <div className={styles.viewingSchedule}>
                <h4>
                  <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} />    Lịch xem nhà
                </h4>
                <ul className={styles.scheduleList}>
                  {post.viewingSchedule
                    .filter(slot => slot.available)
                    .map((slot, index) => (
                      <li key={index} className={styles.scheduleItem}>
                        {new Date(slot.date).toLocaleDateString('vi-VN')} - {slot.time}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </aside>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default PostPage;
