import "./topbar.scss"
import { useState, useRef, useEffect } from "react";
import { FaCog, FaUser, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {logout} from "../service/AuthService";

const Topbar = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
   // Thêm "as AuthContextType" ở cuối

// Khởi tạo state bằng một hàm (Lazy initialization)
    const [user, setUser] = useState<any>(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            try {
                return JSON.parse(savedUser);
            } catch (e) {
                return null;
            }
        }
        return null;
    });

    // useEffect bây giờ chỉ dùng để lắng nghe sự thay đổi từ bên ngoài (nếu cần)
    useEffect(() => {
        const handleStorageChange = () => {
            const data = localStorage.getItem("user");
            setUser(data ? JSON.parse(data) : null);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

 /**
     * Logout
     */
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
        <div className="topbar">

            <div className="container" onClick={() => setOpenDropdown(!openDropdown)}>
                <FaCog className="menu-icon" />
                <span>{user?.username || ""}</span>
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
                    <div className="dropdown-item" onClick={handleLogout}>
                        <FaSignOutAlt className="dropdown-icon" />
                        <span>Đăng xuất</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Topbar;
