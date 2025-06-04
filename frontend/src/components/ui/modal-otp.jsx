import React, { useState, useRef } from 'react';
import '../../styles/reg.css';
import Logo from '../../components/logo.js';
import House from '../../components/house.js';
import { FaArrowLeft } from 'react-icons/fa';

function Otp({ data, onVerify, onClose }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // State cho 6 chữ số OTP
  const otpInputs = useRef([]); // Ref để quản lý các input OTP

  const handleOtpChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

    // Di chuyển con trỏ đến ô tiếp theo hoặc trước đó
      if (value && index < 5) {
        otpInputs.current[index + 1].focus();
      }

    // Xóa ô trước đó nếu người dùng xóa chữ số
      if (!value && index > 0) {
        otpInputs.current[index - 1].focus();
      }
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join(''); // Kết hợp 6 chữ số thành chuỗi
    if (otpCode.length === 6) {
      onVerify(otpCode); // Truyền otpCode qua callback onVerify
    } else {
      alert('Vui lòng nhập đầy đủ 6 chữ số OTP.');
    }
  };

  const handleResend = () => {
    // Logic gửi lại OTP (có thể gọi API)
    alert('Gửi lại mã OTP');
  };

  return (
    <div className="main-modal-overlay">
      <div className="main-modal-content">
        <div className="register-container">
          <div className="register-left">
            <Logo className="App-logo" width={200} />
            <House className="house" width={300} />
            <p className="decor-text">Tìm nhà dễ dàng, đầu tư vững vàng cùng DNK!</p>
          </div>
          <div className="register-right">
            <button onClick={onClose} className="back-button">
              <FaArrowLeft />
            </button>
            <h3>Nhập mã xác minh</h3>
            <p>
              Chúng tôi đã gửi mã xác minh gồm 6 chữ số tới số điện thoại{' '}
              <u>{data.phone}</u> qua tài khoản <b>Zalo</b> hoặc <b>SMS</b>
            </p>
            <div className="otp-group">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  ref={(el) => (otpInputs.current[index] = el)}
                  className="otp-input"
                />
              ))}
            </div>
            <p className="Hieuluc">Mã xác minh có hiệu lực trong vòng 5 phút</p>
            <p className="resend-otp">
              Bạn không nhận được mã? <span onClick={handleResend}>Gửi lại</span>
            </p>
            <button onClick={handleVerify} className="modal-button">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
