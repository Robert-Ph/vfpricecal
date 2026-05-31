import { useState} from "react";
import "./processingAdd.scss";
import { toast } from "react-toastify";
import { createCategory, createProcessingByCategory } from "../../service/ProcessingService";
import { useParams } from "react-router-dom";


const ProcessingAddModel = ({ open, setOpen }) => {

  const [categoryName, setCategoryName] = useState("");
  const [priceProcessing, setPriceProcessing] = useState(Number);
  const [error, setError] = useState(""); // Lưu thông báo lỗi chung hoặc riêng
  const {id} = useParams();


   const [user] = useState<any>(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            try {
                return JSON.parse(savedUser);
            } catch (e) {
                return null;
            }
        }
        return null;
    });

  const handleSubmit = async () => {
        // Validate inputs
    if (!categoryName) {
      setError("Vui lòng điền đầy đủ thông tin.");
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    // setOpen(false);
    // // Reset fields
    // setCategoryName("");
    setError(""); // Reset error message
    const payload = {
        id: null, // ID sẽ được backend tạo tự động
        categoryId: id, // ID ẩn từ context
        name: categoryName,
        price: priceProcessing
    };

    // Gọi API để tạo mới danh mục
    // Ví dụ: createCategory(payload).then(() => { ... });
    const response = await createProcessingByCategory(payload); // Giả sử createCategory là hàm API đã được định nghĩa

    if (response.code === 200 || response.code === 201) {
        toast.success(`Tạo danh mục ${categoryName} thành công!`);
        setTimeout(() => {
            window.location.reload(); // Hoặc navigate("/component/processing") nếu bạn dùng react-router
        }, 500); // Đợi 0.5 giây trước khi reload hoặc navigate
    } else {
        toast.error(`Có lỗi xảy ra khi tạo danh mục ${categoryName}.`);
    }
  };

    if (!open) return null;

  return (
    <div className="overlay">
      <div className="modal">

        <div className="modal-header">
          Thông tin loại gia công
        </div>

        <div className="main">

          <div className="info">
            <label>Tên loại gia công</label>
            <input
            className={!categoryName && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="text"
              placeholder="Nhập tên danh mục..."
              value={categoryName}
              onChange={(e) => {setCategoryName(e.target.value)
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

          <div className="info">
            <label>Giá</label>
            <input
            className={!priceProcessing && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="text"
              placeholder="Nhập giá..."
              value={priceProcessing}
              onChange={(e) => {setPriceProcessing(Number(e.target.value))
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

export default ProcessingAddModel;
