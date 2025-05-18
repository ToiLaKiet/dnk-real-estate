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

// Đăng ký tài khoản mới
function Register() {
  const [formData, setFormData] = useState({
    phone: '',
  });
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

  // Xử lý gửi form để yêu cầu OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const phoneRegex = /^0\d{9,10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Số điện thoại không hợp lệ. Phải bắt đầu bằng 0 và có 10-11 số.');
      setIsLoading(false);
      return;
    }

    const payload = { phone: formData.phone };
    console.log('Dữ liệu đăng ký:', payload);

    try {
      /*
      const response = await fetch('http://your-api-endpoint/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.success) {
        setIsOtpModalOpen(true);
      } else {
        setError(result.message || 'Không thể gửi OTP.');
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
      phone: formData.phone,
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

  // Xử lý chọn loại tài khoản
  const handleAccountTypeSubmit = async (accountType) => {
    setError('');
    setIsLoading(true);
    console.log('Dữ liệu đăng ký hoàn tất:', {
      phone: formData.phone,
      password: tempPassword,
      accountType,
    });

    try {
      /*
      const response = await fetch('http://your-api-endpoint/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formData.phone,
          password: tempPassword,
          accountType,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setIsAccountTypeModalOpen(false);
        setIsCongratsModalOpen(true);
      } else {
        setError(result.message || 'Đăng ký thất bại.');
        setIsLoading(false);
        return;
      }
      */
      // Giả lập thành công
      setIsAccountTypeModalOpen(false);
      setIsCongratsModalOpen(true);
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
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
