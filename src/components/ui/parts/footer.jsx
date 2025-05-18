import React, { useState } from 'react';
import '../../../styles/footer.css';
import Logo from '../../logo.js';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaLinkedinIn, 
  FaGlobe, 
  FaArrowUp,
  FaMapMarker,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer({
  logoWidth = 150,
  logoHeight = 60,
  address = 'Tòa Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP.HCM',
  socialLinks = {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
}) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Vui lòng nhập email hợp lệ.');
      setIsLoading(false);
      return;
    }

    const payload = { email };
    console.log('Dữ liệu đăng ký nhận tin:', payload);
    // Gửi yêu cầu đến API
    try {
      setMessage('Đăng ký nhận tin thành công!');
      setEmail('');
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu:', error);
      setMessage('Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
    setIsLoading(false);
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Cột 1: Logo và mô tả */}
        <div className="footer-column">
          <Logo width={logoWidth} height={logoHeight} />
          <p className="footer-description">
            DNK - Nền tảng tìm kiếm và đầu tư bất động sản hàng đầu Việt Nam.
          </p>
          
          <div className="language-selector">
            <FaGlobe className="language-icon" />
            <select className="language-dropdown">
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>

        {/* Cột 2: Thông tin liên hệ */}
        <div className="footer-column">
          <h3>Liên hệ</h3>
          <p><FaMapMarker /> {address}</p>
          <p><FaEnvelope /> contact@dnk.vn</p>
          <p><FaPhone /> 1900 1234</p>
        </div>

        {/* Cột 3: Liên kết nhanh */}
        <div className="footer-column">
          <h3>Liên kết nhanh</h3>
          <ul className="quick-links">
            <li><Link to="/du-an">Dự án nổi bật</Link></li>
            <li><Link to="/tin-tuc">Tin tức bất động sản</Link></li>
            <li><Link to="/huong-dan">Hướng dẫn đầu tư</Link></li>
            <li><Link to="/tien-ich">Tiện ích tính toán</Link></li>
            <li><Link to="/lien-he">Hỗ trợ khách hàng</Link></li>
          </ul>
        </div>

        {/* Cột 4: Đăng ký nhận tin */}
        <div className="footer-column">
          <h3>Đăng ký nhận tin</h3>
          <p>Nhận thông tin mới nhất về bất động sản!</p>
          <form className="subscribe-form" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Nhập email của bạn"
              disabled={isLoading}
              required
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? <span className="spinner">⌛</span> : 'Đăng ký'}
            </button>
            <div className="gdpr-consent">
              <input type="checkbox" id="gdpr-check" required />
              <label htmlFor="gdpr-check">
                Tôi đồng ý nhận thông tin theo <Link to="/gioithieu">chính sách bảo mật</Link>
              </label>
            </div>
          </form>
          {message && <p className={message.includes('thành công') ? 'success' : 'error'}>{message}</p>}
        </div>
      </div>

      {/* Bottom section */}
      <div className="footer-bottom">
        <div className="social-links">
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-icon facebook">
            <FaFacebookF />
          </a>
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-icon instagram">
            <FaInstagram />
          </a>
          <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="social-icon youtube">
            <FaYoutube />
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
            <FaLinkedinIn />
          </a>
        </div>
        
        <div className="certifications">
          <img src="/images/logo-dang-ky.png" alt="Đăng ký Bộ Công Thương" />
          <img src="/images/logo-bao-mat.png" alt="Bảo mật thông tin" />
        </div>
        
        <div className="nav-links">
          <Link to="/gioithieu">Giới thiệu</Link>
          <Link to="/gioithieu">Điều khoản</Link>
          <Link to="/gioithieu">Quy định</Link>
          <Link to="/gioithieu">Chính sách</Link>
        </div>
        
        <div className="copyright">
          <p>© 2025 DNK Real Estate. All rights reserved.</p>
        </div>
      </div>

      <button 
        className="back-to-top" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <FaArrowUp />
      </button>
    </footer>
  );
}

export default Footer;
