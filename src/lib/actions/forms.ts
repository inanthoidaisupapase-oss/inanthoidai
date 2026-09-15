'use server';

import { headers } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { site } from '@/lib/site';

export type FormState = { ok: boolean; message: string; fieldErrors?: Record<string, string> };

/* --------------------------- Chống spam đơn giản --------------------------- */
// Giới hạn theo IP, lưu trong bộ nhớ tiến trình. Đủ cho lưu lượng của site này;
// nếu chạy nhiều instance trên Vercel thì mỗi instance có bộ đếm riêng — khi cần
// chặt hơn thì chuyển sang đếm trong Supabase hoặc Cloudflare Turnstile.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

async function rateLimited(): Promise<boolean> {
  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

/* ------------------------------- Kiểm tra ---------------------------------- */

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
// Số điện thoại Việt Nam: 10 số bắt đầu bằng 0, hoặc dạng +84
const isPhone = (v: string) => /^(0\d{9}|\+84\d{9})$/.test(v.replace(/[\s.\-()]/g, ''));
const str = (fd: FormData, key: string) => String(fd.get(key) ?? '').trim();

/* ------------------------------ Ghi dữ liệu -------------------------------- */

function serverSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key ? createClient(url, key) : null;
}

async function sendNotification(subject: string, lines: string[]) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.NOTIFY_TO ?? site.email;
  if (!apiKey || !from) {
    console.info('[form] Chưa cấu hình Resend, bỏ qua gửi email. Nội dung:', subject, lines);
    return;
  }
  try {
    const { Resend } = await import('resend');
    await new Resend(apiKey).emails.send({
      from,
      to,
      subject,
      text: lines.join('\n'),
    });
  } catch (err) {
    // Không để lỗi gửi mail làm hỏng trải nghiệm người dùng — dữ liệu đã lưu DB.
    console.error('[form] Gửi email thất bại:', err);
  }
}

/* ------------------------------ Form liên hệ ------------------------------- */

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  // Bẫy bot: trường ẩn, người thật không bao giờ điền
  if (str(formData, 'website')) return { ok: true, message: 'Đã gửi. Cảm ơn bạn!' };
  if (await rateLimited()) {
    return { ok: false, message: 'Bạn đã gửi quá nhiều lần. Vui lòng thử lại sau ít phút hoặc gọi ' + site.hotline };
  }

  const fullName = str(formData, 'full_name');
  const email = str(formData, 'email');
  const subject = str(formData, 'subject');
  const message = str(formData, 'message');

  const fieldErrors: Record<string, string> = {};
  if (fullName.length < 2) fieldErrors.full_name = 'Vui lòng nhập họ tên';
  if (!isEmail(email)) fieldErrors.email = 'Email chưa đúng định dạng';
  if (message.length < 10) fieldErrors.message = 'Nội dung cần ít nhất 10 ký tự';
  if (Object.keys(fieldErrors).length) {
    return { ok: false, message: 'Vui lòng kiểm tra lại thông tin.', fieldErrors };
  }

  const sb = serverSupabase();
  if (sb) {
    const { error } = await sb.from('contact_messages').insert({
      full_name: fullName, email, subject: subject || null, message,
    });
    if (error) {
      console.error('[form] Lưu contact_messages thất bại:', error.message);
      return { ok: false, message: 'Hệ thống đang bận. Vui lòng gọi ' + site.hotline + ' để được hỗ trợ ngay.' };
    }
  } else {
    console.info('[form] Chưa cấu hình Supabase — liên hệ mới:', { fullName, email, subject, message });
  }

  await sendNotification(`[Website] Liên hệ mới từ ${fullName}`, [
    `Họ tên: ${fullName}`, `Email: ${email}`, `Tiêu đề: ${subject || '(không có)'}`, '', message,
  ]);

  return { ok: true, message: 'Đã gửi. Chúng tôi sẽ phản hồi trong giờ làm việc.' };
}

/* --------------------------- Form yêu cầu báo giá -------------------------- */

export type QuoteItem = { name: string; packSize: number; quantity: number };

export async function submitQuote(_prev: FormState, formData: FormData): Promise<FormState> {
  if (str(formData, 'website')) return { ok: true, message: 'Đã gửi. Cảm ơn bạn!' };
  if (await rateLimited()) {
    return { ok: false, message: 'Bạn đã gửi quá nhiều lần. Vui lòng thử lại sau ít phút hoặc gọi ' + site.hotline };
  }

  const fullName = str(formData, 'full_name');
  const phone = str(formData, 'phone');
  const email = str(formData, 'email');
  const company = str(formData, 'company');
  const note = str(formData, 'note');

  let items: QuoteItem[] = [];
  try {
    const raw = str(formData, 'items');
    if (raw) items = JSON.parse(raw) as QuoteItem[];
  } catch {
    items = [];
  }
  // Không tin dữ liệu client: chuẩn hoá lại từng dòng
  items = items
    .filter((i) => i && typeof i.name === 'string')
    .slice(0, 50)
    .map((i) => ({
      name: String(i.name).slice(0, 200),
      packSize: Math.max(0, Number(i.packSize) || 0),
      quantity: Math.max(1, Math.min(9999, Number(i.quantity) || 1)),
    }));

  const fieldErrors: Record<string, string> = {};
  if (fullName.length < 2) fieldErrors.full_name = 'Vui lòng nhập họ tên';
  if (!isPhone(phone)) fieldErrors.phone = 'Số điện thoại chưa đúng (10 số, bắt đầu bằng 0)';
  if (email && !isEmail(email)) fieldErrors.email = 'Email chưa đúng định dạng';
  if (items.length === 0 && note.length < 10) {
    fieldErrors.note = 'Giỏ hàng đang trống — vui lòng mô tả sản phẩm, kích thước và số lượng bạn cần';
  }
  if (Object.keys(fieldErrors).length) {
    return { ok: false, message: 'Vui lòng kiểm tra lại thông tin.', fieldErrors };
  }

  const sb = serverSupabase();
  if (sb) {
    const { error } = await sb.from('quote_requests').insert({
      full_name: fullName, phone, email: email || null, company: company || null,
      note: note || null, items,
    });
    if (error) {
      console.error('[form] Lưu quote_requests thất bại:', error.message);
      return { ok: false, message: 'Hệ thống đang bận. Vui lòng gọi ' + site.hotline + ' để đặt hàng trực tiếp.' };
    }
  } else {
    console.info('[form] Chưa cấu hình Supabase — yêu cầu báo giá mới:', { fullName, phone, items });
  }

  await sendNotification(`[Website] Yêu cầu báo giá từ ${fullName}`, [
    `Họ tên: ${fullName}`,
    `Điện thoại: ${phone}`,
    `Email: ${email || '(không có)'}`,
    `Công ty: ${company || '(không có)'}`,
    '',
    'Sản phẩm:',
    ...(items.length ? items.map((i) => `- ${i.name} | ${i.packSize} hộp/lô × ${i.quantity} lô`) : ['(không chọn sản phẩm sẵn có)']),
    '',
    `Ghi chú: ${note || '(không có)'}`,
  ]);

  return { ok: true, message: 'Đã nhận yêu cầu. Chúng tôi sẽ báo giá trong ngày làm việc.' };
}
