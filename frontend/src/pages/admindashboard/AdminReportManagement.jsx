import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/AdminReportManagement.module.css';

// Mock data for reports
const mockReports = [
  {
    report_id: '1',
    user_id: '2',
    property_id: '101',
    reason: 'Spam',
    detail: 'Bài đăng này là spam, thông tin không chính xác và lừa đảo',
    status: 'pending',
    created_at: '2024-06-15T10:30:00'
  },
  {
    report_id: '2',
    user_id: '1',
    property_id: '102',
    reason: 'Inappropriate Content',
    detail: 'Nội dung không phù hợp, có hình ảnh không phù hợp với quy định',
    status: 'reviewed',
    created_at: '2024-06-14T14:20:00'
  },
  {
    report_id: '3',
    user_id: '5',
    property_id: '103',
    reason: 'False Information',
    detail: 'Thông tin sai lệch về giá cả và vị trí bất động sản',
    status: 'pending',
    created_at: '2024-06-13T09:15:00'
  },
  {
    report_id: '4',
    user_id: '3',
    property_id: '104',
    reason: 'Duplicate Post',
    detail: 'Bài đăng trùng lặp, đã được đăng nhiều lần',
    status: 'resolved',
    created_at: '2024-06-12T16:45:00'
  }
];

// Mock user data
const mockUsers = {
  '1': { full_name: 'Nguyễn Văn An', email: 'nguyen.van.an@example.com', phone: '0987654321' },
  '2': { full_name: 'Trần Thị Bích', email: 'tran.thi.bich@example.com', phone: '0987654322' },
  '3': { full_name: 'Lê Văn Cường', email: 'le.van.cuong@example.com', phone: '0987654323' },
  '5': { full_name: 'Hoàng Minh Tuấn', email: 'hoang.minh.tuan@example.com', phone: '0987654325' }
};

// Mock property data
const mockProperties = {
  '101': {
    property_id: '101',
    title: 'Căn hộ cao cấp Quận 7',
    description: 'Căn hộ 2 phòng ngủ, view sông, nội thất cao cấp, gần trung tâm thương mại',
    price: 2500000000,
    address: '123 Nguyễn Hữu Thọ, Quận 7, TP.HCM',
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500']
  },
  '102': {
    property_id: '102',
    title: 'Nhà phố Thủ Đức',
    description: 'Nhà phố 3 tầng, khu vực yên tĩnh, gần trường học và bệnh viện',
    price: 3500000000,
    address: '456 Đường ABC, Thủ Đức, TP.HCM',
    images: ['https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500']
  },
  '103': {
    property_id: '103',
    title: 'Biệt thự Đà Lạt',
    description: 'Biệt thự nghỉ dưỡng view núi, không gian thoáng mát',
    price: 7000000000,
    address: '789 Trương Công Định, Đà Lạt',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500']
  },
  '104': {
    property_id: '104',
    title: 'Studio Quận 1',
    description: 'Studio mini tiện nghi, trung tâm thành phố',
    price: 1200000000,
    address: '321 Lê Lợi, Quận 1, TP.HCM',
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500']
  }
};

// Report Detail Modal Component
const ReportDetailModal = ({ report, isOpen, onClose, onDeleteProperty }) => {
  const [reportUser, setReportUser] = useState(null);
  const [reportedProperty, setReportedProperty] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && report) {
      fetchReportDetails(report);
    }
  }, [isOpen, report]);

  const fetchReportDetails = async (reportData) => {
    try {
      setLoading(true);
      
      // TODO: Replace with actual API calls
      // const userResponse = await axios.get(`/api/admin/users/${reportData.user_id}`);
      // const propertyResponse = await axios.get(`/api/admin/properties/${reportData.property_id}`);
      // setReportUser(userResponse.data);
      // setReportedProperty(propertyResponse.data);
      
      // Using mock data
      const user = mockUsers[reportData.user_id];
      const property = mockProperties[reportData.property_id];
      setReportUser(user);
      setReportedProperty(property);
    } catch (error) {
      console.error('Error fetching report details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ffc107';
      case 'reviewed':
        return '#17a2b8';
      case 'resolved':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'reviewed':
        return 'Đã xem xét';
      case 'resolved':
        return 'Đã giải quyết';
      default:
        return status;
    }
  };

  const getReason = (reason) => {
    switch (reason) {
      case 'Spam':
        return 'Spam';
      case 'Inappropriate Content':
        return 'Nội dung không phù hợp';
      case 'False Information':
        return 'Thông tin sai lệch';
      case 'Duplicate Post':
        return 'Bài đăng trùng lặp';
      default:
        return reason;
    }
  };

  if (!isOpen || !report) return null;

  return (
    <div className={styles.rmDetailModalOverlay} onClick={onClose}>
      <div className={styles.rmDetailModalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.rmDetailCloseButton} onClick={onClose}>
          ×
        </button>
        
        <div className={styles.rmDetailHeader}>
          <h2 className={styles.rmDetailTitle}>Chi tiết báo cáo</h2>
          <span 
            className={styles.rmDetailStatus}
            style={{ backgroundColor: getStatusColor(report.status) }}
          >
            {getStatusText(report.status)}
          </span>
        </div>

        <div className={styles.rmDetailBody}>
          {loading ? (
            <div className={styles.rmLoadingMessage}>Đang tải...</div>
          ) : (
            <>
              {/* Report Information */}
              <div className={styles.rmInfoSection}>
                <h3>Thông tin báo cáo</h3>
                <div className={styles.rmInfoGrid}>
                  <div className={styles.rmInfoItem}>
                    <strong>Lý do:</strong>
                    <span>{getReason(report.reason)}</span>
                  </div>
                  <div className={styles.rmInfoItem}>
                    <strong>Chi tiết:</strong>
                    <span>{report.detail}</span>
                  </div>
                  <div className={styles.rmInfoItem}>
                    <strong>Thời gian báo cáo:</strong>
                    <span>{formatDate(report.created_at)}</span>
                  </div>
                </div>
              </div>

              {/* Reporter Information */}
              {reportUser && (
                <div className={styles.rmInfoSection}>
                  <h3>Người báo cáo</h3>
                  <div className={styles.rmInfoGrid}>
                    <div className={styles.rmInfoItem}>
                      <strong>Họ tên:</strong>
                      <span>{reportUser.full_name}</span>
                    </div>
                    <div className={styles.rmInfoItem}>
                      <strong>Email:</strong>
                      <span>{reportUser.email}</span>
                    </div>
                    <div className={styles.rmInfoItem}>
                      <strong>Số điện thoại:</strong>
                      <span>{reportUser.phone}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Property Information */}
              {reportedProperty && (
                <div className={styles.rmInfoSection}>
                  <h3>Bất động sản bị báo cáo</h3>
                  <div className={styles.rmPropertyCard}>
                    <img 
                      src={reportedProperty.images?.[0] || '/placeholder-image.jpg'} 
                      alt={reportedProperty.title}
                      className={styles.rmPropertyImage}
                    />
                    <div className={styles.rmPropertyInfo}>
                      <h4 className={styles.rmPropertyTitle}>{reportedProperty.title}</h4>
                      <p className={styles.rmPropertyPrice}>{formatPrice(reportedProperty.price)}</p>
                      <p className={styles.rmPropertyAddress}>{reportedProperty.address}</p>
                      <p className={styles.rmPropertyDescription}>{reportedProperty.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className={styles.rmDetailActions}>
          <button
            className={styles.rmDeletePropertyButton}
            onClick={() => {
              if (window.confirm('Bạn có chắc chắn muốn xóa bài đăng này?')) {
                onDeleteProperty(report.property_id);
                onClose();
              }
            }}
          >
            Xóa bài đăng
          </button>
        </div>
      </div>
    </div>
  );
};

// Report Card Component
const ReportCard = ({ report, onViewDetails, onDeleteProperty }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ffc107';
      case 'reviewed':
        return '#17a2b8';
      case 'resolved':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'reviewed':
        return 'Đã xem xét';
      case 'resolved':
        return 'Đã giải quyết';
      default:
        return status;
    }
  };

  const getReason = (reason) => {
    switch (reason) {
      case 'Spam':
        return 'Spam';
      case 'Inappropriate Content':
        return 'Nội dung không phù hợp';
      case 'False Information':
        return 'Thông tin sai lệch';
      case 'Duplicate Post':
        return 'Bài đăng trùng lặp';
      default:
        return reason;
    }
  };

  const truncateText = (text, maxLength = 30) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const getUserName = (userId) => {
    const user = mockUsers[userId];
    return user ? user.full_name : `User #${userId}`;
  };

  const handleDeleteProperty = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài đăng này?')) {
      onDeleteProperty(report.property_id);
    }
  };

  return (
    <div className={styles.rmReportCard}>
      <div className={styles.rmReportUser}>
        <strong>{getUserName(report.user_id)}</strong>
        <span className={styles.rmUserId}>#{report.user_id}</span>
      </div>
      
      <div className={styles.rmReportReason}>
        {getReason(report.reason)}
      </div>
      
      <div className={styles.rmReportDetail}>
        {truncateText(report.detail)}
      </div>
      
      <div className={styles.rmReportStatus}>
        <span
          className={styles.rmStatusBadge}
          style={{ backgroundColor: getStatusColor(report.status) }}
        >
          {getStatusText(report.status)}
        </span>
      </div>
      
      <div className={styles.rmReportActions}>
        <button
          className={styles.rmDetailButton}
          onClick={() => onViewDetails(report)}
        >
          Chi tiết
        </button>
        <button
          className={styles.rmDeleteButton}
          onClick={handleDeleteProperty}
        >
          Xóa tin đăng
        </button>
      </div>
    </div>
  );
};

// Pagination Component (reuse from AdminUserManagement)
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);
    
    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className={styles.rmPagination}>
      <button
        className={styles.rmPaginationButton}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹ Trước
      </button>
      
      {getPageNumbers().map(page => (
        <button
          key={page}
          className={`${styles.rmPaginationButton} ${
            currentPage === page ? styles.rmPaginationActive : ''
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      
      <button
        className={styles.rmPaginationButton}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Tiếp ›
      </button>
    </div>
  );
};

// Main Component
const AdminReportManagement = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [reasonFilter, setReasonFilter] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch reports from API
  const fetchReports = async () => {
    try {
      setLoading(true);
      
      // TODO: Replace with actual API call
      // const response = await axios.get('/api/admin/reports');
      // setReports(response.data);
      
      // Using mock data
      setTimeout(() => {
        setReports(mockReports);
        setLoading(false);
      }, 500);
      
      setError('');
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError('Không thể tải danh sách báo cáo');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Filter reports based on search term, status, and reason
  useEffect(() => {
    let filtered = reports;

    // Filter by search term (user name or detail)
    if (searchTerm) {
      filtered = filtered.filter(report => {
        const userName = mockUsers[report.user_id]?.full_name || '';
        return userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
               report.detail.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    // Filter by reason
    if (reasonFilter) {
      filtered = filtered.filter(report => report.reason === reasonFilter);
    }

    setFilteredReports(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [reports, searchTerm, statusFilter, reasonFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReports = filteredReports.slice(startIndex, endIndex);

  // Handle property deletion
  const handleDeleteProperty = async (propertyId) => {
    try {
      // TODO: Replace with actual API call
      // await axios.delete(`/api/admin/properties/${propertyId}`);
      
      console.log('Deleted property:', propertyId);
      alert('Xóa bài đăng thành công!');
      
      // Optionally, you can also update the report status to 'resolved'
      setReports(prev => 
        prev.map(report => 
          report.property_id === propertyId 
            ? { ...report, status: 'resolved' }
            : report
        )
      );
    } catch (error) {
      console.error('Error deleting property:', error);
      setError('Không thể xóa bài đăng');
      alert('Có lỗi xảy ra khi xóa bài đăng!');
    }
  };

  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedReport(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setReasonFilter('');
  };

  if (loading) {
    return (
      <div className={styles.rmContainer}>
        <div className={styles.rmLoadingMessage}>Đang tải...</div>
      </div>
    );
  }

  return (
    <div className={styles.rmContainer}>
      <div className={styles.rmSection}>
        <h2 className={styles.rmSectionTitle}>Danh sách Báo cáo</h2>
        
        {/* Filters */}
        <div className={styles.rmFilterRow}>
          <input
            type="text"
            placeholder="Tìm kiếm theo người báo cáo hoặc chi tiết..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.rmSearchInput}
          />
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.rmFilterSelect}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="reviewed">Đã xem xét</option>
            <option value="resolved">Đã giải quyết</option>
          </select>
          
          <select
            value={reasonFilter}
            onChange={(e) => setReasonFilter(e.target.value)}
            className={styles.rmFilterSelect}
          >
            <option value="">Tất cả lý do</option>
            <option value="Spam">Spam</option>
            <option value="Inappropriate Content">Nội dung không phù hợp</option>
            <option value="False Information">Thông tin sai lệch</option>
            <option value="Duplicate Post">Bài đăng trùng lặp</option>
          </select>
          
          <button onClick={clearFilters} className={styles.rmClearButton}>
            Xóa bộ lọc
          </button>
        </div>

        {error && <div className={styles.rmErrorMessage}>{error}</div>}
        
        {/* Reports Header */}
        <div className={styles.rmReportsHeader}>
          <div className={styles.rmHeaderUser}>Người báo cáo</div>
          <div className={styles.rmHeaderReason}>Lý do</div>
          <div className={styles.rmHeaderDetail}>Chi tiết</div>
          <div className={styles.rmHeaderStatus}>Trạng thái</div>
          <div className={styles.rmHeaderActions}>Hành động</div>
        </div>
        
        {currentReports.length === 0 ? (
          <div className={styles.rmNoReportsMessage}>
            Không có báo cáo nào
          </div>
        ) : (
          <>
            <div className={styles.rmReportsList}>
              {currentReports.map((report) => (
                <ReportCard
                  key={report.report_id}
                  report={report}
                  onViewDetails={handleViewDetails}
                  onDeleteProperty={handleDeleteProperty}
                />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>

      {/* Report Detail Modal */}
      <ReportDetailModal
        report={selectedReport}
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        onDeleteProperty={handleDeleteProperty}
      />
    </div>
  );
};

export default AdminReportManagement;
