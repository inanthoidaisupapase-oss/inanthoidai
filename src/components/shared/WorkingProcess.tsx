import Link from 'next/link';

export type ProcessStep = {
  icon: string;
  step: string;
  title: string;
  text: string;
  href: string;
  /** Ảnh mũi tên cong nối sang bước kế tiếp — bỏ ở bước cuối */
  arrow?: string | null;
};

/**
 * Quy trình đặt in chung của site — nội dung gốc port từ gioi-thieu/page.tsx,
 * tách thành default để trang chi tiết dịch vụ dùng lại nguyên vẹn thay vì
 * viết lại 3 bước riêng cho từng dịch vụ (section.working-process gốc trong
 * service-details.html chỉ có 1 quy trình chung, không đổi theo dịch vụ).
 */
export const defaultProcessSteps: ProcessStep[] = [
  {
    icon: 'working-process-icon1.png',
    step: 'Bước 01',
    title: 'Gửi yêu cầu hoặc file thiết kế',
    text: 'Gửi kích thước, số lượng và mục đích sử dụng. Đã có file thiết kế hay mới chỉ có ý tưởng đều được — đội thiết kế dựng mẫu miễn phí cho đơn in tại xưởng.',
    href: '/dich-vu/thiet-ke-bao-bi',
    arrow: 'arrow-curve-img1.png',
  },
  {
    icon: 'working-process-icon2.png',
    step: 'Bước 02',
    title: 'Duyệt mẫu và chốt báo giá',
    text: 'Chúng tôi gửi bản dựng kèm quy cách: chất liệu, sóng carton, kỹ thuật in và gia công. Duyệt test proof trên đúng chất liệu trước khi chạy sản lượng.',
    href: '/bang-gia',
    arrow: 'arrow-curve-img2.png',
  },
  {
    icon: 'working-process-icon3.png',
    step: 'Bước 03',
    title: 'Sản xuất tại xưởng và giao hàng',
    text: 'In, bế, cán màng và gấp dán đều làm tại xưởng nên kiểm soát được tiến độ. Giao hàng toàn quốc, nhận hàng kiểm tra rồi thanh toán.',
    href: '/dich-vu/gia-cong-sau-in',
    arrow: null,
  },
];

/** section.working-process trong template Printop — dùng lại ở mọi trang cần quy trình đặt in */
export default function WorkingProcess({
  steps = defaultProcessSteps,
  eyebrow = 'Quy trình',
  heading = 'Quy trình đặt in tại Thời Đại',
  sectionClassName = 'working-process py-120',
}: {
  steps?: ProcessStep[];
  eyebrow?: string;
  heading?: string;
  sectionClassName?: string;
}) {
  return (
    <section className={sectionClassName}>
      <div className="container">
        <div className="section-heading tw-mb-10 text-center">
          <span className="subtitle border border-main-600 rounded-pill tw-px-5 tw-py-105 text-main-600 d-inline-flex align-items-center tw-gap-105 text-uppercase tw-leading-none bg-white">
            <i className="ph-fill ph-caret-double-right"></i>
            {eyebrow}
          </span>
          <h2 className="text-reveal fw-semibold tw-mt-4">{heading}</h2>
        </div>

        <div className="row gy-4">
          {steps.map((step) => (
            <div className="col-lg-4 col-sm-6" key={step.step}>
              <div className="working-process text-center group group-item position-relative animation-item h-100 d-flex flex-column">
                {step.arrow && (
                  <div className="position-absolute tw-start-75-percent top-0 tw-mt-10 min-w-max d-xl-block d-none">
                    <img src={`/assets/images/shapes/${step.arrow}`} alt="" className="left-right-animation" />
                  </div>
                )}
                <div className="tw-w-116-px tw-h-116-px mx-auto">
                  <span className="tw-w-116-px tw-h-116-px bg-neutral-50 d-flex justify-content-center align-items-center rounded-circle tw-duration-300 group-hover-bg-main-two-600">
                    <img src={`/assets/images/icons/${step.icon}`} alt="" className="group-hover-item-text-invert-white tw-duration-300 animate__heartBeat" />
                  </span>
                  <span className="bg-main-600 rounded-pill tw-px-4 tw-py-1 text-white tw-text-sm fw-medium translate-y--8-px">{step.step}</span>
                </div>
                <h2 className="h4 tw-mt-5 tw-mb-6 tw-pt-8">{step.title}</h2>
                <p className="text-body max-w-380-px mx-auto">{step.text}</p>
                <Link href={step.href} className="text-heading fw-semibold d-inline-flex align-items-center tw-gap-3 hover-text-heading tw-mt-10 hover-common-underline mt-auto">
                  Xem thêm
                  <span className="btn-down-arrow"><i className="ph-bold ph-arrow-down-right"></i></span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
