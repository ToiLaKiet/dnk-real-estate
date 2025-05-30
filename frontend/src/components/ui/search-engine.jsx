import React, { useState, useEffect } from 'react';
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../../styles/searchengine.css';
import DualRangeSlider from './DualRangeSlider.jsx'; // Component DualRangeSlider cho thanh trượt

function SearchEngine({ useCase }) {
  const [searchType, setSearchType] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [propertyType, setPropertyType] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000000000]);
  const [areaRange, setAreaRange] = useState([0, 500]);
  const [isOpen, setIsOpen] = useState({ property: false, price: false, area: false });

  const propertyOptions = [
    { value: 'shophouse', label: 'Shophouse' },
    { value: 'villa', label: 'Villa' },
    { value: 'apartment', label: 'Căn hộ' },
    { value: 'land', label: 'Đất nền' },
    { value: 'townhouse', label: 'Nhà phố' },
  ];

  const priceOptions = [
    { min: 0, max: 500000000, label: 'Dưới 500 triệu' },
    { min: 500000000, max: 1000000000, label: '500 triệu - 1 tỷ' },
    { min: 1000000000, max: 3000000000, label: '1 tỷ - 3 tỷ' },
    { min: 3000000000, max: 5000000000, label: '3 tỷ - 5 tỷ' },
    { min: 5000000000, max: 10000000000, label: '5 tỷ - 10 tỷ' },
    { min: 10000000000, max: 10000000000, label: 'Trên 10 tỷ' },
  ];

  const areaOptions = [
    { min: 0, max: 50, label: 'Dưới 50m²' },
    { min: 50, max: 100, label: '50-100m²' },
    { min: 100, max: 200, label: '100-200m²' },
    { min: 200, max: 500, label: '200-500m²' },
    { min: 500, max: 500, label: 'Trên 500m²' },
  ];

  const toggleDropdown = (type) => {
    setIsOpen((prev) => ({
      property: type === 'property' ? !prev.property : false,
      price: type === 'price' ? !prev.price : false,
      area: type === 'area' ? !prev.area : false,
    }));
  };

  const handlePropertyChange = (value) => {
    setPropertyType((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const resetPropertyFilter = () => {
    setPropertyType([]);
  };

  const resetPriceFilter = () => {
    setPriceRange([0, 10000000000]);
  };

  const resetAreaFilter = () => {
    setAreaRange([0, 1000]);
  };

  const applyPropertyFilter = () => {
    toggleDropdown('property');
  };

  const applyPriceFilter = () => {
    toggleDropdown('price');
  };

  const applyAreaFilter = () => {
    toggleDropdown('area');
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
      searchType,
      keyword,
      propertyType,
      priceRange: { min: priceRange[0], max: priceRange[1] },
      areaRange: { min: areaRange[0], max: areaRange[1] },
    };

    console.log('Thông tin tìm kiếm:', searchData);

    // try {
    //   const token = localStorage.getItem('token');
    //   const response = await fetch('http://localhost:5000/api/search', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       ...(token && { 'Authorization': `Bearer ${token}` }),
    //     },
    //     body: JSON.stringify(searchData),
    //   });
    //   const data = await response.json();
    //   console.log('Kết quả từ backend:', data);
    // } catch (error) {
    //   console.error('Lỗi khi gửi yêu cầu:', error);
    // }
  };

  useEffect(() => {
    if (!useCase['all']) {
      if (useCase['nhadatban']) setSearchType('sell');
      else if (useCase['nhadatchothue']) setSearchType('rent');
      else if (useCase['duan']) setSearchType('project');
    }
  }, [useCase]);

  return (
    <div className="search-engine-container">
      {useCase['all'] ? (
        <div className="search-tabs">
          <button
            className={`search-tab-button ${searchType === 'sell' ? 'active' : ''}`}
            style={{ outline: 'none' }}
            onClick={() => setSearchType('sell')}
          >
            Nhà đất bán
          </button>
          <button
            className={`search-tab-button ${searchType === 'rent' ? 'active' : ''}`}
            style={{ outline: 'none' }}
            onClick={() => setSearchType('rent')}
          >
            Nhà đất cho thuê
          </button>
          <button
            className={`search-tab-button ${searchType === 'project' ? 'active' : ''}`}
            style={{ outline: 'none' }}
            onClick={() => setSearchType('project')}
          >
            Dự án
          </button>
        </div>
      ) : null}

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

        <div className="filter-bar">
          <div className="filter-item">
            <button className="filter-button" onClick={() => toggleDropdown('property')}>
              Loại nhà đất
              {isOpen.property ? <FaChevronUp className="filter-arrow" /> : <FaChevronDown className="filter-arrow" />}
            </button>
            {isOpen.property && (
              <div className="filter-dropdown">
                {propertyOptions.map((option) => (
                  <label key={option.value} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={propertyType.includes(option.value)}
                      onChange={() => handlePropertyChange(option.value)}
                    />
                    {option.label}
                  </label>
                ))}
                <div className="filter-actions">
                  <button className="reset-button" onClick={resetPropertyFilter}>
                    Đặt lại
                  </button>
                  <button className="apply-button" onClick={applyPropertyFilter}>
                    Áp dụng
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="filter-item">
            <button className="filter-button" onClick={() => toggleDropdown('price')}>
              Mức giá
              {isOpen.price ? <FaChevronUp className="filter-arrow" /> : <FaChevronDown className="filter-arrow" />}
            </button>
            {isOpen.price && (
              <div className="filter-dropdown">
                {priceOptions.map((option) => (
                  <label key={option.label} className="filter-checkbox">
                    <input
                      type="checkbox"
                      onChange={() => setPriceRange([option.min, option.max])}
                      checked={priceRange[0] === option.min && priceRange[1] === option.max}
                    />
                    {option.label}
                  </label>
                ))}
                <div className="range-slider">
                  <label>Chọn khoảng giá:</label>
                  <DualRangeSlider
                    min={0}
                    max={10000000000}
                    value={priceRange}
                    onChange={setPriceRange}
                    step={100000000}
                    isPrice={true}
                  />
                </div>
                <div className="filter-actions">
                  <button className="reset-button" onClick={resetPriceFilter}>
                    Đặt lại
                  </button>
                  <button className="apply-button" onClick={applyPriceFilter}>
                    Áp dụng
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="filter-item">
            <button className="filter-button" onClick={() => toggleDropdown('area')}>
              Diện tích
              {isOpen.area ? <FaChevronUp className="filter-arrow" /> : <FaChevronDown className="filter-arrow" />}
            </button>
            {isOpen.area && (
              <div className="filter-dropdown">
                {areaOptions.map((option) => (
                  <label key={option.label} className="filter-checkbox">
                    <input
                      type="checkbox"
                      onChange={() => setAreaRange([option.min, option.max])}
                      checked={areaRange[0] === option.min && areaRange[1] === option.max}
                    />
                    {option.label}
                  </label>
                ))}
                <div className="range-slider">
                  <label>Chọn khoảng diện tích:</label>
                  <DualRangeSlider
                    min={0}
                    max={500}
                    value={areaRange}
                    onChange={setAreaRange}
                    step={10}
                    isPrice={false}
                  />
                </div>
                <div className="filter-actions">
                  <button className="reset-button" onClick={resetAreaFilter}>
                    Đặt lại
                  </button>
                  <button className="apply-button" onClick={applyAreaFilter}>
                    Áp dụng
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchEngine;
