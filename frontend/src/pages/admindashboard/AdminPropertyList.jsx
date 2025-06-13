import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/AdminPropertyManagement.module.css';

const PropertyCard = ({ property, onDelete, onDetail }) => {
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

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bất động sản này?')) {
      onDelete(property.property_id);
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
            onClick={() => onDetail(property.property_id)}
          >
            Chi tiết
          </button>
          <button
            className={styles.pmDeleteButton}
            onClick={handleDelete}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminPropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch all properties
  const fetchProperties = async () => {
    try {
      setLoading(true);
      // TODO: Replace with your actual API endpoint
      const response = await axios.get('/api/admin/all-properties');
      setProperties(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Không thể tải danh sách bất động sản');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Handle property deletion
  const handleDelete = async (propertyId) => {
    try {
      // API call to delete property
      await axios.delete(`/api/admin/properties/${propertyId}`);
      
      // Update local state by removing the deleted property
      setProperties(prev => prev.filter(property => property.property_id !== propertyId));
      
      // Optional: Show success message
      alert('Xóa bất động sản thành công!');
    } catch (error) {
      console.error('Error deleting property:', error);
      setError('Không thể xóa bất động sản');
      alert('Có lỗi xảy ra khi xóa bất động sản!');
    }
  };

  // Handle view property details
  const handleDetail = (propertyId) => {
    // Navigate to property detail page
    navigate(`/postpage/${propertyId}`);
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
      <h1 className={styles.userdashboardTabName}>Danh sách Tất cả Bất động sản</h1>
      
      <div className={styles.userdashboardSection}>
        <h2 className={styles.pmSectionTitle}>Tất cả Bất động sản trong hệ thống</h2>
        
        {error && <div className={styles.pmErrorMessage}>{error}</div>}
        
        {properties.length === 0 ? (
          <div className={styles.pmNoPropertiesMessage}>
            Không có bất động sản nào trong hệ thống
          </div>
        ) : (
          <div className={styles.pmPropertyList}>
            {properties.map((property, idx) => (
              <PropertyCard
                key={property.property_id || idx}
                property={property}
                onDelete={handleDelete}
                onDetail={handleDetail}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPropertyList;
