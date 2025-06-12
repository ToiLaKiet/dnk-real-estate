import React, { useState, useEffect, useCallback } from 'react';
import Modal from '../modal-reg-log';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styles from '../../../styles/addressmodal.module.css';
const API_URL = 'http://172.16.2.34:8080'
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const CACHE_KEY = 'provinces_cache';

const AddressModal = ({ isOpen, onClose, onSubmit }) => {
  const [tempAddress, setTempAddress] = useState({
    province: '',
    district: '',
    ward: '',
    street: '',
    houseNumber: '',
    displayAddress: '',
    coordinates: { lat: 16.047079, lng: 108.206230 } // Default: Đà Nẵng
  });
  const [coordinates, setCoordinates] = useState({ lat: 16.047079, lng: 108.206230 });
  const [provinceName, setProvinceName] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [wardName, setWardName] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [isLoading, setIsLoading] = useState({ province: false, district: false, ward: false });
  const [errors, setErrors] = useState({});
  const [mapVisible, setMapVisible] = useState(false);

  // Generate displayAddress from names
  const generateDisplayAddress = useCallback(() => {
    const parts = [
      tempAddress.houseNumber,
      tempAddress.street,
      wardName,
      districtName,
      provinceName
    ].filter(part => part);
    return parts.join(', ');
  }, [tempAddress.houseNumber, tempAddress.street, wardName, districtName, provinceName]);

  // Update displayAddress
  useEffect(() => {
    const address = generateDisplayAddress();
    setTempAddress(prev => ({ ...prev, displayAddress: address }));
  }, [generateDisplayAddress]);

  // Fetch coordinates from Google Maps API
  //useCallback to avoid unnecessary re-renders
  const fetchCoordinates = useCallback(async () => {
    const address = generateDisplayAddress();
    if (!address) return;
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`
      );
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        setCoordinates({ lat, lng });
        setTempAddress(prev => ({ ...prev, coordinates: { lat, lng } }));
        setMapVisible(true);
      } else {
        setErrors(prev => ({ ...prev, coordinates: 'Không tìm thấy tọa độ cho địa chỉ này.' }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, coordinates: 'Lỗi khi lấy tọa độ. Vui lòng thử lại.' }));
      console.error('Error fetching coordinates:', error);
    }
  }, [generateDisplayAddress]);

  // Trigger fetchCoordinates after houseNumber change, if no errors
  useEffect(() => {
    if (tempAddress.houseNumber && tempAddress.province && tempAddress.district && tempAddress.ward && tempAddress.street) {
      fetchCoordinates();
    }
  }, [tempAddress.houseNumber, fetchCoordinates]);

  // Fetch provinces from cache or backend
  useEffect(() => {
    const fetchProvinces = async () => {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        setProvinces(JSON.parse(cached));
        return;
      }
      setIsLoading(prev => ({ ...prev, province: true }));
      try {
        const response = await axios.get(API_URL+'/locations/?type=province'); 
        const data = response.data;
        setProvinces(data.map(({ location_id, name }) => ({ location_id, name })));
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        setErrors(prev => ({ ...prev, province: null }));
      } catch (error) {
        setErrors(prev => ({ ...prev, province: 'Failed to load provinces. Please try again.' }));
        alert('Failed to load provinces. Please try again.');
      } finally {
        setIsLoading(prev => ({ ...prev, province: false }));
      }
    };
    fetchProvinces();
  }, []);

  // Fetch districts when province changes
  useEffect(() => {
    if (!tempAddress.province) {
      setDistricts([]);
      setWards([]);
      setTempAddress(prev => ({ ...prev, district: '', ward: '', street: '', houseNumber: '' }));
      setDistrictName('');
      setWardName('');
      return;
    }
    const fetchDistricts = async () => {
      setIsLoading(prev => ({ ...prev, district: true }));
      try {

        const response = await axios.get(`${API_URL}/locations/?type=district&parent_id=${tempAddress.province}`);
        const data = response.data;
        setDistricts(data.map(({ location_id, name }) => ({ location_id, name })));
        setErrors(prev => ({ ...prev, district: data.length ? null : 'No districts available.' }));
      } catch (error) {
        setErrors(prev => ({ ...prev, district: 'Failed to load districts. Please try again.' }));
        console.error('Error fetching districts:', error);
      } finally {
        setIsLoading(prev => ({ ...prev, district: false }));
      }
    };
    fetchDistricts();
  }, [tempAddress.province]);

  // Fetch wards when district changes
  useEffect(() => {
    if (!tempAddress.district) {
      setWards([]);
      setTempAddress(prev => ({ ...prev, ward: '', street: '', houseNumber: '' }));
      setWardName('');
      return;
    }
    const fetchWards = async () => {
      setIsLoading(prev => ({ ...prev, ward: true }));
      try {
        const response = await axios.get(`${API_URL}/locations/?type=ward&parent_id=${tempAddress.district}`);
        const data = response.data;
        setWards(data.map(({ location_id, name }) => ({ location_id, name })));
        setErrors(prev => ({ ...prev, ward: data.length ? null : 'No wards available.' }));
      } catch (error) {
        setErrors(prev => ({ ...prev, ward: 'Failed to load wards. Please try again.' }));
        console.error('Error fetching wards:', error.response.data);
      } finally {
        setIsLoading(prev => ({ ...prev, ward: false }));
      }
    };
    fetchWards();
  }, [tempAddress.district]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempAddress(prev => ({ ...prev, [name]: value }));
    console.log('Address change:', name, value);
    // Update names based on selection
    if (name === 'province') {
      const selected = provinces.find(p => p.location_id === value);
      setProvinceName(selected ? selected.name : '');
      console.log('Selected province:', selected); 
    } else if (name === 'district') {
      const selected = districts.find(d => d.location_id === value);
      setDistrictName(selected ? selected.name : '');
    } else if (name === 'ward') {
      const selected = wards.find(w => w.location_id === value);
      setWardName(selected ? selected.name : '');
    }
  };

  const handleConfirm = () => {
    const newErrors = {};
    if (!tempAddress.province) newErrors.province = 'Please select province';
    if (!tempAddress.district) newErrors.district = 'Please select district';
    if (!tempAddress.ward) newErrors.ward = 'Please select ward';
    if (!tempAddress.street) newErrors.street = 'Please enter street';
    if (!tempAddress.houseNumber) newErrors.houseNumber = 'Please enter house number';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit({ address: tempAddress });
      onClose();
    }
  };

  const handleMarkerDragEnd = (event) => {
    const newCoords = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setCoordinates(newCoords);
    setTempAddress(prev => ({ ...prev, coordinates: newCoords }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.amAddressModal}>
        <h2>Nhập địa chỉ</h2>
        <div className={styles.amFormGroup}>
          <label>
            Tỉnh/Thành
            <select
              name="province"
              value={tempAddress.province}
              onChange={handleChange}
              disabled={isLoading.province}
            >
              <option value="">Choose province</option>
              {provinces.map(({ location_id, name }) => (
                <option key={location_id} value={location_id}>
                  {name}
                </option>
              ))}
            </select>
            {isLoading.province && <span>Loading...</span>}
            {errors.province && <span className={styles.amError}>{errors.province}</span>}
          </label>
          <label>
            Quận/Huyện
            <select
              name="district"
              value={tempAddress.district}
              onChange={handleChange}
              disabled={!tempAddress.province || isLoading.district || !districts.length}
            >
              <option value="">Choose district</option>
              {districts.map(({ location_id, name }) => (
                <option key={location_id} value={location_id}>
                  {name}
                </option>
              ))}
            </select>
            {isLoading.district && <span>Loading...</span>}
            {errors.district && <span className={styles.amError}>{errors.district}</span>}
          </label>
          <label>
            Phường/Xã
            <select
              name="ward"
              value={tempAddress.ward}
              onChange={handleChange}
              disabled={!tempAddress.district || isLoading.ward || !wards.length}
            >
              <option value="">Choose ward</option>
              {wards.map(({ location_id, name }) => (
                <option key={location_id} value={location_id}>
                  {name}
                </option>
              ))}
            </select>
            {isLoading.ward && <span>Loading...</span>}
            {errors.ward && <span className={styles.amError}>{errors.ward}</span>}
          </label>
          <label>
            Đường/Phố
            <input
              type="text"
              name="street"
              value={tempAddress.street}
              onChange={handleChange}
              disabled={!tempAddress.ward}
            />
            {errors.street && <span className={styles.amError}>{errors.street}</span>}
          </label>
          <label>
            Số nhà
            <input
              type="text"
              name="houseNumber"
              value={tempAddress.houseNumber}
              onChange={handleChange}
              disabled={!tempAddress.ward}
            />
            {errors.houseNumber && <span className={styles.amError}>{errors.houseNumber}</span>}
          </label>
        </div>

        {mapVisible && coordinates && (
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={{ height: '300px', width: '100%' }} center={coordinates} zoom={15}>
              <Marker position={coordinates} draggable onDragEnd={handleMarkerDragEnd} />
            </GoogleMap>
          </LoadScript>
        )}
        {errors.coordinates && <span className={styles.amError}>{errors.coordinates}</span>}

        <div className={styles.amButtons}>
          <button onClick={handleConfirm} className={styles.amConfirmButton}>
            Xác nhận
          </button>
          <button onClick={onClose} className={styles.amBackButton}>
            Quay lại
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddressModal;
