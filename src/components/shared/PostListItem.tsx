import Link from 'next/link';
import type { Post } from '@/types/content';
import { formatDateVi, toHashtag } from '@/lib/format';

/**
 * 1 bài viết trong danh sách cột chính của trang Tin tức — cấu trúc/class lấy
 * từ blog.html gốc (mục ".blog-page-content .col-lg-8", các khối "Item").
 * Badge "lượt xem" của template gốc không có trong dữ liệu thật (Post không
 * có field views) nên bỏ hẳn, chỉ giữ badge chuyên mục.
 */
export default function PostListItem({ post }: { post: Post }) {
  return (
    <div className="">
      <div className="position-relative">
        <Link
          href={`/tin-tuc/${post.slug}`}
          className="clip-animation image-double-animation overflow-hidden position-relative d-block tw-rounded-lg"
        >
          {/* TODO ảnh: ảnh bìa bài viết — xem docs/IMAGE-GUIDE.md */}
          <img
            src={post.coverImageUrl}
            alt={post.title}
            data-animate="true"
            className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img"
          />
          <img src={post.coverImageUrl} alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
        </Link>
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
        <h2 className="text-38-px tw-mt-5 tw-mb-6">
          <Link href={`/tin-tuc/${post.slug}`} className="text-heading hover-common-underline hover-text-heading">
            {post.title}
          </Link>
        </h2>
        <p className="tw-text-lg text-body-11 max-w-790-px">{post.excerpt}</p>
        <div className="custom-fade-animation tw-mt-6" data-delay=".6" data-fade-from="bottom" data-ease="bounce">
          <Link
            href={`/tin-tuc/${post.slug}`}
            className="btn bg-transparent border border-primary-new text-main-two-600 hover-bg-animation hover-bg-animation-main-two-600 tw-py-3 tw-px-6"
          >
            <span className="btn-text">Xem thêm </span>
            <span className="btn-icon-animation d-flex">
              <i className="ph-bold ph-arrow-down-right"></i>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
