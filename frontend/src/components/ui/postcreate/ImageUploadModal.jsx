import React, { useState } from 'react';
import Modal from '../modal-reg-log';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpload,
  faPlus,
  faImage,
  faArrowsRotate,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import styles from '../../../styles/imageuploadmodal.module.css';

// Component modal để upload hình ảnh và video
const ImageUploadModal = ({ isOpen, onClose, onSubmit }) => {
  const [images, setImages] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);

  // Xử lý upload hình ảnh
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images];

    files.forEach(file => {
      if (newImages.length < 10 && file.type.startsWith('image/')) {
        newImages.push({
          file,
          preview: URL.createObjectURL(file)
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

  // Mở/đóng hướng dẫn
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Xử lý submit dữ liệu
  const handleSubmit = (e) => {
    e.preventDefault();
    // Chuẩn bị dữ liệu media để gửi
    const mediaData = {
      images: images.map(img => img.preview),
      videoUrl
    };
    // Gọi onSubmit với dữ liệu
    onSubmit({media : mediaData});
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Đăng tin bất động sản - Bước 2</h2>
      <div className={styles.imageUploadModal}>
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

        {/* Hướng dẫn đăng ảnh thường */}
        <div className={styles.guideline}>
          <div
            className={styles.guidelineHeader}
            onClick={() => toggleSection('regular')}
          >
            <FontAwesomeIcon icon={faImage} className={styles.guidelineIcon} />
            <span>Hướng dẫn đăng ảnh thường</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`${styles.chevronIcon} ${expandedSection === 'regular' ? styles.expanded : ''}`}
            />
          </div>
        </div>

        {/* Hướng dẫn đăng ảnh 360° */}
        <div className={styles.guideline}>
          <div
            className={styles.guidelineHeader}
            onClick={() => toggleSection('360')}
          >
            <FontAwesomeIcon icon={faArrowsRotate} className={styles.guidelineIcon} />
            <span>Hướng dẫn đăng ảnh 360°</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`${styles.chevronIcon} ${expandedSection === '360' ? styles.expanded : ''}`}
            />
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
          <button className={styles.backButton} onClick={onClose}>
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
      </div>
    </Modal>
  );
};

export default ImageUploadModal;

