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

        <NavLink to="/dashboard" className="menu-item active">
            <span>🏠</span>
            Dashboard
        </NavLink>

        <NavLink to="/users" className="menu-item">
            <span>👤</span>
            Người dùng
        </NavLink>

        <NavLink to="/roles" className="menu-item">
            <span>🛡️</span>
            Roles & Permissions
        </NavLink>

        <NavLink to="/apps" className="menu-item">
            <span>📦</span>
            Applications
        </NavLink>

        <NavLink to="/logs" className="menu-item">
            <span>📄</span>
            System Logs
        </NavLink>

        <NavLink to="/monitor" className="menu-item">
            <span>🔄</span>
            Monitoring
        </NavLink>

        <NavLink to="/database" className="menu-item">
            <span>🗄️</span>
            Database
        </NavLink>

        <NavLink to="/backup" className="menu-item">
            <span>☁️</span>
            Backup & Restore
        </NavLink>

        <NavLink to="/security" className="menu-item">
            <span>🛡️</span>
            Security Center
        </NavLink>

        <NavLink to="/settings" className="menu-item">
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