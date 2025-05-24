import React from 'react';
import Modal from '../modal-reg-log';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from '../../../styles/successmodal.module.css';

// Component modal chúc mừng tin đăng thành công
const SuccessModal = ({ isOpen, onClose, onContinue, formData }) => {

  // Lấy ngày hiện tại (11:01 AM +07, 21/05/2025)
  const currentDate = new Date();
  const startDate = currentDate.toLocaleDateString('vi-VN');
  const endDate = formData.ad_payment?.endDate || new Date(currentDate.setDate(currentDate.getDate() + 7)).toLocaleDateString('vi-VN');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.successModal}>
        <h2>Kết quả giao dịch</h2>
        <div className={styles.checkIcon}>
          <FontAwesomeIcon icon={faCheckCircle} size="3x" color="#FF0000" />
        </div>
        <p className={styles.mainMessage}>Tin đăng đã được ghi nhận</p>
        <p className={styles.subMessage}>
          Tin đã được ghi nhận và đang chờ duyệt trong vòng 8 giờ
        </p>
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span>Thời gian đăng</span>
            <span>{`${startDate} - ${endDate}`}</span>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.continueButton} onClick={onContinue}>
            Đăng tiếp
          </button>
          <button className={styles.manageButton} onClick={onClose}>
            Quản lý tin đăng
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;

