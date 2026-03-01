import "./topbar.scss"
import { useState, useRef, useEffect } from "react";
import { FaCog, FaUser, FaChartLine, FaSignOutAlt } from "react-icons/fa";

const Topbar = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Click ngoài sẽ đóng menu
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="topbar">

            <div className="container" onClick={() => setOpenDropdown(!openDropdown)}>
                <FaCog className="menu-icon" />
                <span>Nguyễn Văn A</span>
            </div>
            {openDropdown && (
                <div className="dropdown" ref={dropdownRef}>
                    <div className="dropdown-item">
                        <FaUser className="dropdown-icon" />
                        <span>Thông tin cá nhân</span>
                    </div>
                    <div className="dropdown-item">
                        <FaChartLine className="dropdown-icon" />
                        <span>Thống kê</span>
                    </div>
                    <div className="dropdown-item">
                        <FaSignOutAlt className="dropdown-icon" />
                        <span>Đăng xuất</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Topbar;
