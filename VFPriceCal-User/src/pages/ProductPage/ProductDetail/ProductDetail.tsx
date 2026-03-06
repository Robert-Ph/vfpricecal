import "./productDetail.scss";
import { FaPlus } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useState } from "react";


const ProductDetail = () => {
    const [activeTab, setActiveTab] = useState("paper");

    return (
        <div className="product-detail">
            <div className="product-header">
                <h3>Sản phẩm/sản phẩm A</h3>
                {/* <button className="add-product-btn"> <FaPlus /> Lưu thay đổi</button> */}
            </div>
            <div className="product-detail-info">
                <div className="product-info-basic">
                    <div className="product-image">
                        {/* Image placeholder */}
                    </div>
                    <div className="product-item">
                        <label htmlFor="product-name">Tên sản phẩm:</label>
                        <input type="text" id="product-name" value="Sản phẩm A" />
                    </div>

                    <div className="product-item">
                        <label htmlFor="product-code">Mã sản phẩm:</label>
                        <input type="text" id="product-code" value="SP001" />
                    </div>

                    <div className="product-item">
                        <label htmlFor="product-description">Mô tả:</label>
                        <input type="text" id="product-description" value="Mô tả sản phẩm A" />
                    </div>

                    <div className="product-item">
                        <label htmlFor="product-status">Trạng thái:</label>
                        <input type="text" id="product-status" value="Đang hoạt động" />
                    </div>

                </div>
                <div className="product-info-advanced">
                    <div className="tabs">
                        <div className={`tab ${activeTab === "paper" ? "active" : ""}`} onClick={() => setActiveTab("paper")}>Giấy</div>
                        <div className={`tab ${activeTab === "processing" ? "active" : ""}`} onClick={() => setActiveTab("processing")}>Gia công</div>
                    </div>
                    <div className="tab-content">
                        {activeTab === "paper" && 
                            <div className="product-paper-list">
                               <div className="table">
                                 <table className="paper-list">
                                    <thead>
                                         <tr>
                                            <th>Tên loại giấy</th>
                                            <th>Định lượng</th>
                                            <th>Quy cách</th>
                                            <th>Kích thước</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Decal giấy đế vàng</td>
                                            <td></td>
                                            <td></td>
                                            <td>320x430mm</td>
                                            <td className="action-buttons">
                                                <button className=" icon edit-btn"><FiEdit /></button>
                                                <button className=" icon delete-btn" ><FiTrash2 /></button>
                                            </td>
                                        </tr>

                                         <tr>
                                            <td>Decal nhựa trong</td>
                                            <td></td>
                                            <td></td>
                                            <td>330x480mm</td>
                                            <td className="action-buttons">
                                                <button className=" icon edit-btn"><FiEdit /></button>
                                                <button className=" icon delete-btn" ><FiTrash2 /></button>
                                            </td>
                                        </tr>
                                         <tr>
                                            <td>Decal nhựa mờ</td>
                                            <td></td>
                                            <td></td>
                                            <td>330x480mm</td>
                                            <td className="action-buttons">
                                                <button className=" icon edit-btn"><FiEdit /></button>
                                                <button className=" icon delete-btn" ><FiTrash2 /></button>
                                            </td>
                                        </tr>
                                         <tr>
                                            <td>Decal bể</td>
                                            <td></td>
                                            <td></td>
                                            <td>330x350mm</td>
                                            <td className="action-buttons">
                                                <button className=" icon edit-btn"><FiEdit /></button>
                                                <button className=" icon delete-btn" ><FiTrash2 /></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                   
                                </table>
                               </div>
                               
                                <button className="add-product-btn"><FaPlus/> Thêm loại giấy</button>
                            </div> 
                            
                        }
                        {activeTab === "processing" && 
                        <div className="product-paper-list">
                            <div className="table">
                                {/* <label htmlFor="">Cán màng</label> */}
                                 <table className="paper-list">
                                    <thead>
                                         <tr>
                                            <th>Tên gia công</th>
                                            <th>Loại gia công</th>
                                            <th>Quy cách</th>
                                            <th>Đơn giá</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Màng nhiệt bóng</td>
                                            <td>Cán màng</td>
                                            <td>Tờ</td>
                                            <td>1.000đ</td>
                                            <td className="action-buttons">
                                                <button className=" icon edit-btn"><FiEdit /></button>
                                                <button className=" icon delete-btn" ><FiTrash2 /></button>
                                            </td>
                                        </tr>

                                         <tr>
                                            <td>Màng nhiệt mờ</td>
                                            <td>Cán màng</td>
                                            <td>Tờ</td>
                                            <td>1.000đ</td>
                                            <td className="action-buttons">
                                                <button className=" icon edit-btn"><FiEdit /></button>
                                                <button className=" icon delete-btn" ><FiTrash2 /></button>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>Bế demi</td>
                                            <td>Bế</td>
                                            <td>Tờ</td>
                                            <td>1.000đ</td>
                                            <td className="action-buttons">
                                                <button className=" icon edit-btn"><FiEdit /></button>
                                                <button className=" icon delete-btn" ><FiTrash2 /></button>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>Ép kim</td>
                                            <td>Khác</td>
                                            <td>Tờ</td>
                                            <td>5.000đ</td>
                                            <td className="action-buttons">
                                                <button className=" icon edit-btn"><FiEdit /></button>
                                                <button className=" icon delete-btn" ><FiTrash2 /></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                   
                                </table>
                                <button className="add-product-btn"><FaPlus/> Thêm loại giấy</button>
                            </div> 
                        </div> 
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail; 