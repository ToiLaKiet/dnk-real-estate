export const postData = [
  {
    id: 1011,
    userId: 5011,
    title: "VUNG TAU SEAFRONT VILLA 200m², 4 BEDROOMS, DIRECT SEA VIEW - 25 BILLION VND",
    description: "Luxury resort villa on Tran Phu Street, Vung Tau. Area 200m² (10x20m), 3 floors + rooftop, 4 bedrooms (master bedroom with sea view), 3 bathrooms. Mediterranean-style design with imported materials: walnut wood, marble stone. Amenities: private pool, garden, car garage. Legal status: individual pink book, permanent ownership. 100m from Back Beach, near The Grand 5* hotel. Suitable for rental investment or residence. Price includes VAT.",
    price: 25000000000,
    area: 200,
    phone: "0901234567",
    media: [
      {
        url: "https://example.com/biet-thu-vung-tau-1.jpg",
        type: "image",
        alt: "Front view of the villa"
      },
      {
        url: "https://example.com/biet-thu-vung-tau-2.jpg",
        type: "image",
        alt: "Living room interior"
      },
      {
        url: "https://example.com/biet-thu-vung-tau-3.jpg",
        type: "image",
        alt: "Master bedroom"
      },
      {
        url: "https://youtube.com/watch?v=biet-thu-vung-tau",
        type: "video",
        title: "Villa tour video"
      }
    ],
    location: {
      province: "Ba Ria - Vung Tau",
      district: "Vung Tau City",
      ward: "Ward 2",
      address: "12 Tran Phu",
      coordinates: {
        lat: 10.3456,
        lng: 107.0842
      }
    },
    propertyType: "Seafront villa",
    status: "For sale",
    createdAt: "2023-06-01T09:00:00",
    updatedAt: "2023-06-10T15:22:00",
    isVip: true,
    vipType: "Diamond",
    legalDocuments: "Pink book + Building permit",
    furniture: {
      bedrooms: 4,
      bathrooms: 3,
      kitchen: true,
      airConditioners: 5,
      washingMachine: true,
      refrigerator: true,
      otherFurniture: "Cơ bản"
    },
    utilities: {
      pool: true,
      gym: false,
      parking: true,
      security: true,
      elevator: false
    },
    contactInfo: {
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      additionalPhones: ["0912345678"],
      contactHours: "9:00 - 18:00 daily"
    },
    viewingSchedule: [
      {
        date: "2023-07-15",
        time: "14:00",
        available: true
      },
      {
        date: "2023-07-16",
        time: "10:00",
        available: true
      }
    ]
  },
  {
    id: 1012,
    userId: 5012,
    title: "QUAN 7 STUDIO APARTMENT 32m² - FULLY FURNISHED - ONLY 1.8 BILLION VND",
    description: "Cozy studio apartment at The Sun Avenue project, Quan 7. Area 32m², open design (combining living room + kitchen + bedroom). Fully furnished: bed, wardrobe, induction stove, air conditioner. Project amenities: pool, gym, supermarket. Suitable for singles or couples. Pink book available, bank loan support up to 50%. Ready for rent at 8 million/month. Preference for buyers intending to live in.",
    price: 1800000000,
    area: 32,
    phone: "0912345678",
    media: [
      {
        url: "https://example.com/sun-avenue-1.jpg",
        type: "image",
        alt: "Apartment living area"
      },
      {
        url: "https://example.com/sun-avenue-2.jpg",
        type: "image",
        alt: "Kitchenette"
      }
    ],
    location: {
      province: "Ho Chi Minh City",
      district: "Quan 7",
      ward: "Tan Phong",
      address: "The Sun Avenue, Floor 15, Lot B12",
      coordinates: {
        lat: 10.7321,
        lng: 106.7223
      }
    },
    propertyType: "Studio apartment",
    status: "For sale",
    createdAt: "2023-05-25T11:30:00",
    updatedAt: "2023-06-05T10:10:00",
    isVip: false,
    vipType: "",
    legalDocuments: "Pink book owned outright",
    furniture: {
      bedrooms: 1,
      bathrooms: 1,
      kitchen: true,
      airConditioners: 1,
      washingMachine: false,
      refrigerator: true,
      otherFurniture: "Wooden cabinet, curtains"
    },
    utilities: {
      pool: true,
      gym: true,
      parking: false,
      security: true,
      elevator: true
    },
    contactInfo: {
      name: "Trần Thị B",
      email: "tranthib@example.com",
      additionalPhones: [],
      contactHours: "10:00 - 17:00 weekdays"
    },
    viewingSchedule: [
      {
        date: "2023-07-14",
        time: "15:30",
        available: true
      }
    ]
  },
  {
    id: 1013,
    userId: 5013,
    title: "THU DUC TOWNHOUSE 80m², 4 FLOORS - PRIME LOCATION NEAR NATIONAL UNIVERSITY",
    description: "Newly built townhouse on Vo Van Ngan Street, Thu Duc. Area 80m² (4x20m), 4 floors, 3 bedrooms, 2 bathrooms. Modern design: gypsum ceiling, industrial wood flooring, Xingfa aluminum doors. Secure area, near National University, high-tech zone. Legal status: individual pink book, no disputes. Price negotiable for serious buyers. Contact to view the house directly.",
    price: 9500000000,
    area: 80,
    phone: "0987654321",
    media: [
      {
        url: "https://example.com/nha-pho-thu-duc-1.jpg",
        type: "image",
        alt: "Townhouse exterior"
      },
      {
        url: "https://example.com/nha-pho-thu-duc-2.jpg",
        type: "image",
        alt: "Staircase design"
      }
    ],
    location: {
      province: "Ho Chi Minh City",
      district: "Thu Duc",
      ward: "Linh Chieu",
      address: "45 Vo Van Ngan",
      coordinates: {
        lat: 10.8612,
        lng: 106.7598
      }
    },
    propertyType: "Townhouse",
    status: "For sale",
    createdAt: "2023-06-12T08:45:00",
    updatedAt: "2023-06-18T17:30:00",
    isVip: true,
    vipType: "Silver",
    legalDocuments: "Pink book + Sale contract",
    furniture: {
      bedrooms: 3,
      bathrooms: 2,
      kitchen: true,
      airConditioners: 3,
      washingMachine: true,
      refrigerator: true,
      otherFurniture: "Security camera"
    },
    utilities: {
      pool: false,
      gym: false,
      parking: true,
      security: true,
      elevator: false
    },
    contactInfo: {
      name: "Lê Văn C",
      email: "levanc@example.com",
      additionalPhones: ["0978123456"],
      contactHours: "8:00 - 20:00 daily"
    },
    viewingSchedule: [
      {
        date: "2023-07-13",
        time: "09:00",
        available: true
      },
      {
        date: "2023-07-14",
        time: "16:00",
        available: true
      }
    ]
  }
];
