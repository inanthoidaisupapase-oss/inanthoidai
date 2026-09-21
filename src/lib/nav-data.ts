/**
 * Dữ liệu tĩnh cho header/mobile menu — tách riêng để Header là client component
 * mà không phải chờ tầng dữ liệu bất đồng bộ.
 * 13 danh mục khớp categories.json (3 đã có sản phẩm thật: hop-giay/hop-nap-gai/thung-cod,
 * 10 danh mục còn lại đã có trang lọc thật, có sản phẩm mẫu — chờ nội dung thật).
 */
export const headerCategories = [
  { slug: 'tat-ca-san-pham', name: 'Tất cả sản phẩm', href: '/san-pham' },
  { slug: 'hop-giay', name: 'Hộp giày', href: '/san-pham?danh-muc=hop-giay' },
  { slug: 'hop-nap-gai', name: 'Hộp nắp gài', href: '/san-pham?danh-muc=hop-nap-gai' },
  { slug: 'thung-cod', name: 'Thùng COD', href: '/san-pham?danh-muc=thung-cod' },
  { slug: 'tui-xach-giay', name: 'Túi xách giấy', href: '/san-pham?danh-muc=tui-xach-giay' },
  { slug: 'hop-qua-tang', name: 'Hộp quà tặng cao cấp', href: '/san-pham?danh-muc=hop-qua-tang' },
  { slug: 'tem-nhan-decal', name: 'Tem, nhãn, decal', href: '/san-pham?danh-muc=tem-nhan-decal' },
  { slug: 'catalogue-brochure', name: 'Catalogue & brochure', href: '/san-pham?danh-muc=catalogue-brochure' },
  { slug: 'danh-thiep', name: 'Danh thiếp (name card)', href: '/san-pham?danh-muc=danh-thiep' },
  { slug: 'to-roi-poster', name: 'Tờ rơi & poster', href: '/san-pham?danh-muc=to-roi-poster' },
  { slug: 'lich-tet', name: 'Lịch Tết', href: '/san-pham?danh-muc=lich-tet' },
  { slug: 'bao-li-xi', name: 'Bao lì xì', href: '/san-pham?danh-muc=bao-li-xi' },
  { slug: 'an-pham-van-phong', name: 'Ấn phẩm văn phòng', href: '/san-pham?danh-muc=an-pham-van-phong' },
  { slug: 'thung-carton', name: 'Thùng carton', href: '/san-pham?danh-muc=thung-carton' },
];
