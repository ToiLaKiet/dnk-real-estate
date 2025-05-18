import React, { useState } from 'react';
import '../../styles/reg.css';
import Logo from '../../components/logo.js';
import House from '../../components/house.js';
import { FaArrowLeft } from 'react-icons/fa';

function AccountTypeModal({ data, onSubmit, onClose }) {
  const [accountType, setAccountType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accountType) {
      alert('Vui lòng chọn loại tài khoản.');
      return;
    }
    onSubmit(accountType); // Gửi accountType về Register.jsx
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
            <p>Vui lòng chọn để DNK Real Estate cung cấp trải nghiệm phù hợp nhất cho bạn</p>
            <p>Bạn muốn:</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
              <div className="account-type-buttons">
                <button
                    type="button"
                    className={`account-type-button ${accountType === 'tenant' ? 'selected' : ''}`}
                    onClick={() => setAccountType('tenant')}
                >
                    Mua/Thuê Bất Động Sản
                </button>
                <button
                    type="button"
                    className={`account-type-button ${accountType === 'landlord' ? 'selected' : ''}`}
                    onClick={() => setAccountType('landlord')}
                >
                    Bán/Cho Thuê Bất Động Sản
                </button>
                </div>
              </div>
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

export default AccountTypeModal;
