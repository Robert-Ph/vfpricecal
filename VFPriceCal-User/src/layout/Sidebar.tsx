import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaFileAlt, FaBox, FaChartBar, FaCog } from "react-icons/fa";
import { IoLayers } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import "./sidebar.scss";

const Sidebar = () => {
    const [openSubMenu, setOpenSubMenu] = useState(false);
    const [openSubMenuSystem, setOpenSubMenuSystem] = useState(false);

    return (
        <div className="sidebar">
            <h3 title="version 1.0">VF PRINT</h3>
            <p>Phần mềm báo giá in ấn</p>

            <hr />
            <nav>
                <NavLink className="menu-item" to="/">
                    <FaFileAlt className="menu-icon" />
                    <span>Báo giá</span>
                </NavLink>

                <NavLink className="menu-item" to="/product">
                    <FaBox className="menu-icon" />
                    <span>Sản phẩm</span>
                </NavLink>

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
