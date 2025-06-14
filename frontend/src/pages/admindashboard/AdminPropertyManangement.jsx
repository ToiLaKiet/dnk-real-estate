import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import axios from 'axios';
import styles from '../../styles/AdminPropertyManagement.module.css';
const API_URL = 'http://172.16.1.141:8080'
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
      console.log('loading...');
      const response = await axios.get(API_URL + '/properties', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add auth token if needed
        }}
      );
      console.log('Fetched properties:', response.data);
      setProperties(response.data);
      setError('');
      setLoading(false);
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
        filtered = filtered.filter(property =>  property.status === 'available');
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
      const response = await axios.put(`${API_URL}/properties/${propertyId}/status?new_status=available`, 
        {},
        {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
        },
      });
      console.log(response.data);
      // Update local state with mock data
      setProperties(prev => 
        prev.map(property => 
          property.property_id === propertyId 
            ? { ...property, status: 'available' } // Assuming 'available' is the status after approval
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
       const response = await axios.put(`${API_URL}/properties/${propertyId}/status?new_status=rejected`, 
        {},
        {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
        },
      });
      console.log(response.data);
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
