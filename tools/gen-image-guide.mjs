/**
 * Sinh docs/IMAGE-GUIDE.md: liệt kê mọi ảnh placeholder đang dùng, ở trang nào,
 * kích thước thật bao nhiêu px và ảnh thật nên là gì.
 * Kích thước đọc từ header PNG chứ không phỏng đoán.
 */
import fs from 'node:fs';
import path from 'node:path';

function pngSize(file) {
  const fd = fs.openSync(file, 'r');
  const buf = Buffer.alloc(24);
  fs.readSync(fd, buf, 0, 24, 0);
  fs.closeSync(fd);
  if (buf.toString('ascii', 1, 4) !== 'PNG') return null;
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, acc);
    else if (/\.(tsx|ts|json)$/.test(entry.name)) acc.push(p);
  }
  return acc;
}

// Mô tả ảnh thật nên là gì, theo tên file placeholder
const purpose = {
  'logo/logo-new.png': 'Logo In Ấn Thời Đại (bản màu, nền sáng) — dùng ở header',
  'logo/logo.png': 'Logo In Ấn Thời Đại — dùng ở menu mobile',
  'logo/logo-new-white.png': 'Logo In Ấn Thời Đại bản trắng — dùng trên nền tối ở footer',
  'logo/favicon.png': 'Favicon — biểu tượng rút gọn của logo',
  'thumbs/banner-all-img.png': 'Ảnh lớn trang chủ: bộ sản phẩm tiêu biểu (hộp giày, hộp nắp gài, thùng COD) chụp cùng bối cảnh',
  'thumbs/top-categories-new-main-img.png': 'Ảnh xưởng sản xuất hoặc kho thành phẩm — khối lớn ở mục Sản phẩm trang chủ',
  'thumbs/about-new-img1.png': 'Ảnh xưởng sản xuất hoặc tập thể công ty — trang Giới thiệu',
};

const rows = new Map();
for (const file of walk('src')) {
  const content = fs.readFileSync(file, 'utf8');
  for (const m of content.matchAll(/["'`](\/assets\/images\/[^"'`]+\.(?:png|jpg|jpeg|webp|svg))["'`]/g)) {
    const url = m[1];
    if (!rows.has(url)) rows.set(url, new Set());
    rows.get(url).add(file.replace(/^src\//, ''));
  }
  // đường dẫn ghép động: /assets/images/thumbs/${...}
  for (const m of content.matchAll(/\/assets\/images\/([a-z]+)\/\$\{/g)) {
    const key = `/assets/images/${m[1]}/ (ghép động)`;
    if (!rows.has(key)) rows.set(key, new Set());
    rows.get(key).add(file.replace(/^src\//, ''));
  }
}

const lines = [
  '# Hướng dẫn thay ảnh thật',
  '',
  'Toàn bộ ảnh hiện tại là **ảnh placeholder của template Printop**. Bảng dưới đây liệt kê từng vị trí:',
  'đường dẫn file, dùng ở đâu, kích thước placeholder đang dùng (đọc từ header file, không ước lượng)',
  'và ảnh thật nên chụp/thiết kế thế nào.',
  '',
  '## Cách thay',
  '',
  '1. Chuẩn bị ảnh thật **đúng tỉ lệ** như cột "Kích thước" (số px có thể lớn hơn, miễn giữ tỉ lệ).',
  '2. Ghi đè file cùng tên trong `public/assets/images/...` — không cần sửa code.',
  '3. Nếu muốn đổi tên file, sửa đường dẫn ở các file được liệt kê trong cột "Dùng ở".',
  '4. Nên xuất `.webp` chất lượng 80 để nhẹ hơn `.png`; khi đó phải sửa đuôi file trong code.',
  '',
  '## Lưu ý chung',
  '',
  '- Ảnh sản phẩm: chụp trên nền trắng hoặc xám nhạt đồng nhất, đủ sáng, thấy rõ cạnh hộp và chất giấy.',
  '- Mỗi sản phẩm nên có 4 ảnh: ảnh chính (góc 3/4), ảnh mở nắp, ảnh cận chất liệu, ảnh có sản phẩm bên trong.',
  '- Ảnh bìa bài viết: tỉ lệ ngang, chừa khoảng trống ở góc trên phải vì có khối ngày tháng đè lên.',
  '- Logo: xuất nền trong suốt (PNG hoặc SVG), thêm bản màu trắng để dùng trên nền tối ở footer.',
  '',
  '## Danh sách ảnh',
  '',
  '| Đường dẫn file | Kích thước placeholder | Dùng ở | Ảnh thật nên là |',
  '| --- | --- | --- | --- |',
];

for (const [url, files] of [...rows.entries()].sort()) {
  const local = 'public' + url;
  let size = '—';
  if (fs.existsSync(local) && local.endsWith('.png')) {
    const s = pngSize(local);
    if (s) size = `${s.w} × ${s.h} px`;
  }
  const key = url.replace('/assets/images/', '');
  const note = purpose[key] ?? (
    key.startsWith('shapes/') || key.startsWith('bg/') ? 'Hoạ tiết trang trí của template — giữ nguyên được, không cần thay' :
    key.startsWith('icons/') ? 'Icon của template — giữ nguyên được' :
    key.includes('shop-') ? 'Ảnh sản phẩm thật (hộp giấy) — xem lưu ý về ảnh sản phẩm ở trên' :
    key.includes('blog') ? 'Ảnh bìa bài viết' :
    key.includes('testimonials') ? 'Ảnh sản phẩm đã giao cho khách, dùng kèm lời đánh giá' :
    key.includes('service') ? 'Ảnh minh hoạ công đoạn sản xuất tương ứng (in offset, in flexo, thiết kế, gia công)' :
    key.includes('top-categories') ? 'Ảnh đại diện nhóm sản phẩm' :
    key.includes('product-card') ? 'Ảnh sản phẩm dùng trong dải ảnh chạy ngang ở trang chủ' :
    'Ảnh thật tương ứng'
  );
  lines.push(`| \`${url}\` | ${size} | ${[...files].join('<br>')} | ${note} |`);
}

lines.push('', `_Sinh tự động bởi \`tools/gen-image-guide.mjs\` — chạy lại sau khi thêm ảnh mới._`);
fs.writeFileSync('docs/IMAGE-GUIDE.md', lines.join('\n') + '\n');
console.log(`docs/IMAGE-GUIDE.md: ${rows.size} vị trí ảnh`);
