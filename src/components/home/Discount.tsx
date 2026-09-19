'use client';

import { useEffect, useState } from 'react';

const HOUR_MS = 60 * 60 * 1000;
const MINUTE_MS = 60 * 1000;

/** Đếm ngược lặp lại theo chu kỳ cố định — hết vòng thì tự bắt đầu lại,
 * không phải một hạn chót một lần rồi thôi. */
const CYCLE_MS = 2 * HOUR_MS;

/** Mốc neo chỉ để tính pha chu kỳ (modulo), không phải hạn chót thật —
 * mọi trình duyệt tính ra cùng một pha vì đều neo vào cùng một mốc. */
const CYCLE_ANCHOR_MS = new Date('2026-01-01T00:00:00').getTime();

type Remaining = { distance: number; hours: number; minutes: number; seconds: number };

/** Tính lại chênh lệch từ mốc neo mỗi lần gọi — không lưu số đếm lùi trong
 * state, nên reload giữa chừng vẫn ra đúng pha của chu kỳ hiện tại. */
function getRemaining(): Remaining {
  const elapsedInCycle = ((Date.now() - CYCLE_ANCHOR_MS) % CYCLE_MS + CYCLE_MS) % CYCLE_MS;
  const distance = CYCLE_MS - elapsedInCycle;
  return {
    distance,
    hours: Math.floor(distance / HOUR_MS),
    minutes: Math.floor((distance % HOUR_MS) / MINUTE_MS),
    seconds: Math.floor((distance % MINUTE_MS) / 1000),
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function Discount() {
  /** null ở lần render đầu trên server và trước khi hydrate xong, tránh lệch
   * nội dung server/client vì Date.now() khác nhau giữa 2 lần render. */
  const [remaining, setRemaining] = useState<Remaining | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const runTick = () => {
      setRemaining(getRemaining());
      setTick((t) => t + 1);
    };
    // setTimeout(0) thay vì gọi runTick() trực tiếp: tránh setState đồng bộ
    // ngay trong effect (react-hooks/set-state-in-effect), vẫn cập nhật ngay
    // sau khi mount xong chứ không đợi đủ 1 giây đầu tiên.
    const timeout = setTimeout(runTick, 0);
    const interval = setInterval(runTick, 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const isUrgent = !!remaining && remaining.distance < HOUR_MS;
  const boxClass = `deal-countdown__box tw-px-4 tw-h-11 ${isUrgent ? 'is-urgent' : 'bg-white'} tw-rounded-lg d-flex justify-content-center align-items-center text-heading fw-semibold tw-text-2xl`;

  return (
    <div className="discount-new tw-py-12 bg-primary-new">
      <div className="container max-w-1840-px">
        <div className="d-flex align-items-center tw-gap-6 justify-content-between flex-wrap">
          <div className="d-flex align-items-center tw-gap-5 flex-wrap">
            <div className="bg-white rounded-pill border border-neutral-100 tw-py-105 tw-px-4 d-inline-flex align-items-center tw-gap-3" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
              <div className="d-flex align-items-center tw-gap-205">
                <span className="text-primary-new d-sm-flex d-none tw-text-xl">
                  <i className="ph-fill ph-check-circle"></i>
                </span>
                <span className="text-primary-new tw-text-lg text-sm-res-14-px fw-semibold text-center">Ưu đãi</span>
              </div>
              <span className="border-end border-neutral-300 tw-h-5 tw-w-px"></span>
              <span className="text-neutral-500 tw-text-lg text-sm-res-14-px fw-normal text-center">Giảm 20%</span>
            </div>
            <p className="text-white fw-normal tw-text-2xl">Tiết kiệm chi phí thiết kế, in ấn và gia công — trọn gói tại một nơi.</p>
            <a href="javascript:void(0)" className="bg-white rounded-circle tw-w-13 tw-h-13 d-flex justify-content-center align-items-center tw-text-3xl text-primary-new hover-scale-2">
              <i className="ph-bold ph-arrow-up-right animate__heartBeat"></i>
            </a>
          </div>

          <div className="d-flex align-items-center tw-gap-6 flex-wrap">
            {remaining ? (
              <>
                <div className="d-flex align-items-center tw-gap-3 flex-wrap">
                  <span className="text-white fw-semibold tw-pe-2 d-lg-inline-flex d-none">KẾT THÚC SAU :</span>
                  {isUrgent && (
                    <span className="bg-white text-primary-new rounded-pill tw-px-3 tw-py-1 tw-text-sm fw-semibold">Sắp hết hạn!</span>
                  )}
                </div>
                <div className="d-flex align-items-center tw-gap-6 flex-wrap" id="countdown1">
                  <div className="d-flex align-items-center tw-gap-2">
                    <span key={`h-${tick}`} className={boxClass}>
                      <span className="hours">{pad(remaining.hours)}</span>
                    </span>
                    <span className="text-white fw-semibold">GIỜ</span>
                  </div>
                  <div className="d-flex align-items-center tw-gap-2">
                    <span key={`m-${tick}`} className={boxClass}>
                      <span className="minutes">{pad(remaining.minutes)}</span>
                    </span>
                    <span className="text-white fw-semibold">PHÚT</span>
                  </div>
                  <div className="d-flex align-items-center tw-gap-2">
                    <span key={`s-${tick}`} className={boxClass}>
                      <span className="seconds">{pad(remaining.seconds)}</span>
                    </span>
                    <span className="text-white fw-semibold">GIÂY</span>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
