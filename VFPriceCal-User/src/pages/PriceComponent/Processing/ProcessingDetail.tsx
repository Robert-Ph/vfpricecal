import "./processingDetail.scss";
import { FiEdit, FiTrash2, FiLayers, FiImage, FiTag, FiGrid, FiPlus   } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteProcessing, getProcessingById } from "../../../service/ProcessingService";
import ProcessingAddModel from "../../../components/processing/ProcessingAdd";
import ConfirmModal from "../../../components/ConfirmModal";
import { toast } from "react-toastify";
import type { category, processing } from "../../../model/model";

const ProcessingDetail = () => {

    const [openPaperModal, setOpenPaperModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedProcessingId, setSelectedProcessingId] = useState<string>();
    const [dataProcessing, setDataProcessing] = useState<processing>();
    const {id} = useParams();
    const [processingData, setProcessingData] = useState<category>(); // State để lưu chi tiết gia công 
    

    useEffect(() => {
        // Gọi API để lấy chi tiết gia công theo id
        // Ví dụ: getProcessingById(id).then(data => setProcessingData(data));
        const fetchProcessingDetail = async () => {
            try {
                // Giả sử bạn có API getProcessingById
                // const data = await getProcessingById(id); 
                // setProcessingData(data);
                // Tạm thời dùng dữ liệu giả để hiển thị
                const data = await getProcessingById(id!);
                setProcessingData(data.data);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết gia công:", error);
            }
            };
            fetchProcessingDetail();
    }, [id]);

        const handleOpenUpdate = (item: processing) => {
            setDataProcessing(item);
            setOpenPaperModal(true);
    };

    const handleOpenDelete = (id: string) => {
            setSelectedProcessingId(id);
            setOpenDeleteModal(true);
    };
        
    const handleDeletePaper = async () => {
            try {
                if (!selectedProcessingId) return;
        
                await deleteProcessing(selectedProcessingId, id ?? "");
        
        
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
                        <h3>Gia công /{processingData?.name || ""}</h3>
                        <p>Quản lý thông tin gia công</p>
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
                                                <strong>{processingData?.name || ""}</strong>
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
             
                    <div className="tab-content">
                            <div className="product-paper-list">
                                <div className="table">
                                    <table className="paper-list">
                                        <thead>
                                            <tr>
                                                <th>Tên loại màng</th>
                                                <th>Quy cách</th>
                                                <th>Giá</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Ví dụ về một sản phẩm */}
                                            {processingData?.processings?.map((material: processing) => (
                                                <tr key={material.id}>
                                                    <td>{material.name}</td>
                                                    <td>Tờ</td>
                                                    <td>{material.price}</td>
                                                    <td className="action-buttons">
                                                        <button className=" icon edit-btn" onClick={()=> handleOpenUpdate(material)}><FiEdit /></button>
                                                        <button className=" icon delete-btn" onClick={() => handleOpenDelete(material.id ?? "")}><FiTrash2 /></button>
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

            <ProcessingAddModel
                open={openPaperModal}
                setOpen={setOpenPaperModal}
                data = {dataProcessing}
                id = {id!}
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

export default ProcessingDetail;