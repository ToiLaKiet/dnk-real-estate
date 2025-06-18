import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/AdminPropertyManagement.module.css';
import { API_URL } from '../../config.js';
function getPropertyTypeLabel(type) {
  switch (type) {
    case 'sell':
      return 'Nhà đất bán';
    case 'rent':
      return 'Nhà đất cho thuê';
    case 'project':
      return 'Dự án';
    default:
      return 'Không xác định';
  }
}

const PropertyCard = ({ property, onDelete, onDetail, onApprove }) => {
  const formatPrice = (price,type) => {
    if (type === 'rent') {
      return price + ' triệu VNĐ/tháng';
    }
    else return price + ' tỷ VNĐ'
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
      case 'inactive':
        return '#a56347';
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
      case 'inactive':
        return 'Đã ẩn';
      case 'rejected':
        return 'Đã từ chối';
      default:
        return status;
    }
  };

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc chắn muốn tạm ẩn bất động sản này?')) {
      onDelete(property.property_id);
    }
  };

  const handleApprove = () => {
    if (window.confirm('Bạn có chắc chắn muốn mở khóa bất động sản này?')) {
      onApprove(property.property_id);
    }
  };
  
  return (
    <div className={styles.pmPropertyCard}>
      <img
        src={property.images[0].image_url}
        alt={property.title}
        className={styles.pmPropertyImage}
      />
      <div className={styles.pmPropertyContent}>
        <h3 className={styles.pmPropertyTitle}>{property.title}</h3>
        <p className={styles.pmPropertyPrice}>{formatPrice(property.price,property.property_type)}</p>
        <p className={styles.pmPropertyAddress}>{property.address}</p>
        <p className={styles.price}>{getPropertyTypeLabel(property.property_type)}</p>
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

          {/* Only show delete button if property is not inactive */}
          {property.status !== 'inactive' && (
            <button className={styles.pmDeleteButton} onClick={handleDelete}>
              Ẩn tin đăng
            </button>
          )}

          {property.status !== 'pending' && property.status !== 'available' && (
            <button className={styles.pmApproveButton} onClick={handleApprove}>
              Mở khóa tin đăng
            </button>
          )}
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
      const response = await axios.get(`${API_URL}/properties/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProperties(response.data);
      setError('');
    } catch (error) {
      setError('Không thể tải danh sách bất động sản');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []); // Empty dependency array to run once on mount

  // Handle property approval
  const handleApprove = async (propertyId) => {
    try {
      const response = await axios.put(
        `${API_URL}/properties/${propertyId}/status?new_status=available`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setProperties((prev) =>
        prev.map((property) =>
          property.property_id === propertyId ? { ...property, status: 'available' } : property
        )
      );
      alert('Mở khóa bất động sản thành công!');
    } catch (error) {
      setError('Không thể duyệt bất động sản');
      alert('Có lỗi xảy ra khi mở khóa bất động sản!');
    }
  };

  // Handle property hiding (set to inactive)
  const handleDelete = async (propertyId) => {
    try {
      const response = await axios.put(
        `${API_URL}/properties/${propertyId}/status?new_status=inactive`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setProperties((prev) =>
        prev.map((property) =>
          property.property_id === propertyId ? { ...property, status: 'inactive' } : property
        )
      );
      alert('Ẩn bất động sản thành công!');
    } catch (error) {
      setError('Không thể ẩn bất động sản');
      alert('Có lỗi xảy ra khi ẩn bất động sản!');
    }
  };

  // Handle view property details
  const handleDetail = (propertyId) => {
    navigate(`/postspage/${propertyId}`);
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
                onApprove={handleApprove}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPropertyList;
