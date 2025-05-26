// import React, { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import SearchEngine from "../../components/ui/search-engine";
// import Header from "../../components/ui/parts/header";
// import Footer from "../../components/ui/parts/footer";
// import { postData } from "../postData.jsx";
// import "../../styles/NhaDatBan.css";

// const NhaDatChoThue = () => {
//   const SeUseCase = {
//     all: 0,
//     nhadatban: 0,
//     nhadatchothue: 1,
//     duan: 0,
//   };

//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [priceFilters, setPriceFilters] = useState([]);
//   const [areaFilters, setAreaFilters] = useState([]);
//   const [provinceFilter, setProvinceFilter] = useState("");
//   const navigate = useNavigate();

//   const provinces = [
//     "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre",
//     "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng",
//     "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai",
//     "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang",
//     "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng",
//     "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận",
//     "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị",
//     "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa",
//     "Thừa Thiên Huế", "Tiền Giang", "TP.HCM", "Trà Vinh", "Tuyên Quang", "Vĩnh Long",
//     "Vĩnh Phúc", "Yên Bái"
//   ];
//   const priceRanges = [
//     { label: "Dưới 500 triệu", min: 0, max: 500000000 },
//     { label: "500 triệu - 1 tỷ", min: 500000000, max: 1000000000 },
//     { label: "1 tỷ - 3 tỷ", min: 1000000000, max: 3000000000 },
//     { label: "3 tỷ - 10 tỷ", min: 3000000000, max: 10000000000 },
//     { label: "Trên 10 tỷ", min: 10000000000, max: Infinity },
//   ];
//   const areaRanges = [
//     { label: "Dưới 30 m²", min: 0, max: 30 },
//     { label: "30-100 m²", min: 30, max: 100 },
//     { label: "100-200 m²", min: 100, max: 200 },
//     { label: "200-500 m²", min: 200, max: 500 },
//     { label: "Trên 500 m²", min: 500, max: Infinity },
//   ];
//   const fetchPosts = useCallback(() => {
//     setLoading(true);
//     //Backend
//     // const fetchPostsFromBackend = async () => {
//     //   const response = await fetch("https://api.example.com/posts/rent");
//     //   const data = await response.json();
//     //   setPosts(data);
//     // };
//     try {
//       const filteredPosts = postData.filter((post) => {
//         const priceMatch = priceFilters.length === 0 || priceFilters.some(
//           ({ min, max }) => post.price >= min && post.price <= max
//         );
//         const areaMatch = areaFilters.length === 0 || areaFilters.some(
//           ({ min, max }) => post.area >= min && post.area <= max
//         );
//         const provinceMatch = !provinceFilter || post.location.province === provinceFilter;
//         return priceMatch && areaMatch && provinceMatch && post.status === "For sale";
//       });
//       setPosts(filteredPosts);
//     } catch (error) {
//       console.error("Lỗi khi lọc tin đăng:", error);
//       setPosts(postData.filter((post) => post.status === "For sale"));
//     } finally {
//       setLoading(false);
//     }
//   }, [priceFilters, areaFilters, provinceFilter]);

//   useEffect(() => {
//     fetchPosts();
//   }, [priceFilters, areaFilters, provinceFilter, fetchPosts]);

//   const handlePriceFilter = (range) => {
//     setPriceFilters((prev) =>
//       prev.some((f) => f.label === range.label)
//         ? prev.filter((f) => f.label !== range.label)
//         : [...prev, range]
//     );
//   };

//   const handleAreaFilter = (range) => {
//     setAreaFilters((prev) =>
//       prev.some((f) => f.label === range.label)
//         ? prev.filter((f) => f.label !== range.label)
//         : [...prev, range]
//     );
//   };

//   const handleProvinceFilter = (e) => {
//     setProvinceFilter(e.target.value || "");
//   };

//   const handlePostClick = (postId) => {
//     navigate(`/postspage/${postId}`);
//   };

//   const getFirstImage = (media) => {
//     if (!media || !Array.isArray(media)) return "https://i.pravatar.cc/150?u=1";
//     const firstImage = media.find(item => item.type === "image");
//     return firstImage?.url || "https://i.pravatar.cc/150?u=1";
//   };
//   return (
//     <div className="page-container">
//       <Header />
//       <div className="search-engine-outer-wrapper">
//         <div className="search-engine-inner-wrapper">
//           <SearchEngine useCase={SeUseCase} />
//         </div>
//       </div>
//       <div className="posts-wrapper">
//         <div className="posts-list">
//           {loading ? (
//             <div className="loading">Đang tải...</div>
//           ) : posts.length > 0 ? (
//             posts.map((post) => (
//               <div key={post.id} className="post-item" onClick={() => handlePostClick(post.id)}>
//                 <div className="post-image-container">
//                   <img
//                     src={getFirstImage(post.media)}
//                     alt={post.title}
//                     className="post-image"
//                     loading="lazy"
//                     onError={(e) => {
//                       e.target.src = "https://i.pravatar.cc/150?u=1";
//                     }}
//                   />
//                 </div>
//                 <div className="post-content">
//                   <h3 className="post-title">{post.title}</h3>
//                   <div className="post-info">
//                     <span className="post-price">{(post.price / 1000000000).toFixed(1)} tỷ VND</span>
//                     <span className="post-province">{post.location.province}</span>
//                   </div>
//                   <p className="post-description">
//                     {post.description.slice(0, 100)}
//                     {post.description.length > 100 ? "..." : ""}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="no-posts">Không tìm thấy tin đăng phù hợp</div>
//           )}
//         </div>
//         <div className="posts-filter">
//           <div className="filter-section">
//             <h4 className="filter-name">Lọc theo giá</h4>
//             {priceRanges.map((range) => (
//               <label key={range.label} className="filter-option">
//                 <input
//                   type="checkbox"
//                   checked={priceFilters.some((f) => f.label === range.label)}
//                   onChange={() => handlePriceFilter(range)}
//                   className="checkbox"
//                 />
//                 {range.label}
//               </label>
//             ))}
//           </div>
//           <div className="filter-section">
//             <h4 className="filter-name">Lọc theo diện tích</h4>
//             {areaRanges.map((range) => (
//               <label key={range.label} className="filter-option">
//                 <input
//                   type="checkbox"
//                   checked={areaFilters.some((f) => f.label === range.label)}
//                   onChange={() => handleAreaFilter(range)}
//                   className="checkbox"
//                 />
//                 {range.label}
//               </label>
//             ))}
//           </div>
//           <div className="filter-section">
//             <h4 className="filter-name">Lọc theo tỉnh/thành</h4>
//             <select
//               value={provinceFilter}
//               onChange={handleProvinceFilter}
//               className="province-select"
//             >
//               <option value="">Chọn tỉnh/thành</option>
//               {provinces.map((province) => (
//                 <option key={province} value={province}>
//                   {province}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default NhaDatChoThue;
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/parts/header';
import Footer from '../../components/ui/parts/footer';
import { FaSearch } from 'react-icons/fa';
import '../../styles/NhaDatBan.css';

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

  // Search filters state
  const [searchFilters, setSearchFilters] = useState({
    text: '',
    propertyType: '',
    province: '',
    area: '',
    price: ''
  });

  const [posts, setPosts] = useState(mockPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

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

    // Lọc theo text
    if (searchFilters.text.trim()) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchFilters.text.toLowerCase()) ||
        post.description.toLowerCase().includes(searchFilters.text.toLowerCase())
      );
    }

    // Lọc theo propertyType
    if (searchFilters.propertyType) {
      filtered = filtered.filter(post => post.property_type === searchFilters.propertyType);
    }

    // Lọc theo province
    if (searchFilters.province) {
      filtered = filtered.filter(post => post.address.province === searchFilters.province);
    }

    // Lọc theo area
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

    // Lọc theo price
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

    // Phân trang
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

  return (
    <div className="page-container">
      <Header />
      <div className="nhadatban-search-engine-container">
        <div className="nhadatban-search-engine">
          <div className="search-bar">
            <div className="input-wrapper">
              <FaSearch className="search-logo" />
              <input
                type="text"
                placeholder="Tìm kiếm bài đăng cho thuê..."
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
          displayPosts.map(post => (
            <div
              key={post.property_id}
              className="post-item"
              onClick={() => handlePostClick(post.property_id)}
            >
              <div className="post-image-container">
                <img
                  src={post.media.images.find(img => img.is_primary)?.url || post.media.images[0]?.url || "https://via.placeholder.com/600x400"}
                  alt={post.title}
                  className="post-image"
                  loading="lazy"
                />
              </div>
              <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-address">{post.address.displayAddress}</p>
                <p className="post-details">
                  Diện tích: {post.area}m² | Giá: {post.price} triệu/tháng
                </p>
                <p className="post-description">{post.description}</p>
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
      <Footer />
    </div>
  );
};

export default NhaDatChoThue;
