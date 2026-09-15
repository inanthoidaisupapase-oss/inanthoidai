import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Trả về Supabase client nếu đã cấu hình biến môi trường, ngược lại trả null.
 *
 * Toàn bộ tầng dữ liệu được thiết kế để chạy được khi KHÔNG có Supabase
 * (đọc seed tĩnh trong src/lib/data/seed). Nhờ vậy `npm run build` chạy được ở
 * môi trường không ra được supabase.co, và việc bật/tắt Supabase không đụng
 * tới một dòng giao diện nào.
 */
let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  cached = url && key ? createClient(url, key) : null;
  return cached;
}

export function isSupabaseEnabled(): boolean {
  return getSupabase() !== null;
}
