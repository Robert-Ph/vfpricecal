import "./styles/MaterialDetail.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deletePaperSize, getPaperById } from "../../../service/PaperService";
import ConfirmModal from "../../../components/ConfirmModal";
import { toast } from "react-toastify";
import PaperSizeModal from "../../../components/paper/PaperSizeModal";
import type { UserInfo } from "../../../context/AuthContext";
import type {paper, paperSize} from "../../../model/model";
import {
  FiPlus,
  FiTrash2,
  FiEdit,
  FiFileText,
  FiTag,
  FiLayers,
  FiImage,
  FiGrid 
} from "react-icons/fi";

const MaterialDetail = () => {
    const [activeTab, setActiveTab] = useState("paper");
    const [paperData, setPaperData] = useState<any[]>([]); // State để lưu chi tiết giấy/vật liệu
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedPaperId, setSelectedPaperId] = useState<string>("");
    const [dataSize, setDataSize] = useState<paperSize>();
    const {id} = useParams();
    const [openPaperModal, setOpenPaperModal] = useState(false);

    const [user] = useState<UserInfo | null>(() => {
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
                const data = await getPaperById(id ?? "");
                setPaperData(data.data);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết giấy/vật liệu:", error);
            }
            };
            fetchPaperDetail();
    }, [id, user?.companyId]);

    const handleOpenUpdate = (item: paperSize) => {
        setDataSize(item);
        setOpenPaperModal(true);
    };
    const handleOpenDelete = (id: string) => {
        setSelectedPaperId(id);
        setOpenDeleteModal(true);
    };
    
        const handleDeletePaper = async () => {
        try {
            if (!selectedPaperId) return;
    
            await deletePaperSize(selectedPaperId, id ?? ""); // Gọi API xoá kích thước giấy/vật liệu
    
            setPaperData((prev) => ({
                ...prev,
                paperSizes: prev.paperSizes.filter((item: any) => item.id !== selectedPaperId),
            }));
    
            toast.success("Xoá kích thước giấy/vật liệu thành công");
    
            setOpenDeleteModal(false);
        } catch (error) {
            console.error(error);
            toast.error("Xoá thất bại");
        }
        };


    return (
      <div className="material-detail">
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
                        <h3>Giấy & Vật liệu /{paperData?.name || ""}</h3>
                        <p>Quản lý thông tin và kích thước giấy/vật liệu</p>
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
                                <span>Tên giấy/vật liệu</span>
                                <strong>{paperData?.name || ""}</strong>
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
                                <span>GSM</span>
                                <strong>120</strong>
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
                                <span>Trạng thái</span>

                                <div className="status">
                                    <span className="dot" />
                                    Đang hoạt động
                                </div>
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
                            <h3>Danh sách kích thước</h3>
                            <p>Quản lý các kích thước và giá tương ứng</p>
                        </div>
                    </div>
                  
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
                                            {paperData?.paperSizes?.length > 0 ? (
                                                paperData?.paperSizes?.map((size: paperSize) => (
                                                <tr key={size.id}>
                                                    <td>{size.width}mm</td>
                                                    <td>{size.height}mm</td>

                                                    <td>
                                                        <div className="price-wrapper">
                                                            <span className="price">{size.price.toLocaleString()}đ</span>

                                                            <div className="action-buttons">
                                                                <button className="action-btn edit-btn" onClick={() => handleOpenUpdate(size)}>
                                                                    <FiEdit />
                                                                </button>

                                                                <button
                                                                    className="action-btn delete-btn"
                                                                    onClick={() => handleOpenDelete(size.id ?? "")}
                                                                >
                                                                    <FiTrash2 />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            ) : (
                                                <div>
                                                    <div className="empty-icon">
                                                        <FiFileText />
                                                    </div>

                                                    <h3>Chưa có kích thước nào</h3>

                                                    <p>
                                                        Thêm kích thước giấy/vật liệu để bắt đầu quản lý và tính giá.
                                                    </p>
                                                </div>
                                            )}
                                        </tbody>

                                    </table>
                                </div>
                            </div>

                        }
                        <div className="empty-state">
                            <button className="btn-primary" onClick={() => setOpenPaperModal(true)}>
                                <FiPlus />
                                Thêm kích thước
                            </button>
                        </div>
                </div>
            </div>
            
            <PaperSizeModal 
                open={openPaperModal} 
                setOpen={setOpenPaperModal} 
                data = {dataSize}
                id={id!}
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
export default MaterialDetail;

 