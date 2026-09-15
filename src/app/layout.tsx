import type { Metadata } from 'next';

// Thứ tự nạp CSS giữ đúng như index.html của template Printop.
import '@/styles/bootstrap.min.css';
import '@/styles/aos.css';
import '@/styles/swiper-bundle.min.css';
import '@/styles/magnific-popup.css';
import '@/styles/main.css';
import '@/styles/brand.css';

import { site } from '@/lib/site';
import Header from '@/components/layout/Header';
import MobileMenu from '@/components/layout/MobileMenu';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/layout/Preloader';
import ScrollToTop from '@/components/layout/ScrollToTop';
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="home-style-gradient font-size-style-new">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Font của template + Be Vietnam Pro làm lớp dự phòng phủ đủ dấu tiếng Việt */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Gabarito:wght@400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap"
        />
        {/* Phosphor Icons (MIT) — chỉ nạp 3 weight mà template thực sự dùng: regular, bold, fill */}
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

          <div className="cursor" />
          <span className="dot" />
          <div id="magic-cursor" className="cursor-white-bg">
            <div id="ball" />
          </div>

          <div className="blur-bottom-shadow tw-duration-300" />

          <MobileMenu />

          {/* ScrollSmoother của template bọc toàn bộ phần cuộn được: header, nội dung, footer */}
          <div id="smooth-wrapper">
            <div id="smooth-content">
              <Header />
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
