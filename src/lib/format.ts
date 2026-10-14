/** Định dạng tiền VND thống nhất toàn site. Dùng được ở cả server và client component. */
export function formatVnd(value: number): string {
  return value.toLocaleString('vi-VN') + ' ₫';
}

/**
 * Tách năm/tháng/ngày từ chuỗi ngày (posts.published_at kiểu `date` -> "YYYY-MM-DD") mà KHÔNG
 * qua new Date(): new Date("2026-03-30") là nửa đêm UTC, getDate()/getMonth() lại đọc theo múi
 * giờ máy đang chạy -> server (Vercel, UTC) và trình duyệt ở múi giờ âm (vd Mỹ) ra ngày khác
 * nhau -> React hydration error #418 trên PageSpeed Insights. Đọc thẳng từ chuỗi nên mọi nơi
 * cho cùng một kết quả.
 */
export function dateParts(iso: string): { year: number; month: number; day: number } {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (m) return { year: +m[1], month: +m[2], day: +m[3] };
  // Không đúng dạng ngày ISO: quy về giờ Việt Nam để server/client vẫn thống nhất
  const [y, mo, d] = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit' })
    .format(new Date(iso))
    .split('-');
  return { year: +y, month: +mo, day: +d };
}

/** Ngày dạng dd/mm/yyyy */
export function formatDateVi(iso: string): string {
  const { year, month, day } = dateParts(iso);
  return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
}

/** Ngày/tháng cho khối badge nhỏ (bài trước/sau) — "09" + "Th01", không dùng viết tắt tiếng Anh (JAN) như bản gốc */
export function formatDayMonth(iso: string): { day: string; month: string } {
  const { month, day } = dateParts(iso);
  return {
    day: String(day).padStart(2, '0'),
    month: `Th${String(month).padStart(2, '0')}`,
  };
}

/** Tên chuyên mục -> hashtag: "Hoạt động - Sự kiện" -> "#Hoạt_động_Sự_kiện" */
export function toHashtag(category: string): string {
  return '#' + category.trim().replace(/\s*-\s*/g, '_').replace(/\s+/g, '_');
}

/** Bỏ dấu tiếng Việt để tìm kiếm không phụ thuộc dấu. Chạy được cả server lẫn client. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd');
}
