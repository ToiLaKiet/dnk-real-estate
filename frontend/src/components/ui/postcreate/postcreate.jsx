import React, { useEffect, useState } from 'react';
import AddressModal from './AddressModal';
import Login from '../../../pages/login/Dangnhap1.jsx';
import Modal from '../modal-reg-log'
import { useAuth } from '../context/AuthContext.jsx';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styles from '../../../styles/postcreate.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../styles/App.css'; // Import CSS styles for the component
import { useNavigate, useLocation } from 'react-router-dom';
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
  faFileAlt,
  faPencil,
  faBuilding
} from '@fortawesome/free-solid-svg-icons';

// Component chính để tạo bài đăng bất động sản
const PostCreate = () => {
  const navigate = useNavigate();
  const locate = useLocation();
  const [formData, setFormData] = useState({
    type: '', // done
    address: {
      province: '',
      district: '',
      ward: '',
      street: '',
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
    media: {
      images: [],
      videoUrl: ''
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postEdit, setPostEdit] = useState(locate?.state?.mode ?? false);
  const { user } = useAuth(); // Lấy thông tin người dùng từ context
  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
      setIsModalOpen(true);
    }
    //to check whether there is any passed data from previous component
    if (locate.state!=null) {
        console.log(locate.state.postToEdit);
        const data = locate.state.postToEdit;
        const features = {};
        data.features.forEach((f) => {
          features[f.feature_name] = f.feature_value;
        });
        setFormData({
          type: data.property_type || '',
          property_id: data.property_id,
          address: {
            province: '',  
            district: '',
            ward: data.location_id,
            street: '',
            displayAddress: data.address || '',
            coordinates: {
              lat: data.lat || 0,
              lng: data.lng || 0
            }
          },
          propertyType: data.category|| '',
          area: data.area || 0,
          price: data.price || 0,
          legalDocuments: features.legalDocuments || '',
          furniture: features.furniture || '',
          bedrooms: features.bedrooms || '',
          bathrooms: features.bathrooms || '',
          houseDirection: features.houseDirection || '',
          balconyDirection: features.balconyDirection || '',
          contact: {
            name: data.contact_name || data.contact.name || '',
            email: data.contact_email || data.contact.email || '',
            phone: data.contact_phone || data.contact.phone || ''
          },
          title: data.title || '',
          description: data.description || '',
          media: {
            images: (data.images || [])?.map((img) => img?.image_url || ''),
            videoUrl: (data.videos && data.videos[0]?.video_url) || ''
          }
        });
      }
  },[]);
  // State để quản lý trạng thái mở/đóng của các modal và bước hiện tại
  // Modal để chọn địa chỉ
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  // Bước hiện tại trong quá trình tạo bài đăng
  const [currentStep, setCurrentStep] = useState(1);

  // Xử lý thay đổi dữ liệu từ các input
  const handleChange = (e) => {
    const { name, value, type } = e.target;
  
    // Kiểm tra nếu là trường trong contact
    if (name.includes('contact.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [field]: value
        }
      }));
    } else {
      // Ép kiểu nếu là trường số
      const parsedValue = type === 'number' ? parseInt(value, 10) || 0 : value;
  
      setFormData((prev) => ({
        ...prev,
        [name]: parsedValue
      }));
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
    navigate('/post-create/image-upload', { state: { formData: formData , mode: postEdit } } );
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
            if (newData.media && typeof newData.media === 'object' && !Array.isArray(newData.media)) {
              updatedData['media'] = {
                images: newData.media.images || (prev.media?.images || []),
                videoUrl: newData.media.videoUrl || (prev.media?.videoUrl || '')
              };
            } else {
              console.warn("Dữ liệu media không hợp lệ:", newData.media);
            }
          } else if (['address', 'contact', 'user'].includes(key)) {
            if (newData[key] && typeof newData[key] === 'object' && !Array.isArray(newData[key])) {
              updatedData[key] = {
                ...(updatedData[key] || {}),
                ...newData[key]
              };
            } else {
              updatedData[key] = newData[key];
            }
          } else {
            updatedData[key] = newData[key];
          }
        });
  
        console.log("formData sau khi cập nhật:", updatedData);
  
        if (typeof options.nextStep === 'number' && options.nextStep >= 0) {
          setCurrentStep(options.nextStep);
        } else if (options.nextStep !== undefined) {
          console.warn("Giá trị nextStep không hợp lệ:", options.nextStep);
        }
  
        return updatedData;
      });
    } catch (error) {
      console.error("Lỗi trong handleDataSubmit:", error);
    }
  };

  return (
    <div className ='flex-box'>
      <div className={styles.postCreate}>
        {postEdit ? (<h2> Chỉnh sửa tin đăng bất động sản - Bước 1</h2>) :(
          <h2> Đăng tin bất động sản - Bước 1</h2>
        )
        }
        <div className={styles.hrContainer}>
          <hr className={styles.hrOrange} />
          <hr className={styles.hrBlue} />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Box 1: Loại bài đăng */}
          <div className={styles.box}>
            <div className={styles.ncaubox}>
              <h3 style={{paddingTop: 10}}>Nhu cầu</h3>
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
                <button
                type="button"
                className={`${styles.typeButton} ${formData.type === 'project' ? styles.active : ''}`}
                onClick={() => handleTypeChange('project')}
                >
                  <FontAwesomeIcon icon={faBuilding} className={styles.buttonIcon} />
                  Dự án
                </button>
              </div>
            </div>
          </div>

        {/* Box 2: Thông tin địa chỉ */}
          <div className={styles.box}>
            <h3>Thông tin địa chỉ</h3>
            {formData.address.coordinates.lat ? (
              <div className={styles.mapboxey}>
                <div className = {styles.editingbutton}>
                  <button color="primary" className={styles.editButton} onClick={() => setIsAddressModalOpen(true)}>
                    <FontAwesomeIcon icon={faPencil} className={styles.editIcon} />
                  </button>
                </div>
                <LoadScript googleMapsApiKey="[YOUR_GOOGLE_MAPS_API_KEY]">
                  <GoogleMap
                    mapContainerStyle={{ height: '250px', width: '100%', borderRadius: '8px' }}
                    center={formData.address.coordinates}
                    zoom={15}
                  >
                    <Marker position={formData.address.coordinates} />
                  </GoogleMap>
                </LoadScript>
              </div>
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

        {/*Nhập thông tin chi tiết*/}
          {formData.address.coordinates.lat ? (
          <>
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
                <option value="shophouse">Shophouse</option> 
                <option value="villa">Villa</option>
                <option value="land">Đất nền</option>
                <option value="townhouse">Nhà phố</option>
                <option value="apartment">Căn hộ</option>
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
                type="text"
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
                type="text"
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
          </>
          ):(
          <></>
          )}
        </form>
        {/* Các modal */}
        { isAddressModalOpen && (
        <AddressModal
          isOpen={isAddressModalOpen}
          onClose={() => setIsAddressModalOpen(false)}
          onSubmit={(data) => handleDataSubmit(data, { nextStep: 2 })}
          formData={formData}
        />
        )}
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={()=>navigate('/home')}>
          <Login onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default PostCreate;
