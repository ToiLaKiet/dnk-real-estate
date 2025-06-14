// import React, { useState, useEffect, useMemo, useContext } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Header from '../../components/ui/parts/header';
// import Footer from '../../components/ui/parts/footer';
// import Login from '../../pages/login/Dangnhap1';
// import Modal from '../../components/ui/modal-reg-log.jsx';
// import '../../styles/duan.css';
// import '../../styles/searchengine.css';
// import { FaSearch, FaBed, FaBath, FaPhone, FaHeart } from 'react-icons/fa';
// import { AuthContext } from '../../components/ui/context/AuthContext';

// // Mock data
// // mockProjects assumed to be defined

// // Dropdown options
// const dropdownOptions = {
//   provinces: [
//     { value: "", label: "Tất cả khu vực" },
//     { value: "Hà Nội", label: "Hà Nội" },
//     { value: "TP.HCM", label: "TP. Hồ Chí Minh" },
//     { value: "Đà Nẵng", label: "Đà Nẵng" },
//     { value: "Hải Phòng", label: "Hải Phòng" },
//     { value: "Cần Thơ", label: "Cần Thơ" }
//   ],
//   areas: [
//     { value: "", label: "Tất cả diện tích" },
//     { value: "0-50", label: "Dưới 50m²" },
//     { value: "50-100", label: "50 - 100m²" },
//     { value: "100-200", label: "100 - 200m²" },
//     { value: "200-500", label: "200 - 500m²" },
//     { value: "500+", label: "Trên 500m²" }
//   ],
//   prices: [
//     { value: "", label: "Tất cả mức giá" },
//     { value: "0-1", label: "Dưới 1 tỷ" },
//     { value: "1-3", label: "1 - 3 tỷ" },
//     { value: "3-5", label: "3 - 5 tỷ" },
//     { value: "5-10", label: "5 - 10 tỷ" },
//     { value: "10+", label: "Trên 10 tỷ" }
//   ]
// };
// const mockProjects = [
//   {
//     property_id: 1,
//     type: "duan",
//     address: {
//       province: "Hà Nội",
//       district: "Cầu Giấy",
//       ward: "Dịch Vọng",
//       street: "Trần Thái Tông",
//       complex: "Vinhomes D'Capitale",
//       displayAddress: "Trần Thái Tông, Dịch Vọng, Cầu Giấy, Hà Nội",
//       coordinates: { lat: 21.028, lng: 105.784 }
//     },
//     property_type: undefined,
//     title: "Dự án Vinhomes D'Capitale",
//     description: "Dự án chung cư cao cấp với tiện ích hiện đại.",
//     price: 5.5,
//     area: 200,
//     status: "available",
//     created_at: "2025-01-01T10:00:00Z",
//     updated_at: "2025-01-01T10:00:00Z",
//     contact: {
//       name: "Nguyễn Văn A",
//       email: "nguyenvana@example.com",
//       phone: "0901234567"
//     },
//     features: {
//       bedrooms: "3",
//       bathrooms: "2",
//       furniture: "Full nội thất",
//       legalDocuments: "Sổ đỏ"
//     },
//     media: {
//       images: [
//         { url: "https://via.placeholder.com/600x400?text=Project1", caption: "Ảnh chính", is_primary: true },
//         { url: "https://via.placeholder.com/600x400?text=Project1-2", caption: null, is_primary: false }
//       ],
//       videoUrl: "https://example.com/video/project1.mp4"
//     },
//     user_id : "",
//   },
//   {
//     property_id: 2,
//     type: "duan",
//     address: {
//       province: "TP.HCM",
//       district: "Quận 7",
//       ward: "Tân Phú",
//       street: "Nguyễn Lương Bằng",
//       complex: "Sunrise City",
//       displayAddress: "Nguyễn Lương Bằng, Tân Phú, Quận 7, TP.HCM",
//       coordinates: { lat: 10.729, lng: 106.716 }
//     },
//     property_type: undefined,
//     title: "Dự án Sunrise City",
//     description: "Dự án khu đô thị hiện đại với hồ bơi và công viên.",
//     price: 7.2,
//     area: 300,
//     status: "available",
//     created_at: "2025-02-01T10:00:00Z",
//     updated_at: "2025-02-01T10:00:00Z",
//     contact: {
//       name: "Trần Thị B",
//       email: "tranthib@example.com",
//       phone: "0902345678"
//     },
//     features: {
//       bedrooms: "4",
//       bathrooms: "3",
//       furniture: "Không nội thất",
//       legalDocuments: "Hợp đồng mua bán"
//     },
//     media: {
//       images: [
//         { url: "https://via.placeholder.com/600x400?text=Project2", caption: "Ảnh chính", is_primary: true }
//       ],
//       videoUrl: null
//     }
//   },
//   {
//     property_id: 3,
//     type: "duan",
//     address: {
//       province: "Đà Nẵng",
//       district: "Hải Châu",
//       ward: "Hòa Cường Bắc",
//       street: "Nguyễn Hữu Thọ",
//       complex: "Sun Cosmo Residence",
//       displayAddress: "Nguyễn Hữu Thọ, Hòa Cường Bắc, Hải Châu, Đà Nẵng",
//       coordinates: { lat: 16.047, lng: 108.209 }
//     },
//     property_type: undefined,
//     title: "Dự án Sun Cosmo Residence",
//     description: "Dự án căn hộ nghỉ dưỡng cao cấp.",
//     price: 4.8,
//     area: 150,
//     status: "available",
//     created_at: "2025-03-01T10:00:00Z",
//     updated_at: "2025-03-01T10:00:00Z",
//     contact: {
//       name: "Lê Văn C",
//       email: "levanc@example.com",
//       phone: "0903456789"
//     },
//     features: {
//       bedrooms: "2",
//       bathrooms: "2",
//       furniture: "Full nội thất"
//     },
//     media: {
//       images: [
//         { url: "https://via.placeholder.com/600x400?text=Project3", caption: "Ảnh chính", is_primary: true }
//       ],
//       videoUrl: "https://example.com/video/project3.mp4"
//     }
//   },
//   {
//     property_id: 4,
//     type: "duan",
//     address: {
//       province: "Hải Phòng",
//       district: "Lê Chân",
//       ward: "Nghĩa Xá",
//       street: "Tôn Đức Thắng",
//       complex: "Vinhomes Imperia",
//       displayAddress: "Tôn Đức Thắng, Nghĩa Xá, Lê Chân, Hải Phòng",
//       coordinates: { lat: 20.852, lng: 106.671 }
//     },
//     property_type: undefined,
//     title: "Dự án Vinhomes Imperia",
//     description: "Dự án biệt thự và nhà phố cao cấp.",
//     price: 8.0,
//     area: 400,
//     status: "available",
//     created_at: "2025-04-01T10:00:00Z",
//     updated_at: "2025-04-01T10:00:00Z",
//     contact: {
//       name: "Phạm Thị D",
//       email: "phamthid@example.com",
//       phone: "0904567890"
//     },
//     features: {
//       bedrooms: "5",
//       bathrooms: "4",
//       furniture: "Không nội thất"
//     },
//     media: {
//       images: [
//         { url: "https://via.placeholder.com/600x400?text=Project4", caption: "Ảnh chính", is_primary: true }
//       ],
//       videoUrl: null
//     }
//   },
//   {
//     property_id: 5,
//     type: "duan",
//     address: {
//       province: "Cần Thơ",
//       district: "Ninh Kiều",
//       ward: "Cái Khế",
//       street: "Trần Văn Khéo",
//       complex: "Vincom Shophouse",
//       displayAddress: "Trần Văn Khéo, Cái Khế, Ninh Kiều, Cần Thơ",
//       coordinates: { lat: 10.037, lng: 105.781 }
//     },
//     property_type: undefined,
//     title: "Dự án Vincom Shophouse",
//     description: "Dự án shophouse trung tâm thành phố.",
//     price: 6.5,
//     area: 250,
//     status: "available",
//     created_at: "2025-05-01T10:00:00Z",
//     updated_at: "2025-05-01T10:00:00Z",
//     contact: {
//       name: "Hoàng Văn E",
//       email: "hoangvane@example.com",
//       phone: "0905678901"
//     },
//     features: {
//       bedrooms: "3",
//       bathrooms: "2"
//     },
//     media: {
//       images: [
//         { url: "https://via.placeholder.com/600x400?text=Project5", caption: "Ảnh chính", is_primary: true }
//       ],
//       videoUrl: null
//     }
//   },
//   {
//     property_id: 6,
//     type: "duan",
//     address: {
//       province: "Hà Nội",
//       district: "Ba Đình",
//       ward: "Đội Cấn",
//       street: "Liễu Giai",
//       complex: "Vinhomes Metropolis",
//       displayAddress: "Liễu Giai, Đội Cấn, Ba Đình, Hà Nội",
//       coordinates: { lat: 21.034, lng: 105.816 }
//     },
//     property_type: undefined,
//     title: "Dự án Vinhomes Metropolis",
//     description: "Dự án căn hộ cao cấp gần hồ Tây.",
//     price: 9.0,
//     area: 350,
//     status: "available",
//     created_at: "2025-06-01T10:00:00Z",
//     updated_at: "2025-06-01T10:00:00Z",
//     contact: {
//       name: "Nguyễn Thị F",
//       email: "nguyenthif@example.com",
//       phone: "0906789012"
//     },
//     features: {
//       bedrooms: "4",
//       bathrooms: "3"
//     },
//     media: {
//       images: [
//         { url: "https://via.placeholder.com/600x400?text=Project6", caption: "Ảnh chính", is_primary: true }
//       ],
//       videoUrl: null
//     }
//   },
//   {
//     property_id: 7,
//     type: "duan",
//     address: {
//       province: "TP.HCM",
//       district: "Bình Thạnh",
//       ward: "Phường 22",
//       street: "Nguyễn Hữu Cảnh",
//       complex: "Vinhomes Central Park",
//       displayAddress: "Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh, TP.HCM",
//       coordinates: { lat: 10.794, lng: 106.720 }
//     },
//     property_type: undefined,
//     title: "Dự án Vinhomes Central Park",
//     description: "Dự án khu đô thị với công viên lớn.",
//     price: 10.5,
//     area: 500,
//     status: "available",
//     created_at: "2025-07-01T10:00:00Z",
//     updated_at: "2025-07-01T10:00:00Z",
//     contact: {
//       name: "Trần Văn G",
//       email: "tranvang@example.com",
//       phone: "0907890123"
//     },
//     features: {
//       bedrooms: "5",
//       bathrooms: "4"
//     },
//     media: {
//       images: [
//         { url: "https://via.placeholder.com/600x400?text=Project7", caption: "Ảnh chính", is_primary: true }
//       ],
//       videoUrl: null
//     }
//   },
//   {
//     property_id: 8,
//     type: "duan",
//     address: {
//       province: "Đà Nẵng",
//       district: "Sơn Trà",
//       ward: "An Hải Bắc",
//       street: "Võ Nguyên Giáp",
//       complex: "Hyatt Regency",
//       displayAddress: "Võ Nguyên Giáp, An Hải Bắc, Sơn Trà, Đà Nẵng",
//       coordinates: { lat: 16.077, lng: 108.241 }
//     },
//     property_type: undefined,
//     title: "Dự án Hyatt Regency",
//     description: "Dự án nghỉ dưỡng ven biển.",
//     price: 12.0,
//     area: 600,
//     status: "available",
//     created_at: "2025-08-01T10:00:00Z",
//     updated_at: "2025-08-01T10:00:00Z",
//     contact: {
//       name: "Lê Thị H",
//       email: "lethih@example.com",
//       phone: "0908901234"
//     },
//     features: {
//       bedrooms: "6",
//       bathrooms: "5"
//     },
//     media: {
//       images: [
//         { url: "https://via.placeholder.com/600x400?text=Project8", caption: "Ảnh chính", is_primary: true }
//       ],
//       videoUrl: null
//     }
//   },
//   {
//     property_id: 9,
//     type: "duan",
//     address: {
//       province: "Hải Phòng",
//       district: "Hồng Bàng",
//       ward: "Sở Dầu",
//       street: "Hồng Bàng",
//       complex: "Vinhomes Marina",
//       displayAddress: "Hồng Bàng, Sở Dầu, Hồng Bàng, Hải Phòng",
//       coordinates: { lat: 20.867, lng: 106.664 }
//     },
//     property_type: undefined,
//     title: "Dự án Vinhomes Marina",
//     description: "Dự án biệt thự ven sông.",
//     price: 7.5,
//     area: 320,
//     status: "available",
//     created_at: "2025-09-01T10:00:00Z",
//     updated_at: "2025-09-01T10:00:00Z",
//     contact: {
//       name: "Phạm Văn I",
//       email: "phamvani@example.com",
//       phone: "0909012345"
//     },
//     features: {
//       bedrooms: "4",
//       bathrooms: "3"
//     },
//     media: {
//       images: [
//         { url: "https://via.placeholder.com/600x400?text=Project9", caption: "Ảnh chính", is_primary: true }
//       ],
//       videoUrl: null
//     }
//   },
//   {
//     property_id: 10,
//     type: "duan",
//     address: {
//       province: "Cần Thơ",
//       district: "Bình Thủy",
//       ward: "Bình Thủy",
//       street: "Lê Hồng Phong",
//       complex: "Cần Thơ Riverside",
//       displayAddress: "Lê Hồng Phong, Bình Thủy, Cần Thơ",
//       coordinates: { lat: 10.068, lng: 105.756 }
//     },
//     property_type: undefined,
//     title: "Dự án Cần Thơ Riverside",
//     description: "Dự án nhà ở ven sông Hậu.",
//     price: 5.0,
//     area: 180,
//     status: "available",
//     created_at: "2025-10-01T10:00:00Z",
//     updated_at: "2025-10-01T10:00:00Z",
//     contact: {
//       name: "Hoàng Thị K",
//       email: "hoangthik@example.com",
//       phone: "0900123456"
//     },
//     features: {
//       bedrooms: "3",
//       bathrooms: "2"
//     },
//     media: {
//       images: [
//         { url: "https://via.placeholder.com/600x400?text=Project10", caption: "Ảnh chính", is_primary: true }
//       ],
//       videoUrl: null
//     }
//   }
// ];
// const DuAn = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext); // Get user_id
//   const [lengthOfdata, setLengthOfdata] = useState(0);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [searchFilters, setSearchFilters] = useState({
//     text: "",
//     province: "",
//     area: "",
//     price: ""
//   });
//   const [projects, setProjects] = useState(mockProjects);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [favorites, setFavorites] = useState({}); // { property_id: boolean }
//   const projectsPerPage = 8;

//   // Fetch initial favorites
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (user?.user_id) {
//       axios.get(`/favorites`,{
//         headers:{
//           Authorization : `Bearer ${token}`
//         }
//       })
//         .then((response) => {
//           const favoriteMap = {};
//           response.data.forEach((fav) => {
//             favoriteMap[fav.property_id] = true;
//           });
//           setFavorites(favoriteMap);
//         })
//         .catch((error) => {
//           console.error('Error fetching favorites:', error);
//         });
//     }
//   }, [user]);

//   // Lấy query parameters từ URL
//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const text = query.get("text") || "";
//     const province = query.get("province") || "";
//     const area = query.get("area") || "";
//     const price = query.get("price") || "";
//     setSearchFilters({
//       text,
//       province,
//       area,
//       price
//     });
//     setCurrentPage(1);
//   }, [location.search]);

//   // Xử lý filter và phân trang
//   const { displayProjects, totalPages } = useMemo(() => {
//     let filtered = projects.filter(project => project.type === "duan");

//     if (searchFilters.text.trim()) {
//       filtered = filtered.filter(project =>
//         project.title.toLowerCase().includes(searchFilters.text.toLowerCase()) ||
//         project.description.toLowerCase().includes(searchFilters.text.toLowerCase())
//       );
//     }

//     if (searchFilters.province) {
//       filtered = filtered.filter(project => project.address.province === searchFilters.province);
//     }

//     if (searchFilters.area) {
//       filtered = filtered.filter(project => {
//         const projectArea = parseFloat(project.area);
//         switch (searchFilters.area) {
//           case "0-50": return projectArea < 50;
//           case "50-100": return projectArea >= 50 && projectArea <= 100;
//           case "100-200": return projectArea >= 100 && projectArea <= 200;
//           case "200-500": return projectArea >= 200 && projectArea <= 500;
//           case "500+": return projectArea > 500;
//           default: return true;
//         }
//       });
//     }

//     if (searchFilters.price) {
//       filtered = filtered.filter(project => {
//         const projectPrice = parseFloat(project.price);
//         switch (searchFilters.price) {
//           case "0-1": return projectPrice < 1;
//           case "1-3": return projectPrice >= 1 && projectPrice <= 3;
//           case "3-5": return projectPrice >= 3 && projectPrice <= 5;
//           case "5-10": return projectPrice >= 5 && projectPrice <= 10;
//           case "10+": return projectPrice > 10;
//           default: return true;
//         }
//       });
//     }

//     const startIndex = (currentPage - 1) * projectsPerPage;
//     const endIndex = startIndex + projectsPerPage;
//     const paginated = filtered.slice(startIndex, endIndex);
//     const total = Math.ceil(filtered.length / projectsPerPage);

//     return {
//       displayProjects: paginated,
//       totalPages: total
//     };
//   }, [projects, searchFilters, currentPage]);

//   // Handle filter change
//   const handleFilterChange = (field, value) => {
//     setSearchFilters(prev => ({
//       ...prev,
//       [field]: value
//     }));
//     setCurrentPage(1);
//   };

//   // Handle page change
//   const goToPage = (page) => {
//     setCurrentPage(page);
//   };

//   // Handle project click
//   const handleProjectClick = (propertyId) => {
//     navigate(`/postspage/${propertyId}`);
//   };

//   // Handle favorite toggle
//   const handleFavoriteClick = async (propertyId) => {
//     if (!user?.id) {
//       alert('Vui lòng đăng nhập để thêm vào yêu thích!');
//       setShowLoginModal(true);
//       return;
//     }

//     const isCurrentlyFavorited = favorites[propertyId];
//     setFavorites((prev) => ({
//       ...prev,
//       [propertyId]: !isCurrentlyFavorited
//     }));

//     try {
//       if (isCurrentlyFavorited) {
//         // Remove favorite
//         await axios.delete('/favorites', {
//           data: { user_id: user.user_id, property_id: propertyId }
//         });
//       } else {
//         // Add favorite
//         await axios.post('/favorites', {
//           property_id: propertyId,
//           user_id: user.user_id,
//           created: new Date().toISOString()
//         });
//       }
//     } catch (error) {
//       console.error('Error updating favorite:', error);
//       // Revert UI on error
//       setFavorites((prev) => ({
//         ...prev,
//         [propertyId]: isCurrentlyFavorited
//       }));
//     }
//   };

//   // Truncate description
//   const truncateDescription = (text, maxWords) => {
//     if (!text) return '';
//     const words = text.split(/\s+/);
//     if (words.length <= maxWords) return text;
//     return words.slice(0, maxWords).join(' ') + '...';
//   };

//   // Set length of data
//   useEffect(() => {
//     setLengthOfdata(displayProjects.length);
//   }, [displayProjects]);

//   // Get collage images
//   const getCollageImages = (images) => {
//     if (!images || images.length === 0) {
//       return [{ url: 'https://via.placeholder.com/600x400', isPlaceholder: true }];
//     }
//     const primary = images.find(img => img.is_primary === "true");
//     const others = images.filter(img => img.is_primary !== "true");
//     const selected = primary ? [primary, ...others.slice(0, 4)] : images.slice(0, 5);
//     return selected;
//   };

  
//   return (
//     <div className="duan-page-container">
//       <Header />
//       <div className="duan-content">
//         {/* Search Engine */}
//          {/* <div className='duan-title-box'>
//           <h1 className='duan-title'>TRANG TỔNG HỢP CÁC DỰ ÁN BẤT ĐỘNG SẢN</h1>
//           <h2 className='duan-des'>Trên hệ thống đang có {lengthOfdata} dự án bất động sản.</h2> 
//         </div>  */}
//         <div className="duan-search-engine-container">
//           <div className="duan-search-engine">
//             <div className="search-bar">
//               <div className="input-wrapper">
//                 <FaSearch className="search-logo" />
//                 <input
//                   type="text"
//                   placeholder="Tìm kiếm dự án..."
//                   className="duan-search-input"
//                   value={searchFilters.text}
//                   onChange={(e) => handleFilterChange("text", e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="filter-dropdowns">
//               <select
//                 value={searchFilters.province}
//                 onChange={(e) => handleFilterChange("province", e.target.value)}
//                 className="duan-filter-dropdown"
//               >
//                 {dropdownOptions.provinces.map(option => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 value={searchFilters.price}
//                 onChange={(e) => handleFilterChange("price", e.target.value)}
//                 className="duan-filter-dropdown"
//               >
//                 {dropdownOptions.prices.map(option => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 value={searchFilters.area}
//                 onChange={(e) => handleFilterChange("area", e.target.value)}
//                 className="duan-filter-dropdown"
//               >
//                 {dropdownOptions.areas.map(option => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
//         <div className="duan-title-box">
//           <h1 className="duan-title">Trang tổng hợp các dự án bất động sản</h1>
//           <h2 className="duan-des">Trên hệ thống đang có {lengthOfdata} bất động sản dạng này.</h2>
//         </div>
//         {/* Danh sách dự án */}
//         <div className="project-list">
//           {displayProjects.length > 0 ? (
//             displayProjects.map((project) => (
//               <div
//                 key={project.property_id}
//                 className="project-card"
//                 onClick={() => handleProjectClick(project.property_id)}
//               >
//                 <div className="project-media">
//                   <div className={`media-collage media-collage-${getCollageImages(project.media.images).length}`}>
//                     {getCollageImages(project.media.images).map((img, index) => (
//                       <img
//                         key={index}
//                         src={img.url}
//                         alt={project.title}
//                         className={`collage-image collage-image-${index}`}
//                         loading="lazy"
//                       />
//                     ))}
//                   </div>
//                 </div>
//                 <div className="project-info">
//                   <h3>{project.title}</h3>
//                   <div className="project-details-row">
//                     <div className="project-details">
//                       <span>Giá: {project.price} tỷ</span>
//                       <span>Diện tích: {project.area}m²</span>
//                     </div>
//                     <div className="project-features">
//                       <span>
//                         <FaBed className="icon" /> Phòng ngủ: {project.features.bedrooms || 0}
//                       </span>
//                       <span>
//                         <FaBath className="icon" /> Phòng tắm: {project.features.bathrooms || 0}
//                       </span>
//                     </div>
//                   </div>
//                   <p className="project-description">{truncateDescription(project.description, 100)}</p>
//                 </div>
//                 <hr style={{ border: '1px solid gray' }} />
//                 <div className="card-bottom">
//                   {project.user_id && <span className="user-info">Đăng bởi: {project.user_id}</span>}
//                   <a href={`tel:${project.contact.phone}`} className="phone-button">
//                     <FaPhone className="phone-calling-icon"/> Gọi {project.contact.phone}
//                   </a>
//                   <FaHeart
//                     className={`favorite-icon ${favorites[project.property_id] ? 'favorited' : ''}`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleFavoriteClick(project.property_id);
//                     }}
//                   />
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="no-results">Không tìm thấy dự án nào phù hợp</div>
//           )}
//         </div>
//         {/* Phân trang */}
//         {totalPages > 1 && (
//           <div className="pagination">
//             {currentPage > 1 && (
//               <button onClick={() => goToPage(currentPage - 1)}>
//                 &lt; Trước
//               </button>
//             )}
//             {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//               let pageNum;
//               if (totalPages <= 5) {
//                 pageNum = i + 1;
//               } else if (currentPage <= 3) {
//                 pageNum = i + 1;
//               } else if (currentPage >= totalPages - 2) {
//                 pageNum = totalPages - 4 + i;
//               } else {
//                 pageNum = currentPage - 2 + i;
//               }
//               return (
//                 <button
//                   key={pageNum}
//                   onClick={() => goToPage(pageNum)}
//                   className={currentPage === pageNum ? "active" : ""}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}
//             {currentPage < totalPages && (
//               <button onClick={() => goToPage(currentPage + 1)}>
//                 Sau &gt;
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//       <Footer />
//       <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
//         <Login />
//       </Modal>
//     </div>
//   );
// };

// export default DuAn;
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
const API_URL = 'http://172.16.1.219:8080/';


const DuAn = () => {
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
  const [userNames, setUserNames] = useState({});
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState({});
  const [lengthOfdata, setLengthOfdata] = useState(0);
  const postsPerPage = 8;
  // Add these additional state variables
  const [wardIds, setWardIds] = useState([]);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
  const [isLoadingWards, setIsLoadingWards] = useState(false);
  // Dropdown options
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
    { value: '0-1', label: 'Dưới 1 tỷ' },
    { value: '1-3', label: '1 - 3 tỷ' },
    { value: '3-5', label: '3 - 5 tỷ' },
    { value: '5-10', label: '5 - 10 tỷ' },
    { value: '10+', label: 'Trên 10 tỷ' }
  ]
});
  // Fetch initial favorites
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (user?.user_id) {
      axios.get(API_URL+`favorites`,{
        headers:{
          Authorization : `Bearer ${token}`
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
  // Function to fetch user name by ID

  const fetchUserName = async (userId) => {
    if (userNames[userId]) return; // Already fetched
    
    try {
      const response = await axios.get(API_URL+`users/${userId}`); // Adjust endpoint as needed
      console.log(`Fetching user with ID: ${userId}`, response);
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
    // Add useEffect to fetch user names when posts change
  useEffect(() => {
    if (posts && posts.length > 0) {
      posts.forEach(post => {
        if (post.user_id && !userNames[post.user_id]) {
          fetchUserName(post.user_id);
        }
      });
    }
  }, [posts]);

  // Add this useEffect to fetch provinces on component mount
  useEffect(() => {
    const fetchProvinces = async () => {
      setIsLoadingProvinces(true);
      try {
        console.log('Fetching provinces...');
        const response = await axios.get(`${API_URL}locations/?type=province`);
         // Update the provinces in dropdownOptions
        console.log('Provinces fetched:', response);
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
  // Add this useEffect to fetch ward IDs when province changes
  // Add useEffect to fetch ward IDs when province changes
  useEffect(() => {
    const fetchWardIds = async () => {
      if (!searchFilters.province) {
        setWardIds([]);
        setSearchFilters(prev => ({ ...prev, ward: [] }));
        return;
      }

      setIsLoadingWards(true);
      try {
        // Then get all wards in those districts
        const wardPromises = await axios.get(`${API_URL}locations/wards-by-province/${searchFilters.province}`);
        console.log(`Fetching wards for province:${searchFilters.province}`, wardPromises);
        // const wardsResponses = await Promise.all(wardPromises.data); //Promise is an array of promises which is an array of wards
        // const allWards = wardsResponses.flatMap(response => response.data);
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}properties`);
        console.log('Posts fetched:', response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);
  // Xử lý filter và phân trang
  const { displayPosts, totalPages } = useMemo(() => {
    let filtered = posts.filter(post => post.property_type === 'project'); // doi thang nay thanh 'sell'
    if (searchFilters.text.trim()) {
      filtered = filtered.filter(post =>
        (post.title.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes((searchFilters.text.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "")) ||
        (post.description.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes((searchFilters.text.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
      );
    }

    if (searchFilters.propertyType) {
      filtered = filtered.filter(post => post.property_type === searchFilters.propertyType); // đổi property_type thành 
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
        await axios.delete(API_URL+'favorites/'+propertyId,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }});
        console.log(`Removed property ${propertyId} from favorites`);
      } else {
        await axios.post(API_URL+'favorites', {
          property_id: propertyId,
        },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }});
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
          <h1 className="ndb-title">Trang tổng hợp các dự án bất động sản</h1>
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
                  <div className={`media-collage media-collage-${getCollageImages(post.images).length}`}>
                    {getCollageImages(post.images).map((img, index) => (
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

export default DuAn;
