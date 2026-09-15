/**
 * Dữ liệu tĩnh cho header/mobile menu — tách riêng để Header là client component
 * mà không phải chờ tầng dữ liệu bất đồng bộ.
 * 3 danh mục sản phẩm là danh mục thật đang có trên inanthoidai.vn.
 */
export const headerCategories = [
  { slug: 'hop-giay', name: 'Hộp giày', href: '/san-pham?danh-muc=hop-giay' },
  { slug: 'hop-nap-gai', name: 'Hộp nắp gài', href: '/san-pham?danh-muc=hop-nap-gai' },
  { slug: 'thung-cod', name: 'Thùng COD', href: '/san-pham?danh-muc=thung-cod' },
  { slug: 'tui-xach-giay', name: 'Túi xách giấy', href: '/dich-vu/thiet-ke-bao-bi' },
  { slug: 'hop-qua-tang', name: 'Hộp quà tặng cao cấp', href: '/dich-vu/thiet-ke-bao-bi' },
  { slug: 'tem-nhan-decal', name: 'Tem, nhãn, decal', href: '/dich-vu/in-flexo' },
  { slug: 'catalogue-brochure', name: 'Catalogue & brochure', href: '/dich-vu/in-offset' },
  { slug: 'danh-thiep', name: 'Danh thiếp (name card)', href: '/dich-vu/in-offset' },
  { slug: 'to-roi-poster', name: 'Tờ rơi & poster', href: '/dich-vu/in-offset' },
  { slug: 'lich-tet', name: 'Lịch Tết', href: '/dich-vu/in-offset' },
  { slug: 'an-pham-van-phong', name: 'Ấn phẩm văn phòng', href: '/dich-vu/in-offset' },
  { slug: 'thung-carton', name: 'Thùng carton', href: '/san-pham?danh-muc=thung-cod' },
];

/** Thẻ hình trong mega menu "Sản phẩm" */
export const megaMenuCards = [
  {
    name: 'Hộp giày',
    href: '/san-pham?danh-muc=hop-giay',
    // TODO ảnh: hộp giày carton trắng — xem docs/IMAGE-GUIDE.md
    image: '/assets/images/thumbs/home-img1.png',
  },
  {
    name: 'Hộp nắp gài',
    href: '/san-pham?danh-muc=hop-nap-gai',
    image: '/assets/images/thumbs/home-img2.png',
  },
  {
    name: 'Thùng COD',
    href: '/san-pham?danh-muc=thung-cod',
    image: '/assets/images/thumbs/home-img3.png',
  },
  {
    name: 'Túi xách giấy',
    href: '/dich-vu/thiet-ke-bao-bi',
    image: '/assets/images/thumbs/home-img4.png',
  },
];
