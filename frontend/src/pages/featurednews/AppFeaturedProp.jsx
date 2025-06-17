import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config.js';
import '../../styles/AppFeaturedProp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTag, 
  faRulerCombined, 
  faLocationDot, 
  faCrown, 
  faMoneyBill,
  faKey,
  faArrowTrendUp, 
  faBuilding, 
  faArrowRight,
  faGem
} from '@fortawesome/free-solid-svg-icons';

function AppFeaturedProp() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch properties when component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const skip = 5;
        const limit = 4; // You can adjust this limit as needed
        const response = await axios.get(`${API_URL}/properties/?skip=${skip}&limit=${limit}`);
        
        // Sort by price descending to show premium properties first
        const sortedProperties = response.data.sort((a, b) => b.price - a.price);
        
        setProperties(sortedProperties);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch featured properties:', err);
        setError('Không thể tải dữ liệu bất động sản nổi bật.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Format price to VND
  const formatPrice = (price, type) => {
    if (type === 'rent') {
      return `${price.toLocaleString()} triệu VND/tháng`;
    } else {
      return `${price.toLocaleString()} tỷ VND`;
    }
  };

  // Navigate to property detail page
  const handleCardClick = (propertyId) => {
    navigate(`/postspage/${propertyId}`);
  };

  return (
    <div className="appfeatured-container">
      <div className="appfeatured-header">
        <h2 className="appfeatured-title">
          <FontAwesomeIcon icon={faCrown} className="appfeatured-title-icon" />
          Bất động sản nổi bật
        </h2>
        <p className="appfeatured-subtitle">
          Những bất động sản cao cấp và đặc biệt trên thị trường
        </p>
      </div>
      
      {loading ? (
        <div className="appfeatured-loading">Đang tải bất động sản nổi bật...</div>
      ) : error ? (
        <div className="appfeatured-error">{error}</div>
      ) : properties.length === 0 ? (
        <div className="appfeatured-no-data">Không tìm thấy bất động sản nổi bật.</div>
      ) : (
        <div className="appfeatured-content">
          {properties.map((property) => (
            <div 
              key={property.property_id} 
              className="appfeatured-card" 
              onClick={() => handleCardClick(property.property_id)}
            >
              <div className="appfeatured-card-image">
                <div className="appfeatured-image-gradient"></div>
                <img 
                  src={property.images?.[0]?.image_url || '/placeholder-property.jpg'} 
                  alt={property.title} 
                  onError={(e) => {
                    e.target.src = '/placeholder-property.jpg';
                  }}
                />
                <div className="appfeatured-card-overlay">
                  <span className="appfeatured-card-badge">
                    <FontAwesomeIcon icon={faGem} className="appfeatured-badge-icon" />
                    Nổi bật
                  </span>
                </div>
                <div className="appfeatured-property-type">
                  <FontAwesomeIcon icon={property.property_type === 'sell' ? faTag : property.property_type === 'rent' ? faKey : faBuilding} className="appfeatured-type-icon" />
                  {property.property_type === 'sell' ? 'Bán' : property.property_type === 'rent' ? 'Cho thuê' : 'Dự án'}
                </div>
              </div>
              <div className="appfeatured-card-content">
                <h3 className="appfeatured-card-title">{property.title}</h3>
                
                <div className="appfeatured-card-details">
                  <div className="appfeatured-detail-item appfeatured-card-price">
                    <FontAwesomeIcon icon={faMoneyBill} className="appfeatured-detail-icon" />
                    {formatPrice(property.price, property.property_type)}
                  </div>
                  <div className="appfeatured-detail-item appfeatured-card-area">
                    <FontAwesomeIcon icon={faRulerCombined} className="appfeatured-detail-icon" />
                    {property.area} m²
                  </div>
                </div>
                
                <div className="appfeatured-card-address">
                  <FontAwesomeIcon icon={faLocationDot} className="appfeatured-address-icon" />
                  <span>{property.address}</span>
                </div>
                
                <div className="appfeatured-trend">
                  <FontAwesomeIcon icon={faArrowTrendUp} className="appfeatured-trend-icon" />
                  <span>Vị trí đắc địa</span>
                </div>
                
                <button className="appfeatured-card-button">
                  Xem chi tiết
                  <FontAwesomeIcon icon={faArrowRight} className="appfeatured-button-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppFeaturedProp;
