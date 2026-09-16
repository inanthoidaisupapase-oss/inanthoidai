# Backlog

Quy tắc: 1 phiên = 1-2 task. Port giao diện và nối dữ liệu là **hai task riêng**.

## (0) Port giao diện tĩnh
- [x] Scaffold Next.js 16 + TS, pin swiper 12.0.3 khớp template
- [x] Copy assets (css + 281 ảnh), kiểm tra 219 đường dẫn asset không thiếu file
- [x] Script `tools/html2jsx.mjs` + `tools/extract.mjs` — chuyển fragment HTML sang JSX giữ nguyên class
- [x] Tách 15 section của index.html thành component
- [x] layout.tsx: nạp CSS template, font, Phosphor icon, AOS, GSAP
- [x] Header + mega menu + sticky (scrollTop >= 260) + search + giỏ hàng
- [x] Mobile menu (breakpoint <= 991) + overlay
- [x] Footer
- [x] Preloader (nhớ port cả phần JS ẩn nó) + Scroll-to-top (hiện khi scroll > 50)
- [x] 12 section trang chủ, thay Swiper jQuery bằng swiper/react đúng config đã đọc từ main.js
- [x] 14 trang còn lại

## (1) Nối dữ liệu
- [x] Kiểu dữ liệu + seed JSON từ nội dung crawl (12 sản phẩm, 3 danh mục, 4 dịch vụ, 22 bài viết)
- [x] `src/lib/data/*` với fallback: có env Supabase thì đọc DB, không thì đọc seed
- [x] Migration SQL + RLS + script seed
- [x] Nối trang sản phẩm / chi tiết sản phẩm / tin tức / chi tiết tin

## (2) Nghiệp vụ & form
- [x] CartContext + localStorage + badge số lượng ở header
- [x] Trang giỏ hàng
- [x] Form yêu cầu báo giá: Server Action, validate ở backend, lưu Supabase, gửi Resend
- [x] Form liên hệ: cùng cơ chế
- [x] Rate limit chống spam

## (3) Hoàn thiện
- [x] SEO metadata từng trang + sitemap.xml + robots.txt + OG image
- [x] IMAGE-GUIDE.md: từng vị trí ảnh placeholder cần thay, kích thước chuẩn
- [x] README: chạy local, nối Supabase, push GitHub, import Vercel
- [x] `npm run build` sạch, rà 404 asset, đối chiếu responsive theo breakpoint main.css

## Kết quả kiểm chứng (2026-09-16)

- `npm run build`: không lỗi. 21 route, 38 trang prerender sẵn (12 sản phẩm, 22 bài viết, 4 dịch vụ).
- `npx eslint src`: 0 lỗi (1 cảnh báo no-page-custom-font — sai lệch của rule với App Router).
- Smoke test qua `next start`: 21/21 URL trả 200, trang không tồn tại trả 404 đúng.
- 113 tài nguyên tĩnh được HTML tham chiếu: 0 lỗi 404.
- 156 đường dẫn asset viết trong code + toàn bộ ảnh trong seed JSON: 0 file thiếu.
- Rà chữ tiếng Anh và "lorem ipsum" trên 12 trang: sạch.
- Dấu tiếng Việt hiển thị đúng, không mojibake.

## Chưa làm được trong môi trường này (cần làm trên máy thật)

- Kiểm tra bằng mắt trên trình duyệt: animation GSAP, slider Swiper, menu mobile,
  các breakpoint 575 / 767 / 991 / 1199 px. Shell build không có trình duyệt.
- Đẩy schema lên Supabase và deploy Vercel: shell không ra được supabase.co và vercel.com.
