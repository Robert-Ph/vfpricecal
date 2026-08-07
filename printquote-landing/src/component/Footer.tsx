import "./footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        <div>
          <h3>PrintQuote</h3>
          <p>Phần mềm báo giá in ấn chuyên nghiệp.</p>
        </div>

        <div>
          <h4>Sản phẩm</h4>
          <a href="#features">Tính năng</a>
          <a href="#pricing">Bảng giá</a>
        </div>

        <div>
          <h4>Hỗ trợ</h4>
          <a href="/lien-he">Liên hệ</a>
          <a href="/dieu-khoan-su-dung">Điều khoản sử dụng</a>
          <a href="/chinh-sach-bao-mat">Chính sách bảo mật</a>
          <a href="#">Email</a>
        </div>

      </div>

      <div className="copyright">
        © 2026 PrintQuote. All rights reserved.
      </div>
    </footer>
  );
}