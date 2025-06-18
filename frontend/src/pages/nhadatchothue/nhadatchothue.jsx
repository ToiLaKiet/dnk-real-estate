import React, { useEffect, useState, useMemo, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/ui/parts/header';
import Footer from '../../components/ui/parts/footer';
import { FaSearch, FaBed, FaBath, FaPhone, FaHeart } from 'react-icons/fa';
import '../../styles/NhaDatBan.css';
import { AuthContext } from '../../components/ui/context/AuthContext';
import Login from '../../pages/login/Dangnhap1';
import Modal from '../../components/ui/modal-reg-log.jsx';
import { API_URL } from '../../config.js';

const NhaDatChoThue = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    text: '',
    propertyType: '',
    province: '',
    area: '',
    price: '',
    ward: [],
  });

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState({});
  const [lengthOfdata, setLengthOfdata] = useState(0);
  const [userNames, setUserNames] = useState({});
  const postsPerPage = 8;
  const [wardIds, setWardIds] = useState([]);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
  const [isLoadingWards, setIsLoadingWards] = useState(false);

  const [dropdownOptions, setDropdownOptions] = useState({
    propertyTypes: [
      { value: '', label: 'Tất cả loại nhà đất' },
      { value: 'shophouse', label: 'Shophouse' },
      { value: 'apartment', label: 'Căn hộ' },
      { value: 'land', label: 'Đất nền' },
      { value: 'villa', label: 'Villa' },
      { value: 'townhouse', label: 'Nhà phố' }
    ],
    provinces: [
      { value: '', label: 'Tất cả khu vực' },
    ],
    areas: [
      { value: '', label: 'Tất cả diện tích' },
      { value: '0-50', label: 'Dưới 50m²' },
      { value: '50-100', label: '50 - 100m²' },
      { value: '100-200', label: '100 - 200m²' },
      { value: '200-500', label: '200 - 500m²' },
      { value: '500+', label: 'Trên 500m²' }
    ],
    prices: [
      { value: '', label: 'Tất cả mức giá' },
      { value: '0-5', label: 'Dưới 1 triệu / tháng' },
      { value: '1-3', label: '1 - 3 triệu / tháng' },
      { value: '3-5', label: '3 - 5 triệu / tháng' },
      { value: '5-10', label: '5 - 10 triệu / tháng' },
      { value: '10+', label: 'Trên 10 triệu / tháng' }
    ]
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (user?.user_id) {
      axios.get(`${API_URL}/favorites`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          const favoriteMap = {};
          response.data.forEach((fav) => {
            favoriteMap[fav.property_id] = true;
          });
          setFavorites(favoriteMap);
        })
        .catch((error) => {
          console.error('Error fetching favorites:', error);
        });
    }
  }, [user]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const text = query.get('text') || '';
    const propertyType = query.get('propertyType') || '';
    const province = query.get('province') || '';
    const area = query.get('area') || '';
    const price = query.get('price') || '';

    setSearchFilters({
      text,
      propertyType,
      province,
      area,
      price
    });
    setCurrentPage(1);
  }, [location.search]);

  useEffect(() => {
    const fetchProvinces = async () => {
      setIsLoadingProvinces(true);
      try {
        const response = await axios.get(`${API_URL}/locations/?type=province`);
        setDropdownOptions(prev => ({
          ...prev,
          provinces: [
            { value: '', label: 'Tất cả khu vực' },
            ...response.data.map(province => ({
              value: province.location_id,
              label: province.name
            }))
          ]
        }));
      } catch (error) {
        console.error('Error fetching provinces:', error);
      } finally {
        setIsLoadingProvinces(false);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchWardIds = async () => {
      if (!searchFilters.province) {
        setWardIds([]);
        setSearchFilters(prev => ({ ...prev, ward: [] }));
        return;
      }

      setIsLoadingWards(true);
      try {
        const wardPromises = await axios.get(`${API_URL}/locations/wards-by-province/${searchFilters.province}`);
        setWardIds(wardPromises.data);
        setSearchFilters(prev => ({ ...prev, ward: wardPromises.data }));
      } catch (error) {
        console.error('Error fetching wards:', error);
        setWardIds([]);
        setSearchFilters(prev => ({ ...prev, ward: [] }));
      } finally {
        setIsLoadingWards(false);
      }
    };
    fetchWardIds();
  }, [searchFilters.province]);

  const fetchUserName = async (userId) => {
    if (userNames[userId]) return;
    
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`);
      const userData = await response.data;
      setUserNames(prev => ({
        ...prev,
        [userId]: userData.full_name || userId
      }));
    } catch (error) {
      console.error('Error fetching user:', error);
      setUserNames(prev => ({
        ...prev,
        [userId]: 'Unknown User'
      }));
    }
  };

  useEffect(() => {
    if (posts && posts.length > 0) {
      posts.forEach(post => {
        if (post.user_id && !userNames[post.user_id]) {
          fetchUserName(post.user_id);
        }
      });
    }
  }, [posts]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/properties`);
        const availablePosts = response.data.filter(post => post.status === 'available');
        setPosts(availablePosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const { displayPosts, totalPages } = useMemo(() => {
    let filtered = posts.filter(post => post.property_type === 'rent');

    if (searchFilters.text.trim()) {
      filtered = filtered.filter(post =>
        (post.title.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes((searchFilters.text.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "")) ||
        (post.description.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes((searchFilters.text.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
      );
    }

    if (searchFilters.propertyType) {
      filtered = filtered.filter(post => post.category === searchFilters.propertyType); // đổi property_type thành 
    }

    if (searchFilters.province && searchFilters.ward.length > 0) {
      filtered = filtered.filter(post => 
        post.location_id != null && 
        (searchFilters.ward).includes(String(post.location_id))
      ); 
    }

    if (searchFilters.area) {
      filtered = filtered.filter(post => {
        const postArea = parseFloat(post.area);
        switch (searchFilters.area) {
          case '0-50': return postArea < 50;
          case '50-100': return postArea >= 50 && postArea <= 100;
          case '100-200': return postArea >= 100 && postArea <= 200;
          case '200-500': return postArea >= 200 && postArea <= 500;
          case '500+': return postArea > 500;
          default: return true;
        }
      });
    }

    if (searchFilters.price) {
      filtered = filtered.filter(post => {
        const postPrice = parseFloat(post.price);
        switch (searchFilters.price) {
          case '0-1': return postPrice < 1;
          case '1-3': return postPrice >= 1 && postPrice <= 3;
          case '3-5': return postPrice >= 3 && postPrice <= 5;
          case '5-10': return postPrice >= 5 && postPrice <= 10;
          case '10+': return postPrice > 10;
          default: return true;
        }
      });
    }

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginated = filtered.slice(startIndex, endIndex);
    const total = Math.ceil(filtered.length / postsPerPage);

    return {
      displayPosts: paginated,
      totalPages: total
    };
  }, [posts, searchFilters, currentPage]);

  const handleFilterChange = (field, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handlePostClick = (propertyId) => {
    navigate(`/postspage/${propertyId}`);
  };

  const handleFavoriteClick = async (propertyId) => {
    if (!user?.user_id) {
      alert('Vui lòng đăng nhập để thêm vào yêu thích!');
      setShowLoginModal(true);
      return;
    }

    const isCurrentlyFavorited = favorites[propertyId];

    setFavorites((prev) => ({
      ...prev,
      [propertyId]: !isCurrentlyFavorited
    }));

    try {
      if (isCurrentlyFavorited) {
        await axios.delete(`${API_URL}/favorites/${propertyId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(`Removed property ${propertyId} from favorites`);
      } else {
        await axios.post(`${API_URL}/favorites`, {
          property_id: propertyId,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(`Added property ${propertyId} to favorites`);
      }
    } catch (error) {
      console.error('Error updating favorite:', error);
      setFavorites((prev) => ({
        ...prev,
        [propertyId]: isCurrentlyFavorited
      }));
    }
  };

  const truncateDescription = (text, maxWords) => {
    if (!text) return '';
    const words = text.split(/\s+/);
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  const getGridImages = (images) => {
    if (!images || images.length === 0) {
      return [{ url: 'https://via.placeholder.com/600x400', isPlaceholder: true }];
    }
    const primary = images.find(img => img.is_primary);
    const others = images.filter(img => !img.is_primary);
    const selected = primary ? [primary, ...others.slice(0, 3)] : images.slice(0, 4);
    return selected;
  };

  useEffect(() => {
    setLengthOfdata(displayPosts.length);
  }, [displayPosts]);

  return (
    <div className="page-container">
      <Header />
      <div className="ndb-content">
        <div className="nhadatban-search-engine-container">
          <div className="nhadatban-search-engine">
            <div className="ndb-search-bar">
              <div className="ndb-input-wrapper">
                <FaSearch className="search-logo" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài đăng..."
                  className="ndb-search-input"
                  value={searchFilters.text}
                  onChange={(e) => handleFilterChange('text', e.target.value)}
                />
              </div>
            </div>
            <div className="ndb-filter-dropdowns">
              <select
                value={searchFilters.province}
                onChange={(e) => handleFilterChange('province', e.target.value)}
                className="ndb-filter-dropdown"
              >
                {dropdownOptions.provinces.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                value={searchFilters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                className="ndb-filter-dropdown"
              >
                {dropdownOptions.propertyTypes.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                value={searchFilters.price}
                onChange={(e) => handleFilterChange('price', e.target.value)}
                className="ndb-filter-dropdown"
              >
                {dropdownOptions.prices.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                value={searchFilters.area}
                onChange={(e) => handleFilterChange('area', e.target.value)}
                className="ndb-filter-dropdown"
              >
                {dropdownOptions.areas.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="ndb-title-box">
          <h1 className="ndb-title">Trang tổng hợp các bất động sản đang được cho thuê</h1>
          <h2 className="ndb-des">Trên hệ thống đang có {lengthOfdata} bất động sản dạng này.</h2>
        </div>
        <div className="posts-list">
          {displayPosts.length > 0 ? (
            displayPosts.map((post) => (
              <div
                key={post.property_id}
                className="post-item"
                onClick={() => handlePostClick(post.property_id)}
              >
                <div className="post-media">
                  <div className="media-grid">
                    {getGridImages(post.images).map((img, index) => (
                      <img
                        key={index}
                        src={img.image_url}
                        alt={post.title}
                        className="grid-image"
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
                <div className="post-info">
                  <h3>{post.title}</h3>
                  <div className="post-details-row">
                    <div className="post-details">
                      <span>Giá: {(post.price).toLocaleString()} triệu/tháng </span>
                      <span>Diện tích: {post.area}m²</span>
                    </div>
                    <div className="post-features">
                      <span>
                        <FaBed className="icon" /> Phòng ngủ: {post.features?.find(f => f.feature_name === 'bedrooms')?.feature_value || 0}
                      </span>
                      <span>
                        <FaBath className="icon" /> Phòng tắm: {post.features?.find(f => f.feature_name === 'bathrooms')?.feature_value || 0}
                      </span>
                    </div>
                  </div>
                  <p className="post-description">{truncateDescription(post.description, 100)}</p>
                </div>
                <hr style={{ border: '1px solid gray' }} />
                <div className="card-bottom">
                  {post.user_id && <span className="user-info">Đăng bởi: {userNames[post.user_id]}</span>}
                  <div className='card-bottom-group'>
                    <a href={`tel:${post.contact.phone}`} className="phone-button">
                      <FaPhone className="phone-calling-icon" /> Gọi {post.contact.phone}
                    </a>
                    <FaHeart
                      className={`favorite-icon ${favorites[post.property_id] ? 'favorited' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFavoriteClick(post.property_id);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-posts">Không tìm thấy bài đăng phù hợp</div>
          )}
        </div>
        {totalPages > 1 && (
          <div className="pagination">
            {currentPage > 1 && (
              <button onClick={() => goToPage(currentPage - 1)}>
                &lt; Trước
              </button>
            )}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={currentPage === pageNum ? 'active' : ''}
                >
                  {pageNum}
                </button>
              );
            })}
            {currentPage < totalPages && (
              <button onClick={() => goToPage(currentPage + 1)}>
                Sau &gt;
              </button>
            )}
          </div>
        )}
      </div>
      <Footer />
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <Login />
      </Modal>
    </div>
  );
};

export default NhaDatChoThue;
