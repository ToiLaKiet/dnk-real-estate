import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import styles from '../../styles/AdminUserDashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollVertical, faNewspaper, faCirclePlus, faUser, faLandmark, faBars, faUsers, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../components/logo.js';
import AccountTab from './AdminAccountTab.jsx';
import PropertyManagement from './AdminPropertyManangement.jsx';
import AdminPropertyList from './AdminPropertyList.jsx';
import AdminUserManagement from './AdminUserManagement.jsx';
import AdminReportManagement from './AdminReportManagement.jsx';
import axios from 'axios';
import { API_URL } from '../../config.js';


function AdminDashboard() {
  const [propertiesCount, setPropertiesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [chartsData, setChartsData] = useState(); // For future chart data

  useEffect(() => {
    // const user = localStorage.getItem('user');
    // if (!user || JSON.parse(user).role !== 'admin') {
    //   window.location.href = '/*'; // Redirect if not admin
    //   return;
    // }
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/properties`);
        console.log('Properties response:', response);
        const properties = response.data;
        setPropertiesCount(properties.length);
        //Get charts from backend
        const chartResponse = await axios.get(`${API_URL}/stats/chart`);
        console.log('Charts response:', chartResponse);
        setChartsData(chartResponse.data.chart);
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
    { name: 'Duyệt Tin Đăng', icon: faNewspaper },
    { name: 'Quản Lý Tin Đăng', icon: faCirclePlus },
    { name: 'Quản Lý Tài Khoản', icon: faUsers },
    { name: 'Quản Lý Báo Cáo', icon: faTriangleExclamation },
    // { name: 'Tài Khoản', icon: faUser },
    { name: 'Quản Lý Thanh Toán', icon: faLandmark },
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
            {/* <Logo className={styles.userdashboardLogo} width={130} height={100} /> */}
            <div className ={styles.AdminselectionBanner}>&nbsp;&nbsp;ADMIN<br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DASHBOARD</div>
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
              <div className={styles.adminlogoBox}><Logo width={500}/></div>
              <div className={styles.userdashboardOverviewContainer}>
                {/* Section 1: Tab Name */}
                <div className={styles.userdashboardSection}>
                  <h1 className={styles.userdashboardTabName}>Tổng quan</h1>
                  <hr />
                </div>
                {/* Section 2: Account Overview */}
                <div className={styles.userdashboardSection}>
                  <h2 className={styles.userdashboardSectionTitle}>Tổng quan trang web</h2>
                  <div className={styles.userdashboardSectioncontent}>
                    <div className={styles.userdashboardInfoBox}>
                      {loading ? (
                        <div>Đang tải...</div>
                      ) : error ? (
                        <p className={styles.userdashboardError}>{error}</p>
                      ) : (
                        // ✅ Even better structure
                          <div className={styles.statItem}>
                            <div className={styles.statLabel}>Tổng số tin đăng</div>
                            <div className={styles.adminstrongbox}>
                              <strong className={styles.big}>{propertiesCount}</strong>
                            </div>
                          </div>
                      )}
                    </div>
                    <div className={styles.userdashboardInfoBox}>
                      {loading ? (
                        <div>Đang tải...</div>
                      ) : error ? (
                        <p className={styles.userdashboardError}>{error}</p>
                      ) : (
                        <div>
                          Tổng số người dùng 
                          <br></br>
                          <div className={styles.adminstrongbox}><strong className={styles.big}>{propertiesCount}</strong></div>
                        </div>
                      )}
                      
                    </div>
                  </div>
                </div>
               </div>
               {/* Charts Section */}
              <h2 className={styles.userdashboardSectionTitle}>Biểu đồ thống kê</h2>
              <div className={styles.userdashboardSectioncontent}>
              {loading ? (
                <div>Đang tải biểu đồ...</div>
              ) : error ? (
                <p className={styles.userdashboardError}>{error}</p>
              ) : chartsData ? (
                <div className={styles.chartsContainer}>
                <div className={styles.chartBox}>
                  <h3>Thống kê bất động sản</h3>
                  <div className={styles.chartContent}>
                  <img 
                    src={chartsData.startsWith('data:') ? chartsData : `data:image/png;base64,${chartsData}`}
                    alt="Property Statistics Chart"
                    style={{ maxWidth: '100%', height: '100%' }}
                  />
                  </div>
                </div>
                </div>
              ) : (
                <p>Không có dữ liệu biểu đồ</p>
              )}
              </div>
            </Tab.Panel>
            {/* Tin Đăng Tab */}
            <Tab.Panel className={styles.userdashboardPanel}>
              <div className={styles.userdashboardPanelContent}>
                <div className={styles.adminlogoBox}><Logo width={500}/></div>
                <h2 className={styles.userdashboardTabName}>Duyệt Tin Đăng</h2>
                <hr></hr>
                <PropertyManagement/>
              </div>
            </Tab.Panel>
            {/* Đăng Tin Tab */}
            <Tab.Panel className={styles.userdashboardPanel}>
              <div className={styles.adminlogoBox}><Logo width={500}/></div>
                <h2 className={styles.userdashboardTabName}>Quản Lý Tin Đăng</h2>
                <hr></hr>
              <AdminPropertyList />
            </Tab.Panel>
            <Tab.Panel className={styles.userdashboardPanel}>
            <div className={styles.adminlogoBox}><Logo width={500}/></div>
            <h2 className={styles.userdashboardTabName}>Quản Lý Tài Khoản</h2>
            <hr></hr>
              <AdminUserManagement />
            </Tab.Panel>
            <Tab.Panel className={styles.userdashboardPanel}>
            <div className={styles.adminlogoBox}><Logo width={500}/></div>
            <h2 className={styles.userdashboardTabName}>Quản Lý Báo Cáo</h2>
            <hr></hr>
              <AdminReportManagement />
            </Tab.Panel>
            {/* Tài khoản Tab
            <Tab.Panel className={styles.userdashboardPanel}>
              <AccountTab />
            </Tab.Panel> */}
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
    </div>
  );
}

export default AdminDashboard;
