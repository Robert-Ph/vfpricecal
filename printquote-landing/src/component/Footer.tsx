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
          <a href="#">Tính năng</a>
          <a href="#">Bảng giá</a>
        </div>

        <div>
          <h4>Hỗ trợ</h4>
          <a href="#">Liên hệ</a>
          <a href="#">Email</a>
        </div>

      </div>

      <div className="copyright">
        © 2026 PrintQuote. All rights reserved.
      </div>
    </footer>
  );
}