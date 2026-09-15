import { localize } from './localize.mjs';

const D = 'src/components/home/';

localize(D + 'Banner.tsx', [
  ['Print Beyond Limits', 'In ấn không giới hạn'],
  ['Trusted by 50K+ Clients', 'Hơn 300 khách hàng tin tưởng'],
  [`The smartest platform to discover authentic influencers, launch viral campaigns, and scale your brand's.`,
   'Xưởng sản xuất trực tiếp hộp giấy, túi xách giấy, hộp giày, thùng carton và tem nhãn decal. Thiết kế miễn phí, giá xưởng, giao hàng toàn quốc.'],
  ['>Get Started <', '>Yêu cầu báo giá <'],
  ['Get In Touch', 'Xem sản phẩm'],
  ['10K+ Prints Delivered', 'Hơn 300 khách hàng doanh nghiệp'],
  ['24-48 Hour Fast Delivery', 'Xưởng sản xuất trực tiếp, không qua trung gian'],
  ['99% Client Satisfaction', 'Hơn 15 năm kinh nghiệm'],
  ['• Printop', '• Thời Đại'],
  ['alt="User Image"', 'alt=""'],
  ['alt="Element Shape"', 'alt=""'],
  ['alt="Image"', 'alt="Sản phẩm bao bì giấy của In Ấn Thời Đại"'],
], (c) => {
  // Ba cụm chữ của <h1> nằm xen giữa các <span> ảnh nên thay theo dòng riêng
  const h1 = [
    [/^(\s*)Find$/m, 'Bao bì giấy'],
    [/^(\s*)Printing$/m, 'chuẩn xưởng'],
    [/^(\s*)For Your Brand$/m, 'cho thương hiệu Việt'],
  ];
  for (const [re, to] of h1) {
    if (!re.test(c)) {
      if (c.includes(to)) continue; // đã dịch ở lần chạy trước
      throw new Error('Banner: không tìm thấy dòng h1 ' + re);
    }
    c = c.replace(re, (m, indent) => indent + to);
  }
  return c;
});

localize(D + 'ChooseUs.tsx', [
  ['Love Us', 'Vì sao chọn chúng tôi'],
  ['Why choose us', 'Điều làm nên khác biệt'],
  ['We combine quality, Speed & Reliability in Every Project & Why We Stand out',
   'Chất lượng ổn định, tiến độ đúng hẹn và giá xưởng — ba điều khách hàng ở lại với Thời Đại suốt hơn 15 năm'],
  ['Projects Completed', 'Đơn hàng đã sản xuất'],
  ['Happy Clients Worldwide', 'Khách hàng doanh nghiệp'],
  ['Quality Design', 'Thiết kế đúng quy cách'],
  ['We are committed to delivering exceptional printing solutions that combine quality.',
   'Dao bế, biên dán, nếp gấp và dung sai được tính trước, để bản in ra đúng như bản duyệt.'],
  ['Make It Mach', 'Giá xưởng'],
  ['Absolutely Guaranteed', 'Không qua trung gian'],
]);

localize(D + 'About.tsx', [
  ['Who We Are', 'Về chúng tôi'],
  ['About Our Company', 'Công Ty TNHH Công Nghiệp Thời Đại'],
  ['High-Quality Modern Printing', 'Thiết kế — In ấn — Bao bì giấy'],
  ['>Solutions<', '>từ năm 2009<'],
  ['Prints Delivered Globally', 'Đơn hàng đã giao'],
  ['Printop is a modern printing company dedicated to delivering high-quality, reliable, and creative printing solutions with expert craftsmanship.',
   'Tiền thân là Cơ Sở Bao Bì Thời Đại (2005), công ty chính thức thành lập ngày 09/07/2009. Xưởng sản xuất tại Tây Ninh, văn phòng tại TP.HCM, nhận thiết kế và in trực tiếp không qua trung gian.'],
  ['Premium Quality Printing You Trust', 'In offset và in Flexo ngay tại xưởng'],
  ['Fast Delivery With Reliable Service', 'Gia công sau in trọn gói'],
  ['>Get Started <', '>Tìm hiểu thêm <'],
  ['Watch Us', 'Xem video giới thiệu'],
]);

localize(D + 'Discount.tsx', [
  ['>Get<', '>Miễn phí<'],
  ['25% Discount', 'Thiết kế cho đơn in tại xưởng'],
  ['Save on printing, materials, and packaging in one place.',
   'Thiết kế, in ấn và gia công sau in — trọn gói tại một nơi.'],
  ['DEAL ENDS IN :', 'GIỜ LÀM VIỆC :'],
  ['>HOURS<', '>Thứ 2 - Thứ 7<'],
  ['>MINUTES<', '>Sáng<'],
  ['>SECONDS<', '>Chiều<'],
], (c) =>
  c.replace('<span className="hours">20</span>', '<span>8:00</span>')
   .replace('<span className="minutes">36</span>', '<span>12:00</span>')
   .replace('<span className="seconds">56</span>', '<span>17:00</span>')
   .replace(' id="countdown1"', ''),
);

localize(D + 'Cta.tsx', [
  ['Call To Action', 'Bắt đầu ngay'],
  ['Start Printing Today', 'Gửi yêu cầu báo giá hôm nay'],
  ['Bringing Creativity And Quality Together', 'Thiết kế miễn phí — Giá xưởng — Đúng tiến độ'],
  ['Take your printing to the next level with Printop. Whether you need business materials, custom products, or large-scale prints.',
   'Gửi kích thước, số lượng và mục đích sử dụng, chúng tôi báo giá trong ngày làm việc. Nhận đơn từ 100 hộp, in theo yêu cầu từ 500 hộp.'],
  ['Register Now', 'Gửi yêu cầu báo giá'],
  ['Get In Touch', 'Liên hệ tư vấn'],
  ['Enjoy free shipping on all orders with no minimum required', 'Thiết kế miễn phí cho đơn in tại xưởng'],
  ['Secure Payments with fast, reliable, and easy processing', 'Giao hàng toàn quốc, nhận hàng kiểm tra rồi thanh toán'],
]);
