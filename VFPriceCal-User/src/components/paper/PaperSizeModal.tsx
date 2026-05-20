import { useState} from "react";
import "./paperModel.scss";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";
import { createOne } from "../../service/PaperService";


const PaperSizeModal = ({ open, setOpen, id }) => {

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [price, setPrice] = useState("");
  const [role, setRole] = useState("User");
  const [error, setError] = useState(""); // Lưu thông báo lỗi chung hoặc riêng

  if (!open) return null;

  const handleSubmit = async () => {
        // Validate inputs
    if (!width || !height || !price) {
      setError("Vui lòng điền đầy đủ thông tin.");
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    const payload = {
            id: null, // ID sẽ được backend tạo tự động
            paperId: id, // ID ẩn từ context
            width: Number(width),
            height: Number(height),
            price: Number(price)
        };
    
        // Gọi API để tạo mới danh mục
        // Ví dụ: createCategory(payload).then(() => { ... });
        const response = await createOne(payload); // Giả sử createCategory là hàm API đã được định nghĩa
    
        if (response.code === 200 || response.code === 201) {
            toast.success(`Tạo thành công!`);
            setTimeout(() => {
                window.location.reload(); // Hoặc navigate("/component/processing") nếu bạn dùng react-router
            }, 500); // Đợi 0.5 giây trước khi reload hoặc navigate
        } else {
            toast.error(`Có lỗi xảy ra khi tạo.`);
        }




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

export default PaperSizeModal;