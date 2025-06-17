import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import axios from 'axios';
import { useRef, useCallback } from 'react';
import { useAuth } from '../../components/ui/context/AuthContext';
import styles from '../../styles/AccountTab.module.css';
import userDashboardStyles from '../../styles/UserDashboard.module.css';
import Otp from '../../components/ui/modal-otp';
import SettingsTab from './SettingTabs';
import { API_URL } from '../../config.js';
import CloudinaryUploadWidget from '../../components/UploadWidget.js';
import { cloudName, uploadPreset } from '../../config';

const AccountTab = () => {
  const { user, isLoading } = useAuth();
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [emailAnnouncement, setEmailAnnouncement] = useState('');
  const widgetRef = useRef();
  const [uploading, setUploading] = useState(false);

  // Upload Widget Configuration
  const uwConfig = {
    cloudName,
    uploadPreset,
    sources: ['local', 'url', 'camera'],
    multiple: false, // Chỉ một ảnh cho avatar
    maxFiles: 1,
    maxFileSize: 5 * 1024 * 1024,
    resourceType: 'image',
  };

  // Handle Cloudinary upload
  const handleCloudinaryUpload = useCallback((error, result) => {
    setUploading(true);
    console.log('handleCloudinaryUpload:', { error, result });
    if (error) {
      console.error('Cloudinary upload error:', error);
      alert('Lỗi khi upload ảnh lên Cloudinary');
      setUploading(false);
      return;
    }
    if (result) {
      // Trường hợp upload một ảnh (avatar)
      if (!Array.isArray(result) && result.secure_url) {
        setFormData((prev) => ({
          ...prev,
          avatar: result.secure_url,
        }));
        console.log('Cloudinary upload result (single):', result);
      }
      else {
        console.error('No valid secure_url found in result:', result);
      }
      setUploading(false);
    }
  }, []); // Không cần dependency

  // Await user data on mount
  useEffect(() => {
    if (!isLoading && user) {
      setFormData({
        user_id: user.user_id,
        role: user.role,
        full_name: user.full_name || '',
        tax_number: user.tax_number || null,
        phone_number: user.phone_number || '',
        email: user.email || null,
        company_name: user.company_name || '',
        address: user.address || '',
        created_at: user.created_at,
        is_email_verified: user.is_email_verified,
        is_phone_number_verified: user.is_phone_number_verified,
        avatar: user.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
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
      await axios.post(`${API_URL}/otp/send`, {
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
      const response = await axios.post(`${API_URL}/otp/verify`, {
        target_type: 'email',
        target: formData.email,
        otp_code: otpCode,
      });
      if (response.data) {
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
      const token = localStorage.getItem('token');
      const payload = {
        full_name: formData.full_name,
        ...(formData.email?.length > 0 && { email: formData.email }),
        tax_number: formData.tax_number,
        company_name: formData.company_name,
        address: formData.address,
        avatar: formData.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      };
      console.log('Update payload:', payload);
      const response = await axios.put(`${API_URL}/users/me`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
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
        alert('Cập nhật thông tin thành công!');
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
                <CloudinaryUploadWidget
                  uwConfig={uwConfig}
                  onUpload={handleCloudinaryUpload}
                  isAddMore={false}
                  avatar={true}
                />
                <div className={styles.atFormGroup}>
                  <label htmlFor="role">Vai trò</label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role ?? ''}
                    disabled
                    className={styles.atInput}
                  />
                </div>
                <div className={styles.atFormRow}>
                  <div className={styles.atFormGroup}>
                    <label htmlFor="full_name">Họ và tên</label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      value={formData.full_name ?? ''}
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
                      value={formData.tax_number ?? ''}
                      onChange={handleInputChange}
                      className={styles.atInput}
                      placeholder="Ví dụ: 1234567890 hoặc 1234567890-123"
                    />
                    <h5>MST gồm 10 hoặc 13 chữ số</h5>
                    {errors.tax_number && <span className={styles.atError}>{errors.tax_number}</span>}
                  </div>
                </div>
                <hr />
                <h3>
                  <b>Thông tin liên hệ</b>
                </h3>
                <div className={styles.atFormGroup}>
                  <label htmlFor="phone_number">Số điện thoại</label>
                  <input
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number ?? ''}
                    disabled
                    className={styles.atInput}
                  />
                </div>
                <div className={styles.atFormGroup}>
                  <label htmlFor="email">Email</label>
                  <div className={styles.atEmailGroup}>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email ?? ''}
                      onChange={handleInputChange}
                      className={styles.atInput}
                      disabled={formData.is_email_verified}
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
                <div className={styles.atFormGroup}>
                  <label htmlFor="company_name">Tên công ty</label>
                  <input
                    type="text"
                    id="company_name"
                    name="company_name"
                    value={formData.company_name ?? ''}
                    onChange={handleInputChange}
                    className={styles.atInput}
                  />
                  {errors.company_name && <span className={styles.atError}>{errors.company_name}</span>}
                </div>
                <div className={styles.atFormGroup}>
                  <label htmlFor="address">Địa chỉ</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address ?? ''}
                    onChange={handleInputChange}
                    className={styles.atInput}
                  />
                  {errors.address && <span className={styles.atError}>{errors.address}</span>}
                </div>
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
                <div className={styles.atButtonGroup}>
                  <button className={styles.atUpdateButton} onClick={handleUpdate}>
                    Cập nhật thông tin
                  </button>
                </div>
                {errors.general && <span className={styles.atError}>{errors.general}</span>}
              </div>
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
                <SettingsTab />
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default AccountTab;
