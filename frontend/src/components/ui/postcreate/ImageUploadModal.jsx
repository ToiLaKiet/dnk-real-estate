import React, { useEffect, useState } from 'react';
import SuccessModal from './SuccessModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpload,
  faPlus,
  // faImage,
  // faArrowsRotate,
  // faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import styles from '../../../styles/imageuploadmodal.module.css';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'

// Component modal để upload hình ảnh và video
const ImageUploadModal = () => {  
  const API_URL ='http://172.16.1.205:8080/'; // Thay đổi thành URL API của bạn
  const { user } = useAuth();
  const navigate = useNavigate();
  const locate = useLocation();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({})
  const [images, setImages] = useState([(formData.images)?.map((img) => img.image_url)] || []);
  const [videoUrl, setVideoUrl] = useState(formData.videos.video_url);
  const [editMode, setEditMode] = useState(locate?.state?.mode ?? false);

  useEffect(() => {
    if(!user) {
      alert('Bạn cần đăng nhập để thực hiện thao tác này');
      if (locate.state) {
          setFormData(locate.state.formData);
        }
    }
    else {
      // Nếu không có dữ liệu từ state, có thể redirect hoặc hiển thị thông báo
      navigate('/post-create');
      console.error('No form data provided');
    }
  }, []);
  // const [expandedSection, setExpandedSection] = useState(null);
  // Xử lý upload hình ảnh
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images];

    files.forEach(file => {
      // Kiểm tra định dạng file và kích thước
      if (newImages.length < 10 && file.type.startsWith('image/')) {
        newImages.push({
          // Tạo đối tượng hình ảnh mới với URL tạm thời
          file,
          preview: URL.createObjectURL(file),
        });
      }
    });
    setImages(newImages);
  };

  // Xóa hình ảnh
  const handleRemoveImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // Xử lý thay đổi URL video
  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  // Xử lý đóng SuccessModal
  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate('/profile'); // Điều hướng về trang home
  };

  // Xử lý đăng tiếp
  const handleContinuePosting = () => {
    setIsSuccessModalOpen(false);
    navigate('/post-create');
    setCurrentStep(1); // Quay lại bước 1
  };

  const handleDataSubmit = (newData, options = {}) => {
    try {
      // Kiểm tra dữ liệu đầu vào
      if (!newData || typeof newData !== 'object' || newData === null || Object.keys(newData).length === 0) {
        console.error("Dữ liệu không hợp lệ hoặc rỗng:", newData);
        return;
      }
      
      // Cập nhật formData
      setFormData((prev) => {
        const updatedData = { ...prev };
        console.log("Dữ liệu đầu vào:", newData);
  
        // Danh sách các key hợp lệ
        const validKeys = options.validKeys || ['media', 'address', 'contact', 'user'];

        Object.keys(newData).forEach((key) => {
          if (!validKeys.includes(key)) {
            console.warn(`Key không hợp lệ: ${key}`);
            return;
          }
  
          if (key === 'media') {
            // Kiểm tra dữ liệu media có hợp lệ không
            if (newData.media && typeof newData.media === 'object' && !Array.isArray(newData.media)) {
              // Cập nhật dữ liệu media
              updatedData['media'] = {
                images: newData.media.images || (prev.media?.images || []),
                videoUrl: newData.media.videoUrl || (prev.media?.videoUrl || '')
              };
            } else {
              console.warn("Dữ liệu media không hợp lệ:", newData.media);
            }
          } 
        });
        console.log("formData sau khi cập nhật:", updatedData);
        updatedData.user_id = user?.id; // Lưu ID người dùng vào formData
        console.log("✅ Form data sau khi hoàn tất ImageUploadModal:", updatedData);
        // Tạo payload để gửi về backend 
        const bayg = new Date().toLocaleDateString;

        const data_payload = {
          title: updatedData?.title || '',
          description : updatedData?.description|| '',
          address: updatedData?.address?.displayAddress|| '',
          property_type: updatedData?.type|| '',
          status: "pending",
          lat : updatedData.address?.coordinates?.lat || 0,
          lng : updatedData.address?.coordinates?.lng || 0,
          location_id : updatedData.address?.ward|| '', 
          area: updatedData.area || 0,
          price: updatedData.price || 0,
          features:[
            { feature_name: "category", feature_value: updatedData.property_type || '' },
            { feature_name: "legalDocuments", feature_value: updatedData.legalDocuments || '' },
            { feature_name: "legalDocuments", feature_value: updatedData.legalDocuments || '' },
            { feature_name: "furniture", feature_value: updatedData.furniture || '' },
            { feature_name: "bedrooms", feature_value: updatedData.bedrooms || 0 },
            { feature_name: "bathrooms", feature_value: updatedData.bathrooms || 0 },
            { feature_name: "houseDirection", feature_value: updatedData.houseDirection || '' },
            { feature_name: "balconyDirection", feature_value: updatedData.balconyDirection || '' },
          ],
          images : updatedData.media.images,
          videos:[{
           video_url:updatedData.media.videoUrl
          }],
          contact_name: updatedData.contact?.name || '',
          contact_email: updatedData.contact?.email || '',
          contact_phone: updatedData.contact?.phone || '',
          expire_at: bayg
        };

        const token = localStorage.getItem('token');
        // For post editing API call
        const responseFromBackend = {};
        if(editMode){
          data_payload.push({property_id: updatedData.property_id})
          console.log("Data payload gửi về backend:", data_payload);
          // Change to the route of post editing here.
          responseFromBackend = axios.post(API_URL+'properties/', data_payload,{
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
              }
            }
          )
        }
        // Gửi formData về backend (nếu cần) for post creating
        else
        {
          console.log("Data payload gửi về backend:", data_payload);
          responseFromBackend = axios.post(API_URL+'properties/', data_payload,{
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
              }
            }
          )
        }
        console.log("Data payload gửi về backend:", data_payload,"Payload này là cho chỉnh sửa tin:",editMode);
      if(responseFromBackend.data) {
        console.error("Lỗi từ backend:", responseFromBackend.data);
        return;
      }
      else
       setIsSuccessModalOpen(true);
      return updatedData;
      
      });
    } catch (error) {
      console.error("Lỗi trong handleDataSubmit:", error?.response?.data);
    }
  };

  // Mở/đóng hướng dẫn
  // const toggleSection = (section) => {
  //   setExpandedSection(expandedSection === section ? null : section);
  // };

  // Xử lý submit dữ liệu
  const handleSubmit = (e) => {
    e.preventDefault();
    // Chuẩn bị dữ liệu media để gửi
    const mediaData = {
      media:{
        images: images.map(img => ({
          caption: "",
          is_primary: false,
          image_url: img.preview
        })),
        videoUrl: videoUrl || null
      }
    };
    handleDataSubmit(mediaData)
  };
  
  return (
      <div className={styles.imageUploadModal}>
        <h2>Đăng tin bất động sản - Bước 2</h2>
        <div className={styles.hrContainer}>
          <hr className={styles.hrOrange} />
          <hr className={styles.hrBlue} />
        </div>
        <h2>Hình ảnh</h2>

        {/* Khu vực upload hình ảnh */}
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
                  <div key={index} className={styles.imagePreview}>
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

        {/* Nhập URL video */}
        <div className={styles.videoSection}>
          <h3>Video <span className={styles.optional}>(không bắt buộc)</span></h3>
          <input
            type="text"
            className={styles.videoUrlInput}
            value={videoUrl}
            onChange={handleVideoUrlChange}
            placeholder="Dán đường dẫn Youtube hoặc Tiktok"
          />
        </div>

        {/* Nút hành động */}
        <div className={styles.actionButtons}>
          <button className={styles.backButton} onClick={()=>navigate('/post-create',{state: {formData}, mode:{editMode} })}>
            Quay lại
          </button>
          <button
            className={styles.continueButton}
            onClick={handleSubmit}
            disabled={images.length < 3}
          >
            Tiếp tục
          </button>
        </div>
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={handleCloseSuccessModal}
          onContinue={handleContinuePosting}
          // onPreview = {() => navigate('/preview', { state: { updatedData } })}
          formData={formData}
        />
      </div>
  );
};

export default ImageUploadModal;

