import type { Metadata } from 'next';

// Thứ tự nạp CSS giữ đúng như index.html của template Printop. ĐÃ THỬ tách
// swiper-bundle.min.css/magnific-popup.css ra load riêng theo từng trang dùng
// Swiper/VideoPopup, nhưng revert: brand.css ghi đè `.mfp-wrap{z-index:...}`
// dựa vào thứ tự nạp SAU magnific-popup.css (cùng specificity, ai nạp sau
// thắng) — tách CSS này vào component con sẽ đảo thứ tự trong bundle CSS của
// Next.js (ancestor layout.tsx nạp trước descendant), phá z-index popup. Rủi
// ro tương tự áp dụng cho swiper-bundle.css (nhiều rule .swiper-slide cùng
// specificity giữa main.css/brand.css và swiper-bundle.css). Môi trường build
// không có trình duyệt để kiểm chứng bằng mắt nên giữ nguyên nạp global.
import '@/styles/bootstrap.min.css';
import '@/styles/aos.css';
import '@/styles/swiper-bundle.min.css';
import '@/styles/magnific-popup.css';
import '@/styles/main.css';
import '@/styles/brand.css';

import { site } from '@/lib/site';
import Header from '@/components/layout/Header';
import HeaderNav from '@/components/layout/HeaderNav';
import MobileMenu from '@/components/layout/MobileMenu';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/layout/Preloader';
import ScrollToTop from '@/components/layout/ScrollToTop';
import FloatingContact from '@/components/layout/FloatingContact';
import TemplateRuntime from '@/components/layout/TemplateRuntime';
import { CartProvider } from '@/lib/cart/CartContext';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    'in ấn', 'hộp giấy', 'thùng carton', 'hộp giày', 'túi xách giấy',
    'tem nhãn decal', 'in offset', 'in flexo', 'bao bì giấy', 'in ấn TP HCM',
  ],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  robots: { index: true, follow: true },
  icons: { icon: '/assets/images/logo/favicon.png' },
};

// Font của template + Be Vietnam Pro làm lớp dự phòng phủ đủ dấu tiếng Việt.
const GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Gabarito:wght@400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap';

// Kỹ thuật loadCSS (Filament Group): nạp CSS font với media="print" (không chặn
// render màn hình) rồi đổi media="all" khi tải xong qua thuộc tính onload thuần
// HTML — không dùng next/font/google (build shell không ra được
// fonts.googleapis.com, xem CLAUDE.md), chỉ đổi CÁCH nạp cùng 1 URL <link> có
// sẵn để nó không còn chặn render nữa. `display=swap` trong URL đã có sẵn nên
// chữ hiện ngay bằng font dự phòng, đổi sang webfont khi tải xong, không FOIT.
const asyncFontStylesheetProps = {
  media: 'print',
  onload: "this.media='all'",
} as unknown as React.LinkHTMLAttributes<HTMLLinkElement>;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="home-style-gradient font-size-style-new" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://unpkg.com" />
        <link rel="preload" as="style" href={GOOGLE_FONTS_HREF} />
        <link rel="stylesheet" href={GOOGLE_FONTS_HREF} {...asyncFontStylesheetProps} />
        <noscript>
          <link rel="stylesheet" href={GOOGLE_FONTS_HREF} />
        </noscript>
        {/* Phosphor Icons (MIT) — chỉ nạp 3 weight mà template thực sự dùng: regular, bold, fill.
            Icon xuất hiện dày đặc ngay trong header/nav phía trên màn hình đầu tiên nên GIỮ nạp
            chặn render như cũ (không áp kỹ thuật media=print ở trên) — tránh nháy icon rỗng/tofu
            lúc mới vào trang, ưu tiên đúng giao diện hơn tốc độ ở phần này. */}
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css" />
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css" />
      </head>
      <body className="tp-magic-cursor">
        <CartProvider>
          <Preloader />

          <div className="overlay" />
          <div className="side-overlay" />
          <div id="toast-container" />

          <ScrollToTop />
          <FloatingContact />

          <div className="cursor" />
          <span className="dot" />
          <div id="magic-cursor" className="cursor-white-bg">
            <div id="ball" />
          </div>

          <div className="blur-bottom-shadow tw-duration-300" />

          <MobileMenu />

          {/*
            Cả Header (top-header-new + middle-header) và HeaderNav (class .header, toggle
            .fixed-header khi scroll) đặt NGOÀI #smooth-wrapper, THEO ĐÚNG THỨ TỰ HIỂN THỊ:
            Header trước, HeaderNav sau — xem comment chi tiết trong HeaderNav.tsx. Lý do
            phải đặt ngoài: custom-gsap.js áp transform lên #smooth-content để giả lập cuộn
            mượt, mà transform trên ancestor phá vỡ containing block của position:
            fixed/sticky (CSS spec) — HeaderNav lồng bên trong sẽ kẹt theo nội dung thay vì
            dính lên viewport. Thứ tự Header rồi mới đến HeaderNav (không gộp chung 1 wrapper)
            quan trọng: HeaderNav cần <body> (ancestor cao bằng cả trang) làm containing
            block cho sticky — nếu bọc chung 1 div ngắn với Header (~220px) thì div đó cuộn
            khỏi viewport trước khi tới ngưỡng scrollY >= 260, kéo HeaderNav biến mất theo
            thay vì dính được. headerOffset() trong template-behaviors.ts bù padding-top cho
            #smooth-content bằng tổng chiều cao Header + HeaderNav đo được.
          */}
          <Header />
          <HeaderNav />

          <div id="smooth-wrapper">
            <div id="smooth-content">
              {children}
              <Footer />
            </div>
          </div>
          <TemplateRuntime />
        </CartProvider>
      </body>
    </html>
  );
}
