import "./addCompany.scss";
import {type Companies, type companiesStatus} from "../../config/ModelConfig";
import { useEffect, useState } from "react";
import { getCompaniesStatus } from "../../service/CompaniesStatusService";
import { createCompany } from "../../service/CompaniesService";
import { toast } from "react-toastify";


const AddCompany = () => {

    const [statusList, setStatusList] = useState<companiesStatus[]>([]);
    const [formData, setFormData] = useState<Companies>({
        code: '',
        name: '',
        phone: '',
        address: '',
        taxCode: '',
        email: '',
        statusId: '', // Ví dụ: '1' là Active
        logoUrl: '',
        createAt: '',
        updateAt: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setFormData(prevState => ({
            ...prevState,
            // Nếu trường là 'status', ép kiểu về số (number), còn lại giữ là string
            [name]: name === 'statusId' ? value : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Xử lý logic lưu công ty mới ở đây
        console.log("Form Data:", formData);
        try {
            // Gọi API bằng fetch hoặc axios
            const response = await createCompany( formData);
            if (response.status === 200) {
                alert('Company created successfully!');
                // Reset form hoặc điều hướng nếu cần
                toast.success('Company created successfully!');
                // Tải lại trang hiện tại
                window.location.reload();
                
            }
        } catch (error) {
            console.error("Lỗi khi thêm công ty:", error);
        }
    };

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const data = await getCompaniesStatus();
                setStatusList(data);
            } catch (error) {
                console.error('Error fetching companies status:', error);
            }

        };
        void fetchStatus();
    }, []);

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
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="VFprint Company"
                            />
                        </div>

                         <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                placeholder="VFprint"
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="company@email.com"
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+84 xxx xxx xxx"
                            />
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <textarea
                                rows={4}
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Company address..."
                            />
                        </div>

                         <div className="form-group">
                            <label>Tax code</label>
                            <input
                                type="text"
                                name="taxCode"
                                value={formData.taxCode}
                                onChange={handleChange}
                                placeholder="0123456789"
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

                                <select name="statusId" value={formData.statusId} onChange={handleChange}>
                                        {statusList.map(status => (
                                            <option key={status.id} value={status.id}>
                                                {status.name}
                                            </option>
                                        ))}
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

                <button className="save-btn" onClick={handleSubmit}>
                    Save Company
                </button>
            </div>

        </div>
    );
};

export default AddCompany;