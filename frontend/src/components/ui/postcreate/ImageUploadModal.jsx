import React, { useEffect, useState, useCallback, useRef } from 'react';
import SuccessModal from './SuccessModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import styles from '../../../styles/imageuploadmodal.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../../../config';
import { cloudName, uploadPreset } from '../../../config';
import { Cloudinary } from '@cloudinary/url-gen';
import CloudinaryUploadWidget from '../../UploadWidget';

const ImageUploadModal = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editMode] = useState(location?.state?.mode ?? false);
  const widgetRef = useRef();

  // Cloudinary configuration
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  // Initialize images
  const [images, setImages] = useState(() => {
    const stateImages = location?.state?.images;
    if (stateImages && Array.isArray(stateImages)) {
      return stateImages.map((img, index) => ({
        id: `existing-${index}`,
        preview: img.image_url,
        isExisting: true,
      }));
    }
    return [];
  });

  const [videoUrl, setVideoUrl] = useState(location?.state?.media?.video_url || '');

  // Upload Widget Configuration
  const uwConfig = {
    cloudName,
    uploadPreset,
    sources: ['local', 'url', 'camera'],
    multiple: true,
    maxFiles: 10 - images.length,
    maxFileSize: 5 * 1024 * 1024,
    resourceType: 'image',
  };

  // Debug images
  useEffect(() => {
    console.log('Images state:', images);
  }, [images]);

  // Cleanup URLs
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image.preview && !image.isExisting) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [images]);

  // Authentication
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/*');
      return;
    }
    if (!location.state || !location.state.formData) {
      navigate('/post-create');
      return;
    }
    setFormData(location.state.formData);
  }, [location, navigate, isAuthenticated]);

  // Validate video URL
  const isValidVideoUrl = (url) => {
    if (!url) return true;
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    const tiktokRegex = /^(https?:\/\/)?(www\.)?tiktok\.com\/.+/;
    return youtubeRegex.test(url) || tiktokRegex.test(url);
  };

  // Handle Cloudinary upload
  const handleCloudinaryUpload = useCallback((error, result) => {
    console.log('handleCloudinaryUpload:', { error, result });
    if (error) {
      console.error('Cloudinary upload error:', error);
      alert('Lỗi khi upload ảnh lên Cloudinary');
      setUploading(false);
      return;
    }
    if (result) {
      if (images.length >= 10) {
        alert('Chỉ được upload tối đa 10 ảnh');
        setUploading(false);
        return;
      }
      if (Array.isArray(result)) {
        // Handle multiple uploads
        const newImages = result.map(item => ({
          id: item.public_id,
          preview: item.secure_url,
          isExisting: false,
        }));
        setImages((prev) => [...prev, ...newImages]);
      } else {
        // Handle single upload
        setImages((prev) => [
          ...prev,
          {
            id: result.public_id,
            preview: result.secure_url,
            isExisting: false,
          },
        ]);
      }
      setUploading(false);
    }
  }, [images.length]);

  // Remove image
  const handleRemoveImage = useCallback((index) => {
    setImages((prevImages) => {
      // Ensure index is valid
      const newImages = [...prevImages];
      // Check if the index is within bounds
      const imageToRemove = newImages[index];
      // If the image is not an existing one, revoke its URL. Revoking URL is important to free up memory.
      if (imageToRemove && imageToRemove.preview && !imageToRemove.isExisting) {
        // Revoke the object URL to free up memory
        URL.revokeObjectURL(imageToRemove.preview);
      }
      // Remove the image from the array
      newImages.splice(index, 1);
      return newImages;
    });
  }, []);

  // Video URL change
  const handleVideoUrlChange = (e) => {
    const url = e.target.value;
    setVideoUrl(url);
    if (url && !isValidVideoUrl(url)) {
      console.warn('URL video không hợp lệ');
    }
  };

  // Success modal
  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate('/profile');
  };

  const handleContinuePosting = () => {
    setIsSuccessModalOpen(false);
    navigate('/post-create');
  };

  // API call
  const letspostCreate = async (payload, updatedData) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Không tìm thấy token xác thực');
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      let response;
      if (editMode && updatedData.property_id) {
        console.log('Data payload (edit):', payload);
        response = await axios.put(`${API_URL}/properties/${updatedData.property_id}`, payload, config);
      } else {
        console.log('Data payload (create):', payload);
        response = await axios.post(`${API_URL}/properties/`, payload, config);
      }
      console.log('Backend response:', response.data);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
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

  // Form submission
  const handleDataSubmit = (mediaData) => {
    try {
      if (!mediaData || !mediaData.media) {
        console.error('Dữ liệu media không hợp lệ:', mediaData);
        return;
      }
      const updatedFormData = {
        ...formData,
        media: mediaData.media,
        user_id: user?.id,
      };
      console.log('✅ Form data:', updatedFormData);
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
          { feature_name: 'legalDocuments', feature_value: updatedFormData.legalDocuments || '' },
          { feature_name: 'furniture', feature_value: updatedFormData.furniture || '' },
          { feature_name: 'bedrooms', feature_value: updatedFormData.bedrooms || 0 },
          { feature_name: 'bathrooms', feature_value: updatedFormData.bathrooms || 0 },
          { feature_name: 'houseDirection', feature_value: updatedFormData.houseDirection || '' },
          { feature_name: 'balconyDirection', feature_value: updatedFormData.balconyDirection || '' },
        ],
        images: updatedFormData.media?.images ?? [],
        videos: updatedFormData.media?.videoUrl ? [{ video_url: updatedFormData.media.videoUrl }] : [],
        contact_name: updatedFormData.contact?.name || '',
        contact_email: updatedFormData.contact?.email || '',
        contact_phone: updatedFormData.contact?.phone || '',
        expire_at: new Date().toISOString(),
      };
      console.log('data_payload:', data_payload);
      setFormData(updatedFormData);
      letspostCreate(data_payload, updatedFormData);
    } catch (error) {
      console.error('Lỗi trong handleDataSubmit:', error);
      alert('Có lỗi xảy ra khi xử lý dữ liệu');
    }
  };

  // Back navigation
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
        { feature_name: 'legalDocuments', feature_value: formData.legalDocuments || '' },
        { feature_name: 'furniture', feature_value: formData.furniture || '' },
        { feature_name: 'bedrooms', feature_value: formData.bedrooms || 0 },
        { feature_name: 'bathrooms', feature_value: formData.bathrooms || 0 },
        { feature_name: 'houseDirection', feature_value: formData.houseDirection || '' },
        { feature_name: 'balconyDirection', feature_value: formData.balconyDirection || '' },
      ],
      images: images.map((img) => ({ image_url: img.preview })),
      videos: videoUrl ? [{ video_url: videoUrl }] : [],
      contact_name: formData.contact?.name || '',
      contact_email: formData.contact?.email || '',
      contact_phone: formData.contact?.phone || '',
      expire_at: '',
    };
    console.log('Data payload for back:', data_payload);
    navigate('/post-create', {
      state: { postToEdit: data_payload, mode: editMode },
    });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
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
        images: images.map((img) => ({
          caption: '',
          is_primary: false,
          image_url: img.preview,
        })),
        videoUrl: videoUrl || null,
      },
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
              <CloudinaryUploadWidget
                ref={widgetRef}
                uwConfig={uwConfig}
                onUpload={handleCloudinaryUpload}
                isAddMore={false}
              />
            </>
          ) : (
            <div className={styles.imageGrid}>
              {images.map((image, index) => {
                console.log(`Rendering image ${index}:`, image);
                return (
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
                );
              })}
              {images.length < 10 && (
                <CloudinaryUploadWidget
                  uwConfig={uwConfig}
                  onUpload={handleCloudinaryUpload}
                  isAddMore={true}
                />
              )}
            </div>
          )}
          {uploading && <p>Đang tải ảnh lên...</p>}
        </div>
      </div>

      <div className={styles.videoSection}>
        <h3>
          Video <span className={styles.optional}>(không bắt buộc)</span>
        </h3>
        <input
          type="text"
          className={styles.videoUrlInput}
          value={videoUrl}
          onChange={handleVideoUrlChange}
          placeholder="Dán đường dẫn Youtube hoặc Tiktok"
        />
        {videoUrl && !isValidVideoUrl(videoUrl) && (
          <div className={styles.errorMessage}>URL video không hợp lệ</div>
        )}
      </div>

      <div className={styles.actionButtons}>
        <button
          className={styles.backButton}
          onClick={handleBack}
          disabled={isLoading || uploading}
        >
          Quay lại
        </button>
        <button
          className={styles.continueButton}
          onClick={handleSubmit}
          disabled={images.length < 3 || isLoading || uploading}
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
