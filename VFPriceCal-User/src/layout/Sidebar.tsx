import { Link } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>VFLT</h2>

            <nav>
                <Link to="/">Báo giá</Link>
                <Link to="/product">Sản phẩm</Link>
                <Link to="/price">Giá & Thành phần</Link>
                <Link to="/report">Báo cáo</Link>
                <Link to="/system">Hệ thống</Link>
            </nav>
        </div>
    );
};

export default Sidebar;
