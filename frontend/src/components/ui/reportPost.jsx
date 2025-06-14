import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/Report.css';
import ErrorAlert  from './stuff/errorAlert'; // Adjust path if needed
const API_URL = 'http://172.16.1.219:8080'
function ReportPosts ({ propertyId, user_id }) {
  const [selectedReason, setSelectedReason] = useState('');
  const [description, setDescription] = useState('');
  const reasons = [
    'Địa chỉ bất động sản',
    'Các thông tin về giá, diện tích, mô tả',
    'Ảnh trùng với tin đăng khác',
    'Không liên lạc được',
    'Tin không có thật',
    'Bất động sản đã bán',
    'Khác'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user_id) {
      alert('Vui lòng đăng nhập để gửi báo cáo!');
      console.log(user_id)
      return;
    }

    if (!selectedReason) {
      alert('Vui lòng chọn một lý do báo cáo!');
      return;
    }

    const property_id = parseInt(propertyId, 10);
    const reportData = {
      property_id: property_id,
      reason: selectedReason,
      description: description.trim(),
    };
    console.log('Report submitted:', reportData);
    try {
      const response = await axios.post(API_URL+'/reports', reportData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming user_id is a token or session ID
        },
      });
      console.log(response.data);
      alert('Báo cáo đã được gửi thành công!');
      setSelectedReason('');
      setDescription('');
    } catch (error) {
      alert('Đã xảy ra lỗi khi gửi báo cáo. Vui lòng thử lại sau.');
      console.log('Error submitting report:', error);
    }
  };

  return (
    <div>
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
