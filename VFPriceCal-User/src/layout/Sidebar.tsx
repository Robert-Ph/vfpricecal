import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaFileAlt} from "react-icons/fa";
import { IoLayers } from "react-icons/io5";
import { FiChevronDown, FiInfo, FiExternalLink } from "react-icons/fi";
import "./sidebar.scss";
import logo from "../assets/logo.png";
import avata from "../assets/avata.png";
import type { UserInfo } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {logout} from "../service/AuthService";
import ChangePasswordModal from "../components/auth/ChandePassword";

const Sidebar = () => {
    const [openSubMenu, setOpenSubMenu] = useState(false);
    // const [openSubMenuSystem, setOpenSubMenuSystem] = useState(false);
    const navigate = useNavigate();
     const [openPaperModal, setOpenPaperModal] = useState(false);

     const [user] = useState<UserInfo | null>(() => {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                try {
                    return JSON.parse(savedUser);
                } catch (e) {
                    return e;
                }
            }
            return null;
        });

        const handleLogout = async () => {
        
                try {
        
                    const reponse = await logout();
                    if (reponse.status === 200){
                        localStorage.removeItem("token");
        
                        localStorage.removeItem("user");
        
                        navigate("/login");
                    }
                   
        
                } catch (e) {
        
                    console.log(e);
        
                } 
        };

       

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
                     <p className="brand__subtitle--horizontal">Version: 0.1.0-beta.1</p>
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
                
                <NavLink className="menu-item" to="/mobile">
                    <FiExternalLink className="menu-icon" />
                    <span>Link di động</span>
                </NavLink>
                <NavLink className="menu-item" to="/about">
                    <FiInfo className="menu-icon" />
                    <span>About</span>
                </NavLink>

                {/* <div className="menu-item parent"
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
                } */}
            </nav>

           <div className="login__brand--horizontal info-account">
                    <div className="brand__logo-wrapper">
                            <img 
                                src={avata} 
                                alt="VFprint Logo" 
                                className="brand__logo--horizontal" 
                            />
                    </div>

                    <div className="brand__text-wrapper">
                        <div className="brand__info">
                            <h3 title="version 1.0" className="brand__title--horizontal">
                                <span className="text-cyan">{user?.username}</span>
                            </h3>
                            {/* <p className="brand__subtitle--horizontal">{user?.username}</p> */}
                        </div>
                        <button className="logout-btn" onClick={() => setOpenPaperModal(true)}>
                            Đổi mật khẩu
                        </button>

                        <button className="logout-btn" onClick={handleLogout}>
                            Đăng xuất
                        </button>
                    </div>
            </div>

            <ChangePasswordModal
                open={openPaperModal}
                setOpen={setOpenPaperModal}
            />
        </div>
    );
};

export default Sidebar;
