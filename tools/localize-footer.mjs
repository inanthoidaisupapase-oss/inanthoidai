/** Việt hoá FooterRaw.tsx (sinh từ template) -> Footer.tsx. Giữ nguyên toàn bộ class. */
import fs from 'node:fs';

let c = fs.readFileSync('src/components/layout/FooterRaw.tsx', 'utf8');

/** Tạo regex khớp một cụm chữ, chấp nhận mọi kiểu xuống dòng/thụt lề giữa các từ */
const phrase = (text) =>
  new RegExp(text.trim().split(/\s+/).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s+'), 'g');

const reps = [
  [phrase("Subscribe Our Newsletter to Get Our Latest Update & News"),
   'Đăng ký nhận bản tin để cập nhật mẫu bao bì và ưu đãi mới nhất'],
  [phrase('placeholder="Email address"'), 'placeholder="Địa chỉ email của bạn"'],
  [phrase(`The smartest platform to discover authentic influencers, launch viral campaigns, and scale your brand's reach globally.`),
   '{site.legalName} — hơn 15 năm thiết kế, in ấn và sản xuất bao bì giấy: hộp giấy, túi xách giấy, hộp giày, thùng carton, tem nhãn decal và ấn phẩm văn phòng.'],
  [phrase('>Quick Link<'), '>Liên kết nhanh<'],
  [phrase('>More Link<'), '>Thông tin khác<'],
  [phrase('>Send Us Email<'), '>Gửi email cho chúng tôi<'],
  [phrase('href="mailto:demoinfo@gmail.com"'), 'href={`mailto:${site.email}`}'],
  [phrase('>demoinfo@gmail.com<'), '>{site.email}<'],
  [phrase('>Looking For Project<'), '>Hotline tư vấn &amp; báo giá<'],
  [phrase('href="tel:(302)555-0107"'), 'href={`tel:${site.hotlineTel}`}'],
  [phrase('(302) 555-0107'), '{site.hotline}'],
  [phrase('>Visit Our Location<'), '>Văn phòng giao dịch<'],
  [phrase('1901 Thornridge Cir. Hawaii 54126'), '{site.office}'],
  [phrase('Copyright &copy; 2026'), 'Bản quyền &copy; {new Date().getFullYear()}'],
  [phrase('>Printop<'), '>{site.legalName}<'],
  [phrase('All rights reserved.'), 'Đã đăng ký bản quyền.'],
  [phrase('alt="Logo"'), 'alt={site.name}'],
  [phrase('alt="Gradient BG"'), 'alt=""'],
  [phrase('alt="Element Shape"'), 'alt=""'],
];

for (const [re, to] of reps) {
  if (!re.test(c)) throw new Error(`Không tìm thấy: ${re.source.slice(0, 70)}`);
  re.lastIndex = 0;
  c = c.replace(re, to);
}

const labels = new Map([
  ['Home', ['Trang chủ', '/']],
  ['About Us', ['Giới thiệu', '/gioi-thieu']],
  ['Services', ['Dịch vụ', '/dich-vu']],
  ['Shop', ['Sản phẩm', '/san-pham']],
  ['Blog', ['Tin tức', '/tin-tuc']],
  ['FAQs', ['Câu hỏi thường gặp', '/cau-hoi-thuong-gap']],
  ['Privacy Policy', ['Chính sách bảo mật', '/chinh-sach-bao-mat']],
  ["How It's Work", ['Quy trình làm việc', '/quy-trinh-lam-viec']],
  ['Contact Us', ['Liên hệ', '/lien-he']],
  ['Supports', ['Bảng giá', '/bang-gia']],
]);

let replaced = 0;
c = c.replace(/<a href="javascript:void\(0\)"([^>]*)>([\s\S]*?)<\/a>/g, (m, attrs, text) => {
  const key = text.trim().replace(/\s+/g, ' ');
  const hit = labels.get(key);
  if (!hit) return m;
  replaced++;
  return `<Link href="${hit[1]}"${attrs}>${hit[0]}</Link>`;
});
if (replaced !== labels.size) throw new Error(`Chỉ thay được ${replaced}/${labels.size} link footer`);

// Ảnh logo thanh toán không còn ý nghĩa (site không thanh toán online) -> thay bằng
// dòng thông tin xưởng sản xuất, giữ nguyên bộ class của khối.
c = c.replace(
  /<img src="\/assets\/images\/thumbs\/payment-logos\.png" alt="Payment Logos" \/>/,
  '<span className="text-neutral-300 fw-normal">Xưởng sản xuất: {site.factory}</span>',
);

c = c.replace('<form action="#"', '<form action="/lien-he"');
c = c
  .replace('export default function FooterRaw()', 'export default function Footer()')
  .replace("import Link from 'next/link';", "import Link from 'next/link';\nimport { site } from '@/lib/site';");

fs.writeFileSync('src/components/layout/Footer.tsx', c);
fs.unlinkSync('src/components/layout/FooterRaw.tsx');
console.log('Footer.tsx OK');
