import type { NextConfig } from "next";

// Header bảo mật cơ bản (Lighthouse Best Practices khuyến nghị, không tính điểm). KHÔNG bật
// CSP đầy đủ: template có script inline (đổi media fonts.css trong layout.tsx) và nạp vendor JS — CSP chặt
// cần test kỹ từng trang. Chỉ dùng frame-ancestors để chống clickjacking (site khác nhúng site
// này qua iframe); site nhúng YouTube/Google Maps vẫn chạy vì đó là chiều ngược lại.
const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
