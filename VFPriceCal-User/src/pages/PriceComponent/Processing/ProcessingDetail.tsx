import "./processingDetail.scss";
import { FaPlus } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProcessingById } from "../../../service/ProcessingService";

const ProcessingDetail = () => {
    const [activeTab, setActiveTab] = useState("paper");
    const {id} = useParams();
    const [processingData, setProcessingData] = useState<any>(null); // State để lưu chi tiết gia công 
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
        // Gọi API để lấy chi tiết gia công theo id
        // Ví dụ: getProcessingById(id).then(data => setProcessingData(data));
        const fetchProcessingDetail = async () => {
            try {
                // Giả sử bạn có API getProcessingById
                // const data = await getProcessingById(id); 
                // setProcessingData(data);
                // Tạm thời dùng dữ liệu giả để hiển thị
                const data = await getProcessingById(Number(id));
                setProcessingData(data.data);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết gia công:", error);
            }
            };
            fetchProcessingDetail();
    }, [id]);

    return (
        <div className="processing-detail">
            <div className="processing-header">
                <h3>Gia công/Cán màng</h3>
                {/* <button className="add-product-btn"> <FaPlus /> Lưu thay đổi</button> */}
            </div>
            <div className="processing-detail-info">
                <div className="processing-info-basic">
                    <div className="processing-image">
                        {/* Image placeholder */}
                    </div>
                    <div className="processing-item">
                        <label htmlFor="processing-name">Tên gia công:</label>
                        <input type="text" id="processing-name" value={processingData?.name || ""} />
                    </div>
                    <div className="processing-item">
                        <label htmlFor="processing-status">Trạng thái:</label>
                        <input type="text" id="processing-status" value= "Đang hoạt động" />
                    </div>

                </div>
                <div className="processing-info-advanced">
                    <div className="tabs">
                        <div className={`tab ${activeTab === "paper" ? "active" : ""}`} onClick={() => setActiveTab("paper")}>Danh sách</div>
                    </div>
                    <div className="tab-content">
                        {activeTab === "paper" &&
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
                                            {processingData?.processings.map((material) => (
                                                <tr key={material.id}>
                                                    <td>{material.name}</td>
                                                    <td>Tờ</td>
                                                    <td>{material.price}</td>
                                                    <td className="action-buttons">
                                                        <button className=" icon edit-btn"><FiEdit /></button>
                                                        <button className=" icon delete-btn" ><FiTrash2 /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>

                                <button className="add-processing-btn"><FaPlus /> Thêm mới</button>
                            </div>

                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcessingDetail;