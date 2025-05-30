import React, { useState, useEffect } from 'react';
import AddressModal from './AddressModal';
import ImageUploadModal from './ImageUploadModal';
import SubscriptionModalContent from './cauhinhthanhtoan';
import SuccessModal from './SuccessModal';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styles from '../../../styles/postcreate.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTag,
  faKey,
  faMagnifyingGlass,
  faHome,
  faRulerCombined,
  faMoneyBill,
  faFileContract,
  faCouch,
  faBed,
  faShower,
  faCompass,
  faWind,
  faUser,
  faEnvelope,
  faPhone,
  faHeading,
  faFileAlt
} from '@fortawesome/free-solid-svg-icons';

// Component chính để tạo bài đăng bất động sản
const PostCreate = ({ onClose }) => {
  // Khởi tạo state formData với cấu trúc đầy đủ
  const [formData, setFormData] = useState({
    type: '',
    address: {
      province: '',
      district: '',
      ward: '',
      street: '',
      project: '',
      displayAddress: '',
      coordinates: { lat: 0, lng: 0 }
    },
    propertyType: '',
    area: '',
    price: '',
    legalDocuments: '',
    furniture: '',
    bedrooms: '',
    bathrooms: '',
    houseDirection: '',
    balconyDirection: '',
    contact: { name: '', email: '', phone: '' },
    title: '',
    description: '',
    user: { email: '', phone: '' },
    createdAt: '',
    media: {
      images: [],
      videoUrl: ''
    },
    ad_payment: {
      type: '',
      startDate: '',
      endDate: '',
      price: '',
      publishTime: ''
    }
  });

  // State để quản lý trạng thái mở/đóng của các modal và bước hiện tại
  // Modal để chọn địa chỉ
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  // Modal để upload hình ảnh
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  // Modal để chọn gói đăng tin
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  // Modal để hiển thị thông báo thành công
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  // Bước hiện tại trong quá trình tạo bài đăng
  const [currentStep, setCurrentStep] = useState(1);

  // Đặt lại formData khi component unmount hoặc modal đóng
  useEffect(() => {
    return () => {
      setFormData({
        type: '',
        address: {
          province: '',
          district: '',
          ward: '',
          street: '',
          project: '',
          displayAddress: '',
          coordinates: { lat: 0, lng: 0 }
        },
        propertyType: '',
        area: '',
        price: '',
        legalDocuments: '',
        furniture: '',
        bedrooms: '',
        bathrooms: '',
        houseDirection: '',
        balconyDirection: '',
        contact: { name: '', email: '', phone: '' },
        title: '',
        description: '',
        user: { email: '', phone: '' },
        createdAt: '',
        media: {
          images: [],
          videoUrl: ''
        },
        ad_payment: {
          type: '',
          startDate: '',
          endDate: '',
          price: '',
          publishTime: ''
        }
      });
    };
  }, [onClose]);

  // Xử lý thay đổi dữ liệu từ các input
  const handleChange = (e) => {
    // Lấy tên và giá trị của trường input
    const { name, value } = e.target;
    if (name.includes('contact.')) { // Kiểm tra nếu trường là contact
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [field]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Xử lý thay đổi loại bài đăng (bán/cho thuê)
  const handleTypeChange = (type) => {
    // Kiểm tra nếu loại bài đăng đã được chọn
    setFormData((prev) => ({ ...prev, type: type }));
  };

  // Hàm xử lý submit form để mở modal upload hình ảnh
  const handleSubmit = (e) => {
    // Ngăn chặn hành vi mặc định của form
    e.preventDefault();
    setCurrentStep(2);
    // Nếu đã nhập địa chỉ thì mở modal upload hình ảnh
    setIsImageModalOpen(true);
  };

  // Hàm xử lý dữ liệu từ các modal
  const handleDataSubmit = (newData, options = {}) => {
    // Kiểm tra dữ liệu nhận được từ modal
    if (!newData || typeof newData !== 'object') {
      console.error("Dữ liệu không hợp lệ:", newData);
      return;
    }


    // Cập nhật formData với dữ liệu mới
    setFormData((prev) => {
      const updatedData = { ...prev };
      // Xử lý từng key trong newData
      // Ghi đè hoặc hợp nhất dữ liệu vào formData
      console.log("newData",newData);

      Object.keys(newData).forEach((key) => {
        // Nếu key là 'media', ghi đè dữ liệu media
        if (key === 'media') {
          // Ghi đè media
          updatedData.media = {
            images: newData.media?.images || prev.media.images,
            videoUrl: newData.media?.videoUrl || prev.media.videoUrl
          };
        } else if (key === 'ad_payment') {
          // Hợp nhất ad_payment
          updatedData.ad_payment = {
            ...prev.ad_payment,
            ...newData.ad_payment
          };
          setIsSuccessModalOpen(true);
        // Ghi log formData khi hoàn tất SubscriptionModalContent
        console.log("✅ Form data sau khi hoàn tất SubscriptionModalContent:", formData);
        // TODO: Gửi formData về backend
        // fetch('/api/properties', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => console.log('Thành công:', data))
        // .catch(error => console.error('Lỗi:', error));
        } else if (key === 'address' || key === 'contact' || key === 'user') {
          // Hợp nhất các object lồng nhau
          updatedData[key] = { ...prev[key], ...newData[key] };
        } else {
          // Ghi đè các trường đơn giản
          updatedData[key] = newData[key];
        }
      });

      // Log formData sau khi cập nhật để kiểm tra
      console.log("formData sau khi cập nhật:", updatedData);

      return updatedData;
    });

    // Xử lý logic đóng/mở modal và chuyển bước
    if (options.closeImageModal) {
      setIsImageModalOpen(false);
    }
    if (options.openSubscriptionModal) {
      setIsSubscriptionModalOpen(true);
    }
    if (options.nextStep) {
      setCurrentStep(options.nextStep);
    }
  };

  // Xử lý đóng SuccessModal
  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    onClose(); // Đóng toàn bộ PostCreate khi nhấn "Quản lý tin đăng"
  };

  // Xử lý đăng tiếp
  const handleContinuePosting = () => {
    setIsSuccessModalOpen(false);
    setCurrentStep(1); // Quay lại bước 1
  };

  return (
    <div className={styles.postCreate}>
      <h2>Đăng tin bất động sản - Bước {currentStep}</h2>
      <form onSubmit={handleSubmit}>
        {/* Box 1: Loại bài đăng */}
        <div className={styles.box}>
          <div className={styles.ncaubox}>
            <h3>Nhu cầu</h3>
            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={`${styles.typeButton} ${formData.type === 'sell' ? styles.active : ''}`}
                onClick={() => handleTypeChange('sell')}
              >
                <FontAwesomeIcon icon={faTag} className={styles.buttonIcon} />
                Bán
              </button>
              <button
                type="button"
                className={`${styles.typeButton} ${formData.type === 'rent' ? styles.active : ''}`}
                onClick={() => handleTypeChange('rent')}
              >
                <FontAwesomeIcon icon={faKey} className={styles.buttonIcon} />
                Cho thuê
              </button>
            </div>
          </div>
        </div>

        {/* Box 2: Thông tin địa chỉ */}
        <div className={styles.box}>
          <h3>Thông tin địa chỉ</h3>
          {formData.address.coordinates.lat ? (
            <LoadScript googleMapsApiKey="[YOUR_GOOGLE_MAPS_API_KEY]">
              <GoogleMap
                mapContainerStyle={{ height: '250px', width: '100%', borderRadius: '8px' }}
                center={formData.address.coordinates}
                zoom={15}
              >
                <Marker position={formData.address.coordinates} />
              </GoogleMap>
            </LoadScript>
          ) : (
            <div
              className={styles.fakeInput}
              onClick={() => setIsAddressModalOpen(true)}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.fakeInputIcon} />
              Nhập địa chỉ
            </div>
          )}
        </div>

        {/* Box 3: Thông tin chính */}
        <div className={styles.box}>
          <h3>Thông tin chính</h3>
          <label className={styles.formLabel}>
            <FontAwesomeIcon icon={faHome} className={styles.formLabelIcon} />
            Loại bất động sản
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className={styles.formSelect}
              required
            >
              <option value="">Chọn loại</option>
              <option value="Nhà ở">Nhà ở</option>
              <option value="Căn hộ">Căn hộ</option>
              <option value="Đất nền">Đất nền</option>
              <option value="Văn phòng">Văn phòng</option>
              <option value="Mặt bằng kinh doanh">Mặt bằng kinh doanh</option>
            </select>
          </label>
          <label className={styles.formLabel}>
            <FontAwesomeIcon icon={faRulerCombined} className={styles.formLabelIcon} />
            Diện tích (m²)
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </label>
          <label className={styles.formLabel}>
            <FontAwesomeIcon icon={faMoneyBill} className={styles.formLabelIcon} />
            Mức giá (VND)
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </label>
        </div>

        {/* Box 4: Thông tin khác */}
        <div className={styles.box}>
          <h3>Thông tin khác</h3>
          <label className={styles.formLabel}>
            <FontAwesomeIcon icon={faFileContract} className={styles.formLabelIcon} />
            Giấy tờ pháp lý
            <select
              name="legalDocuments"
              value={formData.legalDocuments}
              onChange={handleChange}
              className={styles.formSelect}
              required
            >
              <option value="">Chọn loại</option>
              <option value="Sổ đỏ">Sổ đỏ</option>
              <option value="Hợp đồng mua bán">Hợp đồng mua bán</option>
              <option value="Đang chờ cấp sổ">Đang chờ cấp sổ</option>
              <option value="Khác">Khác</option>
            </select>
          </label>
          <label className={styles.formLabel}>
            <FontAwesomeIcon icon={faCouch} className={styles.formLabelIcon} />
            Nội thất
            <select
              name="furniture"
              value={formData.furniture}
              onChange={handleChange}
              className={styles.formSelect}
              required
            >
              <option value="">Chọn loại</option>
              <option value="full">Đầy đủ</option>
              <option value="none">Không</option>
            </select>
          </label>
          <label className={styles.formLabel}>
            <FontAwesomeIcon icon={faBed} className={styles.formLabelIcon} />
            Số phòng ngủ
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </label>
          <label className={styles.formLabel}>
            <FontAwesomeIcon icon={faShower} className={styles.formLabelIcon} />
            Số phòng tắm vệ sinh
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </label>
          <label className={styles.formLabel}>
            <FontAwesomeIcon icon={faCompass} className={styles.formLabelIcon} />
            Hướng nhà
            <select
              name="houseDirection"
              value={formData.houseDirection}
              onChange={handleChange}
              className={styles.formSelect}
              required
            >
              <option value="">Chọn hướng</option>
              <option value="Đông">Đông</option>
              <option value="Tây">Tây</option>
              <option value="Nam">Nam</option>
              <option value="Bắc">Bắc</option>
              <option value="Đông Bắc">Đông Bắc</option>
              <option value="Đông Nam">Đông Nam</option>
              <option value="Tây Bắc">Tây Bắc</option>
              <option value="Tây Nam">Tây Nam</option>
            </select>
          </label>
          <label className={styles.formLabel}>
            <FontAwesomeIcon icon={faWind} className={styles.formLabelIcon} />
            Hướng ban công
            <select
              name="balconyDirection"
              value={formData.balconyDirection}
              onChange={handleChange}
              className={styles.formSelect}
            >
              <option value="">Chọn hướng</option>
              <option value="Đông">Đông</option>
              <option value="Tây">Tây</option>
              <option value="Nam">Nam</option>
              <option value="Bắc">Bắc</option>
              <option value="Đông Bắc">Đông Bắc</option>
              <option value="Đông Nam">Đông Nam</option>
              <option value="Tây Bắc">Tây Bắc</option>
              <option value="Tây Nam">Tây Nam</option>
            </select>
          </label>
        </div>

        {/* Box 5: Thông tin liên hệ */}
        <div className={styles.box}>
          <h3>Thông tin liên hệ</h3>
          <label className={styles.formLabel}>
            <FontAwesomeIcon icon={faUser} className={styles.formLabelIcon} />
            Tên liên hệ
            <input
              type="text"
              name="contact.name"
              value={formData.contact.name}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </label>
          <label className={styles.formLabel}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.formLabelIcon} />
            Email
            <input
              type="email"
              name="contact.email"
              value={formData.contact.email}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </label>
          <label className={styles.formLabel}>
            <FontAwesomeIcon icon={faPhone} className={styles.formLabelIcon} />
            Số điện thoại
            <input
              type="tel"
              name="contact.phone"
              value={formData.contact.phone}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </label>
        </div>

        {/* Box 6: Tiêu đề và mô tả */}
        <div className={styles.box}>
          <h3>Tiêu đề và mô tả</h3>
          <label className={styles.formLabel}>
            <FontAwesomeIcon icon={faHeading} className={styles.formLabelIcon} />
            Tiêu đề
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </label>
          <label className={styles.formLabel}>
            <FontAwesomeIcon icon={faFileAlt} className={styles.formLabelIcon} />
            Mô tả
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.formTextarea}
              required
            />
          </label>
        </div>

        <button type="submit" className={styles.submitButton}>
          Tiếp tục
        </button>
      </form>

      {/* Các modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSubmit={(data) => handleDataSubmit(data, { nextStep: 2 })}
        formData={formData}
      />
      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onSubmit={(data) => handleDataSubmit(data, { closeImageModal: true, openSubscriptionModal: true, nextStep: 3 })}
      />
      <SubscriptionModalContent
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        onSubmit={(data) => handleDataSubmit(data, { nextStep: 4, closeSubcriptionModal: false })}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        onContinue={handleContinuePosting}
        formData={formData}
      />
    </div>
  );
};

export default PostCreate;
