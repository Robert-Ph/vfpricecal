import "./productDetail.scss";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";

const ProductDetail = () => {
    const [activeTab, setActiveTab] = useState("paper");

    return (
        <div className="product-detail">
            <div className="product-header">
                <h3>Sản phẩm/sản phẩm A</h3>
                <button className="add-product-btn"> <FaPlus /> Lưu thay đổi</button>
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
                        {activeTab === "paper" && <p>Thông tin giấy của sản phẩm</p>}
                        {activeTab === "processing" && <p>Thông tin gia công của sản phẩm</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail; 