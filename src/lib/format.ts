/** Định dạng tiền VND thống nhất toàn site. Dùng được ở cả server và client component. */
export function formatVnd(value: number): string {
  return value.toLocaleString('vi-VN') + ' ₫';
}

/** Ngày dạng dd/mm/yyyy */
export function formatDateVi(iso: string): string {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

/** Ngày/tháng cho khối badge nhỏ (bài trước/sau) — "09" + "Th01", không dùng viết tắt tiếng Anh (JAN) như bản gốc */
export function formatDayMonth(iso: string): { day: string; month: string } {
  const d = new Date(iso);
  return {
    day: String(d.getDate()).padStart(2, '0'),
    month: `Th${String(d.getMonth() + 1).padStart(2, '0')}`,
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
