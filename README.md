# Website In Ấn Thời Đại

Website của **Công Ty TNHH Công Nghiệp Thời Đại** (inanthoidai.vn), dựng lại trên nền giao diện
template **Printop** với Next.js 16 (App Router) + TypeScript.

Tài liệu dự án: [`docs/spec.md`](docs/spec.md) · [`docs/backlog.md`](docs/backlog.md) ·
[`CLAUDE.md`](CLAUDE.md) · [`docs/IMAGE-GUIDE.md`](docs/IMAGE-GUIDE.md)

---

## Chạy trên máy

```bash
npm install
npm run dev        # http://localhost:3000
```

`npm run dev` và `npm run build` tự chạy `tools/build-vendor.mjs` để gộp JS vendor của template
(file `public/assets/js/vendor.bundle.js` không commit, sinh lại mỗi lần build).

Chưa cần biến môi trường nào — tầng dữ liệu tự đọc seed tĩnh trong `src/lib/data/seed/`.

## Nối Supabase

1. Tạo project tại [supabase.com](https://supabase.com).
2. Mở **SQL Editor**, dán và chạy lần lượt:
   - `supabase/01-schema.sql` — tạo bảng và RLS
   - `supabase/02-seed.sql` — nạp 3 danh mục, 12 sản phẩm, 4 dịch vụ, 22 bài viết
3. Vào **Project Settings → API**, copy `Project URL` và `anon public key`.
4. Tạo file `.env.local` (copy từ `.env.example`) và điền:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

5. Chạy lại `npm run dev`. Từ giờ trang đọc dữ liệu từ Supabase; quản lý nội dung trong
   **Supabase Studio → Table Editor**.

> Nếu biến môi trường bị thiếu hoặc Supabase lỗi, site **tự rơi về seed tĩnh** thay vì sập trang.
> Sửa seed JSON thì chạy lại `node tools/gen-seed-sql.mjs` để `02-seed.sql` không lệch.

## Gửi email thông báo (Resend)

1. Tạo API key tại [resend.com/api-keys](https://resend.com/api-keys), xác thực domain `inanthoidai.vn`.
2. Thêm vào `.env.local`:

```
RESEND_API_KEY=re_...
RESEND_FROM="In Ấn Thời Đại <no-reply@inanthoidai.vn>"
NOTIFY_TO=office@inanthoidai.vn
```

Chưa cấu hình thì form vẫn hoạt động: dữ liệu lưu Supabase, nội dung email ghi ra console.

## Đưa lên GitHub và deploy Vercel

```bash
# 1. Tạo repo rỗng trên github.com (không tick "Add README")
git remote add origin git@github.com:<tài-khoản>/inanthoidai-web.git
git push -u origin main
```

2. Vào [vercel.com/new](https://vercel.com/new) → **Import Git Repository** → chọn repo vừa push.
3. Ở bước cấu hình, thêm các biến môi trường giống `.env.local` (mục **Environment Variables**).
4. Bấm **Deploy**. Mỗi lần `git push` sau đó Vercel tự build lại; mỗi Pull Request có link preview riêng.

## Cấu trúc

```
src/
  app/                   15 trang, slug tiếng Việt (/san-pham, /tin-tuc, /gioi-thieu…)
  components/
    layout/              Header, MobileMenu, Footer, Preloader, ScrollToTop, TemplateRuntime
    home/                12 section trang chủ
    shared/              Breadcrumb, ProductCard, PostCard, các slider, form
  lib/
    data/                Tầng dữ liệu (Supabase + fallback seed) và seed JSON
    cart/                CartContext (localStorage)
    actions/             Server Action xử lý form
    template-behaviors.ts  Port main.js của template sang TS, bỏ jQuery
    site.ts              Thông tin doanh nghiệp + menu
  styles/                CSS gốc của template + brand.css (chỗ duy nhất được tuỳ biến)
public/assets/           281 ảnh + JS vendor của template
supabase/                SQL schema và seed
tools/                   Script build vendor, chuyển HTML→JSX, sinh SQL/IMAGE-GUIDE
docs/                    spec, backlog, hướng dẫn thay ảnh
```

## Những việc còn lại trước khi go-live

- [ ] Thay ảnh placeholder bằng ảnh thật — xem `docs/IMAGE-GUIDE.md` (88 vị trí)
- [ ] Đổi màu chủ đạo theo logo: sửa `--main-h/s/l` trong `src/styles/brand.css`
- [ ] Rà lại `src/app/chinh-sach-bao-mat/page.tsx` với bộ phận pháp chế (Nghị định 13/2023/NĐ-CP)
- [ ] Bổ sung giá các bậc 200/300/400 hộp vào `src/lib/data/seed/products.json` (hiện để `null`)
- [ ] Bật Cloudflare Turnstile cho form nếu bị spam (hiện chỉ có honeypot + rate limit theo IP)
- [ ] Kiểm tra hiển thị trên Safari/iOS và các breakpoint 575 / 767 / 991 / 1199 px
