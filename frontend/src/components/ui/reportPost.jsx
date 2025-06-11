import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/Report.css';
import ErrorAlert  from './stuff/errorAlert'; // Adjust path if needed

function ReportPosts ({ propertyId, user_id }) {
  const [selectedReason, setSelectedReason] = useState('');
  const [description, setDescription] = useState('');
  const reasons = [
    'Địa chỉ bất động sản',
    'Các thông tin về giá, diện tích, mô tả',
    'Ảnh',
    'Trùng với tin đăng khác',
    'Không liên lạc được',
    'Tin không có thật',
    'Bất động sản đã bán',
    'Khác'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('debug');
    if (!user_id) {
      alert('Vui lòng đăng nhập để gửi báo cáo!');
      console.log(user_id)
      return;
    }

    if (!selectedReason) {
      alert('Vui lòng chọn một lý do báo cáo!');
      return;
    }

    const reportData = {
      propertyId,
      user_id: user_id,
      reason: selectedReason,
      description: description.trim(),
    };

    try {
      // await axios.post('/reports', reportData);
      alert('Báo cáo đã được gửi thành công!');
      setSelectedReason('');
      setDescription('');
    } catch (error) {
      ErrorAlert('Đã xảy ra lỗi khi gửi báo cáo. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="report-modal-content">
        <h2 className="report-title">Báo cáo tin đăng</h2>
        <form onSubmit={handleSubmit}>
            <div className="report-checklist">
            <h3>Lý do báo cáo</h3>
            {reasons.map((reason) => (
                <label key={reason} className="checklist-item">
                <input
                    type="radio"
                    name="report-reason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                />
                {reason}
                </label>
            ))}
            </div>
            <div className="report-feedback">
            <h3>Phản hồi thêm</h3>
            <textarea
                className="feedback-input"
                placeholder="Nhập nội dung"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            </div>
            <button type="submit" className="submit-button">
                Gửi
            </button>
        </form>
    </div>
  );
};

export default ReportPosts;
