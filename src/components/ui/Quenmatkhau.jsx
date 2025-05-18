import React, { useState } from 'react'; // Thư viện React và hook useState
import '../../styles/reg.css'; // File CSS cho giao diện
import Logo from '../../components/logo.js'; // Component Logo hiển thị logo ứng dụng
import House from '../../components/house2.js'; // Component House hiển thị hình ngôi nhà
import { FaUser } from 'react-icons/fa'; // Icon FaUser cho input số điện thoại/email
import Otp from '../../components/ui/modal-otp.jsx'; // Component modal OTP
import CongratsModal from '../../pages/login/Chucmungchoquenmk.jsx'; // Component modal chúc mừng
import PasswordModal from '../../pages/register/PasswordCreationModal.jsx'; // Component modal nhập mật khẩu

function Quenmatkhau({ onClose }) {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
  });
  const [inputValue, setInputValue] = useState(''); // State để kiểm soát giá trị input
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isCongratsModalOpen, setIsCongratsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Xử lý thay đổi input số điện thoại hoặc email
  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    if (value.includes('@')) {
      setFormData({ phone: '', email: value });
    } else {
      setFormData({ phone: value, email: '' });
    }
    setError('');
  };

  // Xử lý gửi form để yêu cầu OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const phoneRegex = /^0\d{9,10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.phone && !formData.email) {
      setError('Vui lòng nhập số điện thoại hoặc email.');
      setIsLoading(false);
      return;
    }

    if (formData.phone && !phoneRegex.test(formData.phone)) {
      setError('Số điện thoại không hợp lệ. Phải bắt đầu bằng 0 và có 10-11 số.');
      setIsLoading(false);
      return;
    }

    if (formData.email && !emailRegex.test(formData.email)) {
      setError('Email không hợp lệ.');
      setIsLoading(false);
      return;
    }

    const payload = {
      phone: formData.phone || '',
      email: formData.email || '',
    };

    console.log('Dữ liệu quên mật khẩu:', payload);

    try {
      /*
      const response = await fetch('http://your-api-endpoint/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.success) {
        setIsOtpModalOpen(true);
      } else {
        setError(result.message || 'Không thể gửi OTP. Vui lòng thử lại.');
        setIsLoading(false);
        return;
      }
      */
      // Giả lập thành công
      setIsOtpModalOpen(true);
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu:', error);
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  // Xử lý xác nhận mã OTP
  const handleVerifyOtp = async (otpCode) => {
    setError('');
    setIsLoading(true);

    const payload = {
      phone: formData.phone || '',
      email: formData.email || '',
      otp: otpCode,
    };

    console.log('Dữ liệu OTP:', payload);

    try {
      /*
      const response = await fetch('http://your-api-endpoint/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.success) {
        setIsOtpModalOpen(false);
        setIsPasswordModalOpen(true);
      } else {
        setError(result.message || 'Mã OTP không hợp lệ.');
        setIsLoading(false);
        return;
      }
      */
      // Giả lập thành công
      setIsOtpModalOpen(false);
      setIsPasswordModalOpen(true);
    } catch (error) {
      console.error('Lỗi khi xác nhận OTP:', error);
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  // Xử lý gửi mật khẩu mới
  const handlePasswordSubmit = async (password) => {
    setError('');
    setIsLoading(true);

    const payload = {
      phone: formData.phone || '',
      email: formData.email || '',
      password,
    };

    console.log('Dữ liệu mật khẩu:', payload);

    try {
      /*
      const response = await fetch('http://your-api-endpoint/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.success) {
        setTempPassword(password);
        setIsPasswordModalOpen(false);
        setIsCongratsModalOpen(true);
      } else {
        setError(result.message || 'Không thể cập nhật mật khẩu.');
        setIsLoading(false);
        return;
      }
      */
      // Giả lập thành công
      setIsPasswordModalOpen(false);
      setIsCongratsModalOpen(true);
    } catch (error) {
      console.error('Lỗi khi gửi mật khẩu:', error);
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  // Xử lý đóng tất cả modal
  const handleCloseModal = () => {
    setIsOtpModalOpen(false);
    setIsPasswordModalOpen(false);
    setIsCongratsModalOpen(false);
    setInputValue('');
    onClose();
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
        <h2><b>Đặt lại mật khẩu</b></h2>
        <p>Nhập số điện thoại hoặc email để nhận mã OTP.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Số điện thoại hoặc Email</label>
            <div className="input-container">
              <FaUser style={{ transform: 'scaleX(-1)' }} className="avatar-icon" />
              <input
                type="text"
                name="phone"
                value={inputValue}
                onChange={handleChange}
                placeholder="SĐT chính hoặc Email"
                required
                disabled={isLoading}
              />
            </div>
            {error && <p className="error">{error}</p>}
          </div>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Đang xử lý...' : 'Gửi'}
          </button>
        </form>
      </div>

      {isOtpModalOpen && (
        <Otp
          data={formData}
          onVerify={handleVerifyOtp}
          onClose={handleCloseModal}
        />
      )}
      {isPasswordModalOpen && (
        <PasswordModal
          data={formData}
          onSubmit={handlePasswordSubmit}
          onClose={handleCloseModal}
        />
      )}
      {isCongratsModalOpen && (
        <CongratsModal onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Quenmatkhau;
