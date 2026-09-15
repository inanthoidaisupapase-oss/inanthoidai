/**
 * Port các hành vi JS của template Printop (assets/js/main.js) sang TypeScript thuần,
 * bỏ jQuery. Chỉ gồm phần KHÔNG liên quan tới slider (đã thay bằng swiper/react)
 * và KHÔNG liên quan tới giỏ hàng (đã thay bằng React state).
 *
 * Mọi tham số dưới đây đọc trực tiếp từ main.js gốc, không phỏng đoán.
 */

type Cleanup = () => void;

/** main.js: $(".background-img").css("background", "url(" + data-background-image + ")") */
function backgroundImages(): Cleanup {
  document.querySelectorAll<HTMLElement>('.background-img').forEach((el) => {
    const url = el.dataset.backgroundImage;
    if (url) el.style.background = `url(${url})`;
  });
  return () => {};
}

/** main.js: .custom-accordion-item__button -> bỏ active ở tất cả, thêm vào item hiện tại */
function customAccordion(): Cleanup {
  const onClick = (e: Event) => {
    const btn = (e.target as HTMLElement).closest('.custom-accordion-item__button');
    if (!btn) return;
    const parent = btn.closest('.custom-accordion-item');
    document.querySelectorAll('.custom-accordion-item').forEach((i) => i.classList.remove('active'));
    parent?.classList.add('active');
    parent?.querySelector<HTMLInputElement>('input[type="radio"]')?.setAttribute('checked', 'true');
  };
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}

/** main.js: .increment-btn / .decrement-btn cập nhật .input-value (không xuống dưới 0) */
function quantityButtons(): Cleanup {
  const onClick = (e: Event) => {
    const target = e.target as HTMLElement;
    const inc = target.closest('.increment-btn');
    const dec = target.closest('.decrement-btn');
    if (!inc && !dec) return;
    const wrap = (inc ?? dec)!.parentElement;
    const input = wrap?.querySelector<HTMLInputElement>('.input-value');
    if (!input) return;
    const count = parseInt(input.value, 10) || 0;
    if (inc) input.value = String(count + 1);
    else if (count > 0) input.value = String(count - 1);
    input.dispatchEvent(new Event('change', { bubbles: true }));
  };
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}

/** main.js: .toggle-btn tự toggle class active (dùng cho nút yêu thích, so sánh…) */
function toggleButtons(): Cleanup {
  const onClick = (e: Event) => {
    const btn = (e.target as HTMLElement).closest('.toggle-btn');
    if (btn) btn.classList.toggle('active');
  };
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}

/** main.js: .category-button mở .category-dropdown, click ra ngoài thì đóng */
function categoryDropdown(): Cleanup {
  const button = document.querySelector<HTMLElement>('.category-button');
  const dropdown = document.querySelector<HTMLElement>('.category-dropdown');
  if (!button || !dropdown) return () => {};
  const onButton = (e: Event) => {
    e.stopPropagation();
    button.classList.toggle('active');
    dropdown.classList.toggle('active');
  };
  const onDropdown = (e: Event) => {
    e.stopPropagation();
    button.classList.add('active');
    dropdown.classList.add('active');
  };
  const onBody = () => {
    button.classList.remove('active');
    dropdown.classList.remove('active');
  };
  button.addEventListener('click', onButton);
  dropdown.addEventListener('click', onDropdown);
  document.body.addEventListener('click', onBody);
  return () => {
    button.removeEventListener('click', onButton);
    dropdown.removeEventListener('click', onDropdown);
    document.body.removeEventListener('click', onBody);
  };
}

/** main.js: .category-btn mở .banner-inner__sidebar (sidebar danh mục trên mobile) */
function sidebarToggle(): Cleanup {
  const onClick = (e: Event) => {
    const target = e.target as HTMLElement;
    const sidebar = document.querySelector('.banner-inner__sidebar');
    const overlay = document.querySelector('.side-overlay');
    if (target.closest('.category-btn')) {
      sidebar?.classList.toggle('active');
      overlay?.classList.toggle('show');
    } else if (target.closest('.side-overlay')) {
      sidebar?.classList.remove('active');
      overlay?.classList.remove('show');
    }
    const listItem = target.closest('.sidebar-list-item');
    if (listItem) listItem.querySelector('.sidebar-dropdown-menu')?.classList.toggle('active');
  };
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}

/** main.js: header nhận class .fixed-header khi scrollTop >= 260 */
function stickyHeader(): Cleanup {
  const onScroll = () => {
    const header = document.querySelector('.header');
    if (!header) return;
    header.classList.toggle('fixed-header', window.scrollY >= 260);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}

/** main.js: .blur-bottom-shadow ẩn đi khi cuộn chạm đáy trang */
function blurBottomShadow(): Cleanup {
  const onScroll = () => {
    const el = document.querySelector<HTMLElement>('.blur-bottom-shadow');
    if (!el) return;
    const atBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 5;
    el.style.opacity = atBottom ? '0' : '1';
    el.style.visibility = atBottom ? 'hidden' : 'visible';
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}

/**
 * main.js: counterup với IntersectionObserver threshold 1, duration 1500, delay 16.
 * Thay thư viện counterup.min.js bằng requestAnimationFrame, tôn trọng prefers-reduced-motion.
 */
function counters(): Cleanup {
  const els = document.querySelectorAll<HTMLElement>('.counter');
  if (!els.length) return () => {};
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (!entry.isIntersecting || el.classList.contains('is-visible')) return;
        el.classList.add('is-visible');
        const raw = (el.textContent ?? '').trim();
        const target = parseFloat(raw.replace(/[^\d.]/g, ''));
        if (Number.isNaN(target)) return;
        const suffix = raw.replace(/[\d.,\s]/g, '');
        if (reduced) { el.textContent = target.toLocaleString('vi-VN') + suffix; return; }
        const duration = 1500;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const value = Math.floor(target * p);
          el.textContent = value.toLocaleString('vi-VN') + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target.toLocaleString('vi-VN') + suffix;
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 1 },
  );
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}


/**
 * main.js: ở width <= 991, bấm .has-submenu thì toggle class active và xổ
 * .nav-submenu, đồng thời đóng các mục anh em. Trên desktop không gắn sự kiện
 * (menu xổ bằng hover trong CSS).
 */
function mobileSubmenu(): Cleanup {
  const onClick = (e: Event) => {
    if (window.innerWidth > 991) return;
    const item = (e.target as HTMLElement).closest('.has-submenu');
    if (!item) return;
    const link = (e.target as HTMLElement).closest('.nav-menu__link');
    if (!link) return;
    e.preventDefault();
    const willOpen = !item.classList.contains('active');
    item.parentElement?.querySelectorAll(':scope > .has-submenu').forEach((sib) => {
      if (sib !== item) sib.classList.remove('active');
    });
    item.classList.toggle('active', willOpen);
  };
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}


/**
 * main.js: Typed.js cho .typed-text — giữ nguyên tham số gốc
 * (typeSpeed 60, backSpeed 40, backDelay 1500, startDelay 500, loop, ẩn con trỏ).
 * Chỉ thay nội dung chuỗi sang tiếng Việt.
 */
function typedText(): Cleanup {
  const el = document.querySelector('.typed-text');
  const Typed = (window as unknown as { Typed?: new (sel: string, o: Record<string, unknown>) => { destroy: () => void } }).Typed;
  if (!el || !Typed) return () => {};
  const instance = new Typed('.typed-text', {
    strings: ['sáng tạo', 'bền đẹp', 'đúng hẹn'],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1500,
    startDelay: 500,
    loop: true,
    showCursor: false,
  });
  return () => instance.destroy();
}

/** Chạy toàn bộ hành vi template cho trang hiện tại. Trả về hàm dọn dẹp. */
export function initTemplateBehaviors(): Cleanup {
  const cleanups = [
    backgroundImages(),
    customAccordion(),
    quantityButtons(),
    toggleButtons(),
    categoryDropdown(),
    sidebarToggle(),
    mobileSubmenu(),
    stickyHeader(),
    blurBottomShadow(),
    counters(),
    typedText(),
  ];
  return () => cleanups.forEach((fn) => fn());
}
