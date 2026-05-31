import {useState} from "react";
import "./profitModal.scss";
import { toast } from "react-toastify";
import { create } from "../../service/ProfitService";
import type { UserInfo } from "../../context/AuthContext";


const ProfitModal = ({ open, setOpen }) => {

  const [profitName, setProfitName] = useState<string>("");
  const [percentage, setpercentage] = useState<number>(0);
  const [error, setError] = useState(""); // Lưu thông báo lỗi chung hoặc riêng


   const [user] = useState<UserInfo | null>(() => {
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
    if (!profitName) {
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
        companyId: user?.companyId ?? "", // ID ẩn từ context
        name: profitName,
        percentage: percentage

    };
    console.log("Payload gửi đi:", user?.companyId); // Kiểm tra payload trước khi gửi API

    // Gọi API để tạo mới danh mục
    // Ví dụ: createCategory(payload).then(() => { ... });
    const response = await create(payload); // Giả sử createCategory là hàm API đã được định nghĩa

    if (response.code === 200 || response.code === 201) {
        toast.success(`Tạo  ${profitName} thành công!`);
        setTimeout(() => {
            window.location.reload(); // Hoặc navigate("/component/processing") nếu bạn dùng react-router
        }, 500); // Đợi 0.5 giây trước khi reload hoặc navigate
    } else {
        toast.error(`Có lỗi xảy ra khi tạo danh mục ${profitName}.`);
    }
  };

    if (!open) return null;

  return (
    <div className="overlay">
      <div className="modal">

        <div className="modal-header">
          Thông tin biên lợi nhuận
        </div>

        <div className="main">

          <div className="info">
            <label>Tên </label>
            <input
            className={!profitName && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="text"
              placeholder="Nhập tên..."
              value={profitName}
              onChange={(e) => {setProfitName(e.target.value)
                if(error) setError(""); // Xóa thông báo khi người dùng bắt đầu gõ lại
              }}
            />
          </div>

          <div className="info">
            <label>Tỷ lệ % (lợi nhuận = tỷ lệ - 100)</label>
            <input
            className={!percentage && error ? "input-error" : ""} // Thêm class để viền đỏ nếu cần
              type="text"
              placeholder="Nhập tỷ lệ..."
              value={percentage}
              onChange={(e) => {setpercentage(Number(e.target.value))
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

export default ProfitModal;
