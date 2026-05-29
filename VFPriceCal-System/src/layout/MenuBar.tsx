import "./menuBar.scss";
// import {useState} from "react";
import {NavLink} from "react-router-dom";
import logo from "../assets/logo.png";

const MenuBar = () => {
 
    return (
        <div className="menu-bar">

    <div className="sidebar-header">
        <div className="logo-box">
            <img src={logo} alt="logo" className="logo" />
        </div>

        <div className="header-info">
            <h2>VF PRICECAL</h2>
            <p>Control Center</p>
        </div>
    </div>

    <div className="search-box">
        <input type="text" placeholder="Search menu..." />
    </div>

    <nav className="menu-nav">

        <NavLink to="/dashboard" className={({ isActive }) =>
        isActive ? "menu-item active" : "menu-item"
        }>
            <span>🏠</span>
            Dashboard
        </NavLink>

        <NavLink to="/user-management" className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
        }>
            <span>👤</span>
            Quản lý người dùng
        </NavLink>

        <NavLink to="/roles" className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
        }>
            <span>🛡️</span>
            Roles & Permissions
        </NavLink>

        <NavLink to="/apps" className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
        }>
            <span>📦</span>
            Applications
        </NavLink>

        <NavLink to="/logs" className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
        }>
            <span>📄</span>
            System Logs
        </NavLink>

        <NavLink to="/monitor" className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
        }>
            <span>🔄</span>
            Monitoring
        </NavLink>

        <NavLink to="/database" className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
        }>
            <span>🗄️</span>
            Database
        </NavLink>

        <NavLink to="/backup" className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
        }>
            <span>☁️</span>
            Backup & Restore
        </NavLink>

        <NavLink to="/security" className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
        }>
            <span>🛡️</span>
            Security Center
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
        }>
            <span>⚙️</span>
            Settings
        </NavLink>

    </nav>
    <div className="profile-box">

        <img
            src={logo}
            alt="avatar"
            className="avatar"
        />

        <div className="profile-info">
            <h4>Admin</h4>
            <p>Super Administrator</p>
        </div>

    </div>

</div>


    );
}

export default MenuBar;