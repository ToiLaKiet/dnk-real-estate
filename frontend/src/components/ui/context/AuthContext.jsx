import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 1. Tạo Context
export const AuthContext = createContext();

// 2. Tạo Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Kiểm tra đăng nhập khi khởi động app
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          // Nếu có API thật thì dùng đoạn này
          // const res = await axios.get('/api/auth/me', {
          //   headers: { Authorization: `Bearer ${token}` }
          // });
          // setUser(res.data.user);
          
          // Mock data
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
          console.log('User:', JSON.parse(userData));
        } catch (err) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  // Hàm đăng nhập
  const login = async ({ email, phone, password },onSuccess) => {
    try {
      // Nếu có API thật thì dùng đoạn này
      // const res = await axios.post('/api/auth/login', { email, phone, password });
      // localStorage.setItem('token', res.data.token);
      // localStorage.setItem('user', JSON.stringify(res.data.user));
      // setUser(res.data.user);
      // Mock data
      const mockUser = {
        id: '123',
        name: email.split('@')[0] || 'Người dùng',
        email: email,
        phone: phone,
        avatar: `https://i.pravatar.cc/150?u=${email}`,
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'mock-token-123'); // Mock token
      setUser(mockUser);
      setIsAuthenticated(true);
      console.log('Đăng nhập thành công:', mockUser);
      if (onSuccess) {
        onSuccess();
      }
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
      return { success: false, message: error.message };
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    console.log('Đăng xuất thành công');
    navigate('/home');
  };

  // 3. Provider cung cấp giá trị
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
