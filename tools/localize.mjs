/**
 * Việt hoá các section tĩnh sinh từ template. Thay theo cụm chữ, chấp nhận mọi
 * kiểu xuống dòng/thụt lề, và BẮT LỖI nếu không tìm thấy cụm cần thay — để
 * không im lặng bỏ sót chữ tiếng Anh nào.
 */
import fs from 'node:fs';

const phrase = (t) =>
  new RegExp(t.trim().split(/\s+/).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s+'), 'g');

export function localize(file, pairs, extra = (c) => c) {
  let c = fs.readFileSync(file, 'utf8');
  for (const [from, to] of pairs) {
    const re = phrase(from);
    if (!re.test(c)) {
      // Chạy lại lần hai: nếu bản dịch đã có sẵn thì bỏ qua, script an toàn khi lặp
      const done = phrase(to.replace(/^>|<$/g, ''));
      if (done.test(c)) continue;
      throw new Error(`${file}: không tìm thấy "${from.slice(0, 50)}"`);
    }
    re.lastIndex = 0;
    c = c.replace(re, to);
  }
  c = extra(c);
  fs.writeFileSync(file, c);
  console.log(`✓ ${file}`);
}

export function checkNoEnglish(file, allow = []) {
  const c = fs.readFileSync(file, 'utf8');
  const text = c.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
  const suspects = (text.match(/\b[A-Z][a-z]{3,}(?: [A-Z][a-z]{3,})*\b/g) ?? [])
    .filter((s) => !allow.includes(s));
  return [...new Set(suspects)];
}
