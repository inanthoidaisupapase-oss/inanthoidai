'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

/**
 * Thay cho jQuery magnificPopup(".play-button", { type:"iframe", removalDelay:300, mainClass:"mfp-fade" })
 * của template gốc (printop/assets/js/main.js:1162) — dùng lại đúng class/CSS
 * magnific-popup.css có sẵn (mfp-bg/mfp-wrap/mfp-fade/mfp-ready/mfp-removing)
 * để khớp hiệu ứng fade 300ms gốc, chỉ thay cơ chế bằng React state.
 *
 * Plugin gốc (printop/assets/js/magnific-popup.min.js) append .mfp-wrap/.mfp-bg
 * thẳng vào document.body (grep "appendTo"/"document.body" xác nhận), không
 * render tại vị trí gọi — bắt buộc dùng createPortal vào body, nếu không
 * position:fixed sẽ bị khối cha (bất kỳ ancestor nào lỡ tạo containing block
 * mới) bẫy lại, popup thu nhỏ và trôi ngay cạnh nút bấm thay vì full-viewport.
 */
function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

const REMOVAL_DELAY = 300;

export default function VideoPopup({
  url,
  className,
  children,
}: {
  url: string;
  className?: string;
  children: ReactNode;
}) {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'ready' | 'removing'>('closed');
  const videoId = getYouTubeId(url);
  const isOpen = phase !== 'closed';

  const close = () => {
    setPhase((p) => (p === 'closed' || p === 'removing' ? p : 'removing'));
    window.setTimeout(() => setPhase('closed'), REMOVAL_DELAY);
  };

  useEffect(() => {
    if (phase !== 'opening') return;
    const raf = requestAnimationFrame(() => setPhase('ready'));
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  if (!videoId) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  const active = phase === 'ready';
  const readyClass = phase === 'ready' ? ' mfp-ready' : phase === 'removing' ? ' mfp-removing' : '';

  return (
    <>
      <a
        href={url}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          setPhase('opening');
        }}
      >
        {children}
      </a>

      {phase !== 'closed' &&
        createPortal(
          <>
            <div className={`mfp-bg mfp-fade${readyClass}`} onClick={close} />
            <div className={`mfp-wrap mfp-fade mfp-iframe-holder${readyClass}`} onClick={close} role="dialog" aria-modal="true">
              <div className="mfp-container">
                <div className="mfp-content" onClick={(e) => e.stopPropagation()}>
                  <button type="button" title="Close (Esc)" className="mfp-close" onClick={close}>
                    &times;
                  </button>
                  <div className="mfp-iframe-scaler">
                    {active && (
                      <iframe
                        className="mfp-iframe"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        frameBorder="0"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                        title="Video giới thiệu"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
