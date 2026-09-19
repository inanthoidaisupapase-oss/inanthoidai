import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/shared/Breadcrumb';
import BlogSidebar from '@/components/shared/BlogSidebar';
import CopyPostLink from '@/components/shared/CopyPostLink';
import PostCommentForm from '@/components/shared/PostCommentForm';
import { getPost, getPostCategories, getPosts } from '@/lib/data';
import { formatDateVi, formatDayMonth, toHashtag } from '@/lib/format';
import { site } from '@/lib/site';
import type { Post } from '@/types/content';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Không tìm thấy bài viết' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImageUrl],
      publishedTime: post.publishedAt,
    },
  };
}

/** Khối "bài trước/bài sau" — section.blog-page-content trong blog-details.html gốc */
function PostNavItem({ post, direction }: { post: Post; direction: 'prev' | 'next' }) {
  const { day, month } = formatDayMonth(post.publishedAt);
  return (
    <div className="d-flex align-items-start tw-gap-405">
      <span className="tw-w-74-px tw-h-76-px bg-white border-top border-4 border-main-600 d-flex justify-content-center align-items-center flex-column tw-rounded-lg shadow-sm tw-mt-105">
        <span className="tw-text-xl fw-bold text-main-600">{day}</span>
        <span className="tw-text-base fw-medium">{month}</span>
      </span>
      <div className="">
        <Link
          href={`/tin-tuc/${post.slug}`}
          className="d-flex align-items-center tw-gap-2 text-uppercase hover-common-underline text-body hover-text-main-600 tw-text-sm"
        >
          {direction === 'prev' ? (
            <>
              <span className="d-flex"><i className="ph-bold ph-caret-left"></i></span>
              BÀI TRƯỚC
            </>
          ) : (
            <>
              BÀI SAU
              <span className="d-flex"><i className="ph-bold ph-caret-right"></i></span>
            </>
          )}
        </Link>
        <Link
          href={`/tin-tuc/${post.slug}`}
          className="fw-bold text-heading hover-common-underline text-main-600 tw-text-lg hover-text-main-600 tw-mt-2 max-w-270-px d-block"
        >
          {post.title}
        </Link>
        <div className="d-flex align-items-center tw-gap-3 tw-mt-4">
          <span className="flex-shrink-0">
            <img src="/assets/images/thumbs/meta-img.png" alt="" className="rounded-circle" />
          </span>
          <div className="text-body">
            Tác giả: <strong className="text-neutral-500">{post.author}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const [allPosts, latestPosts, categories] = await Promise.all([
    getPosts(),
    getPosts({ limit: 4 }),
    getPostCategories(),
  ]);

  // allPosts đã sắp mới nhất trước (getPosts) — "bài trước" là bài cũ hơn liền kề
  // (index sau), "bài sau" là bài mới hơn liền kề (index trước), không bịa khi
  // đang ở đầu/cuối danh sách.
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const olderPost = currentIndex >= 0 ? allPosts[currentIndex + 1] : undefined;
  const newerPost = currentIndex > 0 ? allPosts[currentIndex - 1] : undefined;
  const postUrl = `${site.url}/tin-tuc/${post.slug}`;

  return (
    <>
      <Breadcrumb title={post.title} items={[{ label: 'Tin tức', href: '/tin-tuc' }]} />

      {/* pb-120: blog-details.html gốc có section "Instagram post pt-120" nối ngay sau, tạo
          khoảng cách trước footer. Trang này bỏ hẳn section đó — không có feed Instagram thật
          (site chỉ có Facebook/YouTube/TikTok, xem lib/site.ts) và cũng không có ảnh gallery
          nào gắn thật với riêng bài viết để thay vào (khác gioi-thieu/lien-he/dich-vu, nơi
          section này được giữ lại và đổi thành ảnh xưởng/sản phẩm thật) — cùng cách xử lý đã
          áp dụng ở cau-hoi-thuong-gap/page.tsx. Thêm pb-120 ở đây để giữ đúng nhịp 120px
          trước footer như các trang khác. */}
      <section className="blog-page-content pt-120 pb-120">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-8">
              <div className="d-flex flex-column tw-gap-62-px">
                <div className="">
                  <div className="position-relative">
                    <div className="clip-animation image-double-animation overflow-hidden position-relative d-block tw-rounded-lg">
                      {/* TODO ảnh: ảnh bìa bài viết — xem docs/IMAGE-GUIDE.md */}
                      <img
                        src={post.coverImageUrl}
                        alt={post.title}
                        data-animate="true"
                        className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img"
                      />
                      <img src={post.coverImageUrl} alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                    </div>
                    <div className="d-flex tw-gap-2 position-absolute start-0 bottom-0 tw-mb-5 tw-ms-5 z-1">
                      <span className="bg-white rounded-pill text-body-11 tw-px-4 tw-p-105 tw-text-sm fw-semibold">
                        {toHashtag(post.category).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="tw-pt-6">
                    <div className="d-flex align-items-center tw-gap-4">
                      <div className="d-flex align-items-center tw-gap-2">
                        <span className="">
                          <img src="/assets/images/thumbs/meta-img.png" alt="Ảnh đại diện tác giả" />
                        </span>
                        <span className="text-neutral-500 fw-semibold">{post.author}</span>
                      </div>
                      <span className="tw-w-4 tw-h-px bg-neutral-200"></span>
                      <span className="text-body-11 fw-semibold tw-text-sm">{formatDateVi(post.publishedAt)}</span>
                    </div>
                    <h2 className="text-38-px tw-mt-5 tw-mb-6">{post.title}</h2>
                    <p className="tw-text-lg text-body-4 max-w-790-px">{post.excerpt}</p>
                    <div
                      className="post-content tw-text-lg text-neutral-600 tw-leading-155 tw-mt-10"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </div>

                  <div className="tw-mt-12 bg-neutral-50 tw-rounded-2xl tw-p-8">
                    <h3 className="h4 tw-mb-3">Cần tư vấn cho sản phẩm của bạn?</h3>
                    <p className="text-neutral-600 tw-mb-6">
                      Gọi {site.hotline} hoặc gửi yêu cầu báo giá — đội thiết kế sẽ dựng mẫu miễn phí cho đơn in tại xưởng.
                    </p>
                    <Link href="/bao-gia" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600">
                      <span className="btn-text">Gửi yêu cầu báo giá</span>
                    </Link>
                  </div>

                  <div className="">
                    <span className="d-block border-bottom tw-border-dashed border-neutral-200 border-top-0 border-start-0 border-end-0 tw-mt-16 tw-mb-9"></span>
                    <div className="d-flex align-items-center tw-gap-6 flex-wrap">
                      <h2 className="h6">Chuyên mục:</h2>
                      <div className="d-flex tw-gap-4 flex-wrap">
                        <Link
                          href={`/tin-tuc?chuyen-muc=${encodeURIComponent(post.category)}`}
                          className="tw-text-base fw-semibold hover-text-main-600 text-body hover-common-underline"
                        >
                          {toHashtag(post.category)}
                        </Link>
                      </div>
                    </div>
                    <div className="tw-mt-9">
                      <div className="d-flex align-items-center tw-gap-6 flex-wrap">
                        <h2 className="h6">Chia sẻ bài viết:</h2>
                        <ul className="d-flex align-items-center justify-content-center tw-gap-205">
                          <li>
                            <a
                              href={site.social.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="tw-w-11 tw-h-11 tw-rounded-xl bg-transparent border border-neutral-100 hover-bg-main-two-600 hover-border-main-two-600 hover-text-white tw-text-xl d-flex justify-content-center align-items-center text-neutral-600"
                            >
                              <i className="ph-fill ph-facebook-logo"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href={site.social.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="tw-w-11 tw-h-11 tw-rounded-xl bg-transparent border border-neutral-100 hover-bg-main-two-600 hover-border-main-two-600 hover-text-white tw-text-xl d-flex justify-content-center align-items-center text-neutral-600"
                            >
                              <i className="ph-fill ph-youtube-logo"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href={site.social.tiktok}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="tw-w-11 tw-h-11 tw-rounded-xl bg-transparent border border-neutral-100 hover-bg-main-two-600 hover-border-main-two-600 hover-text-white tw-text-xl d-flex justify-content-center align-items-center text-neutral-600"
                            >
                              <i className="ph-fill ph-tiktok-logo"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="tw-mt-6">
                      <CopyPostLink url={postUrl} />
                    </div>
                    <span className="d-block border-bottom tw-border-dashed border-neutral-200 border-top-0 border-start-0 border-end-0 tw-mt-10 tw-mb-10"></span>
                    {(olderPost || newerPost) && (
                      <div className="d-flex flex-wrap justify-content-between tw-gap-6">
                        {olderPost && <PostNavItem post={olderPost} direction="prev" />}
                        {newerPost && <PostNavItem post={newerPost} direction="next" />}
                      </div>
                    )}

                    {/* View Comments — posts trong docs/spec.md chưa có bảng lưu bình luận, nên
                        không bịa tên/nội dung bình luận như bản mẫu (Elliot Alderson...) — để
                        trạng thái rỗng trung thực, cùng tinh thần tab "Đánh giá" ở
                        components/shared/ProductTabs.tsx. */}
                    <div className="bg-neutral-100 tw-py-705 tw-px-40-px tw-mt-14 tw-rounded-xl">
                      <div className="">
                        <h2 className="h4 tw-mt-2 tw-pb-3 mb-0">Bình luận</h2>
                        <span className="tw-w-100-px bg-main-600 tw-h-05 tw-mb-6"></span>
                        <div className="text-center py-40">
                          <span className="d-flex justify-content-center tw-text-5xl text-neutral-300 tw-mb-5">
                            <i className="ph ph-chat-circle-dots"></i>
                          </span>
                          <p className="tw-text-lg text-neutral-500 mb-0">Chưa có bình luận nào cho bài viết này.</p>
                        </div>
                      </div>
                    </div>

                    <PostCommentForm />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 ps-xl-5">
              <BlogSidebar latestPosts={latestPosts} categories={categories} activeCategory={post.category} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
