import React, { useState, useRef } from 'react';
import '../../styles/reg.css';
import Logo from '../../components/logo.js';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';
import House from '../../components/house.js';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Register() {
  const [formData, setFormData] = useState({
    phone: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // State cho 6 chữ số OTP
  const otpInputs = useRef([]); // Ref để quản lý các input OTP

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOtpChange = (index, value) => {
    // Chỉ cho phép nhập 1 chữ số
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Tự động chuyển focus
      if (value && index < 5) {
        otpInputs.current[index + 1].focus();
      }
      if (!value && index > 0) {
        otpInputs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dữ liệu đăng ký:', formData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOtp(['', '', '', '', '', '']); // Reset OTP khi đóng
  };

  const handleVerifyOtp = () => {
    const otpCode = otp.join('');
    console.log('Mã OTP:', otpCode);
    // Xử lý xác nhận OTP (gọi API nếu cần)
    // Ví dụ:
    // try {
    //   const response = await fetch('http://your-api-endpoint/api/verify-otp', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ phone: formData.phone, otp: otpCode }),
    //   });
    //   const result = await response.json();
    //   console.log('Kết quả xác nhận:', result);
    // } catch (error) {
    //   console.error('Lỗi xác nhận OTP:', error);
    // }
    handleCloseModal(); // Đóng modal sau khi xác nhận
  };

  const handleBack = () => {
    setIsModalOpen(false); // Đóng modal để quay lại form đăng ký
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
        <h2><b>Đăng ký tài khoản mới</b></h2>
        <form onSubmit={handleSubmit}>
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
      {isModalOpen && (
      <div className="modal-overlay">
          <div className="modal-content">
          <div className="register-container">
            <div className="register-left">
              <Logo className="App-logo" width={200} />
              <House className="house" width={300} />
              <p className="decor-text">Tìm nhà dễ dàng, đầu tư vững vàng cùng DNK!</p>
            </div>
          <div className="register-right">
            <button onClick={handleBack} className="back-button">
              <FaArrowLeft />
            </button>
                <h3>Nhập mã xác minh</h3>
                <p>Chúng tôi đã gửi mã xác minh gồm 6 chữ số tới số điện thoại <u>{formData.phone}</u> qua tài khoản <b>Zalo</b> hoặc <b>SMS</b></p>
                <div className="otp-group">
                  {otp.map((digit, index) => (
                    <React.Fragment key={index}>
                      <input
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        ref={(el) => (otpInputs.current[index] = el)}
                        className="otp-input"
                      />
                    </React.Fragment>
                  ))}
                </div>

                  <p className='Hieuluc'>
                    Mã xác minh có hiệu lực trong vòng 5 phút
                  </p>
                  <p className="resend-otp">
                    Bạn không nhận được mã? <span onClick={() => alert('Gửi lại mã OTP')}>Gửi lại</span>
                  </p>
                <button onClick={handleVerifyOtp} className="modal-button">
                  Xác nhận
                </button>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Register;
