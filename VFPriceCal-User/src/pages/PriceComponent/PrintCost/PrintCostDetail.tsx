import "./styles/printCostDetail.scss";
import { FiEdit, FiTrash2, FiLayers, FiImage, FiTag, FiGrid, FiPlus   } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PrintPriceAddModel from "../../../components/printPrice/PrintPriceModel";
import ConfirmModal from "../../../components/ConfirmModal";
import { toast } from "react-toastify";
import { deleteOnrRange, getById } from "../../../service/PrintPriceService";
import type { printPrice, printPriceRanges } from "../../../model/model";
import { formatMoney } from "../../../utils/formatMoney";


const PrintCostDetail = () => {
    const [openPaperModal, setOpenPaperModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState<string>();
    const [rangeData, setRangeData] = useState<printPriceRanges>();
    const {id} = useParams();
    const [printData, setPrintData] = useState<printPrice>(); // State để lưu chi tiết gia công 


    useEffect(() => {
        // Gọi API để lấy chi tiết gia công theo id
        // Ví dụ: getProcessingById(id).then(data => setProcessingData(data));
        const fetchProcessingDetail = async () => {
            try {
                const data = await getById(id as string); 
                setPrintData(data.data);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết gia công:", error);
            }
            };
            fetchProcessingDetail();
    }, [id]);

    const handleOpenUpdate = (item: printPriceRanges) => {
            setRangeData(item);
            setOpenPaperModal(true);
    };

    const handleOpenDelete = (id: string) => {
            setSelectedId(id);
            setOpenDeleteModal(true);
    };
        
    const handleDeletePaper = async () => {
            try {
                if (!selectedId) return;
        
                await deleteOnrRange(selectedId);
        
        
                toast.success("Xoá thành công");
        
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
                        <h3>Giá in /{printData?.name || ""}</h3>
                        <p>Quản lý thông tin giá in</p>
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
                                                <strong>{printData?.name || ""}</strong>
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
                                                <th>Từ</th>
                                                <th>Đến</th>
                                                <th>Giá</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Ví dụ về một sản phẩm */}
                                            {printData?.printPriceRanges.map((price: printPriceRanges) => (
                                                <tr key={price.id}>
                                                    <td>{price.minLengthCm}</td>
                                                    <td>{price.maxLengthCm}</td>
                                                    <td>{formatMoney(price.pricePerMeter)}</td>
                                                    <td className="action-buttons">
                                                        <button className=" icon edit-btn" onClick={() => handleOpenUpdate(price)}><FiEdit /></button>
                                                        <button className=" icon delete-btn" onClick={() => handleOpenDelete(price.id ?? "")}><FiTrash2 /></button>
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

            <PrintPriceAddModel
                key={rangeData?.id ?? "create"}
                open={openPaperModal}
                setOpen={setOpenPaperModal}
                data = {rangeData}
                id ={id!}
            />

            <ConfirmModal
                isOpen={openDeleteModal}
                title="Xác nhận xoá"
                message="Bạn có chắc muốn xoá?"
                onCancel={() => setOpenDeleteModal(false)}
                onConfirm={handleDeletePaper}
            />

        </div>
    );
};

export default PrintCostDetail;