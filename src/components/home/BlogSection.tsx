import Link from 'next/link';
import { getPosts } from '@/lib/data';
import BlogSlider from '@/components/shared/BlogSlider';

export default async function BlogSection() {
  const posts = await getPosts({ limit: 9 });

  return (
    <section className="blog-new py-120">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between flex-lg-nowrap flex-wrap tw-gap-6">
          <div className="max-w-650-px">
            <div className="bg-white rounded-pill border border-neutral-100 tw-py-105 tw-px-4 d-inline-flex align-items-center tw-gap-3" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
              <div className="d-flex align-items-center tw-gap-205">
                <span className="text-primary-new d-sm-flex d-none tw-text-xl">
                  <i className="ph-fill ph-check-circle"></i>
                </span>
                <span className="text-primary-new tw-text-lg text-sm-res-14-px fw-semibold text-center">Tin tức</span>
              </div>
              <span className="border-end border-neutral-300 tw-h-5 tw-w-px"></span>
              <span className="text-neutral-500 tw-text-lg text-sm-res-14-px fw-normal text-center">Kiến thức &amp; hoạt động</span>
            </div>
            <h2 className="fw-bold tw-mt-4 h1"> <span className="text-reveal d-inline">Kiến thức in ấn và xu hướng </span>{' '}
              <span className="text-gradient-main text-decoration-underline">bao bì</span>
            </h2>
          </div>
          <div className="max-w-400-px d-flex flex-column tw-gap-8">
            <p className="text-neutral-500 text-lg-end">
              Kinh nghiệm chọn chất liệu, quy cách thiết kế và xu hướng bao bì theo từng mùa — viết từ những đơn hàng thật tại xưởng.
            </p>
            <div className=" d-flex justify-content-lg-end">
              <div className="custom-fade-animation" data-delay=".7" data-fade-from="bottom" data-ease="bounce">
                <Link href="/tin-tuc" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 tw-ps-2 tw-pe-6 tw-py-3 py-sm-2">
                  <span className="btn-icon-animation d-flex align-items-center justify-content-center z-1 tw-w-9 tw-h-9 bg-white rounded-circle">
                    <i className="ph-bold ph-arrow-right text-gradient-main"></i>
                  </span>
                  <span className="btn-text">Xem tất cả bài viết</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <BlogSlider posts={posts} />

        <div className="d-flex align-items-center tw-gap-4 tw-mt-10 justify-content-center">
          <button type="button" aria-label="Bài trước" className="btn bg-main-600 gradient-outline-bg-white hover-bg-animation hover-bg-animation-main-600 p-0 tw-w-11 tw-h-11 d-flex justify-content-center align-items-center tw-text-2xl text-white blog-new-btn-prev">
            <i className="ph-bold ph-caret-left z-1 text-gradient-main tw-duration-300"></i>
          </button>
          <span className="">
            <img src="/assets/images/icons/big-arrow-left-right.png" alt="" className="big-arrow-left-right-icon" />
          </span>
          <button type="button" aria-label="Bài sau" className="btn bg-main-600 hover-bg-animation hover-bg-animation-main-600 p-0 tw-w-11 tw-h-11 d-flex justify-content-center align-items-center tw-text-2xl text-white blog-new-btn-next">
            <i className="ph-bold ph-caret-right z-1"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
