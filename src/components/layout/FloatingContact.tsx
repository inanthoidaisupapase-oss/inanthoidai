import { site } from '@/lib/site';

/**
 * Nút Zalo + gọi điện nổi góc dưới trái — không có trong template Printop gốc,
 * thêm mới theo yêu cầu, đặt đối xứng với nút lên đầu trang (.progress-wrap,
 * main.css:6364) đang chiếm góc dưới phải để 2 bên cân xứng thay vì chồng nhau.
 * Nút Zalo dùng logo chính thức do người dùng cung cấp (xem
 * docs/IMAGE-GUIDE.md), thay cho icon ph-chat-circle-dots chung chung lúc
 * đầu — nền dùng đúng màu xanh thương hiệu Zalo (#0068FF, không thuộc bảng
 * màu Printop nhưng là bản sắc riêng của Zalo, cùng cách xử lý như đã giữ
 * đỏ thương hiệu cho nút gọi điện). zalo-icon.webp vốn đã là ảnh 2 tông (nền
 * bo góc trắng + biểu tượng/chữ xanh, 4 góc ngoài trong suốt — kiểm bằng PIL,
 * không phải hình 1 màu xanh trên nền trong suốt như tưởng lúc đầu), nên giữ
 * nguyên màu gốc của ảnh thay vì lật filter — lật sẽ xoá mất chi tiết vì cả
 * phần trắng lẫn xanh đều quy về cùng 1 màu khi qua brightness(0)/invert(1). */
export default function FloatingContact() {
  return (
    <div className="floating-contact-widget position-fixed d-flex flex-column tw-gap-3">
      <a
        href={`https://zalo.me/${site.zalo.replace(/\s/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat Zalo ${site.zalo}`}
        className="floating-contact-btn floating-contact-btn--zalo tw-w-13 tw-h-13 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 common-shadow"
      >
        <img src="/assets/images/icons/zalo-icon.webp" alt="Zalo" className="floating-contact-btn-icon" />
      </a>
      <a
        href={`tel:${site.hotlineTel}`}
        aria-label={`Gọi hotline ${site.hotline}`}
        className="floating-contact-btn tw-w-13 tw-h-13 rounded-circle bg-main-600 text-white d-flex align-items-center justify-content-center flex-shrink-0 common-shadow tw-text-2xl"
      >
        <i className="ph-fill ph-phone-call"></i>
      </a>
    </div>
  );
}
