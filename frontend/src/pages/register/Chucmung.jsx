import '../../styles/reg.css';
import React, { useEffect } from 'react';
import Logo from '../../components/logo.js';
import House from '../../components/house.js';
import ChucMung1 from '../../components/image/chúcmừng-1.js';


function CongratsModal({ onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
        }, [onClose]);
  return (
    <div className="modal-overlay">
      <div className="modal-content congrats-modal">
        <div className="register-container">
        <div className="register-left">
            <Logo className="App-logo" width={200} />
            <House className="house" width={300} />
            <p className="decor-text">Tìm nhà dễ dàng, đầu tư vững vàng cùng DNK!</p>
          </div>
          <div className="register-right">
        <div className="congrats-image">
            <ChucMung1 />
        </div>
        <h3 className="congrats-text">
        Bạn đã đăng ký tài khoản thành công!
        <br></br>Chào mừng bạn đến với DNK Real Estate</h3>
        </div>
        </div>
      </div>
    </div>
  );
}

export default CongratsModal;
