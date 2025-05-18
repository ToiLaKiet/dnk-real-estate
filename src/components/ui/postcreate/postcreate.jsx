import React, { useState, useEffect } from 'react';
import AddressModal from './AddressModal';
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


const PostCreate = ({ onClose }) => {
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
    createdAt: ''
  });
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Reset formData when Modal closes
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
        createdAt: ''
      });
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('contact.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [field]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTypeChange = (type) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // TODO: Proceed to step 2
  };

  return (
    <div className={styles.postCreate}>
      <h2>Đăng tin bất động sản - Bước 1</h2>
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

        {/* Box 6: Tiêu đề */}
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

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default PostCreate;
