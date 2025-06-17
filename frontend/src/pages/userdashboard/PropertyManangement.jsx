import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/PropertyManagement.module.css';
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
const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
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
      default:
        return '#6c757d';
    }
  };
  const handleDelete = async (propertyId) => {
    try {
      const property_id = parseInt(propertyId);
      console.log('Deleting property with ID:', property_id);
      const response = await axios.delete(`${API_URL}/properties/${property_id}`,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        alert('Xóa tin đăng thành công');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Đã xảy ra lỗi khi xóa tin đăng. Vui lòng thử lại.');
    }
  }
  return (
    <div className={styles.pmPropertyCard}>
      <img
        src={property.images?.[0]?.image_url}
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
          {property.status}
        </span>
      <div className={styles.pmButtonbox}>
        <button
          className={styles.pmEditButton}
          onClick={() => navigate('/post-create', { state:{postToEdit: property, mode:true} })}
        >
          Chỉnh sửa tin đăng này
        </button>
      <button
        className={styles.pmEditButton1}
        onClick={() => {handleDelete(property.property_id)}}
      >
          Xóa tin đăng này 
      </button>
      </div>
      </div>
    </div>
  );
};

const PropertyManagement = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const user = localStorage.getItem('user');
  useEffect(() => {
    const fetchProperties = async () => {
      const user = localStorage.getItem('user');
      if (!user) return;
      try {
        // Placeholder API call
        const parsedUser = JSON.parse(user);
        const response = await axios.get(`${API_URL}/properties/user/${parseInt(parsedUser.user_id)}`);
        setProperties(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProperties();
  }, []);

  if (!user) {
    return (
      <div className={styles.pmErrorMessage}>
        Đã xảy ra lỗi, vui lòng thử lại
      </div>
    );
  }

  const tabs = ['All', 'Pending', 'Available', 'Sold', 'Rented'];

  const filteredProperties = (status) => {
    return properties.filter((p) => {
      const trimmedDate = p.created_at.split('/').slice(0, 3).join('/');
      const formattedSelectedDate = selectedDate ? selectedDate.replace(/-/g, '/') : '';
      return (
        (status.toLowerCase() === 'all' || p.status === status.toLowerCase()) &&
        p.title.toLowerCase().includes(search.toLowerCase()) &&
        (!formattedSelectedDate || trimmedDate === formattedSelectedDate)
      );
    });
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedDate('');
  };

  return (
    <div className={`${styles.pmFlexbox} slide-in`}>
      <h1 className={styles.userdashboardTabName}>Quản lý tin đăng</h1>
      <hr />
      <div className={styles.userdashboardSection}>
        <h2 className={styles.pmSectionTitle}>Danh sách tin</h2>
        <div className={styles.pmFilterRow}>
          <input
            type="text"
            className={styles.pmSearchInput}
            placeholder="Tìm theo mã tin, tiêu đề"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="date"
            className={styles.pmDateInput}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button
            className={styles.pmClearButton}
            onClick={handleClearFilters}
          >
            Xóa bộ lọc
          </button>
        </div>
        <Tab.Group>
          <Tab.List className={styles.pmSubTabList}>
            {tabs.map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  `${styles.pmSubTab} ${selected ? styles.pmSubTabSelected : ''}`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {tabs.map((tab) => (
              <Tab.Panel key={tab} className={styles.pmSubTabPanel}>
                {filteredProperties(tab).length > 0 ? (
                  <div className={styles.pmPropertyList}>
                    {filteredProperties(tab).map((property) => (
                      <PropertyCard key={property.title} property={property} />
                    ))}
                  </div>
                ) : (
                  <button
                    className={styles.pmCreateButton}
                    onClick={() => navigate('/post-create')}
                  >
                    Đăng tin mới
                  </button>
                )}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default PropertyManagement;
