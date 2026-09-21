'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { Department } from '@/lib/team-data';
import TeamMemberCarousel from './TeamMemberCarousel';

// Cùng thời lượng animate height với AccordionPanel trong FaqAccordion.tsx (khớp
// bootstrap.min.css .collapsing{transition:height .35s ease}, không sửa file đó) — panel
// bộ phận này không dùng markup .accordion-collapse của Bootstrap (đây là 1 panel full-width
// dùng chung cho cả hàng 4 khối, không phải accordion-item riêng từng khối) nhưng vẫn giữ
// đúng thời lượng cho nhất quán cảm giác giữa 2 nơi.
const PANEL_DURATION_MS = 350;

function TeamPanel({
  id,
  labelledBy,
  activeIndex,
  children,
}: {
  id: string;
  labelledBy: string | undefined;
  activeIndex: number | null;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  // Chiều cao (px) đã "chốt" ở lần chạy effect trước — điểm bắt đầu animate cho lần đổi
  // tiếp theo. Không đọc trực tiếp lúc render vì cần đúng giá trị TRƯỚC khi nội dung mới
  // (bộ phận khác) đã kịp thay thế trong DOM.
  const prevHeightRef = useRef(0);
  const isFirstRun = useRef(true);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    // Panel luôn đóng sẵn (height 0) ở lần render đầu vì chưa bộ phận nào được mở — bỏ qua
    // animate cho lần chạy effect đầu tiên để tránh hiệu ứng "phồng lên" giả khi vừa vào trang.
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const isOpen = activeIndex !== null;
    const startHeight = prevHeightRef.current;
    const targetHeight = isOpen ? el.scrollHeight : 0;

    // Khoá về chiều cao TRƯỚC đó (số cụ thể, kể cả khi vừa là 'auto' của bộ phận cũ) rồi ép
    // reflow, để trình duyệt có điểm bắt đầu hợp lệ mà animate — đổi thẳng 'auto' sang số mới
    // sẽ nhảy khựng vì CSS không nội suy được từ 'auto'. Nhờ vậy chuyển thẳng giữa 2 bộ phận
    // (đang mở A bấm sang B) cũng ra đúng 1 chuyển động mượt thay vì đóng rồi mở lại.
    el.style.height = `${startHeight}px`;
    void el.offsetHeight;

    const raf = requestAnimationFrame(() => {
      el.style.height = `${targetHeight}px`;
    });

    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName !== 'height' || e.target !== el) return;
      // Mở xong: thả về 'auto' để nội dung co giãn tự nhiên nếu sau đó đổi kích thước cửa sổ.
      // Đóng xong: giữ nguyên 0.
      el.style.height = isOpen ? 'auto' : '0px';
      prevHeightRef.current = isOpen ? el.scrollHeight : 0;
      // Nội dung panel vừa đổi chiều cao trang — làm mới vị trí trigger của AOS/ScrollTrigger
      // cho các phần tử nằm phía dưới, cùng cách TemplateRuntime.tsx làm sau khi ảnh/font tải
      // xong.
      window.AOS?.refreshHard();
      window.ScrollTrigger?.refresh();
    };
    el.addEventListener('transitionend', onTransitionEnd);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('transitionend', onTransitionEnd);
    };
  }, [activeIndex]);

  return (
    <div
      id={id}
      ref={panelRef}
      role="region"
      aria-labelledby={labelledBy}
      aria-live="polite"
      className="team-department-panel"
      style={{ height: 0 }}
    >
      <div className="tw-pt-8">{children}</div>
    </div>
  );
}

export default function TeamDepartments({ departments }: { departments: Department[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const baseId = useId().replace(/:/g, '');
  const panelId = `team-panel-${baseId}`;

  const handleToggle = (index: number) => {
    // Chặn click dồn dập trong lúc đang animate — khớp cách FaqAccordion.tsx làm, tránh giật
    // layout khi panel đang nửa chừng đóng/mở lại bị đổi hướng.
    if (transitioning) return;
    setTransitioning(true);
    setOpenIndex((current) => (current === index ? null : index));
    setTimeout(() => setTransitioning(false), PANEL_DURATION_MS);
  };

  const activeDepartment = openIndex !== null ? departments[openIndex] : null;
  const activeTabId = openIndex !== null ? `team-tab-${baseId}-${openIndex}` : undefined;

  return (
    <>
      <div className="row gy-4">
        {departments.map((department, index) => {
          const isOpen = index === openIndex;
          const tabId = `team-tab-${baseId}-${index}`;
          return (
            <div className="col-lg-3 col-sm-6" key={department.id}>
              <button
                type="button"
                id={tabId}
                className={`team-department-block bg-neutral-50 tw-rounded-2xl tw-p-8 h-100 w-100 border border-neutral-100${
                  isOpen ? ' team-department-block--active' : ''
                }`}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(index)}
              >
                <span className="tw-w-16 tw-h-16 bg-main-600 text-white rounded-circle d-flex justify-content-center align-items-center tw-text-2xl tw-mb-5">
                  <i className={department.icon}></i>
                </span>
                <h3 className="h5 tw-mb-3">{department.name}</h3>
                <p className="text-neutral-500 mb-0">{department.text}</p>
              </button>
            </div>
          );
        })}
      </div>

      <TeamPanel id={panelId} labelledBy={activeTabId} activeIndex={openIndex}>
        {activeDepartment && (
          // key=department.id: ép React unmount/mount lại Swiper mỗi lần đổi bộ phận thay vì
          // tái dùng chung 1 instance với slide mới — pagination.el và coverflow cần khởi tạo
          // lại đúng theo danh sách nhân viên mới, không tự cập nhật theo props đổi giữa chừng.
          <TeamMemberCarousel department={activeDepartment} key={activeDepartment.id} />
        )}
      </TeamPanel>
    </>
  );
}
