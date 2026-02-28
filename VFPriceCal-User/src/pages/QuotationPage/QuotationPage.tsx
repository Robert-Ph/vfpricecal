import "./quotationPage.scss";

const QuotationPage = () => {
    return (
        <div className="body">
            <div className="info">
                <div className="info-item info-item-1">

                    {/* Thông tin chung: TÊN BÁO GIÁ VÀ LOẠI KHÁCH HÀNG */}
                    <div className="item-lable">
                        <h3>Thông tin chung</h3>
                    </div>
                    <div className="item-content">
                        <div className="form-name">
                            <label htmlFor="name">Tên báo giá:</label>
                            <input type="text" id="name" name="name" />
                        </div>

                        <div className="form-type-customer">
                            <label htmlFor="customer-type">Loại khách hàng:</label>
                            <select id="customer-type" name="customer-type">
                                <option value="individual">Cá nhân</option>
                                <option value="company">Doanh nghiệp</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* THÔNG TIN SẢN PHẨM  VÀ SỐ LƯỢNG*/}
                <div className="info-item info-product">
                    <div className="item-lable">
                        <h3>Thông tin sản phẩm</h3>
                    </div>
                    <div className="item-content">
                        {/* TÊN SẢN PHẨM: */}
                        <div className="form-product-name">
                            <label htmlFor="product-name">Tên sản phẩm:</label>
                            <select name="product-name" id="product-name">
                                <option value="product1">Sản phẩm 1</option>
                                <option value="product2">Sản phẩm 2</option>
                                <option value="product3">Sản phẩm 3</option>
                            </select>
                        </div>

                        {/* KÍCH THƯỚC SẢN PHẨM: */}
                        <div className="form-product-size">
                            <label htmlFor="product-size">Kích thước sản phẩm:</label>
                            <input type="number" id="product-size-width" name="product-size" />
                            <span>x</span>
                            <input type="number" id="product-size-height" name="product-size" />
                            <span>mm</span>
                        </div>

                    </div>

                </div>

                {/* THÔNG TIN GIA CÔNG SAU IN*/}
                <div className="info-item info-quantity">
                    <div className="item-lable">
                        <h3>Thông tin gia công sau in</h3>
                    </div>
                    <div className="item-content">

                    </div>

                </div>
            </div>


            {/* KẾT QUẢ BÁO GIÁ: GIÁ VÀ TỶ LỆ HOÀN TRẢ */}
            <div className="quotation">
                <div className="info-item info-quotation">
                    <div className="item-lable">
                        <h3>Kết quả báo giá</h3>
                    </div>
                    <div className="item-content">
                        <h3>Giá: 100.000đ</h3>
                        <h3>Tỷ lệ hoàn trả: 10%</h3>
                    </div>
                </div>


            </div>

        </div>
    );
}

export default QuotationPage;