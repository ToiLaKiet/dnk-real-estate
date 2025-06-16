// src/components/CloudinaryUploadWidget.jsx
import { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/imageuploadmodal.module.css';

const CloudinaryUploadWidget = forwardRef(({ uwConfig, onUpload, isAddMore, avatar = false }, ref) => {
  // Dòng này là để đảm bảo rằng Cloudinary SDK đã được tải trước khi sử dụng
  const cloudinaryRef = useRef();
  // Sử dụng useRef để giữ tham chiếu đến widget và button
  const widgetRef = useRef();
  // Tham chiếu đến nút để mở widget
  const buttonRef = useRef();
  
  // State để lưu thông tin user hiện tại
  const [currentUser, setCurrentUser] = useState(null);

  // Load user từ localStorage khi avatar = true
  useEffect(() => {
    if (avatar) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setCurrentUser(user);
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        setCurrentUser(null);
      }
    }
  }, [avatar]);

  useEffect(() => {
    // Kiểm tra xem Cloudinary đã được tải hay chưa 
    console.log('CloudinaryUploadWidget props:', { uwConfig, onUpload, isAddMore, avatar });
    // Nếu đã tải, tạo widget và gán sự kiện click
    if (window.cloudinary) {
      // Nếu Cloudinary đã được tải, khởi tạo widget
      cloudinaryRef.current = window.cloudinary;
      // Tạo widget upload với cấu hình đã cung cấp
      // Tạo mảng để lưu trữ tất cả các kết quả upload
      const uploadResults = [];
      
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            onUpload(error, null);
            return;
          }
          if (result.event === 'success') {
            console.log('Upload successful:', result.info);
            // Lưu kết quả vào mảng thay vì gọi onUpload ngay
            uploadResults.push(result.info);
          }
          // Kiểm tra sự kiện queues-end để biết khi nào tất cả các upload đã hoàn thành
          if (result.event === 'queues-end') {
            console.log('All uploads completed, results:', uploadResults);
            // Gọi onUpload với toàn bộ danh sách kết quả
            onUpload(null, uploadResults);
            // Reset mảng cho lần upload tiếp theo
            uploadResults.length = 0;
          }
          if (result.event === 'close') {
            console.log('Widget closed');
          }
        }
      );
    }
  }, [uwConfig, onUpload]);

  // Hàm để mở widget
  const openWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    }
  };

  // Expose openWidget function to parent component
  useImperativeHandle(ref, () => ({
    openWidget
  }));

  // Render button dựa trên avatar prop
  if (avatar) {
    // Avatar mode - nút hình tròn
    return (
      <button
        ref={buttonRef}
        onClick={openWidget}
        className={styles.avatarUploadButton}
        type="button"
      >
        {currentUser?.avatar ? (
          // Hiển thị avatar hiện tại
          <div className={styles.avatarContainer}>
            <img 
              src={currentUser.avatar} 
              alt="User Avatar" 
              className={styles.avatarImage}
            />
            <div className={styles.avatarOverlay}>
              <FontAwesomeIcon icon={faPlus} className={styles.avatarPlusIcon} />
            </div>
          </div>
        ) : (
          // Hiển thị nút plus khi chưa có avatar
          <div className={styles.avatarPlaceholder}>
            <FontAwesomeIcon icon={faPlus} className={styles.avatarPlusIcon} />
          </div>
        )}
      </button>
    );
  }

  // Default mode - nút thường
  return (
    <button
      ref={buttonRef}
      onClick={openWidget}
      className={isAddMore ? styles.addMoreButton : styles.uploadButton}
      type="button"
    >
      <FontAwesomeIcon icon={faPlus} />
      {isAddMore ? ' Thêm ảnh' : ' Tải ảnh lên'}
    </button>
  );
});

export default CloudinaryUploadWidget;
