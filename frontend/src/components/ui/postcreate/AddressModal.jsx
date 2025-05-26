import React, { useState, useEffect, useCallback } from 'react';
import Modal from '../modal-reg-log';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styles from '../../../styles/addressmodal.module.css';

const provinces = [
  "Hà Nội", "Hà Giang", "Cao Bằng", "Bắc Kạn", "Tuyên Quang", "Lào Cai",
  "Điện Biên", "Lai Châu", "Sơn La", "Yên Bái", "Hoà Bình", "Thái Nguyên",
  "Lạng Sơn", "Quảng Ninh", "Bắc Giang", "Phú Thọ", "Vĩnh Phúc", "Bắc Ninh",
  "Hải Dương", "Hải Phòng", "Hưng Yên", "Thái Bình", "Hà Nam", "Nam Định",
  "Ninh Bình", "Thanh Hóa", "Nghệ An", "Hà Tĩnh", "Quảng Bình", "Quảng Trị",
  "Thừa Thiên Huế", "Đà Nẵng", "Quảng Nam", "Quảng Ngãi", "Bình Định", "Phú Yên",
  "Khánh Hòa", "Ninh Thuận", "Bình Thuận", "Kon Tum", "Gia Lai", "Đắk Lắk",
  "Đắk Nông", "Lâm Đồng", "Bình Phước", "Tây Ninh", "Bình Dương", "Đồng Nai",
  "Bà Rịa - Vũng Tàu", "Hồ Chí Minh", "Long An", "Tiền Giang", "Bến Tre",
  "Trà Vinh", "Vĩnh Long", "Đồng Tháp", "An Giang", "Kiên Giang", "Cần Thơ",
  "Hậu Giang", "Sóc Trăng", "Bạc Liêu", "Cà Mau"
];

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const AddressModal = ({ isOpen, onClose, onSubmit }) => {
  const [tempAddress, setTempAddress] = useState({
    province: '',
    district: '',
    ward: '',
    street: '',
    project: '',
    houseNumber: '', // Thay displayAddress bằng houseNumber
    displayAddress: '', // Vẫn giữ displayAddress để lưu giá trị gộp
    coordinates: { lat: 16.047079, lng: 108.206230 } // Mặc định trung tâm Đà Nẵng
  });
  const [coordinates, setCoordinates] = useState({ lat: 16.047079, lng: 108.206230 });
  const [mapVisible, setMapVisible] = useState(false);
  const [error, setError] = useState(null);

  // Hàm gộp các trường thành displayAddress
  const generateDisplayAddress = useCallback(() => {
    const parts = [
      tempAddress.houseNumber,
      tempAddress.street,
      tempAddress.ward,
      tempAddress.district,
      tempAddress.province
    ].filter(part => part); // Loại bỏ các trường rỗng
    return parts.join(', ');
  }, [tempAddress.houseNumber, tempAddress.street, tempAddress.ward, tempAddress.district, tempAddress.province]);

  // Cập nhật displayAddress khi các trường liên quan thay đổi
  useEffect(() => {
    setTempAddress((prev) => ({
      ...prev,
      displayAddress: generateDisplayAddress()
    }));
  }, [tempAddress.houseNumber, tempAddress.street, tempAddress.ward, tempAddress.district, tempAddress.province, generateDisplayAddress]);

  // Lấy tọa độ từ Google Maps API
  const fetchCoordinates = useCallback(async () => {
    setError(null);
    const address = generateDisplayAddress();
    if (!address) return; // Không gọi API nếu địa chỉ rỗng
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`
      );
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        setCoordinates({ lat, lng });
        setTempAddress((prev) => ({ ...prev, coordinates: { lat, lng } }));
        setMapVisible(true);
      } else {
        setError('Không tìm thấy tọa độ cho địa chỉ này.');
      }
    } catch (error) {
      setError('Lỗi khi lấy tọa độ. Vui lòng thử lại.');
      console.error('Error fetching coordinates:', error);
    }
  }, [generateDisplayAddress]);

  // Gọi fetchCoordinates khi các trường địa chỉ thay đổi
  useEffect(() => {
    if (tempAddress.houseNumber || tempAddress.street || tempAddress.ward || tempAddress.district || tempAddress.province) {
      fetchCoordinates();
    }
  }, [tempAddress.houseNumber, tempAddress.street, tempAddress.ward, tempAddress.district, tempAddress.province, fetchCoordinates]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = () => {
    if (!tempAddress.province || !tempAddress.district || !tempAddress.ward || !tempAddress.houseNumber) {
      setError('Vui lòng nhập đầy đủ các trường bắt buộc.');
      return;
    }
    onSubmit({ address: tempAddress });
    onClose();
  };

  const handleMarkerDragEnd = (event) => {
    const newCoords = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setCoordinates(newCoords);
    setTempAddress((prev) => ({ ...prev, coordinates: newCoords }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.addressModal}>
        <h2>Nhập địa chỉ</h2>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.formGroup}>
          <label>
            Tỉnh/Thành
            <select name="province" value={tempAddress.province} onChange={handleChange} required>
              <option value="">Chọn tỉnh/thành</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </label>
          <label>
            Quận/Huyện
            <input type="text" name="district" value={tempAddress.district} onChange={handleChange} required />
          </label>
          <label>
            Phường/Xã
            <input type="text" name="ward" value={tempAddress.ward} onChange={handleChange} required />
          </label>
          <label>
            Đường/Phố
            <input type="text" name="street" value={tempAddress.street} onChange={handleChange} />
          </label>
          <label>
            Dự án
            <input type="text" name="project" value={tempAddress.project} onChange={handleChange} />
          </label>
          <label>
            Số nhà
            <input type="text" name="houseNumber" value={tempAddress.houseNumber} onChange={handleChange} required />
          </label>
        </div>

        {mapVisible && coordinates && (
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={{ height: '300px', width: '100%' }} center={coordinates} zoom={15}>
              <Marker position={coordinates} draggable onDragEnd={handleMarkerDragEnd} />
            </GoogleMap>
          </LoadScript>
        )}

        <div className={styles.buttons}>
          <button onClick={handleConfirm} className={styles.confirmButton}>
            Xác nhận
          </button>
          <button onClick={onClose} className={styles.backButton}>
            Quay lại
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddressModal;
