import "./paperDetail.scss";
import { FaPlus } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useState } from "react";

const PaperDetail = () => {
    const [activeTab, setActiveTab] = useState("paper");
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
                        <input type="text" id="paper-name" value="Giấy A" />
                    </div>

                    <div className="paper-item">
                        <label htmlFor="paper-code">Mã giấy/vật liệu:</label>
                        <input type="text" id="paper-code" value="GC001" disabled />
                    </div>

                    <div className="paper-item">
                        <label htmlFor="paper-description">Mô tả:</label>
                        <input type="text" id="paper-description" value="Mô tả giấy/vật liệu A" />
                    </div>

                    <div className="paper-item">
                        <label htmlFor="paper-status">Trạng thái:</label>
                        <input type="text" id="paper-status" value="Đang hoạt động" />
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
                                            <tr>
                                                <td>210mm</td>
                                                <td>297mm</td>
                                                <td>1.000đ</td>
                                                <td className="action-buttons">
                                                    <button className=" icon edit-btn"><FiEdit /></button>
                                                    <button className=" icon delete-btn" ><FiTrash2 /></button>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>210mm</td>
                                                <td>297mm</td>
                                                <td>1.000đ</td>
                                                <td className="action-buttons">
                                                    <button className=" icon edit-btn"><FiEdit /></button>
                                                    <button className=" icon delete-btn" ><FiTrash2 /></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>210mm</td>
                                                <td>297mm</td>
                                                <td>1.000đ</td>
                                                <td className="action-buttons">
                                                    <button className=" icon edit-btn"><FiEdit /></button>
                                                    <button className=" icon delete-btn" ><FiTrash2 /></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>210mm</td>
                                                <td>297mm</td>
                                                <td>1.000đ</td>
                                                <td className="action-buttons">
                                                    <button className=" icon edit-btn"><FiEdit /></button>
                                                    <button className=" icon delete-btn" ><FiTrash2 /></button>
                                                </td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>

                                <button className="add-paper-btn"><FaPlus /> Thêm kích thước</button>
                            </div>

                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PaperDetail;