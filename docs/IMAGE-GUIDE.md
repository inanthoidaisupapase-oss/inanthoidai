# Hướng dẫn thay ảnh thật

Toàn bộ ảnh hiện tại là **ảnh placeholder của template Printop**. Bảng dưới đây liệt kê từng vị trí:
đường dẫn file, dùng ở đâu, kích thước placeholder đang dùng (đọc từ header file, không ước lượng)
và ảnh thật nên chụp/thiết kế thế nào.

## Cách thay

1. Chuẩn bị ảnh thật **đúng tỉ lệ** như cột "Kích thước" (số px có thể lớn hơn, miễn giữ tỉ lệ).
2. Ghi đè file cùng tên trong `public/assets/images/...` — không cần sửa code.
3. Nếu muốn đổi tên file, sửa đường dẫn ở các file được liệt kê trong cột "Dùng ở".
4. Nên xuất `.webp` chất lượng 80 để nhẹ hơn `.png`; khi đó phải sửa đuôi file trong code.

## Lưu ý chung

- Ảnh sản phẩm: chụp trên nền trắng hoặc xám nhạt đồng nhất, đủ sáng, thấy rõ cạnh hộp và chất giấy.
- Mỗi sản phẩm nên có 4 ảnh: ảnh chính (góc 3/4), ảnh mở nắp, ảnh cận chất liệu, ảnh có sản phẩm bên trong.
- Ảnh bìa bài viết: tỉ lệ ngang, chừa khoảng trống ở góc trên phải vì có khối ngày tháng đè lên.
- Logo: xuất nền trong suốt (PNG hoặc SVG), thêm bản màu trắng để dùng trên nền tối ở footer.

## Danh sách ảnh

| Đường dẫn file | Kích thước placeholder | Dùng ở | Ảnh thật nên là |
| --- | --- | --- | --- |
| `/assets/images/bg/breadcrumb-gradient-bg.png` | 1920 × 241 px | components/shared/Breadcrumb.tsx | Hoạ tiết trang trí của template — giữ nguyên được, không cần thay |
| `/assets/images/bg/gradient-bg.png` | 1920 × 708 px | components/layout/Footer.tsx | Hoạ tiết trang trí của template — giữ nguyên được, không cần thay |
| `/assets/images/bg/testimonials-new-bg.png` | 1296 × 509 px | components/home/Testimonials.tsx | Hoạ tiết trang trí của template — giữ nguyên được, không cần thay |
| `/assets/images/icons/ (ghép động)` | — | components/home/GetStarted.tsx | Icon của template — giữ nguyên được |
| `/assets/images/icons/big-arrow-left-right.png` | 162 × 15 px | components/home/BlogSection.tsx | Icon của template — giữ nguyên được |
| `/assets/images/icons/choose-us-new-icon1.png` | 40 × 40 px | components/home/ChooseUs.tsx | Icon của template — giữ nguyên được |
| `/assets/images/icons/choose-us-new-icon2.png` | 40 × 40 px | components/home/ChooseUs.tsx | Icon của template — giữ nguyên được |
| `/assets/images/icons/choose-us-new-icon3.png` | 40 × 40 px | components/home/ChooseUs.tsx | Icon của template — giữ nguyên được |
| `/assets/images/icons/cta-new-icon1.png` | 80 × 62 px | components/home/Cta.tsx | Icon của template — giữ nguyên được |
| `/assets/images/icons/cta-new-icon2.png` | 80 × 80 px | components/home/Cta.tsx | Icon của template — giữ nguyên được |
| `/assets/images/icons/icon-phone.png` | 21 × 21 px | components/layout/Header.tsx | Icon của template — giữ nguyên được |
| `/assets/images/icons/long-arrow-right.png` | 161 × 15 px | components/shared/ServiceSlider.tsx | Icon của template — giữ nguyên được |
| `/assets/images/icons/quate-new-icon.png` | 192 × 142 px | components/shared/TestimonialsSlider.tsx | Icon của template — giữ nguyên được |
| `/assets/images/logo/favicon.png` | 35 × 36 px | app/layout.tsx | Favicon — biểu tượng rút gọn của logo |
| `/assets/images/logo/logo-new-white.png` | 169 × 44 px | components/layout/Footer.tsx | Logo In Ấn Thời Đại bản trắng — dùng trên nền tối ở footer |
| `/assets/images/logo/logo-new.png` | 169 × 44 px | components/layout/Header.tsx | Logo In Ấn Thời Đại (bản màu, nền sáng) — dùng ở header |
| `/assets/images/logo/logo.png` | 167 × 39 px | components/layout/MobileMenu.tsx | Logo In Ấn Thời Đại — dùng ở menu mobile |
| `/assets/images/shapes/badge.png` | 376 × 84 px | components/home/About.tsx | Hoạ tiết trang trí của template — giữ nguyên được, không cần thay |
| `/assets/images/shapes/banner-element-img1.png` | 31 × 33 px | components/home/Banner.tsx | Hoạ tiết trang trí của template — giữ nguyên được, không cần thay |
| `/assets/images/shapes/banner-element-img2.png` | 167 × 137 px | components/home/Banner.tsx | Hoạ tiết trang trí của template — giữ nguyên được, không cần thay |
| `/assets/images/shapes/banner-element-img3.png` | 131 × 142 px | components/home/Banner.tsx | Hoạ tiết trang trí của template — giữ nguyên được, không cần thay |
| `/assets/images/shapes/banner-element-img4.png` | 94 × 82 px | components/home/Banner.tsx<br>components/home/TopCategories.tsx | Hoạ tiết trang trí của template — giữ nguyên được, không cần thay |
| `/assets/images/shapes/banner-element-img5.png` | 65 × 61 px | components/home/Banner.tsx | Hoạ tiết trang trí của template — giữ nguyên được, không cần thay |
| `/assets/images/shapes/banner-element-img6.png` | 89 × 173 px | components/home/Banner.tsx | Hoạ tiết trang trí của template — giữ nguyên được, không cần thay |
| `/assets/images/shapes/banner-element-img7.png` | 65 × 69 px | components/home/Banner.tsx<br>components/layout/Footer.tsx | Hoạ tiết trang trí của template — giữ nguyên được, không cần thay |
| `/assets/images/shapes/boxed-shape.png` | 641 × 343 px | components/home/About.tsx<br>components/home/GetStarted.tsx<br>components/home/TopCategories.tsx | Hoạ tiết trang trí của template — giữ nguyên được, không cần thay |
| `/assets/images/shapes/curve-star-shape.png` | 83 × 93 px | components/home/Cta.tsx<br>components/home/GetStarted.tsx<br>components/home/TopCategories.tsx | Hoạ tiết trang trí của template — giữ nguyên được, không cần thay |
| `/assets/images/shapes/rounded-element.png` | 167 × 54 px | components/home/Banner.tsx | Hoạ tiết trang trí của template — giữ nguyên được, không cần thay |
| `/assets/images/shapes/testimonials-new-shape1.png` | 82 × 84 px | components/home/Cta.tsx<br>components/home/GetStarted.tsx<br>components/layout/Footer.tsx<br>components/shared/TestimonialsSlider.tsx | Hoạ tiết trang trí của template — giữ nguyên được, không cần thay |
| `/assets/images/shapes/testimonials-new-shape2.png` | 77 × 86 px | components/shared/TestimonialsSlider.tsx | Hoạ tiết trang trí của template — giữ nguyên được, không cần thay |
| `/assets/images/shapes/testimonials-new-shape3.png` | 74 × 80 px | components/layout/Footer.tsx<br>components/shared/TestimonialsSlider.tsx | Hoạ tiết trang trí của template — giữ nguyên được, không cần thay |
| `/assets/images/shapes/testimonials-new-shape4.png` | 43 × 40 px | components/shared/TestimonialsSlider.tsx | Hoạ tiết trang trí của template — giữ nguyên được, không cần thay |
| `/assets/images/shapes/user-img.png` | 165 × 68 px | components/home/Banner.tsx | Hoạ tiết trang trí của template — giữ nguyên được, không cần thay |
| `/assets/images/thumbs/ (ghép động)` | — | components/home/TopCategories.tsx | Ảnh thật tương ứng |
| `/assets/images/thumbs/about-new-img1.png` | 526 × 585 px | app/gioi-thieu/page.tsx<br>components/home/About.tsx | Ảnh xưởng sản xuất hoặc tập thể công ty — trang Giới thiệu |
| `/assets/images/thumbs/about-new-img2.png` | 332 × 347 px | components/home/About.tsx | Ảnh thật tương ứng |
| `/assets/images/thumbs/about-new-img3.png` | 393 × 393 px | components/home/About.tsx | Ảnh thật tương ứng |
| `/assets/images/thumbs/banner-all-img.png` | 1888 × 580 px | components/home/Banner.tsx | Ảnh lớn trang chủ: bộ sản phẩm tiêu biểu (hộp giày, hộp nắp gài, thùng COD) chụp cùng bối cảnh |
| `/assets/images/thumbs/blog-details-img.png` | 921 × 431 px | lib/data/seed/posts.json | Ảnh bìa bài viết |
| `/assets/images/thumbs/blog-img1.png` | 404 × 317 px | lib/data/seed/posts.json | Ảnh bìa bài viết |
| `/assets/images/thumbs/blog-img2.png` | 404 × 317 px | lib/data/seed/posts.json | Ảnh bìa bài viết |
| `/assets/images/thumbs/blog-img3.png` | 404 × 317 px | lib/data/seed/posts.json | Ảnh bìa bài viết |
| `/assets/images/thumbs/blog-new-img1.png` | 416 × 306 px | lib/data/seed/posts.json | Ảnh bìa bài viết |
| `/assets/images/thumbs/blog-new-img2.png` | 416 × 306 px | lib/data/seed/posts.json | Ảnh bìa bài viết |
| `/assets/images/thumbs/blog-new-img3.png` | 416 × 306 px | lib/data/seed/posts.json | Ảnh bìa bài viết |
| `/assets/images/thumbs/blog-page-img1.png` | 918 × 435 px | lib/data/seed/posts.json | Ảnh bìa bài viết |
| `/assets/images/thumbs/blog-page-img2.png` | 918 × 435 px | lib/data/seed/posts.json | Ảnh bìa bài viết |
| `/assets/images/thumbs/blog-page-img3.png` | 918 × 435 px | lib/data/seed/posts.json | Ảnh bìa bài viết |
| `/assets/images/thumbs/blog-page-img4.png` | 918 × 435 px | lib/data/seed/posts.json | Ảnh bìa bài viết |
| `/assets/images/thumbs/brand-new-img1.png` | 113 × 32 px | components/home/BrandSlider.tsx | Ảnh thật tương ứng |
| `/assets/images/thumbs/brand-new-img2.png` | 151 × 32 px | components/home/BrandSlider.tsx | Ảnh thật tương ứng |
| `/assets/images/thumbs/brand-new-img3.png` | 128 × 32 px | components/home/BrandSlider.tsx | Ảnh thật tương ứng |
| `/assets/images/thumbs/brand-new-img4.png` | 132 × 32 px | components/home/BrandSlider.tsx | Ảnh thật tương ứng |
| `/assets/images/thumbs/brand-new-img5.png` | 132 × 32 px | components/home/BrandSlider.tsx | Ảnh thật tương ứng |
| `/assets/images/thumbs/brand-new-img6.png` | 110 × 32 px | components/home/BrandSlider.tsx | Ảnh thật tương ứng |
| `/assets/images/thumbs/choose-us-new-img.png` | 636 × 360 px | components/home/ChooseUs.tsx | Ảnh thật tương ứng |
| `/assets/images/thumbs/choose-us-small-img1.png` | 227 × 98 px | components/home/ChooseUs.tsx | Ảnh thật tương ứng |
| `/assets/images/thumbs/choose-us-small-img2.png` | 229 × 122 px | components/home/ChooseUs.tsx | Ảnh thật tương ứng |
| `/assets/images/thumbs/cta-new-img1.png` | 838 × 1273 px | components/home/Cta.tsx | Ảnh thật tương ứng |
| `/assets/images/thumbs/cta-new-img2.png` | 541 × 686 px | components/home/Cta.tsx | Ảnh thật tương ứng |
| `/assets/images/thumbs/home-img1.png` | 1920 × 2571 px | lib/data/seed/categories.json<br>lib/nav-data.ts | Ảnh thật tương ứng |
| `/assets/images/thumbs/home-img2.png` | 1920 × 2800 px | lib/data/seed/categories.json<br>lib/nav-data.ts | Ảnh thật tương ứng |
| `/assets/images/thumbs/home-img3.png` | 1920 × 2068 px | lib/data/seed/categories.json<br>lib/nav-data.ts | Ảnh thật tương ứng |
| `/assets/images/thumbs/home-img4.png` | 1920 × 1755 px | lib/nav-data.ts | Ảnh thật tương ứng |
| `/assets/images/thumbs/service-big-image1.png` | 636 × 400 px | lib/data/seed/services.json | Ảnh minh hoạ công đoạn sản xuất tương ứng (in offset, in flexo, thiết kế, gia công) |
| `/assets/images/thumbs/service-big-image2.png` | 636 × 400 px | lib/data/seed/services.json | Ảnh minh hoạ công đoạn sản xuất tương ứng (in offset, in flexo, thiết kế, gia công) |
| `/assets/images/thumbs/service-big-image3.png` | 636 × 400 px | lib/data/seed/services.json | Ảnh minh hoạ công đoạn sản xuất tương ứng (in offset, in flexo, thiết kế, gia công) |
| `/assets/images/thumbs/service-big-image4.png` | 636 × 400 px | lib/data/seed/services.json | Ảnh minh hoạ công đoạn sản xuất tương ứng (in offset, in flexo, thiết kế, gia công) |
| `/assets/images/thumbs/service-small-image${i + 1}.png` | — | components/shared/ServiceSlider.tsx | Ảnh minh hoạ công đoạn sản xuất tương ứng (in offset, in flexo, thiết kế, gia công) |
| `/assets/images/thumbs/shop-details-thumb1.png` | 653 × 698 px | lib/data/seed/products.json | Ảnh sản phẩm thật (hộp giấy) — xem lưu ý về ảnh sản phẩm ở trên |
| `/assets/images/thumbs/shop-details-thumb2.png` | 654 × 699 px | lib/data/seed/products.json | Ảnh sản phẩm thật (hộp giấy) — xem lưu ý về ảnh sản phẩm ở trên |
| `/assets/images/thumbs/shop-details-thumb3.png` | 654 × 697 px | lib/data/seed/products.json | Ảnh sản phẩm thật (hộp giấy) — xem lưu ý về ảnh sản phẩm ở trên |
| `/assets/images/thumbs/shop-img1.png` | 312 × 379 px | lib/data/seed/products.json | Ảnh sản phẩm thật (hộp giấy) — xem lưu ý về ảnh sản phẩm ở trên |
| `/assets/images/thumbs/shop-img10.png` | 312 × 379 px | lib/data/seed/products.json | Ảnh sản phẩm thật (hộp giấy) — xem lưu ý về ảnh sản phẩm ở trên |
| `/assets/images/thumbs/shop-img11.png` | 312 × 379 px | lib/data/seed/products.json | Ảnh sản phẩm thật (hộp giấy) — xem lưu ý về ảnh sản phẩm ở trên |
| `/assets/images/thumbs/shop-img12.png` | 312 × 379 px | lib/data/seed/products.json | Ảnh sản phẩm thật (hộp giấy) — xem lưu ý về ảnh sản phẩm ở trên |
| `/assets/images/thumbs/shop-img2.png` | 312 × 379 px | lib/data/seed/products.json | Ảnh sản phẩm thật (hộp giấy) — xem lưu ý về ảnh sản phẩm ở trên |
| `/assets/images/thumbs/shop-img3.png` | 312 × 379 px | lib/data/seed/products.json | Ảnh sản phẩm thật (hộp giấy) — xem lưu ý về ảnh sản phẩm ở trên |
| `/assets/images/thumbs/shop-img4.png` | 312 × 379 px | lib/data/seed/products.json | Ảnh sản phẩm thật (hộp giấy) — xem lưu ý về ảnh sản phẩm ở trên |
| `/assets/images/thumbs/shop-img5.png` | 312 × 379 px | lib/data/seed/products.json | Ảnh sản phẩm thật (hộp giấy) — xem lưu ý về ảnh sản phẩm ở trên |
| `/assets/images/thumbs/shop-img6.png` | 312 × 379 px | lib/data/seed/products.json | Ảnh sản phẩm thật (hộp giấy) — xem lưu ý về ảnh sản phẩm ở trên |
| `/assets/images/thumbs/shop-img7.png` | 312 × 379 px | lib/data/seed/products.json | Ảnh sản phẩm thật (hộp giấy) — xem lưu ý về ảnh sản phẩm ở trên |
| `/assets/images/thumbs/shop-img8.png` | 312 × 379 px | lib/data/seed/products.json | Ảnh sản phẩm thật (hộp giấy) — xem lưu ý về ảnh sản phẩm ở trên |
| `/assets/images/thumbs/shop-img9.png` | 312 × 379 px | lib/data/seed/products.json | Ảnh sản phẩm thật (hộp giấy) — xem lưu ý về ảnh sản phẩm ở trên |
| `/assets/images/thumbs/testimonials-new-img1.png` | 535 × 497 px | lib/data/seed/testimonials.json | Ảnh sản phẩm đã giao cho khách, dùng kèm lời đánh giá |
| `/assets/images/thumbs/testimonials-new-img2.png` | 475 × 475 px | lib/data/seed/testimonials.json | Ảnh sản phẩm đã giao cho khách, dùng kèm lời đánh giá |
| `/assets/images/thumbs/testimonials-new-img3.png` | 475 × 475 px | lib/data/seed/testimonials.json | Ảnh sản phẩm đã giao cho khách, dùng kèm lời đánh giá |
| `/assets/images/thumbs/top-categories-new-main-img.png` | 636 × 900 px | components/home/TopCategories.tsx | Ảnh xưởng sản xuất hoặc kho thành phẩm — khối lớn ở mục Sản phẩm trang chủ |

_Sinh tự động bởi `tools/gen-image-guide.mjs` — chạy lại sau khi thêm ảnh mới._
