import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../../styles/searchengine.css';
import DualRangeSlider from './DualRangeSlider.jsx';
import axios from 'axios';
import { API_URL } from '../../config.js';

function SearchEngine({ useCase }) {
  const [searchType, setSearchType] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [propertyType, setPropertyType] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000000000]);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [areaRange, setAreaRange] = useState([0, 500]);
  const [isOpen, setIsOpen] = useState({ province: false, property: false, price: false, area: false });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(`${API_URL}/locations/?type=province`);
        const provinces = response.data;
        setProvinces(provinces);
        console.log('Provinces data:', provinces);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProvinces();
  },[]);

  // Property type options
  const propertyOptions = [
    { value: 'shophouse', label: 'Shophouse' },
    { value: 'villa', label: 'Villa' },
    { value: 'apartment', label: 'Căn hộ' },
    { value: 'land', label: 'Đất nền' },
    { value: 'townhouse', label: 'Nhà phố' },
  ];

  // Price options based on searchType
  const rentPriceOptions = [
    { min: 0, max: 5000000, label: 'Dưới 5 triệu VND' },
    { min: 5000000, max: 10000000, label: '5-10 triệu VND' },
    { min: 10000000, max: 20000000, label: '10-20 triệu VND' },
    { min: 20000000, max: 50000000, label: '20-50 triệu VND' },
    { min: 50000000, max: 50000000, label: 'Trên 50 triệu VND' },
  ];

  const sellPriceOptions = [
    { min: 0, max: 500000000, label: 'Dưới 500 triệu VND' },
    { min: 500000000, max: 1000000000, label: '500 triệu-1 tỷ VND' },
    { min: 1000000000, max: 3000000000, label: '1-3 tỷ VND' },
    { min: 3000000000, max: 5000000000, label: '3-5 tỷ VND' },
    { min: 5000000000, max: 7000000000, label: '5-7 tỷ VND' },
    { min: 10000000000, max: 10000000000, label: 'Trên 10 tỷ VND' },
  ];

  const priceOptions = searchType === 'rent' ? rentPriceOptions : sellPriceOptions;

  // Area options
  const areaOptions = [
    { min: 0, max: 50, label: 'Dưới 50m²' },
    { min: 50, max: 100, label: '50-100m²' },
    { min: 100, max: 200, label: '100-200m²' },
    { min: 200, max: 500, label: '200-500m²' },
    { min: 500, max: 500, label: 'Trên 500m²' },
  ];

  // Format price for display
  const formatPrice = (value) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(value % 1000000000 === 0 ? 0 : 1)} tỷ VND`;
    }
    return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)} triệu VND`;
  };

  // Toggle dropdowns
  const toggleDropdown = (type) => {
    if (!searchType) return; // Prevent opening if no searchType
    setIsOpen((prev) => ({
      province: type === 'province' ? !prev.province : false,
      property: type === 'property' ? !prev.property : false,
      price: type === 'price' ? !prev.price : false,
      area: type === 'area' ? !prev.area : false,
    }));
  };

  // Handle province selection
  const handleProvinceChange = (province) => {
    setSelectedProvince(province);
    toggleDropdown('province');
  };

  // Handle property type selection
  const handlePropertyChange = (value) => {
    setPropertyType((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Reset filters
  const resetProvinceFilter = () => {
    setSelectedProvince(null);
    toggleDropdown('province');
  };

  const resetPropertyFilter = () => {
    setPropertyType([]);
  };

  const resetPriceFilter = () => {
    setPriceRange(searchType === 'rent' ? [0, 100000000] : [0, 20000000000]);
  };

  const resetAreaFilter = () => {
    setAreaRange([0, 500]);
  };

  // Apply filters
  const applyPropertyFilter = () => {
    toggleDropdown('property');
  };

  const applyPriceFilter = () => {
    toggleDropdown('price');
  };

  const applyAreaFilter = () => {
    toggleDropdown('area');
  };

  // Handle search
  const handleSearch = async () => {
    if (!searchType) {
      alert('Vui lòng chọn loại tìm kiếm (Nhà đất bán, Nhà đất cho thuê, hoặc Dự án)!');
      return;
    }
    if (!keyword) {
      alert('Vui lòng nhập từ khóa tìm kiếm!');
      return;
    }
    const text = keyword.trim();
    const searchData = {
      searchType: searchType,
      text,
      propertyType,
      price: `${priceRange[0]}-${priceRange[1]}`,
      area: `${areaRange[0]}-${areaRange[1]}`,
      province: selectedProvince ? selectedProvince.location_id : null,
    };

    console.log('Thông tin tìm kiếm:', searchData);
    const queryParams = new URLSearchParams(searchData).toString();

    if (searchType === 'sell') {
      navigate('/nha-dat-ban?' + queryParams);
    } else if (searchType === 'rent') {
      navigate('/nha-dat-cho-thue?' + queryParams);
    } else if (searchType === 'project') {
      navigate('/du-an?' + queryParams);
    }
  };

  // Set searchType based on useCase
  useEffect(() => {
    if (!useCase.all) {
      if (useCase.nhadatban) setSearchType('sell');
      else if (useCase.nhadatchothue) setSearchType('rent');
      else if (useCase.duan) setSearchType('project');
    }
  }, [useCase]);

  // Reset priceRange when searchType changes
  useEffect(() => {
    if (searchType === 'rent') {
      setPriceRange([0, 100000000]);
    } else {
      setPriceRange([0, 20000000000]);
    }
  }, [searchType]);

  return (
    <div className="se-search-engine-container">
      {useCase.all ? (
        <div className="se-search-tabs">
          <button
            className={`se-search-tab-button ${searchType === 'sell' ? 'active' : ''}`}
            style={{ outline: 'none' }}
            onClick={() => setSearchType('sell')}
          >
            Nhà đất bán
          </button>
          <button
            className={`se-search-tab-button ${searchType === 'rent' ? 'active' : ''}`}
            style={{ outline: 'none' }}
            onClick={() => setSearchType('rent')}
          >
            Nhà đất cho thuê
          </button>
          <button
            className={`se-search-tab-button ${searchType === 'project' ? 'active' : ''}`}
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

        {!useCase.all || searchType ? (
          <div className="filter-bar">
            <div className="filter-item">
              <button
                className="filter-button"
                onClick={() => toggleDropdown('province')}
                disabled={!searchType}
              >
                {selectedProvince ? selectedProvince.name : 'Tỉnh thành'}
                {isOpen.province ? <FaChevronUp className="filter-arrow" /> : <FaChevronDown className="filter-arrow" />}
              </button>
              {isOpen.province && (
                <div className="filter-dropdown">
                  {provinces.map((province) => (
                    <label key={province.location_id} className="filter-checkbox">
                      <input
                        type="radio"
                        name="province"
                        checked={selectedProvince && selectedProvince.location_id === province.location_id}
                        onChange={() => handleProvinceChange(province)}
                      />
                      {province.name}
                    </label>
                  ))}
                  <div className="filter-actions">
                    <button className="reset-button" onClick={resetProvinceFilter}>
                      Đặt lại
                    </button>
                    <button className="apply-button" onClick={() => toggleDropdown('province')}>
                      Áp dụng
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="filter-item">
              <button
                className="filter-button"
                onClick={() => toggleDropdown('property')}
                disabled={!searchType}
              >
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
              <button
                className="filter-button"
                onClick={() => toggleDropdown('price')}
                disabled={!searchType}
              >
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
                      min={searchType === 'rent' ? 0 : 0}
                      max={searchType === 'rent' ? 100000000 : 20000000000}
                      step={searchType === 'rent' ? 1000000 : 100000000}
                      value={priceRange}
                      onChange={setPriceRange}
                      isPrice={true}
                      formatValue={formatPrice}
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
              <button
                className="filter-button"
                onClick={() => toggleDropdown('area')}
                disabled={!searchType}
              >
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
                      step={10}
                      value={areaRange}
                      onChange={setAreaRange}
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
        ) : (
          <p className="select-type-message">Vui lòng chọn loại nhà đất muốn tìm kiếm trước</p>
        )}
      </div>
    </div>
  );
}

export default SearchEngine;
