import { useEffect, useState } from "react";
import "./QuotationMobile.scss";
import {
//   FaArrowLeft,
  FaPrint,
  FaCalculator,
  FaPlus,
  FaBox,
  FaTools,
  FaTable,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getQuotations } from "../../service/QuotationService";

const QuotationMobile = () => {
    const { companyName, companyId } = useParams();
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getQuotations(String(companyId));
                setList(response.data);
            } catch (error) {
                console.error("Failed to fetch quotations:", error);
            }
        };
        fetchData();
    }, [companyId]);

    console.log(companyName);
    console.log(companyId);
  return (
    <div className="quotation-mobile">
      {/* Header */}
      <header className="mobile-header">
        <button className="icon-btn">
          {/* <FaArrowLeft /> */}
        </button>

        <h1>BÁO GIÁ</h1>

        <button className="icon-btn">
          <FaPrint />
        </button>
      </header>

      {/* Product */}
      <section className="card">
        <div className="card-title">
          <FaBox />
          <span>THÔNG TIN SẢN PHẨM</span>
        </div>

        <label>Kích thước sản phẩm</label>

        <div className="size-row">
          <div>
            <label>Rộng (mm)</label>
            <input placeholder="Nhập chiều rộng" />
          </div>

          <div>
            <label>Cao (mm)</label>
            <input placeholder="Nhập chiều cao" />
          </div>
        </div>

        <label>Loại hình in</label>
        <select>
          <option>Chọn loại</option>
        </select>

        <label>Loại giấy in</label>
        <select>
          <option>Chọn giấy</option>
        </select>

        <label>Khổ giấy in</label>
        <select>
          <option>Chọn kích thước</option>
        </select>

        <label>Số lượng</label>
        <input placeholder="Nhập số lượng" />
      </section>

      {/* Processing */}
      <section className="card">
        <div className="card-title">
          <FaTools />
          <span>GIA CÔNG SAU IN</span>
        </div>

        <button className="processing-btn">
          <FaPlus />
          <span>Thêm gia công</span>
        </button>

        <p className="hint">
          Thêm các công đoạn gia công để tính giá chính xác hơn.
        </p>
      </section>

      {/* Result */}
      <section className="card result-card">
        <div className="card-title">
          <FaTable />
          <span>KẾT QUẢ BÁO GIÁ</span>
        </div>

        <div className="result-row">
          <span>Giá 1 sản phẩm</span>
          <strong>0 đ</strong>
        </div>

        <div className="result-row">
          <span>Số sản phẩm/tờ</span>
          <strong>0</strong>
        </div>

        <div className="result-row">
          <span>Số tờ in</span>
          <strong>0 tờ</strong>
        </div>

        <div className="result-row">
          <span>Tạm tính</span>
          <strong>0 đ</strong>
        </div>

        <div className="divider" />

        <div className="result-row">
          <span>VAT (%)</span>
          <strong>0 đ</strong>
        </div>

        <div className="total-box">
          <span>TỔNG TIỀN</span>
          <strong>0 đ</strong>
        </div>
      </section>

      {/* Bottom Actions */}
      <div className="bottom-actions">
        <button className="btn-outline">
          <FaCalculator />
          Tính báo giá
        </button>

        <button className="btn-primary">
          <FaPrint />
          In báo giá
        </button>
      </div>
    </div>
  );
}

export default QuotationMobile;