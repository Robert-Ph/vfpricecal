import "./styles/MaterialAdd.scss";
import { FaPlus } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import {  useState } from "react";
import PaperModel from "../../../components/paper/PaperModel";
import { createPaper } from "../../../service/PaperService";
import { toast } from "react-toastify";
import type { UserInfo } from "../../../context/AuthContext";
import type { paperList } from "../../../model/model";

const MaterialAdd = () => {
    const [activeTab, setActiveTab] = useState("paper");
    const [openPaperModal, setOpenPaperModal] = useState(false);
    const [paperList, setPaperList] = useState<paperList[]>([]); 

    // 1. Khai báo state để quản lý dữ liệu nhập vào
    const [name, setName] = useState("");
    const [gsm, setGsm] = useState("");

    const handleAddSize = (newSize: paperList) => {
        setPaperList([...paperList, newSize]);
    };

    const [user] = useState<UserInfo | null>(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            try {
                return JSON.parse(savedUser);
            } catch (e) {
                return e;
            }
        }
        return null;
    });

    // 2. Viết lại hàm API hoàn chỉnh
    const handleSave = async () => {
        // Kiểm tra dữ liệu cơ bản trước khi gửi
        if (!name || !gsm) {
            alert("Vui lòng nhập tên giấy và GSM");
            return;
        }

        if (paperList.length === 0) {
            alert("Vui lòng thêm ít nhất một kích thước");
            return;
        }

        const payload = {
            companyId: user?.companyId, // ID ẩn từ context
            accountId: user?.userId,
            name: name,
            gsm: gsm,
            paperSizes: paperList 
        };

        try {
            console.log("Dữ liệu gửi đi:", payload);
            // Thay đổi URL theo API thực tế của bạn
            const res = await createPaper(payload.companyId ?? "", payload.accountId ?? "", name, gsm, paperList);
            
            if (res.code === 200 || res.code === 201) {
                // alert("Tạo loại giấy thành công!");
               

                setTimeout(() => {
                     window.location.reload(); // Hoặc navigate("/component/papers") nếu bạn dùng react-router
                }, 500); // Đợi 2 giây trước khi reload hoặc navigate
                // Có thể điều hướng về trang danh sách hoặc reset form
                toast.success(`Tạo loại giấy ${name} thành công!`);
            }
        } catch (error) {
            console.error("Lỗi khi lưu:", error);
            // alert("Có lỗi xảy ra khi tạo giấy mới. Vui lòng thử lại.");
            toast.error(`Có lỗi xảy ra khi tạo loại giấy ${name}.`);
        }
    };

    return (
        <div className="paper-detail">
            <div className="paper-header">
                <h3>Thêm mới giấy & Vật liệu</h3>
            </div>
            <div className="paper-detail-info">
                <div className="paper-info-basic">
                    {/* <div className="paper-image"></div> */}
                    <br />
                    <div className="paper-item">
                        <label htmlFor="paper-name">Tên giấy/vật liệu:</label>
                        <input 
                            type="text" 
                            id="paper-name"  
                            placeholder="Nhập tên giấy/vật liệu"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // Cập nhật state
                        />
                    </div>

                    <div className="paper-item">
                        <label htmlFor="paper-description">gsm:</label>
                        <input 
                            type="text" 
                            id="paper-description"  
                            placeholder="Nhập gsm"
                            value={gsm}
                            onChange={(e) => setGsm(e.target.value)} // Cập nhật state
                        />
                    </div>
                    
                    <div className="button-save">
                        <button className="cancel" onClick={() => window.history.back()}>Quay lại</button>
                        {/* 3. Gắn hàm handleSave vào đây */}
                        <button className="save" onClick={handleSave}>
                            <FaPlus /> Tạo mới
                        </button>
                    </div>
                </div>

                <div className="paper-info-advanced">
                    <div className="tabs">
                        <div className={`tab ${activeTab === "paper" ? "active" : ""}`} onClick={() => setActiveTab("paper")}>
                            Chi tiết kích thước
                        </div>
                    </div>
                    <div className="tab-content">
                        {activeTab === "paper" && (
                            <div className="product-paper-list">
                                <div className="table">
                                    <table className="paper-list">
                                        <thead>
                                            <tr>
                                                <th>Chiều rộng(mm)</th>
                                                <th>Chiều cao(mm)</th>
                                                <th>Giá (VNĐ)</th>
                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paperList.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.width}</td>
                                                    <td>{item.height}</td>
                                                    <td>{item.price.toLocaleString()}</td>
                                                    <td>
                                                        <button onClick={() => setPaperList(paperList.filter((_, i) => i !== index))}>
                                                            <FiTrash2 />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <button className="add-paper-btn" onClick={() => setOpenPaperModal(true)}>
                                    <FaPlus /> Thêm kích thước
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <PaperModel 
                open={openPaperModal} 
                setOpen={setOpenPaperModal} 
                onAdd={handleAddSize}
            />
        </div>
    );
}

export default MaterialAdd;