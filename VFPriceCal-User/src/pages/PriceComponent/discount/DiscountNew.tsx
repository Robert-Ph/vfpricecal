import "./styles/discountNew.scss";
import { FiEdit, FiTrash2, FiLayers, FiImage, FiTag, FiGrid, FiPlus   } from "react-icons/fi";
import {  useState } from "react";
import { toast } from "react-toastify";
import type { UserInfo } from "../../../context/AuthContext";
import { createDiscount} from "../../../service/DiscountService";
import DiscountNewModal from "../../../components/discount/DiscountNewModal";
import { formatMoney } from "../../../utils/formatMoney";
import type {discountRanges } from "../../../model/model";  


const DiscountNew = () => {
    const [openPaperModal, setOpenPaperModal] = useState(false);
    // const [openDeleteModal, setOpenDeleteModal] = useState(false);
    // const [selectedProcessingId, setSelectedProcessingId] = useState<string>("");
    const [priority, setPrioity] = useState<string>("");
    const [data, setData] = useState<discountRanges[]>([]); // State để lưu chi tiết gia công
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

     const handleAddSize = (newSize: discountRanges) => {
        setData([...data, newSize]);
    };

   const handleSave = async () => {
        if (!name) {
            toast.error("Vui lòng nhập tên giá in");
            return;
        }

        if(!priority){
            toast.error("Vui lòng chọn độ ưu tiên!")
            return;
        }

        if (data.length === 0) {
            alert("Vui lòng thêm ít nhất một kích thước");
            return;
        }
        const payload = {
            id: null,
            companyId: user?.companyId,
            name: name,
            isActive: true,
            priority: priority,
            discountRanges: data
        };
        try {
            const res = await createDiscount(payload);
            if (res.code === 200 || res.code === 201) {
                toast.success("Lưu giá in thành công");

                setOpenPaperModal(false);
                setName("");
                setData([]);
            }
        } catch (error) {
            console.error("Lỗi khi lưu giá in:", error);
            toast.error("Lưu giá in thất bại");
        }
    };

    // const handleOpenDelete = (id: string) => {
    //         setSelectedProcessingId(id);
    //         setOpenDeleteModal(true);
    //         };
        

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
                        <h3>Chiếc khấu khách hàng</h3>
                        <p>Thêm chiếc khấu mới</p>
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
                                                <span>Loại khách hàng</span>
                                                
                                                <strong><input type="text" placeholder="Nhập tên ....." 
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
                                               
                                                <select name="" id="" onChange={(e) => setPrioity(e.target.value)}>
                                                    <option value="">Chọn</option>
                                                    <option value="HIGH">Ưu tiên</option>
                                                    <option value="NORMAL">Mặc định</option>
                                                </select>
                                        
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="save-state">
                                                        <button className="btn-save" onClick={handleSave}>
                                                            Lưu
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
                                            {data?.map((price: discountRanges) => (
                                                <tr key={price.id}>
                                                    <td>{formatMoney(price.maxAmount)}</td>
                                                    <td>{price.discount}%</td>
                                                    <td className="action-buttons">
                                                        <button className=" icon edit-btn"><FiEdit /></button>
                                                        <button className=" icon delete-btn" 
                                                        // nClick={() => handleOpenDelete(price?.id ?? "")}
                                                        ><FiTrash2 /></button>
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

             <DiscountNewModal
                open={openPaperModal} 
                setOpen={setOpenPaperModal} 
                onAdd={handleAddSize}
            />

        </div>
    );
};

export default DiscountNew;