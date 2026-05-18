import { useState} from "react";
import "./paperModel.scss";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";


const PaperModal = ({ open, setOpen, onAdd }) => {

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [price, setPrice] = useState("");
  const [role, setRole] = useState("User");
  const [error, setError] = useState(""); // Lưu thông báo lỗi chung hoặc riêng

  if (!open) return null;

  const handleSubmit = () => {
        // Validate inputs
    if (!width || !height || !price) {
      setError("Vui lòng điền đầy đủ thông tin.");
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const newData = {
      id: uuidv4(), // Tạo chuỗi ID duy nhất như: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
      width,
      height,
      price
    };
    
    onAdd(newData);
    setOpen(false);
    // Reset fields
    setWidth(""); setHeight(""); setPrice("");
    setError(""); // Reset error message
  };

  return (
    <div className="overlay">
      <div className="modal">

        <div className="modal-header">
          Thông tin giấy
        </div>

        <div className="main">

          <div className="info">
            <label>Chiều rộng(mm)</label>
            <input
            className={!width && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="number"
              placeholder="Nhập chiều rộng..."
              value={width}
              onChange={(e) => {setWidth(e.target.value)
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

          <div className="info">
            <label>Chiều cao(mm)</label>
            <input
              className={!height && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="number"
              placeholder="Nhập chiều cao..."
              value={height}
              onChange={(e) => {setHeight(e.target.value)
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

          <div className="info">
            <label>Giá (VNĐ)</label>
            <input
              className={!price && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="number"
              placeholder="Nhập giá..."
              value={price}
              onChange={(e) => {setPrice(e.target.value)
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

        </div>

        <div className="modal-footer">
          <button
            className="btn btn-cancel"
            onClick={() => setOpen(false)}
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

export default PaperModal;
