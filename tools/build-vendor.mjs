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
 * khỏi bundle giảm ~40KB JS phải parse/execute trên MỌI trang).
 */
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'public/assets/js';
const ORDER = [
  'jquery-3.7.1.min.js',
  'gsap-plugin.js',
  'boostrap.bundle.min.js',
  'aos.js',
  'jquery.marquee.min.js',
  'typed.min.js',
  'custom-gsap.js',
];

let out = '/* Printop vendor bundle — sinh tự động bởi tools/build-vendor.mjs. Đừng sửa tay. */\n';
for (const f of ORDER) {
  const p = path.join(DIR, f);
  if (!fs.existsSync(p)) throw new Error(`Thiếu file vendor: ${p}`);
  out += `\n/* ===== ${f} ===== */\n` + fs.readFileSync(p, 'utf8') + '\n;\n';
}
fs.writeFileSync(path.join(DIR, 'vendor.bundle.js'), out);
console.log(`vendor.bundle.js: ${(out.length / 1024).toFixed(0)} KB từ ${ORDER.length} file`);
