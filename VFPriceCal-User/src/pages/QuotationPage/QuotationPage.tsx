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

                        {/* LOẠI HÌNH IN: 4 MÀU 1 MẮT, 4 MÀU 2 MẶT, TRẮNG ĐEN 1 MẶT, TRẮNG ĐEN 2 MẶT */}
                        <div className="form-product-print-type">
                            <label htmlFor="product-print-type">Loại hình in:</label>
                            <select id="product-print-type" name="product-print-type">
                                <option value="4color-1side">4 màu 1 mặt</option>
                                <option value="4color-2side">4 màu 2 mặt</option>
                                <option value="bw-1side">Trắng đen 1 mặt</option>
                                <option value="bw-2side">Trắng đen 2 mặt</option>
                            </select>
                        </div>

                        {/* LOẠI GIÂY IN: GIẤY COATED, GIẤY OFFSET, GIẤY SPECIALTY */}
                        <div className="form-product-paper-type">
                            <label htmlFor="product-paper-type">Loại giấy in:</label>
                            <select id="product-paper-type" name="product-paper-type">
                                <option value="coated">Giấy coated</option>
                                <option value="offset">Giấy offset</option>
                                <option value="specialty">Giấy specialty</option>
                                <option value="bw-2side">Trắng đen 2 mặt</option>
                            </select>
                        </div>


                        {/* SỐ LƯỢNG: */}
                        <div className="form-product-quantity">
                            <label htmlFor="product-quantity">Số lượng:</label>
                            <input type="number" id="product-quantity" name="product-quantity" />
                        </div>

                    </div>

                </div>

                {/* THÔNG TIN GIA CÔNG SAU IN*/}
                <div className="info-item info-quantity">
                    <div className="item-lable">
                        <h3>Thông tin gia công sau in</h3>
                    </div>

                    {/* GIA CÔNG CƠ BẢN: CÁN MÀNG, BẾ TEM */}
                    <div className="item-content">
                        <div className="form-film-lamination">
                            <label htmlFor="">Cán màng:</label>
                            <select name="film-lamination" id="film-lamination">
                                <option value="none">Không</option>
                                <option value="matte">Màng mờ</option>
                                <option value="glossy">Màng bóng</option>
                                <option value="metallic">Màng ánh kim</option>
                                <option value="special">Màng đặc biệt</option>
                            </select>
                        </div>
                        <div className="form-die-cutting">
                            <label htmlFor="">Bế tem:</label>
                            <select name="die-cutting" id="die-cutting">
                                <option value="none">Không</option>
                                <option value="quadrilateral">Hình tứ giác/bế demi</option>
                                <option value="circle">Hình tròn/oval</option>
                                <option value="special">Hình đặt biệt</option>
                            </select>
                        </div>


                        {/* GIA CÔNG ĐẶC BIỆT: ÉP KIM, DẬP NỔI, SỐ NHẢY */}
                        <div className="form-processing">
                            <h4>Gia công đặc biệt:</h4>
                            <div className="form-processing-list">
                                <div className="form-processing-item">
                                    <input type="checkbox" id="processing-1" name="processing" value="processing-1" />
                                    <label htmlFor="processing-1">Ép kim</label>
                                </div>

                                <div className="form-processing-item">
                                    <input type="checkbox" id="processing-2" name="processing" value="processing-2" />
                                    <label htmlFor="processing-2">Dập nổi</label>
                                </div>

                                <div className="form-processing-item">
                                    <input type="checkbox" id="processing-3" name="processing" value="processing-3" />
                                    <label htmlFor="processing-3">Số nhảy</label>
                                </div>

                            </div>

                        </div>
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
                        <div className="form-sheets-page">
                            <label htmlFor="sheets-page">Số tờ in:</label>
                            <span className="sheets-page-value">20</span>
                        </div>
                        <div className="form-printing-price">
                            <label htmlFor="quotation-price">Giá in:</label>
                            <span className="printing-price-value">100.000đ</span>
                        </div>
                        <div className="form-processing-price">
                            <label htmlFor="return-rate">Giá gia công:</label>
                            <span className="processing-price-value">50.000đ</span>
                        </div>
                        <div className="form-discount">
                            <label htmlFor="discount">Giảm:</label>
                            <span className="discount-value">5000đ</span>
                        </div>
                    </div>
                    <hr />
                    <div className="total-price">
                        <label htmlFor="total-price">Tổng giá:</label>
                        <span className="total-price-value">145.000đ</span>
                    </div>

                    <div className="action-buttons">
                        <button className="btn btn-primary">Lưu báo giá</button>
                        <button className="btn btn-secondary">In báo giá</button>
                    </div>

                </div>


            </div>

        </div>
    );
}

export default QuotationPage;