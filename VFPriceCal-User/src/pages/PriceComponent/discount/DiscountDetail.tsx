import "./styles/discountDetail.scss";
import { FiEdit, FiTrash2, FiLayers, FiImage, FiTag, FiGrid, FiPlus   } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DiscountModel from "../../../components/discount/DiscountModel";
import ConfirmModal from "../../../components/ConfirmModal";
import { toast } from "react-toastify";
import type { UserInfo } from "../../../context/AuthContext";
import { deleteDiscountRange, getDetailByDiscountId } from "../../../service/DiscountService";
import { formatMoney } from "../../../utils/formatMoney";
import type { discountRanges, discountRequest } from "../../../model/model";


const DiscountDetail = () => {
    const [openPaperModal, setOpenPaperModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState<string>("");
    const {id} = useParams();
    const [priority, setPrioity] = useState<string>("");
    const [data, setData] = useState<discountRequest>(); // State để lưu chi tiết gia công 
    const [range, setRange] = useState<discountRanges>();
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

    useEffect(() => {
        const fetchProcessingDetail = async () => {
            try {
                const data = await getDetailByDiscountId(id as string); 
                setData(data.data);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết gia công:", error);
            }
            };
            fetchProcessingDetail();
    }, [id]);

    const handleOpenDelete = (id: string) => {
            setSelectedId(id);
            setOpenDeleteModal(true);
    };

    const handleOpenUpdate = (item: discountRanges) => {
        setRange(item);
        setOpenPaperModal(true);
    }
        
    const handleDeletePaper = async () => {
            try {
                if (!selectedId) return;
        
                await deleteDiscountRange(selectedId);
        
                toast.success("Xoá chiết khấu  thành công");
                setTimeout(() => {
                    window.location.reload();
                }, 500);
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
                        <h3>Chiếc khấu /{data?.name || ""}</h3>
                        <p>Quản lý thông tin chiếc khấu</p>
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
                                                <strong>{data?.name || ""}</strong>
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
                                                    <option value={data?.priority}>{data?.priority === "HIGH" ? "Ưu tiên" : "Mặc định"}</option>
                                                    <option value="HIGH">Ưu tiên</option>
                                                    <option value="NORMAL">Mặc định</option>
                                                </select>
                                            </div>
                                        </div>
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
                                                <th>Chiếc khấu(%)</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Ví dụ về một sản phẩm */}
                                            {data?.discountRanges.map((price: discountRanges) => (
                                                <tr key={price.id}>
                                                    <td>{formatMoney(price.maxAmount)}</td>
                                                    <td>{price.discount}%</td>
                                                    <td className="action-buttons">
                                                        <button className=" icon edit-btn" onClick={() => handleOpenUpdate(price)}><FiEdit /></button>
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

            <DiscountModel
                open={openPaperModal} 
                setOpen={setOpenPaperModal}
                data={range} 
                id ={id!}
            />

          

            <ConfirmModal
            isOpen={openDeleteModal}
            title="Xác nhận xoá"
            message="Bạn có chắc muốn xoá gia công này?"
            onCancel={() => setOpenDeleteModal(false)}
            onConfirm={handleDeletePaper}
            />

        </div>
    );
};

export default DiscountDetail;