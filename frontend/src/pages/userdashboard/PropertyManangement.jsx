import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/PropertyManagement.module.css';

const mockUser = {
  user_id: 'USER001',
  full_name: 'Nguyễn Văn A',
  email: 'a@example.com',
  is_email_verified: true,
  phone_number: '0987654321',
  role: 'seller',
};

const mockProperties = [
  {
    property_id: '01',
    title: 'Căn hộ cao cấp Quận 7',
    description: 'Căn hộ 2 phòng ngủ, view sông',
    price: 2500000000,
    area: 15000,
    address: '123 Nguyễn Hữu Thọ, Quận 7, TP.HCM',
    property_type: 'apartment',
    status: 'available',
    type:'sell',
    user_id: 'USER001',
    lat: 10.75,
    lng: 106.7,
    location_id: 'ward123',
    created_at: '2025/06/01/10:00:00',
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
    images: ['https://example.com/images/prop001-1.jpg', 'https://example.com/images/prop001-2.jpg'],
    videos: [],
  },
  {
    title: 'Nhà phố Cầu Giấy',
    description: 'Nhà phố 3 tầng, gần trường học',
    price: 4500000000,
    area: 20000,
    address: '456 Nguyễn Du, Cầu Giấy, Hà Nội',
    property_type: 'house',
    status: 'pending',
    user_id: 'USER001',
    lat: 21.03,
    lng: 105.85,
    location_id: 'ward456',
    created_at: '2025/06/03/15:30:00',
    features: [
      { feature_name: 'propertyType', feature_value: 'house' },
      { feature_name: 'legalDocuments', feature_value: 'Sổ hồng' },
      { feature_name: 'furniture', feature_value: 'Basic' },
      { feature_name: 'bedrooms', feature_value: 3 },
      { feature_name: 'bathrooms', feature_value: 2 },
      { feature_name: 'houseDirection', feature_value: 'Đông' },
      { feature_name: 'balconyDirection', feature_value: 'Tây' },
      { feature_name: 'contact.name', feature_value: 'Nguyễn Văn A' },
      { feature_name: 'contact.email', feature_value: 'a@example.com' },
      { feature_name: 'contact.phone', feature_value: '0987654321' },
    ],
    images: ['https://example.com/images/prop002-1.jpg'],
    videos: ['https://example.com/videos/prop002.mp4'],
  },
  {
    title: 'Biệt thự Đà Lạt',
    description: 'Biệt thự nghỉ dưỡng, view núi',
    price: 7000000000,
    area: 50000,
    address: '789 Trương Công Định, Đà Lạt',
    property_type: 'villa',
    status: 'sold',
    user_id: 'USER001',
    lat: 11.94,
    lng: 108.43,
    location_id: 'ward789',
    created_at: '2025/05/28/09:00:00',
    features: [
      { feature_name: 'propertyType', feature_value: 'villa' },
      { feature_name: 'area', feature_value: 50000 },
      { feature_name: 'padding: 5px' },
      { feature_name: 'price', feature_value: 7000000000 },
      { feature_name: 'legalDocuments', feature_value: 'Sổ đỏ' },
      { feature_name: 'furniture', feature_value: 'Luxury' },
      { feature_name: 'bedrooms', feature_value: 4 },
      { feature_name: 'bathrooms', feature_value: 3 },
      { feature_name: 'houseDirection', feature_value: 'Nam' },
      { feature_name: 'balconyDirection', feature_value: 'Đông' },
      { feature_name: 'contact.name', feature_value: 'Nguyễn Văn A' },
      { feature_name: 'contact.email', feature_value: 'a@example.com' },
      { feature_name: 'contact.phone', feature_value: '0987654321' },
    ],
    images: ['https://example.com/images/prop003-1.jpg'],
    videos: [],
  },
  {
    title: 'Chung cư cho thuê Quận 1',
    description: 'Căn hộ cho thuê trung tâm',
    price: 15000000,
    area: 10000,
    address: '101 Lê Lợi, Quận 1, TP.HCM',
    status: 'rented',
    user_id: 'USER001',
    lat: 10.78,
    lng: 106.7,
    location_id: 'ward101',
    created_at: '2025/06/05/12:00:00',
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
      { feature_name: 'contact.name', feature_value: 'Nguyễn Văn A' },
      { feature_name: 'contact.email', feature_value: 'a@example.com' },
      { feature_name: 'contact.phone', feature_value: '0987654321' },
    ],
    images: ['https://example.com/images/prop004-1.jpg'],
    videos: [],
  },
];

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
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
      default:
        return '#6c757d';
    }
  };

  return (
    <div className={styles.pmPropertyCard}>
      <img
        src={property.images[0]}
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
          {property.status}
        </span>
        <button
          className={styles.pmEditButton}
          onClick={() => navigate('/post-create', { state:{postToEdit: property, mode:true} })}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

const PropertyManagement = () => {
  const navigate = useNavigate();
  const { user } = { user: mockUser }; // Replace with useAuth
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (!user) return;
    // Placeholder API call
    // axios.get(`/users/${user.user_id}/properties`)
    //   .then(response => setProperties(response.data.properties))
    //   .catch(error => console.error(error));
    setProperties(mockProperties);
  }, [user]);

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
