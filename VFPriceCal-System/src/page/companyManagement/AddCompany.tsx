import "./addCompany.scss";
import { type CompaniesRegistration} from "../../config/ModelConfig";
import { useState  } from "react";
import { createCompanyRegistration } from "../../service/CompanyRegistrationsService";
import { useNavigate } from "react-router-dom";



const AddCompany = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CompaniesRegistration>({
        id: '',
        fullName: '',
        name: '',
        phone: '',
        address: '',
        taxCode: '',
        email: '',
        status: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'statusId' ? value : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Gọi API bằng fetch hoặc axios
            const response = await createCompanyRegistration( formData);
            if (response.code === 200 || response.code === 201) {
                const registerId = response.data.id;
                navigate(`/company-management/select-plan/${"new"}/${registerId}`)
                
            }

           
        } catch (error) {
            console.error("Lỗi khi thêm công ty:", error);
        }
    };

    //     const endTime = useMemo(() => {
    //     if (!time) return null;

    //     const end = new Date(startTime);

    //     switch (time) {
    //         case "one-month":
    //             end.setMonth(end.getMonth() + 1);
    //             break;
    //         case "one-year":
    //             end.setFullYear(end.getFullYear() + 1);
    //             break;
    //         case "two-year":
    //             end.setFullYear(end.getFullYear() + 2);
    //             break;
    //         case "three-year":
    //             end.setFullYear(end.getFullYear() + 3);
    //             break;
    //         default:
    //             return null;
    //     }

    //     return end;
    // }, [time, startTime]);

    //     const formatDate = (date: Date) => {
    //     const year = date.getFullYear();
    //     const month = String(date.getMonth() + 1).padStart(2, "0");
    //     const day = String(date.getDate()).padStart(2, "0");

    //     return `${year}-${month}-${day}`;
    // };


    return (
        <div className="add-company">

            {/* HEADER */}
            <div className="page-header">
                <div>
                    <h1>Đăng ký mới</h1>
                    <p>Create new company subscription</p>
                </div>

                <button className="back-btn" onClick={() => {
                    window.location.href = "/user-management";
                }}>
                    ← 
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
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="VFprint Company"
                            />
                        </div>

                         <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
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
                            <label>Phone Number(Zalo)</label>
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

                    {/* <div className="card">
                        <h3>Gói đăng ký</h3>

                        <div className="grid-2">

                            <div className="form-group">
                                <label>Loại dịch vụ</label>

                                <select name="plan" value={formData.plan} onChange={handleChange}>
                                    <option value="">Chọn</option>
                                    {plans?.map((plan: plans) => (
                                        <option key={plan.id} value={plan.id}>{plan.code}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Status</label>
                                    
                                <select name="statusId" value={formData.statusId} onChange={handleChange}>
                                    <option value="">Chọn</option>
                                        {statusList.map(status => (
                                            <option key={status.id} value={status.id}>
                                                {status.name}
                                            </option>
                                        ))}
                                </select>
        
                            </div>

                             <div className="form-group">
                                <label>Thời hạn</label>
                                <select name="duration" value={time} onChange={(e) => setTime(e.target.value)}>
                                    <option value="">Chọn thời hạn</option>
                                    <option value="one-month">1 tháng</option>
                                    <option value="one-year">1 năm</option>
                                    <option value="tow-year">2 năm</option>
                                    <option value="three-year">3 năm</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Trạng thái thanh toán</label>
                                <select name="" value={formData.isPay}>
                                    <option value="">Chọn trạng thái</option>
                                    <option value="0">Chưa thanh toán</option>
                                    <option value="1">Đã thanh toán</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Start Date</label>
                                <input type="date" value={formatDate(startTime)} disabled/>
                            </div>

                            <div className="form-group">
                                <label>Expire Date</label>
                                <input type="date" value={endTime ? formatDate(endTime) : ""} disabled/>
                            </div>

                        </div>
                    </div> */}

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

                    {/* <div className="card">

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

                    </div> */}

                </div>

            </div>

            {/* ACTION */}
            <div className="action-bar">
                <button className="cancel-btn">
                    Huỷ
                </button>

                <button className="save-btn" onClick={handleSubmit}>
                    Tiếp tục
                </button>
            </div>

        </div>
    );
};

export default AddCompany;