import Link from 'next/link';
import type { Post } from '@/types/content';
import { formatDateVi } from '@/lib/format';

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="">
      <div className="">
        <span className="bg-secondary-new text-heading tw-py-2 tw-px-5 rounded-top-4 tw-mx-6 tw-text-lg">{post.category}</span>
      </div>
      <div className="tw-rounded-2xl bg-neutral-50 overflow-hidden border border-neutral-100 image-double-animation border-top-0 h-100">
        <Link href={`/tin-tuc/${post.slug}`} className="clip-animation overflow-hidden position-relative d-block">
          {/* TODO ảnh: ảnh bìa bài viết — xem docs/IMAGE-GUIDE.md */}
          <img src={post.coverImageUrl} alt={post.title} data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
          <img src={post.coverImageUrl} alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
        </Link>
        <div className="tw-pt-7 tw-px-7 tw-pb-8">
          <div className="d-flex align-items-center tw-gap-305 flex-wrap">
            <div className="d-flex align-items-center tw-gap-2">
              <span className="d-flex text-primary-new tw-text-xl"><i className="ph ph-calendar-blank"></i></span>
              <span className="text-neutral-700 fw-medium">{formatDateVi(post.publishedAt)}</span>
            </div>
            <span className="tw-w-1 tw-h-1 rounded-circle bg-danger d-xxl-inline-flex d-none"></span>
            <div className="d-flex align-items-center tw-gap-2">
              <span className="d-flex text-primary-new tw-text-xl"><i className="ph ph-user"></i></span>
              <span className="text-neutral-700 fw-medium">{post.author}</span>
            </div>
          </div>
          <h2 className="tw-mt-4 h4">
            <Link href={`/tin-tuc/${post.slug}`} className="text-heading hover-text-heading line-clamp-2 hover-common-underline">
              {post.title}
            </Link>
          </h2>
          <p className="text-neutral-500 tw-mt-3 line-clamp-3">{post.excerpt}</p>
        </div>
      </div>
    </div>
  );
}
