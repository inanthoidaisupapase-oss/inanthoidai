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
    // main.js gốc luôn giữ dropdown mở khi click bên trong (stopPropagation).
    // Khác với template tĩnh (click link = full page reload), item trong dropdown
    // giờ là <Link> điều hướng client-side, DOM header không unmount — nếu vẫn giữ
    // "active" thì dropdown xổ ra đè lên trang mới. Click vào link thật thì bỏ qua,
    // để sự kiện nổi lên onBody đóng dropdown; click vùng khác trong dropdown thì
    // giữ nguyên hành vi gốc.
    if ((e.target as HTMLElement).closest('a[href]')) return;
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

/**
 * main.js: header nhận class .fixed-header khi scrollTop >= 260, và
 * .blur-bottom-shadow ẩn đi khi cuộn chạm đáy trang. Gộp 2 hiệu ứng cuộn này
 * vào MỘT listener 'scroll' (thay vì 2 listener riêng như trước) và chạy qua
 * requestAnimationFrame để dồn mọi lần đọc DOM (scrollY, innerHeight,
 * body.scrollHeight — đọc body.scrollHeight ép reflow) vào tối đa 1 lần mỗi
 * khung hình, tránh giật khi cuộn nhanh trên máy yếu. Không đổi ngưỡng/điều
 * kiện hiển thị so với bản gốc, chỉ đổi tần suất tính toán.
 */
function scrollEffects(): Cleanup {
  const header = document.querySelector<HTMLElement>('.header');
  let rafId = 0;
  const apply = () => {
    rafId = 0;
    if (header) header.classList.toggle('fixed-header', window.scrollY >= 260);
    const shadow = document.querySelector<HTMLElement>('.blur-bottom-shadow');
    if (shadow) {
      const atBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 5;
      shadow.style.opacity = atBottom ? '0' : '1';
      shadow.style.visibility = atBottom ? 'hidden' : 'visible';
    }
  };
  const onScroll = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(apply);
  };
  apply();
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => {
    window.removeEventListener('scroll', onScroll);
    if (rafId) cancelAnimationFrame(rafId);
  };
}

/**
 * Cả 3 hàng header (top-header-new, middle-header, .header/nav) nằm ngoài #smooth-wrapper
 * (xem layout.tsx) nên không còn chiếm chỗ trong luồng của #smooth-content như trước. Bù
 * lại bằng padding-top đúng bằng TỔNG chiều cao thực đo của cả 3 hàng, để section đầu trang
 * không bị header đè lên. Theo dõi bằng ResizeObserver (thay vì tính 1 lần) vì chiều cao đổi
 * theo breakpoint và theo trạng thái .fixed-header của hàng nav.
 *
 * Trang nào có section đầu tiên tự mang margin-top riêng của main.css gốc (vd .breadcrumb
 * margin-top: 142/160px — file gốc, không được sửa) thì KHÔNG được cộng thẳng padding-top =
 * total lên trên margin đó: padding chặn margin-collapse, ra khoảng trắng thừa = total +
 * margin thay vì max(total, margin) như bản HTML tĩnh gốc (không có JS bù) tự nhiên đạt được.
 * Trừ trước margin-top của phần tử con đầu tiên (clamp về 0) để padding-top + margin-top con
 * luôn cộng lại đúng bằng max(total, margin) — tái tạo đúng hiệu ứng margin-collapse gốc mà
 * không cần đổi paddingTop thành marginTop (marginTop không tính vào offsetHeight, đổi qua có
 * thể làm GSAP ScrollSmoother đo sai chiều cao spacer/scroll).
 */
function headerOffset(): Cleanup {
  const rows = ['.top-header-new', '.middle-header', '.header']
    .map((sel) => document.querySelector<HTMLElement>(sel))
    .filter((el): el is HTMLElement => el !== null);
  const content = document.getElementById('smooth-content');
  if (!rows.length || !content) return () => {};
  const apply = () => {
    const total = rows.reduce((sum, el) => sum + el.offsetHeight, 0);
    const firstChild = content.firstElementChild as HTMLElement | null;
    const firstChildMarginTop = firstChild ? parseFloat(getComputedStyle(firstChild).marginTop) || 0 : 0;
    content.style.paddingTop = `${Math.max(0, total - firstChildMarginTop)}px`;
  };
  apply();
  const ro = new ResizeObserver(apply);
  rows.forEach((el) => ro.observe(el));
  window.addEventListener('resize', apply);
  return () => {
    ro.disconnect();
    window.removeEventListener('resize', apply);
    content.style.paddingTop = '';
  };
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
    scrollEffects(),
    headerOffset(),
    counters(),
    typedText(),
  ];
  return () => cleanups.forEach((fn) => fn());
}
