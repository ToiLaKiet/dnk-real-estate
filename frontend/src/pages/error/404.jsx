import React from 'react';
import './404.css';
import Logo from '../../components/logo'; // Adjust the path to your logo image

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="stars"></div>
      <div className="content-404">
        {/* Logo section */}
        <div className="logo-section">
          <div className="logo-placeholder">
            {/* Replace with your actual logo */}
            <Logo/>
            <br></br>
            {/* Or use text logo if no image */}
            <div className="text-logo">DNK Real Estate</div>
          </div>
        </div>
        
        <div className="error-code">
          <span className="four">4</span>
          <span className="zero">0</span>
          <span className="four">4</span>
        </div>
        
        <div className="astronaut">
          <div className="astronaut-body">
            <div className="helmet"></div>
            <div className="body"></div>
            <div className="arm left"></div>
            <div className="arm right"></div>
            <div className="leg left"></div>
            <div className="leg right"></div>
          </div>
        </div>
        
        <h1 className="title-404">Bị lỗi rồi bạn ơi !!</h1>
        <p className="message-404">
          Bọn tôi vẫn đang tìm bạn ở đâu đó trong vũ trụ này.
        </p>
        
        <button className="home-button-404" onClick={() => window.location.href = '/'}>
          <span>Về trang chủ thôi nào!</span>
          <div className="rocket">🚀</div>
        </button>
      </div>
      
      <div className="floating-elements">
        <div className="planet planet-1"></div>
        <div className="planet planet-2"></div>
        <div className="satellite"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
