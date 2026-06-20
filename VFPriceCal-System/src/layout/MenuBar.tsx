import "./menuBar.scss";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const MenuBar = () => {
    return (
        <div className="menu-bar">

            {/* HEADER */}
            <div className="sidebar-header">
                <div className="logo-box">
                    <img src={logo} alt="logo" className="logo" />
                </div>

                <div className="header-info">
                    <h2>VF PRICECAL</h2>
                    <p>Control Center</p>
                </div>
            </div>

            {/* SEARCH */}
            <div className="search-box">
                <input type="text" placeholder="Tìm kiếm menu..." />
            </div>

            <nav className="menu-nav">

                {/* TỔNG QUAN */}
                <div className="menu-group">
                    <div className="menu-group-title">TỔNG QUAN</div>

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span>🏠</span>
                        Dashboard
                    </NavLink>
                </div>

                {/* QUẢN LÝ NGƯỜI DÙNG */}
                <div className="menu-group">
                    <div className="menu-group-title">
                        QUẢN LÝ NGƯỜI DÙNG
                    </div>

                    <NavLink
                        to="/company-management"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span>🏢</span>
                        Quản lý doanh nghiệp
                    </NavLink>

                    <NavLink
                        to="/roles"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span>🛡️</span>
                        Roles & Permissions
                    </NavLink>

                    <NavLink
                        to="/users"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span>👤</span>
                        Người dùng
                    </NavLink>
                </div>

                {/* DỊCH VỤ & ĐƠN HÀNG */}
                <div className="menu-group">
                    <div className="menu-group-title">
                        DỊCH VỤ & ĐƠN HÀNG
                    </div>

                    <NavLink
                        to="/plans"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span>📦</span>
                        Quản lý gói dịch vụ
                    </NavLink>

                    <NavLink
                        to="/orders"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span>🛒</span>
                        Đơn hàng
                    </NavLink>

                    <NavLink
                        to="/renewals"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span>🔄</span>
                        Đăng ký gia hạn
                    </NavLink>

                    <NavLink
                        to="/payments"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span>💳</span>
                        Thanh toán
                    </NavLink>
                </div>

                {/* HỆ THỐNG */}
                <div className="menu-group">
                    <div className="menu-group-title">HỆ THỐNG</div>

                    <NavLink
                        to="/apps"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span>📱</span>
                        Applications
                    </NavLink>

                    <NavLink
                        to="/database"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span>🗄️</span>
                        Database
                    </NavLink>

                    <NavLink
                        to="/logs"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span>📄</span>
                        System Logs
                    </NavLink>

                    <NavLink
                        to="/monitor"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span>📊</span>
                        Monitoring
                    </NavLink>

                    <NavLink
                        to="/backup"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span>☁️</span>
                        Backup & Restore
                    </NavLink>

                    <NavLink
                        to="/security"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span>🔐</span>
                        Security Center
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span>⚙️</span>
                        Settings
                    </NavLink>
                </div>

                {/* BÁO CÁO */}
                <div className="menu-group">
                    <div className="menu-group-title">
                        BÁO CÁO & PHÂN TÍCH
                    </div>

                    <NavLink
                        to="/reports"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span>📈</span>
                        Báo cáo
                    </NavLink>

                    <NavLink
                        to="/statistics"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span>📉</span>
                        Thống kê sử dụng
                    </NavLink>
                </div>

                {/* HỖ TRỢ */}
                <div className="menu-group">
                    <div className="menu-group-title">HỖ TRỢ</div>

                    <NavLink
                        to="/notifications"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span>🔔</span>
                        Thông báo
                    </NavLink>

                    <NavLink
                        to="/tickets"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span>🎫</span>
                        Hỗ trợ & Ticket
                    </NavLink>
                </div>

            </nav>

            {/* PROFILE */}
            <div className="profile-box">
                <img
                    src={logo}
                    alt="avatar"
                    className="avatar"
                />

                <div className="profile-info">
                    <h4>Admin</h4>
                    <p>Super Administrator</p>
                </div>
            </div>

        </div>
    );
};

export default MenuBar;