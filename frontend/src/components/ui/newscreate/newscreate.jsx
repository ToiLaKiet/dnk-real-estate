import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../logo.js';
import CloudinaryUploadWidget from '../../UploadWidget';
import { cloudName, uploadPreset, API_URL } from '../../../config.js';
import styles from '../../../styles/NewsCreate.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faTimes, faImage, faSave } from '@fortawesome/free-solid-svg-icons';

const NewsCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    thumbnail_url: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  // Cloudinary widget config
  const uwConfig = {
    cloudName,
    uploadPreset,
    sources: ['local', 'url', 'camera'],
    multiple: false,
    maxFiles: 1,
    maxFileSize: 5000000, // 5MB
    folder: 'news_thumbnails',
    resourceType: 'image'
  };
  useEffect(() => {

    const checkAdminAccess = () => {
      try {
        const userString = localStorage.getItem('user');
        if (!userString) {
          navigate('/home');
          return;
        }
        const user = JSON.parse(userString);
        if (user.role !== 'admin') {
          alert('Bạn không có quyền truy cập trang này!');
          navigate('/');
          return;
        }
      } catch (error) {
        console.error('Error checking user authorization:', error);
        navigate('/home');
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAdminAccess();
  }, [navigate]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleCloudinaryUpload = (error, result) => {
    if (error) {
      console.error('Error uploading image:', error);
      setErrors({ ...errors, thumbnail_url: 'Không thể tải lên hình ảnh. Vui lòng thử lại.' });
      return;
    }

    if (result) {
        console.log('Image uploaded successfully:', result);
      const uploadedUrl = result.secure_url;
      setFormData({ ...formData, thumbnail_url: uploadedUrl });
      setPreviewImage(uploadedUrl);
      setErrors({ ...errors, thumbnail_url: '' });
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, thumbnail_url: '' });
    setPreviewImage(null);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề là bắt buộc';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Tiêu đề phải có ít nhất 5 ký tự';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Nội dung là bắt buộc';
    } else if (formData.content.length < 20) {
      newErrors.content = 'Nội dung phải có ít nhất 20 ký tự';
    }

    if (!formData.thumbnail_url) {
      newErrors.thumbnail_url = 'Hình ảnh thu nhỏ là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/news`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('News created successfully:', response.data);
      alert('Tin tức đã được tạo thành công!');
      navigate('/tin-tuc'); // Navigate to news management page
    } catch (error) {
      console.error('Error creating news:', error);
      setErrors({ 
        ...errors, 
        submit: error.response?.data?.message || 'Không thể tạo tin tức. Vui lòng thử lại.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.newsCreatorContainer}>

      <div className={styles.newsCreatorHeader}>
      <Logo />
        <h1 className={styles.newsCreatorTitle}>

          <FontAwesomeIcon icon={faNewspaper} className={styles.newsCreatorHeaderIcon} />
          Tạo Bài Viết Mới

        </h1>
        <p className={styles.newsCreatorSubtitle}>
          Điền thông tin bên dưới để xuất bản một bài viết mới
        </p>
      </div>

      <form className={styles.newsCreatorForm} onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className={styles.newsCreatorFormGroup}>
          <label htmlFor="title" className={styles.newsCreatorFormLabel}>
            Tiêu đề <span className={styles.newsCreatorRequired}>*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Nhập tiêu đề bài viết"
            className={`${styles.newsCreatorFormInput} ${errors.title ? styles.newsCreatorInputError : ''}`}
            disabled={isSubmitting}
          />
          {errors.title && <div className={styles.newsCreatorErrorMessage}>{errors.title}</div>}
        </div>

        {/* Content Input */}
        <div className={styles.newsCreatorFormGroup}>
          <label htmlFor="content" className={styles.newsCreatorFormLabel}>
            Nội dung <span className={styles.newsCreatorRequired}>*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Viết nội dung bài viết của bạn ở đây..."
            className={`${styles.newsCreatorFormTextarea} ${errors.content ? styles.newsCreatorInputError : ''}`}
            rows={10}
            disabled={isSubmitting}
          />
          {errors.content && <div className={styles.newsCreatorErrorMessage}>{errors.content}</div>}
        </div>

        {/* Thumbnail Upload */}
        <div className={styles.newsCreatorFormGroup}>
          <label className={styles.newsCreatorFormLabel}>
            Hình ảnh thu nhỏ <span className={styles.newsCreatorRequired}>*</span>
          </label>
          <div className={styles.newsCreatorImageSection}>
            {previewImage ? (
              <div className={styles.newsCreatorPreviewContainer}>
                <img src={previewImage} alt="Xem trước" className={styles.newsCreatorPreviewImage} />
                <button 
                  type="button" 
                  className={styles.newsCreatorRemoveButton}
                  onClick={removeImage}
                  disabled={isSubmitting}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ) : (
              <div className={styles.newsCreatorUploadArea}>
                <CloudinaryUploadWidget
                  uwConfig={uwConfig}
                  onUpload={handleCloudinaryUpload}
                />
              </div>
            )}
            {errors.thumbnail_url && (
              <div className={styles.newsCreatorErrorMessage}>{errors.thumbnail_url}</div>
            )}
          </div>
        </div>

        {/* Form Error */}
        {errors.submit && (
          <div className={styles.newsCreatorSubmitError}>
            {errors.submit}
          </div>
        )}

        {/* Form Actions */}
        <div className={styles.newsCreatorFormActions}>
          <button
            type="button"
            className={styles.newsCreatorCancelButton}
            onClick={() => navigate('/admin/news')}
            disabled={isSubmitting}
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className={styles.newsCreatorSubmitButton}
            disabled={isSubmitting}
          >
            <FontAwesomeIcon icon={faSave} className={styles.newsCreatorButtonIcon} />
            {isSubmitting ? 'Đang xuất bản...' : 'Xuất bản bài viết'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsCreate;
