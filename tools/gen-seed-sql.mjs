/**
 * Sinh supabase/02-seed.sql từ dữ liệu seed JSON.
 * Chạy lại sau mỗi lần sửa src/lib/data/seed/*.json để hai nguồn không lệch nhau.
 */
import fs from 'node:fs';

const read = (f) => JSON.parse(fs.readFileSync(`src/lib/data/seed/${f}.json`, 'utf8'));
const q = (v) => (v === null || v === undefined ? 'null' : `'${String(v).replace(/'/g, "''")}'`);
const jsonb = (v) => `'${JSON.stringify(v).replace(/'/g, "''")}'::jsonb`;
const arr = (v) => `ARRAY[${v.map(q).join(', ')}]::text[]`;

const out = [
  '-- Sinh tự động bởi tools/gen-seed-sql.mjs — đừng sửa tay, sửa src/lib/data/seed/*.json rồi chạy lại.',
  '-- Chạy sau 01-schema.sql. Có thể chạy lại nhiều lần (dùng on conflict do update).',
  '',
];

out.push('-- ------------------------------ categories ------------------------------');
for (const c of read('categories')) {
  out.push(
    `insert into public.categories (slug, name, description, image_url, sort_order) values (${q(c.slug)}, ${q(c.name)}, ${q(c.description)}, ${q(c.imageUrl)}, ${c.sortOrder})`,
    `  on conflict (slug) do update set name = excluded.name, description = excluded.description, image_url = excluded.image_url, sort_order = excluded.sort_order;`,
  );
}

out.push('', '-- ------------------------------- services -------------------------------');
for (const s of read('services')) {
  out.push(
    `insert into public.services (slug, name, summary, description, icon, image_url, sort_order) values (${q(s.slug)}, ${q(s.name)}, ${q(s.summary)}, ${q(s.description)}, ${q(s.icon)}, ${q(s.imageUrl)}, ${s.sortOrder})`,
    `  on conflict (slug) do update set name = excluded.name, summary = excluded.summary, description = excluded.description, icon = excluded.icon, image_url = excluded.image_url, sort_order = excluded.sort_order;`,
  );
}

out.push('', '-- ------------------------------- products -------------------------------');
for (const p of read('products')) {
  out.push(
    `insert into public.products (slug, name, sku, category_slug, price_min, price_max, price_tiers, short_description, description, specs, images, is_featured) values (${q(p.slug)}, ${q(p.name)}, ${q(p.sku)}, ${q(p.categorySlug)}, ${p.priceMin}, ${p.priceMax}, ${jsonb(p.priceTiers)}, ${q(p.shortDescription)}, ${q(p.description)}, ${jsonb(p.specs)}, ${arr(p.images)}, ${p.isFeatured})`,
    `  on conflict (slug) do update set name = excluded.name, sku = excluded.sku, category_slug = excluded.category_slug, price_min = excluded.price_min, price_max = excluded.price_max, price_tiers = excluded.price_tiers, short_description = excluded.short_description, description = excluded.description, specs = excluded.specs, images = excluded.images, is_featured = excluded.is_featured;`,
  );
}

out.push('', '-- -------------------------------- posts ---------------------------------');
for (const p of read('posts')) {
  out.push(
    `insert into public.posts (slug, title, excerpt, content, category, cover_image_url, published_at, author) values (${q(p.slug)}, ${q(p.title)}, ${q(p.excerpt)}, ${q(p.content)}, ${q(p.category)}, ${q(p.coverImageUrl)}, ${q(p.publishedAt)}, ${q(p.author)})`,
    `  on conflict (slug) do update set title = excluded.title, excerpt = excluded.excerpt, content = excluded.content, category = excluded.category, cover_image_url = excluded.cover_image_url, published_at = excluded.published_at, author = excluded.author;`,
  );
}

fs.writeFileSync('supabase/02-seed.sql', out.join('\n') + '\n');
console.log(`supabase/02-seed.sql: ${out.length} dòng`);
