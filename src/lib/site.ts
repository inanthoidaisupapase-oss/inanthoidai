/** Thông tin doanh nghiệp — nguồn: inanthoidai.vn. Sửa ở đây, dùng toàn site. */
export const site = {
  name: 'IN ẤN THỜI ĐẠI',
  legalName: 'Công Ty TNHH Công Nghiệp Thời Đại',
  tagline: 'Thiết kế — In ấn — Bao bì giấy',
  description:
    'Công Ty TNHH Công Nghiệp Thời Đại chuyên thiết kế, in ấn và sản xuất hộp giấy, túi xách giấy, hộp giày, thùng carton, tem nhãn decal, catalogue và ấn phẩm văn phòng. Giá xưởng, thiết kế miễn phí, giao hàng toàn quốc.',
  url: 'https://inanthoidai.vn',
  foundedAt: '09/07/2009',
  office: '298/1 Lê Văn Quới, KP.24, P. Bình Trị Đông, TP. Hồ Chí Minh',
  factory: '1250/22 Ấp 5, Xã Mỹ Hạnh, Tỉnh Tây Ninh',
  hotline: '0938 676 746',
  hotlineTel: '+84938676746',
  officePhone: '028 6267 2277',
  officePhoneTel: '+842862672277',
  zalo: '0399 466 179',
  email: 'office@inanthoidai.vn',
  email2: 'thoidaicoltd@gmail.com',
  workingHours: 'Sáng 8:00 - 12:00 · Chiều 13:00 - 17:00 (nghỉ Chủ nhật)',
  social: {
    facebook: 'https://www.facebook.com/inanthoidai.vn',
    youtube: 'https://www.youtube.com/@inanthoiai6103/shorts',
    tiktok: 'https://www.tiktok.com/@www.inanthoidai.vn?lang=vi-VN',
  },
} as const;

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

/** Menu điều hướng chính — theo cấu trúc của inanthoidai.vn */
export const mainNav: NavItem[] = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  {
    label: 'Sản phẩm',
    href: '/san-pham',
    children: [
      { label: 'Tất cả sản phẩm', href: '/san-pham' },
      { label: 'Hộp giày', href: '/san-pham?danh-muc=hop-giay' },
      { label: 'Hộp nắp gài', href: '/san-pham?danh-muc=hop-nap-gai' },
      { label: 'Thùng COD', href: '/san-pham?danh-muc=thung-cod' },
    ],
  },
  {
    label: 'Dịch vụ',
    href: '/dich-vu',
    children: [
      { label: 'Tất cả dịch vụ', href: '/dich-vu' },
      { label: 'In offset', href: '/dich-vu/in-offset' },
      { label: 'In flexo', href: '/dich-vu/in-flexo' },
      { label: 'Thiết kế bao bì', href: '/dich-vu/thiet-ke-bao-bi' },
      { label: 'Gia công sau in', href: '/dich-vu/gia-cong-sau-in' },
    ],
  },
  { label: 'Tin tức', href: '/tin-tuc' },
  {
    label: 'Khác',
    href: '/bang-gia',
    children: [
      { label: 'Bảng giá', href: '/bang-gia' },
      { label: 'Đội ngũ', href: '/doi-ngu' },
      { label: 'Câu hỏi thường gặp', href: '/cau-hoi-thuong-gap' },
      { label: 'Giỏ hàng', href: '/gio-hang' },
      { label: 'Yêu cầu báo giá', href: '/bao-gia' },
    ],
  },
  { label: 'Liên hệ', href: '/lien-he' },
];
