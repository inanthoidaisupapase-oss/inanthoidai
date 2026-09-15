# Quy ước dự án inanthoidai-web

Đọc `docs/spec.md` và `docs/backlog.md` trước khi làm bất kỳ task nào.

## Giao diện — bất di bất dịch
- Giữ NGUYÊN tên class CSS của template Printop. Không đổi tên, không rút gọn, không thay bằng utility khác.
- Không sửa `public/assets/css/main.css` và `bootstrap.min.css`. Mọi tuỳ biến thương hiệu đặt trong
  `src/app/brand.css` bằng cách ghi đè CSS variable (`--main-h/s/l`).
- Không tự chọn màu/font/spacing khác bản gốc. Không thêm gradient tím, không bo góc mặc định framework.
- Khi thay plugin jQuery bằng giải pháp React: đọc đúng tham số init trong `../printop/assets/js/main.js`,
  không đoán. Các mốc đã chốt: sticky header scrollTop >= 260; mobile menu breakpoint <= 991;
  scroll-to-top hiện khi scroll > 50; AOS `once: false`; counter duration 1500 / delay 16.
- Ảnh hiện dùng placeholder của template. Mỗi chỗ phải có ghi chú trong `docs/IMAGE-GUIDE.md`
  (nội dung ảnh cần là gì + kích thước px). Không tự sinh ảnh mới.

## Code
- Server Component mặc định; chỉ thêm `'use client'` khi thực sự cần state/effect.
- Không thêm thư viện ngoài kế hoạch trong spec mà không hỏi trước.
- Tên bảng/cột database theo `docs/spec.md`, tiếng Anh, snake_case. Nếu thấy mâu thuẫn với spec —
  DỪNG LẠI HỎI, không tự chọn phương án.
- Mọi input từ form phải validate lại ở server, không tin dữ liệu client gửi lên.
- Secrets nằm trong `.env.local`, không hardcode, không commit. `.env.example` chỉ chứa tên biến.
- Truy vấn database qua Supabase client (đã tham số hoá), không ghép chuỗi SQL.

## Giới hạn môi trường (đã kiểm chứng)
- Shell build KHÔNG ra được: supabase.co, vercel.com, fonts.googleapis.com, inanthoidai.vn.
  Ra được: github.com, registry.npmjs.org.
- Vì vậy: không dùng `next/font/google` (font nạp bằng @import trong main.css, chạy phía trình duyệt).
- Vì vậy: data layer phải chạy được khi KHÔNG có biến môi trường Supabase (fallback seed tĩnh).
- Deploy Vercel và đẩy schema Supabase do người dùng tự bấm, không tự động hoá từ shell.
