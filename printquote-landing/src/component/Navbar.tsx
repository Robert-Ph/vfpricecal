import { Menu, X } from "lucide-react";
import { useState } from "react";
import "./navbar.scss";
import logo from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";
import type { systemConfig } from "../api/ConfigModal";

export default function Navbar() {
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const configs: systemConfig[] = JSON.parse(
    localStorage.getItem("systemConfig") || "[]"
  );

  const defaultPlan = configs.find(
    (config) => config.configKey === "DEFAULT_PLAN"
  );

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container-navbar">

        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="PrintQuote" />
          <h2>PrintQuote</h2>
        </div>

        {/* Desktop menu */}
        <nav className="nav-menu">
          <a href="/">Trang chủ</a>
          <a href="/#features">Tính năng</a>
          <a href="/#pricing">Bảng giá</a>
          <a href="#">Hướng dẫn</a>
          <a onClick={() => navigate("/lien-he")}>Liên hệ</a>
        </nav>

        {/* Desktop buttons */}
        <div className="nav-actions">
          <button
            className="btn-login"
            onClick={() => {
              window.location.href =
                "https://account.printquote.vfltprinteco.com";
            }}
          >
            Đăng nhập
          </button>

          <button
            className="btn-trial"
            onClick={() => navigate("/dang-ky-dung-thu")}
          >
            {defaultPlan?.configValue === "BETA"
              ? "Đăng ký Thử nghiệm"
              : "Dùng thử"}
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`mobile-menu ${
          isMobileMenuOpen ? "open" : ""
        }`}
      >
        <Link to="/" onClick={closeMenu}>
          Trang chủ
        </Link>

        <Link to="/#features" onClick={closeMenu}>
          Tính năng
        </Link>

        <Link to="/#pricing" onClick={closeMenu}>
          Bảng giá
        </Link>

        <Link to="/#guide" onClick={closeMenu}>
          Hướng dẫn
        </Link>

        <Link to="/lien-he" onClick={closeMenu}>
          Liên hệ
        </Link>

        <div className="mobile-actions">
          <button
            className="btn-login"
            onClick={() => {
              window.location.href =
                "https://account.printquote.vfltprinteco.com";
            }}
          >
            Đăng nhập
          </button>

          <button
            className="btn-trial"
            onClick={() => navigate("/dang-ky-dung-thu")}
          >
            {defaultPlan?.configValue === "BETA"
              ? "Đăng ký Thử nghiệm"
              : "Dùng thử"}
          </button>
        </div>
      </div>
    </header>
  );
}