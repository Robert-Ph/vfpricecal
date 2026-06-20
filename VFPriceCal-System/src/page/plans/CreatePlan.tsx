import { useState } from "react";
import "./createPlan.scss";

export default function CreatePlan() {
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        durationInDays: "",
        price: "",
        status: "ACTIVE",
        maxProduct: "",
        maxUser: "",
        features: "",
        custom: "",
        icon: "BA",
    });

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
                        Tạo gói mới
                    </div>

                    <h1>Tạo gói dịch vụ mới</h1>

                    <p>Nhập thông tin để tạo gói dịch vụ mới</p>
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
                            name="price"
                            value={formData.maxProduct}
                            onChange={handleChange}
                            placeholder="Nhập số lượng"
                        />
                    </div>

                    <div className="form-group">
                        <label>Số lượng tài khoản(Max) <span className="li-red">*</span></label>

                        <input
                            type="number"
                            name="price"
                            value={formData.maxUser}
                            onChange={handleChange}
                            placeholder="Nhập số lượng"
                        />
                    </div>

                    <div className="form-group">
                        <label>Loại dịch vụ</label>

                        <select
                            name="status"
                            value={formData.custom}
                            onChange={handleChange}
                        >
                            <option value="False">
                                Gói phổ thông
                            </option>

                            <option value="True">
                                Gói tuỳ chỉnh
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
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
                    </div>

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
                            name="features"
                            value={formData.features}
                            onChange={handleChange}
                            placeholder={`Nhập mỗi tính năng một dòng

Ví dụ:
• Quản lý không giới hạn người dùng
• Lưu trữ 100GB
• Hỗ trợ 24/7`}
                        />
                    </div>

                    <div className="form-group">
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

                    </div>

                </div>

            </div>

            <div className="action-bar">

                <button className="btn-cancel">
                    Hủy
                </button>

                <button className="btn-save">
                    💾 Lưu gói dịch vụ
                </button>

            </div>

        </div>
    );
}