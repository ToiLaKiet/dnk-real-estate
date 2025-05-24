# 🏡 DNK Real Estate

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/your-username/dnk-real-estate)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/your-username/dnk-real-estate/releases)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 📖 Giới thiệu
DNK Real Estate là một nền tảng web hiện đại hỗ trợ tìm kiếm, mua bán, và cho thuê bất động sản tại Việt Nam. Với giao diện thân thiện, dự án giúp người dùng dễ dàng tương tác, từ tìm kiếm nhà đất đến quản lý bài đăng.  

**Trạng thái dự án**: 🛠 Đang phát triển (phiên bản beta).  
**Mục tiêu**: 🌟 Đơn giản hóa giao dịch bất động sản, tăng tính minh bạch và trải nghiệm người dùng.

## 📑 Mục lục
- [Giới thiệu](#giới-thiệu)
- [Tính năng](#tính-năng)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cài đặt](#cài-đặt)
- [Sử dụng](#sử-dụng)
- [Đóng góp](#đóng-góp)
- [Liên hệ](#liên-hệ)
- [Giấy phép](#giấy-phép)

## ✨ Tính năng
- 🔍 **Tìm kiếm bất động sản**: Lọc theo danh mục (nhà đất bán, nhà đất cho thuê, dự án), vị trí, giá, diện tích.
- 📝 **Quản lý bài đăng**: Chủ nhà dễ dàng tạo, chỉnh sửa, xóa bài đăng.
- 🎨 **Giao diện trực quan**: Nút tìm kiếm highlight khi chọn, thiết kế responsive.
- 🛡️ **Quản trị viên**: Kiểm duyệt bài đăng và quản lý người dùng.
- ⚙️ **Tích hợp API**: Xử lý tìm kiếm và lưu trữ dữ liệu hiệu quả.

## 🛠 Công nghệ sử dụng
| **Loại**         | **Công nghệ**                          |
|-------------------|----------------------------------------|
| **Frontend**     | HTML, CSS, JavaScript, React.js, Tailwind CSS |
| **Backend**      | Node.js, Express.js                    |
| **Cơ sở dữ liệu**| MongoDB                               |
| **Công cụ**      | Git, Webpack, ESLint                  |

## 🚀 Cài đặt
### Yêu cầu
- **Node.js**: v16.x hoặc cao hơn
- **MongoDB**: Local hoặc MongoDB Atlas
- **Git**: Để clone repository

### Hướng dẫn
1. **Clone repository**:
   ```bash
   git clone https://github.com/your-username/dnk-real-estate.git
   cd dnk-real-estate
   ```

2. **Cài đặt dependencies**:
   ```bash
   npm install
   ```

3. **Cấu hình môi trường**:
   - Tạo file `.env` trong thư mục gốc:
     ```plaintext
     MONGODB_URI=your_mongodb_connection_string
     PORT=3000
     ```

4. **Khởi chạy ứng dụng**:
   - Backend:
     ```bash
     npm run server
     ```
   - Frontend:
     ```bash
     npm run start
     ```

5. **Truy cập**:
   - Mở trình duyệt tại `http://localhost:3000`.

## 📚 Sử dụng
1. **🔎 Tìm kiếm bất động sản**:
   - Chọn danh mục (Nhà đất bán, Nhà đất cho thuê, Dự án).
   - Nhập bộ lọc (vị trí, giá, diện tích) và nhấn "Tìm kiếm".
2. **🏠 Đăng bài bất động sản**:
   - Đăng nhập vai trò chủ nhà.
   - Vào "Quản lý bài đăng" để tạo bài với tiêu đề, mô tả, hình ảnh.
3. **🔧 Quản trị viên**:
   - Đăng nhập tài khoản admin để kiểm duyệt bài đăng hoặc quản lý người dùng.

### Ví dụ
- **Tìm kiếm nhà đất cho thuê**:
  - Chọn "Nhà đất cho thuê" (nút highlight).
  - Nhập "Căn hộ 2 phòng ngủ, Quận 7".
  - Xem danh sách kết quả phù hợp.

## 🤝 Đóng góp
Chúng tôi rất mong nhận được sự đóng góp từ cộng đồng! Để tham gia:
1. Fork repository.
2. Tạo branch mới:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit thay đổi:
   ```bash
   git commit -m "Mô tả thay đổi"
   ```
4. Push và tạo Pull Request.

📖 Xem chi tiết tại [CONTRIBUTING.md](CONTRIBUTING.md).

## 📬 Liên hệ
- **Email**: ✉️ support@dnkrealestate.com
- **GitHub Issues**: 🐞 [Tạo issue](https://github.com/your-username/dnk-real-estate/issues)

## 📜 Giấy phép
Dự án được cấp phép theo [MIT License](LICENSE).  
© 2025 DNK Real Estate. All rights reserved.
