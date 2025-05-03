// src/app.js
import './styles/App.css';
import Logo from './components/logo.js';
import Register from './pages/register/Dangky1.jsx';
import Login from './pages/login/Dangnhap1.jsx';
import Gioithieu from './pages/terms/Gioithieu.jsx';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Modal from './components/ui/modal-reg-log.jsx';
import Searchbar1 from './components/Searchbar1.js';
import Searchbar2 from './components/Searchbar2.js';
import Searchbar3 from './components/Searchbar3.js';
import Searchbar4 from './components/Searchbar4.js';
import SearchEngine from './components/ui/search-engine.jsx'; // Import SearchEngine

function App() {
  const [modalState, setModalState] = useState({
    register: false,
    login: false,
  });

  const openModal = (type) =>
    setModalState((prev) => ({ ...prev, [type]: true }));
  const closeModal = (type) =>
    setModalState((prev) => ({ ...prev, [type]: false }));

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex-box">
            <header className="App-header">
              <Logo width={180} height={72} />
              <div className="header-buttons">
                <button
                  className="register-login-button"
                  onClick={() => openModal('login')}
                >
                  Đăng nhập
                </button>
                <button
                  className="register-login-button"
                  onClick={() => openModal('register')}
                >
                  Đăng ký
                </button>
              </div>
            </header>

            <div className="content">
              <div className="App-banner">
                <div className="Searchbar1">
                  <Searchbar1 />
                </div>
                <div className="Searchbar2">
                  <Searchbar2 />
                </div>
                <div className="Searchbar4">
                  <Searchbar4 />
                </div>
                <div className="Searchbar3">
                  <Searchbar3 />
                </div>
                {/* Thêm SearchEngine vào đây */} 
                  <SearchEngine />
              </div>
            </div>

            <Modal isOpen={modalState.register} onClose={() => closeModal('register')}>
              <Register />
            </Modal>

            <Modal isOpen={modalState.login} onClose={() => closeModal('login')}>
              <Login />
            </Modal>
          </div>
        }
      />
      <Route path="/gioithieu" element={<Gioithieu />} />
      <Route path="/home" element={<App />} />
    </Routes>
  );
}

export default App;
