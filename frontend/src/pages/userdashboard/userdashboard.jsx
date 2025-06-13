import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { format } from 'date-fns';
import Footer from '../../components/ui/parts/footer.jsx';
import styles from '../../styles/UserDashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollVertical, faNewspaper, faCirclePlus, faUser, faLandmark, faFire, faBars } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../components/logo.js';
import { useAuth } from '../../components/ui/context/AuthContext.jsx';
import AccountTab from './AccountTab.jsx';
import PostCreate from '../../components/ui/postcreate/postcreate.jsx';
import PropertyManagement from './PropertyManangement.jsx';
import { useNavigate } from 'react-router-dom';
// Mock data (replace with real API calls)
const mockProperties = [
  { property_id: 1, title: 'Căn hộ Quận 7', posted_by: 100, is_active: true, created_at: '2025-06-04T12:00:00Z' },
  { property_id: 2, title: 'Nhà phố Quận 1', posted_by: 101, is_active: true, created_at: '2025-06-03T12:00:00Z' },
  { property_id: 3, title: 'Biệt thự Phú Mỹ Hưng', posted_by: 100, is_active: true, created_at: '2025-06-02T12:00:00Z' },
  { property_id: 4, title: 'Đất nền Hà Nội', posted_by: 102, is_active: false, created_at: '2025-06-01T12:00:00Z' },
  { property_id: 5, title: 'Căn hộ Cầu Giấy', posted_by: 100, is_active: true, created_at: '2025-05-31T12:00:00Z' },
];

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
  const navigate = useNavigate();
  // Mock user_id (replace with useAuth hook)
  const user_id = 100;

  useEffect(() => {
    const {user} = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : {};
    if (!user || !user.user_id) {
      console.error('User not found in localStorage');
      // Redirect to home if user is not logged in
      alert('Bạn cần đăng nhập để truy cập trang này.');
      navigate('/*');
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        // Mock API: Fetch properties
        const properties = mockProperties;
        const userProperties = properties.filter(
          (p) => p.posted_by === user_id && p.is_active
        );
        setPropertiesCount(userProperties.length);

        // Mock API: Fetch notifications
        setNotifications(mockNotifications);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err);
        setError('Không thể tải dữ liệu. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const tabs = [
    { name: 'Tổng Quan', icon: faSquarePollVertical },
    { name: 'Tin Đăng', icon: faNewspaper },
    { name: 'Đăng Tin', icon: faCirclePlus },
    { name: 'Tài Khoản', icon: faUser },
    { name: 'Thanh Toán', icon: faLandmark },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.userdashboardWrapper}>
      <Tab.Group>
        <div className={styles.udInnerWrapper}>
          <Tab.List className={styles.userdashboardTabList}>
            {/* Hamburger Button for Mobile */}
            <button
              className={styles.userdashboardHamburger}
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <FontAwesomeIcon icon={faBars} size="lg" />
            </button>
            {/* Logo Section */}
            <Logo className={styles.userdashboardLogo} width={130} height={100} />
            {/* Tabs Menu */}
            <div className={`${styles.userdashboardMenu} ${isMenuOpen ? styles.userdashboardMenuOpen : ''}`}>
                  <button
                    className={styles.userdashboardHamburger}
                    onClick={() => setIsMenuOpen(false)} // Close menu on tab click
                    >
                    <FontAwesomeIcon icon={faBars} size="lg" />
                  </button>
              {tabs.map((tab) => (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    `${styles.userdashboardTab} ${selected ? styles.userdashboardTabSelected : ''}`
                  }
                  onClick={() => setIsMenuOpen(false)} // Close menu on tab click
                >
                  <FontAwesomeIcon icon={tab.icon} className='mr-3' size='1x' />
                  {tab.name}
                </Tab>
              ))}
            </div>
          </Tab.List>
          <Tab.Panels className={styles.userdashboardTabPanels}>
            {/* Tổng Quan Tab */}
            <Tab.Panel className={styles.userdashboardPanel}>
              <div className={styles.userdashboardOverviewContainer}>
                {/* Section 1: Tab Name */}
                <div className={styles.userdashboardSection}>
                  <h1 className={styles.userdashboardTabName}>Tổng quan</h1>
                  <hr />
                </div>
                {/* Section 2: Account Overview */}
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

                {/* Section 3: Personalized Info */}
                <div className={styles.userdashboardSection}>
                  <h2 className={styles.userdashboardSectionTitle}>Thông tin dành riêng cho bạn</h2>
                  <div className={styles.userdashboardSubSectionContainer}>
                    {/* Quan Trọng Box */}
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

                    {/* Gợi Ý Box */}
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
            {/* Tin Đăng Tab */}
            <Tab.Panel className={styles.userdashboardPanel}>
              <div className={styles.userdashboardPanelContent}>
                <h2 className={styles.userdashboardTabName}>Tin Đăng</h2>
                <hr></hr>
                {/* {loading ? (
                  <p>Đang tải...</p>
                ) : error ? (
                  <p className={styles.userdashboardError}>{error}</p>
                ) : propertiesCount === 0 ? (
                  <p>Bạn chưa có tin đăng nào.</p>
                ) : (
                  <ul className={styles.userdashboardPropertyList}>
                    {mockProperties
                      .filter((p) => p.posted_by === user_id && p.is_active)
                      .map((property) => (
                        <li key={property.property_id} className={styles.userdashboardPropertyItem}>
                          <h3>{property.title}</h3>
                          <span className={styles.userdashboardPropertyDate}>
                            {format(new Date(property.created_at), 'dd/MM/yyyy')}
                          </span>
                        </li>
                      ))}
                  </ul>
                )} */}
                <PropertyManagement/>
              </div>
            </Tab.Panel>
            {/* Đăng Tin Tab */}
            <Tab.Panel className={styles.userdashboardPanel}>
              <PostCreate />
            </Tab.Panel>
            {/* Tài khoản Tab */}
            <Tab.Panel className={styles.userdashboardPanel}>
              <AccountTab />
            </Tab.Panel>
            {/* Thanh Toán Tab */}
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
