import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { format, set } from 'date-fns';
import Footer from '../../components/ui/parts/footer.jsx';
import styles from '../../styles/UserDashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollVertical, faNewspaper, faCirclePlus, faUser, faLandmark, faFire, faBars } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../components/logo.js';
import AccountTab from './AccountTab.jsx';
import PostCreate from '../../components/ui/postcreate/postcreate.jsx';
import PropertyManagement from './PropertyManangement.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config.js';
// // Mock data (replace with real API calls)

const mockNotifications = [
  { notification_id: 1, message: 'Hệ thống bảo trì 01/07/2025', created_at: '2025-06-04T10:00:00Z' },
  { notification_id: 2, message: 'Cập nhật chính sách giá mới', created_at: '2025-06-03T15:00:00Z' },
];

function UserDashboard() {
  const [propertiesCount, setPropertiesCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user_s = localStorage.getItem('user');
    if (!user_s) {
      console.error('User not found in localStorage');
      alert('Bạn cần đăng nhập để truy cập trang này.');
      navigate('/*');
      return;
    }

    let parsedUser;
    try {
      parsedUser = JSON.parse(user_s);
      setUser(parsedUser);
    } catch (err) {
      console.error('Error parsing user data:', err);
      alert('Dữ liệu người dùng không hợp lệ.');
      navigate('/*');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/properties/user/${parsedUser.user_id}`);
        const properties = response.data;
        console.log('Fetched properties:', properties);
        setPropertiesCount(properties.length);
        setNotifications(mockNotifications);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err);
        setError('Không thể tải dữ liệu. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup if needed
    };
  }, [navigate]);

  // Define tabs and filter based on user role
  const baseTabs = [
    { name: 'Tổng Quan', icon: faSquarePollVertical },
    { name: 'Tin Đăng', icon: faNewspaper },
    { name: 'Đăng Tin', icon: faCirclePlus },
    { name: 'Tài Khoản', icon: faUser },
    { name: 'Thanh Toán', icon: faLandmark },
  ];

  const tabs = user?.role === 'buyer' 
    ? baseTabs.filter(tab => tab.name !== 'Tin Đăng' && tab.name !== 'Đăng Tin')
    : baseTabs;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.userdashboardWrapper}>
      <Tab.Group>
        <div className={styles.udInnerWrapper}>
          <Tab.List className={styles.userdashboardTabList}>
            <button
              className={styles.userdashboardHamburger}
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <FontAwesomeIcon icon={faBars} size="lg" />
            </button>
            <Logo className={styles.userdashboardLogo} width={130} height={100} />
            <div className={`${styles.userdashboardMenu} ${isMenuOpen ? styles.userdashboardMenuOpen : ''}`}>
              <button
                className={styles.userdashboardHamburger}
                onClick={() => setIsMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faBars} size="lg" />
              </button>
              {tabs.map((tab) => (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    `${styles.userdashboardTab} ${selected ? styles.userdashboardTabSelected : ''}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={tab.icon} className='mr-3' size='1x' />
                  {tab.name}
                </Tab>
              ))}
            </div>
          </Tab.List>
          <Tab.Panels className={styles.userdashboardTabPanels}>
            <Tab.Panel className={styles.userdashboardPanel}>
              <div className={styles.userdashboardOverviewContainer}>
                <div className={styles.userdashboardSection}>
                  <h1 className={styles.userdashboardTabName}>Tổng quan</h1>
                  <hr />
                </div>
                <div className={styles.userdashboardSection}>
                  <h2 className={styles.userdashboardSectionTitle}>Tổng quan tài khoản</h2>
                  <div className={styles.userdashboardInfoBox}>
                    {loading ? (
                      <p>Đang tải...</p>
                    ) : error ? (
                      <p className={styles.userdashboardError}>{error}</p>
                    ) : (
                      <p>
                        Bạn hiện có <strong>{propertiesCount}</strong> tin đăng bất động sản.
                      </p>
                    )}
                  </div>
                </div>
                <div className={styles.userdashboardSection}>
                  <h2 className={styles.userdashboardSectionTitle}>Thông tin dành riêng cho bạn</h2>
                  <div className={styles.userdashboardSubSectionContainer}>
                    <div className={styles.userdashboardSubSection}>
                      <div className={styles.userdashboardInfoBox2}>
                        <div className={styles.fireiconbox}>
                          <FontAwesomeIcon icon={faFire} style={{ color: '#FF5733' }} size="1x" />
                          <h3 className={styles.userdashboardSubSectionTitle}>Quan Trọng</h3>
                        </div>
                        {loading ? (
                          <p>Đang tải...</p>
                        ) : error ? (
                          <p className={styles.userdashboardError}>{error}</p>
                        ) : notifications.length > 0 ? (
                          <ul className={styles.userdashboardNotificationList}>
                            {notifications.map((n) => (
                              <li key={n.notification_id} className={styles.userdashboardNotificationItem}>
                                <p>{n.message}</p>
                                <span className={styles.userdashboardNotificationDate}>
                                  {format(new Date(n.created_at), 'dd/MM/yyyy')}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>Không có thông báo quan trọng.</p>
                        )}
                      </div>
                    </div>
                    <div className={styles.userdashboardSubSection}>
                      <div className={styles.userdashboardInfoBox2}>
                        <h3 className={styles.userdashboardSubSectionTitle}>Gợi ý</h3>
                        <p>Chưa có gợi ý nào.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>
            {user.role !== 'buyer' && (
              <>
                <Tab.Panel className={styles.userdashboardPanel}>
                  <div className={styles.userdashboardPanelContent}>
                    <h2 className={styles.userdashboardTabName}>Tin Đăng</h2>
                    <hr />
                    <PropertyManagement />
                  </div>
                </Tab.Panel>
                <Tab.Panel className={styles.userdashboardPanel}>
                  <PostCreate />
                </Tab.Panel>
              </>
            )}
            <Tab.Panel className={styles.userdashboardPanel}>
              <AccountTab />
            </Tab.Panel>
            <Tab.Panel className={styles.userdashboardPanel}>
              <div className={styles.userdashboardPanelContent}>
                <h2 className={styles.userdashboardTabName}>Thanh Toán</h2>
                <p>Chức năng thanh toán sẽ sớm được cập nhật.</p>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
      <Footer />
    </div>
  );
}

export default UserDashboard;
