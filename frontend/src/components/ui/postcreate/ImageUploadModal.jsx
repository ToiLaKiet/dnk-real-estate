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
  const API_URL = 'http://172.16.2.34:8080/';
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Sửa typo: locate -> location
  
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Sửa lỗi editMode
  const [editMode] = useState(location?.state?.mode ?? false);
  
  // Khởi tạo images với structure nhất quán
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
  }, []);

  useEffect(() => {
    console.log(location.state);
    if (location.state === null) {
      navigate('/post-create');
    }
    else{
      setFormData(location.state.formData);
    }
  }, [location, navigate]);

  // Validate video URL
  const isValidVideoUrl = (url) => {
    if (!url) return true; // Optional field
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    const tiktokRegex = /^(https?:\/\/)?(www\.)?tiktok\.com\/.+/;
    return youtubeRegex.test(url) || tiktokRegex.test(url);
  };

  // Xử lý upload hình ảnh với validation tốt hơn
  const handleImageUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

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
    
    setImages(newImages);
  }, [images]);

  // Sửa lỗi xóa hình ảnh
  const handleRemoveImage = useCallback((index) => {
    const newImages = [...images];
    const imageToRemove = newImages[index];
    
    // Cleanup object URL nếu không phải existing image
    if (imageToRemove && imageToRemove.preview && !imageToRemove.isExisting) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    
    newImages.splice(index, 1);
    setImages(newImages);
  }, [images]);

  // Xử lý thay đổi URL video với validation
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

  // Sửa lỗi async logic
  const letspostCreate = async (payload, updatedData) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Không tìm thấy token xác thực');
      }

      let response;
      const config = {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      if (editMode) {
        payload['property_id'] = updatedData.property_id;
        console.log("Data payload gửi về backend (edit):", payload);
        // Cần thay đổi endpoint cho edit
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
        // Server responded with error status
        alert(`Lỗi từ server: ${error.response.data?.message || 'Có lỗi xảy ra'}`);
      } else if (error.request) {
        // Request was made but no response received
        alert('Không thể kết nối tới server. Vui lòng thử lại.');
      } else {
        // Something else happened
        alert(`Lỗi: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDataSubmit = (newData, options = {}) => {
    try {
      if (!newData || typeof newData !== 'object' || Object.keys(newData).length === 0) {
        console.error("Dữ liệu không hợp lệ hoặc rỗng:", newData);
        return;
      }
      
      setFormData((prev) => {
        const updatedData = { ...prev };
        console.log("Dữ liệu đầu vào:", newData);

        const validKeys = options.validKeys || ['media', 'address', 'contact', 'user'];

        Object.keys(newData).forEach((key) => {
          if (!validKeys.includes(key)) {
            console.warn(`Key không hợp lệ: ${key}`);
            return;
          }

          if (key === 'media') {
            if (newData.media && typeof newData.media === 'object' && !Array.isArray(newData.media)) {
              updatedData['media'] = {
                images: newData.media.images || (prev.media?.images || []),
                videoUrl: newData.media.videoUrl || (prev.media?.videoUrl || '')
              };
            } else {
              console.warn("Dữ liệu media không hợp lệ:", newData.media);
            }
          }
        });
        updatedData.user_id = user?.id;
        console.log("✅ Form data sau khi hoàn tất ImageUploadModal:", updatedData);
      
        // Tạo payload
        const data_payload = {
          title: updatedData?.title || '',
          description: updatedData?.description || '',
          address: updatedData?.address?.displayAddress || '',
          property_type: updatedData?.type || '',
          lat: updatedData.address?.coordinates?.lat || 0,
          lng: updatedData.address?.coordinates?.lng || 0,
          location_id: updatedData.address?.ward || '', 
          area: updatedData.area || 0,
          price: updatedData.price || 0,
          category: updatedData.propertyType || '',
          features: [
            { feature_name: "legalDocuments", feature_value: updatedData.legalDocuments || '' },
            { feature_name: "furniture", feature_value: updatedData.furniture || '' },
            { feature_name: "bedrooms", feature_value: updatedData.bedrooms || 0 },
            { feature_name: "bathrooms", feature_value: updatedData.bathrooms || 0 },
            { feature_name: "houseDirection", feature_value: updatedData.houseDirection || '' },
            { feature_name: "balconyDirection", feature_value: updatedData.balconyDirection || '' },
          ],
          images: updatedData.media?.images ?? [],
          videos: [{
            video_url: updatedData.media?.videoUrl ?? ''
          }],
          contact_name: updatedData.contact?.name || '',
          contact_email: updatedData.contact?.email || '',
          contact_phone: updatedData.contact?.phone || '',
          expire_at: new Date().toISOString() // Sửa lỗi date
        };
        console.log('data_payload',data_payload);
        letspostCreate(data_payload, updatedData);
        return data_payload;
      });
    } catch (error) {
      console.error("Lỗi trong handleDataSubmit:", error);
      alert('Có lỗi xảy ra khi xử lý dữ liệu');
    }
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
          onClick={() => navigate('/post-create', {
            state: { formData, mode: editMode }
          })}
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
