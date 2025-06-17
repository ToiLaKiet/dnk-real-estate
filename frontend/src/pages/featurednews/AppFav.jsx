import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config.js';
import '../../styles/AppFav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTag, 
  faRulerCombined, 
  faLocationDot, 
  faStar, 
  faMoneyBill,
  faKey,
  faChartLine, 
  faBuilding, 
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';


function AppFav() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Generate two random numbers between 1-100 for API query
  const getRandomParams = () => {
    const randomNum1 = Math.floor(Math.random() * 100) + 1;
    const randomNum2 = Math.floor(Math.random() * 100) + 1;
    return { param1: randomNum1, param2: randomNum2 };
  };

  // Fetch properties when component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const param1 = 0;
        const param2 = 4; // You can adjust this limit as needed
        const response = await axios.get(`${API_URL}/properties/?skip=${param1}&limit=${param2}`);
        setProperties(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch recommended properties:', err);
        setError('Không thể tải dữ liệu bất động sản.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Format price to VND
  const formatPrice = (price,type) => {
    if (type === 'rent') {
      return `${price.toLocaleString()} VND/tháng`;
    } else {
      return `${price.toLocaleString()} tỷ VND`;
    }
  };

  // Navigate to property detail page
  const handleCardClick = (propertyId) => {
    navigate(`/postspage/${propertyId}`);
  };

  return (
    <div className="appfav-container">
      <div className="appfav-header">
        <h2 className="appfav-title">Bất động sản dành cho bạn</h2>
        <p className="appfav-subtitle">
          Những lựa chọn phù hợp nhất dựa trên sở thích của bạn
        </p>
      </div>
      
      {loading ? (
        <div className="appfav-loading">Đang tải bất động sản...</div>
      ) : error ? (
        <div className="appfav-error">{error}</div>
      ) : properties.length === 0 ? (
        <div className="appfav-no-data">Không tìm thấy bất động sản phù hợp.</div>
      ) : (
        // In your component, update the card rendering:
        <div className="appfav-content">
          {properties.map((property) => (
            <div 
              key={property.property_id} 
              className="appfav-card" 
              onClick={() => handleCardClick(property.property_id)}
            >
              <div className="appfav-card-image">
                <img 
                  src={property.images?.[0]?.image_url || '/placeholder-property.jpg'} 
                  alt={property.title} 
                  onError={(e) => {
                    e.target.src = '/placeholder-property.jpg';
                  }}
                />
                <div className="appfav-card-overlay">
                  <span className="appfav-card-badge">
                    <FontAwesomeIcon icon={faStar} className="appfav-badge-icon" />
                    Đề xuất
                  </span>
                </div>
                <div className="appfav-property-type">
                  <FontAwesomeIcon icon={property.property_type === 'sell' ? faTag : property.property_type === 'rent' ? faKey : faBuilding} className="appfav-type-icon" />
                  {property.property_type === 'sell' ? 'Bán' : property.property_type === 'rent' ? 'Cho thuê' : 'Dự án'}
                </div>
              </div>
              <div className="appfav-card-content">
                <h3 className="appfav-card-title">{property.title}</h3>
                
                <div className="appfav-card-details">
                  <div className="appfav-detail-item appfav-card-price">
                    <FontAwesomeIcon icon={faMoneyBill} className="appfav-detail-icon" />
                    {formatPrice(property.price,property.property_type)}
                  </div>
                  <div className="appfav-detail-item appfav-card-area">
                    <FontAwesomeIcon icon={faRulerCombined} className="appfav-detail-icon" />
                    {property.area} m²
                  </div>
                </div>
                
                <div className="appfav-card-address">
                  <span>{property.address}</span>
                </div>
                
                <div className="appfav-trend">
                  <FontAwesomeIcon icon={faChartLine} className="appfav-trend-icon" />
                  <span>Xu hướng tăng</span>
                </div>
                
                <button className="appfav-card-button">
                  Xem chi tiết
                  <FontAwesomeIcon icon={faArrowRight} className="appfav-button-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppFav;
