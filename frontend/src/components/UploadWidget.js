// src/components/CloudinaryUploadWidget.jsx
import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/imageuploadmodal.module.css';

const CloudinaryUploadWidget = forwardRef(({ uwConfig, onUpload, isAddMore }, ref) => {
 // Dòng này là để đảm bảo rằng Cloudinary SDK đã được tải trước khi sử dụng
  const cloudinaryRef = useRef();
    // Sử dụng useRef để giữ tham chiếu đến widget và button
  const widgetRef = useRef();
    // Tham chiếu đến nút để mở widget
  const buttonRef = useRef();
  
  useEffect(() => {
    // Kiểm tra xem Cloudinary đã được tải hay chưa 
    console.log('CloudinaryUploadWidget props:', { uwConfig, onUpload, isAddMore });
    // Nếu đã tải, tạo widget và gán sự kiện click
    if (window.cloudinary) {
    // Nếu Cloudinary đã được tải, khởi tạo widget
      cloudinaryRef.current = window.cloudinary;
      // Tạo widget upload với cấu hình đã cung cấp
      // Tạo mảng để lưu trữ tất cả các kết quả upload
      const uploadResults = [];
      
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (error) {
        console.error('Cloudinary upload error:', error);
        onUpload(error, null);
        return;
          }
          if (result.event === 'success') {
            console.log('Upload successful:', result.info);
            // Lưu kết quả vào mảng thay vì gọi onUpload ngay
            uploadResults.push(result.info);
          }
          // Kiểm tra sự kiện queues-end để biết khi nào tất cả các upload đã hoàn thành
          if (result.event === 'queues-end') {
            console.log('All uploads completed, results:', uploadResults);
            // Gọi onUpload với toàn bộ danh sách kết quả
            onUpload(null, uploadResults);
            // Reset mảng cho lần upload tiếp theo
            uploadResults.length = 0;
          }
          if (result.event === 'close') {
            console.log('Widget closed');
          }
        }
      );

      const handleClick = () => {
        console.log('Button clicked, opening widget');
        // Mở widget khi nút được nhấn
        widgetRef.current?.open();
      };

      const button = buttonRef.current;
      // Gắn sự kiện click vào nút
      if (button) {
        button.addEventListener('click', handleClick);
      }
      // Trả về hàm dọn dẹp để loại bỏ sự kiện và hủy widget khi component unmount
      return () => {
        // Loại bỏ sự kiện click khi component unmount
        if (button) {
            // Loại bỏ sự kiện click để tránh rò rỉ bộ nhớ
          button.removeEventListener('click', handleClick);
        }
        widgetRef.current?.destroy();
      };
    } else {
      console.error('Cloudinary SDK not loaded');
    }
  }, [uwConfig, onUpload, isAddMore]);
// Sử dụng useImperativeHandle để expose các phương thức cho component cha
  useImperativeHandle(ref, () => ({
    // Phương thức để mở widget từ bên ngoài
    open: () => {
        // Gọi hàm mở widget
      console.log('Programmatic open called');
      // Mở widget upload
      widgetRef.current?.open();
    },
  }));

  return (
    <button
      ref={buttonRef}
      className={isAddMore ? styles.addMoreImage : styles.uploadButton}
      title={isAddMore ? 'Thêm ảnh' : 'Tải ảnh lên'}
    >
      <FontAwesomeIcon icon={faPlus} />
      {!isAddMore && <span> Thêm ảnh lên từ thiết bị</span>}
    </button>
  );
});

export default CloudinaryUploadWidget;
