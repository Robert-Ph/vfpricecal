import "./userManagement.scss";

const UserManagement = () => {
    return (
        <div className="user-management">

            {/* HEADER */}
            <div className="top-header">

                <div>
                    <h1>Quản lý doanh nghiệp</h1>
                    <p>Quản lý thông tin doanh nghiệp và quyền truy cập</p>
                </div>

                <button className="add-btn" onClick={() => {
                    window.location.href = "/user-management/add";
                }}>
                    + Add Company
                </button>

            </div>

            {/* FILTER */}
            <div className="filter-section">

                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search company..."
                    />
                </div>

                <select>
                    <option>All Versions</option>
                    <option>Basic</option>
                    <option>Pro</option>
                    <option>Enterprise</option>
                </select>

                <select>
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Expired</option>
                </select>

                <button className="export-btn">
                    Export
                </button>

            </div>

            {/* TABLE */}
            <div className="table-container">

                <div className="table-header">
                    <div>#</div>
                    <div>Company Name</div>
                    <div>Created Date</div>
                    <div>Expire Date</div>
                    <div>Version</div>
                    <div>Status</div>
                    <div>Action</div>
                </div>

                {/* ROW */}
                <div className="table-row">

                    <div>1</div>

                    <div className="company-info">

                        <div className="company-logo blue">
                            VF
                        </div>

                        <div>
                            <h4>VFprint Company</h4>
                            <p>vfprint.vn</p>
                        </div>

                    </div>

                    <div>12/05/2024</div>

                    <div className="expire warning">
                        12/05/2025
                    </div>

                    <div>
                        <span className="badge pro">
                            PRO
                        </span>
                    </div>

                    <div>
                        <span className="status active">
                            ● Active
                        </span>
                    </div>

                    <div className="actions">
                        <button>✏️</button>
                        <button>🗑️</button>
                    </div>

                </div>

                {/* ROW */}
                <div className="table-row">

                    <div>2</div>

                    <div className="company-info">

                        <div className="company-logo purple">
                            ABC
                        </div>

                        <div>
                            <h4>ABC Solutions</h4>
                            <p>abc.com</p>
                        </div>

                    </div>

                    <div>01/01/2024</div>

                    <div className="expire danger">
                        01/01/2025
                    </div>

                    <div>
                        <span className="badge basic">
                            BASIC
                        </span>
                    </div>

                    <div>
                        <span className="status expiring">
                            ● Expiring Soon
                        </span>
                    </div>

                    <div className="actions">
                        <button>✏️</button>
                        <button>🗑️</button>
                    </div>

                </div>

                {/* ROW */}
                <div className="table-row">

                    <div>3</div>

                    <div className="company-info">

                        <div className="company-logo green">
                            TS
                        </div>

                        <div>
                            <h4>TechSoft</h4>
                            <p>techsoft.io</p>
                        </div>

                    </div>

                    <div>10/03/2024</div>

                    <div className="expire success">
                        10/03/2026
                    </div>

                    <div>
                        <span className="badge enterprise">
                            ENTERPRISE
                        </span>
                    </div>

                    <div>
                        <span className="status active">
                            ● Active
                        </span>
                    </div>

                    <div className="actions">
                        <button>✏️</button>
                        <button>🗑️</button>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default UserManagement;