import "./quotationPage.scss";

const QuotationPage = () => {
    return (
        <div className="body">
            <div className="info">
                <div className="info-item info-item-1">
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

                <div className="info-item info-product"></div>
                <div className="info-item info-quantity"></div>
            </div>
            <div className="quotation">

                <div className="price-return">
                    <h3>Kết quả báo giá</h3>
                    <p>This is the quotation page.</p>
                    <p>Price: $100</p>
                    <p>Return: 10%</p>
                </div>
            </div>

        </div>
    );
}

export default QuotationPage;