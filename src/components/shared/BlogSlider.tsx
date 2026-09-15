'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Post } from '@/types/content';

/**
 * Slider tin tức trang chủ.
 * Tham số lấy nguyên từ `blogNewSlider` trong assets/js/main.js của template:
 * slidesPerView 1, spaceBetween 10, grabCursor, loop, autoplay false, speed 1000,
 * breakpoints 0:1 / 768:1 / 992:2 / 1200:3.
 */
export default function BlogSlider({ posts }: { posts: Post[] }) {
  return (
    <Swiper
      className="blog-new-slider tw-pt-15"
      modules={[Navigation, Pagination]}
      slidesPerView={1}
      spaceBetween={10}
      grabCursor
      loop
      autoplay={false}
      speed={1000}
      pagination={{ el: '.blog-new-slider-pagination', clickable: true }}
      navigation={{ prevEl: '.blog-new-btn-prev', nextEl: '.blog-new-btn-next' }}
      breakpoints={{ 0: { slidesPerView: 1 }, 768: { slidesPerView: 1 }, 992: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
    >
      {posts.map((post, i) => {
        const d = new Date(post.publishedAt);
        return (
          <SwiperSlide key={post.slug} data-speed={i % 2 === 0 ? '1.14' : undefined}>
            <div className="" data-aos="fade-up" data-aos-duration="800" data-aos-delay={200 + (i % 3) * 200}>
              <div className="">
                <span className="bg-secondary-new text-heading tw-py-2 tw-px-5 rounded-top-4 tw-mx-6 tw-text-lg">
                  {post.category}
                </span>
              </div>
              <div className="tw-rounded-2xl bg-neutral-50 overflow-hidden border border-neutral-100 image-double-animation border border-neutral-100 border-top-0">
                <div className="position-relative">
                  <Link href={`/tin-tuc/${post.slug}`} className="clip-animation overflow-hidden position-relative d-block">
                    {/* TODO ảnh: ảnh bìa bài viết — xem docs/IMAGE-GUIDE.md */}
                    <img src={post.coverImageUrl} alt={post.title} data-animate="true" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                    <img src={post.coverImageUrl} alt="" className="image-double-animation__element w-100 h-100 object-fit-cover clip-animation-img" />
                  </Link>
                  <div className="bg-white d-inline-flex flex-column position-absolute top-0 tw-end-0 tw-mt-4 tw-me-4 tw-rounded-lg z- overflow-hidden">
                    <span className="h2 text-white bg-primary-new tw-py-2 tw-px-4">{String(d.getDate()).padStart(2, '0')}</span>
                    <span className="text-heading tw-py-2 tw-px-4">Th{d.getMonth() + 1}, {String(d.getFullYear()).slice(2)}</span>
                  </div>
                </div>
                <div className="tw-pt-7 tw-px-7 tw-pb-8">
                  <div className="d-flex align-items-center tw-gap-305">
                    <div className="d-flex align-items-center tw-gap-2">
                      <span className="d-flex text-primary-new tw-text-xl">
                        <i className="ph ph-user"></i>
                      </span>
                      <span className="text-neutral-700 fw-medium">{post.author}</span>
                    </div>
                    <span className="tw-w-1 tw-h-1 rounded-circle bg-danger d-xxl-inline-flex d-none"></span>
                    <div className="d-flex align-items-center tw-gap-2">
                      <span className="d-flex text-primary-new tw-text-xl">
                        <i className="ph-bold ph-arrow-up-right"></i>
                      </span>
                      <span className="text-neutral-500 fw-normal">Đọc bài</span>
                    </div>
                  </div>
                  <h2 className="tw-mt-4 h3">
                    <Link href={`/tin-tuc/${post.slug}`} className="text-heading hover-text-heading line-clamp-3 hover-common-underline">
                      {post.title}
                    </Link>
                  </h2>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
