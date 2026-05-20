import "./paperDetail.scss";
import { FaPlus } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deletePaperSize, getPaperById } from "../../../../service/PaperService";
import ConfirmModal from "../../../../components/ConfirmModal";
import { toast } from "react-toastify";
import PaperSizeModal from "../../../../components/paper/PaperSizeModal";

const PaperDetail = () => {
    const [activeTab, setActiveTab] = useState("paper");
    const [paperData, setPaperData] = useState<any[]>([]); // State để lưu chi tiết giấy/vật liệu
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedPaperId, setSelectedPaperId] = useState<number | null>(null);
    const {id} = useParams();
    const [openPaperModal, setOpenPaperModal] = useState(false);

    const [user] = useState<any>(() => {
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
        // Gọi API để lấy chi tiết giấy/vật liệu theo id
        // Ví dụ: getPaperById(id).then(data => setPaperData(data));
        const fetchPaperDetail = async () => {
            try {
                // Giả sử bạn có API getPaperById
                // const data = await getPaperById(id); 
                // setPaperData(data);
                // Tạm thời dùng dữ liệu giả để hiển thị
                const data = await getPaperById(Number(id));
                setPaperData(data.data);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết giấy/vật liệu:", error);
            }
            };
            fetchPaperDetail();
    }, [id, user?.companyId]);

    const handleOpenDelete = (id: number) => {
        setSelectedPaperId(id);
        setOpenDeleteModal(true);
        };
    
        const handleDeletePaper = async () => {
        try {
            if (!selectedPaperId) return;
    
            await deletePaperSize(Number(selectedPaperId), Number(id));
    
            setPaperData((prev) => ({
                ...prev,
                paperSizes: prev.paperSizes.filter((item) => item.id !== selectedPaperId),
            }));
    
            toast.success("Xoá kích thước giấy/vật liệu thành công");
    
            setOpenDeleteModal(false);
        } catch (error) {
            console.error(error);
            toast.error("Xoá thất bại");
        }
        };


    return (
        <div className="paper-detail">
            <div className="paper-header">
                <h3>Giấy & Vật liệu/Decal giấy</h3>
                {/* <button className="add-product-btn"> <FaPlus /> Lưu thay đổi</button> */}
            </div>
            <div className="paper-detail-info">
                <div className="paper-info-basic">
                    <div className="paper-image">
                        {/* Image placeholder */}
                    </div>
                    <div className="paper-item">
                        <label htmlFor="paper-name">Tên giấy/vật liệu:</label>
                        <input type="text" id="paper-name" value={paperData?.name || ""} />
                    </div>

                    <div className="paper-item">
                        <label htmlFor="paper-gsm">gsm:</label>
                        <input type="text" id="paper-gsm" value={paperData?.gsm || ""} />
                    </div>

                    <div className="paper-item">
                        <label htmlFor="paper-status">Trạng thái:</label>
                        <input type="text" id="paper-status" value={ "Đang hoạt động"} />
                    </div>

                </div>
                <div className="paper-info-advanced">
                    <div className="tabs">
                        <div className={`tab ${activeTab === "paper" ? "active" : ""}`} onClick={() => setActiveTab("paper")}>Chi tiết</div>
                    </div>
                    <div className="tab-content">
                        {activeTab === "paper" &&
                            <div className="product-paper-list">
                                <div className="table">
                                    <table className="paper-list">
                                        <thead>
                                            <tr>
                                                <th>Chiều rộng</th>
                                                <th>Chiều cao</th>
                                                <th>Giá</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Dữ liệu chi tiết kích thước sẽ hiển thị ở đây. Mỗi kích thước sẽ có thông tin như chiều rộng, chiều cao, giá. Bạn có thể nhấp vào một kích thước để xem chi tiết hoặc chỉnh sửa thông tin của nó. */}
                                            {paperData?.paperSizes?.map((size: any) => (
                                                <tr key={size.id}>
                                                    <td>{size.width}mm</td>
                                                    <td>{size.height}mm</td>
                                                    <td>{size.price}đ</td>
                                                    <td className="action-buttons">
                                                        <button className=" icon edit-btn"><FiEdit /></button>
                                                        <button className=" icon delete-btn" onClick={() => handleOpenDelete(size.id)} ><FiTrash2 /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>

                                <button className="add-paper-btn" onClick={() => setOpenPaperModal(true)}><FaPlus /> Thêm kích thước</button>
                            </div>

                        }
                    </div>
                </div>
            </div>
            
            <PaperSizeModal 
                open={openPaperModal} 
                setOpen={setOpenPaperModal} 
                id={id}
            />

            <ConfirmModal
                isOpen={openDeleteModal}
                title="Xác nhận xoá"
                message="Bạn có chắc muốn xoá kích thước giấy/vật liệu này?"
                onCancel={() => setOpenDeleteModal(false)}
                onConfirm={handleDeletePaper}
            />
        </div>
    );
}
export default PaperDetail;