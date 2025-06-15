import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/AdminUserManagement.module.css';
import { API_URL } from '../../config.js';
// User Detail Modal Component
const UserDetailModal = ({ user, isOpen, onClose, onDelete }) => {
  const [userProperties, setUserProperties] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isOpen && user) {
      fetchUserProperties(user.user_id);
    }
  }, [isOpen, user]);

  const fetchUserProperties = async (userId) => {
    try {
      setLoadingProperties(true);
      const response = await axios.get(API_URL+`/properties/user/${userId}`);
      setUserProperties(response.data);
      setLoadingProperties(false);
    } catch (error) {
      console.error('Error fetching user properties:', error);
    } finally {
      setLoadingProperties(false);
    }
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

  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case 'active':
  //       return '#28a745';
  //     case 'inactive':
  //       return '#ffc107';
  //     case 'banned':
  //       return '#dc3545';
  //     default:
  //       return '#6c757d';
  //   }
  // };

  // const getStatusText = (status) => {
  //   switch (status) {
  //     case 'active':
  //       return 'Hoạt động';
  //     case 'inactive':
  //       return 'Không hoạt động';
  //     case 'banned':
  //       return 'Bị cấm';
  //     default:
  //       return status;
  //   }
  // };

  const getRoleText = (role) => {
    switch (role) {
      case 'admin':
        return 'Quản trị viên';
      case 'seller':
        return 'Người bán';
      case 'buyer':
        return 'Người mua';
      default:
        return role;
    }
  };

  const getPropertyStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ffc107';
      case 'approved':
        return '#28a745';
      case 'rejected':
        return '#dc3545';
      case 'rented':
        return '#17a2b8';
      case 'sold':
        return '#6f42c1';
      default:
        return '#6c757d';
    }
  };

  const getPropertyStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ duyệt';
      case 'approved':
        return 'Đã duyệt';
      case 'rejected':
        return 'Đã từ chối';
      case 'rented':
        return 'Đã cho thuê';
      case 'sold':
        return 'Đã bán';
      default:
        return status;
    }
  };

  const truncateText = (text, maxLength = 20) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (!isOpen || !user) return null;

  return (
    <div className={styles.umDetailModalOverlay} onClick={onClose}>
      <div className={styles.umDetailModalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.umDetailCloseButton} onClick={onClose}>
          ×
        </button>
        
        <div className={styles.umDetailHeader}>
          <div className={styles.umDetailUserInfo}>
            <img 
              src={user.avatar || '/default-avatar.png'} 
              alt={user.full_name}
              className={styles.umDetailAvatar}
            />
            <div>
              <h2 className={styles.umDetailName}>{user.full_name}</h2>
              {/* <span 
                className={styles.umDetailStatus}
                style={{ backgroundColor: getStatusColor(user.status) }}
              >
                {getStatusText(user.status)}
              </span> */}
            </div>
          </div>
        </div>

        <div className={styles.umDetailBody}>
          {/* User Information */}
          <div className={styles.umInfoSection}>
            <h3>Thông tin cá nhân</h3>
            <div className={styles.umInfoGrid}>
              <div className={styles.umInfoItem}>
                <strong>Email:</strong>
                <span>{user.email}</span>
              </div>
              <div className={styles.umInfoItem}>
                <strong>Số điện thoại:</strong>
                <span>{user.phone_number}</span>
              </div>
              <div className={styles.umInfoItem}>
                <strong>Vai trò:</strong>
                <span>{getRoleText(user.role)}</span>
              </div>
              <div className={styles.umInfoItem}>
                <strong>Địa chỉ:</strong>
                <span>{user.address || 'Chưa cập nhật'}</span>
              </div>
              <div className={styles.umInfoItem}>
                <strong>Ngày tham gia:</strong>
                <span>{formatDate(user.created_at)}</span>
              </div>
            </div>
          </div>

          {/* User Properties */}
          <div className={styles.umInfoSection}>
            <h3>Bài đăng bất động sản ({userProperties.length})</h3>
            {loadingProperties ? (
              <div className={styles.umLoadingMessage}>Đang tải...</div>
            ) : userProperties.length === 0 ? (
              <div className={styles.umNoPropertiesMessage}>
                Người dùng chưa có bài đăng nào
              </div>
            ) : (
              <div className={styles.umPropertiesList}>
                {userProperties.map((property) => (
                  <div key={property.property_id} className={styles.umPropertyCard} onClick={()=>navigate(`/postspage/${property.property_id}`)}>
                    <div className={styles.umPropertyInfo}>
                      <h4 className={styles.umPropertyTitle}>{property.title}</h4>
                      <p className={styles.umPropertyDescription}>
                        {truncateText(property.description, 60)}
                      </p>
                      <div className={styles.umPropertyMeta}>
                        <span 
                          className={styles.umPropertyStatus}
                          style={{ backgroundColor: getPropertyStatusColor(property.status) }}
                        >
                          {getPropertyStatusText(property.status)}
                        </span>
                        <span className={styles.umPropertyDate}>
                          {formatDate(property.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.umDetailActions}>
          <button
            className={styles.umDetailDeleteButton}
            onClick={() => {
              if (window.confirm(`Bạn có chắc chắn muốn xóa người dùng "${user.user_id}"?`)) {
                onDelete(user.user_id);
                onClose();
              }
            }}
          >
            Xóa người dùng
          </button>
        </div>
      </div>
    </div>
  );
};

// User Card Component
const UserCard = ({ user, onViewDetails, onDelete }) => {
  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case 'active':
  //       return '#28a745';
  //     case 'inactive':
  //       return '#ffc107';
  //     case 'banned':
  //       return '#dc3545';
  //     default:
  //       return '#6c757d';
  //   }
  // };

  // const getStatusText = (status) => {
  //   switch (status) {
  //     case 'active':
  //       return 'Hoạt động';
  //     case 'inactive':
  //       return 'Không hoạt động';
  //     case 'banned':
  //       return 'Bị cấm';
  //     default:
  //       return status;
  //   }
  // };

  const getRoleText = (role) => {
    switch (role) {
      case 'admin':
        return 'Quản trị viên';
      case 'seller':
        return 'Người bán';
      case 'buyer':
        return 'Người mua';
      default:
        return role;
    }
  };

  const handleDelete = (user) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa người dùng "${user.user_id}"?`)) {
      onDelete(user.user_id);
    }
  };

  return (
    <div className={styles.umUserCard}>
      <div className={styles.umUserInfo}>
        <img 
          src={user.avatar || '/default-avatar.png'} 
          alt={user.full_name}
          className={styles.umUserAvatar}
        />
        <div className={styles.umUserDetails}>
          <h3 className={styles.umUserName}>{user.full_name}</h3>
          <p className={styles.umUserEmail}>{user.email}</p>
        </div>
      </div>
      
      <div className={styles.umUserPhone}>{user.phone_number}</div>
      <div className={styles.umUserRole}>{getRoleText(user.role)}</div>
      
      {/* <div className={styles.umUserStatus}>
        <span
          className={styles.umStatusBadge}
          style={{ backgroundColor: getStatusColor(user.status) }}
        >
          {getStatusText(user.status)}
        </span>
      </div> */}
      
      <div className={styles.umUserActions}>
        <button
          className={styles.umDetailButton}
          onClick={() => onViewDetails(user)}
        >
          Chi tiết
        </button>
        <button
          className={styles.umDeleteButton}
          onClick={()=>handleDelete(user)}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

// Pagination Component
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
    <div className={styles.umPagination}>
      <button
        className={styles.umPaginationButton}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹ Trước
      </button>
      
      {getPageNumbers().map(page => (
        <button
          key={page}
          className={`${styles.umPaginationButton} ${
            currentPage === page ? styles.umPaginationActive : ''
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      
      <button
        className={styles.umPaginationButton}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Tiếp ›
      </button>
    </div>
  );
};

// Main Component
const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      console.log('Fetching users from API...');
      const response = await axios.get(API_URL+'/users/list');
      console.log('Users response:', response);
      setUsers(response.data);
      setLoading(false);
      setError('');
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Không thể tải danh sách người dùng');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search term, role, and status
  useEffect(() => {
    let filtered = users;
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone_number.includes(searchTerm)
      );
    }

    // Filter by role
    if (roleFilter) {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // // Filter by status
    // if (statusFilter) {
    //   filtered = filtered.filter(user => user.status === statusFilter);
    // }

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [users, searchTerm, roleFilter, statusFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Handle user deletion
  const handleDelete = async (userId) => {
    try {
      // TODO: Replace with actual API call
      const user_phone = await axios.get(API_URL+`/users/${userId}`);
      console.log('Deleting user:', user_phone.data.phone_number);
      await axios.delete(API_URL+`/users/delete?identifier=${user_phone.data.phone_number}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      // Update local state
      setUsers(prev => prev.filter(user => user.user_id !== userId));
      console.log('Deleted user:', userId);
      alert('Xóa người dùng thành công!');
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Không thể xóa người dùng');
      alert('Có lỗi xảy ra khi xóa người dùng!');
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedUser(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setRoleFilter('');
    setStatusFilter('');
  };

  if (loading) {
    return (
      <div className={styles.umContainer}>
        <div className={styles.umLoadingMessage}>Đang tải...</div>
      </div>
    );
  }

  return (
    <div className={styles.umContainer}>
      <h1 className={styles.umTitle}>Quản lý Người dùng</h1>
      
      <div className={styles.umSection}>
        <h2 className={styles.umSectionTitle}>Danh sách Người dùng</h2>
        
        {/* Filters */}
        <div className={styles.umFilterRow}>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.umSearchInput}
          />
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className={styles.umFilterSelect}
          >
            <option value="">Tất cả vai trò</option>
            <option value="admin">Quản trị viên</option>
            <option value="seller">Người bán</option>
            <option value="buyer">Người mua</option>
          </select>
          
          {/* <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.umFilterSelect}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
            <option value="banned">Bị cấm</option>
          </select> */}
          
          <button onClick={clearFilters} className={styles.umClearButton}>
            Xóa bộ lọc
          </button>
        </div>

        {error && <div className={styles.umErrorMessage}>{error}</div>}
        
        {/* Users Header */}
        <div className={styles.umUsersHeader}>
          <div className={styles.umHeaderInfo}>Thông tin</div>
          <div className={styles.umHeaderPhone}>Số điện thoại</div>
          <div className={styles.umHeaderRole}>Vai trò</div>
          {/* <div className={styles.umHeaderStatus}>Trạng thái</div> */}
          <div className={styles.umHeaderActions}>Hành động</div>
        </div>
        
        {currentUsers.length === 0 ? (
          <div className={styles.umNoUsersMessage}>
            Không có người dùng nào
          </div>
        ) : (
          <>
            <div className={styles.umUsersList}>
              {currentUsers.map((user) => (
                <UserCard
                  key={user.user_id}
                  user={user}
                  onViewDetails={handleViewDetails}
                  onDelete={handleDelete}
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

      {/* User Detail Modal */}
      <UserDetailModal
        user={selectedUser}
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        onDelete={()=>handleDelete}
      />
    </div>
  );
};

export default AdminUserManagement;
