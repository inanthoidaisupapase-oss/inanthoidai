# Backlog

Quy tắc: 1 phiên = 1-2 task. Port giao diện và nối dữ liệu là **hai task riêng**.

## (0) Port giao diện tĩnh
- [x] Scaffold Next.js 16 + TS, pin swiper 12.0.3 khớp template
- [x] Copy assets (css + 281 ảnh), kiểm tra 219 đường dẫn asset không thiếu file
- [x] Script `tools/html2jsx.mjs` + `tools/extract.mjs` — chuyển fragment HTML sang JSX giữ nguyên class
- [x] Tách 15 section của index.html thành component
- [ ] layout.tsx: nạp CSS template, font, Phosphor icon, AOS, GSAP
- [ ] Header + mega menu + sticky (scrollTop >= 260) + search + giỏ hàng
- [ ] Mobile menu (breakpoint <= 991) + overlay
- [ ] Footer
- [ ] Preloader (nhớ port cả phần JS ẩn nó) + Scroll-to-top (hiện khi scroll > 50)
- [ ] 12 section trang chủ, thay Swiper jQuery bằng swiper/react đúng config đã đọc từ main.js
- [ ] 14 trang còn lại

## (1) Nối dữ liệu
- [ ] Kiểu dữ liệu + seed JSON từ nội dung crawl (12 sản phẩm, 3 danh mục, 19 bài viết)
- [ ] `src/lib/data/*` với fallback: có env Supabase thì đọc DB, không thì đọc seed
- [ ] Migration SQL + RLS + script seed
- [ ] Nối trang sản phẩm / chi tiết sản phẩm / tin tức / chi tiết tin

## (2) Nghiệp vụ & form
- [ ] CartContext + localStorage + badge số lượng ở header
- [ ] Trang giỏ hàng
- [ ] Form yêu cầu báo giá: Server Action, validate ở backend, lưu Supabase, gửi Resend
- [ ] Form liên hệ: cùng cơ chế
- [ ] Rate limit chống spam

## (3) Hoàn thiện
- [ ] SEO metadata từng trang + sitemap.xml + robots.txt + OG image
- [ ] IMAGE-GUIDE.md: từng vị trí ảnh placeholder cần thay, kích thước chuẩn
- [ ] README: chạy local, nối Supabase, push GitHub, import Vercel
- [ ] `npm run build` sạch, rà 404 asset, đối chiếu responsive theo breakpoint main.css
