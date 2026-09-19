'use client';

import { useEffect, useId, useRef, useState } from 'react';

type FaqItem = { q: string; a: string };

// main.css:176 .common-accordion .accordion-item — không có bootstrap.bundle.min.js trong
// dự án (chỉ nạp bootstrap.min.css theo quy ước, xem CLAUDE.md), nên tự dựng lại đúng hành vi
// Collapse của Bootstrap bằng React: toggle class collapsing/collapse/show + animate height,
// khớp transition gốc `.collapsing{transition:height .35s ease}` (bootstrap.min.css, không sửa).
const COLLAPSE_DURATION_MS = 350;

function AccordionPanel({
  id,
  headingId,
  isOpen,
  children,
}: {
  id: string;
  headingId: string;
  isOpen: boolean;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const didMount = useRef(false);
  // Chỉ dùng để render class "show" ban đầu (SSR/lần render đầu, item đầu mở sẵn) — không
  // đổi theo isOpen sau đó, để className JSX không "đè" lên animate thủ công bên dưới.
  const [initialOpen] = useState(isOpen);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    // Lần render đầu: class đã đúng nhờ initialOpen ở JSX, không cần làm gì thêm.
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    let raf1 = 0;
    let raf2 = 0;

    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName !== 'height' || e.target !== el) return;
      el.classList.remove('collapsing');
      el.classList.add('collapse');
      el.classList.toggle('show', isOpen);
      el.style.height = '';
      el.removeEventListener('transitionend', onTransitionEnd);
    };
    el.addEventListener('transitionend', onTransitionEnd);

    if (isOpen) {
      el.classList.remove('collapse', 'show');
      el.classList.add('collapsing');
      el.style.height = '0px';
      // Cần 1 frame đã "chốt" trạng thái height:0 trước khi đổi sang scrollHeight,
      // nếu không trình duyệt gộp 2 lần đổi làm mất hẳn animation.
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          el.style.height = `${el.scrollHeight}px`;
        });
      });
    } else {
      el.style.height = `${el.scrollHeight}px`;
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          el.classList.remove('collapse', 'show');
          el.classList.add('collapsing');
          el.style.height = '0px';
        });
      });
    }

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      el.removeEventListener('transitionend', onTransitionEnd);
    };
  }, [isOpen]);

  return (
    <div
      id={id}
      ref={panelRef}
      role="region"
      aria-labelledby={headingId}
      className={`accordion-collapse collapse${initialOpen ? ' show' : ''}`}
    >
      <div className="accordion-body">{children}</div>
    </div>
  );
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [transitioning, setTransitioning] = useState(false);
  const baseId = useId().replace(/:/g, '');

  const handleToggle = (index: number) => {
    // Chặn click dồn dập trong lúc đang animate — khớp Collapse gốc của Bootstrap,
    // tránh giật layout khi 1 panel đang nửa chừng đóng/mở lại bị đổi hướng.
    if (transitioning) return;
    setTransitioning(true);
    setOpenIndex((current) => (current === index ? null : index));
    setTimeout(() => setTransitioning(false), COLLAPSE_DURATION_MS);
  };

  return (
    <div className="accordion common-accordion" id={`faq-accordion-${baseId}`}>
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        const headingId = `faq-heading-${baseId}-${index}`;
        const panelId = `faq-collapse-${baseId}-${index}`;
        return (
          <div className="accordion-item bg-neutral-100" key={item.q}>
            <h2 className="accordion-header h4" id={headingId}>
              <button
                type="button"
                className={`accordion-button h4${isOpen ? '' : ' collapsed'}`}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(index)}
              >
                {item.q}
              </button>
            </h2>
            <AccordionPanel id={panelId} headingId={headingId} isOpen={isOpen}>
              <p className="text-body-6 tw-text-lg">{item.a}</p>
            </AccordionPanel>
          </div>
        );
      })}
    </div>
  );
}
