import "./topbar.scss"
import { useState, useRef, useEffect } from "react";
import { FaCog, FaKey, FaSignOutAlt, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {logout} from "../service/AuthService";
import ChangePasswordModal from "../components/auth/ChandePassword";
import type { UserInfo } from "../context/AuthContext";


const Topbar = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [openPaperModal, setOpenPaperModal] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
   // Thêm "as AuthContextType" ở cuối

// Khởi tạo state bằng một hàm (Lazy initialization)
    const [user, setUser] = useState<UserInfo | null>(() => {
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

    const handleClickModal = () => {
       navigate(`/bao-gia/${user?.companyName}/${user?.companyId}`);
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
                        <FaKey className="dropdown-icon" />
                        <span onClick={() => setOpenPaperModal(true)}>Đổi mật khẩu</span>
                    </div>
                    <div className="dropdown-item" onClick={handleClickModal}>
                        <FaChartLine className="dropdown-icon" />
                        <span >Sao chép liên kết</span>
                    </div>
                    <div className="dropdown-item" onClick={handleLogout}>
                        <FaSignOutAlt className="dropdown-icon" />
                        <span>Đăng xuất</span>
                    </div>
                </div>
            )}

            <ChangePasswordModal 
                open={openPaperModal} 
                setOpen={setOpenPaperModal} />
        </div>
    );
};

export default Topbar;
