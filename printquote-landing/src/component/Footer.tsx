import "./footer.scss";
import { useNavigate, Link  } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="container">

        <div>
          <h3>PrintQuote</h3>
          <p>Phần mềm báo giá in ấn chuyên nghiệp.</p>
        </div>

        <div>
          <h4>Sản phẩm</h4>
          <a href="/#features">Tính năng</a>
          <a href="/#pricing">Bảng giá</a>
        </div>

        <div>
          <h4>Hỗ trợ</h4>
          <a onClick={() => navigate("/lien-he")}>Liên hệ</a>
          <Link to="/dieu-khoan-su-dung">Điều khoản sử dụng</Link>
          <Link to="/chinh-sach-bao-mat">Chính sách bảo mật</Link>
          <a href="#">Email</a>
        </div>

      </div>

      <div className="copyright">
        © 2026 PrintQuote. All rights reserved.
      </div>
    </footer>
  );
}