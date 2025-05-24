
import { useState, useEffect } from 'react';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Modal from '../modal-reg-log.jsx';
import '../../../styles/cauhinhthanhtoan.css';

// Component modal để cấu hình thanh toán
const SubscriptionModalContent = ({ isOpen, onClose, onSubmit }) => {
  const [selectedPlan, setSelectedPlan] = useState('kim-cuong');
  const [selectedDuration, setSelectedDuration] = useState(7);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [selectedHour, setSelectedHour] = useState('Đúng ngày bây giờ');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Danh sách các gói tin
  const plans = [
    {
      id: 'kim-cuong',
      name: 'VIP Kim Cương',
      description: 'Hiển thị trên cùng',
      color: '#FF5757',
      badge: 'x30',
      benefit: 'Lượt tiếp cận\nso với tin thường',
      price: 306100,
      icon: '📍'
    },
    {
      id: 'vang',
      name: 'VIP Vàng',
      description: 'Dưới VIP Kim Cương',
      color: '#D6E94D',
      badge: 'x10',
      benefit: 'Lượt tiếp cận\nso với tin thường',
      price: 120600,
      icon: '📍'
    },
    {
      id: 'bac',
      name: 'VIP Bạc',
      description: 'Dưới VIP Vàng',
      color: '#A9A9A9',
      badge: 'x3',
      benefit: 'Lượt tiếp cận\nso với tin thường',
      price: 55700,
      icon: '📍'
    },
    {
      id: 'thuong',
      name: 'Tin thường',
      description: 'Hiển thị dưới cùng',
      color: '#E5E5E5',
      price: 3200,
      icon: '📍'
    }
  ];

  // Danh sách thời hạn đăng tin
  const durations = [
    { days: 7, price: 55700 },
    { days: 10, price: 52900 },
    { days: 15, price: 50100 }
  ];

  // Tính toán ngày kết thúc dựa trên ngày bắt đầu và số ngày
  useEffect(() => {
    const newEndDate = new Date(startDate);
    newEndDate.setDate(newEndDate.getDate() + selectedDuration);
    setEndDate(newEndDate);
  }, [startDate, selectedDuration]);

  // Format ngày theo định dạng DD/MM/YYYY
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const createFormData = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    const duration = durations.find(d => d.days === selectedDuration);
  
    // Xử lý giờ đăng tin
    let publishTime = null;
    if (selectedHour === 'Đúng ngày bây giờ') {
      publishTime = 'now';
    } else {
      const hour = selectedHour.split(':')[0];
      publishTime = parseInt(hour);
    }
  
    return {
      type: plan.id,                  // Ánh xạ plan.id thành ad_payment.type
      startDate: formatDate(startDate),  // Ánh xạ startDate
      endDate: formatDate(endDate),      // Ánh xạ endDate
      price: duration.price,         // Ánh xạ duration.price
      publishTime: publishTime       // Giờ đăng tin
    };
  };

  // Kiểm tra validation trước khi submit
  const validateForm = () => {
    const newErrors = {};

    if (!selectedPlan) {
      newErrors.plan = 'Vui lòng chọn loại tin';
    }

    if (!selectedDuration) {
      newErrors.duration = 'Vui lòng chọn thời hạn đăng tin';
    }

    if (!startDate) {
      newErrors.startDate = 'Vui lòng chọn ngày bắt đầu';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý khi nhấn nút tiếp tục
  const handleSubmit = () => {
    // Đánh dấu form đã được submit
    setFormSubmitted(true);
    if (validateForm()) {
      const adPaymentData = createFormData();
      // Gọi hàm onSubmit với dữ liệu đúng cấu trúc ad_payment
      onSubmit({ ad_payment: adPaymentData });
      onClose();
    }
  };

  // Xử lý khi nhấn nút quay lại
  const handleBack = () => {
    onClose();
  };

  // Format giá theo định dạng có dấu chấm phân cách hàng nghìn
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Lấy số ngày trong tháng
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Lấy ngày đầu tiên của tháng
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Tạo mảng các ngày để render calendar
  const generateCalendar = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    // Thêm ngày trống cho các ngày đầu tuần
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Thêm các ngày trong tháng
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  // Chuyển tháng trong calendar
  const changeMonth = (increment) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + increment);
    setCurrentMonth(newMonth);
  };

  // Xử lý khi chọn ngày từ calendar
  const handleDayClick = (day) => {
    if (day) {
      const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      setStartDate(newDate);
      setShowCalendar(false);
    }
  };

  // Xử lý khi chọn giờ
  const handleHourSelect = (hour) => {
    setSelectedHour(hour === 'now' ? 'Đúng ngày bây giờ' : `${hour}:00`);
    setShowTimeDropdown(false);
  };

  // Tạo mảng giờ từ 0-23
  const hours = ['now', ...Array.from({ length: 24 }, (_, i) => i)];

  // Render calendar
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = generateCalendar(year, month);
    const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const monthNames = [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];

    return (
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={() => changeMonth(-1)}><ChevronLeft size={16} /></button>
          <div>{monthNames[month]} {year}</div>
          <button onClick={() => changeMonth(1)}><ChevronRight size={16} /></button>
        </div>
        <div className="calendar-weekdays">
          {weekDays.map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        <div className="calendar-days">
          {days.map((day, index) => {
            const isCurrentDay = day &&
              startDate.getDate() === day &&
              startDate.getMonth() === month &&
              startDate.getFullYear() === year;

            return (
              <div
                key={index}
                className={`calendar-day ${!day ? 'empty' : ''} ${isCurrentDay ? 'selected' : ''}`}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="subscription-container">
        <div className="header">
          <h2>Bước 3. Cấu hình & Thanh toán</h2>
        </div>

        <div className="section">
          <h3>Chọn loại tin</h3>
          <div className="plan-grid">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''} ${formSubmitted && errors.plan ? 'error' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="plan-icon" style={{ backgroundColor: plan.color }}>
                  <span>{plan.icon}</span>
                </div>
                <div className="plan-info">
                  <div className="plan-name">{plan.name}</div>
                  <div className="plan-description">{plan.description}</div>
                </div>
                {plan.badge && (
                  <div className="plan-badge">
                    <span className="badge-multiplier" style={{ color: plan.color }}>{plan.badge}</span>
                    <span className="badge-text">{plan.benefit}</span>
                  </div>
                )}
                <div className="plan-price">
                  {formatPrice(plan.price)} đ/ngày
                </div>
              </div>
            ))}
          </div>
          {formSubmitted && errors.plan && <div className="error-message">{errors.plan}</div>}
        </div>

        <div className="duration-section">
          <div className="duration-header">
            <p>Đăng dài ngày hơn, tiết kiệm hơn!</p>
          </div>
          <div className={`duration-grid ${formSubmitted && errors.duration ? 'error-border' : ''}`}>
            {durations.map((duration) => (
              <div
                key={duration.days}
                className="duration-card"
                onClick={() => setSelectedDuration(duration.days)}
              >
                <div className="duration-info">
                  <div className="duration-days">{duration.days} ngày</div>
                  <div className="duration-price">{formatPrice(duration.price)} đ/ngày</div>
                </div>
                <div className={`duration-radio ${selectedDuration === duration.days ? 'selected' : ''}`}></div>
              </div>
            ))}
          </div>
          {formSubmitted && errors.duration && <div className="error-message">{errors.duration}</div>}
        </div>

        <div className="date-section">
          <div className="date-field">
            <label>Ngày bắt đầu</label>
            <div className="input-container">
              <input
                type="text"
                value={formatDate(startDate)}
                onClick={() => setShowCalendar(!showCalendar)}
                readOnly
                className={formSubmitted && errors.startDate ? 'error-input' : ''}
              />
              <Calendar className="input-icon" size={18} />
              {showCalendar && renderCalendar()}
            </div>
            <div className="end-date">Kết thúc ngày {formatDate(endDate)}</div>
            {formSubmitted && errors.startDate && <div className="error-message">{errors.startDate}</div>}
          </div>
          <div className="date-field">
            <label>Hạn giờ đăng tin</label>
            <div className="input-container">
              <div
                className="time-selector"
                onClick={() => setShowTimeDropdown(!showTimeDropdown)}
              >
                <span>{selectedHour}</span>
                <ChevronDown size={18} className="input-icon" />
              </div>
              {showTimeDropdown && (
                <div className="time-dropdown">
                  {hours.map((hour) => (
                    <div
                      key={hour === 'now' ? 'now' : `hour-${hour}`}
                      className="time-option"
                      onClick={() => handleHourSelect(hour)}
                    >
                      {hour === 'now' ? 'Đúng ngày bây giờ' : `${hour}:00`}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="actions">
          <button className="btn-back" onClick={handleBack}>Quay lại</button>
          <button className="btn-next" onClick={handleSubmit}>Tiếp tục</button>
        </div>
      </div>
    </Modal>
  );
};

export default SubscriptionModalContent;
