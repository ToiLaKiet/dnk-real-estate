export const mockNews = [
    {
      news_id: 1,
      user_id: 100,
      title: "Hà Nội Property Prices Surge in 2025",
      content: "Hà Nội's real estate market is experiencing unprecedented growth due to increased demand and new infrastructure projects. Experts predict continued rises in property values, especially in central districts. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      thumbnail_url: "https://picsum.photos/400/250?random=1",
      status: "published",
      created_at: "2025-06-04T09:00:00Z",
      updated_at: "2025-06-04T09:00:00Z",
      province: "Hà Nội"
    },
    {
      news_id: 2,
      user_id: 101,
      title: "TP.HCM Launches New Housing Policy",
      content: "The TP.HCM government has introduced policies to support affordable housing. This initiative aims to address the growing demand for residential properties in the city. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      thumbnail_url: "https://picsum.photos/400/250?random=2",
      status: "published",
      created_at: "2025-06-03T10:00:00Z",
      updated_at: "2025-06-03T10:00:00Z",
      province: "TP.HCM"
    },
    // Additional province-specific news
    {
      news_id: 3,
      user_id: 102,
      title: "Đà Nẵng Coastal Properties Gain Popularity",
      content: "Coastal properties in Đà Nẵng are attracting investors due to tourism growth. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      thumbnail_url: "https://picsum.photos/400/250?random=3",
      status: "published",
      created_at: "2025-06-02T08:00:00Z",
      updated_at: "2025-06-02T08:00:00Z",
      province: "Đà Nẵng"
    },
    {
      news_id: 4,
      user_id: 103,
      title: "Hải Phòng Industrial Real Estate Boom",
      content: "Hải Phòng's industrial zones are driving real estate growth. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      thumbnail_url: "https://picsum.photos/400/250?random=4",
      status: "published",
      created_at: "2025-06-01T12:00:00Z",
      updated_at: "2025-06-01T12:00:00Z",
      province: "Hải Phòng"
    },
    {
      news_id: 5,
      user_id: 104,
      title: "Cần Thơ Residential Market Expands",
      content: "Cần Thơ sees new residential projects to meet demand. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      thumbnail_url: "https://picsum.photos/400/250?random=5",
      status: "published",
      created_at: "2025-05-31T09:00:00Z",
      updated_at: "2025-05-31T09:00:00Z",
      province: "Cần Thơ"
    },
    {
      news_id: 6,
      user_id: 105,
      title: "Bình Dương Attracts Foreign Investors",
      content: "Bình Dương's real estate market grows with foreign investment. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      thumbnail_url: "https://picsum.photos/400/250?random=6",
      status: "published",
      created_at: "2025-05-30T11:00:00Z",
      updated_at: "2025-05-30T11:00:00Z",
      province: "Bình Dương"
    },
    {
      news_id: 7,
      user_id: 106,
      title: "Đồng Nai Urban Development Plans",
      content: "Đồng Nai announces new urban real estate projects. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      thumbnail_url: "https://picsum.photos/400/250?random=7",
      status: "published",
      created_at: "2025-05-29T10:00:00Z",
      updated_at: "2025-05-29T10:00:00Z",
      province: "Đồng Nai"
    },
    {
      news_id: 8,
      user_id: 107,
      title: "Khánh Hòa Tourism Drives Property Growth",
      content: "Khánh Hòa’s tourism boom fuels real estate demand. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      thumbnail_url: "https://picsum.photos/400/250?random=8",
      status: "published",
      created_at: "2025-05-28T08:00:00Z",
      updated_at: "2025-05-28T08:00:00Z",
      province: "Khánh Hòa"
    },
    {
      news_id: 9,
      user_id: 108,
      title: "Nghệ An Real Estate Market Heats Up",
      content: "Nghệ An sees increased real estate activity. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      thumbnail_url: "https://picsum.photos/400/250?random=9",
      status: "published",
      created_at: "2025-05-27T09:00:00Z",
      updated_at: "2025-05-27T09:00:00Z",
      province: "Nghệ An"
    },
    {
      news_id: 10,
      user_id: 109,
      title: "Quảng Ninh Port City Real Estate",
      content: "Quảng Ninh’s port city drives property investments. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      thumbnail_url: "https://picsum.photos/400/250?random=10",
      status: "published",
      created_at: "2025-05-26T10:00:00Z",
      updated_at: "2025-05-26T10:00:00Z",
      province: "Quảng Ninh"
    },
    // Additional news items
    ...Array.from({ length: 40 }, (_, i) => ({
      news_id: i + 11,
      user_id: 100 + (i % 10),
      title: `Real Estate Trend Update ${i + 1}`,
      content: `This is a sample news article about real estate trends in Vietnam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`,
      thumbnail_url: `https://picsum.photos/400/250?random=${i + 11}`,
      status: i % 5 === 0 ? "draft" : "published",
      created_at: `2025-05-${(25 - (i % 25)).toString().padStart(2, '0')}T09:00:00Z`,
      updated_at: `2025-05-${(25 - (i % 25)).toString().padStart(2, '0')}T09:00:00Z`,
      province: null
    }))
  ];
