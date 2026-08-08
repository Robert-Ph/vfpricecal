import { ArrowRight, PlayCircle, CheckCircle2 } from "lucide-react";
import "./hero.scss";
import anh from "../assets/anh nèn.png";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="container">
        {/* LEFT */}
        <div className="hero-content">
          <span className="badge">
            PHẦN MỀM BÁO GIÁ IN ẤN
          </span>

          <h1>
            Báo giá nhanh chóng
            <span>Chốt đơn dễ dàng</span>
          </h1>

          <p>
            Tính giá tự động, xuất PDF chuyên nghiệp,
            quản lý khách hàng, lưu lịch sử báo giá
            và hỗ trợ doanh nghiệp in ấn làm việc hiệu quả hơn.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary"
            onClick={() => navigate("/dang-ky-dung-thu")}>
              Dùng thử miễn phí
              <ArrowRight size={20} />
            </button>

            <button className="btn-secondary">
              <PlayCircle size={20} />
              Xem Demo
            </button>
          </div>

          <div className="hero-features">
            <div className="feature">
              <CheckCircle2 />
              <h4>Không cần cài đặt</h4>
              <p>Sử dụng trực tiếp trên trình duyệt.</p>
            </div>

            <div className="feature">
              <CheckCircle2 />
              <h4>Báo giá chính xác</h4>
              <p>Tính toán tự động theo bảng giá.</p>
            </div>

            <div className="feature">
              <CheckCircle2 />
              <h4>Xuất PDF</h4>
              <p>File báo giá chuyên nghiệp.</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-image">
          <div className="circle top"></div>

          <img src={anh} alt="Hero" />

          <div className="circle bottom"></div>
        </div>
      </div>
    </section>
  );
}