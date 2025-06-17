import { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/imageuploadmodal.module.css';

const CloudinaryUploadWidget = forwardRef(({ uwConfig, onUpload, isAddMore, avatar = false }, ref) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const buttonRef = useRef();
  const uploadResultsRef = useRef([]); // Dùng useRef để duy trì mảng
  const [currentUser, setCurrentUser] = useState(null);

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
    console.log('uwConfig:', uwConfig);
    if (window.cloudinary) {
      console.log('Cloudinary SDK loaded');
      cloudinaryRef.current = window.cloudinary;

      // Xóa widget cũ nếu tồn tại
      if (widgetRef.current) {
        widgetRef.current.destroy();
        widgetRef.current = null;
      }

      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        uwConfig,
        (error, result) => {
          console.log('Widget callback:', { error, result });
          if (error) {
            console.error('Cloudinary upload error:', error);
            onUpload(error, null);
            return;
          }
          if (result.event === 'success') {
            console.log('Success event, result:', result.info);
            uploadResultsRef.current.push(result.info);
            // Nếu chỉ cho phép upload một ảnh, gửi ngay kết quả
            if (!uwConfig.multiple) {
              onUpload(null, result.info);
              uploadResultsRef.current = []; // Reset sau khi gửi
            }
          }
          if (result.event === 'queues-end' && uwConfig.multiple) {
            if (uploadResultsRef.current.length === 0) {
              console.log('No files uploaded');
              onUpload(new Error('No files uploaded'), null);
            } else {
              console.log('All uploads completed, results:', uploadResultsRef.current);
              onUpload(null, [...uploadResultsRef.current]); // Sao chép mảng để gửi
            }
            uploadResultsRef.current = []; // Reset sau khi gửi
          }
          if (result.event === 'close') {
            console.log('Widget closed');
          }
        }
      );
    } else {
      console.error('Cloudinary SDK not loaded');
    }

    // Cleanup: Hủy widget khi component unmount
    return () => {
      if (widgetRef.current) {
        widgetRef.current.destroy();
        widgetRef.current = null;
      }
    };
  }, [uwConfig, onUpload]);

  const openWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    }
  };

  useImperativeHandle(ref, () => ({
    openWidget,
  }));

  if (avatar) {
    return (
      <button
        ref={buttonRef}
        onClick={openWidget}
        className={styles.avatarUploadButton}
        type="button"
      >
        {currentUser?.avatar ? (
          <div className={styles.avatarContainer}>
            <img src={currentUser.avatar} alt="User Avatar" className={styles.avatarImage} />
            <div className={styles.avatarOverlay}>
              <FontAwesomeIcon icon={faPlus} className={styles.avatarPlusIcon} />
            </div>
          </div>
        ) : (
          <div className={styles.avatarPlaceholder}>
            <FontAwesomeIcon icon={faPlus} className={styles.avatarPlusIcon} />
          </div>
        )}
      </button>
    );
  }

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
