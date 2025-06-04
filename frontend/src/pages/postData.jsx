export const mockPosts = [
  {
    property_id: 11,
    type: 'nhadatban',
    address: {
      province: 'Hà Nội',
      district: 'Hoàn Kiếm',
      ward: 'Hàng Bông',
      street: 'Hàng Gai',
      complex: '',
      displayAddress: 'Hàng Gai, Hàng Bông, Hoàn Kiếm, Hà Nội',
      coordinates: { lat: 21.031, lng: 105.850 }
    },
    property_type: 'shophouse',
    title: 'Shophouse cao cấp Hoàn Kiếm',
    description: 'Căn hộ 3 phòng ngủ, view hồ Hoàn Kiếm.',
    price: 3.5,
    area: 120,
    status: 'available',
    created_at: '2025-01-15T10:00:00Z',
    updated_at: '2025-01-15T10:00:00Z',
    contact: {
      name: 'Nguyễn Văn L',
      email: 'nguyenvanl@example.com',
      phone: '0911234567'
    },
    features: {
      bedrooms: '3',
      bathrooms: '2',
      furniture: 'Full nội thất',
      legalDocuments: 'Sổ đỏ',
      houseDirection: 'Đông Nam',
      balconyDirection: 'Tây Bắc'
    },
    media: {
      images: [
        { url: 'https://via.placeholder.com/600x400?text=Post1', caption: 'Ảnh chính', is_primary: true },
        { url: 'https://via.placeholder.com/600x400?text=Post1-2', caption: null, is_primary: false }
      ],
      videoUrl: 'https://example.com/video/post1.mp4'
    }
  },
  {
    property_id: 12,
    type: 'nhadatban',
    address: {
      province: 'TP.HCM',
      district: 'Quận 1',
      ward: 'Bến Nghé',
      street: 'Nguyễn Huệ',
      complex: '',
      displayAddress: 'Nguyễn Huệ, Bến Nghé, Quận 1, TP.HCM',
      coordinates: { lat: 10.774, lng: 106.703 }
    },
    property_type: 'house',
    title: 'Nhà riêng trung tâm Quận 1',
    description: 'Nhà 4 tầng, phù hợp ở hoặc kinh doanh.',
    price: 8.0,
    area: 80,
    status: 'available',
    created_at: '2025-02-15T10:00:00Z',
    updated_at: '2025-02-15T10:00:00Z',
    contact: {
      name: 'Trần Thị M',
      email: 'tranthim@example.com',
      phone: '0912345678'
    },
    features: {
      bedrooms: '4',
      bathrooms: '3',
      furniture: 'Không nội thất',
      legalDocuments: 'Sổ hồng'
    },
    media: {
      images: [
        { url: 'https://via.placeholder.com/600x400?text=Post2', caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 13,
    type: 'nhadatban',
    address: {
      province: 'Đà Nẵng',
      district: 'Ngũ Hành Sơn',
      ward: 'Mỹ An',
      street: 'Nguyễn Văn Thoại',
      complex: '',
      displayAddress: 'Nguyễn Văn Thoại, Mỹ An, Ngũ Hành Sơn, Đà Nẵng',
      coordinates: { lat: 16.054, lng: 108.247 }
    },
    property_type: 'land',
    title: 'Đất nền ven biển Đà Nẵng',
    description: 'Đất nền gần biển, phù hợp xây khách sạn.',
    price: 6.0,
    area: 200,
    status: 'available',
    created_at: '2025-03-15T10:00:00Z',
    updated_at: '2025-03-15T10:00:00Z',
    contact: {
      name: 'Lê Văn N',
      email: 'levann@example.com',
      phone: '0913456789'
    },
    features: {
      legalDocuments: 'Sổ đỏ'
    },
    media: {
      images: [
        { url: 'https://via.placeholder.com/600x400?text=Post3', caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 14,
    type: 'nhadatban',
    address: {
      province: 'Hải Phòng',
      district: 'Ngô Quyền',
      ward: 'Máy Tơ',
      street: 'Lạch Tray',
      complex: '',
      displayAddress: 'Lạch Tray, Máy Tơ, Ngô Quyền, Hải Phòng',
      coordinates: { lat: 20.853, lng: 106.686 }
    },
    property_type: 'villa',
    title: 'Biệt thự cao cấp Hải Phòng',
    description: 'Biệt thự 3 tầng, sân vườn rộng.',
    price: 10.0,
    area: 300,
    status: 'available',
    created_at: '2025-04-15T10:00:00Z',
    updated_at: '2025-04-15T10:00:00Z',
    contact: {
      name: 'Phạm Thị O',
      email: 'phamthio@example.com',
      phone: '0914567890'
    },
    features: {
      bedrooms: '5',
      bathrooms: '4',
      furniture: 'Full nội thất'
    },
    media: {
      images: [
        { url: 'https://via.placeholder.com/600x400?text=Post4', caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 15,
    type: 'nhadatban',
    address: {
      province: 'Cần Thơ',
      district: 'Cái Răng',
      ward: 'Hưng Phú',
      street: 'Võ Nguyên Giáp',
      complex: '',
      displayAddress: 'Võ Nguyên Giáp, Hưng Phú, Cái Răng, Cần Thơ',
      coordinates: { lat: 10.013, lng: 105.760 }
    },
    property_type: 'townhouse',
    title: 'Nhà phố hiện đại Cần Thơ',
    description: 'Nhà phố 3 tầng, gần trung tâm.',
    price: 4.5,
    area: 100,
    status: 'available',
    created_at: '2025-05-15T10:00:00Z',
    updated_at: '2025-05-15T10:00:00Z',
    contact: {
      name: 'Hoàng Văn P',
      email: 'hoangvanp@example.com',
      phone: '0915678901'
    },
    features: {
      bedrooms: '3',
      bathrooms: '2',
      furniture: 'Không nội thất'
    },
    media: {
      images: [
        { url: 'https://via.placeholder.com/600x400?text=Post5', caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 16,
    type: 'nhadatban',
    address: {
      province: 'Hà Nội',
      district: 'Thanh Xuân',
      ward: 'Nhân Chính',
      street: 'Nguyễn Tuân',
      complex: '',
      displayAddress: 'Nguyễn Tuân, Nhân Chính, Thanh Xuân, Hà Nội',
      coordinates: { lat: 21.002, lng: 105.804 }
    },
    property_type: 'apartment',
    title: 'Căn hộ Thanh Xuân giá tốt',
    description: 'Căn hộ 2 phòng ngủ, gần Royal City.',
    price: 2.8,
    area: 90,
    status: 'available',
    created_at: '2025-06-15T10:00:00Z',
    updated_at: '2025-06-15T10:00:00Z',
    contact: {
      name: 'Nguyễn Thị Q',
      email: 'nguyenthiq@example.com',
      phone: '0916789012'
    },
    features: {
      bedrooms: '2',
      bathrooms: '2',
      furniture: 'Full nội thất'
    },
    media: {
      images: [
        { url: 'https://via.placeholder.com/600x400?text=Post6', caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 17,
    type: 'nhadatban',
    address: {
      province: 'TP.HCM',
      district: 'Quận 2',
      ward: 'Thảo Điền',
      street: 'Nguyễn Văn Hưởng',
      complex: '',
      displayAddress: 'Nguyễn Văn Hưởng, Thảo Điền, Quận 2, TP.HCM',
      coordinates: { lat: 10.804, lng: 106.737 }
    },
    property_type: 'villa',
    title: 'Biệt thự Thảo Điền cao cấp',
    description: 'Biệt thự 4 phòng ngủ, hồ bơi riêng.',
    price: 15.0,
    area: 400,
    status: 'available',
    created_at: '2025-07-15T10:00:00Z',
    updated_at: '2025-07-15T10:00:00Z',
    contact: {
      name: 'Trần Văn R',
      email: 'tranvanr@example.com',
      phone: '0917890123'
    },
    features: {
      bedrooms: '4',
      bathrooms: '4',
      furniture: 'Full nội thất'
    },
    media: {
      images: [
        { url: 'https://via.placeholder.com/600x400?text=Post7', caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 18,
    type: 'nhadatban',
    address: {
      province: 'Đà Nẵng',
      district: 'Liên Chiểu',
      ward: 'Hòa Minh',
      street: 'Nguyễn Sinh Sắc',
      complex: '',
      displayAddress: 'Nguyễn Sinh Sắc, Hòa Minh, Liên Chiểu, Đà Nẵng',
      coordinates: { lat: 16.075, lng: 108.159 }
    },
    property_type: 'house',
    title: 'Nhà riêng Liên Chiểu',
    description: 'Nhà 2 tầng, gần trường học.',
    price: 3.0,
    area: 70,
    status: 'available',
    created_at: '2025-08-15T10:00:00Z',
    updated_at: '2025-08-15T10:00:00Z',
    contact: {
      name: 'Lê Thị S',
      email: 'lethis@example.com',
      phone: '0918901234'
    },
    features: {
      bedrooms: '3',
      bathrooms: '2',
      furniture: 'Không nội thất'
    },
    media: {
      images: [
        { url: 'https://via.placeholder.com/600x400?text=Post8', caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 19,
    type: 'nhadatban',
    address: {
      province: 'Hải Phòng',
      district: 'Dương Kinh',
      ward: 'Hòa Nghĩa',
      street: 'Phạm Văn Đồng',
      complex: '',
      displayAddress: 'Phạm Văn Đồng, Hòa Nghĩa, Dương Kinh, Hải Phòng',
      coordinates: { lat: 20.826, lng: 106.632 }
    },
    property_type: 'land',
    title: 'Đất nền Dương Kinh',
    description: 'Đất nền gần khu công nghiệp.',
    price: 2.5,
    area: 150,
    status: 'available',
    created_at: '2025-09-15T10:00:00Z',
    updated_at: '2025-09-15T10:00:00Z',
    contact: {
      name: 'Phạm Văn T',
      email: 'phamvant@example.com',
      phone: '0919012345'
    },
    features: {
      legalDocuments: 'Sổ đỏ'
    },
    media: {
      images: [
        { url: 'https://via.placeholder.com/600x400?text=Post9', caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
  {
    property_id: 20,
    type: 'nhadatban',
    address: {
      province: 'Cần Thơ',
      district: 'Ninh Kiều',
      ward: 'An Khánh',
      street: 'Nguyễn Văn Cừ',
      complex: '',
      displayAddress: 'Nguyễn Văn Cừ, An Khánh, Ninh Kiều, Cần Thơ',
      coordinates: { lat: 10.029, lng: 105.768 }
    },
    property_type: 'townhouse',
    title: 'Nhà phố Ninh Kiều',
    description: 'Nhà phố 4 tầng, gần Vincom.',
    price: 5.5,
    area: 120,
    status: 'available',
    created_at: '2025-10-15T10:00:00Z',
    updated_at: '2025-10-15T10:00:00Z',
    contact: {
      name: 'Hoàng Thị U',
      email: 'hoangthiu@example.com',
      phone: '0910123456'
    },
    features: {
      bedrooms: '4',
      bathrooms: '3',
      furniture: 'Full nội thất'
    },
    media: {
      images: [
        { url: 'https://via.placeholder.com/600x400?text=Post10', caption: 'Ảnh chính', is_primary: true }
      ],
      videoUrl: null
    }
  },
{
  property_id: 21,
  type: 'nhadatchothue',
  address: {
    province: 'Hà Nội',
    district: 'Đống Đa',
    ward: 'Láng Hạ',
    street: 'Láng',
    displayAddress: 'Láng, Láng Hạ, Đống Đa, Hà Nội',
    coordinates: { lat: 21.015, lng: 105.816 }
  },
  property_type: 'apartment',
  title: 'Căn hộ cho thuê Đống Đa',
  description: 'Căn hộ 2 phòng ngủ, nội thất đầy đủ.',
  price: 15,
  area: 80,
  status: 'available',
  created_at: '2025-01-20T10:00:00Z',
  updated_at: '2025-01-20T10:00:00Z',
  contact: {
    name: 'Nguyễn Văn T',
    email: 'nguyenvant@example.com',
    phone: '0911234567'
  },
  features: {
    bedrooms: '2',
    bathrooms: '2',
    furniture: 'Full nội thất',
    legalDocuments: 'Hợp đồng thuê'
  },
  media: {
    images: [
      { url: "https://via.placeholder.com/600x400?text=Rent1", caption: 'Ảnh chính', is_primary: true },
      { url: "https://via.placeholder.com/600x400?text=Rent1-2", caption: null, is_primary: false }
    ],
    videoUrl: null
  }
},
{
  property_id: 22,
  type: 'nhadatchothue',
  address: {
    province: 'TP.HCM',
    district: 'Quận 3',
    ward: 'Phường 7',
    street: 'Nguyễn Đình Chiểu',
    complex: '',
    displayAddress: 'Nguyễn Đình Chiểu, Phường 7, Quận 3, TP.HCM',
    coordinates: { lat: 10.775, lng: 106.689 }
  },
  property_type: 'house',
  title: 'Nhà riêng cho thuê Quận 3',
  description: 'Nhà 3 tầng, phù hợp gia đình.',
  price: 25,
  area: 100,
  status: 'available',
  created_at: '2025-02-20T10:00:00Z',
  updated_at: '2025-02-20T10:00:00Z',
  contact: {
    name: 'Trần Thị U',
    email: 'tranthiu@example.com',
    phone: '0912345678'
  },
  features: {
    bedrooms: '3',
    bathrooms: '2',
    furniture: 'Không nội thất'
  },
  media: {
    images: [
      { url: "https://via.placeholder.com/600x400?text=Rent2", caption: 'Ảnh chính', is_primary: true }
    ],
    videoUrl: null
  }
},
{
  property_id: 23,
  type: 'nhadatchothue',
  address: {
    province: 'Đà Nẵng',
    district: 'Sơn Trà',
    ward: 'An Hải Bắc',
    street: 'Võ Văn Kiệt',
    complex: '',
    displayAddress: 'Võ Văn Kiệt, An Hải Bắc, Sơn Trà, Đà Nẵng',
    coordinates: { lat: 16.071, lng: 108.234 }
  },
  property_type: 'apartment',
  title: 'Căn hộ cho thuê ven biển Đà Nẵng',
  description: 'Căn hộ view biển, nội thất cao cấp.',
  price: 20,
  area: 90,
  status: 'available',
  created_at: '2025-03-20T10:00:00Z',
  updated_at: '2025-03-20T10:00:00Z',
  contact: {
    name: 'Lê Văn V',
    email: 'levanv@example.com',
    phone: '0913456789'
  },
  features: {
    bedrooms: '2',
    bathrooms: '2',
    furniture: 'Full nội thất'
  },
  media: {
    images: [
      { url: "https://via.placeholder.com/600x400?text=Rent3", caption: 'Ảnh chính', is_primary: true }
    ],
    videoUrl: null
  }
},
{
  property_id: 24,
  type: 'nhadatchothue',
  address: {
    province: 'Hải Phòng',
    district: 'Lê Chân',
    ward: 'Kênh Dương',
    street: 'Võ Nguyên Giáp',
    complex: '',
    displayAddress: 'Võ Nguyên Giáp, Kênh Dương, Lê Chân, Hải Phòng',
    coordinates: { lat: 20.847, lng: 106.672 }
  },
  property_type: 'villa',
  title: 'Biệt thự cho thuê Hải Phòng',
  description: 'Biệt thự 3 phòng ngủ, sân vườn.',
  price: 50,
  area: 200,
  status: 'available',
  created_at: '2025-04-20T10:00:00Z',
  updated_at: '2025-04-20T10:00:00Z',
  contact: {
    name: 'Phạm Thị W',
    email: 'phamthiw@example.com',
    phone: '0914567890'
  },
  features: {
    bedrooms: '3',
    bathrooms: '3',
    furniture: 'Full nội thất'
  },
  media: {
    images: [
      { url: "https://via.placeholder.com/600x400?text=Rent4", caption: 'Ảnh chính', is_primary: true }
    ],
    videoUrl: null
  }
},
{
  property_id: 25,
  type: 'nhadatchothue',
  address: {
    province: 'Cần Thơ',
    district: 'Ninh Kiều',
    ward: 'Cái Khế',
    street: 'Nguyễn Trãi',
    complex: '',
    displayAddress: 'Nguyễn Trãi, Cái Khế, Ninh Kiều, Cần Thơ',
    coordinates: { lat: 10.038, lng: 105.781 }
  },
  property_type: 'townhouse',
  title: 'Nhà phố cho thuê Cần Thơ',
  description: 'Nhà phố 3 tầng, gần trung tâm.',
  price: 18,
  area: 120,
  status: 'available',
  created_at: '2025-05-20T10:00:00Z',
  updated_at: '2025-05-20T10:00:00Z',
  contact: {
    name: 'Hoàng Văn X',
    email: 'hoangvanx@example.com',
    phone: '0915678901'
  },
  features: {
    bedrooms: '3',
    bathrooms: '2',
    furniture: 'Không nội thất'
  },
  media: {
    images: [
      { url: "https://via.placeholder.com/600x400?text=Rent5", caption: 'Ảnh chính', is_primary: true }
    ],
    videoUrl: null
  }
},
{
  property_id: 26,
  type: 'nhadatchothue',
  address: {
    province: 'Hà Nội',
    district: 'Hai Bà Trưng',
    ward: 'Bạch Đằng',
    street: 'Trần Hưng Đạo',
    complex: '',
    displayAddress: 'Trần Hưng Đạo, Bạch Đằng, Hai Bà Trưng, Hà Nội',
    coordinates: { lat: 21.021, lng: 105.853 }
  },
  property_type: 'apartment',
  title: 'Căn hộ cao cấp Hai Bà Trưng',
  description: 'Căn hộ 3 phòng ngủ, gần trung tâm.',
  price: 22,
  area: 100,
  status: 'available',
  created_at: '2025-06-20T10:00:00Z',
  updated_at: '2025-06-20T10:00:00Z',
  contact: {
    name: 'Nguyễn Thị Y',
    email: 'nguyenthiy@example.com',
    phone: '0916789012'
  },
  features: {
    bedrooms: '3',
    bathrooms: '2',
    furniture: 'Full nội thất'
  },
  media: {
    images: [
      { url: "https://via.placeholder.com/600x400?text=Rent6", caption: 'Ảnh chính', is_primary: true }
    ],
    videoUrl: null
  }
},
{
  property_id: 27,
  type: 'nhadatchothue',
  address: {
    province: 'TP.HCM',
    district: 'Bình Thạnh',
    ward: 'Phường 25',
    street: 'Điện Biên Phủ',
    complex: '',
    displayAddress: 'Điện Biên Phủ, Phường 25, Bình Thạnh, TP.HCM',
    coordinates: { lat: 10.799, lng: 106.715 }
  },
  property_type: 'villa',
  title: 'Biệt thự cho thuê Bình Thạnh',
  description: 'Biệt thự 4 phòng ngủ, hồ bơi riêng.',
  price: 60,
  area: 300,
  status: 'available',
  created_at: '2025-07-20T10:00:00Z',
  updated_at: '2025-07-20T10:00:00Z',
  contact: {
    name: 'Trần Văn Z',
    email: 'tranvanz@example.com',
    phone: '0917890123'
  },
  features: {
    bedrooms: '4',
    bathrooms: '4',
    furniture: 'Full nội thất'
  },
  media: {
    images: [
      { url: "https://via.placeholder.com/600x400?text=Rent7", caption: 'Ảnh chính', is_primary: true }
    ],
    videoUrl: null
  }
},
{
  property_id: 28,
  type: 'nhadatchothue',
  address: {
    province: 'Đà Nẵng',
    district: 'Hải Châu',
    ward: 'Hòa Thuận Đông',
    street: 'Nguyễn Văn Linh',
    complex: '',
    displayAddress: 'Nguyễn Văn Linh, Hòa Thuận Đông, Hải Châu, Đà Nẵng',
    coordinates: { lat: 16.059, lng: 108.209 }
  },
  property_type: 'house',
  title: 'Nhà riêng cho thuê Hải Châu',
    description: 'Nhà 2 tầng, gần trung tâm.',
  price: 12,
  area: 70,
  status: 'available',
  created_at: '2025-08-20T10:00:00Z',
  updated_at: '2025-08-20T10:00:00Z',
  contact: {
    name: 'Lê Thị AA',
    email: 'lethiaa@example.com',
    phone: '0918901234'
  },
  features: {
    bedrooms: '2',
    bathrooms: '1',
    furniture: 'Không nội thất'
  },
  media: {
    images: [
      { url: "https://via.placeholder.com/600x400?text=Rent8", caption: 'Ảnh chính', is_primary: true }
    ],
    videoUrl: null
  }
},
{
  property_id: 29,
  type: 'nhadatchothue',
  address: {
    province: 'Hải Phòng',
    district: 'Ngô Quyền',
    ward: 'Máy Chai',
    street: 'Nguyễn Tri Phương',
    complex: '',
    displayAddress: 'Nguyễn Tri Phương, Máy Chai, Ngô Quyền, Hải Phòng',
    coordinates: { lat: 20.860, lng: 106.688 }
  },
  property_type: 'townhouse',
  title: 'Nhà phố cho thuê Ngô Quyền',
  description: 'Nhà phố 3 tầng, phù hợp kinh doanh.',
  price: 30,
  area: 150,
  status: 'available',
  created_at: '2025-09-20T10:00:00Z',
  updated_at: '2025-09-20T10:00:00Z',
  contact: {
    name: 'Phạm Văn BB',
    email: 'phamvanbb@example.com',
    phone: '0919012345'
  },
  features: {
    bedrooms: '3',
    bathrooms: '2',
    furniture: 'Không nội thất'
  },
  media: {
    images: [
      { url: "https://via.placeholder.com/600x400?text=Rent9", caption: 'Ảnh chính', is_primary: true }
    ],
    videoUrl: null
  }
},
{
  property_id: 30,
  type: 'nhadatchothue',
  address: {
    province: 'Cần Thơ',
    district: 'Bình Thủy',
    ward: 'Bùi Hữu Nghĩa',
    street: 'Bùi Hữu Nghĩa',
    complex: '',
    displayAddress: 'Bùi Hữu Nghĩa, Bùi Hữu Nghĩa, Bình Thủy, Cần Thơ',
    coordinates: { lat: 10.069, lng: 105.755 }
  },
  property_type: 'apartment',
  title: 'Căn hộ cho thuê Bình Thủy',
  description: 'Căn hộ 1 phòng ngủ, giá rẻ.',
  price: 8,
  area: 50,
  status: 'available',
  created_at: '2025-10-20T10:00:00Z',
  updated_at: '2025-10-20T10:00:00Z',
  contact: {
    name: 'Hoàng Thị CC',
    email: 'hoangthicc@example.com',
    phone: '0910123456'
  },
  features: {
    bedrooms: '1',
    bathrooms: '1',
    furniture: 'Full nội thất'
  },
  media: {
    images: [
      { url: "https://via.placeholder.com/600x400?text=Rent10", caption: 'Ảnh chính', is_primary: true }
    ],
    videoUrl: null
  }
}
];
