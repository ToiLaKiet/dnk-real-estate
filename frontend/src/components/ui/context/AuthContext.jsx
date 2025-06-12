import React, { createContext, useState, useEffect,useContext } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 1. Tạo Context
export const AuthContext = createContext();

// 2. Tạo Provider
export const AuthProvider = ({ children }) => {
  const API_URL ='http://172.16.2.34:8080'
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // Kiểm tra đăng nhập khi khởi động app
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const res = await axios.get(`${API_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setUser(res.data); // or res.data.user depending on your backend
          setIsAuthenticated(true);
          console.log('User:', res.data);
  
        } catch (err) {
          console.error('Auth check failed:', err.response?.data || err.message);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
          setUser(null);
        }
      }
  
      setIsLoading(false);
    };
    checkAuth();
  }, []);
  
  const login = async ({ login, password }, onSuccess) => {
    try {
      // Step 1: Send login request
      const payload = new URLSearchParams();
      payload.append('username', login);
      payload.append('password', password);
      const res = await axios.post(API_URL+'/users/login', payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      // Step 2: Extract token
      const token = res.data.access_token;
      if (!token) {
        throw new Error('Token not received from login response.');
      }
      // Save token to localStorage
      localStorage.setItem('token', token);
      console.log('Token saved to localStorage:', token);
      // Step 3: Get user info using the token
      const userRes = await axios.get(API_URL+'/users/me', {
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
