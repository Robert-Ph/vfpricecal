import { useState } from "react";
import "./createPlan.scss";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createPlans, getPlansById } from "../../service/PlansService";

export default function PlanDetail() {
    const { id } = useParams(); // Assuming you have a way to get the plan ID from the URL or props
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        code: "",
        durationInDays: 30,
        price: 0,
        status: "ACTIVE",
        maxProducts: 0,
        maxUsers: 0,
        maxBranches: 1,
        isCustom: false,
        description: "",
    });

    useEffect(() => {
        const fetchPlanDetail = async () => {
            try {
                const response = await getPlansById(id ?? ""); // Replace 'id' with the actual plan ID
                setFormData({
                    id: response.data.id,
                    name: response.data.name,
                    code: response.data.code,
                    durationInDays: response.data.durationInDays,
                    price: response.data.price,
                    status: response.data.status,
                    maxProducts: response.data.maxProducts,
                    maxUsers: response.data.maxUsers,
                    maxBranches: response.data.maxBranches,  
                    isCustom: response.data.isCustom,
                    description: response.data.description,
                });
            }
            catch (error) {
                console.error("Error fetching plan details:", error);
                toast.error("Đã xảy ra lỗi khi lấy thông tin gói dịch vụ.");
            }
        };

        void fetchPlanDetail();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.code || !formData.durationInDays || !formData.price) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
            return;
        }

        try {
            // Call the API to create the plan here
            const response = await createPlans(formData);
            if (response.code === "200" || response.code === "201") {
                console.log("Form Data Submitted:", formData);
                toast.success("Gói dịch vụ đã được tạo thành công!");
            }
            window.location.href = "/plans"; // Redirect to the plans page after successful submission
        } catch (error) {
            console.error("Error creating plan:", error);
            toast.error("Đã xảy ra lỗi khi tạo gói dịch vụ.");
        }

    }

    return (
        <div className="create-plan-page">
            <div className="page-header">
                {/* <button className="back-btn">
                    ←
                </button> */}

                <div className="header-content">
                    <div className="breadcrumb">
                        Quản lý gói dịch vụ
                        <span>›</span>
                        Chi tiết gói dịch vụ
                    </div>

                    <h1>Chi tiết gói dịch vụ</h1>

                    <p>Xem thông tin chi tiết của gói dịch vụ</p>
                </div>
            </div>

            <div className="plan-form-layout">

                {/* LEFT */}

                <div className="form-card">

                    <div className="card-title">
                        📄 Thông tin cơ bản
                    </div>

                    <div className="form-group">
                        <label>Tên gói dịch vụ <span className="li-red">*</span></label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nhập tên gói dịch vụ"
                        />
                    </div>

                    <div className="form-group">
                        <label>Mã gói dịch vụ  <span className="li-red">*</span></label>

                        <input
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            placeholder="VD: BASIC"
                        />

                        <small>
                            Mã gói phải viết hoa, không dấu và không có khoảng trắng
                        </small>
                    </div>

                    <div className="form-group">
                        <label>Thời hạn (ngày) <span className="li-red">*</span></label>

                        <input
                            type="number"
                            name="durationInDays"
                            value={formData.durationInDays}
                            onChange={handleChange}
                            placeholder="Nhập số ngày"
                        />
                    </div>

                    <div className="form-group">
                        <label>Giá (VNĐ) <span className="li-red">*</span></label>

                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Nhập giá gói dịch vụ"
                        />
                    </div>

                     <div className="form-group">
                        <label>Số sản phẩm(Max) <span className="li-red">*</span></label>

                        <input
                            type="number"
                            name="maxProducts"
                            value={formData.maxProducts}
                            onChange={handleChange}
                            placeholder="Nhập số lượng"
                        />
                    </div>

                    <div className="form-group">
                        <label>Số lượng tài khoản(Max) <span className="li-red">*</span></label>

                        <input
                            type="number"
                            name="maxUsers"
                            value={formData.maxUsers}
                            onChange={handleChange}
                            placeholder="Nhập số lượng"
                        />
                    </div>

                    <div className="form-group">
                        <label>Loại dịch vụ</label>

                        <select
                            name="isCustom"
                            value={String(formData.isCustom)}
                            onChange={handleChange}
                        >
                            <option value="false">
                                Gói phổ thông
                            </option>

                            <option value="true">
                                Gói tuỳ chỉnh
                            </option>
                        </select>
                    </div>

                    {/* <div className="form-group">
                        <label>Trạng thái</label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="ACTIVE">
                                Đang hoạt động
                            </option>

                            <option value="INACTIVE">
                                Ngừng hoạt động
                            </option>
                        </select>
                    </div> */}

                </div>

                {/* RIGHT */}

                <div className="form-card">

                    <div className="card-title">
                        ✨ Tính năng bao gồm
                    </div>

                    <div className="form-group">
                        <label>Danh sách tính năng</label>

                        <textarea
                            rows={8}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder={`Nhập mỗi tính năng một dòng

Ví dụ:
• Quản lý không giới hạn người dùng
• Lưu trữ 100GB
• Hỗ trợ 24/7`}
                        />
                    </div>

                    {/* <div className="form-group">
                        <label>Icon gói dịch vụ</label>

                        <div className="icon-selector">

                            {[
                                "BA",
                                "TR",
                                "PR",
                                "ST",
                                "EN",
                                "CU",
                                "OT",
                            ].map((item) => (
                                <button
                                    type="button"
                                    key={item}
                                    className={
                                        formData.icon === item
                                            ? "icon-item active"
                                            : "icon-item"
                                    }
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            icon: item,
                                        })
                                    }
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="btn-other"
                        >
                            + Chọn icon khác
                        </button>

                    </div> */}

                </div>

            </div>

            <div className="action-bar">

                <button className="btn-cancel">
                    Hủy
                </button>

                <button className="btn-save" onClick={handleSubmit}>
                    💾 Lưu gói dịch vụ
                </button>

            </div>

        </div>
    );
}