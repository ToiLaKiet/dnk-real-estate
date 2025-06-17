import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/PropertyByLocation.css'; // Import your CSS styles

function PropertyByLocation() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const data = [
            { id: '79', name: 'TP. Hồ Chí Minh', posts: 10, image: 'https://res.cloudinary.com/df8ry7bhf/image/upload/v1750168701/tphcm-co-bao-nhieu-quan-huyen-va-thanh-pho_jqeycu.jpg' },
            { id: '01', name: 'Hà Nội', posts: 10, image: 'https://res.cloudinary.com/df8ry7bhf/image/upload/v1750168697/dia-diem-du-lich-o-ha-noi-1_ezf1pd.jpg' },
            { id: '74', name: 'Bình Dương', posts: 10, image: 'https://res.cloudinary.com/df8ry7bhf/image/upload/v1750177486/8-dia-diem-noi-tieng-binh-duong-1453_fhskge.webp' },
            { id: '48', name: 'Đà Nẵng', posts: 10, image: 'https://res.cloudinary.com/df8ry7bhf/image/upload/v1750177528/shutterstock_1741919756_resize_r7fhvz.jpg' },
            { id: '91', name: 'Kiên Giang', posts: 10, image: 'https://res.cloudinary.com/df8ry7bhf/image/upload/v1750179508/news00002_ediwqa.png' },
        ];
        setLocations(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch locations:', err);
        setError('Không thể tải dữ liệu.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleCardClick = (province) => {
    const matchedProvince = locations.find(p => p.name === province);
    console.log('Matched Province:', matchedProvince);
    console.log(matchedProvince.id)
    const searchData = {
        searchType:'sell',
        province: matchedProvince.id,
    }      
    // Chuyển object thành query string
    const queryString = new URLSearchParams(searchData).toString();
    navigate(`/nha-dat-ban?${queryString}`);
  };

//   const formatPosts = (posts) => {
//     return `${posts.toLocaleString()} tin đăng`;
//   };

  return (
    <div className="property-container" style={{ background: 'white' }}>
      <div className="property-header">
        <h2 className="property-title">Bất động sản theo địa điểm</h2>
        <p className="property-subtitle">
          Những lựa chọn phù hợp nhất dựa trên địa điểm của bạn
        </p>
      </div>
      
      {loading ? (
        <div className="property-loading">Đang tải dữ liệu...</div>
      ) : error ? (
        <div className="property-error">{error}</div>
      ) : locations.length === 0 ? (
        <div className="property-no-data">Không tìm thấy địa điểm phù hợp.</div>
      ) : (
        <div className="property-content">
          <div className="property-main-card">
            {locations.map((location, index) => 
              index === 0 && (
                <div 
                  key={location.id} 
                  className="property-card property-main" 
                  onClick={() => handleCardClick(location.name)}
                >
                  <div className="property-card-image">
                    <img 
                      src={location.image || '/placeholder-property.jpg'} 
                      alt={location.name} 
                      onError={(e) => { e.target.src = '/placeholder-property.jpg'; }}
                    />
                    <div className="property-card-info">
                      <div className="property-card-title-overlay">{location.name}</div>
                      {/* <div className="property-card-posts-overlay">{formatPosts(location.posts)}</div> */}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="property-side-cards">
            {locations.map((location, index) => 
              index > 0 && (
                <div 
                  key={location.id} 
                  className="property-card" 
                  onClick={() => handleCardClick(location.name)}
                >
                  <div className="property-card-image">
                    <img 
                      src={location.image || '/placeholder-property.jpg'} 
                      alt={location.name} 
                      onError={(e) => { e.target.src = '/placeholder-property.jpg'; }}
                    />
                    <div className="property-card-info">
                      <div className="property-card-title-overlay">{location.name}</div>
                      {/* <div className="property-card-posts-overlay">{formatPosts(location.posts)}</div> */}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyByLocation;
