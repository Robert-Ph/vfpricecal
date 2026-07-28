import { Menu } from "lucide-react";
import "./navbar.scss";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h2>PrintQuote</h2>
        </div>

        {/* Menu */}
        <nav className="nav-menu">
          <a href="#">Trang chủ</a>
          <a href="#">Tính năng</a>
          <a href="#">Bảng giá</a>
          <a href="#">Hướng dẫn</a>
          <a href="#">Liên hệ</a>
        </nav>

        {/* Buttons */}
        <div className="nav-actions">
          <button className="btn-login">Đăng nhập</button>
          <button className="btn-trial">Dùng thử</button>
        </div>

        {/* Mobile Menu */}
        <div className="menu-toggle">
          <Menu size={28} />
        </div>
      </div>
    </header>
  );
}