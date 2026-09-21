export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photoUrl?: string;
  social?: { facebook?: string; zalo?: string };
};

export type Department = {
  id: string;
  icon: string;
  name: string;
  text: string;
  /**
   * Tên nhân sự thật do người phụ trách nội dung cung cấp trực tiếp (website gốc
   * inanthoidai.vn không công bày danh sách này). Chưa có ảnh/chức danh riêng/tiểu sử
   * từng người — role tạm dùng đúng tên bộ phận (department.name) theo lựa chọn của
   * người phụ trách, KHÔNG tự bịa chức danh cụ thể hay ảnh đại diện (TeamMemberCard
   * tự hiện icon placeholder khi thiếu photoUrl). Bộ phận nào mảng vẫn rỗng thì
   * TeamDepartments.tsx tự hiển thị trạng thái "Đang cập nhật".
   */
  members: TeamMember[];
};

export const departments: Department[] = [
  {
    id: 'thiet-ke',
    icon: 'ph-bold ph-pen-nib',
    name: 'Bộ phận thiết kế',
    text: 'Dựng bản thiết kế kèm dao bế, biên dán và nếp gấp đúng quy cách sản xuất. Miễn phí thiết kế cho đơn in tại xưởng.',
    members: [
      { id: 'thiet-ke-1', name: 'Quách Đăng Hưng', role: 'Bộ phận thiết kế' },
      { id: 'thiet-ke-2', name: 'Nguyễn Duy Phú', role: 'Bộ phận thiết kế' },
      { id: 'thiet-ke-3', name: 'Lê Công Thương', role: 'Bộ phận thiết kế' },
      { id: 'thiet-ke-4', name: 'Dương Thị Tú Duyên', role: 'Bộ phận thiết kế' },
      { id: 'thiet-ke-5', name: 'Hồ Quang Huy', role: 'Bộ phận thiết kế' },
      { id: 'thiet-ke-6', name: 'Phạm Thị Tuyết Anh', role: 'Bộ phận thiết kế' },
    ],
  },
  {
    id: 'kinh-doanh',
    icon: 'ph-bold ph-headset',
    name: 'Bộ phận kinh doanh',
    text: 'Tiếp nhận yêu cầu, tư vấn chất liệu và quy cách, báo giá trong ngày làm việc và theo sát đơn hàng tới khi giao.',
    members: [
      { id: 'kinh-doanh-1', name: 'Trần Lưu Tú Nhi', role: 'Bộ phận kinh doanh' },
      { id: 'kinh-doanh-2', name: 'Trần Thị Phương Loan', role: 'Bộ phận kinh doanh' },
      { id: 'kinh-doanh-3', name: 'Nguyễn Duy Nghĩa', role: 'Bộ phận kinh doanh' },
    ],
  },
  {
    id: 'san-xuat',
    icon: 'ph-bold ph-factory',
    name: 'Bộ phận sản xuất',
    text: 'Vận hành máy in offset và in flexo tại xưởng Tây Ninh. Sản xuất carton 3, 5, 7 lớp với các loại sóng B, C, E.',
    members: [
      { id: 'san-xuat-1', name: 'Hồ Ngọc Tùng', role: 'Bộ phận sản xuất' },
      { id: 'san-xuat-2', name: 'Nguyễn Ngọc Tứ', role: 'Bộ phận sản xuất' },
      { id: 'san-xuat-3', name: 'Võ Anh Trương', role: 'Bộ phận sản xuất' },
      { id: 'san-xuat-4', name: 'Từ Hải Đạt', role: 'Bộ phận sản xuất' },
      { id: 'san-xuat-5', name: 'Nguyễn Minh Phương', role: 'Bộ phận sản xuất' },
      { id: 'san-xuat-6', name: 'Nguyễn Bửu Lâm', role: 'Bộ phận sản xuất' },
    ],
  },
  {
    id: 'gia-cong-sau-in',
    icon: 'ph-bold ph-sparkle',
    name: 'Bộ phận gia công sau in',
    text: 'Cán màng, ép kim, phủ UV định hình, bế nổi, dập chìm, bồi giấy và gấp dán — bước quyết định cảm giác cầm của thành phẩm.',
    members: [
      { id: 'gia-cong-sau-in-1', name: 'Nguyễn Văn Tánh', role: 'Bộ phận gia công sau in' },
      { id: 'gia-cong-sau-in-2', name: 'Nguyễn Hoàng Vinh', role: 'Bộ phận gia công sau in' },
      { id: 'gia-cong-sau-in-3', name: 'Trần Ngọc Thuý', role: 'Bộ phận gia công sau in' },
      { id: 'gia-cong-sau-in-4', name: 'Nguyễn Thị Thảo', role: 'Bộ phận gia công sau in' },
      { id: 'gia-cong-sau-in-5', name: 'Nguyễn Thị Kim Loan', role: 'Bộ phận gia công sau in' },
      { id: 'gia-cong-sau-in-6', name: 'Huỳnh Thị Thuỳ Trang', role: 'Bộ phận gia công sau in' },
    ],
  },
];
