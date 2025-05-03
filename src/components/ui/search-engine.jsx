// SearchEngine.jsx
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../../styles/searchengine.css'; // Import your CSS file

function SearchEngine() {
  const [searchType, setSearchType] = useState(null);
  const [keyword, setKeyword] = useState('');

  const sendSearchRequest = async (type) => {
    setSearchType(type);
    if (!keyword) return;

    const searchData = {
      searchType: type,
      keyword: keyword,
    };

    try {
      const response = await fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchData),
      });
      const data = await response.json();
      console.log('Kết quả từ backend:', data);
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchType) {
      alert('Vui lòng chọn loại tìm kiếm (Nhà đất bán, Nhà đất cho thuê, hoặc Dự án)!');
      return;
    }
    if (!keyword) {
      alert('Vui lòng nhập từ khóa tìm kiếm!');
      return;
    }

    const searchData = {
      searchType: searchType,
      keyword: keyword,
    };

    try {
      const response = await fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchData),
      });
      const data = await response.json();
      console.log('Kết quả từ backend:', data);
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu:', error);
    }
  };

  return (
    <div className="search-engine-container">
      <div className="search-tabs">
        <button
          className={`search-tab-button ${searchType === 'sell' ? 'active' : ''}`}
          style={{outline: 'none'}}
          onClick={() => sendSearchRequest('sell')}
        >
          Nhà đất bán
        </button>
        <button
          className={`search-tab-button ${searchType === 'rent' ? 'active' : ''}`}
          style={{outline: 'none'}}
          onClick={() => sendSearchRequest('rent')}
        >
          Nhà đất cho thuê
        </button>
        <button
          className={`search-tab-button ${searchType === 'project' ? 'active' : ''}`}
          style={{outline: 'none'}}
          onClick={() => sendSearchRequest('project')}
        >
          Dự án
        </button>
      </div>
      
      <div className="search-engine">
        <div className="search-bar">
          <div className="input-wrapper">
            <FaSearch className="search-logo" />
            <input
              type="text"
              placeholder="Trên toàn quốc"
              className="search-input"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <button className="search-button" onClick={handleSearch}>
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchEngine;
