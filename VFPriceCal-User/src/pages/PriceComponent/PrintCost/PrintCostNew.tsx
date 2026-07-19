import "./styles/printCostNew.scss";
import { FiEdit, FiTrash2,  FiImage, FiTag, FiGrid, FiPlus   } from "react-icons/fi";
import { useState } from "react";
import { toast } from "react-toastify";
import type { UserInfo } from "../../../context/AuthContext";
import { create} from "../../../service/PrintPriceService";
import PrintCostNewModal from "../../../components/printPrice/PrintCostNewModal";
import type { printPriceRanges } from "../../../model/model";


const PrintCostNew = () => {
    const [openPaperModal, setOpenPaperModal] = useState(false);
    const [unit, setUnit] = useState("click");
    const [printData, setPrintData] = useState<printPriceRanges[]>([]); // State để lưu chi tiết gia công
    const [name, setName] = useState("");
    const [user] = useState<UserInfo>(() => {
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

     const handleAddSize = (newSize: printPriceRanges) => {
        setPrintData([...printData, newSize]);
    };

   const handleSave = async () => {
        if (!name) {
            alert("Vui lòng nhập tên giá in");
            return;
        }
        if (printData.length === 0) {
            alert("Vui lòng thêm ít nhất một kích thước");
            return;
        }
        const payload = {
            id: null,
            companyId: user?.companyId,
            name: name,
            unit: unit,
            isActive: true,
            printPriceRanges: printData
        };
        try {
            const res = await create(payload);
            if (res.code === 200 || res.code === 201) {
                toast.success("Lưu giá in thành công");

                setOpenPaperModal(false);
                setName("");
                setPrintData([]);
            }
        } catch (error) {
            console.error("Lỗi khi lưu giá in:", error);
            toast.error("Lưu giá in thất bại");
        }
    };


    return (
        <div className="processing-detail">
             <div className="top-bar">
                <div className="title-section">
                   
                    <div className="logo-box">
                        <div className="logo-icon">
                            <span className="layer layer-1"></span>
                            <span className="layer layer-2"></span>
                            <span className="layer layer-3"></span>
                        </div>
                    </div>

                    <div>
                        <h3>Giá in mới</h3>
                        <p>Thêm giá in</p>
                    </div>

                    
                </div>

                
            </div>
            <div className="content-area">
                {/* LEFT SIDE: Thông tin chi tiết giấy/vật liệu sẽ hiển thị ở đây. Bạn có thể chỉnh sửa thông tin như tên, gsm, trạng thái, và xem trước hình ảnh của giấy/vật liệu. */}
                                <div className="sidebar-material">
                                    <div className="preview-card">
                                        <div className="paper-preview" />
                
                                        <button className="preview-btn">
                                            <FiImage />
                                            Xem ảnh
                                        </button>
                                    </div>
                
                                    <div className="info-card">
                                        <div className="field">
                                            <div className="field-icon">
                                                <FiTag />
                                            </div>
                
                                            <div className="field-content">
                                                <span>Tên loại hình in</span>
                                                
                                                <strong><input type="text" placeholder="Nhập tên giá in" 
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                /></strong>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="info-card">
                                        <div className="field">
                                            <div className="field-icon">
                                                <FiTag />
                                            </div>
                
                                            <div className="field-content">
                                                <span>Đơn vị</span>
                                                <select name="" id="" value={unit} onChange={(e) => setUnit(e.target.value)}>
                                                    <option value="click">Lượt in</option>
                                                    <option value="size">Khổ in</option>
                                                    <option value="m2">m²</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                
                                    <div className="save-state">
                                                        <button className="btn-save" onClick={handleSave}>
                                                            Lưu giá in
                                                        </button>
                                                    </div>
                
                                </div>

                <div className="table-panel">
                    <div className="panel-header">
                                            <div className="section-title__icon">
                                                <FiGrid />
                                            </div>
                                            <div className="section-title__content">
                                                <h3>Danh sách</h3>
                                                <p>Quản lý giá tương ứng</p>
                                            </div>
                    </div>
             
                    <div className="tab-content">
                            <div className="product-paper-list">
                                <div className="table">
                                    <table className="paper-list">
                                        <thead>
                                            <tr>
                                                <th>Từ(click & m2) - chiều rộng</th>
                                                <th>Đến(click & m2) - chiều dài</th>
                                                <th>Giá</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Ví dụ về một sản phẩm */}
                                            {printData?.map((price: printPriceRanges) => (
                                                <tr key={price.id}>
                                                    <td>{price.minLengthCm}</td>
                                                    <td>{price.maxLengthCm}</td>
                                                    <td>{price.pricePerMeter}</td>
                                                    <td className="action-buttons">
                                                        <button className=" icon edit-btn"><FiEdit /></button>
                                                        <button className=" icon delete-btn"><FiTrash2 /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>

                            </div>

                            <div className="empty-state">
                                                        <button className="btn-primary" onClick={() => setOpenPaperModal(true)}>
                                                            <FiPlus />
                                                            Thêm mới
                                                        </button>
                                                    </div>

                    </div>
                </div>
            </div>

             <PrintCostNewModal 
                open={openPaperModal} 
                setOpen={setOpenPaperModal} 
                onAdd={handleAddSize}
            />

        </div>
    );
};

export default PrintCostNew;