import { useState} from "react";
import "./printCostNew.scss";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";


const PrintCostNewModal = ({ open, setOpen, onAdd }) => {

  const [minLengthCm, setMinLengthCm] = useState<number | null>(null);
  const [maxLengthCm, setMaxLengthCm] = useState<number | null>(null);
  const [pricePerMeter, setPricePerMeter] = useState<number | null>(null);
  const [error, setError] = useState(""); // Lưu thông báo lỗi chung hoặc riêng

  if (!open) return null;

  const handleSubmit = () => {
        // Validate inputs
    if (!minLengthCm || !maxLengthCm || !pricePerMeter) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const newData = {
      id: uuidv4(), // Tạo chuỗi ID duy nhất như: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
      printPriceId: null, // Giá trị này sẽ được backend gán khi lưu vào database
      minLengthCm,
      maxLengthCm,
      pricePerMeter
    };
    
    onAdd(newData);
    setOpen(false);
    // Reset fields
    setMinLengthCm(null); setMaxLengthCm(null); setPricePerMeter(null);
    setError(""); // Reset error message
  };

  const handleCancel = () => {
    setOpen(false);
    setMinLengthCm(null); setMaxLengthCm(null); setPricePerMeter(null);
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
            <label>Từ(mm)<span className="required">*</span></label>
            <input
            className={!minLengthCm && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="number"
              placeholder="Từ kích thước..."
              value={minLengthCm || ""}
              onChange={(e) => {setMinLengthCm(Number(e.target.value))
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

          <div className="info">
            <label>Đến(mm)<span className="required">*</span></label>
            <input
              className={!maxLengthCm && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="number"
              placeholder="Đến kích thước..."
              value={maxLengthCm || ""}
              onChange={(e) => {setMaxLengthCm(Number(e.target.value))
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

          <div className="info">
            <label>Giá (VNĐ)<span className="required">*</span></label>
            <input
              className={!pricePerMeter && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="number"
              placeholder="Nhập giá..."
              value={pricePerMeter || ""}
              onChange={(e) => {setPricePerMeter(Number(e.target.value))
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

export default PrintCostNewModal;
