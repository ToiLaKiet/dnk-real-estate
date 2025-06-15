import React from 'react';
import '../../styles/App.css';
import { useNavigate } from 'react-router-dom';
import c1 from '../../assets/c2.png';
import c3 from '../../assets/tintuc.png';
import c2 from '../../assets/c3.png';
import c4 from '../../assets/c4.png';

function AppBa() {
  const navigate = useNavigate();
  return (
    <div className="appba-container">
      <div className="appba-header">
        <h2 className="appba-title">Khám phá Bất động sản</h2>
        <p className="appba-subtitle">
          Tìm kiếm và khám phá những cơ hội đầu tư bất động sản tốt nhất
        </p>
      </div>
      
      <div className="appba-content">
        <div className="appba-card">
          <div className="appba-card-image">
            <img src={c1} alt="Bất động sản cao cấp" />
            <div className="appba-card-overlay">
              <span className="appba-card-badge">Nổi bật</span>
            </div>
          </div>
          <div className="appba-card-content">
            <h3 className="appba-card-title">Bất động sản bán</h3>
            <p className="appba-card-description">
            Bạn có thể tìm thấy ngôi nhà mơ ước hoặc cơ hội đầu tư hấp dẫn thông qua lượng tin rao lớn, uy tín về các loại hình bất động sản bán tại Việt Nam, bao gồm bán nhà riêng, bán biệt thự mặt tiền, bán căn hộ chung cư, bán biệt thự, bán đất, bán Shophouse hình BĐS khác.
            </p>
            <button className="appba-card-button" onClick={()=>navigate('/nha-dat-ban')}>
              Tìm hiểu thêm
              <svg className="appba-button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="appba-card">
          <div className="appba-card-image">
            <img src={c4} alt="Đầu tư thông minh" />
            <div className="appba-card-overlay">
              <span className="appba-card-badge trending">Xu hướng</span>
            </div>
          </div>
          <div className="appba-card-content">
            <h3 className="appba-card-title">Bất động sản cho thuê</h3>
            <p className="appba-card-description">
            Cập nhật thường xuyên và đầy đủ các loại hình bất động sản cho thuê như: thuê phòng trọ, nhà riêng, thuê biệt thự , văn phòng, kho xưởng hay thuê mặt bằng kinh doanh giúp bạn nhanh chóng tìm được bất động sản ưng ý.
            </p>
            <button className="appba-card-button"  onClick={()=>navigate('/nha-dat-cho-thue')}>
              Tìm hiểu thêm
              <svg className="appba-button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="appba-card">
          <div className="appba-card-image">
            <img src={c2} alt="Hỗ trợ chuyên nghiệp" />
            <div className="appba-card-overlay">
              <span className="appba-card-badge premium">Premium</span>
            </div>
          </div>
          <div className="appba-card-content">
            <h3 className="appba-card-title">Dự án</h3>
            <p className="appba-card-description">
            Các dự án cung cấp góc nhìn khách quan của các chuyên gia về những dự án nổi bật tại Việt Nam, giúp bạn đưa ra quyết định đúng đắn cho nơi an cư lý tưởng hoặc cơ hội đầu tư sinh lời.
            </p>
            <button className="appba-card-button" onClick={()=>navigate('/du-an')} >
              Tìm hiểu thêm
              <svg className="appba-button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="appba-card">
          <div className="appba-card-image">
            <img src={c3} alt="Hỗ trợ chuyên nghiệp" />
            <div className="appba-card-overlay">
              <span className="appba-card-badge premium">Premium</span>
            </div>
          </div>
          <div className="appba-card-content">
            <h3 className="appba-card-title">Tin tức Bất Động Sản</h3>
            <p className="appba-card-description">
            Ngoài cập nhật những biến động thị trường, chúng tôi còn cung cấp kiến ​​thức, kinh nghiệm về mua bán, cho thuê, đầu tư, vay mua nhà, phong thủy, thiết kế nhà, mọi thông tin cần thiết để dẫn lối người tìm nhà tìm thấy căn nhà mơ ước.
            </p>
            <button className="appba-card-button" onClick={()=>navigate('/tin-tuc')}>
              Tìm hiểu thêm
              <svg className="appba-button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>

      <div className="appba-stats">
        <div className="appba-stat-item">
          <div className="appba-stat-number">1000+</div>
          <div className="appba-stat-label">Bất động sản</div>
        </div>
        <div className="appba-stat-item">
          <div className="appba-stat-number">500+</div>
          <div className="appba-stat-label">Khách hàng</div>
        </div>
        <div className="appba-stat-item">
          <div className="appba-stat-number">95%</div>
          <div className="appba-stat-label">Hài lòng</div>
        </div>
        <div className="appba-stat-item">
          <div className="appba-stat-number">24/7</div>
          <div className="appba-stat-label">Hỗ trợ</div>
        </div>
      </div>
    </div>
  );
}

export default AppBa;
