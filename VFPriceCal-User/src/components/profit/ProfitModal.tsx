import { useState} from "react";
import "./profitModal.scss";
import { toast } from "react-toastify";
import { create, updateProfitById } from "../../service/ProfitService";
import type { UserInfo } from "../../context/AuthContext";

type Profit = {
  id: string | null;
  companyId: string;
  name: string;
  percentage: number;
  priority: string
};

type Props = {
  key: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: Profit | null;
};

const ProfitModal = ({key, open, setOpen, data }: Props) => {

  const [profitName, setProfitName] = useState(data?.name ?? "");
  const [percentage, setPercentage] = useState(data?.percentage ?? 0);
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
    if (!profitName) {
      setError("Vui lòng điền đầy đủ thông tin.");
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setError(""); // Reset error message
    const payload = {
        id: data?.id ?? "", // ID sẽ được backend tạo tự động
        companyId: user?.companyId ?? "", // ID ẩn từ context
        name: profitName,
        percentage: percentage,
        priority: "NORMAL"

    };
    let response;

if (data?.id) {
    response = await updateProfitById(payload);
} else {
    response = await create(payload);
}

if (response.code === 200 || response.code === 201) {
    toast.success(
        data?.id
            ? `Cập nhật ${profitName} thành công!`
            : `Tạo ${profitName} thành công!`
    );

    setTimeout(() => {
        window.location.reload();
    }, 500);
} else {
    toast.error(
        data?.id
            ? `Có lỗi xảy ra khi cập nhật ${profitName}.`
            : `Có lỗi xảy ra khi tạo ${profitName}.`
    );
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
              onChange={(e) => {setPercentage(Number(e.target.value))
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
