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

// Mock data
const mockPosts = [
  {
    property_id: 21,
    type: 'nhadatchothue',
    address: {
      province: 'Hà Nội',
      district: 'Đống Đa',
      ward: 'Láng Hạ',
      street: 'Láng',
      displayAddress: 'Láng, Láng Hạ, Đống Đa, Hà Nội',
      coordinates: { lat: 21.015, lng: 105.816 }
    },
    property_type: 'apartment',
    title: 'Căn hộ cho thuê Đống Đa',
    description: 'Căn hộ 2 phòng ngủ, nội thất đầy đủ.',
    price: 15,
    area: 80,
    status: 'available',
    created_at: '2025-01-20T10:00:00Z',
    updated_at: '2025-01-20T10:00:00Z',
    contact: {
      name: 'Nguyễn Văn T',
      email: 'nguyenvant@example.com',
      phone: '0911234567'
    },
    features: {
      bedrooms: '2',
      bathrooms: '2',
      furniture: 'Full nội thất',
      legalDocuments: 'Hợp đồng thuê'
    },
    media: {
      images: [
        { url: "https://via.placeholder.com/600x400?text=Rent1", caption: 'Ảnh chính', is_primary: true },
        { url: "https://via.placeholder.com/600x400?text=Rent1-2", caption: null, is_primary: false }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 22,
    type: 'nhadatchothue',
    address: {
      province: 'TP.HCM',
      district: 'Quận 3',
      ward: 'Phường 7',
      street: 'Nguyễn Đình Chiểu',
      complex: '',
      displayAddress: 'Nguyễn Đình Chiểu, Phường 7, Quận 3, TP.HCM',
      coordinates: { lat: 10.775, lng: 106.689 }
    },
    property_type: 'house',
    title: 'Nhà riêng cho thuê Quận 3',
    description: 'Nhà 3 tầng, phù hợp gia đình.',
    price: 25,
    area: 100,
    status: 'available',
    created_at: '2025-02-20T10:00:00Z',
    updated_at: '2025-02-20T10:00:00Z',
    contact: {
      name: 'Trần Thị U',
      email: 'tranthiu@example.com',
      phone: '0912345678'
    },
    features: {
      bedrooms: '3',
      bathrooms: '2',
      furniture: 'Không nội thất'
    },
    media: {
      images: [
        { url: "https://via.placeholder.com/600x400?text=Rent2", caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 23,
    type: 'nhadatchothue',
    address: {
      province: 'Đà Nẵng',
      district: 'Sơn Trà',
      ward: 'An Hải Bắc',
      street: 'Võ Văn Kiệt',
      complex: '',
      displayAddress: 'Võ Văn Kiệt, An Hải Bắc, Sơn Trà, Đà Nẵng',
      coordinates: { lat: 16.071, lng: 108.234 }
    },
    property_type: 'apartment',
    title: 'Căn hộ cho thuê ven biển Đà Nẵng',
    description: 'Căn hộ view biển, nội thất cao cấp.',
    price: 20,
    area: 90,
    status: 'available',
    created_at: '2025-03-20T10:00:00Z',
    updated_at: '2025-03-20T10:00:00Z',
    contact: {
      name: 'Lê Văn V',
      email: 'levanv@example.com',
      phone: '0913456789'
    },
    features: {
      bedrooms: '2',
      bathrooms: '2',
      furniture: 'Full nội thất'
    },
    media: {
      images: [
        { url: "https://via.placeholder.com/600x400?text=Rent3", caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 24,
    type: 'nhadatchothue',
    address: {
      province: 'Hải Phòng',
      district: 'Lê Chân',
      ward: 'Kênh Dương',
      street: 'Võ Nguyên Giáp',
      complex: '',
      displayAddress: 'Võ Nguyên Giáp, Kênh Dương, Lê Chân, Hải Phòng',
      coordinates: { lat: 20.847, lng: 106.672 }
    },
    property_type: 'villa',
    title: 'Biệt thự cho thuê Hải Phòng',
    description: 'Biệt thự 3 phòng ngủ, sân vườn.',
    price: 50,
    area: 200,
    status: 'available',
    created_at: '2025-04-20T10:00:00Z',
    updated_at: '2025-04-20T10:00:00Z',
    contact: {
      name: 'Phạm Thị W',
      email: 'phamthiw@example.com',
      phone: '0914567890'
    },
    features: {
      bedrooms: '3',
      bathrooms: '3',
      furniture: 'Full nội thất'
    },
    media: {
      images: [
        { url: "https://via.placeholder.com/600x400?text=Rent4", caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 25,
    type: 'nhadatchothue',
    address: {
      province: 'Cần Thơ',
      district: 'Ninh Kiều',
      ward: 'Cái Khế',
      street: 'Nguyễn Trãi',
      complex: '',
      displayAddress: 'Nguyễn Trãi, Cái Khế, Ninh Kiều, Cần Thơ',
      coordinates: { lat: 10.038, lng: 105.781 }
    },
    property_type: 'townhouse',
    title: 'Nhà phố cho thuê Cần Thơ',
    description: 'Nhà phố 3 tầng, gần trung tâm.',
    price: 18,
    area: 120,
    status: 'available',
    created_at: '2025-05-20T10:00:00Z',
    updated_at: '2025-05-20T10:00:00Z',
    contact: {
      name: 'Hoàng Văn X',
      email: 'hoangvanx@example.com',
      phone: '0915678901'
    },
    features: {
      bedrooms: '3',
      bathrooms: '2',
      furniture: 'Không nội thất'
    },
    media: {
      images: [
        { url: "https://via.placeholder.com/600x400?text=Rent5", caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 26,
    type: 'nhadatchothue',
    address: {
      province: 'Hà Nội',
      district: 'Hai Bà Trưng',
      ward: 'Bạch Đằng',
      street: 'Trần Hưng Đạo',
      complex: '',
      displayAddress: 'Trần Hưng Đạo, Bạch Đằng, Hai Bà Trưng, Hà Nội',
      coordinates: { lat: 21.021, lng: 105.853 }
    },
    property_type: 'apartment',
    title: 'Căn hộ cao cấp Hai Bà Trưng',
    description: 'Căn hộ 3 phòng ngủ, gần trung tâm.',
    price: 22,
    area: 100,
    status: 'available',
    created_at: '2025-06-20T10:00:00Z',
    updated_at: '2025-06-20T10:00:00Z',
    contact: {
      name: 'Nguyễn Thị Y',
      email: 'nguyenthiy@example.com',
      phone: '0916789012'
    },
    features: {
      bedrooms: '3',
      bathrooms: '2',
      furniture: 'Full nội thất'
    },
    media: {
      images: [
        { url: "https://via.placeholder.com/600x400?text=Rent6", caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 27,
    type: 'nhadatchothue',
    address: {
      province: 'TP.HCM',
      district: 'Bình Thạnh',
      ward: 'Phường 25',
      street: 'Điện Biên Phủ',
      complex: '',
      displayAddress: 'Điện Biên Phủ, Phường 25, Bình Thạnh, TP.HCM',
      coordinates: { lat: 10.799, lng: 106.715 }
    },
    property_type: 'villa',
    title: 'Biệt thự cho thuê Bình Thạnh',
    description: 'Biệt thự 4 phòng ngủ, hồ bơi riêng.',
    price: 60,
    area: 300,
    status: 'available',
    created_at: '2025-07-20T10:00:00Z',
    updated_at: '2025-07-20T10:00:00Z',
    contact: {
      name: 'Trần Văn Z',
      email: 'tranvanz@example.com',
      phone: '0917890123'
    },
    features: {
      bedrooms: '4',
      bathrooms: '4',
      furniture: 'Full nội thất'
    },
    media: {
      images: [
        { url: "https://via.placeholder.com/600x400?text=Rent7", caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 28,
    type: 'nhadatchothue',
    address: {
      province: 'Đà Nẵng',
      district: 'Hải Châu',
      ward: 'Hòa Thuận Đông',
      street: 'Nguyễn Văn Linh',
      complex: '',
      displayAddress: 'Nguyễn Văn Linh, Hòa Thuận Đông, Hải Châu, Đà Nẵng',
      coordinates: { lat: 16.059, lng: 108.209 }
    },
    property_type: 'house',
    title: 'Nhà riêng cho thuê Hải Châu',
    description: 'Nhà 2 tầng, gần trung tâm.',
    price: 12,
    area: 70,
    status: 'available',
    created_at: '2025-08-20T10:00:00Z',
    updated_at: '2025-08-20T10:00:00Z',
    contact: {
      name: 'Lê Thị AA',
      email: 'lethiaa@example.com',
      phone: '0918901234'
    },
    features: {
      bedrooms: '2',
      bathrooms: '1',
      furniture: 'Không nội thất'
    },
    media: {
      images: [
        { url: "https://via.placeholder.com/600x400?text=Rent8", caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 29,
    type: 'nhadatchothue',
    address: {
      province: 'Hải Phòng',
      district: 'Ngô Quyền',
      ward: 'Máy Chai',
      street: 'Nguyễn Tri Phương',
      complex: '',
      displayAddress: 'Nguyễn Tri Phương, Máy Chai, Ngô Quyền, Hải Phòng',
      coordinates: { lat: 20.860, lng: 106.688 }
    },
    property_type: 'townhouse',
    title: 'Nhà phố cho thuê Ngô Quyền',
    description: 'Nhà phố 3 tầng, phù hợp kinh doanh.',
    price: 30,
    area: 150,
    status: 'available',
    created_at: '2025-09-20T10:00:00Z',
    updated_at: '2025-09-20T10:00:00Z',
    contact: {
      name: 'Phạm Văn BB',
      email: 'phamvanbb@example.com',
      phone: '0919012345'
    },
    features: {
      bedrooms: '3',
      bathrooms: '2',
      furniture: 'Không nội thất'
    },
    media: {
      images: [
        { url: "https://via.placeholder.com/600x400?text=Rent9", caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 30,
    type: 'nhadatchothue',
    address: {
      province: 'Cần Thơ',
      district: 'Bình Thủy',
      ward: 'Bùi Hữu Nghĩa',
      street: 'Bùi Hữu Nghĩa',
      complex: '',
      displayAddress: 'Bùi Hữu Nghĩa, Bùi Hữu Nghĩa, Bình Thủy, Cần Thơ',
      coordinates: { lat: 10.069, lng: 105.755 }
    },
    property_type: 'apartment',
    title: 'Căn hộ cho thuê Bình Thủy',
    description: 'Căn hộ 1 phòng ngủ, giá rẻ.',
    price: 8,
    area: 50,
    status: 'available',
    created_at: '2025-10-20T10:00:00Z',
    updated_at: '2025-10-20T10:00:00Z',
    contact: {
      name: 'Hoàng Thị CC',
      email: 'hoangthicc@example.com',
      phone: '0910123456'
    },
    features: {
      bedrooms: '1',
      bathrooms: '1',
      furniture: 'Full nội thất'
    },
    media: {
      images: [
        { url: "https://via.placeholder.com/600x400?text=Rent10", caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  }
];

// Dropdown options
const dropdownOptions = {
  propertyTypes: [
    { value: '', label: 'Tất cả loại nhà đất' },
    { value: 'apartment', label: 'Chung cư' },
    { value: 'house', label: 'Nhà riêng' },
    { value: 'villa', label: 'Villa' },
    { value: 'townhouse', label: 'Nhà phố' }
  ],
  provinces: [
    { value: '', label: 'Tất cả khu vực' },
    { value: 'Hà Nội', label: 'Hà Nội' },
    { value: 'TP.HCM', label: 'TP. Hồ Chí Minh' },
    { value: 'Đà Nẵng', label: 'Đà Nẵng' },
    { value: 'Hải Phòng', label: 'Hải Phòng' },
    { value: 'Cần Thơ', label: 'Cần Thơ' }
  ],
  areas: [
    { value: '', label: 'Tất cả diện tích' },
    { value: '0-30', label: 'Dưới 30m²' },
    { value: '30-50', label: '30 - 50m²' },
    { value: '50-100', label: '50 - 100m²' },
    { value: '100-200', label: '100 - 200m²' },
    { value: '200+', label: 'Trên 200m²' }
  ],
  prices: [
    { value: '', label: 'Tất cả mức giá' },
    { value: '0-5', label: 'Dưới 5 triệu/tháng' },
    { value: '5-10', label: '5 - 10 triệu/tháng' },
    { value: '10-20', label: '10 - 20 triệu/tháng' },
    { value: '20-50', label: '20 - 50 triệu/tháng' },
    { value: '50+', label: 'Trên 50 triệu/tháng' }
  ]
};

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
    price: ''
  });

  const [posts, setPosts] = useState(mockPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState({});
  const [lengthOfdata, setLengthOfdata] = useState(0);
  const postsPerPage = 8;

  // Fetch initial favorites
  useEffect(() => {
    if (user?.user_id) {
      axios.get(`/favorites?user_id=${user.user_id}`)
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

  // Lấy query parameters từ URL
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

  // Xử lý filter và phân trang
  const { displayPosts, totalPages } = useMemo(() => {
    let filtered = posts.filter(post => post.type === 'nhadatchothue');

    if (searchFilters.text.trim()) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchFilters.text.toLowerCase()) ||
        post.description.toLowerCase().includes(searchFilters.text.toLowerCase())
      );
    }

    if (searchFilters.propertyType) {
      filtered = filtered.filter(post => post.property_type === searchFilters.propertyType);
    }

    if (searchFilters.province) {
      filtered = filtered.filter(post => post.address.province === searchFilters.province);
    }

    if (searchFilters.area) {
      filtered = filtered.filter(post => {
        const postArea = parseFloat(post.area);
        switch (searchFilters.area) {
          case '0-30': return postArea < 30;
          case '30-50': return postArea >= 30 && postArea <= 50;
          case '50-100': return postArea >= 50 && postArea <= 100;
          case '100-200': return postArea >= 100 && postArea <= 200;
          case '200+': return postArea > 200;
          default: return true;
        }
      });
    }

    if (searchFilters.price) {
      filtered = filtered.filter(post => {
        const postPrice = parseFloat(post.price);
        switch (searchFilters.price) {
          case '0-5': return postPrice < 5;
          case '5-10': return postPrice >= 5 && postPrice <= 10;
          case '10-20': return postPrice >= 10 && postPrice <= 20;
          case '20-50': return postPrice >= 20 && postPrice <= 50;
          case '50+': return postPrice > 50;
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

  // Handle filter change
  const handleFilterChange = (field, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1);
  };

  // Handle page change
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Handle post click
  const handlePostClick = (propertyId) => {
    navigate(`/postspage/${propertyId}`);
  };

  // Handle favorite toggle
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

    // Update favorite status in the backend
    try {
      if (isCurrentlyFavorited) {
        await axios.delete('/favorites', {
          // Assuming your API supports DELETE for removing favorites
          data: { user_id: user.user_id, property_id: propertyId }
        });
      } else {
        // Assuming your API supports POST for adding favorites
        await axios.post('/favorites', {
          property_id: propertyId,
          user_id: user.user_id,
          created: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error updating favorite:', error);
      setFavorites((prev) => ({
        ...prev,
        [propertyId]: isCurrentlyFavorited
      }));
    }
  };

  // Truncate description
  const truncateDescription = (text, maxWords) => {
    if (!text) return '';
    const words = text.split(/\s+/);
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  // Get collage images
  const getCollageImages = (images) => {
    if (!images || images.length === 0) {
      return [{ url: 'https://via.placeholder.com/600x400', isPlaceholder: true }];
    }
    const primary = images.find(img => img.is_primary);
    const others = images.filter(img => !img.is_primary);
    const selected = primary ? [primary, ...others.slice(0, 4)] : images.slice(0, 5);
    return selected;
  };

  // Set length of data
  useEffect(() => {
    setLengthOfdata(displayPosts.length);
  }, [displayPosts]);

  return (
    <div className="page-container">
      <Header />
      <div className="ndb-content">
        {/* <div className="ndb-title-box">
          <h1 className="ndb-title">TRANG TỔNG HỢP CÁC BẤT ĐỘNG SẢN CHO THUÊ</h1>
          <h2 className="ndb-des">Trên hệ thống đang có {lengthOfdata} bất động sản cho thuê.</h2>
        </div> */}
        <div className="nhadatban-search-engine-container">
          <div className="nhadatban-search-engine">
            <div className="search-bar">
              <div className="input-wrapper">
                <FaSearch className="search-logo" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài đăng cho thuê..."
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
        {/* Danh sách bài đăng */}
        <div className="posts-list">
          {displayPosts.length > 0 ? (
            displayPosts.map((post) => (
              <div
                key={post.property_id}
                className="post-item"
                onClick={() => handlePostClick(post.property_id)}
              >
                <div className="post-media">
                  <div className={`media-collage media-collage-${getCollageImages(post.media.images).length}`}>
                    {getCollageImages(post.media.images).map((img, index) => (
                      <img
                        key={index}
                        src={img.url}
                        alt={post.title}
                        className={`collage-image collage-image-${index}`}
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
                <div className="post-info">
                  <h3>{post.title}</h3>
                  <div className="post-details-row">
                    <div className="post-details">
                      <span>Giá: {post.price} triệu/tháng</span>
                      <span>Diện tích: {post.area}m²</span>
                    </div>
                    <div className="post-features">
                      <span>
                        <FaBed className="icon" /> Phòng ngủ: {post.features.bedrooms || 0}
                      </span>
                      <span>
                        <FaBath className="icon" /> Phòng tắm: {post.features.bathrooms || 0}
                      </span>
                    </div>
                  </div>
                  <p className="post-description">{truncateDescription(post.description, 100)}</p>
                </div>
                <hr style={{ border: '1px solid gray' }} />

                <div className="card-bottom">
                  {post.user_id && <span className="user-info">Đăng bởi: {post.user_id}</span>}
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
            ))
          ) : (
            <div className="no-posts">Không tìm thấy bài đăng phù hợp</div>
          )}
        </div>

        {/* Phân trang */}
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
