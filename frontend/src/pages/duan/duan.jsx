// import '../../styles/duan.css';
// import Header from '../../components/ui/parts/header';
// import Footer from '../../components/ui/parts/footer';
// import { useState, useEffect, useMemo } from 'react';
// import '../../styles/searchengine.css';
// import { FaSearch } from 'react-icons/fa';

// const DuAn = () => {
//     // Search filters state
//     const [searchFilters, setSearchFilters] = useState({
//         text: '',
//         type: '',
//         province: '',
//         area: '',
//         price: ''
//     });
    
//     const [projects, setProjects] = useState([]); // Danh sách dự án
//     const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
//     const [loading, setLoading] = useState(false); // Trạng thái loading
//     const projectsPerPage = 8; // Số lượng dự án hiển thị trên mỗi trang

//     // Dropdown options
//     const dropdownOptions = {
//         types: [
//             { value: '', label: 'Tất cả loại hình' },
//             { value: 'apartment', label: 'Chung cư' },
//             { value: 'house', label: 'Nhà riêng' },
//             { value: 'land', label: 'Đất nền' },
//             { value: 'villa', label: 'Biệt thự' },
//             { value: 'townhouse', label: 'Nhà phố' }
//         ],
//         provinces: [
//             { value: '', label: 'Tất cả khu vực' },
//             { value: 'hanoi', label: 'Hà Nội' },
//             { value: 'hcm', label: 'TP. Hồ Chí Minh' },
//             { value: 'danang', label: 'Đà Nẵng' },
//             { value: 'haiphong', label: 'Hải Phòng' },
//             { value: 'cantho', label: 'Cần Thơ' }
//         ],
//         areas: [
//             { value: '', label: 'Tất cả diện tích' },
//             { value: '0-50', label: 'Dưới 50m²' },
//             { value: '50-100', label: '50 - 100m²' },
//             { value: '100-200', label: '100 - 200m²' },
//             { value: '200-500', label: '200 - 500m²' },
//             { value: '500+', label: 'Trên 500m²' }
//         ],
//         prices: [
//             { value: '', label: 'Tất cả mức giá' },
//             { value: '0-1', label: 'Dưới 1 tỷ' },
//             { value: '1-3', label: '1 - 3 tỷ' },
//             { value: '3-5', label: '3 - 5 tỷ' },
//             { value: '5-10', label: '5 - 10 tỷ' },
//             { value: '10+', label: 'Trên 10 tỷ' }
//         ]
//     };

//     // Mock data với cấu trúc mới
//     const mockProjects = Array.from({ length: 20 }, (_, i) => {
//         const types = ['apartment', 'house', 'land', 'villa', 'townhouse'];
//         const provinces = ['hanoi', 'hcm', 'danang', 'haiphong', 'cantho'];
//         const areas = ['45', '75', '120', '250', '600'];
//         const prices = ['0.8', '2.5', '4.2', '7.5', '12.3'];
        
//         return {
//             id: i + 1,
//             type: types[i % types.length],
//             address: {
//                 province: provinces[i % provinces.length],
//                 district: `Quận ${Math.floor(i/2) + 1}`,
//                 ward: `Phường ${i + 1}`,
//                 street: `Đường ABC ${i + 1}`,
//                 project: `Dự án ${i + 1}`,
//                 displayAddress: `Đường ABC ${i + 1}, Quận ${Math.floor(i/2) + 1}, ${provinces[i % provinces.length]}`,
//                 coordinates: {
//                     lat: 21.0285 + (Math.random() - 0.5) * 0.1,
//                     lng: 105.8542 + (Math.random() - 0.5) * 0.1
//                 }
//             },
//             area: areas[i % areas.length],
//             price: prices[i % prices.length],
//             title: `Dự án ${i + 1} - ${types[i % types.length]}`,
//             description: `Mô tả chi tiết cho dự án ${i + 1}. Khu vực tiện nghi, an ninh đảm bảo, giao thông thuận lợi...`,
//             createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
//             media: {
//                 images: [`https://picsum.photos/seed/project${i+1}/600/400`],
//                 videoUrl: ""
//             }
//         };
//     });

//     // Load dữ liệu từ backend
//     useEffect(() => {
//         const loadProjects = async () => {
//             setLoading(true);
//             try {
//                 // TODO: Uncomment khi có backend
//                 // const params = new URLSearchParams(searchFilters);
//                 // const response = await fetch(`/api/projects?${params}`);
//                 // const data = await response.json();
//                 // setProjects(data);

//                 // Dùng mock data tạm thời
//                 setProjects(mockProjects);
//             } catch (error) {
//                 console.error("Lỗi khi tải dự án:", error);
//                 setProjects([]);
//             }
//             setLoading(false);
//         };

//         loadProjects();
//     }, []); // Chỉ chạy 1 lần khi component mount

//     // Xử lý filter và phân trang ở frontend (cho mock data)
//     //useMemo để tính toán danh sách dự án hiển thị và tổng số trang
//     const { displayProjects, totalPages } = useMemo(() => {
//         let filtered = projects;

//         // Filter theo text
//         if (searchFilters.text.trim()) {
//             filtered = filtered.filter(project =>
//                 project.title.toLowerCase().includes(searchFilters.text.toLowerCase()) ||
//                 project.description.toLowerCase().includes(searchFilters.text.toLowerCase())
//             );
//         }

//         // Filter theo type
//         if (searchFilters.type) {
//             filtered = filtered.filter(project => project.type === searchFilters.type);
//         }

//         // Filter theo province
//         if (searchFilters.province) {
//             filtered = filtered.filter(project => project.address.province === searchFilters.province);
//         }

//         // Filter theo area
//         if (searchFilters.area) {
//             filtered = filtered.filter(project => {
//                 const projectArea = parseFloat(project.area);
//                 switch(searchFilters.area) {
//                     case '0-50': return projectArea < 50;
//                     case '50-100': return projectArea >= 50 && projectArea <= 100;
//                     case '100-200': return projectArea >= 100 && projectArea <= 200;
//                     case '200-500': return projectArea >= 200 && projectArea <= 500;
//                     case '500+': return projectArea > 500;
//                     default: return true;
//                 }
//             });
//         }

//         // Filter theo price
//         if (searchFilters.price) {
//             filtered = filtered.filter(project => {
//                 const projectPrice = parseFloat(project.price);
//                 switch(searchFilters.price) {
//                     case '0-1': return projectPrice < 1;
//                     case '1-3': return projectPrice >= 1 && projectPrice <= 3;
//                     case '3-5': return projectPrice >= 3 && projectPrice <= 5;
//                     case '5-10': return projectPrice >= 5 && projectPrice <= 10;
//                     case '10+': return projectPrice > 10;
//                     default: return true;
//                 }
//             });
//         }

//         // Phân trang
//         const startIndex = (currentPage - 1) * projectsPerPage;
//         const endIndex = startIndex + projectsPerPage;
//         const paginated = filtered.slice(startIndex, endIndex);
//         const total = Math.ceil(filtered.length / projectsPerPage);

//         return {
//             displayProjects: paginated,
//             totalPages: total
//         };

//     }, [projects, searchFilters, currentPage]);

//     // Handle filter change
//     const handleFilterChange = (field, value) => {
//         setSearchFilters(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };

//     const goToPage = (page) => {
//         setCurrentPage(page);
//     };

//     return (
//         <div className="duan-page-container">
//             <Header />
//             <div className="duan-content">
//                 {/* Search Engine */}
//                 <div className="duan-search-engine-container">
//                     <div className="duan-search-engine">
//                         {/* Search Bar */}
//                         <div className="search-bar">
//                             <div className="input-wrapper">
//                                 <FaSearch className="search-logo" />
//                                 <input
//                                     type="text"
//                                     placeholder="Tìm kiếm dự án..."
//                                     className="search-input"
//                                     value={searchFilters.text}
//                                     onChange={(e) => handleFilterChange('text', e.target.value)}
//                                 />
//                             </div>
//                         </div>

//                         {/* Filter Dropdowns */}
//                         <div className="filter-dropdowns">
//                             <select 
//                                 value={searchFilters.province} 
//                                 onChange={(e) => handleFilterChange('province', e.target.value)}
//                                 className="duan-filter-dropdown"
//                             >
//                                 {dropdownOptions.provinces.map(option => (
//                                     <option key={option.value} value={option.value}>
//                                         {option.label}
//                                     </option>
//                                 ))}
//                             </select>

//                             <select 
//                                 value={searchFilters.type} 
//                                 onChange={(e) => handleFilterChange('type', e.target.value)}
//                                 className="duan-filter-dropdown"
//                             >
//                                 {dropdownOptions.types.map(option => (
//                                     <option key={option.value} value={option.value}>
//                                         {option.label}
//                                     </option>
//                                 ))}
//                             </select>

//                             <select 
//                                 value={searchFilters.price} 
//                                 onChange={(e) => handleFilterChange('price', e.target.value)}
//                                 className="duan-filter-dropdown"
//                             >
//                                 {dropdownOptions.prices.map(option => (
//                                     <option key={option.value} value={option.value}>
//                                         {option.label}
//                                     </option>
//                                 ))}
//                             </select>

//                             <select 
//                                 value={searchFilters.area} 
//                                 onChange={(e) => handleFilterChange('area', e.target.value)}
//                                 className="duan-filter-dropdown"
//                             >
//                                 {dropdownOptions.areas.map(option => (
//                                     <option key={option.value} value={option.value}>
//                                         {option.label}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Loading */}
//                 {loading && <div className="loading">Đang tải...</div>}

//                 {/* Danh sách dự án */}
//                 <div className="project-list">
//                     {!loading && displayProjects.length > 0 ? (
//                         displayProjects.map(project => (
//                             <div key={project.id} className="project-card">
//                                 <div className="project-media">
//                                     <img 
//                                         src={project.media.images[0]} 
//                                         alt={project.title}
//                                         loading="lazy"
//                                     />
//                                 </div>
//                                 <div className="project-info">
//                                     <h3>{project.title}</h3>
//                                     <p className="project-address">{project.address.displayAddress}</p>
//                                     <p className="project-details">
//                                         Diện tích: {project.area}m² | Giá: {project.price} tỷ
//                                     </p>
//                                     <p className="project-description">{project.description}</p>
//                                 </div>
//                             </div>
//                         ))
//                     ) : !loading && (
//                         <div className="no-results">
//                             Không tìm thấy dự án nào phù hợp với tiêu chí tìm kiếm
//                         </div>
//                     )}
//                 </div>

//                 {/* Phân trang */}
//                 {!loading && totalPages > 1 && (
//                     <div className="pagination">
//                         {currentPage > 1 && (
//                             <button onClick={() => goToPage(currentPage - 1)}>
//                                 &lt; Trước
//                             </button>
//                         )}
                        
//                         {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                             let pageNum;
//                             if (totalPages <= 5) {
//                                 pageNum = i + 1;
//                             } else if (currentPage <= 3) {
//                                 pageNum = i + 1;
//                             } else if (currentPage >= totalPages - 2) {
//                                 pageNum = totalPages - 4 + i;
//                             } else {
//                                 pageNum = currentPage - 2 + i;
//                             }

//                             return (
//                                 <button
//                                     key={pageNum}
//                                     onClick={() => goToPage(pageNum)}
//                                     className={currentPage === pageNum ? 'active' : ''}
//                                 >
//                                     {pageNum}
//                                 </button>
//                             );
//                         })}

//                         {currentPage < totalPages && (
//                             <button onClick={() => goToPage(currentPage + 1)}>
//                                 Sau &gt;
//                             </button>
//                         )}
//                     </div>
//                 )}
//             </div>
//             <Footer />
//         </div>
//     );
// };
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/parts/header';
import Footer from '../../components/ui/parts/footer';
import '../../styles/duan.css';
import '../../styles/searchengine.css';
import { FaSearch } from 'react-icons/fa';

// Mock data
const mockProjects = [
  {
    property_id: 1,
    type: "duan",
    address: {
      province: "Hà Nội",
      district: "Cầu Giấy",
      ward: "Dịch Vọng",
      street: "Trần Thái Tông",
      complex: "Vinhomes D'Capitale",
      displayAddress: "Trần Thái Tông, Dịch Vọng, Cầu Giấy, Hà Nội",
      coordinates: { lat: 21.028, lng: 105.784 }
    },
    property_type: undefined,
    title: "Dự án Vinhomes D'Capitale",
    description: "Dự án chung cư cao cấp với tiện ích hiện đại.",
    price: 5.5,
    area: 200,
    status: "available",
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2025-01-01T10:00:00Z",
    contact: {
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0901234567"
    },
    features: {
      bedrooms: "3",
      bathrooms: "2",
      furniture: "Full nội thất",
      legalDocuments: "Sổ đỏ"
    },
    media: {
      images: [
        { url: "https://via.placeholder.com/600x400?text=Project1", caption: "Ảnh chính", is_primary: true },
        { url: "https://via.placeholder.com/600x400?text=Project1-2", caption: null, is_primary: false }
      ],
      videoUrl: "https://example.com/video/project1.mp4"
    }
  },
  {
    property_id: 2,
    type: "duan",
    address: {
      province: "TP.HCM",
      district: "Quận 7",
      ward: "Tân Phú",
      street: "Nguyễn Lương Bằng",
      complex: "Sunrise City",
      displayAddress: "Nguyễn Lương Bằng, Tân Phú, Quận 7, TP.HCM",
      coordinates: { lat: 10.729, lng: 106.716 }
    },
    property_type: undefined,
    title: "Dự án Sunrise City",
    description: "Dự án khu đô thị hiện đại với hồ bơi và công viên.",
    price: 7.2,
    area: 300,
    status: "available",
    created_at: "2025-02-01T10:00:00Z",
    updated_at: "2025-02-01T10:00:00Z",
    contact: {
      name: "Trần Thị B",
      email: "tranthib@example.com",
      phone: "0902345678"
    },
    features: {
      bedrooms: "4",
      bathrooms: "3",
      furniture: "Không nội thất",
      legalDocuments: "Hợp đồng mua bán"
    },
    media: {
      images: [
        { url: "https://via.placeholder.com/600x400?text=Project2", caption: "Ảnh chính", is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 3,
    type: "duan",
    address: {
      province: "Đà Nẵng",
      district: "Hải Châu",
      ward: "Hòa Cường Bắc",
      street: "Nguyễn Hữu Thọ",
      complex: "Sun Cosmo Residence",
      displayAddress: "Nguyễn Hữu Thọ, Hòa Cường Bắc, Hải Châu, Đà Nẵng",
      coordinates: { lat: 16.047, lng: 108.209 }
    },
    property_type: undefined,
    title: "Dự án Sun Cosmo Residence",
    description: "Dự án căn hộ nghỉ dưỡng cao cấp.",
    price: 4.8,
    area: 150,
    status: "available",
    created_at: "2025-03-01T10:00:00Z",
    updated_at: "2025-03-01T10:00:00Z",
    contact: {
      name: "Lê Văn C",
      email: "levanc@example.com",
      phone: "0903456789"
    },
    features: {
      bedrooms: "2",
      bathrooms: "2",
      furniture: "Full nội thất"
    },
    media: {
      images: [
        { url: "https://via.placeholder.com/600x400?text=Project3", caption: "Ảnh chính", is_primary: true }
      ],
      videoUrl: "https://example.com/video/project3.mp4"
    }
  },
  {
    property_id: 4,
    type: "duan",
    address: {
      province: "Hải Phòng",
      district: "Lê Chân",
      ward: "Nghĩa Xá",
      street: "Tôn Đức Thắng",
      complex: "Vinhomes Imperia",
      displayAddress: "Tôn Đức Thắng, Nghĩa Xá, Lê Chân, Hải Phòng",
      coordinates: { lat: 20.852, lng: 106.671 }
    },
    property_type: undefined,
    title: "Dự án Vinhomes Imperia",
    description: "Dự án biệt thự và nhà phố cao cấp.",
    price: 8.0,
    area: 400,
    status: "available",
    created_at: "2025-04-01T10:00:00Z",
    updated_at: "2025-04-01T10:00:00Z",
    contact: {
      name: "Phạm Thị D",
      email: "phamthid@example.com",
      phone: "0904567890"
    },
    features: {
      bedrooms: "5",
      bathrooms: "4",
      furniture: "Không nội thất"
    },
    media: {
      images: [
        { url: "https://via.placeholder.com/600x400?text=Project4", caption: "Ảnh chính", is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 5,
    type: "duan",
    address: {
      province: "Cần Thơ",
      district: "Ninh Kiều",
      ward: "Cái Khế",
      street: "Trần Văn Khéo",
      complex: "Vincom Shophouse",
      displayAddress: "Trần Văn Khéo, Cái Khế, Ninh Kiều, Cần Thơ",
      coordinates: { lat: 10.037, lng: 105.781 }
    },
    property_type: undefined,
    title: "Dự án Vincom Shophouse",
    description: "Dự án shophouse trung tâm thành phố.",
    price: 6.5,
    area: 250,
    status: "available",
    created_at: "2025-05-01T10:00:00Z",
    updated_at: "2025-05-01T10:00:00Z",
    contact: {
      name: "Hoàng Văn E",
      email: "hoangvane@example.com",
      phone: "0905678901"
    },
    features: {
      bedrooms: "3",
      bathrooms: "2"
    },
    media: {
      images: [
        { url: "https://via.placeholder.com/600x400?text=Project5", caption: "Ảnh chính", is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 6,
    type: "duan",
    address: {
      province: "Hà Nội",
      district: "Ba Đình",
      ward: "Đội Cấn",
      street: "Liễu Giai",
      complex: "Vinhomes Metropolis",
      displayAddress: "Liễu Giai, Đội Cấn, Ba Đình, Hà Nội",
      coordinates: { lat: 21.034, lng: 105.816 }
    },
    property_type: undefined,
    title: "Dự án Vinhomes Metropolis",
    description: "Dự án căn hộ cao cấp gần hồ Tây.",
    price: 9.0,
    area: 350,
    status: "available",
    created_at: "2025-06-01T10:00:00Z",
    updated_at: "2025-06-01T10:00:00Z",
    contact: {
      name: "Nguyễn Thị F",
      email: "nguyenthif@example.com",
      phone: "0906789012"
    },
    features: {
      bedrooms: "4",
      bathrooms: "3"
    },
    media: {
      images: [
        { url: "https://via.placeholder.com/600x400?text=Project6", caption: "Ảnh chính", is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 7,
    type: "duan",
    address: {
      province: "TP.HCM",
      district: "Bình Thạnh",
      ward: "Phường 22",
      street: "Nguyễn Hữu Cảnh",
      complex: "Vinhomes Central Park",
      displayAddress: "Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh, TP.HCM",
      coordinates: { lat: 10.794, lng: 106.720 }
    },
    property_type: undefined,
    title: "Dự án Vinhomes Central Park",
    description: "Dự án khu đô thị với công viên lớn.",
    price: 10.5,
    area: 500,
    status: "available",
    created_at: "2025-07-01T10:00:00Z",
    updated_at: "2025-07-01T10:00:00Z",
    contact: {
      name: "Trần Văn G",
      email: "tranvang@example.com",
      phone: "0907890123"
    },
    features: {
      bedrooms: "5",
      bathrooms: "4"
    },
    media: {
      images: [
        { url: "https://via.placeholder.com/600x400?text=Project7", caption: "Ảnh chính", is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 8,
    type: "duan",
    address: {
      province: "Đà Nẵng",
      district: "Sơn Trà",
      ward: "An Hải Bắc",
      street: "Võ Nguyên Giáp",
      complex: "Hyatt Regency",
      displayAddress: "Võ Nguyên Giáp, An Hải Bắc, Sơn Trà, Đà Nẵng",
      coordinates: { lat: 16.077, lng: 108.241 }
    },
    property_type: undefined,
    title: "Dự án Hyatt Regency",
    description: "Dự án nghỉ dưỡng ven biển.",
    price: 12.0,
    area: 600,
    status: "available",
    created_at: "2025-08-01T10:00:00Z",
    updated_at: "2025-08-01T10:00:00Z",
    contact: {
      name: "Lê Thị H",
      email: "lethih@example.com",
      phone: "0908901234"
    },
    features: {
      bedrooms: "6",
      bathrooms: "5"
    },
    media: {
      images: [
        { url: "https://via.placeholder.com/600x400?text=Project8", caption: "Ảnh chính", is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 9,
    type: "duan",
    address: {
      province: "Hải Phòng",
      district: "Hồng Bàng",
      ward: "Sở Dầu",
      street: "Hồng Bàng",
      complex: "Vinhomes Marina",
      displayAddress: "Hồng Bàng, Sở Dầu, Hồng Bàng, Hải Phòng",
      coordinates: { lat: 20.867, lng: 106.664 }
    },
    property_type: undefined,
    title: "Dự án Vinhomes Marina",
    description: "Dự án biệt thự ven sông.",
    price: 7.5,
    area: 320,
    status: "available",
    created_at: "2025-09-01T10:00:00Z",
    updated_at: "2025-09-01T10:00:00Z",
    contact: {
      name: "Phạm Văn I",
      email: "phamvani@example.com",
      phone: "0909012345"
    },
    features: {
      bedrooms: "4",
      bathrooms: "3"
    },
    media: {
      images: [
        { url: "https://via.placeholder.com/600x400?text=Project9", caption: "Ảnh chính", is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 10,
    type: "duan",
    address: {
      province: "Cần Thơ",
      district: "Bình Thủy",
      ward: "Bình Thủy",
      street: "Lê Hồng Phong",
      complex: "Cần Thơ Riverside",
      displayAddress: "Lê Hồng Phong, Bình Thủy, Cần Thơ",
      coordinates: { lat: 10.068, lng: 105.756 }
    },
    property_type: undefined,
    title: "Dự án Cần Thơ Riverside",
    description: "Dự án nhà ở ven sông Hậu.",
    price: 5.0,
    area: 180,
    status: "available",
    created_at: "2025-10-01T10:00:00Z",
    updated_at: "2025-10-01T10:00:00Z",
    contact: {
      name: "Hoàng Thị K",
      email: "hoangthik@example.com",
      phone: "0900123456"
    },
    features: {
      bedrooms: "3",
      bathrooms: "2"
    },
    media: {
      images: [
        { url: "https://via.placeholder.com/600x400?text=Project10", caption: "Ảnh chính", is_primary: true }
      ],
      videoUrl: null
    }
  }
];

// Dropdown options
const dropdownOptions = {
  provinces: [
    { value: "", label: "Tất cả khu vực" },
    { value: "Hà Nội", label: "Hà Nội" },
    { value: "TP.HCM", label: "TP. Hồ Chí Minh" },
    { value: "Đà Nẵng", label: "Đà Nẵng" },
    { value: "Hải Phòng", label: "Hải Phòng" },
    { value: "Cần Thơ", label: "Cần Thơ" }
  ],
  areas: [
    { value: "", label: "Tất cả diện tích" },
    { value: "0-50", label: "Dưới 50m²" },
    { value: "50-100", label: "50 - 100m²" },
    { value: "100-200", label: "100 - 200m²" },
    { value: "200-500", label: "200 - 500m²" },
    { value: "500+", label: "Trên 500m²" }
  ],
  prices: [
    { value: "", label: "Tất cả mức giá" },
    { value: "0-1", label: "Dưới 1 tỷ" },
    { value: "1-3", label: "1 - 3 tỷ" },
    { value: "3-5", label: "3 - 5 tỷ" },
    { value: "5-10", label: "5 - 10 tỷ" },
    { value: "10+", label: "Trên 10 tỷ" }
  ]
};

const DuAn = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Search filters state
  const [searchFilters, setSearchFilters] = useState({
    text: "",
    province: "",
    area: "",
    price: ""
  });

  const [projects, setProjects] = useState(mockProjects);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 8;

  // Lấy query parameters từ URL
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const text = query.get("text") || "";
    const province = query.get("province") || "";
    const area = query.get("area") || "";
    const price = query.get("price") || "";

    setSearchFilters({
      text,
      province,
      area,
      price
    });
    setCurrentPage(1);
  }, [location.search]);

  // Xử lý filter và phân trang
  const { displayProjects, totalPages } = useMemo(() => {
    let filtered = projects.filter(project => project.type === "duan");

    // Lọc theo text
    if (searchFilters.text.trim()) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchFilters.text.toLowerCase()) ||
        project.description.toLowerCase().includes(searchFilters.text.toLowerCase())
      );
    }

    // Lọc theo province
    if (searchFilters.province) {
      filtered = filtered.filter(project => project.address.province === searchFilters.province);
    }

    // Lọc theo area
    if (searchFilters.area) {
      filtered = filtered.filter(project => {
        const projectArea = parseFloat(project.area);
        switch (searchFilters.area) {
          case "0-50": return projectArea < 50;
          case "50-100": return projectArea >= 50 && projectArea <= 100;
          case "100-200": return projectArea >= 100 && projectArea <= 200;
          case "200-500": return projectArea >= 200 && projectArea <= 500;
          case "500+": return projectArea > 500;
          default: return true;
        }
      });
    }

    // Lọc theo price
    if (searchFilters.price) {
      filtered = filtered.filter(project => {
        const projectPrice = parseFloat(project.price);
        switch (searchFilters.price) {
          case "0-1": return projectPrice < 1;
          case "1-3": return projectPrice >= 1 && projectPrice <= 3;
          case "3-5": return projectPrice >= 3 && projectPrice <= 5;
          case "5-10": return projectPrice >= 5 && projectPrice <= 10;
          case "10+": return projectPrice > 10;
          default: return true;
        }
      });
    }

    // Phân trang
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    const paginated = filtered.slice(startIndex, endIndex);
    const total = Math.ceil(filtered.length / projectsPerPage);

    return {
      displayProjects: paginated,
      totalPages: total
    };
  }, [projects, searchFilters, currentPage]);

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

  // Handle project click
  const handleProjectClick = (propertyId) => {
    navigate(`/project/${propertyId}`);
  };

  return (
    <div className="duan-page-container">
      <Header />
      <div className="duan-content">
        {/* Search Engine */}
        <div className="duan-search-engine-container">
          <div className="duan-search-engine">
            <div className="search-bar">
              <div className="input-wrapper">
                <FaSearch className="search-logo" />
                <input
                  type="text"
                  placeholder="Tìm kiếm dự án..."
                  className="search-input"
                  value={searchFilters.text}
                  onChange={(e) => handleFilterChange("text", e.target.value)}
                />
              </div>
            </div>
            <div className="filter-dropdowns">
              <select
                value={searchFilters.province}
                onChange={(e) => handleFilterChange("province", e.target.value)}
                className="duan-filter-dropdown"
              >
                {dropdownOptions.provinces.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                value={searchFilters.price}
                onChange={(e) => handleFilterChange("price", e.target.value)}
                className="duan-filter-dropdown"
              >
                {dropdownOptions.prices.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                value={searchFilters.area}
                onChange={(e) => handleFilterChange("area", e.target.value)}
                className="duan-filter-dropdown"
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

        {/* Danh sách dự án */}
        <div className="project-list">
          {displayProjects.length > 0 ? (
            displayProjects.map(project => (
              <div
                key={project.property_id}
                className="project-card"
                onClick={() => handleProjectClick(project.property_id)}
              >
                <div className="project-media">
                  <img
                    src={project.media.images.find(img => img.is_primary)?.url || project.media.images[0]?.url || "https://via.placeholder.com/600x400"}
                    alt={project.title}
                    loading="lazy"
                  />
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p className="project-address">{project.address.displayAddress}</p>
                  <p className="project-details">
                    Diện tích: {project.area}m² | Giá: {project.price} tỷ
                  </p>
                  <p className="project-description">{project.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              Không tìm thấy dự án nào phù hợp
            </div>
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
                  className={currentPage === pageNum ? "active" : ""}
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
    </div>
  );
};

export default DuAn;
