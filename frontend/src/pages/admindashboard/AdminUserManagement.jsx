import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/AdminUserManagement.module.css';

// Mock data for testing
const mockUsers = [
  {
    user_id: '1',
    full_name: 'Nguyễn Văn An',
    email: 'nguyen.van.an@example.com',
    phone: '0987654321',
    role: 'buyer',
    status: 'active',
    created_at: '2024-01-15T10:30:00',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    address: '123 Nguyễn Huệ, Quận 1, TP.HCM'
  },
  {
    user_id: '2',
    full_name: 'Trần Thị Bích',
    email: 'tran.thi.bich@example.com',
    phone: '0987654322',
    role: 'seller',
    status: 'inactive',
    created_at: '2024-02-20T14:15:00',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
    address: '456 Lê Lợi, Quận 3, TP.HCM'
  },
  {
    user_id: '3',
    full_name: 'Lê Văn Cường',
    email: 'le.van.cuong@example.com',
    phone: '0987654323',
    role: 'admin',
    status: 'active',
    created_at: '2024-03-10T09:45:00',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    address: '789 Trần Hưng Đạo, Quận 5, TP.HCM'
  },
  {
    user_id: '4',
    full_name: 'Phạm Thị Diệu',
    email: 'pham.thi.dieu@example.com',
    phone: '0987654324',
    role: 'buyer',
    status: 'banned',
    created_at: '2024-04-05T16:20:00',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    address: '321 Nguyễn Thái Học, Quận 1, TP.HCM'
  }
];

const mockUserProperties = {
  '1': [
    {
      property_id: '101',
      title: 'Căn hộ cao cấp Quận 7',
      description: 'Căn hộ 2 phòng ngủ, view sông, nội thất cao cấp, gần trung tâm thương mại và siêu thị',
      status: 'pending',
      created_at: '2024-06-01T10:00:00'
    },
    {
      property_id: '102',
      title: 'Nhà phố Thủ Đức',
      description: 'Nhà phố 3 tầng, khu vực yên tĩnh, gần trường học và bệnh viện',
      status: 'approved',
      created_at: '2024-05-15T14:30:00'
    }
  ],
  '2': [
    {
      property_id: '201',
      title: 'Biệt thự Đà Lạt',
      description: 'Biệt thự nghỉ dưỡng view núi, không gian thoáng mát, phù hợp cho gia đình',
      status: 'approved',
      created_at: '2024-04-20T11:15:00'
    }
  ],
  '3': [],
  '4': [
    {
      property_id: '301',
      title: 'Studio Quận 1',
      description: 'Studio mini tiện nghi, trung tâm thành phố, gần công viên và khu mua sắm',
      status: 'rejected',
      created_at: '2024-03-25T13:45:00'
    }
  ]
};

// User Detail Modal Component
const UserDetailModal = ({ user, isOpen, onClose, onDelete }) => {
  const [userProperties, setUserProperties] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      fetchUserProperties(user.user_id);
    }
  }, [isOpen, user]);

  const fetchUserProperties = async (userId) => {
    try {
      setLoadingProperties(true);
      
      // TODO: Replace with actual API call
      // const response = await axios.get(`/api/admin/users/${userId}/properties`);
      // setUserProperties(response.data);
      
      // Using mock data
      const properties = mockUserProperties[userId] || [];
      setUserProperties(properties);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#28a745';
      case 'inactive':
        return '#ffc107';
      case 'banned':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Hoạt động';
      case 'inactive':
        return 'Không hoạt động';
      case 'banned':
        return 'Bị cấm';
      default:
        return status;
    }
  };

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
              <span 
                className={styles.umDetailStatus}
                style={{ backgroundColor: getStatusColor(user.status) }}
              >
                {getStatusText(user.status)}
              </span>
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
                <span>{user.phone}</span>
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
                  <div key={property.property_id} className={styles.umPropertyCard}>
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
              if (window.confirm(`Bạn có chắc chắn muốn xóa người dùng "${user.full_name}"?`)) {
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
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#28a745';
      case 'inactive':
        return '#ffc107';
      case 'banned':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Hoạt động';
      case 'inactive':
        return 'Không hoạt động';
      case 'banned':
        return 'Bị cấm';
      default:
        return status;
    }
  };

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

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa người dùng "${user.full_name}"?`)) {
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
      
      <div className={styles.umUserPhone}>{user.phone}</div>
      <div className={styles.umUserRole}>{getRoleText(user.role)}</div>
      
      <div className={styles.umUserStatus}>
        <span
          className={styles.umStatusBadge}
          style={{ backgroundColor: getStatusColor(user.status) }}
        >
          {getStatusText(user.status)}
        </span>
      </div>
      
      <div className={styles.umUserActions}>
        <button
          className={styles.umDetailButton}
          onClick={() => onViewDetails(user)}
        >
          Chi tiết
        </button>
        <button
          className={styles.umDeleteButton}
          onClick={handleDelete}
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
      // const response = await axios.get('/api/admin/users');
      // setUsers(response.data);
      
      // Using mock data
      setTimeout(() => {
        setUsers(mockUsers);
        setLoading(false);
      }, 500);
      
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
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
      );
    }

    // Filter by role
    if (roleFilter) {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

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
      // await axios.delete(`/api/admin/users/${userId}`);
      
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
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.umFilterSelect}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
            <option value="banned">Bị cấm</option>
          </select>
          
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
          <div className={styles.umHeaderStatus}>Trạng thái</div>
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
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminUserManagement;
