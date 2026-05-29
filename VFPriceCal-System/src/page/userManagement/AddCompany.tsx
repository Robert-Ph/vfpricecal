import "./addCompany.scss";

const AddCompany = () => {
    return (
        <div className="add-company">

            {/* HEADER */}
            <div className="page-header">
                <div>
                    <h1>Add Company</h1>
                    <p>Create new company subscription</p>
                </div>

                <button className="back-btn" onClick={() => {
                    window.location.href = "/user-management";
                }}>
                    ← Back
                </button>
            </div>

            {/* FORM */}
            <div className="form-container">

                {/* LEFT */}
                <div className="form-left">

                    <div className="card">
                        <h3>Company Information</h3>

                        <div className="form-group">
                            <label>Company Name</label>
                            <input
                                type="text"
                                placeholder="VFprint Company"
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="company@email.com"
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                placeholder="+84 xxx xxx xxx"
                            />
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <textarea
                                rows={4}
                                placeholder="Company address..."
                            />
                        </div>
                    </div>

                    <div className="card">
                        <h3>Subscription</h3>

                        <div className="grid-2">

                            <div className="form-group">
                                <label>Version</label>

                                <select>
                                    <option>Basic</option>
                                    <option>Pro</option>
                                    <option>Enterprise</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Status</label>

                                <select>
                                    <option>Active</option>
                                    <option>Pending</option>
                                    <option>Expired</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Start Date</label>
                                <input type="date" />
                            </div>

                            <div className="form-group">
                                <label>Expire Date</label>
                                <input type="date" />
                            </div>

                        </div>
                    </div>

                </div>

                {/* RIGHT */}
                <div className="form-right">

                    <div className="card">

                        <h3>Company Logo</h3>

                        <div className="upload-box">
                            <div className="upload-icon">
                                📁
                            </div>

                            <p>Upload company logo</p>

                            <span>
                                PNG, JPG up to 5MB
                            </span>

                            <button>
                                Choose File
                            </button>
                        </div>

                    </div>

                    <div className="card">

                        <h3>Account Summary</h3>

                        <div className="summary-item">
                            <span>Plan</span>
                            <strong>PRO</strong>
                        </div>

                        <div className="summary-item">
                            <span>Users</span>
                            <strong>Unlimited</strong>
                        </div>

                        <div className="summary-item">
                            <span>Storage</span>
                            <strong>100GB</strong>
                        </div>

                        <div className="summary-item">
                            <span>Support</span>
                            <strong>24/7</strong>
                        </div>

                    </div>

                </div>

            </div>

            {/* ACTION */}
            <div className="action-bar">
                <button className="cancel-btn">
                    Cancel
                </button>

                <button className="save-btn">
                    Save Company
                </button>
            </div>

        </div>
    );
};

export default AddCompany;