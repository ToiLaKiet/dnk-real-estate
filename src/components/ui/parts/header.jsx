import React, { useState, useRef, useContext, useEffect } from 'react';
import Logo from '../../logo.js';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../modal-reg-log.jsx';
import Register from '../../../pages/register/Dangky1.jsx';
import Login from '../../../pages/login/Dangnhap1.jsx';
import styles from '../../../styles/header.module.css';
import PostCreate from '../postcreate/postcreate.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus, faBars } from '@fortawesome/free-solid-svg-icons';

function Header({ logoWidth = 180, logoHeight = 72 }) {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [modalState, setModalState] = useState({
    register: false,
    login: false,
    post: false,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openModal = (type) => {
    setModalState((prev) => ({ ...prev, [type]: true }));
    setIsMobileMenuOpen(false);
  };

  const closeModal = (type) => {
    setModalState((prev) => ({ ...prev, [type]: false }));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        
        {Logo ? (
          <Logo width={logoWidth} height={logoHeight} />
        ) : (
          <div className={styles.logoFallback}>Logo</div>
        )}
        
        <div className={`${styles.navSection} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <Link to="/nha-dat-ban" className={styles.navButton} onClick={() => setIsMobileMenuOpen(false)}>
            Nhà đất bán
          </Link>
          <Link to="/nha-dat-cho-thue" className={styles.navButton} onClick={() => setIsMobileMenuOpen(false)}>
            Nhà đất cho thuê
          </Link>
          <Link to="/du-an" className={styles.navButton} onClick={() => setIsMobileMenuOpen(false)}>
            Dự án
          </Link>
          <Link to="/tin-tuc" className={styles.navButton} onClick={() => setIsMobileMenuOpen(false)}>
            Tin tức
          </Link>
          <Link to="/gioithieu" className={styles.navButton} onClick={() => setIsMobileMenuOpen(false)}>
            Về chúng tôi
          </Link>
        </div>
      </div>
      
      <div className={styles.authSection}>
        {isAuthenticated ? (
          <>
            <Link to="/favourite-posts" className={styles.favouriteIcon}>
              <FontAwesomeIcon icon={faHeart} />
            </Link>
            <button
              className={styles.postButton}
              onClick={() => openModal('post')}
            >
              <FontAwesomeIcon icon={faPlus} className={styles.postButtonIcon} />
              <span className={styles.postButtonText}>Đăng tin</span>
            </button>
            <div className={styles.avatarContainer} ref={dropdownRef}>
              <img
                src={user?.avatar || 'https://via.placeholder.com/40'}
                alt="User Avatar"
                className={styles.avatar}
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <ul className={styles.dropdown}>
                  <li>
                    <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>
                      Trang cá nhân
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-posts" onClick={() => setIsDropdownOpen(false)}>
                      Bài đăng của tôi
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Đăng xuất</button>
                  </li>
                </ul>
              )}
            </div>
          </>
        ) : (
          <div className={styles.buttons}>
            <button
              className={styles.button}
              onClick={() => openModal('login')}
            >
              Đăng nhập
            </button>
            <button
              className={styles.button}
              onClick={() => openModal('register')}
            >
              Đăng ký
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {modalState.register && (
        <Modal isOpen={modalState.register} onClose={() => closeModal('register')}>
          <Register />
        </Modal>
      )}
      
      {modalState.login && (
        <Modal isOpen={modalState.login} onClose={() => closeModal('login')}>
          <Login onClose={() => closeModal('login')} />
        </Modal>
      )}
      
      {modalState.post && (
        <Modal isOpen={modalState.post} onClose={() => closeModal('post')}>
          <PostCreate onClose={() => closeModal('post')} />
        </Modal>
      )}
    </header>
  );
}

export default Header;
