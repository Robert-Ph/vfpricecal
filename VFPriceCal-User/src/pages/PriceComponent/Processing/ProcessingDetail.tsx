import "./processingDetail.scss";
import { FaPlus } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useState } from "react";

const ProcessingDetail = () => {
    const [activeTab, setActiveTab] = useState("paper");

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
                        <input type="text" id="processing-name" value="Cán màng" />
                    </div>

                    <div className="processing-item">
                        <label htmlFor="processing-code">Mã gia công:</label>
                        <input type="text" id="processing-code" value="GC001" />
                    </div>

                    <div className="processing-item">
                        <label htmlFor="processing-description">Mô tả:</label>
                        <input type="text" id="processing-description" value="Mô tả gia công A" />
                    </div>

                    <div className="processing-item">
                        <label htmlFor="processing-status">Trạng thái:</label>
                        <input type="text" id="processing-status" value="Đang hoạt động" />
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
                                            <tr>
                                                <td>Màng nhiệt bóng</td>
                                                <td>Tờ</td>
                                                <td>1.000đ</td>
                                                <td className="action-buttons">
                                                    <button className=" icon edit-btn"><FiEdit /></button>
                                                    <button className=" icon delete-btn" ><FiTrash2 /></button>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>Màng nhiệt mờ</td>
                                                <td>Tờ</td>
                                                <td>1.000đ</td>
                                                <td className="action-buttons">
                                                    <button className=" icon edit-btn"><FiEdit /></button>
                                                    <button className=" icon delete-btn" ><FiTrash2 /></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Màng ánh kim</td>
                                                <td>Tờ</td>
                                                <td>1.000đ</td>
                                                <td className="action-buttons">
                                                    <button className=" icon edit-btn"><FiEdit /></button>
                                                    <button className=" icon delete-btn" ><FiTrash2 /></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Màng keo bóng</td>
                                                <td>Tờ</td>
                                                <td>1.000đ</td>
                                                <td className="action-buttons">
                                                    <button className=" icon edit-btn"><FiEdit /></button>
                                                    <button className=" icon delete-btn" ><FiTrash2 /></button>
                                                </td>
                                            </tr>
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