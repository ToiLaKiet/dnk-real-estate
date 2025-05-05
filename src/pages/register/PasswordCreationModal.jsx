//DANGKY3
import React, { useState } from 'react';
import '../../styles/reg.css';
import Logo from '../../components/logo.js';
import House from '../../components/house.js';
import { FaArrowLeft, FaLock } from 'react-icons/fa';

function PasswordModal({ data, onSubmit, onClose }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [requirements, setRequirements] = useState({
    minLength: false,
    uppercase: false,
    number: false,
  });

  const checkPassword = (value) => {
    setRequirements({
      minLength: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      number: /\d/.test(value),
    });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    checkPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!requirements.minLength) {
      setError('Mật khẩu phải có ít nhất 8 ký tự.');
      return;
    }
    if (!requirements.uppercase) {
      setError('Mật khẩu phải chứa ít nhất 1 ký tự viết hoa.');
      return;
    }
    if (!requirements.number) {
      setError('Mật khẩu phải chứa ít nhất 1 ký tự số.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    setError('');
    console.log('Dữ liệu mật khẩu:', { phone: data.phone, password });
    onSubmit(password); // Gửi mật khẩu về Register.jsx
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
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
            <h3>Thiết lập mật khẩu</h3>
            <p>Nhập mật khẩu cho số điện thoại <u>{data.phone}</u></p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
              <label>Mật khẩu</label>
                    <div className="input-container">
                        <FaLock className="lock-icon" />
                        <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Nhập mật khẩu"
                        required
                        />
                </div>
              </div>
              <div className="form-group">
              <label>Xác nhận mật khẩu</label>
                <div className="input-container">
                        <FaLock className="lock-icon" />
                        <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu"
                        required
                        />
                </div>
              </div>
              <ul className="password-requirements">
                <li
                  className={`password-requirement ${requirements.minLength ? 'met' : ''}`}
                >
                  <span className="password-requirement-icon">
                    {requirements.minLength ? '✅' : '•'}
                  </span>
                  Mật khẩu tối thiểu 8 ký tự
                </li>
                <li
                  className={`password-requirement ${requirements.uppercase ? 'met' : ''}`}
                >
                  <span className="password-requirement-icon">
                    {requirements.uppercase ? '✅' : '•'}
                  </span>
                  Chứa ít nhất 1 ký tự viết hoa
                </li>
                <li
                  className={`password-requirement ${requirements.number ? 'met' : ''}`}
                >
                  <span className="password-requirement-icon">
                    {requirements.number ? '✅' : '•'}
                  </span>
                  Chứa ít nhất 1 ký tự số
                </li>
              </ul>
              {error && <p className="error">{error}</p>}
              <button type="submit" className="modal-button">
                Xác nhận
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordModal;
