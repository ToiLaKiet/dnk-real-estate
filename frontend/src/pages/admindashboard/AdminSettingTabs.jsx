import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../components/ui/context/AuthContext';
import styles from '../../styles/AdminSettingTabs.module.css';

const SettingsTab = () => {
  const { user } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [requirements, setRequirements] = useState({
    minLength: false,
    uppercase: false,
    number: false,
  });
  const [errors, setErrors] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Toggle dropdowns exclusively
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    setErrors({});
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setRequirements({ minLength: false, uppercase: false, number: false });
  };

  // Handle password input change with live validation
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));

    if (name === 'newPassword') {
      setRequirements({
        minLength: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        number: /\d/.test(value),
      });
    }
  };

  // Validate and submit password change
  const handlePasswordSubmit = async () => {
    const newErrors = {};
    if (!passwordData.oldPassword) newErrors.oldPassword = 'Vui lòng nhập mật khẩu cũ.';
    if (!passwordData.newPassword) newErrors.newPassword = 'Vui lòng nhập mật khẩu mới.';
    if (!requirements.minLength || !requirements.uppercase || !requirements.number) {
      newErrors.newPassword = 'Mật khẩu mới không đáp ứng yêu cầu.';
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(`/users/${user.user_id}/change-password`, {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      if (response.data.success) {
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        setRequirements({ minLength: false, uppercase: false, number: false });
        setActiveDropdown(null);
      }
    } catch (error) {
      setErrors({
        general: error.response?.data?.error || 'Cập nhật mật khẩu thất bại.',
      });
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(`/users/${user.user_id}`);
      if (response.data.success) {
        setIsDeleteModalOpen(false);
        // Optionally trigger logout or redirect
      }
    } catch (error) {
      setErrors({
        delete: error.response?.data?.error || 'Xóa tài khoản thất bại.',
      });
    }
  };

  return (
    <div className={styles.stFlexbox}>
      <div className={styles.stDropdown}>
        <button
          className={`${styles.stDropdownHeader} ${activeDropdown === 'password' ? styles.stDropdownHeaderActive : ''}`}
          onClick={() => toggleDropdown('password')}
        >
          Thay đổi mật khẩu
        </button>
        {activeDropdown === 'password' && (
          <div className={styles.stDropdownContent}>
            <div className={styles.stFormGroup}>
              <label htmlFor="oldPassword">Mật khẩu cũ</label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                className={styles.stPasswordInput}
              />
              {errors.oldPassword && <span className={styles.stError}>{errors.oldPassword}</span>}
            </div>
            <div className={styles.stFormGroup}>
              <label htmlFor="newPassword">Mật khẩu mới</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className={styles.stPasswordInput}
              />
              <ul className={styles.stPasswordRequirements}>
                <li className={`${styles.stPasswordRequirement} ${requirements.minLength ? styles.stRequirementMet : ''}`}>
                  <span className={styles.stRequirementIcon}>{requirements.minLength ? '✅' : '•'}</span>
                  Mật khẩu tối thiểu 8 ký tự
                </li>
                <li className={`${styles.stPasswordRequirement} ${requirements.uppercase ? styles.stRequirementMet : ''}`}>
                  <span className={styles.stRequirementIcon}>{requirements.uppercase ? '✅' : '•'}</span>
                  Chứa ít nhất 1 ký tự viết hoa
                </li>
                <li className={`${styles.stPasswordRequirement} ${requirements.number ? styles.stRequirementMet : ''}`}>
                  <span className={styles.stRequirementIcon}>{requirements.number ? '✅' : '•'}</span>
                  Chứa ít nhất 1 ký tự số
                </li>
              </ul>
              {errors.newPassword && <span className={styles.stError}>{errors.newPassword}</span>}
            </div>
            <div className={styles.stFormGroup}>
              <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className={styles.stPasswordInput}
              />
              {errors.confirmPassword && <span className={styles.stError}>{errors.confirmPassword}</span>}
            </div>
            <div className={styles.stButtonGroup}>
              <button className={styles.stUpdateButton} onClick={handlePasswordSubmit}>
                Cập nhật mật khẩu
              </button>
            </div>
            {errors.general && <span className={styles.stError}>{errors.general}</span>}
          </div>
        )}
      </div>
      <div className={styles.stDropdown}>
        <button
          className={`${styles.stDropdownHeader} ${activeDropdown === 'delete' ? styles.stDropdownHeaderActive : ''}`}
          onClick={() => toggleDropdown('delete')}
        >
          Xoá tài khoản
        </button>
        {activeDropdown === 'delete' && (
          <div className={styles.stDropdownContent}>
            <button className={styles.stDeleteButton} onClick={() => setIsDeleteModalOpen(true)}>
              Xoá tài khoản
            </button>
            {errors.delete && <span className={styles.stError}>{errors.delete}</span>}
          </div>
        )}
      </div>
      {isDeleteModalOpen && (
        <div className={styles.stConfirmModal}>
          <p>Bạn có chắc chắn muốn xóa tài khoản?</p>
          <div className={styles.stModalButtonGroup}>
            <button className={styles.stUpdateButton} onClick={handleDeleteAccount}>
              Xác nhận
            </button>
            <button className={styles.stCancelButton} onClick={() => setIsDeleteModalOpen(false)}>
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsTab;
