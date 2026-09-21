'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import type { Department, TeamMember } from '@/lib/team-data';
import { site } from '@/lib/site';

/**
 * Carousel nhân viên bên trong panel bộ phận (TeamDepartments.tsx) — cấu trúc và tham số
 * Swiper lấy nguyên từ mẫu layout-15.html (Slider-Layouts/layout-15, khác Printop) và file
 * thật của mẫu tại .../layout-15/assest/js/script.js, không đoán:
 * effect "coverflow" (rotate 50, stretch 0, depth 100, modifier 1, slideShadows true),
 * grabCursor, centeredSlides, slidesPerView "auto", autoplay delay 2500ms
 * (disableOnInteraction false), breakpoints 280/380/576/640 → 1 slide,
 * 768 → 2, 992/1024 → 3, 1140 → 4 (assest/css/style.css: .swiper-slide rộng 300px).
 *
 * Lệch có chủ đích so với mẫu: script.js gốc khai báo pagination.el=".swiper-pagination"
 * nhưng layout-15.html KHÔNG có phần tử đó trong DOM — dots không bao giờ hiện ở bản gốc.
 * Bật pagination thật (clickable, phần tử tự quản bởi swiper/react) giống mọi slider khác
 * của site (GallerySlider/BlogSlider/TestimonialsCards) thay vì chép nguyên chỗ thiếu đó;
 * main.css:892 đã tự style .swiper-pagination-bullet theo đúng màu thương hiệu sẵn có.
 */
const COVERFLOW_EFFECT = { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true };
const BREAKPOINTS = {
  280: { slidesPerView: 1 },
  380: { slidesPerView: 1 },
  576: { slidesPerView: 1 },
  640: { slidesPerView: 1 },
  768: { slidesPerView: 2 },
  992: { slidesPerView: 3 },
  1024: { slidesPerView: 3 },
  1140: { slidesPerView: 4 },
} as const;

/**
 * Chưa có mạng xã hội riêng của từng nhân viên (xem lib/team-data.ts) — dùng đúng kênh thật
 * của công ty (site.social, đã hiện ở Header.tsx: Facebook/YouTube/TikTok) làm mặc định,
 * KHÔNG bịa link cá nhân. Khi có social riêng của nhân viên, ưu tiên link đó (chỉ Facebook có
 * chỗ trong kiểu TeamMember hiện tại). Mẫu gốc có 4 icon (Facebook/Instagram/Twitter/Dribbble)
 * nhưng site chỉ có thật 3 kênh — bớt icon theo đúng yêu cầu, không giữ kênh không có thật.
 */
function MemberSocialLinks({ member }: { member: TeamMember }) {
  const links = [
    { href: member.social?.facebook || site.social.facebook, icon: 'ph-fill ph-facebook-logo', label: 'Facebook' },
    { href: site.social.youtube, icon: 'ph-fill ph-youtube-logo', label: 'YouTube' },
    { href: site.social.tiktok, icon: 'ph-fill ph-tiktok-logo', label: 'TikTok' },
  ];
  return (
    <div className="d-flex align-items-center justify-content-center team-carousel-social">
      {links.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} className="text-white">
          <i className={link.icon}></i>
        </a>
      ))}
    </div>
  );
}

function MemberSlide({ member }: { member: TeamMember }) {
  return (
    <div className="team-carousel-member">
      <div className="position-relative overflow-hidden tw-rounded-md tw-mb-5 team-carousel-media">
        {member.photoUrl ? (
          <img
            src={member.photoUrl}
            alt={member.name}
            className="team-carousel-photo w-100 h-100 object-fit-cover"
          />
        ) : (
          <span className="team-carousel-photo w-100 h-100 d-flex align-items-center justify-content-center bg-neutral-50 text-neutral-300">
            <i className="ph-bold ph-user tw-text-3xl"></i>
          </span>
        )}
        <div className="w-100 h-100 d-flex flex-column justify-content-end align-items-center team-carousel-overlay">
          <MemberSocialLinks member={member} />
        </div>
      </div>
      <div className="text-center">
        <span className="text-heading fw-semibold text-capitalize tw-text-2xl d-block">{member.name}</span>
        <span className="text-neutral-500 tw-text-base d-block">{member.role}</span>
      </div>
    </div>
  );
}

export default function TeamMemberCarousel({ department }: { department: Department }) {
  if (department.members.length === 0) {
    return (
      <div className="text-center tw-py-10">
        <i className="ph-bold ph-users-three tw-text-3xl text-neutral-300 tw-mb-4 d-block"></i>
        <p className="text-neutral-500 mb-0">
          Đang cập nhật danh sách nhân sự {department.name.toLowerCase()}.
        </p>
      </div>
    );
  }

  return (
    <div className="team-carousel-wrap">
      <Swiper
        className="team-carousel"
        modules={[Autoplay, EffectCoverflow, Pagination]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        coverflowEffect={COVERFLOW_EFFECT}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={BREAKPOINTS}
      >
        {department.members.map((member) => (
          <SwiperSlide key={member.id} className="team-carousel-slide tw-w-300-px">
            <MemberSlide member={member} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
