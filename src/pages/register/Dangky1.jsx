import React, { useState } from 'react';
import '../../styles/reg.css';
import Logo from '../../components/logo.js';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaPhone, FaApple } from 'react-icons/fa';
import House from '../../components/house.js';
import { Link } from 'react-router-dom';
import Otp from '../../components/ui/modal-otp.jsx';
import PasswordModal from './PasswordCreationModal.jsx';

function Register() {
  const [formData, setFormData] = useState({
    phone: '',
  });
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    console.log('Dữ liệu đăng ký:', formData);
    // Gọi API gửi OTP (nếu có)
    /*
    try {
      const response = await fetch('http://your-api-endpoint/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone }),
      });
      const result = await response.json();
      if (result.success) {
        setIsOtpModalOpen(true);
      } else {
        alert('Lỗi khi gửi OTP: ' + result.message);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
    */
    setIsOtpModalOpen(true);
  };

  const handleVerifyOtp = async (otpCode) => {
    console.log('Mã OTP:', otpCode);
    // Gọi API xác nhận OTP
    /*
    try {
      const response = await fetch('http://your-api-endpoint/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, otp: otpCode }),
      });
      const result = await response.json();
      if (result.success) {
        setIsOtpModalOpen(false);
        setIsPasswordModalOpen(true);
      } else {
        alert('Mã OTP không đúng.');
      }
    } catch (error) {
      console.error('Lỗi xác nhận OTP:', error);
      alert('Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
    */
    setIsOtpModalOpen(false); // Đóng modal OTP
    setIsPasswordModalOpen(true); // Mở modal mật khẩu
  };

  const handlePasswordSubmit = async (password) => {
    console.log('Dữ liệu đăng ký hoàn tất:', { phone: formData.phone, password });
    // Gọi API đăng ký tài khoản
    /*
    try {
      const response = await fetch('http://your-api-endpoint/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, password }),
      });
      const result = await response.json();
      if (result.success) {
        setIsPasswordModalOpen(false);
        // Chuyển hướng: navigate('/dashboard');
      } else {
        alert('Lỗi đăng ký: ' + result.message);
      }
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      alert('Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
    */
    setIsPasswordModalOpen(false); // Đóng modal mật khẩu
  };

  const handleCloseOtpModal = () => {
    setIsOtpModalOpen(false);
    setIsPasswordModalOpen(false);
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <Logo className="App-logo" width={200} />
        <House className="house" width={300} />
        <p className="decor-text">Tìm nhà dễ dàng, đầu tư vững vàng cùng DNK!</p>
      </div>
      <div className="register-right">
        <p className="greeting">Chúc bạn một ngày tốt lành!</p>
        <h2>
          <b>Đăng ký tài khoản mới</b>
        </h2>
        <form onSubmit={handleOTPSubmit}>
          <div className="form-group">
            <label>Số điện thoại</label>
            <div className="input-container">
              <FaPhone style={{ transform: 'scaleX(-1)' }} className="phone-icon" />
              <input
                type="tel"
                name="phone"
                minLength={10}
                maxLength={11}
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
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

      {/* Modal OTP */}
      {isOtpModalOpen && (
        <Otp data={formData} onVerify={handleVerifyOtp} onClose={handleCloseOtpModal} />
      )}
      {/* Modal Password */}
      {isPasswordModalOpen && (
        <PasswordModal
          data={formData}
          onSubmit={handlePasswordSubmit}
        />
      )}
    </div>
  );
}

export default Register;
