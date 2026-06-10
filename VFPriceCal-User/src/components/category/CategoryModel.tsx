import { useState} from "react";
import "./categoryModel.scss";
import { toast } from "react-toastify";
import { createCategory } from "../../service/ProcessingService";
import type { UserInfo } from "../../context/AuthContext";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CategoryModal = ({ open, setOpen }: Props) => {

  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(""); // Lưu thông báo lỗi chung hoặc riêng



   const [user] = useState<UserInfo | null>(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            try {
                return JSON.parse(savedUser);
            } catch (e) {
                return e;
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
        id: "", // ID sẽ được backend tạo tự động
        companyId: user?.companyId ?? "", // ID ẩn từ context
        name: categoryName ?? "",
        processings: null
    };

    // Gọi API để tạo mới danh mục
    // Ví dụ: createCategory(payload).then(() => { ... });
    const response = await createCategory(payload); // Giả sử createCategory là hàm API đã được định nghĩa

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
          Thông tin danh mục
        </div>

        <div className="main">

          <div className="info">
            <label>Tên danh mục</label>
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

export default CategoryModal;
