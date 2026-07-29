import "./oderQuote.scss";

import {
  FiFileText,     // Báo giá
  FiRefreshCw,    // Làm mới
  // FiPrinter,      // In báo giá
  FiLayers,       // Thông tin chung
  FiPackage,      // Thông tin sản phẩm
//   FiSettings,     // Gia công sau in
  FiGrid,         // Kết quả báo giá
//   FiTrash2,
  FiExternalLink,
   FiEdit, FiTrash2
  
} from "react-icons/fi";
import { FaCalculator } from "react-icons/fa";
import AddQuoteModal from "../../components/listQuote/AddQuoteModal";
import {  useState } from "react";




const OderQuote = () => {
   const [openPaperModal, setOpenPaperModal] = useState(false);



   

    return (
        <div className="quotation-list-page">

  {/* HEADER */}
  <div className="quotation-list-header">
    <div className="header-left">
      <div className="header-icon">
        <FiFileText />
      </div>

      <div>
        <h1>BÁO GIÁ</h1>
        <p>Tính toán và tạo báo giá nhanh chóng</p>
      </div>
    </div>

    <div className="header-actions">
      <button className="btn-outline" onClick={() => window.location.reload()}>
        <FiRefreshCw />
        Làm mới
      </button>

      <button className="btn-primary" >
          <FiFileText />
          Xuất file
      </button>
       <button className="btn-primary" >
          <FaCalculator />
          Tính báo giá
        </button>
    </div>
  </div>

  <div className="quotation-list-content">

    {/* LEFT */}
    <div className="quotation-list-main">

      {/* THÔNG TIN CHUNG */}
      <div className="card-list-quotation">

        <div className="section-list-title-quote">
          <FiLayers />
          <span>THÔNG TIN CHUNG</span>
        </div>

        <div className="general-list-form">
          <div className="field-quotation">
            <label>Mã đơn báo giá</label>
            <input placeholder="Mã đơn báo giá" />
          </div>

          <div className="field-quotation">
            <label>Tên khách hàng</label>
            <input placeholder="Nhập tên khách hàng" />
          </div>

          <div className="field-quotation">
            <label>Biên lợi nhuận</label>
            <input type="number" placeholder="Nhập biên lợi nhuận" />
          </div>

          <div className="field-quotation vat-field">
            <label>VAT (%)</label>

            <div className="input-addon">
              <input placeholder="Nhập VAT (%)"  />
              <span>%</span>
            </div>
          </div>

        </div>
      </div>

      {/* THÔNG TIN SẢN PHẨM */}
      <div className="card-list-quotation">

        <div className="section-title-quote">
          <FiPackage />
          <span>DANH SÁCH SẢN PHẨM</span>
        </div>
           
        <div className="product-list-grid">
             <button className="add-product" onClick={() => setOpenPaperModal(true)} >
                + Thêm sản phẩm
            </button>
             <table className="product-list-table">

              <thead>

                <tr>
                  <th>#</th>
                  <th>Tên sản phẩm</th>
                  <th>Kích thước</th>
                  <th>Giấy</th>
                  <th>Loại in</th>
                  <th>Gia công</th>
                  <th>SL</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                  <th>Thao tác</th>
                </tr>

              </thead>

              <tbody>

                <tr>

                  <td>1</td>

                  <td>Tờ rơi A5</td>

                  <td>148 × 210</td>

                  <td>C300</td>

                  <td>Màu 1 mặt</td>

                  <td>Cán màng <br/> demi</td>

                  <td>1000</td>

                  <td>1.250</td>

                  <td>1.250.000</td>

                  <td className="action-buttons">
                    <button className=" icon-list edit-btn">
                      <FiEdit />
                    </button>
                    <button className=" icon-list delete-btn" ><FiTrash2 /></button>
                  </td>

                </tr>

                <tr>

                  <td>2</td>

                  <td>Tờ rơi A5</td>

                  <td>148 × 210</td>

                  <td>C300</td>

                  <td>Màu 1 mặt</td>

                  <td>Cán màng <br/> demi</td>

                  <td>1000</td>

                  <td>1.250</td>

                  <td>1.250.000</td>

                  <td className="action-buttons">
                    <button className=" icon-list edit-btn">
                      <FiEdit />
                    </button>
                    <button className=" icon-list delete-btn" ><FiTrash2 /></button>
                  </td>

                </tr>

              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3}>
                      <div className="summary-container">
                        <span className="left-text">
                          Tổng cộng: 2 sản phẩm
                        </span>
                    </div>
                  </td>
                  <td colSpan={7}>
                      <div className="summary-container">
                        <span className="right-text">
                          Tổng thành tiền sản phẩm:   <strong>  2.500.000 đ</strong> 
                        </span>
                    </div>
                  </td>
                </tr>
              </tfoot>

            </table>
        </div>
      </div>

      {/* GIA CÔNG */}
      {/* <div className="card-list-quotation">

        <div className="section-title-quote">
          <FiSettings />
          <span>GIA CÔNG SAU IN</span>
        </div>

        <button className="add-processing" >
          + Thêm gia công
        </button>

        <table className="processing-table">

          <tbody>
           
   
                <tr>
                    <td colSpan={6}>
                        <div className="empty-table">
                            <FiFileText size={40} />
                            <p>Chưa có gia công nào</p>
                        </div>
                    </td>
                </tr>
                  
          </tbody>
        </table>

      </div> */}
    </div>

    {/* RIGHT */}
    <div className="quotation-list-sidebar">

      <div className="result-list-card">

        <div className="section-title-quote">
          <FiGrid />
          <span>TỔNG BÁO GIÁ:</span>
        </div>
        <p className="result-subtitle"></p>

         <div className="result-list-row">
          <span>Tổng giá vốn</span>
          <strong>0đ</strong>
        </div>

        <div className="result-list-row">
          <span>Tổng gia công</span>
          <strong>0đ</strong>
        </div>

 
        <hr />

        <div className="result-list-row">
          <span>Tạm tính</span>
          <strong> 0</strong>
        </div>

        <div className="result-list-row">
          <span>Giảm giá</span>
          <strong> 0</strong>
        </div>

        <div className="result-list-row">
          <span>Sau giảm giá</span>
          <strong> 0</strong>
        </div>

        <div className="result-list-row">
          <span>VAT (%)</span>
          <strong>0</strong>
        </div>

        <div className="result-list-row">
          <span>Lợi nhuận</span>
          <strong>0</strong> 
        </div>

        <div className="total-list-box">
            <h3>TỔNG TIỀN THANH TOÁN</h3>

          <span>0</span>
          <p>(Đã bao gồm VAT)</p>
        </div>
      </div>

      <div className="notice-box">
        <h4>Thông tin</h4>

        <p>
          Vui lòng nhập đầy đủ thông tin sản phẩm và gia công
          để tính báo giá chính xác nhất.
        </p>
      </div>

    </div>
  </div>

  <AddQuoteModal
    open={openPaperModal}
    setOpen={setOpenPaperModal}
  />
</div>

);
}

export default OderQuote;

