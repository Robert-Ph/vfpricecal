import "./styles/discountNew.scss";
import { FiEdit, FiTrash2, FiLayers, FiImage, FiTag, FiGrid, FiPlus   } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteProcessing } from "../../../service/ProcessingService";
import { toast } from "react-toastify";
import type { UserInfo } from "../../../context/AuthContext";
import { create, getById } from "../../../service/PrintPriceService";
import DiscountNewModal from "../../../components/discount/DiscountNewModal";
import { formatMoney } from "../../../utils/formatMoney";


const DiscountNew = () => {
    const [activeTab, setActiveTab] = useState("paper");
    const [openPaperModal, setOpenPaperModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedProcessingId, setSelectedProcessingId] = useState<number | null>(null);
    const {id} = useParams();
    const [printData, setPrintData] = useState<any[]>([]); // State để lưu chi tiết gia công
    const [name, setName] = useState("");
    const [user] = useState<UserInfo>(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
        try {
            return JSON.parse(savedUser);
        } catch (e) {
            return null;
        }
    }
        return null;
    });

     const handleAddSize = (newSize: any) => {
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

    const handleOpenDelete = (id: number) => {
            setSelectedProcessingId(id);
            setOpenDeleteModal(true);
            };
        
    const handleDeletePaper = async () => {
            try {
                if (!selectedProcessingId) return;
        
                await deleteProcessing(Number(selectedProcessingId), Number(id));
        
                setPrintData((prev) => ({
                                ...prev,
                    processings: prev.processings.filter(
                    (item) => item.id !== selectedProcessingId
                    ),
                }));
        
                toast.success("Xoá chiết khấu  thành công");
        
                setOpenDeleteModal(false);
            } catch (error) {
                console.error(error);
                toast.error("Xoá thất bại");
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
                                                <span>Tên gia công</span>
                                                
                                                <strong><input type="text" placeholder="Nhập tên giá in" 
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                /></strong>
                                            </div>
                                            {/* <div className="info-card__status">
                                                <FiCheck />
                                            </div> */}
                                        </div>
                                    </div>
                
                                    <div className="info-card">
                                        <div className="field">
                                            <div className="field-icon">
                                                <FiLayers />
                                            </div>
                
                                            <div className="field-content">
                                                <span>Độ ưu tiên</span>
                                                <select name="" id="">
                                                    <option value="HIGH">HIGH</option>
                                                    <option value="NORMAL">NORMAL</option>
                                                </select>
                                                {/* <div className="status">
                                                    <span className="dot" />
                                                    Đang hoạt động
                                                </div> */}
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
                                              
                                                <th>Đến giá trị đơn(vnđ)</th>
                                                <th>Chiếc khấu</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Ví dụ về một sản phẩm */}
                                            {printData?.map((price: any) => (
                                                <tr key={price.id}>
                                                    <td>{formatMoney(price.maxAmount)}</td>
                                                    <td>{price.discount}%</td>
                                                    <td className="action-buttons">
                                                        <button className=" icon edit-btn"><FiEdit /></button>
                                                        <button className=" icon delete-btn" onClick={() => handleOpenDelete(price.id)}><FiTrash2 /></button>
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
                                                            Thêm kích thước
                                                        </button>
                                                    </div>

                    </div>
                </div>
            </div>

             <DiscountNewModal
                open={openPaperModal} 
                setOpen={setOpenPaperModal} 
                onAdd={handleAddSize}
            />

        </div>
    );
};

export default DiscountNew;