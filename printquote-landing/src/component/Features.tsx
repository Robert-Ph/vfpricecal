import {
  FileText,
  Users,
  BarChart3,
  Clock3,
  Settings,
  FileSpreadsheet,
} from "lucide-react";
import "./features.scss";

const features = [
  {
    icon: FileSpreadsheet,
    title: "Tính báo giá",
    desc: "Tự động tính giấy, in, gia công và VAT.",
  },
  {
    icon: FileText,
    title: "Xuất PDF",
    desc: "Mẫu báo giá chuyên nghiệp.",
  },
  {
    icon: Users,
    title: "Quản lý khách hàng",
    desc: "Lưu lịch sử và thông tin khách hàng.",
  },
  {
    icon: BarChart3,
    title: "Thống kê",
    desc: "Theo dõi doanh thu và lợi nhuận.",
  },
  {
    icon: Clock3,
    title: "Lịch sử báo giá",
    desc: "Tìm kiếm và xem lại báo giá.",
  },
  {
    icon: Settings,
    title: "Quản lý hệ thống",
    desc: "Quản lý bảng giá và gia công.",
  },
];

export default function Features() {
  return (
    <section id="features" className="features">
      <div className="container">
        <div className="heading">
          <span className="badge">TÍNH NĂNG</span>

          <h2>Tính năng nổi bật</h2>

          <p>
            Giải pháp giúp doanh nghiệp in ấn tạo báo giá nhanh,
            quản lý khách hàng và xuất báo giá chuyên nghiệp.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div className="feature-card" key={index}>
                <div className="icon">
                  <Icon size={32} />
                </div>

                <h3>{item.title}</h3>

                <p>{item.desc}</p>

                <a href="#">Tìm hiểu thêm →</a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}