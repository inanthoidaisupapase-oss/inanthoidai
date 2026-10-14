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
import '@/styles/fonts-critical.css';

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

// Font của template + Be Vietnam Pro làm lớp dự phòng phủ đủ dấu tiếng Việt — TỰ HOST tại
// /assets/vendor/fonts (file woff2 lấy từ gói npm @fontsource* 5.3.0, cùng bản Google Fonts
// phục vụ; giấy phép SIL OFL). Bỏ được 2 kết nối fonts.googleapis.com/fonts.gstatic.com.
// Không dùng next/font/google (build shell không ra được fonts.googleapis.com, xem CLAUDE.md).
//
// Cách nạp (đã đo bằng Lighthouse mobile + desktop, xem commit "Desktop bước 4"):
// - 5 face kiểu thường của 2 font chính (DM Sans, Plus Jakarta Sans; latin/latin-ext/vietnamese)
//   khai báo trong src/styles/fonts-critical.css (CSS nạp chặn render) + preload 2 file latin
//   (CRITICAL_FONTS): chữ hiện đúng font từ lần vẽ đầu, không đổi font sau khi hero đã hiện
//   (trước đây gây layout shift CLS 0,016-0,03 trên desktop).
// - Các face còn lại (italic, Gabarito, Be Vietnam Pro, cyrillic) trong fonts.css, nạp không chặn
//   render theo kỹ thuật loadCSS: media="print" rồi đổi "all" bằng script inline ngay sau <link>
//   (FONTS_SWAP_JS) — chạy lúc parse HTML, không chờ React hydrate. React không chạy chuỗi
//   onload="..." nên dùng <script> riêng; link có suppressHydrationWarning vì thuộc tính media bị
//   script đổi có chủ đích trước khi hydrate.
// - KHÔNG đưa toàn bộ fonts.css vào CSS chặn render: đã thử, FCP mobile 1,8s -> 2,9s.
// font-display: swap nên chữ không bao giờ bị ẩn chờ font.
const FONTS_HREF = '/assets/vendor/fonts/fonts.css';
// Preload 2 file latin của web font chính (@font-face nằm trong src/styles/fonts-critical.css).
// Đã đo (Lighthouse, 3 lần/phương án): preload thêm latin-ext/vietnamese làm TBT desktop tăng
// ~210 -> ~300 ms (font ưu tiên cao chen băng thông lúc hydrate); không preload gì thì đổi font
// muộn -> layout shift. 2 file latin là điểm cân bằng tốt nhất.
const CRITICAL_FONTS = ['plus-jakarta-sans-latin-wght-normal.woff2', 'dm-sans-latin-opsz-normal.woff2'];
const FONTS_SWAP_JS =
  "(function(l){if(!l)return;var a=function(){l.media='all'};if(l.sheet)a();else l.addEventListener('load',a)})(document.getElementById('webfonts-css'))";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="home-style-gradient font-size-style-new" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {CRITICAL_FONTS.map((f) => (
          <link key={f} rel="preload" as="font" type="font/woff2" crossOrigin="" href={`/assets/vendor/fonts/${f}`} />
        ))}
        <link id="webfonts-css" rel="stylesheet" href={FONTS_HREF} media="print" suppressHydrationWarning />
        <script dangerouslySetInnerHTML={{ __html: FONTS_SWAP_JS }} />
        <noscript>
          <link rel="stylesheet" href={FONTS_HREF} />
        </noscript>
        {/* Phosphor Icons (MIT) 2.1.1 — self-host tại /assets/vendor/phosphor (bản npm
            @phosphor-icons/web@2.1.1, nội dung y hệt bản unpkg trước đây) để bỏ kết nối tới unpkg.com
            và chuỗi request CSS→font bắc qua origin thứ 3. Chỉ nạp 3 weight template dùng: regular,
            bold, fill. Icon dày đặc ngay trên màn hình đầu và font-display: block nên VẪN nạp chặn
            render như cũ + preload 3 file woff2 (cùng origin) để font về song song với CSS.
            Preload bản *.subset.woff2 (~7 KB, chỉ các icon site dùng — sinh bởi
            tools/subset-phosphor.mjs) thay vì bản đầy đủ ~145 KB; bản đầy đủ vẫn khai báo
            trong style.css làm dự phòng, chỉ tải khi trang có icon ngoài subset. */}
        <link rel="preload" as="font" type="font/woff2" crossOrigin="" href="/assets/vendor/phosphor/regular/Phosphor.subset.woff2" />
        <link rel="preload" as="font" type="font/woff2" crossOrigin="" href="/assets/vendor/phosphor/bold/Phosphor-Bold.subset.woff2" />
        <link rel="preload" as="font" type="font/woff2" crossOrigin="" href="/assets/vendor/phosphor/fill/Phosphor-Fill.subset.woff2" />
        <link rel="stylesheet" href="/assets/vendor/phosphor/regular/style.css" />
        <link rel="stylesheet" href="/assets/vendor/phosphor/bold/style.css" />
        <link rel="stylesheet" href="/assets/vendor/phosphor/fill/style.css" />
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
