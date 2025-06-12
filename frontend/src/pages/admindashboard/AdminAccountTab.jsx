import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import axios from 'axios';
import { useAuth } from '../../components/ui/context/AuthContext';
import styles from '../../styles/AdminAccountTab.module.css' 
import userDashboardStyles from '../../styles/AdminUserDashboard.module.css'; // Reuse UserDashboard styles
import Otp from '../../components/ui/modal-otp';
import SettingsTab from './AdminSettingTabs';
const AdminAccountTab = () => {
  const API_URL ='http://172.16.1.205:8080'; // Use environment variable for API URL
  const { user, isLoading } = useAuth();
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [emailAnnouncement, setEmailAnnouncement] = useState('');

  // Await user data on mount
  useEffect(() => {
    if (!isLoading && user) {
      setFormData({
        user_id: user.user_id,
        role: user.role,
        full_name: user.full_name || '',
        tax_number: user.tax_number || '',
        phone_number: user.phone_number || '',
        email: user.email || '',
        company_name: user.company_name || '',
        address: user.address || '',
        created_at: user.created_at,
        is_email_verified: user.is_email_verified,
        is_phone_number_verified: user.is_phone_number_verified,
      });
    }
  }, [user, isLoading]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    if (name === 'email' && value && !formData.is_email_verified) {
      setEmailAnnouncement('Email must be verified before updating.');
    } else if (name === 'email' && (!value || formData.is_email_verified)) {
      setEmailAnnouncement('');
    }
  };

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  // Handle email verification
  const handleVerifyEmail = async () => {
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: 'Please enter an email.' }));
      return;
    }
    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email format.' }));
      return;
    }
    try {
      await axios.post(API_URL+'/otp/send', { 
        target_type: 'email',
        target: formData.email,
      });
      setIsOtpModalOpen(true);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        email: error.response?.data?.error || 'Failed to send OTP.',
      }));
    }
  };

  // Handle OTP verification
  const handleOtpVerify = async (otpCode) => {
    try {
      console.log('Verifying OTP for email:', formData.email);
      const response = await axios.post(API_URL+'/otp/verify', {
        target_type: 'email',
        target: formData.email,
        otp_code: otpCode,
      });
      if(response.data){
        console.log('OTP verification successful:', response.data);
        setFormData((prev) => ({ ...prev, is_email_verified: true, email: formData.email }));
        setErrors({});
        setEmailAnnouncement('Email verified successfully.');
        alert('Email verified successfully.');
        setIsOtpModalOpen(false);
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        email: error.response?.data?.error || 'Invalid OTP.',
      }));
    }
  };

  // Handle user data update
  const handleUpdate = async () => {
    if (formData.email && !formData.is_email_verified) {
      setEmailAnnouncement('Email must be verified before updating.');
      alert('Please verify your email before updating.');
      return;
    }
    try {
      console.log(formData);
      const token = localStorage.getItem('token'); // or however you store the token
      console.log('token',token);
      const cpayload = {
        full_name: formData.full_name,
        email: formData.email,
        tax_number: formData.tax_number,
        company_name: formData.company_name,
        address: formData.address,
      }
      console.log('Update payload:', cpayload);
      const response = await axios.put(API_URL+'/users/me', cpayload, {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${token}`
        }
        });
      console.log('Update response:', response.data);
      if (response.data) {
        setFormData((prev) => ({
          ...prev,
          full_name: response.data.full_name,
          email: response.data.email,
          address: response.data.address,
          company_name: response.data.company_name,
          tax_number: response.data.tax_number,
        }));
        setErrors({});
        setEmailAnnouncement('');
      }
    } catch (error) {
      console.error('Update error:', error.response?.data || error.message);
    }
  };

  // Render reload prompt if user data fails to load
  if (isLoading || !formData) {
    return (
      <div className={styles.atReloadPrompt}>
        Failed to load data. Please reload.
      </div>
    );
  }

  const tabs = ['Chỉnh sửa thông tin', 'Cài đặt tài khoản'];

  return (
    <div className={userDashboardStyles.userdashboardSection}>
      <h1 className={userDashboardStyles.userdashboardTabName}>Tài Khoản</h1>
      <hr />
      <div className={styles.atFlexbox}>
        <Tab.Group>
          <Tab.List className={styles.atSubTabList}>
            {tabs.map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  `${styles.atSubTab} ${selected ? styles.atSubTabSelected : ''}`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className={userDashboardStyles.userdashboardTabPanels}>
            <Tab.Panel className={userDashboardStyles.userdashboardPanel}>
              <div className={styles.atForm}>
                {/* Role */}
                <div className={styles.atFormGroup}>
                  <label htmlFor="role">Vai trò</label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    disabled
                    className={styles.atInput}
                  />
                </div>
                {/* Full Name and Tax Number */}
                <div className={styles.atFormRow}>
                  <div className={styles.atFormGroup}>
                    <label htmlFor="full_name">Họ và tên</label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className={styles.atInput}
                    />
                    {errors.full_name && <span className={styles.atError}>{errors.full_name}</span>}
                  </div>
                  <div className={styles.atFormGroup}>
                    <label htmlFor="tax_number">Mã số thuế</label>
                    <input
                      type="text"
                      id="tax_number"
                      name="tax_number"
                      value={formData.tax_number}
                      onChange={handleInputChange}
                      className={styles.atInput}
                      placeholder = "Ví dụ: 1234567890 hoặc 1234567890-123"
                    />
                    <h5>MST gồm 10 hoặc 13 chữ số</h5>
                    {errors.tax_number && <span className={styles.atError}>{errors.tax_number}</span>}
                  </div>
                </div>
                {/* Phone Number */}
                <hr></hr>
                <h3><b>Thông tin liên hệ</b></h3>
                <div className={styles.atFormGroup}>
                  <label htmlFor="phone_number">Số điện thoại</label>
                  <input
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    disabled
                    className={styles.atInput}
                  />
                </div>
                {/* Email */}
                <div className={styles.atFormGroup}>
                  <label htmlFor="email">Email</label>
                  <div className={styles.atEmailGroup}>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.atInput}
                    />
                    {!formData.is_email_verified && formData.email && (
                      <button className={styles.atVerifyButton} onClick={handleVerifyEmail}>
                        Verify
                      </button>
                    )}
                  </div>
                  {(errors.email || emailAnnouncement) && (
                    <span className={styles.atError}>{errors.email || emailAnnouncement}</span>
                  )}
                </div>
                {/* Company Name */}
                <div className={styles.atFormGroup}>
                  <label htmlFor="company_name">Tên công ty</label>
                  <input
                    type="text"
                    id="company_name"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleInputChange}
                    className={styles.atInput}
                  />
                  {errors.company_name && <span className={styles.atError}>{errors.company_name}</span>}
                </div>
                {/* Address */}
                <div className={styles.atFormGroup}>
                  <label htmlFor="address">Địa chỉ</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={styles.atInput}
                  />
                  {errors.address && <span className={styles.atError}>{errors.address}</span>}
                </div>
                {/* Created At */}
                <div className={styles.atFormGroup}>
                  <label htmlFor="created_at">Ngày tạo</label>
                  <input
                    type="text"
                    id="created_at"
                    name="created_at"
                    value={formData.created_at}
                    disabled
                    className={styles.atInput}
                  />
                </div>
                {/* Update Button */}
                <div className={styles.atButtonGroup}>
                  <button className={styles.atUpdateButton} onClick={handleUpdate}>
                    Cập nhật thông tin
                  </button>
                </div>
                {errors.general && <span className={styles.atError}>{errors.general}</span>}
              </div>
              {/* OTP Modal */}
              {isOtpModalOpen && (
                <Otp
                  data={{ email: formData.email }}
                  onVerify={handleOtpVerify}
                  onClose={() => setIsOtpModalOpen(false)}
                />
              )}
            </Tab.Panel>
            <Tab.Panel className={userDashboardStyles.userdashboardPanel}>
              <div className={userDashboardStyles.userdashboardPlaceholder}>
                <SettingsTab></SettingsTab>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default AdminAccountTab;
