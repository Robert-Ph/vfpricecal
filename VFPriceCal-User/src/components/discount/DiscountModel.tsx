import { useState} from "react";
import "./discountModel.scss";
import { toast } from "react-toastify";
import { createDiscount } from "../../service/DiscountService";


const DiscountModel = ({ open, setOpen }) => {

  const [discountName, setDistcountName] = useState("");
  const [discount, setDiscount] = useState(Number);
  const [error, setError] = useState(""); // Lưu thông báo lỗi chung hoặc riêng


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
    if (!discountName) {
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
        companyId: Number(user?.companyId), // ID ẩn từ context
        name: discountName,
        discount: discount

    };

    // Gọi API để tạo mới danh mục
    // Ví dụ: createCategory(payload).then(() => { ... });
    const response = await createDiscount(payload); // Giả sử createCategory là hàm API đã được định nghĩa

    if (response.code === 200 || response.code === 201) {
        toast.success(`Tạo  ${discountName} thành công!`);
        setTimeout(() => {
            window.location.reload(); // Hoặc navigate("/component/processing") nếu bạn dùng react-router
        }, 500); // Đợi 0.5 giây trước khi reload hoặc navigate
    } else {
        toast.error(`Có lỗi xảy ra khi tạo danh mục ${discountName}.`);
    }
  };

    if (!open) return null;

  return (
    <div className="overlay">
      <div className="modal">

        <div className="modal-header">
          Thông tin chiết khấu
        </div>

        <div className="main">

          <div className="info">
            <label>Tên </label>
            <input
            className={!discountName && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="text"
              placeholder="Nhập tên..."
              value={discountName}
              onChange={(e) => {setDistcountName(e.target.value)
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

          <div className="info">
            <label>Chiết khấu (%)</label>
            <input
            className={!discount && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="text"
              placeholder="Nhập chiết khấu..."
              value={discount}
              onChange={(e) => {setDiscount(Number(e.target.value))
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

export default DiscountModel;
