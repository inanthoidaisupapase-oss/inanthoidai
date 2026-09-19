import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import PostListItem from '@/components/shared/PostListItem';
import BlogSidebar from '@/components/shared/BlogSidebar';
import { getPostCategories, getPosts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Tin tức & kiến thức in ấn',
  description:
    'Kinh nghiệm chọn chất liệu, quy cách thiết kế bao bì, xu hướng hộp giấy theo mùa và hoạt động của Công Ty TNHH Công Nghiệp Thời Đại.',
};

// Số bài mỗi trang — khớp đúng số khối "Item" hiển thị trong cột chính của blog.html gốc.
const PAGE_SIZE = 4;

function buildPageHref(page: number, category?: string): string {
  const qs = new URLSearchParams();
  if (category) qs.set('chuyen-muc', category);
  if (page > 1) qs.set('trang', String(page));
  const s = qs.toString();
  return `/tin-tuc${s ? `?${s}` : ''}`;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ 'chuyen-muc'?: string; trang?: string }>;
}) {
  const params = await searchParams;
  const category = params['chuyen-muc'];

  const [postsInCategory, latestPosts, categories] = await Promise.all([
    getPosts({ category }),
    getPosts({ limit: 4 }),
    getPostCategories(),
  ]);

  const totalPages = Math.max(1, Math.ceil(postsInCategory.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(Number(params.trang) || 1, 1), totalPages);
  const posts = postsInCategory.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <>
      <Breadcrumb title="Tin tức" />

      <section className="blog-page-content pt-120">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-8">
              {category && (
                <div className="d-flex align-items-center tw-gap-3 flex-wrap tw-mb-10">
                  <span className="text-neutral-500">Đang xem chuyên mục:</span>
                  <span className="bg-main-600 text-white rounded-pill tw-px-4 tw-py-1 tw-text-sm fw-semibold">{category}</span>
                  <Link href="/tin-tuc" className="text-main-600 hover-common-underline fw-semibold tw-text-sm">
                    Xem tất cả
                  </Link>
                </div>
              )}

              {posts.length === 0 ? (
                <div className="text-center py-80">
                  <p className="tw-text-xl text-neutral-600 tw-mb-6">Không tìm thấy bài viết phù hợp.</p>
                  <Link href="/tin-tuc" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600">
                    <span className="btn-text">Xem tất cả bài viết</span>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="d-flex flex-column tw-gap-62-px">
                    {posts.map((post) => (
                      <PostListItem post={post} key={post.slug} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="tw-mt-16 d-flex">
                      <ul className="d-flex flex-wrap tw-gap-4">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                          <li className="" key={n}>
                            <Link
                              href={buildPageHref(n, category)}
                              aria-current={n === currentPage ? 'page' : undefined}
                              className={`tw-w-12 tw-h-12 fw-bold hover-bg-main-600 hover-text-white d-flex justify-content-center align-items-center tw-rounded-md ${
                                n === currentPage ? 'bg-main-600 text-white' : 'bg-neutral-100 text-heading'
                              }`}
                            >
                              {n}
                            </Link>
                          </li>
                        ))}
                        {currentPage < totalPages && (
                          <li className="">
                            <Link
                              href={buildPageHref(currentPage + 1, category)}
                              className="tw-px-4 tw-h-12 bg-neutral-100 text-heading fw-bold hover-bg-main-600 hover-text-white d-flex justify-content-center align-items-center tw-rounded-md"
                            >
                              Tiếp theo
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="col-lg-4 ps-xl-5">
              <BlogSidebar latestPosts={latestPosts} categories={categories} activeCategory={category} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
