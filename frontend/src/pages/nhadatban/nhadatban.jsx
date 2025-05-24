import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SearchEngine from "../../components/ui/search-engine";
import Header from "../../components/ui/parts/header";
import Footer from "../../components/ui/parts/footer";
import { postData } from "../postData.jsx";
import "../../styles/NhaDatBan.css";

const NhaDatBan = () => {
  const SeUseCase = {
    all: 0,
    nhadatban: 1,
    nhadatchothue: 0,
    duan: 0,
  };

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceFilters, setPriceFilters] = useState([]);
  const [areaFilters, setAreaFilters] = useState([]);
  const [provinceFilter, setProvinceFilter] = useState("");
  const navigate = useNavigate();

  const provinces = [
    "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre",
    "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng",
    "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai",
    "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang",
    "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng",
    "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận",
    "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị",
    "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa",
    "Thừa Thiên Huế", "Tiền Giang", "TP.HCM", "Trà Vinh", "Tuyên Quang", "Vĩnh Long",
    "Vĩnh Phúc", "Yên Bái"
  ];

  const priceRanges = [
    { label: "Dưới 500 triệu", min: 0, max: 500000000 },
    { label: "500 triệu - 1 tỷ", min: 500000000, max: 1000000000 },
    { label: "1 tỷ - 3 tỷ", min: 1000000000, max: 3000000000 },
    { label: "3 tỷ - 10 tỷ", min: 3000000000, max: 10000000000 },
    { label: "Trên 10 tỷ", min: 10000000000, max: Infinity },
  ];

  const areaRanges = [
    { label: "Dưới 30 m²", min: 0, max: 30 },
    { label: "30-100 m²", min: 30, max: 100 },
    { label: "100-200 m²", min: 100, max: 200 },
    { label: "200-500 m²", min: 200, max: 500 },
    { label: "Trên 500 m²", min: 500, max: Infinity },
  ];

  const fetchPosts = useCallback(() => {
    setLoading(true);
    //Backend
    // const fetchPostsFromBackend = async () => {
    //   const response = await fetch("https://api.example.com/posts/sale");
    //   const data = await response.json();
    //   setPosts(data);
    // };
    try {
      const filteredPosts = postData.filter((post) => {
        const priceMatch = priceFilters.length === 0 || priceFilters.some(
          ({ min, max }) => post.price >= min && post.price <= max
        );
        const areaMatch = areaFilters.length === 0 || areaFilters.some(
          ({ min, max }) => post.area >= min && post.area <= max
        );
        const provinceMatch = !provinceFilter || post.location.province === provinceFilter;
        return priceMatch && areaMatch && provinceMatch && post.status === "For sale";
      });
      setPosts(filteredPosts);
    } catch (error) {
      console.error("Lỗi khi lọc tin đăng:", error);
      setPosts(postData.filter((post) => post.status === "For sale"));
    } finally {
      setLoading(false);
    }
  }, [priceFilters, areaFilters, provinceFilter]);

  useEffect(() => {
    fetchPosts();
  }, [priceFilters, areaFilters, provinceFilter, fetchPosts]);

  const handlePriceFilter = (range) => {
    setPriceFilters((prev) =>
      prev.some((f) => f.label === range.label)
        ? prev.filter((f) => f.label !== range.label)
        : [...prev, range]
    );
  };

  const handleAreaFilter = (range) => {
    setAreaFilters((prev) =>
      prev.some((f) => f.label === range.label)
        ? prev.filter((f) => f.label !== range.label)
        : [...prev, range]
    );
  };

  const handleProvinceFilter = (e) => {
    setProvinceFilter(e.target.value || "");
  };

  const handlePostClick = (postId) => {
    navigate(`/postspage/${postId}`);
  };

  const getFirstImage = (media) => {
    if (!media || !Array.isArray(media)) return "https://i.pravatar.cc/150?u=1";
    const firstImage = media.find(item => item.type === "image");
    return firstImage?.url || "https://i.pravatar.cc/150?u=1";
  };

  return (
    <div className="page-container">
      <Header />
      <div className="search-engine-outer-wrapper">
        <div className="search-engine-inner-wrapper">
          <SearchEngine useCase={SeUseCase} />
        </div>
      </div>
      <div className="posts-wrapper">
        <div className="posts-list">
          {loading ? (
            <div className="loading">Đang tải...</div>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="post-item" onClick={() => handlePostClick(post.id)}>
                <div className="post-image-container">
                  <img
                    src={getFirstImage(post.media)}
                    alt={post.title}
                    className="post-image"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "https://i.pravatar.cc/150?u=1";
                    }}
                  />
                </div>
                <div className="post-content">
                  <h3 className="post-title">{post.title}</h3>
                  <div className="post-info">
                    <span className="post-price">{(post.price / 1000000000).toFixed(1)} tỷ VND</span>
                    <span className="post-province">{post.location.province}</span>
                  </div>
                  <p className="post-description">
                    {post.description.slice(0, 100)}
                    {post.description.length > 100 ? "..." : ""}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-posts">Không tìm thấy tin đăng phù hợp</div>
          )}
        </div>
        <div className="posts-filter">
          <div className="filter-section">
            <h4 className="filter-name">Lọc theo giá</h4>
            {priceRanges.map((range) => (
              <label key={range.label} className="filter-option">
                <input
                  type="checkbox"
                  checked={priceFilters.some((f) => f.label === range.label)}
                  onChange={() => handlePriceFilter(range)}
                  className="checkbox"
                />
                {range.label}
              </label>
            ))}
          </div>
          <div className="filter-section">
            <h4 className="filter-name">Lọc theo diện tích</h4>
            {areaRanges.map((range) => (
              <label key={range.label} className="filter-option">
                <input
                  type="checkbox"
                  checked={areaFilters.some((f) => f.label === range.label)}
                  onChange={() => handleAreaFilter(range)}
                  className="checkbox"
                />
                {range.label}
              </label>
            ))}
          </div>
          <div className="filter-section">
            <h4 className="filter-name">Lọc theo tỉnh/thành</h4>
            <select
              value={provinceFilter}
              onChange={handleProvinceFilter}
              className="province-select"
            >
              <option value="">Chọn tỉnh/thành</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NhaDatBan;
