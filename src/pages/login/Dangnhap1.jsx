// pages/register/Login.jsx
import React, { useState } from 'react';
import '../../styles/reg.css';
import Logo from '../../components/logo.js';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';
import House from '../../components/house2.js';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Nếu input là "phone", kiểm tra xem giá trị là email hay SĐT
    if (name === 'phone') {
      if (value.includes('@')) {
        setFormData({ ...formData, email: value, phone: '' });
      } else {
        setFormData({ ...formData, phone: value, email: '' });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Nếu muốn gửi dữ liệu lên server, thì thêm code ở đây
    // try {
    //   const response = await fetch('http://your-api-endpoint/api/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   const result = await response.json();
    //   console.log('Phản hồi từ server:', result);
    //   // Xử lý tiếp (ví dụ: lưu token, chuyển trang)
    // } catch (error) {
    //   console.error('Lỗi khi gửi dữ liệu:', error);
    // }
  };

  return (
    <div className="register-container">
      {/* Phần bên trái - Logo/Trang trí */}
      <div className="register-left">
        <Logo className="App-logo" width={200} />
        <House className="house" width={300} />
        <p className="decor-text">Tìm nhà dễ dàng, đầu tư vững vàng cùng DNK!</p>
      </div>

      {/* Phần bên phải - Form */}
      <div className="register-right">
        <p className="greeting">Chúc bạn một ngày tốt lành!</p>
        <h2><b>Đăng nhập để tiếp tục</b></h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Số điện thoại hoặc Email</label>
            <div className="input-container">
              <FaUser style={{ transform: 'scaleX(-1)' }} className="avatar-icon" />
              <input
                type="text"
                name="phone"
                value={formData.phone || formData.email} // Hiển thị phone nếu có, không thì email
                onChange={handleChange}
                placeholder="SĐT chính hoặc Email"
                required
              />
            </div>

            <label>Mật khẩu</label>
            <div className="input-container">
              <FaLock style={{ transform: 'scaleX(-1)' }} className="lock-icon" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
          </div>
          <button type="submit" className="submit-button">
            Tiếp tục
          </button>
        </form>

        <div className="cross-bar">
          <span>Hoặc</span>
        </div>

        <button className="google-button">
          <FcGoogle style={{ marginRight: '10px' }} /> Đăng nhập với Google
        </button>
        <button className="facebook-button">
          <FaFacebook style={{ marginRight: '10px' }} /> Đăng nhập với Facebook
        </button>
        <button className="apple-button">
          <FaApple style={{ marginRight: '10px' }} /> Đăng nhập với Apple
        </button>

        <div className="terms">
          <p>
            Bằng việc tiếp tục, bạn đồng ý với{' '}
            <Link to="/gioithieu">
              Điều khoản sử dụng, Chính sách bảo mật, Quy chế, Chính sách
            </Link>{' '}
            của chúng tôi
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default Login;
