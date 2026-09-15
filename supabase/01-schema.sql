-- =============================================================================
-- Schema cho website inanthoidai.vn
-- Cách chạy: mở Supabase Studio > SQL Editor > dán toàn bộ file này > Run.
-- Chạy file 02-seed.sql sau để nạp dữ liệu.
-- =============================================================================

create extension if not exists "pgcrypto";

-- ------------------------------- Danh mục ------------------------------------
create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  description text not null default '',
  image_url   text not null default '',
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

-- ------------------------------- Sản phẩm ------------------------------------
create table if not exists public.products (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  name              text not null,
  sku               text,
  category_slug     text not null references public.categories(slug) on update cascade,
  price_min         bigint not null default 0,
  price_max         bigint not null default 0,
  -- [{ "qty": 100, "price": 460000 }, { "qty": 200, "price": null }, ...]
  price_tiers       jsonb  not null default '[]'::jsonb,
  short_description text   not null default '',
  description       text   not null default '',
  specs             jsonb  not null default '{}'::jsonb,
  images            text[] not null default '{}',
  is_featured       boolean not null default false,
  created_at        timestamptz not null default now()
);
create index if not exists products_category_idx on public.products (category_slug);

-- ------------------------------- Dịch vụ -------------------------------------
create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  summary     text not null default '',
  description text not null default '',
  icon        text not null default '',
  image_url   text not null default '',
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

-- ------------------------------- Tin tức -------------------------------------
create table if not exists public.posts (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  excerpt         text not null default '',
  content         text not null default '',
  category        text not null default '',
  cover_image_url text not null default '',
  published_at    date not null default current_date,
  author          text not null default 'In Ấn Thời Đại',
  created_at      timestamptz not null default now()
);
create index if not exists posts_published_idx on public.posts (published_at desc);

-- --------------------------- Yêu cầu báo giá ---------------------------------
create table if not exists public.quote_requests (
  id         uuid primary key default gen_random_uuid(),
  full_name  text not null,
  phone      text not null,
  email      text,
  company    text,
  note       text,
  -- [{ "name": "...", "packSize": 100, "quantity": 2 }]
  items      jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists quote_requests_created_idx on public.quote_requests (created_at desc);

-- ---------------------------- Tin nhắn liên hệ -------------------------------
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  full_name  text not null,
  email      text not null,
  subject    text,
  message    text not null,
  created_at timestamptz not null default now()
);
create index if not exists contact_messages_created_idx on public.contact_messages (created_at desc);

-- =============================================================================
-- Row Level Security
-- Nguyên tắc: nội dung website đọc công khai; dữ liệu khách gửi thì
-- ai cũng ghi được (form công khai) nhưng KHÔNG ai đọc được bằng anon key —
-- chỉ xem trong Supabase Studio hoặc bằng service role key ở phía server.
-- =============================================================================

alter table public.categories       enable row level security;
alter table public.products         enable row level security;
alter table public.services         enable row level security;
alter table public.posts            enable row level security;
alter table public.quote_requests   enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "doc cong khai categories" on public.categories;
create policy "doc cong khai categories" on public.categories for select using (true);

drop policy if exists "doc cong khai products" on public.products;
create policy "doc cong khai products" on public.products for select using (true);

drop policy if exists "doc cong khai services" on public.services;
create policy "doc cong khai services" on public.services for select using (true);

drop policy if exists "doc cong khai posts" on public.posts;
create policy "doc cong khai posts" on public.posts for select using (true);

drop policy if exists "ai cung gui duoc bao gia" on public.quote_requests;
create policy "ai cung gui duoc bao gia" on public.quote_requests for insert with check (true);

drop policy if exists "ai cung gui duoc lien he" on public.contact_messages;
create policy "ai cung gui duoc lien he" on public.contact_messages for insert with check (true);
