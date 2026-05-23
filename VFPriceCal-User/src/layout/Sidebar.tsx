import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaFileAlt, FaChartBar, FaCog } from "react-icons/fa";
import { IoLayers } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import "./sidebar.scss";
import logo from "../assets/logo.png";

const Sidebar = () => {
    const [openSubMenu, setOpenSubMenu] = useState(false);
    const [openSubMenuSystem, setOpenSubMenuSystem] = useState(false);

    return (
        <div className="sidebar">
           <div className="login__brand--horizontal">
                {/* Khối chứa biểu tượng bên trái */}
                <div className="brand__logo-wrapper">
                    <img 
                        src={logo} 
                        alt="VFprint Logo" 
                        className="brand__logo--horizontal" 
                    />
                </div>
                
                {/* Khối chứa thông tin chữ bên phải */}
                <div className="brand__text-wrapper">
                    <h3 title="version 1.0" className="brand__title--horizontal">
                        VF<span className="text-cyan">print</span> ECOSYSTEM
                    </h3>
                    <p className="brand__subtitle--horizontal">Hệ thống báo giá in ấn</p>
                     <p className="brand__subtitle--horizontal">Version: 1.0.0</p>
                </div>
            </div>

            <hr />
            <nav>
                <NavLink className="menu-item" to="/quotation">
                    <FaFileAlt className="menu-icon" />
                    <span>Báo giá</span>
                </NavLink>
{/* 
                <NavLink className="menu-item" to="/product">
                    <FaBox className="menu-icon" />
                    <span>Sản phẩm</span>
                </NavLink> */}

                <div className="menu-item parent"
                    onClick={() => setOpenSubMenu(!openSubMenu)}>
                    <div className="menu-left">
                        <IoLayers className="menu-icon" />
                        <span>Giá & Thành phần</span>
                    </div>

                    <FiChevronDown
                        className={`arrow ${openSubMenu ? "rotate" : ""}`}
                    />
                </div>
                {openSubMenu && (
                    <div className="submenu">
                        <NavLink to="/component/papers" className="submenu-item">
                            Giấy
                        </NavLink>

                        <NavLink to="/component/processing" className="submenu-item">
                            Gia công
                        </NavLink>

                        <NavLink to="/component/printcost" className="submenu-item">
                            Giá in
                        </NavLink>

                        <NavLink to="/component/profit" className="submenu-item">
                            Biên lợi nhuận
                        </NavLink>

                        <NavLink to="/component/discount" className="submenu-item">
                            Chiếc khấu khách hàng
                        </NavLink>
                    </div>
                )
                }
                <NavLink className="menu-item" to="/report">
                    <FaChartBar className="menu-icon" />
                    <span>Báo cáo</span>
                </NavLink>

                <div className="menu-item parent"
                    onClick={() => setOpenSubMenuSystem(!openSubMenuSystem)}>
                    <div className="menu-left">
                        <FaCog className="menu-icon" />
                        <span>Hệ thống</span>
                    </div>
                    <FiChevronDown
                        className={`arrow ${openSubMenuSystem ? "rotate" : ""}`}
                    />

                </div>
                {openSubMenuSystem && (
                    <div className="submenu">
                        <NavLink to="/system/users" className="submenu-item">
                            Quản lý người dùng
                        </NavLink>
                        <NavLink to="/system/settings" className="submenu-item">
                            Cài đặt hệ thống
                        </NavLink>
                        <NavLink to="/system/backup" className="submenu-item">
                            Sao lưu dữ liệu
                        </NavLink>
                    </div>
                )
                }
            </nav>
        </div>
    );
};

export default Sidebar;
