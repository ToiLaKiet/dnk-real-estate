// import React, { useState, useEffect } from 'react';
// import { Tab } from '@headlessui/react';
// import axios from 'axios';
// import styles from '../../styles/AdminPropertyManagement.module.css';

// const PropertyCard = ({ property, onApprove, onReject }) => {
//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'pending':
//         return '#ffc107';
//       case 'available':
//         return '#28a745';
//       case 'sold':
//       case 'rented':
//         return '#d32f2f';
//       case 'approved':
//         return '#28a745';
//       case 'rejected':
//         return '#dc3545';
//       default:
//         return '#6c757d';
//     }
//   };

//   const getStatusText = (status) => {
//     switch (status) {
//       case 'pending':
//         return 'Chờ duyệt';
//       case 'available':
//         return 'Có sẵn';
//       case 'sold':
//         return 'Đã bán';
//       case 'rented':
//         return 'Đã thuê';
//       case 'approved':
//         return 'Đã duyệt';
//       case 'rejected':
//         return 'Đã từ chối';
//       default:
//         return status;
//     }
//   };

//   return (
//     <div className={styles.pmPropertyCard}>
//       <img
//         src={property.images?.[0] || '/placeholder-image.jpg'}
//         alt={property.title}
//         className={styles.pmPropertyImage}
//       />
//       <div className={styles.pmPropertyContent}>
//         <h3 className={styles.pmPropertyTitle}>{property.title}</h3>
//         <p className={styles.pmPropertyPrice}>{formatPrice(property.price)}</p>
//         <p className={styles.pmPropertyAddress}>{property.address}</p>
//         <p className={styles.pmPropertyType}>{property.property_type}</p>
//         <span
//           className={styles.pmPropertyStatus}
//           style={{ backgroundColor: getStatusColor(property.status) }}
//         >
//           {getStatusText(property.status)}
//         </span>
        
//         {/* Action buttons for pending properties */}
//         {property.status === 'pending' && (
//           <div className={styles.pmActionButtons}>
//             <button
//               className={styles.pmApproveButton}
//               onClick={() => onApprove(property.property_id)}
//             >
//               Duyệt
//             </button>
//             <button
//               className={styles.pmRejectButton}
//               onClick={() => onReject(property.property_id)}
//             >
//               Từ chối
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const getPageNumbers = () => {
//     const pages = [];
//     const showPages = 5; // Number of page buttons to show
    
//     let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
//     let endPage = Math.min(totalPages, startPage + showPages - 1);
    
//     // Adjust start page if we're near the end
//     if (endPage - startPage + 1 < showPages) {
//       startPage = Math.max(1, endPage - showPages + 1);
//     }
    
//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i);
//     }
    
//     return pages;
//   };

//   return (
//     <div className={styles.pmPagination}>
//       <button
//         className={styles.pmPaginationButton}
//         disabled={currentPage === 1}
//         onClick={() => onPageChange(currentPage - 1)}
//       >
//         ‹ Trước
//       </button>
      
//       {getPageNumbers().map(page => (
//         <button
//           key={page}
//           className={`${styles.pmPaginationButton} ${
//             currentPage === page ? styles.pmPaginationActive : ''
//           }`}
//           onClick={() => onPageChange(page)}
//         >
//           {page}
//         </button>
//       ))}
      
//       <button
//         className={styles.pmPaginationButton}
//         disabled={currentPage === totalPages}
//         onClick={() => onPageChange(currentPage + 1)}
//       >
//         Tiếp ›
//       </button>
//     </div>
//   );
// };

// const AdminPropertyManagement = () => {
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [dateFilter, setDateFilter] = useState('');
//   const [selectedTab, setSelectedTab] = useState(0);
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10); // You can make this configurable

//   const tabs = ['Tất cả', 'Chờ duyệt', 'Đã duyệt', 'Đã từ chối'];

//   // Fetch properties from API
//   const fetchProperties = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('/api/admin/properties'); // Replace with your actual API endpoint
//       setProperties(response.data);
//       setError('');
//     } catch (error) {
//       console.error('Error fetching properties:', error);
//       setError('Không thể tải danh sách bất động sản');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   // Filter properties based on search term, date, and tab
//   useEffect(() => {
//     let filtered = properties;

//     // Filter by search term
//     if (searchTerm) {
//       filtered = filtered.filter(property =>
//         property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         property.address.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Filter by date
//     if (dateFilter) {
//       filtered = filtered.filter(property => {
//         const propertyDate = new Date(property.created_at).toISOString().split('T')[0];
//         return propertyDate === dateFilter;
//       });
//     }

//     // Filter by tab
//     switch (selectedTab) {
//       case 1: // Chờ duyệt
//         filtered = filtered.filter(property => property.status === 'pending');
//         break;
//       case 2: // Đã duyệt
//         filtered = filtered.filter(property => property.status === 'approved' || property.status === 'available');
//         break;
//       case 3: // Đã từ chối
//         filtered = filtered.filter(property => property.status === 'rejected');
//         break;
//       default: // Tất cả
//         break;
//     }

//     setFilteredProperties(filtered);
//     setCurrentPage(1); // Reset to first page when filters change
//   }, [properties, searchTerm, dateFilter, selectedTab]);

//   // Calculate pagination
//   const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentProperties = filteredProperties.slice(startIndex, endIndex);

//   // Handle property approval
//   const handleApprove = async (propertyId) => {
//     try {
//       // API call to approve property
//       await axios.put(`/api/admin/properties/${propertyId}/approve`);
      
//       // Update local state
//       setProperties(prev => 
//         prev.map(property => 
//           property.property_id === propertyId 
//             ? { ...property, status: 'approved' }
//             : property
//         )
//       );
//     } catch (error) {
//       console.error('Error approving property:', error);
//       setError('Không thể duyệt bất động sản');
//     }
//   };

//   // Handle property rejection
//   const handleReject = async (propertyId) => {
//     try {
//       // API call to reject property
//       await axios.put(`/api/admin/properties/${propertyId}/reject`);
      
//       // Update local state
//       setProperties(prev => 
//         prev.map(property => 
//           property.property_id === propertyId 
//             ? { ...property, status: 'rejected' }
//             : property
//         )
//       );
//     } catch (error) {
//       console.error('Error rejecting property:', error);
//       setError('Không thể từ chối bất động sản');
//     }
//   };

//   const clearFilters = () => {
//     setSearchTerm('');
//     setDateFilter('');
//     setSelectedTab(0);
//   };

//   if (loading) {
//     return (
//       <div className={styles.pmFlexbox}>
//         <div className={styles.pmLoadingMessage}>Đang tải...</div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.pmFlexbox}>
//       <h1 className={styles.userdashboardTabName}>Quản lý Bất động sản</h1>
      
//       <div className={styles.userdashboardSection}>
//         <h2 className={styles.pmSectionTitle}>Danh sách Bất động sản</h2>
        
//         {/* Filters */}
//         <div className={styles.pmFilterRow}>
//           <input
//             type="text"
//             placeholder="Tìm kiếm theo tên hoặc địa chỉ..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className={styles.pmSearchInput}
//           />
//           <input
//             type="date"
//             value={dateFilter}
//             onChange={(e) => setDateFilter(e.target.value)}
//             className={styles.pmDateInput}
//           />
//           <button onClick={clearFilters} className={styles.pmClearButton}>
//             Xóa bộ lọc
//           </button>
//         </div>

//         {/* Tabs */}
//         <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
//           <Tab.List className={styles.pmSubTabList}>
//             {tabs.map((tab, index) => (
//               <Tab
//                 key={index}
//                 className={({ selected }) =>
//                   `${styles.pmSubTab} ${selected ? styles.pmSubTabSelected : ''}`
//                 }
//               >
//                 {tab}
//               </Tab>
//             ))}
//           </Tab.List>

//           <Tab.Panels>
//             {tabs.map((_, index) => (
//               <Tab.Panel key={index} className={styles.pmSubTabPanel}>
//                 {error && <div className={styles.pmErrorMessage}>{error}</div>}
                
//                 {currentProperties.length === 0 ? (
//                   <div className={styles.pmNoPropertiesMessage}>
//                     Không có bất động sản nào
//                   </div>
//                 ) : (
//                   <>
//                     <div className={styles.pmPropertyList}>
//                       {currentProperties.map((property, idx) => (
//                         <PropertyCard
//                           key={property.property_id || idx}
//                           property={property}
//                           onApprove={handleApprove}
//                           onReject={handleReject}
//                         />
//                       ))}
//                     </div>
                    
//                     {/* Pagination */}
//                     {totalPages > 1 && (
//                       <Pagination
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         onPageChange={setCurrentPage}
//                       />
//                     )}
//                   </>
//                 )}
//               </Tab.Panel>
//             ))}
//           </Tab.Panels>
//         </Tab.Group>
//       </div>
//     </div>
//   );
// };

// export default AdminPropertyManagement;
import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import axios from 'axios';
import styles from '../../styles/AdminPropertyManagement.module.css';

// Keep mock data for now
const mockProperties = [
  {
    property_id: '01',
    title: 'Căn hộ cao cấp Quận 7',
    description: 'Căn hộ 2 phòng ngủ, view sông, nội thất cao cấp, gần trung tâm thương mại',
    price: 2500000000,
    area: 15000,
    address: '123 Nguyễn Hữu Thọ, Quận 7, TP.HCM',
    property_type: 'apartment',
    status: 'pending',
    type:'sell',
    user_id: 'USER001',
    lat: 10.75,
    lng: 106.7,
    location_id: 'ward123',
    created_at: '2025-06-01T10:00:00',
    features: [
      { feature_name: 'category', feature_value: 'apartment' },
      { feature_name: 'legalDocuments', feature_value: 'Sổ đỏ' },
      { feature_name: 'furniture', feature_value: 'full' },
      { feature_name: 'bedrooms', feature_value: 2 },
      { feature_name: 'bathrooms', feature_value: 1 },
      { feature_name: 'houseDirection', feature_value: 'Nam' },
      { feature_name: 'balconyDirection', feature_value: 'Bắc' },
      { feature_name: 'contact.name', feature_value: 'Nguyễn Văn A' },
      { feature_name: 'contact.email', feature_value: 'a@example.com' },
      { feature_name: 'contact.phone', feature_value: '0987654321' },
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=500',
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=500'
    ],
    videos: ['https://example.com/videos/prop001.mp4'],
  },
  {
    property_id: '02',
    title: 'Nhà phố Cầu Giấy',
    description: 'Nhà phố 3 tầng, gần trường học, khu vực an ninh',
    price: 4500000000,
    area: 20000,
    address: '456 Nguyễn Du, Cầu Giấy, Hà Nội',
    property_type: 'house',
    status: 'pending',
    user_id: 'USER002',
    lat: 21.03,
    lng: 105.85,
    location_id: 'ward456',
    created_at: '2025-06-03T15:30:00',
    features: [
      { feature_name: 'propertyType', feature_value: 'house' },
      { feature_name: 'legalDocuments', feature_value: 'Sổ hồng' },
      { feature_name: 'furniture', feature_value: 'Basic' },
      { feature_name: 'bedrooms', feature_value: 3 },
      { feature_name: 'bathrooms', feature_value: 2 },
      { feature_name: 'houseDirection', feature_value: 'Đông' },
      { feature_name: 'balconyDirection', feature_value: 'Tây' },
      { feature_name: 'contact.name', feature_value: 'Trần Thị B' },
      { feature_name: 'contact.email', feature_value: 'b@example.com' },
      { feature_name: 'contact.phone', feature_value: '0987654322' },
    ],
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500'
    ],
    videos: ['https://example.com/videos/prop002.mp4'],
  },
  {
    property_id: '03',
    title: 'Biệt thự Đà Lạt',
    description: 'Biệt thự nghỉ dưỡng, view núi, không gian thoáng mát',
    price: 7000000000,
    area: 50000,
    address: '789 Trương Công Định, Đà Lạt',
    property_type: 'villa',
    status: 'approved',
    user_id: 'USER003',
    lat: 11.94,
    lng: 108.43,
    location_id: 'ward789',
    created_at: '2025-05-28T09:00:00',
    features: [
      { feature_name: 'propertyType', feature_value: 'villa' },
      { feature_name: 'area', feature_value: 50000 },
      { feature_name: 'price', feature_value: 7000000000 },
      { feature_name: 'legalDocuments', feature_value: 'Sổ đỏ' },
      { feature_name: 'furniture', feature_value: 'Luxury' },
      { feature_name: 'bedrooms', feature_value: 4 },
      { feature_name: 'bathrooms', feature_value: 3 },
      { feature_name: 'houseDirection', feature_value: 'Nam' },
      { feature_name: 'balconyDirection', feature_value: 'Đông' },
      { feature_name: 'contact.name', feature_value: 'Lê Văn C' },
      { feature_name: 'contact.email', feature_value: 'c@example.com' },
      { feature_name: 'contact.phone', feature_value: '0987654323' },
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500'
    ],
    videos: [],
  },
  {
    property_id: '04',
    title: 'Chung cư cho thuê Quận 1',
    description: 'Căn hộ cho thuê trung tâm, tiện ích đầy đủ',
    price: 15000000,
    area: 10000,
    address: '101 Lê Lợi, Quận 1, TP.HCM',
    property_type: 'apartment',
    status: 'rejected',
    user_id: 'USER004',
    lat: 10.78,
    lng: 106.7,
    location_id: 'ward101',
    created_at: '2025-06-05T12:00:00',
    features: [
      { feature_name: 'category', feature_value: 'apartment' },
      { feature_name: 'area', feature_value: 10000 },
      { feature_name: 'price', feature_value: 15000000 },
      { feature_name: 'legalDocuments', feature_value: 'Hợp đồng' },
      { feature_name: 'furniture', feature_value: 'None' },
      { feature_name: 'bedrooms', feature_value: 1 },
      { feature_name: 'bathrooms', feature_value: 1 },
      { feature_name: 'houseDirection', feature_value: 'Tây' },
      { feature_name: 'balconyDirection', feature_value: 'Nam' },
      { feature_name: 'contact.name', feature_value: 'Phạm Thị D' },
      { feature_name: 'contact.email', feature_value: 'd@example.com' },
      { feature_name: 'contact.phone', feature_value: '0987654324' },
    ],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500'
    ],
    videos: [],
  },
];

// Property Detail Modal Component
const PropertyDetailModal = ({ property, isOpen, onClose, onApprove, onReject }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !property) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getFeatureValue = (featureName) => {
    const feature = property.features?.find(f => f.feature_name === featureName);
    return feature ? feature.feature_value : 'N/A';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      (prev + 1) % (property.images?.length || 1)
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (property.images?.length || 1) - 1 : prev - 1
    );
  };

  return (
    <div className={styles.pmDetailModalOverlay} onClick={onClose}>
      <div className={styles.pmDetailModalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.pmDetailCloseButton} onClick={onClose}>
          ×
        </button>
        
        <div className={styles.pmDetailHeader}>
          <h2 className={styles.pmDetailTitle}>{property.title}</h2>
          <span className={styles.pmDetailPrice}>{formatPrice(property.price)}</span>
        </div>

        <div className={styles.pmDetailBody}>
          {/* Image Gallery */}
          {property.images && property.images.length > 0 && (
            <div className={styles.pmImageGallery}>
              <div className={styles.pmImageContainer}>
                <img 
                  src={property.images[currentImageIndex]} 
                  alt={`${property.title} - ${currentImageIndex + 1}`}
                  className={styles.pmDetailImage}
                />
                {property.images.length > 1 && (
                  <>
                    <button className={styles.pmImageNavPrev} onClick={prevImage}>
                      ‹
                    </button>
                    <button className={styles.pmImageNavNext} onClick={nextImage}>
                      ›
                    </button>
                  </>
                )}
              </div>
              {property.images.length > 1 && (
                <div className={styles.pmImageThumbnails}>
                  {property.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`${styles.pmThumbnail} ${
                        index === currentImageIndex ? styles.pmThumbnailActive : ''
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Property Information */}
          <div className={styles.pmDetailInfo}>
            <div className={styles.pmInfoSection}>
              <h3>Thông tin cơ bản</h3>
              <div className={styles.pmInfoGrid}>
                <div className={styles.pmInfoItem}>
                  <strong>Địa chỉ:</strong>
                  <span>{property.address}</span>
                </div>
                <div className={styles.pmInfoItem}>
                  <strong>Loại BDS:</strong>
                  <span>{property.property_type}</span>
                </div>
                <div className={styles.pmInfoItem}>
                  <strong>Diện tích:</strong>
                  <span>{property.area} m²</span>
                </div>
                <div className={styles.pmInfoItem}>
                  <strong>Phòng ngủ:</strong>
                  <span>{getFeatureValue('bedrooms')}</span>
                </div>
                <div className={styles.pmInfoItem}>
                  <strong>Phòng tắm:</strong>
                  <span>{getFeatureValue('bathrooms')}</span>
                </div>
                <div className={styles.pmInfoItem}>
                  <strong>Hướng nhà:</strong>
                  <span>{getFeatureValue('houseDirection')}</span>
                </div>
                <div className={styles.pmInfoItem}>
                  <strong>Hướng ban công:</strong>
                  <span>{getFeatureValue('balconyDirection')}</span>
                </div>
                <div className={styles.pmInfoItem}>
                  <strong>Nội thất:</strong>
                  <span>{getFeatureValue('furniture')}</span>
                </div>
                <div className={styles.pmInfoItem}>
                  <strong>Giấy tờ pháp lý:</strong>
                  <span>{getFeatureValue('legalDocuments')}</span>
                </div>
              </div>
            </div>

            <div className={styles.pmInfoSection}>
              <h3>Mô tả</h3>
              <p className={styles.pmDescription}>{property.description}</p>
            </div>

            <div className={styles.pmInfoSection}>
              <h3>Thông tin liên hệ</h3>
              <div className={styles.pmInfoGrid}>
                <div className={styles.pmInfoItem}>
                  <strong>Tên:</strong>
                  <span>{getFeatureValue('contact.name')}</span>
                </div>
                <div className={styles.pmInfoItem}>
                  <strong>Email:</strong>
                  <span>{getFeatureValue('contact.email')}</span>
                </div>
                <div className={styles.pmInfoItem}>
                  <strong>Số điện thoại:</strong>
                  <span>{getFeatureValue('contact.phone')}</span>
                </div>
              </div>
            </div>

            {/* Videos */}
            {property.videos && property.videos.length > 0 && (
              <div className={styles.pmInfoSection}>
                <h3>Video</h3>
                <div className={styles.pmVideoContainer}>
                  {property.videos.map((video, index) => (
                    <video key={index} controls className={styles.pmDetailVideo}>
                      <source src={video} type="video/mp4" />
                      Trình duyệt không hỗ trợ video.
                    </video>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {property.status === 'pending' && (
          <div className={styles.pmDetailActions}>
            <button
              className={styles.pmDetailApproveButton}
              onClick={() => {
                onApprove(property.property_id);
                onClose();
              }}
            >
              Duyệt
            </button>
            <button
              className={styles.pmDetailRejectButton}
              onClick={() => {
                onReject(property.property_id);
                onClose();
              }}
            >
              Từ chối
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const PropertyCard = ({ property, onApprove, onReject, onViewDetails }) => {
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
      case 'approved':
        return '#28a745';
      case 'rejected':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ duyệt';
      case 'available':
        return 'Có sẵn';
      case 'sold':
        return 'Đã bán';
      case 'rented':
        return 'Đã thuê';
      case 'approved':
        return 'Đã duyệt';
      case 'rejected':
        return 'Đã từ chối';
      default:
        return status;
    }
  };

  return (
    <div className={styles.pmPropertyCard}>
      <img
        src={property.images?.[0] || '/placeholder-image.jpg'}
        alt={property.title}
        className={styles.pmPropertyImage}
      />
      <div className={styles.pmPropertyContent}>
        <h3 className={styles.pmPropertyTitle}>{property.title}</h3>
        <p className={styles.pmPropertyPrice}>{formatPrice(property.price)}</p>
        <p className={styles.pmPropertyAddress}>{property.address}</p>
        <p className={styles.pmPropertyType}>{property.property_type}</p>
        <span
          className={styles.pmPropertyStatus}
          style={{ backgroundColor: getStatusColor(property.status) }}
        >
          {getStatusText(property.status)}
        </span>
        
        {/* Action buttons */}
        <div className={styles.pmActionButtons}>
          <button
            className={styles.pmDetailButton}
            onClick={() => onViewDetails(property)}
          >
            Chi tiết
          </button>
          
          {property.status === 'pending' && (
            <>
              <button
                className={styles.pmApproveButton}
                onClick={() => onApprove(property.property_id)}
              >
                Duyệt
              </button>
              <button
                className={styles.pmRejectButton}
                onClick={() => onReject(property.property_id)}
              >
                Từ chối
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Number of page buttons to show
    
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className={styles.pmPagination}>
      <button
        className={styles.pmPaginationButton}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹ Trước
      </button>
      
      {getPageNumbers().map(page => (
        <button
          key={page}
          className={`${styles.pmPaginationButton} ${
            currentPage === page ? styles.pmPaginationActive : ''
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      
      <button
        className={styles.pmPaginationButton}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Tiếp ›
      </button>
    </div>
  );
};

const AdminPropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Reduced for testing with mock data

  const tabs = ['Tất cả', 'Chờ duyệt', 'Đã duyệt', 'Đã từ chối'];

  // Commented out API call - using mock data for now
  const fetchProperties = async () => {
    try {
      setLoading(true);
      
      // TODO: Uncomment when backend is ready
      // const response = await axios.get('/api/admin/properties');
      // setProperties(response.data);
      
      // Using mock data temporarily
      setTimeout(() => {
        setProperties(mockProperties);
        setLoading(false);
      }, 500);
      
      setError('');
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Không thể tải danh sách bất động sản');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Filter properties based on search term, date, and tab
  useEffect(() => {
    let filtered = properties;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date
    if (dateFilter) {
      filtered = filtered.filter(property => {
        const propertyDate = new Date(property.created_at).toISOString().split('T')[0];
        return propertyDate === dateFilter;
      });
    }

    // Filter by tab
    switch (selectedTab) {
      case 1: // Chờ duyệt
        filtered = filtered.filter(property => property.status === 'pending');
        break;
      case 2: // Đã duyệt
        filtered = filtered.filter(property => property.status === 'approved' || property.status === 'available');
        break;
      case 3: // Đã từ chối
        filtered = filtered.filter(property => property.status === 'rejected');
        break;
      default: // Tất cả
        break;
    }

    setFilteredProperties(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [properties, searchTerm, dateFilter, selectedTab]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  // Handle property approval
  const handleApprove = async (propertyId) => {
    try {
      // TODO: Uncomment when backend is ready
      // await axios.put(`/api/admin/properties/${propertyId}/approve`);
      
      // Update local state with mock data
      setProperties(prev => 
        prev.map(property => 
          property.property_id === propertyId 
            ? { ...property, status: 'approved' }
            : property
        )
      );
      console.log('Approved property:', propertyId);
    } catch (error) {
      console.error('Error approving property:', error);
      setError('Không thể duyệt bất động sản');
    }
  };

  // Handle property rejection
  const handleReject = async (propertyId) => {
    try {
      // TODO: Uncomment when backend is ready
      // await axios.put(`/api/admin/properties/${propertyId}/reject`);
      
      // Update local state with mock data
      setProperties(prev => 
        prev.map(property => 
          property.property_id === propertyId 
            ? { ...property, status: 'rejected' }
            : property
        )
      );
      console.log('Rejected property:', propertyId);
    } catch (error) {
      console.error('Error rejecting property:', error);
      setError('Không thể từ chối bất động sản');
    }
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProperty(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDateFilter('');
    setSelectedTab(0);
  };

  if (loading) {
    return (
      <div className={styles.pmFlexbox}>
        <div className={styles.pmLoadingMessage}>Đang tải...</div>
      </div>
    );
  }

  return (
    <div className={styles.pmFlexbox}>
      <h1 className={styles.userdashboardTabName}>Quản lý Bất động sản</h1>
      
      <div className={styles.userdashboardSection}>
        <h2 className={styles.pmSectionTitle}>Danh sách Bất động sản</h2>
        
        {/* Filters */}
        <div className={styles.pmFilterRow}>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc địa chỉ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.pmSearchInput}
          />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className={styles.pmDateInput}
          />
          <button onClick={clearFilters} className={styles.pmClearButton}>
            Xóa bộ lọc
          </button>
        </div>

        {/* Tabs */}
        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className={styles.pmSubTabList}>
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  `${styles.pmSubTab} ${selected ? styles.pmSubTabSelected : ''}`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            {tabs.map((_, index) => (
              <Tab.Panel key={index} className={styles.pmSubTabPanel}>
                {error && <div className={styles.pmErrorMessage}>{error}</div>}
                
                {currentProperties.length === 0 ? (
                  <div className={styles.pmNoPropertiesMessage}>
                    Không có bất động sản nào
                  </div>
                ) : (
                  <>
                    <div className={styles.pmPropertyList}>
                      {currentProperties.map((property, idx) => (
                        <PropertyCard
                          key={property.property_id || idx}
                          property={property}
                          onApprove={handleApprove}
                          onReject={handleReject}
                          onViewDetails={handleViewDetails}
                        />
                      ))}
                    </div>
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                      />
                    )}
                  </>
                )}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default AdminPropertyManagement;
