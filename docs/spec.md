# Spec: Website In Ấn Thời Đại (refactor trên template Printop)

## Mục tiêu
Dựng lại website của Công Ty TNHH Công Nghiệp Thời Đại (inanthoidai.vn) trên nền giao diện
template Printop, giữ nguyên bố cục — chỉ thay nội dung. Site cũ chạy WordPress/WooCommerce,
giao diện cũ và một số vùng còn chữ "Lorem ipsum" ngoài production.

## Người dùng
- **Khách vãng lai**: xem sản phẩm hộp giấy/thùng carton, đọc kiến thức in ấn, tìm thông tin liên hệ.
- **Khách có nhu cầu đặt in**: chọn sản phẩm → thêm vào giỏ → gửi yêu cầu báo giá (không thanh toán online).
- **Nhân viên kinh doanh Thời Đại**: nhận yêu cầu báo giá qua email + xem lại trong Supabase.
- **Người quản trị nội dung**: thêm/sửa sản phẩm và tin tức trong Supabase Studio.

## Tính năng PHẢI có
- 15 trang theo đúng bố cục template (danh sách ở `docs/backlog.md`).
- Danh mục sản phẩm + chi tiết sản phẩm, dữ liệu thật từ inanthoidai.vn.
- Tin tức + chi tiết bài viết, nội dung thật.
- Giỏ hàng client-side (localStorage) → form "Yêu cầu báo giá".
- Form liên hệ + form báo giá: lưu Supabase, gửi email thông báo qua Resend.
- SEO: metadata từng trang, sitemap, robots, Open Graph.
- Toàn bộ giao diện tiếng Việt.

## KHÔNG làm ở bản đầu (out of scope)
- Thanh toán online, cổng thanh toán, tài khoản khách hàng, đăng nhập.
- 4 biến thể trang chủ của template (chỉ dùng `index.html`).
- Trang `shop-new`, `shop-details-new` (trùng chức năng).
- Đa ngôn ngữ.
- Trang quản trị nội dung riêng (dùng thẳng Supabase Studio).
- Tự động đồng bộ dữ liệu từ WordPress cũ.

## Nguồn thiết kế
Template **Printop** (wowtheme7, ThemeForest) tại `../printop`.
Nguyên tắc: giữ nguyên bố cục, markup và **tên class CSS**; dùng thẳng `bootstrap.min.css` +
`main.css` của template. Không tự đổi màu/font/spacing "cho đẹp hơn".
Trang chủ lấy từ `index.html`.

## Công nghệ
- Frontend: Next.js 16 (App Router) + React 19 + TypeScript
- CSS: bootstrap.min.css + aos.css + swiper-bundle.min.css + magnific-popup.css + main.css của template (giữ nguyên)
- Slider: swiper 12.0.3 (khớp đúng phiên bản template) qua `swiper/react`
- Animation: AOS + GSAP (ScrollTrigger, SplitText) từ npm
- Icon: Phosphor Icons (MIT) qua CDN — giống template
- Database: Supabase (PostgreSQL), có fallback seed tĩnh khi thiếu biến môi trường
- Email: Resend
- Deploy: Vercel

## Dữ liệu cần lưu (tên bảng/cột bằng tiếng Anh — chốt từ đây, không đổi giữa chừng)
- `categories` — id, slug, name, description, image_url, sort_order
- `products` — id, slug, name, sku, category_id, price_min, price_max, short_description,
  description, specs (jsonb), quantity_options (int[]), images (text[]), is_featured, created_at
- `posts` — id, slug, title, excerpt, content, category, cover_image_url, published_at, author
- `services` — id, slug, name, summary, description, icon, image_url, sort_order
- `quote_requests` — id, full_name, phone, email, company, note, items (jsonb), created_at
- `contact_messages` — id, full_name, email, phone, subject, message, created_at
- `newsletter_subscribers` — id, email (unique), source, created_at

## Thông tin doanh nghiệp (dùng xuyên suốt, nguồn: inanthoidai.vn)
- Tên: Công Ty TNHH Công Nghiệp Thời Đại — thương hiệu: IN ẤN THỜI ĐẠI
- Thành lập: 09/07/2009 (tiền thân: Cơ Sở Bao Bì Thời Đại, 2005-2008)
- Văn phòng: 298/1 Lê Văn Quới, KP.24, P. Bình Trị Đông, TP. Hồ Chí Minh
- Xưởng: 1250/22 Ấp 5, Xã Mỹ Hạnh, Tỉnh Tây Ninh
- Hotline: 0938 676 746 — Văn phòng: 028 6267 2277 — Zalo đặt hàng: 0399 466 179
- Email: office@inanthoidai.vn / thoidaicoltd@gmail.com
- Giờ làm việc: 8:00-12:00, 13:00-17:00, nghỉ Chủ nhật
- Facebook: facebook.com/inanthoidai.vn — YouTube: @inanthoiai6103 — TikTok: @www.inanthoidai.vn
