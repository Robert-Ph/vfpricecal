import "./dashboard.scss";

const Dashboard = () => {
    return (
        <div className="dashboard">

            <div className="dashboard-header">
                <div>
                    <h3>Good morning, Admin! 👋</h3>
                    <p>Here's what's happening with your system today.</p>
                </div>

                <div className="top-actions">
                    <input type="text" placeholder="Search anything..." />

                    <div className="icons">
                        <span>☀️</span>
                        <span>🔔</span>
                        <span>✉️</span>
                    </div>
                </div>
            </div>

            <div className="stats-grid">

    <div className="stat-card">
        <div className="stat-left">

            <div className="icon-box blue">
                👥
            </div>

            <div className="stat-info">
                <p>Total Users</p>
                <h2>2,549</h2>
                <span>↑ 12.5% from last month</span>
            </div>

        </div>

        <div className="more">⋯</div>
    </div>

    <div className="stat-card">
        <div className="stat-left">

            <div className="icon-box green">
                🛡️
            </div>

            <div className="stat-info">
                <p>Active Sessions</p>
                <h2>1,382</h2>
                <span>↑ 8.7%</span>
            </div>

        </div>

        <div className="more">⋯</div>
    </div>

    <div className="stat-card">
        <div className="stat-left">

            <div className="icon-box orange">
                📦
            </div>

            <div className="stat-info">
                <p>Applications</p>
                <h2>28</h2>
                <span>↑ 3.4%</span>
            </div>

        </div>

        <div className="more">⋯</div>
    </div>

    <div className="stat-card">
        <div className="stat-left">

            <div className="icon-box pink">
                📄
            </div>

            <div className="stat-info">
                <p>System Logs</p>
                <h2>18,864</h2>
                <span>↑ 15.2%</span>
            </div>

        </div>

        <div className="more">⋯</div>
    </div>

</div>

            <div className="main-grid">

    <div className="overview-card">

        <div className="card-header">
            <h3>System Overview</h3>

            <select>
                <option>This Month</option>
            </select>
        </div>

        <div className="chart-container">

            <div className="chart-tooltip">
                <p>May 21, 2024</p>
                <span>● 2,120 Users</span>
            </div>

            <svg viewBox="0 0 700 300" className="chart-svg">
                <path
                    d="
                    M 20 250
                    C 70 180, 100 220, 140 170
                    S 220 210, 260 140
                    S 340 210, 390 130
                    S 470 170, 520 190
                    S 610 80, 680 40
                    "
                    fill="none"
                    stroke="#4f7cff"
                    strokeWidth="5"
                    strokeLinecap="round"
                />
            </svg>

            <div className="chart-labels">
                <span>May 1</span>
                <span>May 6</span>
                <span>May 11</span>
                <span>May 16</span>
                <span>May 21</span>
                <span>May 26</span>
                <span>May 31</span>
            </div>

        </div>
    </div>

    <div className="resources-card">

        <div className="card-header">
            <h3>System Resources</h3>
            <span>⋯</span>
        </div>

        <div className="resource-item">
            <div className="resource-top">
                <p>⚙️ CPU Usage</p>
                <span>65%</span>
            </div>

            <div className="progress">
                <div className="fill blue-fill" style={{width:"65%"}}></div>
            </div>
        </div>

        <div className="resource-item">
            <div className="resource-top">
                <p>🖥️ Memory Usage</p>
                <span>72%</span>
            </div>

            <div className="progress">
                <div className="fill purple-fill" style={{width:"72%"}}></div>
            </div>
        </div>

        <div className="resource-item">
            <div className="resource-top">
                <p>💾 Disk Usage</p>
                <span>48%</span>
            </div>

            <div className="progress">
                <div className="fill orange-fill" style={{width:"48%"}}></div>
            </div>
        </div>

        <div className="resource-item">
            <div className="resource-top">
                <p>📶 Network Usage</p>
                <span>68%</span>
            </div>

            <div className="progress">
                <div className="fill green-fill" style={{width:"68%"}}></div>
            </div>
        </div>

    </div>

    <div className="status-card">

        <h3>System Status</h3>

        <div className="status-circle">
            ✔
        </div>

        <h2>All Systems Operational</h2>
        <p>Everything is running smoothly</p>

        <div className="status-icons">
            <span>🖥️</span>
            <span>🗄️</span>
            <span>🌐</span>
            <span>🛡️</span>
        </div>

    </div>

</div>

           <div className="bottom-grid">

    <div className="registration-card">

        <div className="card-header">
            <h3>User Registrations</h3>
            <span>⋯</span>
        </div>

        <div className="registration-content">

            <div className="donut-chart">
                <div className="donut-inner">
                    <h2>2,549</h2>
                    <p>Total</p>
                </div>
            </div>

            <div className="registration-legend">

                <div className="legend-item">
                    <div className="legend-left">
                        <span className="dot blue"></span>
                        <p>Active Users</p>
                    </div>

                    <span>1,482 (58%)</span>
                </div>

                <div className="legend-item">
                    <div className="legend-left">
                        <span className="dot purple"></span>
                        <p>Inactive Users</p>
                    </div>

                    <span>657 (26%)</span>
                </div>

                <div className="legend-item">
                    <div className="legend-left">
                        <span className="dot orange"></span>
                        <p>Pending Users</p>
                    </div>

                    <span>410 (16%)</span>
                </div>

            </div>

        </div>

    </div>

    <div className="applications-card">

        <div className="card-header">
            <h3>Top Applications</h3>
            <span>⋯</span>
        </div>

        <div className="app-item">
            <div className="app-left">
                <span className="app-icon blue-bg">👤</span>
                <p>User Management</p>
            </div>

            <div className="app-progress">
                <div className="bar">
                    <div className="fill blue-fill" style={{width:"85%"}}></div>
                </div>

                <span>1,248</span>
            </div>
        </div>

        <div className="app-item">
            <div className="app-left">
                <span className="app-icon purple-bg">📊</span>
                <p>Analytics Dashboard</p>
            </div>

            <div className="app-progress">
                <div className="bar">
                    <div className="fill purple-fill" style={{width:"70%"}}></div>
                </div>

                <span>856</span>
            </div>
        </div>

        <div className="app-item">
            <div className="app-left">
                <span className="app-icon orange-bg">🛒</span>
                <p>E-commerce Platform</p>
            </div>

            <div className="app-progress">
                <div className="bar">
                    <div className="fill orange-fill" style={{width:"55%"}}></div>
                </div>

                <span>632</span>
            </div>
        </div>

        <div className="app-item">
            <div className="app-left">
                <span className="app-icon green-bg">🧩</span>
                <p>Content Management</p>
            </div>

            <div className="app-progress">
                <div className="bar">
                    <div className="fill green-fill" style={{width:"42%"}}></div>
                </div>

                <span>421</span>
            </div>
        </div>

        <div className="app-item">
            <div className="app-left">
                <span className="app-icon pink-bg">💬</span>
                <p>Support System</p>
            </div>

            <div className="app-progress">
                <div className="bar">
                    <div className="fill pink-fill" style={{width:"30%"}}></div>
                </div>

                <span>312</span>
            </div>
        </div>

    </div>

    <div className="activity-card">

        <div className="card-header">
            <h3>Recent Activities</h3>

            <button>View All</button>
        </div>

        <div className="activity-item">
            <div className="activity-left">
                <span className="activity-icon blue-bg">👤</span>

                <div>
                    <h4>Admin logged in</h4>
                    <p>admin@example.com</p>
                </div>
            </div>

            <div className="activity-right">
                <span>2m ago</span>
                <div className="status-dot pink"></div>
            </div>
        </div>

        <div className="activity-item">
            <div className="activity-left">
                <span className="activity-icon green-bg">➕</span>

                <div>
                    <h4>User created</h4>
                    <p>john.doe@example.com</p>
                </div>
            </div>

            <div className="activity-right">
                <span>15m ago</span>
                <div className="status-dot purple"></div>
            </div>
        </div>

        <div className="activity-item">
            <div className="activity-left">
                <span className="activity-icon orange-bg">🛡️</span>

                <div>
                    <h4>Role updated</h4>
                    <p>Editor role permissions</p>
                </div>
            </div>

            <div className="activity-right">
                <span>1h ago</span>
                <div className="status-dot orange"></div>
            </div>
        </div>

        <div className="activity-item">
            <div className="activity-left">
                <span className="activity-icon cyan-bg">☁️</span>

                <div>
                    <h4>System backup completed</h4>
                    <p>Backup_20240521.zip</p>
                </div>
            </div>

            <div className="activity-right">
                <span>2h ago</span>
                <div className="status-dot purple"></div>
            </div>
        </div>

        <div className="activity-item">
            <div className="activity-left">
                <span className="activity-icon green-bg">✔</span>

                <div>
                    <h4>Security scan completed</h4>
                    <p>No threats found</p>
                </div>
            </div>

            <div className="activity-right">
                <span>3h ago</span>
                <div className="status-dot purple"></div>
            </div>
        </div>

    </div>

</div>

        </div>
    );
};

export default Dashboard;