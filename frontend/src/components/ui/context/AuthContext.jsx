import React, { createContext, useState, useEffect,useContext } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
      const token = localStorage.getItem('token'); // Mock token
      const userData = localStorage.getItem('user');// Mock user data
      
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
  } , [useAuth]);

  // Hàm đăng nhập
  // const login = async ({ email, phone, password },onSuccess) => {
  //   try {
  //     // Nếu có API thật thì dùng đoạn này
  //     // const payload = {
  //     //   identifier: email? email : phone,
  //     //   password: password,
  //     // }
  //     // const res = await axios.post('http://10.0.4.100:8080/users/login', payload);
  //     // localStorage.setItem('token', res.token);
  //     // localStorage.setItem('user', JSON.stringify(res.data.user));
  //     // console.log('Đăng nhập thành công:', res);
  //     // setUser(res.data.user);
  //     // Mock data
  //     const mockUser = {
  //       user_id: '123',
  //       name: email.split('@')[0] || 'Người dùng',
  //       email: email,
  //       phone: phone,
  //       avatar: `https://i.pravatar.cc/150?u=${email}`,
  //     };
  //     localStorage.setItem('user', JSON.stringify(mockUser));
  //     localStorage.setItem('token', 'mock-token-123'); // Mock token
  //     setUser(mockUser);
  //     setIsAuthenticated(true);
  //     console.log('Đăng nhập thành công:', mockUser);
  //     if (onSuccess) {
  //       onSuccess();
  //     }
  //     return { success: true, user: mockUser };
  //   } catch (error) {
  //     console.error('Đăng nhập thất bại:', error);
  //     alert('Đăng nhập thất bại. Vui lòng thử lại.');
  //     return { success: false, message: error.message };
  //   }
  // }; 
  const login = async ({ login, password }, onSuccess) => {
    try {
      // Step 1: Send login request
      const payload = {
        login: login,
        password: password,
      };
  
      const res = await axios.post('http://10.0.4.100:8080/users/login', payload);
  
      // Step 2: Extract token
      const token = res.data.access_token;
      if (!token) {
        throw new Error('Token not received from login response.');
      }
  
      // Save token to localStorage
      localStorage.setItem('token', token);
      console.log('Token saved to localStorage:', token);
      // Step 3: Get user info using the token
      const userRes = await axios.get('http://10.0.4.100:8080/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const user = userRes.data;
      console.log('User data:', user);
      localStorage.setItem('user', JSON.stringify(user));
  
      // Step 4: Update frontend state
      setUser(user);
      setIsAuthenticated(true);
      console.log('Đăng nhập thành công:', user);
  
      if (onSuccess) {
        onSuccess();
      }
      return { success: true, user: user };
    } catch (error) {
      // Handle error
      console.error('Đăng nhập thất bại:', error.response.data.detail);
      const message = error.response?.data?.detail.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
      alert(message);
      return { success: false, message };
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

export function useAuth() {
  return useContext(AuthContext);
}
