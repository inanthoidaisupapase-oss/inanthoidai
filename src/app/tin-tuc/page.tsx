import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import PostCard from '@/components/shared/PostCard';
import { getPostCategories, getPosts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Tin tức & kiến thức in ấn',
  description:
    'Kinh nghiệm chọn chất liệu, quy cách thiết kế bao bì, xu hướng hộp giấy theo mùa và hoạt động của Công Ty TNHH Công Nghiệp Thời Đại.',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ 'chuyen-muc'?: string }>;
}) {
  const params = await searchParams;
  const category = params['chuyen-muc'];
  const [posts, allPosts, categories] = await Promise.all([getPosts({ category }), getPosts(), getPostCategories()]);

  return (
    <>
      <Breadcrumb title={category ?? 'Tin tức'} items={category ? [{ label: 'Tin tức', href: '/tin-tuc' }] : []} />

      <section className="py-120">
        <div className="container">
          <div className="d-flex align-items-center tw-gap-3 flex-wrap tw-mb-12">
            <Link
              href="/tin-tuc"
              className={`btn rounded-pill tw-px-5 tw-py-2 ${!category ? 'bg-main-600 text-white' : 'bg-neutral-50 text-heading border border-neutral-100'}`}
            >
              <span className="btn-text">Tất cả ({allPosts.length})</span>
            </Link>
            {categories.map((c) => (
              <Link
                key={c.name}
                href={`/tin-tuc?chuyen-muc=${encodeURIComponent(c.name)}`}
                className={`btn rounded-pill tw-px-5 tw-py-2 ${category === c.name ? 'bg-main-600 text-white' : 'bg-neutral-50 text-heading border border-neutral-100'}`}
              >
                <span className="btn-text">{c.name} ({c.count})</span>
              </Link>
            ))}
          </div>

          <div className="row gy-5">
            {posts.map((post) => (
              <div className="col-lg-4 col-md-6" key={post.slug}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
