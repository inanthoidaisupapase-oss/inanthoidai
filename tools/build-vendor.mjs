/**
 * Gộp các file JS vendor của template Printop thành 1 bundle, ĐÚNG THỨ TỰ nạp
 * như trong index.html gốc. Gộp để đảm bảo thứ tự thực thi (custom-gsap.js phụ
 * thuộc jQuery + GSAP), đồng thời giảm số request.
 *
 * KHÔNG gộp: swiper-bundle (thay bằng swiper/react), counterup (thay bằng
 * requestAnimationFrame trong src/lib/template-behaviors.ts), main.js (thay
 * bằng React + template-behaviors.ts), count-down.js (toàn bộ đã bị comment),
 * magnific-popup.min.js (plugin jQuery .magnificPopup() không còn được gọi ở
 * đâu — VideoPopup.tsx là component React tự viết, chỉ tái dùng class CSS
 * mfp-bg/mfp-wrap/... của magnific-popup.css, không cần JS plugin gốc; xoá
 * khỏi bundle giảm ~40KB JS phải parse/execute trên MỌI trang),
 * boostrap.bundle.min.js (không còn data-bs-* hay lời gọi bootstrap.* nào —
 * tab/accordion/dropdown/offcanvas đều đã là component React; 80KB),
 * jquery.marquee.min.js (không có lời gọi .marquee() nào — marquee logo chạy
 * bằng CSS animation, xem brand.css; 9KB).
 */
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'public/assets/js';
const ORDER = [
  'jquery-3.7.1.min.js',
  'gsap-plugin.js',
  'aos.js',
  'typed.min.js',
  'custom-gsap.js',
];

let out = '/* Printop vendor bundle — sinh tự động bởi tools/build-vendor.mjs. Đừng sửa tay. */\n';
for (const f of ORDER) {
  const p = path.join(DIR, f);
  if (!fs.existsSync(p)) throw new Error(`Thiếu file vendor: ${p}`);
  // Bỏ comment sourceMappingURL: các file .map không được copy vào public (vd typed.min.js.map
  // trả về trang 404 HTML) -> Lighthouse Best Practices báo "valid-source-maps" lỗi JSON.
  const src = fs.readFileSync(p, 'utf8').replace(/^\/\/# sourceMappingURL=.*$/gm, '');
  out += `\n/* ===== ${f} ===== */\n` + src + '\n;\n';
}
fs.writeFileSync(path.join(DIR, 'vendor.bundle.js'), out);
console.log(`vendor.bundle.js: ${(out.length / 1024).toFixed(0)} KB từ ${ORDER.length} file`);
