import React, { useEffect, useState, useMemo, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/ui/parts/header';
import Footer from '../../components/ui/parts/footer';
import { FaSearch, FaBed, FaBath, FaPhone, FaHeart } from 'react-icons/fa';
import '../../styles/NhaDatBan.css';
import { AuthContext } from '../../components/ui/context/AuthContext'; // Assumed context
import Login from '../../pages/login/Dangnhap1';
import Modal from '../../components/ui/modal-reg-log.jsx';

// Mock data
const mockPosts = [
  {
    property_id: 11,
    type: 'nhadatban',
    address: {
      province: 'Hà Nội',
      district: 'Hoàn Kiếm',
      ward: 'Hàng Bông',
      street: 'Hàng Gai',
      complex: '',
      displayAddress: 'Hàng Gai, Hàng Bông, Hoàn Kiếm, Hà Nội',
      coordinates: { lat: 21.031, lng: 105.850 }
    },
    property_type: 'shophouse',
    title: 'Shophouse cao cấp Hoàn Kiếm',
    description: 'Căn hộ 3 phòng ngủ, view hồ Hoàn Kiếm.',
    price: 3.5,
    area: 120,
    status: 'available',
    created_at: '2025-01-15T10:00:00Z',
    updated_at: '2025-01-15T10:00:00Z',
    contact: {
      name: 'Nguyễn Văn L',
      email: 'nguyenvanl@example.com',
      phone: '0911234567'
    },
    features: {
      bedrooms: '3',
      bathrooms: '2',
      furniture: 'Full nội thất',
      legalDocuments: 'Sổ đỏ',
      houseDirection: 'Đông Nam',
      balconyDirection: 'Tây Bắc'
    },
    media: {
      images: [
        { url: 'https://via.placeholder.com/600x400?text=Post1', caption: 'Ảnh chính', is_primary: true },
        { url: 'https://via.placeholder.com/600x400?text=Post1-2', caption: null, is_primary: false }
      ],
      videoUrl: 'https://example.com/video/post1.mp4'
    }
  },
  {
    property_id: 12,
    type: 'nhadatban',
    address: {
      province: 'TP.HCM',
      district: 'Quận 1',
      ward: 'Bến Nghé',
      street: 'Nguyễn Huệ',
      complex: '',
      displayAddress: 'Nguyễn Huệ, Bến Nghé, Quận 1, TP.HCM',
      coordinates: { lat: 10.774, lng: 106.703 }
    },
    property_type: 'house',
    title: 'Nhà riêng trung tâm Quận 1',
    description: 'Nhà 4 tầng, phù hợp ở hoặc kinh doanh.',
    price: 8.0,
    area: 80,
    status: 'available',
    created_at: '2025-02-15T10:00:00Z',
    updated_at: '2025-02-15T10:00:00Z',
    contact: {
      name: 'Trần Thị M',
      email: 'tranthim@example.com',
      phone: '0912345678'
    },
    features: {
      bedrooms: '4',
      bathrooms: '3',
      furniture: 'Không nội thất',
      legalDocuments: 'Sổ hồng'
    },
    media: {
      images: [
        { url: 'https://via.placeholder.com/600x400?text=Post2', caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 13,
    type: 'nhadatban',
    address: {
      province: 'Đà Nẵng',
      district: 'Ngũ Hành Sơn',
      ward: 'Mỹ An',
      street: 'Nguyễn Văn Thoại',
      complex: '',
      displayAddress: 'Nguyễn Văn Thoại, Mỹ An, Ngũ Hành Sơn, Đà Nẵng',
      coordinates: { lat: 16.054, lng: 108.247 }
    },
    property_type: 'land',
    title: 'Đất nền ven biển Đà Nẵng',
    description: 'Đất nền gần biển, phù hợp xây khách sạn.',
    price: 6.0,
    area: 200,
    status: 'available',
    created_at: '2025-03-15T10:00:00Z',
    updated_at: '2025-03-15T10:00:00Z',
    contact: {
      name: 'Lê Văn N',
      email: 'levann@example.com',
      phone: '0913456789'
    },
    features: {
      legalDocuments: 'Sổ đỏ'
    },
    media: {
      images: [
        { url: 'https://via.placeholder.com/600x400?text=Post3', caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 14,
    type: 'nhadatban',
    address: {
      province: 'Hải Phòng',
      district: 'Ngô Quyền',
      ward: 'Máy Tơ',
      street: 'Lạch Tray',
      complex: '',
      displayAddress: 'Lạch Tray, Máy Tơ, Ngô Quyền, Hải Phòng',
      coordinates: { lat: 20.853, lng: 106.686 }
    },
    property_type: 'villa',
    title: 'Biệt thự cao cấp Hải Phòng',
    description: 'Biệt thự 3 tầng, sân vườn rộng.',
    price: 10.0,
    area: 300,
    status: 'available',
    created_at: '2025-04-15T10:00:00Z',
    updated_at: '2025-04-15T10:00:00Z',
    contact: {
      name: 'Phạm Thị O',
      email: 'phamthio@example.com',
      phone: '0914567890'
    },
    features: {
      bedrooms: '5',
      bathrooms: '4',
      furniture: 'Full nội thất'
    },
    media: {
      images: [
        { url: 'https://via.placeholder.com/600x400?text=Post4', caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 15,
    type: 'nhadatban',
    address: {
      province: 'Cần Thơ',
      district: 'Cái Răng',
      ward: 'Hưng Phú',
      street: 'Võ Nguyên Giáp',
      complex: '',
      displayAddress: 'Võ Nguyên Giáp, Hưng Phú, Cái Răng, Cần Thơ',
      coordinates: { lat: 10.013, lng: 105.760 }
    },
    property_type: 'townhouse',
    title: 'Nhà phố hiện đại Cần Thơ',
    description: 'Nhà phố 3 tầng, gần trung tâm.',
    price: 4.5,
    area: 100,
    status: 'available',
    created_at: '2025-05-15T10:00:00Z',
    updated_at: '2025-05-15T10:00:00Z',
    contact: {
      name: 'Hoàng Văn P',
      email: 'hoangvanp@example.com',
      phone: '0915678901'
    },
    features: {
      bedrooms: '3',
      bathrooms: '2',
      furniture: 'Không nội thất'
    },
    media: {
      images: [
        { url: 'https://via.placeholder.com/600x400?text=Post5', caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 16,
    type: 'nhadatban',
    address: {
      province: 'Hà Nội',
      district: 'Thanh Xuân',
      ward: 'Nhân Chính',
      street: 'Nguyễn Tuân',
      complex: '',
      displayAddress: 'Nguyễn Tuân, Nhân Chính, Thanh Xuân, Hà Nội',
      coordinates: { lat: 21.002, lng: 105.804 }
    },
    property_type: 'apartment',
    title: 'Căn hộ Thanh Xuân giá tốt',
    description: 'Căn hộ 2 phòng ngủ, gần Royal City.',
    price: 2.8,
    area: 90,
    status: 'available',
    created_at: '2025-06-15T10:00:00Z',
    updated_at: '2025-06-15T10:00:00Z',
    contact: {
      name: 'Nguyễn Thị Q',
      email: 'nguyenthiq@example.com',
      phone: '0916789012'
    },
    features: {
      bedrooms: '2',
      bathrooms: '2',
      furniture: 'Full nội thất'
    },
    media: {
      images: [
        { url: 'https://via.placeholder.com/600x400?text=Post6', caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 17,
    type: 'nhadatban',
    address: {
      province: 'TP.HCM',
      district: 'Quận 2',
      ward: 'Thảo Điền',
      street: 'Nguyễn Văn Hưởng',
      complex: '',
      displayAddress: 'Nguyễn Văn Hưởng, Thảo Điền, Quận 2, TP.HCM',
      coordinates: { lat: 10.804, lng: 106.737 }
    },
    property_type: 'villa',
    title: 'Biệt thự Thảo Điền cao cấp',
    description: 'Biệt thự 4 phòng ngủ, hồ bơi riêng.',
    price: 15.0,
    area: 400,
    status: 'available',
    created_at: '2025-07-15T10:00:00Z',
    updated_at: '2025-07-15T10:00:00Z',
    contact: {
      name: 'Trần Văn R',
      email: 'tranvanr@example.com',
      phone: '0917890123'
    },
    features: {
      bedrooms: '4',
      bathrooms: '4',
      furniture: 'Full nội thất'
    },
    media: {
      images: [
        { url: 'https://via.placeholder.com/600x400?text=Post7', caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 18,
    type: 'nhadatban',
    address: {
      province: 'Đà Nẵng',
      district: 'Liên Chiểu',
      ward: 'Hòa Minh',
      street: 'Nguyễn Sinh Sắc',
      complex: '',
      displayAddress: 'Nguyễn Sinh Sắc, Hòa Minh, Liên Chiểu, Đà Nẵng',
      coordinates: { lat: 16.075, lng: 108.159 }
    },
    property_type: 'house',
    title: 'Nhà riêng Liên Chiểu',
    description: 'Nhà 2 tầng, gần trường học.',
    price: 3.0,
    area: 70,
    status: 'available',
    created_at: '2025-08-15T10:00:00Z',
    updated_at: '2025-08-15T10:00:00Z',
    contact: {
      name: 'Lê Thị S',
      email: 'lethis@example.com',
      phone: '0918901234'
    },
    features: {
      bedrooms: '3',
      bathrooms: '2',
      furniture: 'Không nội thất'
    },
    media: {
      images: [
        { url: 'https://via.placeholder.com/600x400?text=Post8', caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 19,
    type: 'nhadatban',
    address: {
      province: 'Hải Phòng',
      district: 'Dương Kinh',
      ward: 'Hòa Nghĩa',
      street: 'Phạm Văn Đồng',
      complex: '',
      displayAddress: 'Phạm Văn Đồng, Hòa Nghĩa, Dương Kinh, Hải Phòng',
      coordinates: { lat: 20.826, lng: 106.632 }
    },
    property_type: 'land',
    title: 'Đất nền Dương Kinh',
    description: 'Đất nền gần khu công nghiệp.',
    price: 2.5,
    area: 150,
    status: 'available',
    created_at: '2025-09-15T10:00:00Z',
    updated_at: '2025-09-15T10:00:00Z',
    contact: {
      name: 'Phạm Văn T',
      email: 'phamvant@example.com',
      phone: '0919012345'
    },
    features: {
      legalDocuments: 'Sổ đỏ'
    },
    media: {
      images: [
        { url: 'https://via.placeholder.com/600x400?text=Post9', caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 20,
    type: 'nhadatban',
    address: {
      province: 'Cần Thơ',
      district: 'Ninh Kiều',
      ward: 'An Khánh',
      street: 'Nguyễn Văn Cừ',
      complex: '',
      displayAddress: 'Nguyễn Văn Cừ, An Khánh, Ninh Kiều, Cần Thơ',
      coordinates: { lat: 10.029, lng: 105.768 }
    },
    property_type: 'townhouse',
    title: 'Nhà phố Ninh Kiều',
    description: 'Nhà phố 4 tầng, gần Vincom.',
    price: 5.5,
    area: 120,
    status: 'available',
    created_at: '2025-10-15T10:00:00Z',
    updated_at: '2025-10-15T10:00:00Z',
    contact: {
      name: 'Hoàng Thị U',
      email: 'hoangthiu@example.com',
      phone: '0910123456'
    },
    features: {
      bedrooms: '4',
      bathrooms: '3',
      furniture: 'Full nội thất'
    },
    media: {
      images: [
        { url: 'https://via.placeholder.com/600x400?text=Post10', caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  }
];

// Dropdown options
const dropdownOptions = {
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
    { value: 'Hà Nội', label: 'Hà Nội' },
    { value: 'TP.HCM', label: 'TP. Hồ Chí Minh' },
    { value: 'Đà Nẵng', label: 'Đà Nẵng' },
    { value: 'Hải Phòng', label: 'Hải Phòng' },
    { value: 'Cần Thơ', label: 'Cần Thơ' }
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
    { value: '0-1', label: 'Dưới 1 tỷ' },
    { value: '1-3', label: '1 - 3 tỷ' },
    { value: '3-5', label: '3 - 5 tỷ' },
    { value: '5-10', label: '5 - 10 tỷ' },
    { value: '10+', label: 'Trên 10 tỷ' }
  ]
};

const NhaDatBan = () => {
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
    let filtered = posts.filter(post => post.type === 'nhadatban'); // doi thang nay thanh 'sell'

    if (searchFilters.text.trim()) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchFilters.text.toLowerCase()) ||
        post.description.toLowerCase().includes(searchFilters.text.toLowerCase())
      );
    }

    if (searchFilters.propertyType) {
      filtered = filtered.filter(post => post.property_type === searchFilters.propertyType); // đổi property_type thành 
    }

    if (searchFilters.province) {
      filtered = filtered.filter(post => post.address.province === searchFilters.province);
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

    try {
      if (isCurrentlyFavorited) {
        await axios.delete('/favorites', {
          data: { user_id: user.user_id, property_id: propertyId }
        });
      } else {
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
        <div className="ndb-title-box">
          <h1 className="ndb-title">TRANG TỔNG HỢP CÁC BẤT ĐỘNG SẢN ĐƯỢC BÁN</h1>
          <h2 className="ndb-des">Trên hệ thống đang có {lengthOfdata} bất động sản được bán.</h2>
        </div>
        <div className="nhadatban-search-engine-container">
          <div className="nhadatban-search-engine">
            <div className="search-bar">
              <div className="input-wrapper">
                <FaSearch className="search-logo" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài đăng..."
                  className="search-input"
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
                      <span>Giá: {post.price} tỷ</span>
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

export default NhaDatBan;
