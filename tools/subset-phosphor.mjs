/**
 * Cắt (subset) 3 font icon Phosphor (regular/bold/fill, ~145 KB mỗi file) xuống chỉ còn các
 * glyph site đang dùng (~7 KB mỗi file) — tối ưu PageSpeed: 3 font này được preload trước
 * first paint nên chiếm băng thông của LCP trên mạng di động chậm.
 *
 * KHÔNG làm vỡ icon mới: style.css giữ nguyên @font-face bản đầy đủ, script chỉ chèn thêm
 * một @font-face CÙNG TÊN cho bản subset ngay sau đó, kèm unicode-range đúng các glyph đã
 * cắt. Trình duyệt ưu tiên face khai báo sau cho ký tự nằm trong unicode-range của nó, và chỉ
 * tải bản đầy đủ khi trang có icon ngoài danh sách (vd icon mới nhập vào cột services.icon
 * trong Supabase Studio). Thêm icon mới vào code thì chạy lại script này để vẫn nhanh.
 *
 * Chạy:  npm i --no-save subset-font && node tools/subset-phosphor.mjs
 * (subset-font chỉ cần lúc chạy script, không thêm vào package.json.)
 */
import fs from 'node:fs';
import path from 'node:path';

let subsetFont;
try {
  subsetFont = (await import('subset-font')).default;
} catch {
  console.error('Thiếu gói subset-font. Chạy: npm i --no-save subset-font');
  process.exit(1);
}

const DIR = 'public/assets/vendor/phosphor';
const WEIGHTS = [
  ['regular', 'Phosphor'],
  ['bold', 'Phosphor-Bold'],
  ['fill', 'Phosphor-Fill'],
];
// Glyph CSS gọi thẳng bằng content: "\e..." (không qua class ph-*) — lấy tự động từ main.css
// và brand.css: mũi tên accordion, dấu check checkbox, caret submenu, scroll-to-top...
const CSS_CODEPOINTS = ['src/styles/main.css', 'src/styles/brand.css'].flatMap((f) =>
  [...fs.readFileSync(f, 'utf8').matchAll(/content:\s*["']\\(e[0-9a-f]{3})["']/gi)].map((m) => m[1]),
);
const START = '/* subset:start — sinh bởi tools/subset-phosphor.mjs, đừng sửa tay */';
const END = '/* subset:end */';

// Tên icon (ph-xxx) xuất hiện trong code, seed dữ liệu và SQL seed
const SCAN = ['src', 'supabase', 'public/assets/js/custom-gsap.js'];
const names = new Set();
const walk = (p) => {
  const st = fs.statSync(p);
  if (st.isDirectory()) return fs.readdirSync(p).forEach((f) => walk(path.join(p, f)));
  if (!/\.(tsx?|jsx?|mjs|json|sql|css)$/.test(p)) return;
  for (const m of fs.readFileSync(p, 'utf8').matchAll(/\bph-[a-z0-9]+(?:-[a-z0-9]+)*/g)) names.add(m[0]);
};
SCAN.forEach(walk);

for (const [weight, file] of WEIGHTS) {
  const cssPath = path.join(DIR, weight, 'style.css');
  let css = fs.readFileSync(cssPath, 'utf8');
  css = css.replace(new RegExp(`\\n?${START.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}[\\s\\S]*?${END.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}\\n?`), '\n');

  const cps = new Set(CSS_CODEPOINTS.map((h) => parseInt(h, 16)));
  for (const n of names) {
    const m = css.match(new RegExp(`\\.${n}:before\\s*\\{\\s*content:\\s*"\\\\([0-9a-f]+)"`));
    if (m) cps.add(parseInt(m[1], 16));
  }
  const sorted = [...cps].sort((a, b) => a - b);
  const full = fs.readFileSync(path.join(DIR, weight, `${file}.woff2`));
  const sub = await subsetFont(full, String.fromCodePoint(...sorted), { targetFormat: 'woff2' });
  fs.writeFileSync(path.join(DIR, weight, `${file}.subset.woff2`), sub);

  const range = sorted.map((c) => `U+${c.toString(16).toUpperCase()}`).join(',');
  const block = `${START}
@font-face {
  font-family: "${file}";
  src: url("./${file}.subset.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
  font-display: block;
  unicode-range: ${range};
}
${END}
`;
  // chèn ngay sau @font-face đầu tiên (bản đầy đủ) để bản subset được ưu tiên
  const end = css.indexOf('}', css.indexOf('@font-face')) + 1;
  css = css.slice(0, end) + '\n' + block + css.slice(end).replace(/^\n+/, '');
  fs.writeFileSync(cssPath, css);
  console.log(`${weight}: ${sorted.length} glyph, ${(full.length / 1024).toFixed(0)} KB -> ${(sub.length / 1024).toFixed(1)} KB`);
}
