import { Outlet } from "react-router-dom";
import MenuBar from "./MenuBar";
import "./mainLayout.scss";

const MainLayout = () => {
    return (
        <div className="main-layout">

            <aside className="menu">
                <MenuBar />
            </aside>

            <main className="main-content">
                <div className="page-content">
                    <Outlet />
                </div>

            </main>

        </div>
    );
}

export default MainLayout;