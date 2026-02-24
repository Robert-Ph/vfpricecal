import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import "./layout.scss";

const MainLayout = () => {
    return (
        <div className="layout">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;