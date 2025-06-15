import React, { useState } from 'react';
import '../../styles/reg.css';
import Logo from '../../components/logo.js';
import House from '../../components/house2.js';
import { FaUser } from 'react-icons/fa';
import Otp from '../../components/ui/modal-otp.jsx';
import CongratsModal from '../../pages/login/Chucmungchoquenmk.jsx';
import PasswordModal from '../../pages/register/PasswordCreationModal.jsx';
import axios from 'axios';
import Modal from '../../components/ui/modal-reg-log.jsx';
import { API_URL } from '../../config.js';
function Quenmatkhau({ onClose }) {
  const [formData, setFormData] = useState({ phone: '' });
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isCongratsModalOpen, setIsCongratsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Chỉ xử lý số điện thoại
  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({ phone: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const phoneRegex = /^0\d{9,10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      setError('Số điện thoại không hợp lệ. Phải bắt đầu bằng 0 và có 10-11 số.');
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        target_type: "phone",
        target: formData.phone,
      };
      const result = await axios.post(API_URL+'/otp/send-forgot-password', payload);
      console.log('Kết quả gửi yêu cầu:', result.data);
      setIsOtpModalOpen(true);
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu:', error);
      alert(error.response?.data?.detail || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
    setIsLoading(false);
  };

  const handleVerifyOtp = async (otpCode) => {
    setError('');
    setIsLoading(true);
    const payload = {
      target_type: 'phone',
      target: formData.phone,
      otp_code: otpCode,
    };

    try {
      // API xác thực OTP (bạn có thể gắn lại khi cần)
      const result = await axios.post(API_URL+'/otp/verify', payload)
      console.log('Kết quả xác thực OTP:', result.data);
      setIsPasswordModalOpen(true);
    } catch (error) {
      console.error('Lỗi xác thực OTP:', error);
      alert(error.response?.data?.detail || 'Mã OTP không hợp lệ hoặc đã hết hạn.');
      setError('Mã OTP không hợp lệ hoặc hết hạn.');
    }
    setIsLoading(false);
  };

  const handlePasswordSubmit = async (password) => {
    setError('');
    setIsLoading(true);

    const payload = {
      phone_number: formData.phone,
      new_password: password,
    };

    try {
      // API đặt lại mật khẩu (giả lập thành công)
      const result = await axios.put(API_URL+'/users/forget-password', payload)
      console.log('Kết quả đặt lại mật khẩu:', result.data);
      handleCloseModal('password');
      onClose();
      setIsCongratsModalOpen(true);
    } catch (error) {
      console.error('Lỗi gửi mật khẩu:', error);
      alert(error.response?.data?.detail || 'Không thể cập nhật mật khẩu. Vui lòng thử lại.');
      setError('Không thể cập nhật mật khẩu.');
    }
    setIsLoading(false);
  };

  const handleCloseModal = (type) => {
    if (type === 'otp') {
      setIsOtpModalOpen(false);
    } else
    if (type === 'password') {
      setIsPasswordModalOpen(false);
    } else 
    if (type === 'congrats') {
      setIsCongratsModalOpen(false);
      setFormData({ phone: '' });
      onClose();  
    }
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
        <p>Nhập số điện thoại để nhận mã OTP.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Số điện thoại</label>
            <div className="input-container">
              <FaUser style={{ transform: 'scaleX(-1)' }} className="avatar-icon" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
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
          onClose={()=>handleCloseModal('otp')}
        />
      )}

      {isPasswordModalOpen && (
        <PasswordModal
          data={formData}
          onSubmit={handlePasswordSubmit}
          onClose={()=>handleCloseModal('password')}
        />
      )}
      {isCongratsModalOpen && (
        <Modal>
          <CongratsModal 
          onClose={()=>handleCloseModal('congrats')} />
        </Modal>
      )}
    </div>
  );
}

export default Quenmatkhau;
