import React, { useState } from 'react'; // Thư viện React và hook useState
import '../../styles/reg.css'; // File CSS cho giao diện
import Logo from '../../components/logo.js'; // Component Logo hiển thị logo ứng dụng
import { FcGoogle } from 'react-icons/fc'; // Icon Google cho nút đăng nhập
import { FaFacebook, FaPhone, FaApple } from 'react-icons/fa'; // Icon Facebook, Phone, Apple
import House from '../../components/house.js'; // Component House hiển thị hình ngôi nhà
import { Link } from 'react-router-dom'; // Link để điều hướng tới trang khác
import Otp from '../../components/ui/modal-otp.jsx'; // Component modal OTP
import PasswordModal from './PasswordCreationModal.jsx'; // Component modal nhập mật khẩu
import AccountTypeModal from './AccountTypeModal.jsx'; // Component modal chọn loại tài khoản
import CongratsModal from './Chucmung.jsx'; // Component modal chúc mừng
import axios from 'axios'; // Thư viện axios để gửi yêu cầu HTTP
// Đăng ký tài khoản mới
function Register() {
  const [formData, setFormData] = useState({
    phone: '',
  });
  const API_URL = 'http://172.16.2.34:8080'
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isAccountTypeModalOpen, setIsAccountTypeModalOpen] = useState(false);
  const [isCongratsModalOpen, setIsCongratsModalOpen] = useState(false);
  const [tempPassword, setTempPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Xử lý thay đổi input số điện thoại
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const phoneRegex = /^0\d{9,10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Số điện thoại không hợp lệ. Phải bắt đầu bằng 0 và có 10-11 số.');
      setIsLoading(false);
      return;
    }
  
    try {
      const payload = {
        target_type: "phone",
        target: formData.phone,
      };
  
      const result = await axios.post(API_URL+'/otp/send', payload);
      console.log('Kết quả gửi OTP:', result.data);
  
      // Nếu không có lỗi, mở modal OTP
      setIsOtpModalOpen(true);
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu:', error.response?.data?.detail || error);
      alert(error.response?.data?.detail || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
  
    setIsLoading(false);
  };
  
  // Xử lý xác nhận mã OTP
  const handleVerifyOtp = async (otpCode) => {
    setError('');
    setIsLoading(true);
  
    const payload = {
      target_type: 'phone',
      target: formData.phone,
      otp_code: otpCode,
    };
  
    console.log('Dữ liệu OTP:', payload);
  
    try {
      const otp_recieved = await axios.post(API_URL+'/otp/verify', payload);
      console.log('Kết quả xác nhận OTP:', otp_recieved);
      // ✅ Use .data.detail, not .detail directly
      if (otp_recieved.data) {
        setIsOtpModalOpen(false);
        setIsPasswordModalOpen(true);
      }
    } catch (error) {
      console.error('Lỗi khi xác nhận OTP:', error.response.data.detail || error);
      alert(error.response.data.detail)
      // Nếu có lỗi, hiển thị thông báo lỗi

      setIsLoading(false);
      return;
    }
  
    setIsLoading(false);
  };
  

  // Xử lý gửi mật khẩu
  const handlePasswordSubmit = async (password) => {
    setError('');
    setIsLoading(true);
    try {
      setTempPassword(password);
      setIsPasswordModalOpen(false);
      setIsAccountTypeModalOpen(true);
    } catch (error) {
      console.error('Lỗi khi gửi mật khẩu:', error);
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  const handleAccountTypeSubmit = async (accountType) => {
    setError('');
    setIsLoading(true);
    
    console.log('Dữ liệu đăng ký hoàn tất:', {
      phone_number: formData.phone,
      role: accountType,
      password: tempPassword,
    });
  
    try {
      const response = await axios.post(
        API_URL+'/users/register',
        {
          phone_number: formData.phone,
          role: accountType,
          password: tempPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const result = response.data;
      console.log('Kết quả đăng ký:', result);
  
      if (result.detail === undefined || result.detail === null) {
        setIsAccountTypeModalOpen(false);
        setIsCongratsModalOpen(true);
      } else {
        alert(result.detail.message || 'Đăng ký thất bại.');
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.error('Lỗi đăng ký:', error.response?.data?.detail?.message );
      alert(error.response?.data?.detail?.message || 'Đăng ký thất bại.');
      setIsLoading(false);
      return;
    }
  
    setIsLoading(false);
  };
  

  // Xử lý đóng tất cả modal
  const handleCloseModal = () => {
    setIsOtpModalOpen(false);
    setIsPasswordModalOpen(false);
    setIsAccountTypeModalOpen(false);
    setIsCongratsModalOpen(false);
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
                disabled={isLoading}
              />
            </div>
            {error && <p className="error">{error}</p>}
          </div>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Đang xử lý...' : 'Tiếp tục'}
          </button>
        </form>
        <div className="cross-bar">
          <span>Hoặc</span>
        </div>
        <button className="google-button" disabled={isLoading}>
          <FcGoogle style={{ marginRight: '10px' }} /> Đăng nhập với Google
        </button>
        <button className="facebook-button" disabled={isLoading}>
          <FaFacebook style={{ marginRight: '10px' }} /> Đăng nhập với Facebook
        </button>
        <button className="apple-button" disabled={isLoading}>
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
        <Otp
          data={formData}
          onVerify={handleVerifyOtp}
          onClose={handleCloseModal}
        />
      )}

      {/* Modal Password */}
      {isPasswordModalOpen && (
        <PasswordModal
          data={formData}
          onSubmit={handlePasswordSubmit}
          onClose={handleCloseModal}
        />
      )}

      {/* Modal Account Type */}
      {isAccountTypeModalOpen && (
        <AccountTypeModal
          data={formData}
          onSubmit={handleAccountTypeSubmit}
          onClose={handleCloseModal}
        />
      )}

      {/* Modal Congrats */}
      {isCongratsModalOpen && (
        <CongratsModal onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Register;
