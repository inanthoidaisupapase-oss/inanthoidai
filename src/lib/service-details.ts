import type { Service } from '@/types/content';

export type ServiceFeature = { icon: string; title: string; text: string };

export type ServiceDetail = {
  /** Đoạn mô tả tổng quan dài, khác summary ngắn dùng ở thẻ/preview */
  intro: string;
  /** Grid 4 lợi ích — icon lấy từ assets/images/icons/choose-us-iconN.png */
  features: ServiceFeature[];
  offerHeading: string;
  offerText: string;
  /** 6 dòng, chia 2 cột 3 dòng */
  checklist: string[];
  illustrations: [string, string];
  provide: { heading: string; paragraphs: string[] };
};

/**
 * TODO ảnh: 2 ảnh minh hoạ sản phẩm/quy trình thực tế riêng cho từng dịch vụ —
 * xem docs/IMAGE-GUIDE.md. Tạm dùng chung placeholder gốc của template
 * (service-details-img2/3.png), chưa có ảnh thật phân theo dịch vụ.
 */
const sharedIllustrations: [string, string] = [
  '/assets/images/thumbs/service-details-img2.png',
  '/assets/images/thumbs/service-details-img3.png',
];

/**
 * Nội dung mở rộng cho trang chi tiết dịch vụ (section.service-details của
 * template Printop) — KHÔNG thuộc bảng `services` trong docs/spec.md nên
 * không đi qua Supabase, cùng cách "content tĩnh ở tầng Next.js" đã dùng cho
 * milestones/strengths ở app/gioi-thieu/page.tsx. Thêm dịch vụ mới trong
 * Supabase Studio mà chưa có entry ở đây sẽ tự rơi về buildFallbackDetail().
 */
export const serviceDetails: Record<string, ServiceDetail> = {
  'in-offset': {
    intro:
      'In offset là kỹ thuật chủ lực tại xưởng Thời Đại cho các ấn phẩm cần độ chuẩn màu cao và số lượng lớn: catalogue, brochure, danh thiếp, lịch Tết và hộp giấy Duplex cao cấp. Mực được truyền qua tấm cao su trước khi lên giấy nên màu ổn định giữa các tờ in trong cùng một lệnh, phù hợp cho đơn hàng cần đồng nhất màu sắc trên số lượng lớn.',
    features: [
      { icon: 'choose-us-icon1.png', title: 'Chuẩn màu CMYK ổn định', text: 'Bản kẽm và mực được kiểm soát trước khi chạy máy, giữ màu đồng nhất giữa các tờ in trong cùng lệnh in.' },
      { icon: 'choose-us-icon2.png', title: 'Giá tốt khi in số lượng lớn', text: 'Chi phí bản kẽm chia đều trên số lượng in, đơn càng lớn đơn giá càng giảm.' },
      { icon: 'choose-us-icon3.png', title: 'Đa dạng gia công sau in', text: 'Cán màng, ép kim, phủ UV định hình, bế nổi — hoàn thiện ngay tại xưởng, không cần chuyển nơi khác.' },
      { icon: 'choose-us-icon4.png', title: 'Tư vấn quy cách giấy phù hợp', text: 'Chọn đúng loại giấy (Couche, Bristol, Ivory, Duplex...) và định lượng theo mục đích sử dụng.' },
    ],
    offerHeading: 'Ưu đãi khi in offset số lượng lớn',
    offerText:
      'Đơn hàng in offset số lượng lớn được áp dụng đơn giá theo bậc số lượng, tư vấn quy cách giấy và gia công phù hợp ngân sách trước khi lên máy.',
    checklist: [
      'Duyệt bài in mẫu (proof) trước khi chạy sản lượng',
      'Bản kẽm và mực được kiểm tra màu trước khi in',
      'Hỗ trợ chọn giấy đúng định lượng và mục đích sử dụng',
      'Gia công sau in trọn gói tại xưởng, không qua trung gian',
      'Giao hàng đúng tiến độ cam kết, toàn quốc',
      'Báo giá theo bậc số lượng, đơn càng lớn giá càng tốt',
    ],
    illustrations: sharedIllustrations,
    provide: {
      heading: 'Quy trình in offset tại xưởng Thời Đại',
      paragraphs: [
        'Từ file thiết kế, chúng tôi tách màu, xuất bản kẽm CMYK rồi canh khớp bản (register) trước khi chạy thử vài tờ để kiểm tra màu so với file gốc. Chỉ khi bài in mẫu đạt mới cho chạy sản lượng.',
        'Giấy được chọn theo mục đích: Couche và Bristol cho ấn phẩm quảng cáo, Ivory và Duplex 250–350gsm cho hộp giấy và hộp quà tặng. Với đơn hàng cần bề mặt cao cấp, chúng tôi tư vấn thêm cán màng bóng/mờ, ép kim hoặc phủ UV định hình ngay sau khi in.',
        'In offset phù hợp nhất với đơn hàng từ vài trăm bản trở lên vì chi phí bản kẽm được chia đều trên số lượng in — đơn nhỏ hoặc cần gấp trong ngày, đội ngũ sẽ tư vấn chuyển sang in kỹ thuật số hoặc in Flexo tuỳ sản phẩm.',
      ],
    },
  },

  'in-flexo': {
    intro:
      'In Flexo là kỹ thuật in nổi tốc độ cao, gần như mặc định cho thùng carton sóng, tem nhãn decal và túi màng phim in số lượng lớn tại xưởng Thời Đại. Mực nhanh khô nên in được liên tục ở tốc độ cao mà vẫn giữ logo và chữ sắc nét trên bề mặt carton.',
    features: [
      { icon: 'choose-us-icon1.png', title: 'Tốc độ in cao, giao nhanh', text: 'Mực Flexo khô nhanh, in liên tục không cần dừng máy chờ khô — rút ngắn thời gian giao hàng cho đơn số lượng lớn.' },
      { icon: 'choose-us-icon2.png', title: 'Bám mực tốt trên nhiều chất liệu', text: 'In được trên giấy kraft, carton sóng, màng phim và decal mà vẫn giữ độ bám mực ổn định.' },
      { icon: 'choose-us-icon3.png', title: 'Khuôn in dùng lại nhiều lần', text: 'Khuôn photopolymer khắc một lần, dùng lại cho các lần đặt hàng sau — tiết kiệm chi phí tái đặt.' },
      { icon: 'choose-us-icon4.png', title: 'Kiểm soát màu trước khi chạy', text: 'Hiệu chỉnh áp lực in và hệ thống màu trước khi chạy sản lượng để mực không bị lem hoặc thiếu.' },
    ],
    offerHeading: 'Ưu đãi làm khuôn khi đặt in Flexo dài hạn',
    offerText:
      'Khách hàng đặt in Flexo định kỳ được lưu khuôn tại xưởng và giữ nguyên đơn giá làm khuôn cho các lần đặt lại, không phát sinh chi phí mới mỗi đơn.',
    checklist: [
      'Tư vấn chuyển file thiết kế sang vector trước khi làm khuôn',
      'Khuôn in được lưu lại, dùng cho các lần đặt hàng tiếp theo',
      'Kiểm tra áp lực in trước khi chạy sản lượng lớn',
      'In được trên giấy kraft, carton sóng, màng phim và decal',
      'Sấy khô, cắt, gấp và hoàn thiện trọn gói tại xưởng',
      'Giao hàng đúng hẹn cho đơn thùng carton và tem nhãn số lượng lớn',
    ],
    illustrations: sharedIllustrations,
    provide: {
      heading: 'Quy trình in Flexo 4 bước tại xưởng',
      paragraphs: [
        'Thiết kế được chuyển sang vector để giữ độ sắc nét trước khi khắc khuôn in bằng ánh sáng UV trên vật liệu photopolymer hoặc cao su.',
        'Khuôn được lắp lên máy in Flexo, canh chỉnh áp lực và hệ thống màu trước khi in thử vài mét đầu để kiểm tra độ bám mực và độ nét chữ, logo.',
        'Sau khi in đạt yêu cầu, sản phẩm được sấy khô, cắt, gấp và hoàn thiện ngay tại xưởng — phù hợp nhất cho thùng carton đóng gói, tem nhãn decal và túi màng phim số lượng lớn.',
      ],
    },
  },

  'thiet-ke-bao-bi': {
    intro:
      'Thiết kế bao bì tại Thời Đại luôn đi kèm quy cách sản xuất thật: dao bế, biên dán, nếp gấp và dung sai được tính sẵn để bản duyệt in ra đúng như file thiết kế. Dịch vụ được miễn phí cho mọi đơn in tại xưởng.',
    features: [
      { icon: 'choose-us-icon1.png', title: 'Miễn phí cho đơn in tại xưởng', text: 'Không tính phí thiết kế và dựng dao bế khi khách đặt in sản lượng tại xưởng Thời Đại.' },
      { icon: 'choose-us-icon2.png', title: 'Tính sẵn dao bế và biên dán', text: 'Kích thước hộp, nếp gấp và biên dán được tính trước để tránh bung mép hoặc nứt giấy khi gấp.' },
      { icon: 'choose-us-icon3.png', title: 'Dựng mẫu trước khi in thật', text: 'Gửi file dựng hoặc mẫu cắt tay để khách duyệt hình dáng trước khi lên khuôn sản lượng.' },
      { icon: 'choose-us-icon4.png', title: 'Đa dạng hạng mục bao bì', text: 'Hộp giấy, túi xách giấy, tem nhãn decal và tag treo — thiết kế đồng bộ một bộ nhận diện.' },
    ],
    offerHeading: 'Ưu đãi thiết kế trọn bộ nhận diện bao bì',
    offerText:
      'Đặt thiết kế đồng thời hộp giấy, túi xách và tem nhãn trong cùng một đơn được giữ đồng nhất phong cách và áp dụng ưu đãi thiết kế trọn bộ, không tính riêng từng hạng mục.',
    checklist: [
      'Biên dán tối thiểu 25mm để hộp không bị bung',
      'Nếp gấp tạo rãnh chuẩn, tránh nứt giấy sau cán màng',
      'Kích thước hộp dư 0.5–1cm so với sản phẩm để dễ đóng gói',
      'Logo đặt tránh mép gấp, hiển thị đủ trên mọi mặt hộp',
      'Gửi file dựng mẫu để khách duyệt trước khi in sản lượng',
      'Không lạm dụng nhiều hiệu ứng cùng lúc, tránh đội chi phí và nứt bề mặt',
    ],
    illustrations: sharedIllustrations,
    provide: {
      heading: 'Nguyên tắc thiết kế bao bì tại Thời Đại',
      paragraphs: [
        'Mỗi bản thiết kế đều được tính kèm dao bế và biên dán trước khi giao khách duyệt — biên dán tối thiểu 25mm để hộp không bị bung, nếp gấp tạo rãnh chuẩn để tránh nứt giấy sau khi cán màng.',
        'Với hộp giấy, hộp cứng nắp nam châm, hộp ngăn kéo hay hộp gấp gọn, kích thước bên trong luôn dư 0.5–1cm so với sản phẩm thật để dễ đóng gói mà không quá lỏng lẻo.',
        'Bên cạnh hộp giấy, đội thiết kế còn nhận túi xách giấy (quai giấy xoắn, quai dây dù, quai ruy băng, quai PP dẹt), tem nhãn decal và tag treo — thiết kế đồng bộ để khách có trọn bộ nhận diện bao bì thay vì từng món rời rạc.',
      ],
    },
  },

  'gia-cong-sau-in': {
    intro:
      'Gia công sau in là bước quyết định cảm giác cầm của sản phẩm cuối. Xưởng Thời Đại xử lý trọn gói cán màng, ép kim, phủ UV, bế nổi và gấp dán ngay tại một nơi, không phải chuyển qua nhiều xưởng khác nhau.',
    features: [
      { icon: 'choose-us-icon1.png', title: 'Trọn gói tại một xưởng', text: 'Cán màng, ép kim, bế nổi và gấp dán đều làm nội bộ, rút ngắn thời gian giao hàng.' },
      { icon: 'choose-us-icon2.png', title: 'Ép kim và phủ UV nhiều hiệu ứng', text: 'Làm nổi logo bằng nhũ ép kim hoặc tạo độ bóng cục bộ bằng phủ UV định hình.' },
      { icon: 'choose-us-icon3.png', title: 'Bồi giấy lên carton sóng B/C/BE', text: 'Bồi giấy Duplex 250–350gsm lên carton sóng, phù hợp hộp cứng và hộp quà cao cấp.' },
      { icon: 'choose-us-icon4.png', title: 'Gấp dán tự động hoặc dán tay', text: 'Chọn keo tự động cho sản lượng lớn hoặc dán tay tuỳ theo kết cấu hộp phức tạp.' },
    ],
    offerHeading: 'Ưu đãi gia công trọn gói cho đơn in tại xưởng',
    offerText:
      'Đơn hàng in tại xưởng Thời Đại được ưu tiên giá gia công trọn gói (cán màng, ép kim, bế nổi, gấp dán) thay vì tính riêng từng công đoạn như khi gia công rời.',
    checklist: [
      'Cán màng bóng hoặc mờ để bảo vệ bề mặt và tăng độ bền',
      'Ép kim nhiều màu nhũ, làm nổi logo và điểm nhấn cao cấp',
      'Phủ UV định hình tạo độ bóng cục bộ đúng vị trí cần nhấn',
      'Bế nổi, dập chìm tạo hiệu ứng chạm chuyên nghiệp',
      'Bồi giấy Duplex lên carton sóng B, C hoặc BE theo yêu cầu',
      'Duyệt test proof trên đúng chất liệu trước khi chạy sản lượng',
    ],
    illustrations: sharedIllustrations,
    provide: {
      heading: 'Các hạng mục gia công sau in',
      paragraphs: [
        'Cán màng bóng hoặc mờ giúp bảo vệ bề mặt in, tăng độ bền và cảm giác cầm chắc tay hơn cho hộp giấy và ấn phẩm quảng cáo.',
        'Ép kim làm nổi logo với nhiều màu nhũ khác nhau, thường dùng cho hộp quà và bao bì cao cấp; phủ UV định hình tạo độ bóng cục bộ ở đúng phần muốn nhấn mà không cần ép kim toàn bộ bề mặt.',
        'Với hộp cứng, chúng tôi bồi giấy Duplex 250–350gsm lên carton sóng B, C hoặc BE trước khi bế nổi hoặc dập chìm tạo hiệu ứng chạm. Vì màu in có thể lệch nhẹ giữa giấy thường và giấy đã cán màng, mọi đơn đều được duyệt test proof trên đúng chất liệu trước khi chạy sản lượng.',
      ],
    },
  },
};

/**
 * Dịch vụ mới thêm qua Supabase Studio nhưng chưa có entry ở serviceDetails
 * (bảng services trong docs/spec.md không có các cột features/checklist/...)
 * vẫn phải render được — dùng nội dung chung, không suy diễn thông tin cụ thể.
 */
export function getServiceDetail(service: Service): ServiceDetail {
  return (
    serviceDetails[service.slug] ?? {
      intro: service.summary,
      features: [
        { icon: 'choose-us-icon1.png', title: 'Sản xuất trực tiếp tại xưởng', text: 'Không qua trung gian, chủ động kiểm soát chất lượng và tiến độ.' },
        { icon: 'choose-us-icon2.png', title: 'Giá xưởng cạnh tranh', text: 'Báo giá theo đúng quy cách, không phát sinh chi phí trung gian.' },
        { icon: 'choose-us-icon3.png', title: 'Giao hàng đúng tiến độ', text: 'Giao hàng toàn quốc, đúng hẹn theo lịch đã thống nhất.' },
        { icon: 'choose-us-icon4.png', title: 'Tư vấn miễn phí', text: 'Đội ngũ tư vấn quy cách và báo giá trong ngày làm việc.' },
      ],
      offerHeading: 'Ưu đãi khi đặt tại xưởng Thời Đại',
      offerText: 'Liên hệ để được tư vấn quy cách và nhận báo giá phù hợp với nhu cầu của bạn.',
      checklist: [
        'Tư vấn quy cách phù hợp nhu cầu sử dụng',
        'Báo giá rõ ràng trước khi sản xuất',
        'Kiểm tra chất lượng trước khi giao hàng',
        'Giao hàng toàn quốc đúng hẹn',
        'Hỗ trợ xử lý khi có lỗi từ nhà sản xuất',
        'Đội ngũ tư vấn phản hồi trong ngày làm việc',
      ],
      illustrations: sharedIllustrations,
      provide: {
        heading: 'Về dịch vụ này',
        paragraphs: [service.description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()],
      },
    }
  );
}
