import React, { useEffect, useState, useCallback } from 'react';
import SuccessModal from './SuccessModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpload,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../../../styles/imageuploadmodal.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'

const ImageUploadModal = () => {  
  const API_URL = 'http://172.16.1.219:8080/';
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Fix editMode logic
  const [editMode] = useState(location?.state?.mode ?? false);
  
  // Initialize images with consistent structure
  const [images, setImages] = useState(() => {
    const stateImages = location?.state?.images;
    if (stateImages && Array.isArray(stateImages)) {
      return stateImages.map((img, index) => ({
        id: `existing-${index}`,
        preview: img.image_url,
        isExisting: true
      }));
    }
    return [];
  });
  
  const [videoUrl, setVideoUrl] = useState(location?.state?.media?.video_url || '');

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach(image => {
        if (image.preview && !image.isExisting) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [images]); // Add images dependency

  // FIX: Add missing dependencies and proper authentication check
  useEffect(() => {
    console.log('Location state:', location.state);
    console.log('Is authenticated:', isAuthenticated);
    
    // Check authentication first
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login instead of post-create
      return;
    }
    
    // Check if location state exists
    if (!location.state || !location.state.formData) {
      navigate('/post-create');
      return;
    }
    
    // Set form data if everything is valid
    setFormData(location.state.formData);
  }, [location, navigate, isAuthenticated]); // Add missing dependencies

  // Validate video URL
  const isValidVideoUrl = (url) => {
    if (!url) return true;
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    const tiktokRegex = /^(https?:\/\/)?(www\.)?tiktok\.com\/.+/;
    return youtubeRegex.test(url) || tiktokRegex.test(url);
  };

  // Handle image upload with better validation
  const handleImageUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    setImages(prevImages => {
      const newImages = [...prevImages];
      
      files.forEach(file => {
        // Validation
        if (newImages.length >= 10) {
          alert('Chỉ được upload tối đa 10 ảnh');
          return;
        }
        
        if (!file.type.startsWith('image/')) {
          alert(`File ${file.name} không phải là hình ảnh`);
          return;
        }
        
        if (file.size > maxFileSize) {
          alert(`File ${file.name} quá lớn. Kích thước tối đa là 5MB`);
          return;
        }

        newImages.push({
          id: `new-${Date.now()}-${Math.random()}`,
          file,
          preview: URL.createObjectURL(file),
          isExisting: false
        });
      });
      
      return newImages;
    });
  }, []); // Remove images dependency to prevent infinite re-renders

  // Fix remove image function
  const handleRemoveImage = useCallback((index) => {
    setImages(prevImages => {
      const newImages = [...prevImages];
      const imageToRemove = newImages[index];
      
      // Cleanup object URL if not existing image
      if (imageToRemove && imageToRemove.preview && !imageToRemove.isExisting) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      
      newImages.splice(index, 1);
      return newImages;
    });
  }, []);

  // Handle video URL change with validation
  const handleVideoUrlChange = (e) => {
    const url = e.target.value;
    setVideoUrl(url);
    
    if (url && !isValidVideoUrl(url)) {
      console.warn('URL video không hợp lệ');
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate('/profile');
  };

  const handleContinuePosting = () => {
    setIsSuccessModalOpen(false);
    navigate('/post-create');
  };

  // FIX: Main API call function - prevent duplicate calls
  const letspostCreate = async (payload, updatedData) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Không tìm thấy token xác thực');
      }

      const config = {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      let response;
      
      // FIX: Proper conditional logic - only one API call
      if (editMode && updatedData.property_id) {
        console.log("Data payload gửi về backend (edit):", payload);
        response = await axios.put(`${API_URL}properties/${updatedData.property_id}`, payload, config);
      } else {
        console.log("Data payload gửi về backend (create):", payload);
        response = await axios.post(`${API_URL}properties/`, payload, config);
      }

      console.log("Response từ backend:", response.data);
      setIsSuccessModalOpen(true);
      
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
      
      if (error.response) {
        alert(`Lỗi từ server: ${error.response.data?.message || 'Có lỗi xảy ra'}`);
      } else if (error.request) {
        alert('Không thể kết nối tới server. Vui lòng thử lại.');
      } else {
        alert(`Lỗi: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // FIX: Simplified handleDataSubmit
  const handleDataSubmit = (mediaData) => {
    try {
      if (!mediaData || !mediaData.media) {
        console.error("Dữ liệu media không hợp lệ:", mediaData);
        return;
      }
      
      // Merge media data with existing form data
      const updatedFormData = {
        ...formData,
        media: mediaData.media,
        user_id: user?.id
      };
      
      console.log("✅ Form data sau khi hoàn tất ImageUploadModal:", updatedFormData);
      
      // Create payload
      const data_payload = {
        title: updatedFormData?.title || '',
        description: updatedFormData?.description || '',
        address: updatedFormData?.address?.displayAddress || '',
        property_type: updatedFormData?.type || '',
        lat: updatedFormData.address?.coordinates?.lat || 0,
        lng: updatedFormData.address?.coordinates?.lng || 0,
        location_id: updatedFormData.address?.ward || '', 
        area: updatedFormData.area || 0,
        price: updatedFormData.price || 0,
        category: updatedFormData.propertyType || '',
        features: [
          { feature_name: "legalDocuments", feature_value: updatedFormData.legalDocuments || '' },
          { feature_name: "furniture", feature_value: updatedFormData.furniture || '' },
          { feature_name: "bedrooms", feature_value: updatedFormData.bedrooms || 0 },
          { feature_name: "bathrooms", feature_value: updatedFormData.bathrooms || 0 },
          { feature_name: "houseDirection", feature_value: updatedFormData.houseDirection || '' },
          { feature_name: "balconyDirection", feature_value: updatedFormData.balconyDirection || '' },
        ],
        images: updatedFormData.media?.images ?? [],
        videos: updatedFormData.media?.videoUrl ? [{
          video_url: updatedFormData.media.videoUrl
        }] : [],
        contact_name: updatedFormData.contact?.name || '',
        contact_email: updatedFormData.contact?.email || '',
        contact_phone: updatedFormData.contact?.phone || '',
        expire_at: new Date().toISOString()
      };
      
      console.log('data_payload:', data_payload);
      
      // Update form data state and call API
      setFormData(updatedFormData);
      letspostCreate(data_payload, updatedFormData);
      
    } catch (error) {
      console.error("Lỗi trong handleDataSubmit:", error);
      alert('Có lỗi xảy ra khi xử lý dữ liệu');
    }
  };

  // FIX: Simplified handleBack
  const handleBack = () => {
    const data_payload = {
      title: formData?.title || '',
      description: formData?.description || '',
      address: formData?.address?.displayAddress || '',
      property_type: formData?.type || '',
      lat: formData.address?.coordinates?.lat || 0,
      lng: formData.address?.coordinates?.lng || 0,
      location_id: formData.address?.ward || '', 
      area: formData.area || 0,
      price: formData.price || 0,
      category: formData.propertyType || '',
      features: [
      { feature_name: "legalDocuments", feature_value: formData.legalDocuments || '' },
      { feature_name: "furniture", feature_value: formData.furniture || '' },
      { feature_name: "bedrooms", feature_value: formData.bedrooms || 0 },
      { feature_name: "bathrooms", feature_value: formData.bathrooms || 0 },
      { feature_name: "houseDirection", feature_value: formData.houseDirection || '' },
      { feature_name: "balconyDirection", feature_value: formData.balconyDirection || '' },
      ],
      images: formData.media?.images ?? [],
      videos: formData.media?.videoUrl ? [{
      video_url: formData.media.videoUrl
      }] : [],
      contact_name: formData.contact?.name || '',
      contact_email: formData.contact?.email || '',
      contact_phone: formData.contact?.phone || '',
      expire_at: ''
    };
    console.log('Data payload for back navigation:', data_payload);
    navigate('/post-create', {
      state: { 
        postToEdit: data_payload, 
        mode: editMode 
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (images.length < 3) {
      alert('Vui lòng tải lên ít nhất 3 hình ảnh');
      return;
    }
    
    if (videoUrl && !isValidVideoUrl(videoUrl)) {
      alert('URL video không hợp lệ. Vui lòng nhập đường dẫn YouTube hoặc TikTok');
      return;
    }

    const mediaData = {
      media: {
        images: images.map(img => ({
          caption: "",
          is_primary: false,
          image_url: img.preview
        })),
        videoUrl: videoUrl || null
      }
    };
    
    handleDataSubmit(mediaData);
  };
  
  return (
    <div className={styles.imageUploadModal}>
      <h2>Đăng tin bất động sản - Bước 2</h2>
      <div className={styles.hrContainer}>
        <hr className={styles.hrOrange} />
        <hr className={styles.hrBlue} />
      </div>
      <h2>Hình ảnh</h2>

      <div className={styles.uploadSection}>
        <div className={styles.requirement}>
          <span className={styles.infoIcon}>!</span> Đăng tối thiểu 3 ảnh thường
        </div>

        <div className={styles.dropArea}>
          {images.length === 0 ? (
            <>
              <div className={styles.uploadIcon}>
                <FontAwesomeIcon icon={faUpload} />
              </div>
              <p>Kéo thả vào đây hoặc</p>
              <label className={styles.uploadButton}>
                <FontAwesomeIcon icon={faPlus} /> Thêm ảnh lên từ thiết bị
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  hidden
                />
              </label>
            </>
          ) : (
            <div className={styles.imageGrid}>
              {images.map((image, index) => (
                <div key={image.id} className={styles.imagePreview}>
                  <img src={image.preview} alt={`Preview ${index + 1}`} />
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemoveImage(index)}
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
              {images.length < 10 && (
                <label className={styles.addMoreImage}>
                  <FontAwesomeIcon icon={faPlus} />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    hidden
                  />
                </label>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles.videoSection}>
        <h3>Video <span className={styles.optional}>(không bắt buộc)</span></h3>
        <input
          type="text"
          className={styles.videoUrlInput}
          value={videoUrl}
          onChange={handleVideoUrlChange}
          placeholder="Dán đường dẫn Youtube hoặc Tiktok"
        />
        {videoUrl && !isValidVideoUrl(videoUrl) && (
          <div className={styles.errorMessage}>
            URL video không hợp lệ
          </div>
        )}
      </div>

      <div className={styles.actionButtons}>
        <button 
          className={styles.backButton} 
          onClick={handleBack}
          disabled={isLoading}
        >
          Quay lại
        </button>
        <button
          className={styles.continueButton}
          onClick={handleSubmit}
          disabled={images.length < 3 || isLoading}
        >
          {isLoading ? 'Đang xử lý...' : 'Tiếp tục'}
        </button>
      </div>
      
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        onContinue={handleContinuePosting}
        formData={formData}
      />
    </div>
  );
};

export default ImageUploadModal;
