import "./quotationPage.scss";

const QuotationPage = () => {
    return (
        <div className="body">
            <div className="info">
                <div className="info-item info-item-1"></div>
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