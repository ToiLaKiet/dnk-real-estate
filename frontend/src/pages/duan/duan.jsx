import '../../styles/duan.css';
import Header from '../../components/ui/parts/header';
import Footer from '../../components/ui/parts/footer';
import { useState, useEffect, useMemo } from 'react';
import '../../styles/searchengine.css';
import { FaSearch } from 'react-icons/fa';

const DuAn = () => {
    // Search filters state
    const [searchFilters, setSearchFilters] = useState({
        text: '',
        type: '',
        province: '',
        area: '',
        price: ''
    });
    
    const [projects, setProjects] = useState([]); // Danh sách dự án
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const projectsPerPage = 8; // Số lượng dự án hiển thị trên mỗi trang

    // Dropdown options
    const dropdownOptions = {
        types: [
            { value: '', label: 'Tất cả loại hình' },
            { value: 'apartment', label: 'Chung cư' },
            { value: 'house', label: 'Nhà riêng' },
            { value: 'land', label: 'Đất nền' },
            { value: 'villa', label: 'Biệt thự' },
            { value: 'townhouse', label: 'Nhà phố' }
        ],
        provinces: [
            { value: '', label: 'Tất cả khu vực' },
            { value: 'hanoi', label: 'Hà Nội' },
            { value: 'hcm', label: 'TP. Hồ Chí Minh' },
            { value: 'danang', label: 'Đà Nẵng' },
            { value: 'haiphong', label: 'Hải Phòng' },
            { value: 'cantho', label: 'Cần Thơ' }
        ],
        areas: [
            { value: '', label: 'Tất cả diện tích' },
            { value: '0-50', label: 'Dưới 50m²' },
            { value: '50-100', label: '50 - 100m²' },
            { value: '100-200', label: '100 - 200m²' },
            { value: '200-500', label: '200 - 500m²' },
            { value: '500+', label: 'Trên 500m²' }
        ],
        prices: [
            { value: '', label: 'Tất cả mức giá' },
            { value: '0-1', label: 'Dưới 1 tỷ' },
            { value: '1-3', label: '1 - 3 tỷ' },
            { value: '3-5', label: '3 - 5 tỷ' },
            { value: '5-10', label: '5 - 10 tỷ' },
            { value: '10+', label: 'Trên 10 tỷ' }
        ]
    };

    // Mock data với cấu trúc mới
    const mockProjects = Array.from({ length: 20 }, (_, i) => {
        const types = ['apartment', 'house', 'land', 'villa', 'townhouse'];
        const provinces = ['hanoi', 'hcm', 'danang', 'haiphong', 'cantho'];
        const areas = ['45', '75', '120', '250', '600'];
        const prices = ['0.8', '2.5', '4.2', '7.5', '12.3'];
        
        return {
            id: i + 1,
            type: types[i % types.length],
            address: {
                province: provinces[i % provinces.length],
                district: `Quận ${Math.floor(i/2) + 1}`,
                ward: `Phường ${i + 1}`,
                street: `Đường ABC ${i + 1}`,
                project: `Dự án ${i + 1}`,
                displayAddress: `Đường ABC ${i + 1}, Quận ${Math.floor(i/2) + 1}, ${provinces[i % provinces.length]}`,
                coordinates: {
                    lat: 21.0285 + (Math.random() - 0.5) * 0.1,
                    lng: 105.8542 + (Math.random() - 0.5) * 0.1
                }
            },
            area: areas[i % areas.length],
            price: prices[i % prices.length],
            title: `Dự án ${i + 1} - ${types[i % types.length]}`,
            description: `Mô tả chi tiết cho dự án ${i + 1}. Khu vực tiện nghi, an ninh đảm bảo, giao thông thuận lợi...`,
            createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
            media: {
                images: [`https://picsum.photos/seed/project${i+1}/600/400`],
                videoUrl: ""
            }
        };
    });

    // Load dữ liệu từ backend
    useEffect(() => {
        const loadProjects = async () => {
            setLoading(true);
            try {
                // TODO: Uncomment khi có backend
                // const params = new URLSearchParams(searchFilters);
                // const response = await fetch(`/api/projects?${params}`);
                // const data = await response.json();
                // setProjects(data);

                // Dùng mock data tạm thời
                setProjects(mockProjects);
            } catch (error) {
                console.error("Lỗi khi tải dự án:", error);
                setProjects([]);
            }
            setLoading(false);
        };

        loadProjects();
    }, []); // Chỉ chạy 1 lần khi component mount

    // Xử lý filter và phân trang ở frontend (cho mock data)
    //useMemo để tính toán danh sách dự án hiển thị và tổng số trang
    const { displayProjects, totalPages } = useMemo(() => {
        let filtered = projects;

        // Filter theo text
        if (searchFilters.text.trim()) {
            filtered = filtered.filter(project =>
                project.title.toLowerCase().includes(searchFilters.text.toLowerCase()) ||
                project.description.toLowerCase().includes(searchFilters.text.toLowerCase())
            );
        }

        // Filter theo type
        if (searchFilters.type) {
            filtered = filtered.filter(project => project.type === searchFilters.type);
        }

        // Filter theo province
        if (searchFilters.province) {
            filtered = filtered.filter(project => project.address.province === searchFilters.province);
        }

        // Filter theo area
        if (searchFilters.area) {
            filtered = filtered.filter(project => {
                const projectArea = parseFloat(project.area);
                switch(searchFilters.area) {
                    case '0-50': return projectArea < 50;
                    case '50-100': return projectArea >= 50 && projectArea <= 100;
                    case '100-200': return projectArea >= 100 && projectArea <= 200;
                    case '200-500': return projectArea >= 200 && projectArea <= 500;
                    case '500+': return projectArea > 500;
                    default: return true;
                }
            });
        }

        // Filter theo price
        if (searchFilters.price) {
            filtered = filtered.filter(project => {
                const projectPrice = parseFloat(project.price);
                switch(searchFilters.price) {
                    case '0-1': return projectPrice < 1;
                    case '1-3': return projectPrice >= 1 && projectPrice <= 3;
                    case '3-5': return projectPrice >= 3 && projectPrice <= 5;
                    case '5-10': return projectPrice >= 5 && projectPrice <= 10;
                    case '10+': return projectPrice > 10;
                    default: return true;
                }
            });
        }

        // Phân trang
        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        const paginated = filtered.slice(startIndex, endIndex);
        const total = Math.ceil(filtered.length / projectsPerPage);

        return {
            displayProjects: paginated,
            totalPages: total
        };

    }, [projects, searchFilters, currentPage]);

    // Handle filter change
    const handleFilterChange = (field, value) => {
        setSearchFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="duan-page-container">
            <Header />
            <div className="duan-content">
                {/* Search Engine */}
                <div className="duan-search-engine-container">
                    <div className="duan-search-engine">
                        {/* Search Bar */}
                        <div className="search-bar">
                            <div className="input-wrapper">
                                <FaSearch className="search-logo" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm dự án..."
                                    className="search-input"
                                    value={searchFilters.text}
                                    onChange={(e) => handleFilterChange('text', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Filter Dropdowns */}
                        <div className="filter-dropdowns">
                            <select 
                                value={searchFilters.province} 
                                onChange={(e) => handleFilterChange('province', e.target.value)}
                                className="duan-filter-dropdown"
                            >
                                {dropdownOptions.provinces.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <select 
                                value={searchFilters.type} 
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                                className="duan-filter-dropdown"
                            >
                                {dropdownOptions.types.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <select 
                                value={searchFilters.price} 
                                onChange={(e) => handleFilterChange('price', e.target.value)}
                                className="duan-filter-dropdown"
                            >
                                {dropdownOptions.prices.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <select 
                                value={searchFilters.area} 
                                onChange={(e) => handleFilterChange('area', e.target.value)}
                                className="duan-filter-dropdown"
                            >
                                {dropdownOptions.areas.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Loading */}
                {loading && <div className="loading">Đang tải...</div>}

                {/* Danh sách dự án */}
                <div className="project-list">
                    {!loading && displayProjects.length > 0 ? (
                        displayProjects.map(project => (
                            <div key={project.id} className="project-card">
                                <div className="project-media">
                                    <img 
                                        src={project.media.images[0]} 
                                        alt={project.title}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="project-info">
                                    <h3>{project.title}</h3>
                                    <p className="project-address">{project.address.displayAddress}</p>
                                    <p className="project-details">
                                        Diện tích: {project.area}m² | Giá: {project.price} tỷ
                                    </p>
                                    <p className="project-description">{project.description}</p>
                                </div>
                            </div>
                        ))
                    ) : !loading && (
                        <div className="no-results">
                            Không tìm thấy dự án nào phù hợp với tiêu chí tìm kiếm
                        </div>
                    )}
                </div>

                {/* Phân trang */}
                {!loading && totalPages > 1 && (
                    <div className="pagination">
                        {currentPage > 1 && (
                            <button onClick={() => goToPage(currentPage - 1)}>
                                &lt; Trước
                            </button>
                        )}
                        
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => goToPage(pageNum)}
                                    className={currentPage === pageNum ? 'active' : ''}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        {currentPage < totalPages && (
                            <button onClick={() => goToPage(currentPage + 1)}>
                                Sau &gt;
                            </button>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default DuAn;
