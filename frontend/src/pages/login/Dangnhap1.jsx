import React, { useState } from 'react';
import '../../styles/reg.css';
import Logo from '../../components/logo.js';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaUser, FaLock, FaApple } from 'react-icons/fa';
import House from '../../components/house2.js';
import { Link } from 'react-router-dom';
import Register from '../register/Dangky1.jsx';
import Modal from '../../components/ui/modal-reg-log.jsx';
import Quenmatkhau from '../../components/ui/Quenmatkhau.jsx';
import { AuthContext } from '../../components/ui/context/AuthContext.jsx'; 
import { useContext } from 'react';

function Login({onClose}) {
  const { login } = useContext(AuthContext); // Lấy hàm login từ Context

  // State quản lý dữ liệu form
  const [formData, setFormData] = useState({
    phone: '',  
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // State quản lý modal
  const [isModalOpen, setIsModalOpen] = useState({
    register: false,
    forgotPassword: false,
  });

  const openModal = (type) =>
    setIsModalOpen((prev) => ({ ...prev, [type]: true }));
  const closeModal = (type) =>
    setIsModalOpen((prev) => ({ ...prev, [type]: false }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      if (value.includes('@')) {
        setFormData({ ...formData, email: value, phone: '' });
      } else {
        setFormData({ ...formData, phone: value, email: '' });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const phoneRegex = /^0\d{9,10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

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

    if (!formData.password) {
      setError('Vui lòng nhập mật khẩu.');
      setIsLoading(false);
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      setError('Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 số.');
      setIsLoading(false);
      return;
    }

    const payload = {
      login : formData.phone || formData.email,
      password: formData.password,
    };

    console.log('Dữ liệu đăng nhập:', payload);

    try {
      // Gọi hàm login từ AuthContext (đã được cập nhật ở phiên bản trước)
        await login(payload, () => onClose());

    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
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
        <h2><b>Đăng nhập để tiếp tục</b></h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Số điện thoại hoặc Email</label>
            <div className="input-container">
              <FaUser style={{ transform: 'scaleX(-1)' }} className="avatar-icon" />
              <input
                type="text"
                name="phone"
                value={formData.phone || formData.email}
                onChange={handleChange}
                placeholder="SĐT chính hoặc Email"
                required
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            {error && <p className="error">{error}</p>}
          </div>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Đang xử lý...' : 'Tiếp tục'}
          </button>
        </form>
        <div className="forgot-password-container">
          <span
            className="forgot-password"
            onClick={() => openModal('forgotPassword')}
          >
            Quên mật khẩu?
          </span>
        </div>
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

        <div className="register-link">
          <p>
            Bạn chưa là thành viên?{' '}
            <span
              className="register-link-text"
              onClick={() => openModal('register')}
            >
              Đăng ký tại đây
            </span>
          </p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen.register}
        onClose={() => closeModal('register')}
      >
        <Register />
      </Modal>
      
      <Modal
        isOpen={isModalOpen.forgotPassword}
        onClose={() => closeModal('forgotPassword')}
      >
        <Quenmatkhau onClose={() => closeModal('forgotPassword')} />
      </Modal>
    </div>
  );
}

export default Login;
