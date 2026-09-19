/** Định dạng tiền VND thống nhất toàn site. Dùng được ở cả server và client component. */
export function formatVnd(value: number): string {
  return value.toLocaleString('vi-VN') + ' ₫';
}

/** Ngày dạng dd/mm/yyyy */
export function formatDateVi(iso: string): string {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

/** Tên chuyên mục -> hashtag: "Hoạt động - Sự kiện" -> "#Hoạt_động_Sự_kiện" */
export function toHashtag(category: string): string {
  return '#' + category.trim().replace(/\s*-\s*/g, '_').replace(/\s+/g, '_');
}
