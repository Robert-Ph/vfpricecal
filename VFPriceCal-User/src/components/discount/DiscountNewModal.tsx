import { useState} from "react";
import "./discountNewModal.scss";
import { v4 as uuidv4 } from 'uuid';


const DiscountNewModal = ({ open, setOpen, onAdd }) => {

  const [maxAmount, setMaxAmount] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const [error, setError] = useState(""); // Lưu thông báo lỗi chung hoặc riêng

  if (!open) return null;

  const handleSubmit = () => {
        // Validate inputs
    if ( !maxAmount || !discount) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const newData = {
      id: uuidv4(), // Tạo chuỗi ID duy nhất như: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
      discountId: null, // Giá trị này sẽ được backend gán khi lưu vào database
      maxAmount,
      discount
    };
    
    onAdd(newData);
    setOpen(false);
    // Reset fields
    setMaxAmount(null); setDiscount(null);
    setError(""); // Reset error message
  };

  const handleCancel = () => {
    setOpen(false);
    setMaxAmount(null); setDiscount(null);
    setError("");
  };

  return (
    <div className="overlay">
      <div className="modal">

        <div className="modal-header">
          Thông tin chiều dài tính counter
        </div>
        <span className="required">{error} </span>

        <div className="main">

          <div className="info">
            <label>Đến giá trị đơn(vnđ)<span className="required">*</span></label>
            <input
              className={!maxAmount && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="number"
              placeholder="Đến nhỏ hơn..."
              value={maxAmount || ""}
              onChange={(e) => {setMaxAmount(Number(e.target.value))
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

          <div className="info">
            <label>Chiếc khấu(%)<span className="required">*</span></label>
            <input
              className={!discount && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="number"
              placeholder="Nhập chiếc khấu..."
              value={discount || ""}
              onChange={(e) => {setDiscount(Number(e.target.value))
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

        </div>

        <div className="modal-footer">
          <button
            className="btn btn-cancel"
            onClick={handleCancel}
          >
            Hủy
          </button>

          <button
            className="btn btn-add"
            onClick={handleSubmit}
          >
            Xác nhận
          </button>
        </div>

      </div>
    </div>
  );
};

export default DiscountNewModal;
