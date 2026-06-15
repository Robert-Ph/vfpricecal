import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./layout.scss";

const MainLayout = () => {
    return (
        <div className="layout">
            <Sidebar />
            <div className="main-layout">
                <div className="content-layout">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;