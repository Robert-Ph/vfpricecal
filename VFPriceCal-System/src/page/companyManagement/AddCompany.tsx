import "./addCompany.scss";
import { type CompaniesRegistration} from "../../config/ModelConfig";
import { useState  } from "react";
import { createCompanyRegistration } from "../../service/CompanyRegistrationsService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


const AddCompany = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<CompaniesRegistration>({
        id: '',
        userName:'',
        fullName: '',
        name: '',
        phone: '',
        address: '',
        taxCode: '',
        email: '',
        status: '',
        customType: 'PERSONAL'
    });

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    //     const { name, value } = e.target;
        
    //     setFormData(prevState => ({
    //         ...prevState,
    //         [name]: name === 'statusId' ? value : value
    //     }));
    // };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

    const handleSubmit = async () => {
        if (!formData.userName || !formData.phone || !formData.address || !formData.email) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
            return;
        }

        if(formData.customType === 'BUSINESS'){
            if (!formData.fullName || !formData.name) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
            return;
        }
        }
        try {
            setLoading(true);
            // Gọi API bằng fetch hoặc axios
            const response = await createCompanyRegistration( formData);
            if (response.code === 200 || response.code === 201) {
                const registerId = response.data.id;
                navigate(`/company-management/select-plan/${"new"}/${registerId}`)
                
            }
            if(response === 409){
                setError(response.message);

            }

           
        } catch (error: any) {
             if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.response?.data?.message || "Đã xảy ra lỗi");
        }
    } else {
        toast.error("Đã xảy ra lỗi");
    }
        }finally {
            setLoading(false);
        }
    };



    return (
        <div className="add-company">
            {/* HEADER */}
            <div className="page-header">
                <div>
                    <h1>Đăng ký mới</h1>
                    <p>Create new company subscription</p>
                </div>

                <button className="back-btn" onClick={() => navigate("/company-management")}>
                    ← 
                </button>
            </div>

            {/* FORM */}
           
                <div className="form-container">

                {/* LEFT */}
                <div className="form-left">

                    <div className="card">
                        <h3>Thông tin cá nhân/doanh nghiệp</h3>
                        <div className="form-group">
    <label>Loại hình tài khoản <span className="required">*</span></label>
    <div className="radio-group" style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
        <label style={{ fontWeight: 'normal', cursor: 'pointer' }}>
            <input
                type="radio"
                name="customType"
                value="PERSONAL"
                checked={formData.customType === 'PERSONAL'}
                onChange={handleChange}
            /> Cá nhân
        </label>
        
        <label style={{ fontWeight: 'normal', cursor: 'pointer' }}>
            <input
                type="radio"
                name="customType"
                value="BUSINESS"
                checked={formData.customType === 'BUSINESS'}
                onChange={handleChange}
            /> Doanh nghiệp
        </label>
    </div>
</div>
                        <div className="form-group">
                            <label>Họ và Tên <span className="required">*</span></label>
                            <input
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                placeholder="Họ và Tên"
                            />
                        </div>

                        <div className="form-group">
                            <label>Email <span className="required">*</span></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="company@email.com"
                            />
                        </div>

                        <div className="form-group">
                            <label>Số điện thoại(Zalo) <span className="required">*</span></label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+84 xxx xxx xxx"
                            />
                        </div>


                        {formData.customType === 'BUSINESS' && (
                            <>
                            <div className="form-group">
                            <label>Tên công ty đầy đủ <span className="required">*</span></label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="VFprint Company"
                            />
                        </div>

                         <div className="form-group">
                            <label>Tên thương mại <span className="required">*</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="VFprint"
                            />
                        </div>
                        </>
                        )}

                        

                        

                        

                        <div className="form-group">
                            <label>Địa chỉ(Address) <span className="required">*</span></label>
                            <textarea
                                rows={4}
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Company address..."
                            />
                        </div>

                         <div className="form-group">
                            <label>Mã số thuế(Tax code) </label>
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

                            <button type="button">
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
                <button className="cancel-btn" type="button">
                    Huỷ
                </button>

                <button className="save-btn" type="button" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Đang xử lý..." : "💾 Tiếp tục"}
                </button>
            </div>
        </div>
    );
};

export default AddCompany;