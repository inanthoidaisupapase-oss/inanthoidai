import Link from 'next/link';
import type { Post } from '@/types/content';
import { formatDateVi, toHashtag } from '@/lib/format';
import { site } from '@/lib/site';
import SubscribeSlider from './SubscribeSlider';
import NewsletterForm from './NewsletterForm';

/**
 * Sidebar cột phải trang Tin tức — 4 widget lấy cấu trúc/class từ blog.html
 * gốc (mục ".blog-page-content .col-lg-4"): tác giả/thương hiệu, bài viết nổi
 * bật, danh mục, đăng ký bản tin.
 */
export default function BlogSidebar({
  latestPosts,
  categories,
  activeCategory,
}: {
  latestPosts: Post[];
  categories: { name: string; count: number }[];
  activeCategory?: string;
}) {
  return (
    <div className="d-flex flex-column tw-gap-6">
      {/* Widget: thương hiệu (không có tác giả cá nhân — posts.author luôn là "In Ấn Thời Đại") */}
      <div className="border border-neutral-100 tw-rounded-xl tw-py-10 tw-px-6">
        <div className="text-center">
          <div className="d-inline-flex justify-content-center">
            <div className="clip-animation image-double-animation overflow-hidden position-relative d-block rounded-circle tw-w-116-px tw-h-116-px">
              {/* Logo In Ấn Thời Đại thay cho ảnh chân dung — không có tác giả cá nhân */}
              <img
                src="/assets/images/logo/favicon.png"
                alt="In Ấn Thời Đại"
                data-animate="true"
                className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img"
              />
              <img src="/assets/images/logo/favicon.png" alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
            </div>
          </div>
          <div className="tw-mt-8">
            <span className="text-body-11 tw-text-sm">{site.tagline}</span>
            <h2 className="h4 tw-mt-2 tw-pb-2 mb-0">In Ấn Thời Đại</h2>
            <span className="tw-w-100-px bg-main-600 tw-h-05"></span>
            <p className="text-body-11 fw-medium tw-mt-6 max-w-270-px mx-auto">
              Cập nhật tin tức ngành in ấn – bao bì và hoạt động của {site.legalName}.
            </p>
            <ul className="d-flex align-items-center justify-content-center tw-gap-205 tw-mt-10">
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
      </div>

      {/* Widget: bài viết nổi bật (4 bài mới nhất — dữ liệu thật chưa có field lượt xem) */}
      {latestPosts.length > 0 && (
        <div className="border border-neutral-100 tw-rounded-xl tw-py-705 tw-px-6">
          <div className="">
            <h2 className="h4 tw-mt-2 tw-pb-3 mb-0">Bài viết nổi bật</h2>
            <span className="tw-w-100-px bg-main-600 tw-h-05 tw-mb-6"></span>
            <div className="d-flex flex-column tw-gap-6">
              {latestPosts.map((post) => (
                <div className="d-flex align-items-center tw-gap-4" key={post.slug}>
                  <Link
                    href={`/tin-tuc/${post.slug}`}
                    className="clip-animation image-double-animation overflow-hidden position-relative d-inline-block tw-rounded-lg tw-w-90-px tw-h-92-px w-auto flex-shrink-0"
                  >
                    <img
                      src={post.coverImageUrl}
                      alt={post.title}
                      data-animate="true"
                      className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img"
                    />
                    <img src={post.coverImageUrl} alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                  </Link>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center tw-gap-4">
                      <span className="tw-w-4 tw-h-px bg-neutral-200"></span>
                      <span className="text-body-11 fw-semibold tw-text-sm">{formatDateVi(post.publishedAt)}</span>
                    </div>
                    <h2 className="tw-text-lg tw-mt-3">
                      <Link href={`/tin-tuc/${post.slug}`} className="hover-common-underline hover-text-heading line-clamp-2">
                        {post.title}
                      </Link>
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Widget: danh mục — tag cloud từ chuyên mục thật, kiêm chức năng lọc bài viết */}
      <div className="border border-neutral-100 tw-rounded-xl tw-py-705 tw-px-6">
        <div className="">
          <h2 className="h4 tw-mt-2 tw-pb-3 mb-0">Danh mục</h2>
          <span className="tw-w-100-px bg-main-600 tw-h-05 tw-mb-6"></span>
          <div className="d-flex tw-gap-5 flex-wrap">
            <Link
              href="/tin-tuc"
              className={`tw-text-base fw-semibold hover-text-heading hover-common-underline ${!activeCategory ? 'text-main-600' : 'text-body'}`}
            >
              #Tất_cả
            </Link>
            {categories.map((c) => (
              <Link
                key={c.name}
                href={`/tin-tuc?chuyen-muc=${encodeURIComponent(c.name)}`}
                className={`tw-text-base fw-semibold hover-text-heading hover-common-underline ${activeCategory === c.name ? 'text-main-600' : 'text-body'}`}
              >
                {toHashtag(c.name)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Widget: đăng ký bản tin — email lưu thật vào bảng newsletter_subscribers
          (cùng cơ chế Server Action + validate server đã dùng cho form liên hệ/báo giá). */}
      <div className="border border-neutral-100 tw-rounded-xl tw-pt-205 tw-pb-705">
        <div className="">
          <SubscribeSlider />
        </div>
        <div className="tw-px-6 tw-mt-12">
          <h2 className="h4 tw-mt-2 tw-pb-3 mb-0">Cùng Thời Đại khám phá thêm</h2>
          <span className="tw-w-100-px bg-main-600 tw-h-05 tw-mb-6"></span>
          <p className="text-body-11 fw-medium tw-mb-6">Để lại email, đội ngũ Thời Đại sẽ gửi mẫu bao bì mới và ưu đãi phù hợp cho bạn.</p>
          <NewsletterForm source="blog-sidebar" variant="sidebar" />
        </div>
      </div>
    </div>
  );
}
