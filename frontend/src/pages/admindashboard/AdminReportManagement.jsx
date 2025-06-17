import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/AdminReportManagement.module.css';
import { API_URL } from '../../config.js';
import { useNavigate } from 'react-router-dom';
// Report Detail Modal Component

const ReportDetailModal = ({ report, isOpen, onClose, onDeleteProperty }) => {
  const [reportUser, setReportUser] = useState(null);
  const [reportedProperty, setReportedProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && report) {
      fetchReportDetails(report);
    }
  }, [isOpen, report]);

  const fetchReportDetails = async (reportData) => {
    try {
      setLoading(true);
      // TODO: Replace with actual API calls
      const userResponse = await axios.get(API_URL+`/users/${reportData.user_id}`);
      const propertyResponse = await axios.get(API_URL+`/properties/${reportData.property_id}`);
      setReportUser(userResponse.data);
      setReportedProperty(propertyResponse.data);
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
      case 'Địa chỉ bất động sản':
        return 'Địa chỉ bất động sản';
      case 'Các thông tin về giá, diện tích, mô tả':
        return 'Các thông tin về giá, diện tích, mô tả';
      case 'Ảnh trùng với tin đăng khác':
        return 'Ảnh trùng với tin đăng khác';
      case 'Không liên lạc được':
        return 'Không liên lạc được';
      case 'Tin không có thật':
        return 'Tin không có thật';
      case 'Bất động sản đã bán':
        return 'Bất động sản đã bán';
      case 'Khác':
        return 'Khác';
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
                      <span>{reportUser.phone_number}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Property Information */}
              {reportedProperty && (
                <div className={styles.rmInfoSection} onClick={()=>navigate('/postspage/'+reportedProperty.property_id)}>
                  <h3>Bất động sản bị báo cáo</h3>
                  <div className={styles.rmPropertyCard}>
                    <img 
                      src={reportedProperty.images?.[0].image_url || '/placeholder-image.jpg'} 
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
const ReportCard = ({ report, onViewDetails, onDeleteProperty, users }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ffc107';
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
      case 'resolved':
        return 'Đã giải quyết';
      default:
        return status;
    }
  };

  const getReason = (reason) => {
    switch (reason) {
      case 'Địa chỉ bất động sản':
        return 'Địa chỉ bất động sản';
      case 'Các thông tin về giá, diện tích, mô tả':
        return 'Các thông tin về giá, diện tích, mô tả';
      case 'Ảnh trùng với tin đăng khác':
        return 'Ảnh trùng với tin đăng khác';
      case 'Không liên lạc được':
        return 'Không liên lạc được';
      case 'Tin không có thật':
        return 'Tin không có thật';
      case 'Bất động sản đã bán':
        return 'Bất động sản đã bán';
      case 'Khác':
        return 'Khác';
      default:
        return reason;
    }
  };

  const truncateText = (text, maxLength = 30) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const getUserName = (userId) => {
    const user = users[userId];
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
  const [users, setUsers] = useState({});
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch reports from API
  const fetchReports = async () => {
    try {
      setLoading(true);
      
      // TODO: Replace with actual API call
      const response = await axios.get(API_URL+'/reports',{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Reports response:', response);
      setReports(response.data);
      setLoading(false);
      setError('');
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError('Không thể tải danh sách báo cáo');
      setLoading(false);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL+'/users/list', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Convert to object for easy lookup
      const usersMap = {};
      response.data.forEach(user => {
        usersMap[user.user_id] = user;
      });
      setUsers(usersMap);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  // Update useEffect
  useEffect(() => {
    fetchReports();
    fetchUsers();
  }, []);

  // Filter reports based on search term, status, and reason
  useEffect(() => {
    let filtered = reports;

    // Filter by search term (user name or detail)
    if (searchTerm) {
      filtered = filtered.filter(report => {
        const userName = users[report.user_id]?.full_name || '';
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
                  users={users}
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
