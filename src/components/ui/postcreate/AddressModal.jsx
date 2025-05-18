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
  
  const AddressModal = ({ isOpen, onClose, formData, setFormData }) => {
    const [tempAddress, setTempAddress] = useState({
      province: '',
      district: '',
      ward: '',
      street: '',
      project: '',
      displayAddress: ''
    });
    const [coordinates, setCoordinates] = useState(null);
    const [mapVisible, setMapVisible] = useState(false);
  
    const fetchCoordinates = useCallback(async () => {
      const address = `${tempAddress.street}, ${tempAddress.ward}, ${tempAddress.district}, ${tempAddress.province}`;
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=[YOUR_GOOGLE_MAPS_API_KEY]`
        );
        if (response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry.location;
          setCoordinates({ lat, lng });
          setMapVisible(true);
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    }, [tempAddress.street, tempAddress.ward, tempAddress.district, tempAddress.province]);
  
    useEffect(() => {
      if (tempAddress.displayAddress && !mapVisible) {
        fetchCoordinates();
      }
    }, [tempAddress.displayAddress, mapVisible, fetchCoordinates]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setTempAddress((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleConfirm = () => {
      setFormData((prev) => ({
        ...prev,
        address: { ...tempAddress, coordinates: coordinates || { lat: 0, lng: 0 } }
      }));
      onClose();
    };
  
    const handleMarkerDragEnd = (event) => {
      setCoordinates({
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      });
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className={styles.addressModal}>
          <h2>Nhập địa chỉ</h2>
          <div className={styles.formGroup}>
            <label>
              Tỉnh/Thành
              <select
                name="province"
                value={tempAddress.province}
                onChange={handleChange}
                required
              >
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
              <input
                type="text"
                name="district"
                value={tempAddress.district}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Phường/Xã
              <input
                type="text"
                name="ward"
                value={tempAddress.ward}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Đường/Phố
              <input
                type="text"
                name="street"
                value={tempAddress.street}
                onChange={handleChange}
              />
            </label>
            <label>
              Dự án
              <input
                type="text"
                name="project"
                value={tempAddress.project}
                onChange={handleChange}
              />
            </label>
            <label>
              Địa điểm hiển thị trên tin đăng
              <input
                type="text"
                name="displayAddress"
                value={tempAddress.displayAddress}
                onChange={handleChange}
                required
              />
            </label>
          </div>
  
          {mapVisible && coordinates && (
            <LoadScript googleMapsApiKey="[YOUR_GOOGLE_MAPS_API_KEY]">
              <GoogleMap
                mapContainerStyle={{ height: '300px', width: '100%' }}
                center={coordinates}
                zoom={15}
              >
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
